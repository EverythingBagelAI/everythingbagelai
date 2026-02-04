import { NextResponse } from 'next/server';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://everythingbagelai.app.n8n.cloud/webhook/form-submission';

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
    console.error('RECAPTCHA_SECRET_KEY not configured');
    return { success: false, error: 'reCAPTCHA not configured' };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: RECAPTCHA_SECRET_KEY,
        response: token,
      }),
    });

    const data = await response.json();
    
    if (!data.success) {
      return { success: false, error: data['error-codes']?.join(', ') || 'Verification failed' };
    }

    // reCAPTCHA v3 returns a score (0.0 - 1.0), higher is more likely human
    // 0.5 is a reasonable threshold
    if (data.score !== undefined && data.score < 0.5) {
      return { success: false, score: data.score, error: 'Score too low' };
    }

    return { success: true, score: data.score };
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

    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA token missing' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    const recaptchaResult = await verifyRecaptcha(recaptchaToken);
    
    if (!recaptchaResult.success) {
      console.warn('reCAPTCHA verification failed:', recaptchaResult.error);
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      );
    }

    // Forward to n8n webhook
    const webhookPayload = {
      name,
      email,
      mobile,
      company,
      services,
      message,
      submittedAt: new Date().toISOString(),
      recaptchaScore: recaptchaResult.score,
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
