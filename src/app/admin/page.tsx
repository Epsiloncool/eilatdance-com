import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { FileText, Calendar, Users, CheckCircle, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getStats() {
  try {
    // 1. Посты (Всего / Опубликовано)
    const [posts] = await pool.execute<RowDataPacket[]>(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN is_published = 1 THEN 1 ELSE 0 END) as published
      FROM posts
    `);

    // 2. Инструкторы
    const [users] = await pool.execute<RowDataPacket[]>(`
      SELECT COUNT(*) as total FROM users WHERE is_instructor = 1
    `);

    // 3. Занятия (Текущая неделя vs Следующая)
    // Используем простую логику: >= сегодня и < сегодня+7, и >= сегодня+7 и < сегодня+14
    const today = new Date().toISOString().slice(0, 10);
    const [classes] = await pool.execute<RowDataPacket[]>(`
      SELECT 
        SUM(CASE WHEN day_date >= CURDATE() AND day_date < DATE_ADD(CURDATE(), INTERVAL 7 DAY) THEN 1 ELSE 0 END) as this_week,
        SUM(CASE WHEN day_date >= DATE_ADD(CURDATE(), INTERVAL 7 DAY) AND day_date < DATE_ADD(CURDATE(), INTERVAL 14 DAY) THEN 1 ELSE 0 END) as next_week
      FROM schedule_items
    `);

    return {
      posts: posts[0],
      instructors: users[0].total,
      classes: classes[0]
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  if (!stats) return <div>Error loading stats</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        
        {/* Posts Stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.posts.total}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <CheckCircle className="mr-1 h-3 w-3 text-green-500" />
              {stats.posts.published} Published
            </div>
          </CardContent>
        </Card>
        
        {/* Schedule Stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Schedule Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.classes.this_week}</div>
            <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
              <span>This Week</span>
              <span className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                {stats.classes.next_week} Next Week
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Instructors Stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Instructors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.instructors}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Registered users with instructor role
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}