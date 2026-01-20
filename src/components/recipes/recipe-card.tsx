import Link from 'next/link';
import Image from 'next/image';
import type { Recipe } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FavoriteButton } from './favorite-button';
import { Flame, Zap, Brain, Droplets } from 'lucide-react';

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const placeholder = PlaceHolderImages.find((p) => p.id === recipe.image);

  return (
    <Link href={`/recipes/${recipe.id}`} className="group block">
      <Card className="flex h-full flex-col overflow-hidden border border-border/60 bg-card/80 transition-all duration-300 ease-in-out group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-xl">
        <CardHeader className="relative p-0">
          <div className="aspect-video">
            {placeholder && (
              <Image
                src={placeholder.imageUrl}
                alt={placeholder.description}
                width={600}
                height={400}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={placeholder.imageHint}
              />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
          <div className="absolute right-2 top-2">
            <FavoriteButton recipeId={recipe.id} className="bg-background/70 hover:bg-background" />
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-4 sm:p-5">
          <CardTitle className="mb-1 text-base font-semibold leading-snug sm:text-lg">
            {recipe.name}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-xs sm:text-sm">
            {recipe.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-x-4 gap-y-2 p-4 pt-0 text-[11px] text-muted-foreground sm:grid-cols-4 sm:text-xs">
          <div className="flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-primary/70" />
            <span>{recipe.calories} kcal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-primary/70" />
            <span>{recipe.protein}g protein</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Brain className="h-4 w-4 text-primary/70" />
            <span>{recipe.carbs}g carbs</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Droplets className="h-4 w-4 text-primary/70" />
            <span>{recipe.fat}g fat</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
