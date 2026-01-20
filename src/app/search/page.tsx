
'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import { Input } from '@/components/ui/input';
import { RecipeCard } from '@/components/recipes/recipe-card';
import { getRecipes } from '@/lib/recipes';
import type { Recipe } from '@/lib/types';
import { SearchIcon, Sparkles } from 'lucide-react';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const allRecipes = getRecipes();

  const searchTerms = searchTerm
    .toLowerCase()
    .split(',')
    .map((term: string) => term.trim())
    .filter((term: string) => term);

  const filteredRecipes = searchTerm.length === 0 ? [] : allRecipes.filter((recipe) => {
    const recipeNameMatches = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (recipeNameMatches) {
      return true;
    }

    if (searchTerms.length > 0) {
      const ingredientMatches = recipe.ingredients.some((ingredient: string) => 
        searchTerms.some((term: string) => ingredient.toLowerCase().includes(term))
      );
      if (ingredientMatches) {
        return true;
      }
    }
    
    return false;
  });

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header title="Search Recipes" />
      <main className="flex-1 overflow-y-auto px-4 pb-12 pt-6 md:px-10 md:pb-16">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
          <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-6 shadow-[0_20px_70px_-45px_rgba(164,31,48,0.35)] backdrop-blur md:p-10 animate-fade-in-up">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_60%)]" />
            <div className="relative z-10 flex flex-col gap-4">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <Sparkles className="h-4 w-4" />
                Flavor Finder
              </span>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Find recipes by craving, ingredient, or mood.
              </h2>
              <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
                Try comma-separated ingredients or just search by name. We’ll surface recipes and balanced plates instantly.
              </p>
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name or ingredients (e.g., chicken, broccoli)..."
                  className="h-14 w-full rounded-full border-border/60 bg-background/80 pl-12 text-base shadow-md focus-visible:ring-primary/30 md:text-lg"
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </section>

          {searchTerm && filteredRecipes.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in-up [animation-delay:120ms]">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}

          {searchTerm && filteredRecipes.length === 0 && (
            <div className="rounded-3xl border border-dashed border-border/70 bg-card/70 py-12 text-center animate-fade-in-up [animation-delay:120ms]">
              <h2 className="text-xl font-semibold">No recipes found</h2>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Try a broader ingredient list or use a simpler recipe name.
              </p>
            </div>
          )}

          {!searchTerm && (
            <div className="rounded-3xl border border-border/60 bg-card/70 py-12 text-center animate-fade-in-up [animation-delay:120ms]">
              <h2 className="text-xl font-semibold">Ready to find something delicious?</h2>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Start typing to see recipes appear instantly.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
