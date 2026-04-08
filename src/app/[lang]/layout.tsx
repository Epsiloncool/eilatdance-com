import '@/index.css';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { Language } from '@/lib/i18n'; // Наш новый провайдер
import { I18nProvider } from '@/contexts/I18nContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import pool from '@/lib/db';
import { getDictionary } from '@/lib/get-dictionary';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: {
    default: 'Eilat Dance Center - Professional Dance Classes in Eilat',
    template: '%s | Eilat Dance Center',
  },
  description: 'Experience the joy of dance with world-class instructors in the heart of Eilat.',
  icons: {
    icon: '/favicon.ico',
  },
};

// Загрузка настроек
async function getSettings() {
  try {
    const [rows] = await pool.execute('SELECT * FROM settings');
    return (rows as any[]).reduce((acc, row) => {
      let val = row.setting_value;
      try { val = JSON.parse(val); } catch(e){}
      acc[row.setting_key] = val;
      return acc;
    }, {});
  } catch (e) { return {}; }
}

// Генерируем статические параметры для статического экспорта (опционально, но полезно)
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ru' }, { lang: 'he' }];
}

export default async function SiteLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>; // Params теперь промис
}) {
  const { lang } = await params;
  const [settings, dictionary] = await Promise.all([
    getSettings(),
    getDictionary()
  ]);

  // Формируем правильный код языка (en_IL, ru_IL, he_IL)
  const langCode = `${lang}_IL`;
  const dir = lang === 'he' ? 'rtl' : 'ltr';

  return (
    <html lang={langCode} dir={dir} suppressHydrationWarning>
	    <head>
        {settings.google_analytics && (settings.google_analytics.length > 10) && (
          <script dangerouslySetInnerHTML={{ __html: '</script>' + settings.google_analytics + '<script>'}} />
        )}
        </head>		
    	<body className={inter.className}>
    		<I18nProvider lang={lang as Language}>
      			<LanguageProvider dictionary={dictionary}> 
        			<SettingsProvider settings={settings}>
          				<div className="min-h-screen flex flex-col bg-white" dir={lang === 'he' ? 'rtl' : 'ltr'}>
            			<Header />
            			<main className="flex-1">
              				{children}
            			</main>
            			<Footer />
          				</div>
        			</SettingsProvider>
      			</LanguageProvider>
    		</I18nProvider>
		</body>
	</html>
  );
}