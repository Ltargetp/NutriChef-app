import Header from '@/components/layout/header';
import { CategoryList } from '@/components/recipes/category-list';
import { RecipeCard } from '@/components/recipes/recipe-card';
import { getFeaturedRecipes } from '@/lib/recipes';

export default function Home() {
  const featuredRecipes = getFeaturedRecipes(4);

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header title="Discover Recipes" />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="space-y-12">
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
