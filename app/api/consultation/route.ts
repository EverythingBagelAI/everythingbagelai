import { NextResponse } from 'next/server';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

interface ConsultationFormData {
  name: string;
  email: string;
  mobile: string;
  company: string;
  services: string[];
  message: string;
  recaptchaToken: string;
}

async function verifyRecaptcha(token: string): Promise<{ success: boolean; score?: number; error?: string }> {
  if (!RECAPTCHA_SECRET_KEY) {
    console.error('RECAPTCHA_SECRET_KEY not configured - env vars:', {
      hasSecret: !!process.env.RECAPTCHA_SECRET_KEY,
      hasSiteKey: !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    });
    return { success: false, error: 'reCAPTCHA not configured on server' };
  }

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  try {
    // Use reCAPTCHA Enterprise API
    const projectId = process.env.GOOGLE_CLOUD_PROJECT || 'everythingbagelai';
    const response = await fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${RECAPTCHA_SECRET_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: {
            token: token,
            siteKey: siteKey,
            expectedAction: 'booking_form_submit',
          },
        }),
      }
    );

    const data = await response.json();
    console.log('reCAPTCHA Enterprise response:', JSON.stringify(data));
    
    if (data.error) {
      console.error('reCAPTCHA Enterprise error:', data.error.message);
      return { success: false, error: data.error.message };
    }

    if (!data.tokenProperties?.valid) {
      const reason = data.tokenProperties?.invalidReason || 'Invalid token';
      console.error('reCAPTCHA token invalid:', reason);
      return { success: false, error: reason };
    }

    const score = data.riskAnalysis?.score;
    
    // Score is 0.0 - 1.0, higher is more likely human
    // 0.5 is a reasonable threshold
    if (score !== undefined && score < 0.5) {
      console.warn('reCAPTCHA score too low:', score);
      return { success: false, score, error: 'Score too low' };
    }

    return { success: true, score };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { success: false, error: 'Verification request failed' };
  }
}

export async function POST(request: Request) {
  try {
    const body: ConsultationFormData = await request.json();
    
    const { name, email, mobile, company, services, message, recaptchaToken } = body;

    // Validate required fields
    if (!name || !email || !mobile || !company) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // reCAPTCHA temporarily disabled - skip verification
    let recaptchaScore: number | undefined;
    if (recaptchaToken && recaptchaToken !== 'disabled') {
      const recaptchaResult = await verifyRecaptcha(recaptchaToken);
      
      if (!recaptchaResult.success) {
        console.warn('reCAPTCHA verification failed:', recaptchaResult.error);
        return NextResponse.json(
          { error: 'reCAPTCHA verification failed. Please try again.' },
          { status: 400 }
        );
      }
      recaptchaScore = recaptchaResult.score;
    }

    // Forward to n8n webhook
    if (!N8N_WEBHOOK_URL) {
      console.error('N8N_WEBHOOK_URL not configured');
      return NextResponse.json(
        { error: 'Form submission not configured' },
        { status: 500 }
      );
    }

    const webhookPayload = {
      name,
      email,
      mobile,
      company,
      services,
      message,
      submittedAt: new Date().toISOString(),
      recaptchaScore: recaptchaScore,
    };

    const webhookResponse = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    });

    if (!webhookResponse.ok) {
      console.error('n8n webhook failed:', webhookResponse.status, await webhookResponse.text());
      // Still return success to user - we don't want to expose internal errors
      // Log it for debugging but don't fail the submission
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Consultation form error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
