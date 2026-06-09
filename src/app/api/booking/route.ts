// Booking API Route — receives the booking form submission and emails it to Luna.
// Uses FormData (multipart) because the form can include a pet photo attachment.

import { NextResponse } from 'next/server';
import { resend, OWNER_EMAIL, FROM_EMAIL } from '@/lib/email';

export async function POST(request: Request) {
  const formData = await request.formData();

  // Honeypot check
  if (formData.get('honeypot')) {
    return NextResponse.json({ success: true });
  }

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const petName = formData.get('petName') as string;
  const petType = formData.get('petType') as string;
  const service = formData.get('service') as string;
  const date = formData.get('date') as string;
  const endDate = formData.get('endDate') as string;
  const instructions = formData.get('instructions') as string;
  const photoFile = formData.get('photo') as File | null;

  // Server-side validation
  if (!name?.trim() || !email?.trim() || !phone?.trim() || !petName?.trim() || !petType || !service || !date) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  // Handle optional photo attachment
  type Attachment = { filename: string; content: Buffer };
  let attachments: Attachment[] = [];

  if (photoFile && photoFile.size > 0) {
    if (photoFile.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Photo exceeds 5 MB limit.' }, { status: 400 });
    }
    const buffer = Buffer.from(await photoFile.arrayBuffer());
    attachments = [{ filename: photoFile.name || 'pet-photo.jpg', content: buffer }];
  }

  // Format a nice service display label
  const serviceLabels: Record<string, string> = {
    'dog-walking': 'Dog Walking ($20/walk)',
    'drop-in': 'Drop-In Visit ($25/visit)',
    'overnight-sitting': 'Overnight Pet Sitting ($75/night)',
    'boarding': 'Pet Boarding ($65/night)',
    'additional': 'Additional Services (add-on)',
  };
  const serviceLabel = serviceLabels[service] ?? service;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [OWNER_EMAIL],
      replyTo: email,
      subject: `🐾 New booking request — ${petName} the ${petType} (${name})`,
      attachments,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #fce7e4; padding: 20px 24px; border-radius: 12px 12px 0 0;">
            <h2 style="margin: 0; color: #b33326; font-size: 20px;">New Booking Request 🐾</h2>
            <p style="margin: 4px 0 0; color: #7c3628; font-size: 14px;">From your Montreal Pet Care website</p>
          </div>
          <div style="background: #fff; padding: 24px; border: 1px solid #f0e0de; border-top: none; border-radius: 0 0 12px 12px;">

            <h3 style="margin: 0 0 12px; font-size: 16px; color: #374151;">📋 Booking Details</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 6px 0; color: #6b7280; width: 140px;">Service</td><td style="color: #111827; font-weight: 600;">${serviceLabel}</td></tr>
              <tr><td style="padding: 6px 0; color: #6b7280;">Start Date</td><td style="color: #111827; font-weight: 600;">${date}</td></tr>
              ${endDate ? `<tr><td style="padding: 6px 0; color: #6b7280;">End Date</td><td style="color: #111827; font-weight: 600;">${endDate}</td></tr>` : ''}
            </table>

            <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 16px 0;" />

            <h3 style="margin: 0 0 12px; font-size: 16px; color: #374151;">🐶 Pet Information</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 6px 0; color: #6b7280; width: 140px;">Pet Name</td><td style="color: #111827; font-weight: 600;">${petName}</td></tr>
              <tr><td style="padding: 6px 0; color: #6b7280;">Pet Type</td><td style="color: #111827;">${petType}</td></tr>
            </table>

            <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 16px 0;" />

            <h3 style="margin: 0 0 12px; font-size: 16px; color: #374151;">👤 Owner Information</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 6px 0; color: #6b7280; width: 140px;">Name</td><td style="color: #111827; font-weight: 600;">${name}</td></tr>
              <tr><td style="padding: 6px 0; color: #6b7280;">Email</td><td><a href="mailto:${email}" style="color: #d44535;">${email}</a></td></tr>
              <tr><td style="padding: 6px 0; color: #6b7280;">Phone</td><td style="color: #111827;">${phone}</td></tr>
            </table>

            ${
              instructions
                ? `<hr style="border: none; border-top: 1px solid #f3f4f6; margin: 16px 0;" />
            <h3 style="margin: 0 0 8px; font-size: 16px; color: #374151;">📝 Special Instructions</h3>
            <p style="color: #374151; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-line;">${instructions}</p>`
                : ''
            }

            ${
              attachments.length > 0
                ? `<hr style="border: none; border-top: 1px solid #f3f4f6; margin: 16px 0;" />
            <p style="color: #6b7280; font-size: 13px; margin: 0;">📷 Pet photo attached (${attachments[0].filename})</p>`
                : ''
            }

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
    console.error('[Booking API] Resend error:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again.' },
      { status: 500 }
    );
  }
}
