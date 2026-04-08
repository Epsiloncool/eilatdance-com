'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Plus, Trash2, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function StylesPage() {
  const [styles, setStyles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Загрузка стилей при монтировании
  const fetchStyles = async () => {
    try {
      const res = await fetch('/api/styles');
      const data = await res.json();
      setStyles(Array.isArray(data) ? data : []);
    } catch (e) {
      toast.error('Failed to load styles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStyles();
  }, []);

  // Обработка удаления
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this style?')) return;

    try {
      const res = await fetch(`/api/styles/${id}`, { method: 'DELETE' });
      
      if (!res.ok) throw new Error();

      setStyles(styles.filter((s) => s.id !== id));
      toast.success('Style deleted');
    } catch (e) {
      toast.error('Error deleting style');
    }
  };

  // Хелпер для безопасного получения английского названия из JSON
  const getEnName = (jsonField: any) => {
    try {
      const data = typeof jsonField === 'string' ? JSON.parse(jsonField) : jsonField;
      return data?.en || 'Untitled';
    } catch (e) {
      return 'Error';
    }
  };

  return (
    <div className="space-y-6">
      {/* Заголовок и кнопка добавления */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dance Styles</h1>
        <Link href="/admin/styles/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Style
          </Button>
        </Link>
      </div>

      {/* Таблица стилей */}
      <Card>
        <CardHeader>
          <CardTitle>All Styles</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Name (EN)</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Gradient Preview</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Loading styles...
                  </TableCell>
                </TableRow>
              ) : styles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No styles found. Create one!
                  </TableCell>
                </TableRow>
              ) : (
                styles.map((style) => (
                  <TableRow key={style.id}>
                    {/* Картинка */}
                    <TableCell>
                      <div className="h-10 w-16 bg-muted rounded overflow-hidden relative border">
                        {style.image_url ? (
                          <img 
                            src={style.image_url} 
                            alt="preview" 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    
                    {/* Название */}
                    <TableCell className="font-medium text-base">
                      {getEnName(style.name)}
                    </TableCell>
                    
                    {/* Уровень */}
                    <TableCell>
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">
                        {style.level}
                      </span>
                    </TableCell>
                    
                    {/* Превью градиента */}
                    <TableCell>
                      <div className={`h-6 w-24 rounded bg-gradient-to-r ${style.gradient} border border-white/20 shadow-sm`}></div>
                      <code className="text-[10px] text-muted-foreground mt-1 block max-w-[150px] truncate">
                        {style.gradient}
                      </code>
                    </TableCell>
                    
                    {/* Действия */}
                    <TableCell className="text-right space-x-2">
                      <Link href={`/admin/styles/${style.id}`}>
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        onClick={() => handleDelete(style.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
