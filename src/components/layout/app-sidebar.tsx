"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Home,
  Sparkles,
  CalendarDays,
  Heart,
  User,
  Utensils,
  LogIn,
  Crown,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useUser } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const menuItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/generate', label: 'Generate', icon: Sparkles },
  { href: '/plan', label: 'Daily Plan', icon: CalendarDays, pro: true },
  { href: '/favorites', label: 'Favorites', icon: Heart },
];

const UserMenu = () => {
  const { user, isUserLoading } = useUser();
  const pathname = usePathname();
  const isActive = (href: string) => pathname.startsWith(href);

  if (isUserLoading) {
    return <SidebarMenuButton asChild size="lg" variant="ghost" className="h-12 w-full justify-start p-2">
      <div className='flex items-center gap-2'>
        <div className="h-8 w-8 shrink-0 rounded-full bg-sidebar-accent animate-pulse" />
        <div className="h-4 w-1/2 bg-sidebar-accent animate-pulse rounded-md" />
      </div>
    </SidebarMenuButton>
  }
  
  if (!user) {
    return <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive('/login')} className="justify-start">
        <Link href="/login">
          <LogIn />
          <span>Login / Sign Up</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  }

  return <>
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive('/profile')} size="lg" variant="ghost" className="h-12 w-full justify-start p-2">
        <Link href="/profile">
          <Avatar className="h-8 w-8 shrink-0">
            {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />}
            <AvatarFallback>{user.displayName?.[0] || user.email?.[0]}</AvatarFallback>
          </Avatar>
          <span className="truncate">{user.displayName || user.email}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
     <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive('/subscription')} className="justify-start bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-orange-200 hover:text-white hover:from-yellow-500/30 hover:to-orange-500/30 border border-yellow-500/30">
        <Link href="/subscription">
          <Crown className="text-yellow-400" />
          <span>Subscription</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </>
}

export default function AppSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return href === '/' ? pathname === '/' : pathname.startsWith(href);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="h-12 w-12 shrink-0 rounded-full bg-primary/10 text-primary hover:bg-primary/20"
          >
            <Utensils className="h-6 w-6" />
          </Button>
          <div className="flex flex-col">
            <h1 className="font-headline text-lg font-bold text-sidebar-foreground">
              NutriChef
            </h1>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map(({ href, label, icon: Icon, pro }) => (
            <SidebarMenuItem key={label}>
              <SidebarMenuButton
                asChild
                isActive={isActive(href)}
                tooltip={{ children: label }}
                className="justify-start"
              >
                <Link href={href}>
                  <Icon />
                  <span>{label}</span>
                   {pro && <Crown className="ml-auto h-4 w-4 text-yellow-400" />}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarContent side="bottom" className="p-2 mt-auto">
        <SidebarMenu>
          <UserMenu />
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 text-center text-xs text-sidebar-foreground/60">
        © {new Date().getFullYear()} NutriChef
      </SidebarFooter>
    </Sidebar>
  );
}
