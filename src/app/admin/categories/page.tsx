'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      setCategories(await res.json());
    } catch (e) {
      toast.error('Error loading categories');
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete category?')) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message);
      }
      
      setCategories(categories.filter(c => c.id !== id));
      toast.success('Category deleted');
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const getEnName = (json: any) => {
    try { return (typeof json === 'string' ? JSON.parse(json) : json)?.en || 'No Name'; } catch { return 'Error'; }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Link href="/admin/categories/new">
          <Button><Plus className="mr-2 h-4 w-4" /> New Category</Button>
        </Link>
      </div>

      <Card>
        <CardHeader><CardTitle>All Categories</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name (EN)</TableHead>
                <TableHead>Color Preview</TableHead>
                <TableHead>Gradient Preview</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell className="font-medium">
                    <span className={`px-2 py-1 rounded text-sm ${cat.color}`}>
                      {getEnName(cat.name)}
                    </span>
                  </TableCell>
                  <TableCell><code className="text-xs bg-muted p-1 rounded">{cat.color}</code></TableCell>
                  <TableCell>
                    <div className={`h-6 w-24 rounded bg-gradient-to-r ${cat.gradient}`}></div>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Link href={`/admin/categories/${cat.id}`}>
                      <Button variant="outline" size="icon" className={`bg-gradient-to-r ${cat.gradient} text-white border-0 hover:opacity-90 transition-opacity`}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(cat.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
