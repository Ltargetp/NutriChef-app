"use client";

import { useFavorites } from '@/hooks/use-favorites';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

export function FavoriteButton({
  recipeId,
  className,
}: {
  recipeId: string;
  className?: string;
}) {
  const { isFavorite, toggleFavorite, isInitialized } = useFavorites();
  const favorite = isFavorite(recipeId);

  if (!isInitialized) {
    return <Skeleton className={cn("h-10 w-10 rounded-full", className)} />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn('rounded-full', className)}
      onClick={(e) => {
        e.preventDefault(); // Prevent navigation if on a card link
        toggleFavorite(recipeId);
      }}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={cn(
          'size-5 transition-all',
          favorite
            ? 'fill-primary text-primary'
            : 'text-muted-foreground'
        )}
      />
    </Button>
  );
}
