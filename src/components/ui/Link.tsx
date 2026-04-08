'use client';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useLang } from '@/contexts/I18nContext';
import React from 'react';

interface LinkProps extends NextLinkProps {
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export function Link({ href, ...props }: LinkProps) {
  const lang = useLang();
  const path = typeof href === 'string' ? href : href.pathname || '';

  // Если это внешняя ссылка, оставляем как есть
  if (path.startsWith('http')) {
    return <NextLink href={href} {...props} />;
  }

  // Логика формирования URL
  // Если язык EN - префикс не нужен.
  // Если язык RU/HE - добавляем префикс, если его еще нет.
  let finalHref = href;

  if (lang !== 'en' && typeof href === 'string' && href.startsWith('/')) {
    // Проверяем, нет ли уже префикса (чтобы не было /ru/ru/blog)
    if (!href.startsWith(`/${lang}/`)) {
       finalHref = `/${lang}${href === '/' ? '' : href}`;
    }
  }

  return <NextLink href={finalHref} {...props} />;
}
