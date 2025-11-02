'use client';
import { getRecipesByCategory } from '@/lib/recipes';
import { RecipeCard } from '@/components/recipes/recipe-card';
import Header from '@/components/layout/header';

export default function CategoryPage() {
  const recipes = getRecipesByCategory('smoothies');

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header title="Smoothies" />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed">
            <p className="text-muted-foreground">
              No recipes found in this category.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
