// This file contains helper functions for sending emails via Resend.
// Resend is the email service we use to receive contact & booking requests.

import { Resend } from 'resend';

// The Resend client reads your secret API key from the .env.local file.
// It's undefined here until you add your key — see SETUP INSTRUCTIONS below.
export const resend = new Resend(process.env.RESEND_API_KEY);

// The email address that will RECEIVE all contact & booking messages.
export const OWNER_EMAIL = 'lunnalarrazabal@gmail.com';

// The "from" address shown in your inbox.
// ⚠️ IMPORTANT: Until you verify a custom domain with Resend, you must use
// 'onboarding@resend.dev' as the from address. It still works perfectly —
// all emails arrive in your inbox. See the README for domain setup instructions.
export const FROM_EMAIL = 'Montreal Pet Care <onboarding@resend.dev>';

// SETUP INSTRUCTIONS:
// 1. Go to https://resend.com and create a free account.
// 2. In the Resend dashboard, click "API Keys" → "Create API Key".
// 3. Copy the key and paste it in your .env.local file:
//    RESEND_API_KEY=re_xxxxxxxxxxxx
// 4. That's it! Contact and booking forms will start sending emails.
