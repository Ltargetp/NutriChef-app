import Header from '@/components/layout/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, CalendarDays } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header title="My Profile" />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto max-w-lg">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarImage src="https://picsum.photos/seed/user-avatar/128/128" data-ai-hint="person portrait" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-2xl font-bold font-headline">Alex Doe</h2>
                  <p className="text-muted-foreground">alex.doe@example.com</p>
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
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
