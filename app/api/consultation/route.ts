import { NextResponse } from 'next/server';

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

interface ConsultationFormData {
  name: string;
  email: string;
  mobile: string;
  company: string;
  services: string[];
  message: string;
  _hp?: string; // Honeypot field
}

export async function POST(request: Request) {
  try {
    const body: ConsultationFormData = await request.json();
    
    const { name, email, mobile, company, services, message, _hp } = body;

    // Honeypot check - if filled, it's a bot (silently succeed)
    if (_hp) {
      console.log('Honeypot triggered - likely bot submission');
      return NextResponse.json({ success: true });
    }

    // Validate required fields
    if (!name || !email || !mobile || !company) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
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
