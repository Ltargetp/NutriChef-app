'use client';

import Header from '@/components/layout/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { Heart, CalendarDays, LogOut, Crown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  if (isUserLoading) {
    return (
      <div className="flex h-full min-h-screen flex-col">
        <Header title="My Profile" />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto max-w-lg animate-pulse">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="h-24 w-24 rounded-full bg-muted"></div>
                  <div className="text-center space-y-2">
                    <div className="h-6 w-40 rounded bg-muted"></div>
                    <div className="h-4 w-48 rounded bg-muted"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }
  
  if (!user) {
    // Optional: redirect to login if no user is found after loading
    // This can happen if the user signs out.
    // Or show a message.
     router.push('/login');
     return null;
  }

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header title="My Profile" />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto max-w-lg">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  {user.photoURL ? (
                    <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />
                  ) : (
                    <AvatarImage src="https://picsum.photos/seed/user-avatar/128/128" data-ai-hint="person portrait" />
                  )}
                  <AvatarFallback>{user.displayName?.[0] || user.email?.[0] || 'U'}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-2xl font-bold font-headline">{user.displayName || 'Welcome!'}</h2>
                  <p className="text-muted-foreground">{user.email || 'Anonymous User'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="font-headline">My Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/favorites">
                  <Heart className="mr-2 h-4 w-4" />
                  My Favorites
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/plan">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  My Daily Plan
                  <Crown className="ml-auto h-4 w-4 text-yellow-400" />
                </Link>
              </Button>
               <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/subscription">
                  <Crown className="mr-2 h-4 w-4" />
                  Manage Subscription
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="font-headline">Account</CardTitle>
            </CardHeader>
            <CardContent>
               <Button variant="destructive" className="w-full justify-start" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}
