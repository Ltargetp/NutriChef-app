"use client";

import { useFavorites } from '@/hooks/use-favorites';
import { getRecipes } from '@/lib/recipes';
import { RecipeCard } from '@/components/recipes/recipe-card';
import Header from '@/components/layout/header';
import { Skeleton } from '@/components/ui/skeleton';

export default function FavoritesPage() {
  const { favorites, isInitialized } = useFavorites();
  const allRecipes = getRecipes();
  const favoriteRecipes = allRecipes.filter((recipe) =>
    favorites.includes(recipe.id)
  );

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header title="My Favorites" />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        {!isInitialized ? (
           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-96 rounded-lg" />
            ))}
          </div>
        ) : favoriteRecipes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed bg-card">
            <div className="text-center">
              <h3 className="text-xl font-semibold">No favorites yet!</h3>
              <p className="mt-2 text-muted-foreground">
                Click the heart icon on any recipe to save it here.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
