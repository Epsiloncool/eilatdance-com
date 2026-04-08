// Тип для значений, которые мы можем сохранять в JSON колонки
export type MultilingualText = {
  en: string;
  he?: string;
  ru?: string;
  [key: string]: string | undefined;
};

