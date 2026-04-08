'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Plus, Trash2, Star } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    } catch (e) {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this post?')) return;
    try {
      await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      setPosts(posts.filter(p => p.id !== id));
      toast.success('Post deleted');
    } catch (e) {
      toast.error('Error deleting post');
    }
  };

  // Хелпер для получения английского заголовка из JSON
  const getTitle = (json: any) => {
    try {
        const obj = typeof json === 'string' ? JSON.parse(json) : json;
        return obj?.en || 'Untitled';
    } catch (e) { return 'Error'; }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link href="/admin/posts/new">
          <Button><Plus className="mr-2 h-4 w-4" /> New Post</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title (EN)</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id} className={post.is_featured ? "bg-purple-50/50" : ""}>
					<TableCell className="font-medium">
      					<div className="flex items-center gap-2">
        				{post.is_featured === 1 && <Star className="h-4 w-4 text-orange-500 fill-orange-500" />}
        				{getTitle(post.title)}
      					</div>
    				</TableCell>
    				<TableCell>{post.category?.en || '- No category -'}</TableCell>
    				<TableCell>
      					<div className="flex flex-col gap-1">
        					<span className={`px-2 py-1 rounded-full text-xs w-fit ${post.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
          						{post.is_published ? 'Published' : 'Draft'}
        					</span>
        					{post.is_featured === 1 && (
          						<span className="text-xs text-orange-600 font-medium">Featured</span>
        					)}
      					</div>
    				</TableCell>
	            	<TableCell className="text-right space-x-2">
                    	<Link href={`/admin/posts/${post.id}`}>
                      		<Button variant="outline" size="icon"><Edit className="h-4 w-4" /></Button>
                    	</Link>
                    	<Button variant="destructive" size="icon" onClick={() => handleDelete(post.id)}>
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