'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { ArrowLeft, Save, Upload, User, ImageIcon } from 'lucide-react';
import { MediaDialog } from '@/components/admin/MediaDialog';
import { Switch } from '@/components/ui/switch';

interface UserEditorProps {
  initialData?: any;
}

export function UserEditor({ initialData }: UserEditorProps) {
  const router = useRouter();
  const isEditing = !!initialData;
  const [loading, setLoading] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);

  // --- States ---

  const [name, setName] = useState(initialData?.name || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [role, setRole] = useState(initialData?.role || 'user');
  const [password, setPassword] = useState(''); // Пустой по умолчанию
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');
  const [isInstructor, setIsInstructor] = useState(!!initialData?.is_instructor);
console.log(initialData);
  // Биография (Мультиязычная)
  const [bio, setBio] = useState(
    initialData?.bio && typeof initialData.bio === 'string'
      ? JSON.parse(initialData.bio)
      : initialData?.bio || { en: '', he: '', ru: '' }
  );

  const [displayName, setDisplayName] = useState(
    initialData?.display_name && typeof initialData.display_name === 'string'
      ? JSON.parse(initialData.display_name)
      : initialData?.display_name || { en: '', he: '', ru: '' }
  );

  // --- Effects ---

  // Обработка выбора изображения
  useEffect(() => {
    const handleMediaSelect = (e: CustomEvent) => {
      if (e.detail.context === 'user_image') {
        const media = e.detail.media;
        const fullUrl = `${media.base_dir}${media.orig_filename}`;
        setImageUrl(fullUrl);
        setIsMediaOpen(false);
      }
    };

    window.addEventListener('media_selected', handleMediaSelect as EventListener);
    return () => window.removeEventListener('media_selected', handleMediaSelect as EventListener);
  }, []);

  // --- Handlers ---

  const handleBioChange = (lang: string, value: string) => {
    setBio((prev: any) => ({ ...prev, [lang]: value }));
  };

  const handleDisplayNameChange = (lang: string, value: string) => {
    setDisplayName((prev: any) => ({ ...prev, [lang]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditing ? `/api/users/${initialData.id}` : '/api/users';
      const method = isEditing ? 'PUT' : 'POST';

      const payload = {
        name,
        email,
        phone,
        role,
        bio,
        image_url: imageUrl,
        password: password || undefined, // Отправляем пароль только если он введен
		is_instructor: isInstructor ? 1 : 0,
		display_name: displayName,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to save user');
      }

      toast.success(isEditing ? 'User updated successfully' : 'User created successfully');
      router.push('/admin/users');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-6 pb-10">
      
      {/* Header */}
      <div className="flex items-center justify-between sticky top-[4rem] z-20 bg-background/95 backdrop-blur py-4 border-b">
        <div className="flex items-center gap-4">
          <Link href="/admin/users">
            <Button variant="outline" size="icon" type="button">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{isEditing ? 'Edit User' : 'Create User'}</h1>
        </div>
        <Button type="submit" disabled={loading}>
          <Save className="mr-2 h-4 w-4" />
          {loading ? 'Saving...' : 'Save User'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Левая колонка: Основная информация */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="John Doe" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="john@example.com" 
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)} 
                    placeholder="+972..." 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User (Instructor)</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

  			  <div className="flex items-center justify-between border p-3 rounded-md mb-4">
    			<div className="space-y-0.5">
        			<Label>Is Instructor</Label>
        			<p className="text-xs text-muted-foreground">Appears in filters and schedule</p>
    			</div>
    			<Switch checked={isInstructor} onCheckedChange={setIsInstructor} />
  			  </div>

              <div className="space-y-2 pt-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  placeholder={isEditing ? "Leave empty to keep current password" : "Create password"}
                  required={!isEditing} // Обязательно только при создании
                />
                <p className="text-[11px] text-muted-foreground">
                  {isEditing ? "Only enter if you want to change it." : "Required for new users."}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Биография (Tabs) */}
          <Card>
            <CardHeader>
              <CardTitle>Instructor Bio</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="en">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="he">Hebrew</TabsTrigger>
                  <TabsTrigger value="ru">Russian</TabsTrigger>
                </TabsList>

                {['en', 'he', 'ru'].map((lang) => (
                  <TabsContent key={lang} value={lang} className="space-y-2">
                    <Label>Biography ({lang.toUpperCase()})</Label>
                    <Textarea 
                      value={bio[lang] || ''} 
                      onChange={(e) => handleBioChange(lang, e.target.value)}
                      placeholder={`Tell us about the instructor in ${lang.toUpperCase()}...`}
                      className="h-40"
                    />

					<Label>Display Name (Public) ({lang.toUpperCase()})</Label>
					<Input 
                        value={displayName[lang] || ''} 
                        onChange={e => handleDisplayNameChange(lang, e.target.value)} 
                        placeholder="Name on site..."
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Правая колонка: Аватар */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div 
                className="aspect-square bg-muted rounded-full flex items-center justify-center overflow-hidden border-2 border-dashed border-muted-foreground/25 cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-all relative group mx-auto w-48 h-48"
                onClick={() => setIsMediaOpen(true)}
              >
                {imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt="Profile" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="flex flex-col items-center text-muted-foreground">
                    <User className="h-12 w-12 mb-2 opacity-50" />
                    <span className="text-xs">Select Photo</span>
                  </div>
                )}
                
                {/* Overlay text */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                  <span className="text-white text-sm font-medium flex items-center gap-2">
                    <Upload className="h-4 w-4" /> Change
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Image URL</Label>
                <div className="flex gap-2">
                  <Input 
                    value={imageUrl} 
                    onChange={(e) => setImageUrl(e.target.value)} 
                    placeholder="https://..." 
                    className="text-xs"
                  />
                  <Button type="button" variant="secondary" size="icon" onClick={() => setIsMediaOpen(true)}>
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <MediaDialog 
        open={isMediaOpen} 
        onOpenChange={setIsMediaOpen} 
        context="user_image" 
      />
    </form>
  );
}