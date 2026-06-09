'use client';

// This file creates a "language system" for the whole website.
// Think of it like a global switch that every component can read and change.
// When you flip from 'en' to 'fr', every text on the site updates instantly.

import { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Language, Translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// Any component that calls useLanguage() gets:
//   language → 'en' or 'fr'
//   setLanguage → function to switch the language
//   t → all the translated text for the current language
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be inside LanguageProvider');
  return context;
}
