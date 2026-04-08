'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Plus, Trash2, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Загрузка пользователей
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setUsers(data);
    } catch (e) {
      toast.error('Error loading users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Удаление пользователя
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error deleting user');
      }

      setUsers(users.filter(u => u.id !== id));
      toast.success('User deleted successfully');
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground mt-1">Manage administrators and instructors</p>
        </div>
        <Link href="/admin/users/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New User
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Avatar</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Loading users...
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={user.image_url} alt={user.name} className="object-cover" />
                        <AvatarFallback>
                          <UserIcon className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">
                      {user.name || <span className="text-muted-foreground italic">No Name</span>}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Link href={`/admin/users/${user.id}`}>
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        onClick={() => handleDelete(user.id)}
                        disabled={user.role === 'admin' && users.filter(u => u.role === 'admin').length <= 1} // Защита от удаления последнего админа (опционально, но полезно)
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