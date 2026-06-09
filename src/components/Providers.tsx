'use client';

// Providers wraps the entire app with the language system.
// It must be a "Client Component" (because React Context only works on the client),
// but we keep it thin so the actual pages stay as Server Components.

import { LanguageProvider } from '@/i18n/LanguageContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
