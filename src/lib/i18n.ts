export type Language = 'en' | 'he' | 'ru';

// Простой словарь, который мы будем передавать
export type LangDict = {
  [key in 'ru' | 'he']?: string;
};

// Функция-хелпер для выбора строки
export function l(currentLang: Language, defaultText: string, dict?: LangDict) {
  if (currentLang === 'en') return defaultText;
  return dict?.[currentLang as keyof LangDict] || defaultText;
}
