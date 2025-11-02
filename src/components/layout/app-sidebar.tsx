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
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

const menuItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/generate', label: 'Generate', icon: Sparkles },
  { href: '/plan', label: 'Daily Plan', icon: CalendarDays },
  { href: '/favorites', label: 'Favorites', icon: Heart },
  { href: '/profile', label: 'Profile', icon: User },
];

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
              HealthyByte
            </h1>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map(({ href, label, icon: Icon }) => (
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
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 text-center text-xs text-sidebar-foreground/60">
        © {new Date().getFullYear()} HealthyByte
      </SidebarFooter>
    </Sidebar>
  );
}
