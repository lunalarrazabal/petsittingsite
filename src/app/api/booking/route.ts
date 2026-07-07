import { NextResponse } from 'next/server';
import { resend, OWNER_EMAIL, FROM_EMAIL } from '@/lib/email';
import { services } from '@/data/services';

export async function POST(request: Request) {
  const formData = await request.formData();

  // Honeypot check
  if (formData.get('honeypot')) {
    return NextResponse.json({ success: true });
  }

  const name           = formData.get('name')           as string;
  const email          = formData.get('email')          as string;
  const phone          = formData.get('phone')          as string;
  const petName        = formData.get('petName')        as string;
  const petType        = formData.get('petType')        as string;
  const servicesRaw    = formData.get('services')       as string;
  const checkIn        = formData.get('date')           as string;
  const checkOut       = formData.get('endDate')        as string;
  const instructions   = formData.get('instructions')   as string;
  const photoFile      = formData.get('photo')          as File | null;

  // Additional pets + transportation
  const additionalDogs     = parseInt(formData.get('additionalDogs')     as string || '0', 10);
  const additionalCats     = parseInt(formData.get('additionalCats')     as string || '0', 10);
  const includePickup      = formData.get('includePickup')  === 'true';
  const includeDropoff     = formData.get('includeDropoff') === 'true';
  const estimatedTotal     = formData.get('estimatedTotal') as string;

  let additionalDogNames: string[] = [];
  let additionalCatNames: string[] = [];
  try {
    const raw = formData.get('additionalDogNames') as string;
    if (raw) additionalDogNames = JSON.parse(raw);
  } catch { /* ignore */ }
  try {
    const raw = formData.get('additionalCatNames') as string;
    if (raw) additionalCatNames = JSON.parse(raw);
  } catch { /* ignore */ }

  // Server-side validation
  if (!name?.trim() || !email?.trim() || !phone?.trim() || !petName?.trim() || !petType || !servicesRaw || !checkIn) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  // Resolve primary service IDs → display labels
  const selectedIds   = servicesRaw.split(',').map((s) => s.trim()).filter(Boolean);
  const serviceLabels = selectedIds.map((id) => {
    const svc = services.find((s) => s.id === id);
    return svc ? `${svc.nameEn} — $${svc.price}/${svc.unit}` : id;
  });

  // Build additional pets display lines
  const petLines: string[] = [];
  if (additionalDogs > 0) {
    const names = additionalDogNames.filter(Boolean);
    const label = additionalDogs === 1 ? 'Additional Dog' : `Additional Dogs (${additionalDogs})`;
    petLines.push(names.length > 0 ? `${label}: ${names.join(', ')}` : label);
  }
  if (additionalCats > 0) {
    const names = additionalCatNames.filter(Boolean);
    const label = additionalCats === 1 ? 'Additional Cat' : `Additional Cats (${additionalCats})`;
    petLines.push(names.length > 0 ? `${label}: ${names.join(', ')}` : label);
  }

  // Build transportation display
  const transportLines: string[] = [];
  if (includePickup)  transportLines.push('Pick-up Service (+$50)');
  if (includeDropoff) transportLines.push('Drop-off Service (+$50)');

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

  const toListHtml = (items: string[]) =>
    items.map((item) => `<li style="padding: 3px 0; color: #111827;">${item}</li>`).join('');

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [OWNER_EMAIL],
      replyTo: email,
      subject: `New booking request — ${petName} the ${petType} (${name})`,
      attachments,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #ecfdf5; padding: 20px 24px; border-radius: 12px 12px 0 0;">
            <h2 style="margin: 0; color: #065f46; font-size: 20px;">New Booking Request</h2>
            <p style="margin: 4px 0 0; color: #047857; font-size: 14px;">From your Montreal Pet Care website</p>
          </div>
          <div style="background: #fff; padding: 24px; border: 1px solid #d1fae5; border-top: none; border-radius: 0 0 12px 12px;">

            <h3 style="margin: 0 0 12px; font-size: 16px; color: #374151;">Booking Details</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; color: #6b7280; width: 160px; vertical-align: top;">Services</td>
                <td style="color: #111827; font-weight: 600;">
                  <ul style="margin: 0; padding-left: 18px;">
                    ${toListHtml(serviceLabels)}
                  </ul>
                </td>
              </tr>
              ${petLines.length > 0 ? `
              <tr>
                <td style="padding: 6px 0; color: #6b7280; vertical-align: top;">Additional Pets</td>
                <td style="color: #111827;">
                  <ul style="margin: 0; padding-left: 18px;">
                    ${toListHtml(petLines)}
                  </ul>
                </td>
              </tr>` : ''}
              ${transportLines.length > 0 ? `
              <tr>
                <td style="padding: 6px 0; color: #6b7280; vertical-align: top;">Transportation</td>
                <td style="color: #111827;">
                  <ul style="margin: 0; padding-left: 18px;">
                    ${toListHtml(transportLines)}
                  </ul>
                </td>
              </tr>` : ''}
              <tr>
                <td style="padding: 6px 0; color: #6b7280;">Check-in</td>
                <td style="color: #111827; font-weight: 600;">${checkIn}</td>
              </tr>
              ${checkOut ? `
              <tr>
                <td style="padding: 6px 0; color: #6b7280;">Check-out</td>
                <td style="color: #111827; font-weight: 600;">${checkOut}</td>
              </tr>` : ''}
              ${estimatedTotal && estimatedTotal !== '0' ? `
              <tr>
                <td style="padding: 6px 0; color: #6b7280;">Estimated Total</td>
                <td style="color: #065f46; font-weight: 700; font-size: 16px;">$${estimatedTotal}</td>
              </tr>` : ''}
            </table>

            <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 16px 0;" />

            <h3 style="margin: 0 0 12px; font-size: 16px; color: #374151;">Pet Information</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 6px 0; color: #6b7280; width: 160px;">Pet Name</td><td style="color: #111827; font-weight: 600;">${petName}</td></tr>
              <tr><td style="padding: 6px 0; color: #6b7280;">Pet Type</td><td style="color: #111827;">${petType}</td></tr>
            </table>

            <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 16px 0;" />

            <h3 style="margin: 0 0 12px; font-size: 16px; color: #374151;">Owner Information</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 6px 0; color: #6b7280; width: 160px;">Name</td><td style="color: #111827; font-weight: 600;">${name}</td></tr>
              <tr><td style="padding: 6px 0; color: #6b7280;">Email</td><td><a href="mailto:${email}" style="color: #059669;">${email}</a></td></tr>
              <tr><td style="padding: 6px 0; color: #6b7280;">Phone</td><td style="color: #111827;">${phone}</td></tr>
            </table>

            ${instructions ? `
            <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 16px 0;" />
            <h3 style="margin: 0 0 8px; font-size: 16px; color: #374151;">Special Instructions</h3>
            <p style="color: #374151; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-line;">${instructions}</p>` : ''}

            ${attachments.length > 0 ? `
            <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 16px 0;" />
            <p style="color: #6b7280; font-size: 13px; margin: 0;">Pet photo attached (${attachments[0].filename})</p>` : ''}

            <div style="margin-top: 24px; background: #f9fafb; border-radius: 8px; padding: 12px 16px;">
              <p style="margin: 0; font-size: 13px; color: #9ca3af;">
                Hit "Reply" to respond directly to ${name} at ${email}
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
