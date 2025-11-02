
'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import { Input } from '@/components/ui/input';
import { RecipeCard } from '@/components/recipes/recipe-card';
import { getRecipes } from '@/lib/recipes';
import type { Recipe } from '@/lib/types';
import { SearchIcon } from 'lucide-react';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const allRecipes = getRecipes();

  const searchTerms = searchTerm.toLowerCase().split(',').map(s => s.trim()).filter(s => s);

  const filteredRecipes = searchTerm.length === 0 ? [] : allRecipes.filter((recipe) => {
    const recipeNameMatches = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (recipeNameMatches) {
      return true;
    }

    if (searchTerms.length > 0) {
      const ingredientMatches = recipe.ingredients.some(ingredient => 
        searchTerms.some(term => ingredient.toLowerCase().includes(term))
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
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto max-w-4xl">
          <div className="relative mb-8">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name or ingredients (e.g., chicken, broccoli)..."
              className="w-full pl-12 h-14 text-lg rounded-full shadow-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {searchTerm && filteredRecipes.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}

          {searchTerm && filteredRecipes.length === 0 && (
            <div className="text-center py-16">
              <h2 className="text-xl font-semibold">No recipes found</h2>
              <p className="text-muted-foreground mt-2">
                We couldn't find any recipes matching your search.
              </p>
            </div>
          )}

           {!searchTerm && (
            <div className="text-center py-16">
              <h2 className="text-xl font-semibold">Ready to find something delicious?</h2>
              <p className="text-muted-foreground mt-2">
                Start typing in the search bar above to see results.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
