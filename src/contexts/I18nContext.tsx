'use client';

import React, { createContext, useContext } from 'react';
import { Language, LangDict, l } from '@/lib/i18n';

const I18nContext = createContext<Language>('en');

export function I18nProvider({ lang, children }: { lang: Language, children: React.ReactNode }) {
  return <I18nContext.Provider value={lang}>{children}</I18nContext.Provider>;
}

export function useLang() {
  return useContext(I18nContext);
}

export function useTrans() {
  const lang = useLang();
  return (defaultText: string, dict?: LangDict) => l(lang, defaultText, dict);
}