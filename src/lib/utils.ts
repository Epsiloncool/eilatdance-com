import { MultilingualText } from "@/types/lang";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateString: string, language: string) => {
  return new Date(dateString).toLocaleDateString(language === 'he' ? 'he-IL' : language === 'ru' ? 'ru-RU' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
};

export function getLocalizedText(field: object, lang: string): string {
  if (!field) return '';
  
  if (typeof field === 'string') {
    try {
      const data = JSON.parse(field);
	  return data[lang] || data['en'] || Object.values(data)[0] || '';
    } catch (e) {
      return field;
    }
  }

  const field2 = field as MultilingualText;

  return field2[lang] || field2['en'] || Object.values(field)[0] || '';
}

export function formatInstructors(instructors: any[], lang: string) {
  if (!instructors || instructors.length === 0) return '';

  // Получаем имена на нужном языке
  const names = instructors.map(i => {
    // Берем display_name, если нет - обычное name
    const dn = i.display_name;
    const nameJson = typeof dn === 'string' ? JSON.parse(dn) : dn;
    return getLocalizedText(nameJson, lang) || i.name;
  });

  if (names.length === 1) return names[0];

  // Объединяем
  const separator = lang === 'ru' ? ' и ' : lang === 'he' ? ' ו' : ' & ';
  return names.join(separator);
}
