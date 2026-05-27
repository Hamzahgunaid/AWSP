import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, org, role, email, type, message, lang } = body;

    if (!name || !org || !email || !type || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(RESEND_API_KEY);

      await resend.emails.send({
        from: 'AWSP Website <noreply@awsp-six.vercel.app>',
        to: ['taskforce@awsp.gov.ye'],
        replyTo: email,
        subject: `[AWSP Enquiry] ${type} — ${name} (${org})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #0E2A47; padding: 24px; border-radius: 8px 8px 0 0;">
              <h2 style="color: #fff; margin: 0; font-size: 20px;">New Enquiry — AWSP Website</h2>
            </div>
            <div style="background: #f9f9f9; padding: 28px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 8px 8px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #666; font-size: 13px; width: 140px;">Enquiry type</td><td style="padding: 8px 0; font-weight: 600; color: #0E2A47;">${type}</td></tr>
                <tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Full name</td><td style="padding: 8px 0; font-weight: 600; color: #0E2A47;">${name}</td></tr>
                <tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Organisation</td><td style="padding: 8px 0; color: #0E2A47;">${org}</td></tr>
                ${role ? `<tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Role</td><td style="padding: 8px 0; color: #0E2A47;">${role}</td></tr>` : ''}
                <tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2A8A8A;">${email}</a></td></tr>
                ${lang ? `<tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Language pref</td><td style="padding: 8px 0; color: #0E2A47;">${lang === 'ar' ? 'Arabic' : lang === 'en' ? 'English' : 'Either'}</td></tr>` : ''}
              </table>
              <div style="margin-top: 20px; padding: 16px; background: #fff; border-radius: 6px; border: 1px solid #e5e5e5;">
                <div style="font-size: 12px; color: #999; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.08em;">Message</div>
                <div style="color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</div>
              </div>
              <div style="margin-top: 20px; font-size: 12px; color: #999; border-top: 1px solid #e5e5e5; padding-top: 16px;">
                Sent from the AWSP website contact form · awsp-six.vercel.app
              </div>
            </div>
          </div>
        `,
      });
    } else {
      console.log('CONTACT FORM SUBMISSION:', { name, org, role, email, type, message, lang });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
