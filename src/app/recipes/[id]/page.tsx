import { getRecipeById, getRecipes } from '@/lib/recipes';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/header';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { FavoriteButton } from '@/components/recipes/favorite-button';
import { Flame, Zap, Brain, Droplets, CheckCircle } from 'lucide-react';

export async function generateStaticParams() {
  const recipes = getRecipes();
  return recipes.map((recipe) => ({
    id: recipe.id,
  }));
}

export default function RecipePage({ params }: { params: { id: string } }) {
  const recipe = getRecipeById(params.id);

  if (!recipe) {
    notFound();
  }

  const placeholder = PlaceHolderImages.find((p) => p.id === recipe.image);

  const nutritionInfo = [
    { label: 'Calories', value: `${recipe.calories} kcal`, icon: Flame },
    { label: 'Protein', value: `${recipe.protein}g`, icon: Zap },
    { label: 'Carbs', value: `${recipe.carbs}g`, icon: Brain },
    { label: 'Fat', value: `${recipe.fat}g`, icon: Droplets },
  ];

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header title={recipe.name} />
      <main className="flex-1 overflow-y-auto">
        <div className="relative h-64 w-full md:h-96">
          {placeholder && (
            <Image
              src={placeholder.imageUrl}
              alt={recipe.name}
              fill
              className="object-cover"
              priority
              data-ai-hint={placeholder.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8">
            <FavoriteButton
              recipeId={recipe.id}
              className="h-12 w-12 bg-background/80 backdrop-blur-sm hover:bg-background"
            />
          </div>
        </div>

        <div className="p-4 md:p-8">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">
                {recipe.name}
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                {recipe.description}
              </p>
            </div>

            <Card>
              <CardContent className="grid grid-cols-2 gap-4 p-4 text-center md:grid-cols-4">
                {nutritionInfo.map(({ label, value, icon: Icon }) => (
                  <div key={label}>
                    <Icon className="mx-auto mb-1 h-6 w-6 text-primary" />
                    <p className="font-semibold">{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-1">
                <h2 className="mb-4 text-2xl font-bold font-headline">Ingredients</h2>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-2">
                <h2 className="mb-4 text-2xl font-bold font-headline">Instructions</h2>
                <ol className="space-y-4">
                  {recipe.instructions.map((step, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                        {index + 1}
                      </div>
                      <p className="flex-1 pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
