'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getLocalizedText } from '@/lib/utils';

export function Login() {
  const { t, language } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
		alert(data.message || 'Login failed');
        throw new Error(data.message || 'Login failed');
      }

      toast.success(t('login.success')/*Login successful*/);
      
      // Редирект в зависимости от роли
      if (data.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/profile'); // Пока перенаправим на профиль (создадим позже) или на главную
      }
      
      router.refresh(); // Обновляем состояние приложения (куки)
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader>
          <CardTitle className="text-2xl text-center">{t('login.welcome-back')/*Welcome Back*/}</CardTitle>
          <CardDescription className="text-center">
            {t('login.enter-credentials')/*Enter your credentials to access your account*/}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('login.email')/*Email*/}</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('login.password')/*Password*/}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-" disabled={loading}>
              {loading ? t('login.signing-in')/*Signing in...*/ : t('login.sign-in')/*Sign In*/}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );  
}