import Header from '@/components/layout/header';
import { CategoryList } from '@/components/recipes/category-list';
import { RecipeCard } from '@/components/recipes/recipe-card';
import { getFeaturedRecipes } from '@/lib/recipes';
import { Button } from '@/components/ui/button';
import { Sparkles, Utensils } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const featuredRecipes = getFeaturedRecipes(4);

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header title="Discover Recipes" />
      <main className="flex-1 overflow-y-auto px-4 pb-12 pt-6 md:px-10 md:pb-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
          <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-6 shadow-[0_20px_80px_-40px_rgba(164,31,48,0.45)] backdrop-blur md:p-12 animate-fade-in-up">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.4),transparent_55%)]" />
            <div className="relative z-10 flex flex-col gap-6 text-left">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <Utensils className="h-4 w-4" />
                NutriChef Studio
              </span>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
                  Cook smarter, eat brighter, feel nourished.
                </h1>
                <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
                  Your ultimate guide to healthy and delicious meals. Explore recipes, build balanced plans, and let AI spark your next favorite dish.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link href="/search">Explore recipes</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full border-primary/30 px-6">
                  <Link href="/generate" className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Generate with AI
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          <section className="space-y-6 animate-fade-in-up [animation-delay:120ms]">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                Categories
              </h2>
              <p className="text-sm text-muted-foreground md:text-base">
                Jump into curated recipes that fit your lifestyle and cravings.
              </p>
            </div>
            <CategoryList />
          </section>

          <section className="space-y-6 animate-fade-in-up [animation-delay:200ms]">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                Featured Recipes
              </h2>
              <p className="text-sm text-muted-foreground md:text-base">
                Hand-picked plates with balanced macros and bold flavors.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
