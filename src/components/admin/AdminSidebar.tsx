'use client';

import { Calendar, FileText, Home, Users, Settings, LogOut, LayoutDashboard, Tags, ImageIcon, MessageSquareQuote, Music2, Languages } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { toast } from 'sonner';

const items = [
  {
    title: 'Dashboard',
    url: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Schedule',
    url: '/admin/schedule',
    icon: Calendar,
  },
  {
    title: 'Blog & Pages',
    url: '/admin/posts',
    icon: FileText,
  },
  {
    title: 'Categories',
    url: '/admin/categories',
    icon: Tags,
  },
  {
    title: 'Media',
    url: '/admin/media',
    icon: ImageIcon,
  },
  { 
	title: 'Dance Styles', 
	url: '/admin/styles', 
	icon: Music2,
  },
  { 
	title: 'Users', 
	url: '/admin/users', 
	icon: Users 
  },
  {
  	title: 'Reviews',
   url: '/admin/reviews',
   icon: MessageSquareQuote,
  },
  { 
	title: 'Translations', 
	url: '/admin/translations', 
	icon: Languages,
  },
  {
    title: 'Settings',
    url: '/admin/settings',
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
        router.refresh();
        toast.success('Logged out');
    } catch (e) {
        toast.error('Logout failed');
    }
  };

  return (
    <Sidebar collapsible="none">
      <SidebarHeader className="p-4 border-b">
        <h2 className="text-xl font-bold px-2">EDC Admin</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    <LogOut />
                    <span>Sign Out</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/">
                        <Home />
                        <span>Back to Site</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}