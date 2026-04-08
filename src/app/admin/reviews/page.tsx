'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Plus, Trash2, Video, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedText } from '@/lib/utils';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);

  const { t, language } = useLanguage();

  const getText = (json: any) => getLocalizedText(json, language);

  useEffect(() => {
    fetch('/api/reviews').then(res => res.json()).then(setReviews);
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete review?')) return;
    try {
      await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
      setReviews(reviews.filter(r => r.id !== id));
      toast.success('Deleted');
    } catch (e) { toast.error('Error'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reviews</h1>
        <Link href="/admin/reviews/new">
          <Button><Plus className="mr-2 h-4 w-4" /> New Review</Button>
        </Link>
      </div>

      <Card>
        <CardHeader><CardTitle>All Reviews</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Preview</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{getText(review.author_name)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {review.type === 'video' ? <Video className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
                      <span className="capitalize">{review.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-muted-foreground">
                    {review.type === 'text' ? getText(review.content) : review.video_url}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${review.is_featured ? 'bg-green-100 text-green-800' : 'bg-gray-100'}`}>
                      {review.is_featured ? 'Yes' : 'No'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Link href={`/admin/reviews/${review.id}`}>
                      <Button variant="outline" size="icon"><Edit className="h-4 w-4" /></Button>
                    </Link>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(review.id)}>
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