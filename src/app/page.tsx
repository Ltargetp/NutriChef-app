import Header from '@/components/layout/header';
import { CategoryList } from '@/components/recipes/category-list';
import { RecipeCard } from '@/components/recipes/recipe-card';
import { getFeaturedRecipes } from '@/lib/recipes';
import { Utensils } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const featuredRecipes = getFeaturedRecipes(4);

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header title="Discover Recipes" />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="space-y-12">
          
          <section className="text-center bg-card p-8 rounded-lg shadow-inner">
            <Utensils className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl font-bold tracking-tight text-foreground/90 md:text-5xl font-headline">
              Welcome to NutriChef!
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-lg">
              Your ultimate guide to healthy and delicious meals. Explore recipes, create meal plans, and achieve your wellness goals.
            </p>
             <div className="mt-6">
              <Link href="/generate"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-md transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Generate a Recipe with AI
              </Link>
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground/90 md:text-3xl font-headline">
              Categories
            </h2>
            <CategoryList />
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground/90 md:text-3xl font-headline">
              Featured Recipes
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
