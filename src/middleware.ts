import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/session';

const PUBLIC_FILE = /\.(.*)$/;
const SUPPORTED_LANGUAGES = ['en', 'ru', 'he'];
const DEFAULT_LANG = 'en';

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1. Игнорируем API, _next, статику и админку
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/uploads') ||
    pathname.startsWith('/admin') || // Админка всегда без префикса (или можно сделать en)
    PUBLIC_FILE.test(pathname)
  ) {
    // Но для админки нужно проверить авторизацию (старый код)
    if (pathname.startsWith('/admin')) {
      const cookie = request.cookies.get('session')?.value;
      const session = await decrypt(cookie);
      if (!session || session.role !== 'admin') {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
    return NextResponse.next();
  }

  // 2. Логика авторизации для /login и /profile (из старого middleware)
  const cookieSession = request.cookies.get('session')?.value;
  const session = await decrypt(cookieSession);
  
  if (pathname.startsWith('/login') && session) {
      return NextResponse.redirect(new URL('/admin', request.url));
  }

  // 3. МУЛЬТИЯЗЫЧНОСТЬ

  // Проверяем, есть ли язык в URL
  const pathnameIsMissingLocale = SUPPORTED_LANGUAGES.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Получаем язык из куки
  const cookieLang = request.cookies.get('currentlang')?.value;
  
  // Определяем предпочтительный язык
  let preferredLang = DEFAULT_LANG;

  if (cookieLang && SUPPORTED_LANGUAGES.includes(cookieLang)) {
    preferredLang = cookieLang;
  } else {
    // Если куки нет, смотрим заголовок Accept-Language
    const acceptLang = request.headers.get('accept-language');
    if (acceptLang) {
      if (acceptLang.includes('ru')) preferredLang = 'ru';
      else if (acceptLang.includes('he')) preferredLang = 'he';
    }
  }

  const response = NextResponse.next();

  // А. Если язык в URL есть (например /ru/blog)
  if (!pathnameIsMissingLocale) {
    const urlLang = pathname.split('/')[1];
    
    // Если URL /ru/..., а кука en -> обновляем куку на ru
    if (urlLang !== cookieLang) {
      response.cookies.set('currentlang', urlLang);
    }
    return response;
  }

  // Б. Если языка в URL нет (например /blog), значит подразумевается EN (дефолт)
  // Но если у пользователя кука RU, и он заходит на /, его надо редиректнуть на /ru/
  if (preferredLang !== DEFAULT_LANG) {
    // Редирект на версию с префиксом
    const url = new URL(`/${preferredLang}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url);
	url.search = search;
    return NextResponse.redirect(url);
  }

  // В. Если языка в URL нет и предпочтительный EN -> Делаем REWRITE на папку [lang]
  // Мы переписываем URL так, чтобы Next.js думал, что мы обратились к /en/blog
  const newUrl = new URL(`/en${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url);
  newUrl.search = search;
  
  return NextResponse.rewrite(newUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};