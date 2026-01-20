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
    return <SidebarMenuButton asChild size="lg" variant="ghost" className="h-12 w-full justify-start rounded-2xl p-2">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 shrink-0 rounded-full bg-sidebar-accent animate-pulse" />
        <div className="h-4 w-1/2 bg-sidebar-accent animate-pulse rounded-md" />
      </div>
    </SidebarMenuButton>
  }
  
  if (!user) {
    return <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive('/login')} className="justify-start rounded-2xl">
        <Link href="/login">
          <LogIn />
          <span>Login / Sign Up</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  }

  return <>
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive('/profile')} size="lg" variant="ghost" className="h-12 w-full justify-start rounded-2xl p-2">
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
      <SidebarMenuButton asChild isActive={isActive('/subscription')} className="justify-start rounded-2xl border border-yellow-500/30 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-orange-200 hover:from-yellow-500/30 hover:text-white hover:to-orange-500/30">
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
      <SidebarHeader className="gap-3 border-b border-sidebar-border/60 px-4 pb-4 pt-5">
        <Link href="/" className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="h-12 w-12 shrink-0 rounded-2xl bg-primary/15 text-primary hover:bg-primary/25"
          >
            <Utensils className="h-6 w-6" />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-sidebar-foreground">
              NutriChef
            </h1>
            <span className="text-xs uppercase tracking-[0.2em] text-sidebar-foreground/60">Kitchen OS</span>
          </div>
        </Link>
        <p className="text-sm text-sidebar-foreground/70">
          Build plans, browse favorites, and let the AI spark new meals.
        </p>
      </SidebarHeader>

      <SidebarContent className="p-3">
        <SidebarMenu>
          {menuItems.map(({ href, label, icon: Icon, pro }) => (
            <SidebarMenuItem key={label}>
              <SidebarMenuButton
                asChild
                isActive={isActive(href)}
                tooltip={{ children: label }}
                className="justify-start rounded-2xl px-3 py-2.5"
              >
                <Link href={href}>
                  <Icon />
                  <span>{label}</span>
                  {pro && <span className="ml-auto rounded-full bg-yellow-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-yellow-300">Pro</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarContent side="bottom" className="mt-auto p-3">
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
