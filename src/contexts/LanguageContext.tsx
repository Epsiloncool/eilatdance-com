'use client';

import { createContext, useContext, ReactNode } from 'react';
import { Dictionary } from '@/lib/get-dictionary'; // Импортируем из нового хелпера
import { useLang } from '@/contexts/I18nContext';
import { Language } from '@/lib/i18n'; 

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void; // Теперь это будет менять URL
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ 
	children, 
	dictionary 
}: { 
	children: ReactNode;
	dictionary: Dictionary;
}) {
  const language = useLang(); // Берем язык из родительского I18nProvider (который берет из URL)

  const setLanguage = (newLang: Language) => {
    // В новой парадигме смена языка = смена URL
    // Мы просто редиректим пользователя
    // Заменяем текущий сегмент языка или добавляем его
    const currentPath = window.location.pathname;
    let newPath = currentPath;

    if (newLang === 'en') {
        // Убираем префикс если он есть
        newPath = currentPath.replace(/^\/(ru|he)/, '');
        if (newPath === '') newPath = '/';
    } else {
        // Добавляем или заменяем префикс
        if (currentPath.startsWith('/ru') || currentPath.startsWith('/he')) {
            newPath = currentPath.replace(/^\/(ru|he)/, `/${newLang}`);
        } else {
            newPath = `/${newLang}${currentPath}`;
        }
    }
    
    // Ставим куку, чтобы middleware запомнил выбор
    document.cookie = `currentlang=${newLang}; path=/; max-age=31536000`;
    
    window.location.href = newPath;
  };

  const t = (key: string): string => {
    // 1. Ищем в текущем языке
    const val = dictionary[language]?.[key];
    if (val) return val;

    // 2. Ищем в английском (fallback)
    const valEn = dictionary['en']?.[key];
    if (valEn) return valEn;

    // 3. Возвращаем ключ, если ничего нет
    return key;
  };
  
  const isRTL = language === 'he';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

