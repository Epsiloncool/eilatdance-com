import '@/styles/admin.css'; // Импорт стилей админки
import { Inter } from 'next/font/google';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Toaster } from '@/components/ui/sonner';
import { I18nProvider } from '@/contexts/I18nContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { getDictionary } from '@/lib/get-dictionary';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Admin Panel | Eilat Dance Center',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Загружаем словарь переводов (чтобы хук useLanguage мог отдавать тексты, если нужно)
  const dictionary = await getDictionary();

  return (
	<html lang="en">
      <body className={inter.className}>
    <I18nProvider lang="en">
      {/* 2. Оборачиваем в LanguageProvider с загруженным словарем */}
      <LanguageProvider dictionary={dictionary}>

    <div className="admin-theme min-h-screen flex bg-background text-foreground">
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white sticky top-0 z-10">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border mx-2" />
            <span className="font-medium text-sm">Administration Panel</span>
          </header>
          <div className="flex-1 space-y-4 p-8 pt-6 bg-muted/20 min-h-[calc(100vh-4rem)]">
            {children}
          </div>
        </SidebarInset>
        <Toaster />
      </SidebarProvider>
    </div>

	  </LanguageProvider>
	</I18nProvider>
		</body>
	</html>
  );
}
