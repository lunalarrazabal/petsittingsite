// This is a Next.js API Route — it runs on the server, never in the browser.
// When the contact form is submitted, this function:
//   1. Validates the data
//   2. Checks the honeypot (spam protection)
//   3. Sends an email to Luna via Resend
//   4. Returns success or an error message

import { NextResponse } from 'next/server';
import { resend, OWNER_EMAIL, FROM_EMAIL } from '@/lib/email';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, message, honeypot } = body;

  // Honeypot check — if this hidden field has a value, it's a bot. Ignore silently.
  if (honeypot) {
    return NextResponse.json({ success: true });
  }

  // Basic server-side validation (the form also validates on the client)
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  if (message.trim().length < 10) {
    return NextResponse.json({ error: 'Message too short.' }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [OWNER_EMAIL],
      replyTo: email,
      subject: `💬 New contact message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #fce7e4; padding: 20px 24px; border-radius: 12px 12px 0 0;">
            <h2 style="margin: 0; color: #b33326; font-size: 20px;">New Contact Message 🐾</h2>
            <p style="margin: 4px 0 0; color: #7c3628; font-size: 14px;">From your Montreal Pet Care website</p>
          </div>
          <div style="background: #fff; padding: 24px; border: 1px solid #f0e0de; border-top: none; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 80px;">Name</td>
                <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email</td>
                <td style="padding: 8px 0; color: #111827; font-size: 14px;">
                  <a href="mailto:${email}" style="color: #d44535;">${email}</a>
                </td>
              </tr>
              ${
                phone
                  ? `<tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Phone</td>
                <td style="padding: 8px 0; color: #111827; font-size: 14px;">${phone}</td>
              </tr>`
                  : ''
              }
            </table>
            <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 16px 0;" />
            <p style="color: #6b7280; font-size: 13px; margin: 0 0 8px;">Message:</p>
            <p style="color: #111827; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-line;">${message}</p>
            <div style="margin-top: 24px; background: #f9fafb; border-radius: 8px; padding: 12px 16px;">
              <p style="margin: 0; font-size: 13px; color: #9ca3af;">
                💡 Hit "Reply" to respond directly to ${name} at ${email}
              </p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Contact API] Resend error:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again.' },
      { status: 500 }
    );
  }
}
