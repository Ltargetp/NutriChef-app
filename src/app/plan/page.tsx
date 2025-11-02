import Header from '@/components/layout/header';
import { RecipeCard } from '@/components/recipes/recipe-card';
import { getRecipeById } from '@/lib/recipes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const dailyPlan = {
  breakfast: 'avocado-toast-with-egg',
  lunch: 'quinoa-avocado-salad',
  dinner: 'baked-salmon-with-asparagus',
};

export default function PlanPage() {
  const breakfastRecipe = getRecipeById(dailyPlan.breakfast);
  const lunchRecipe = getRecipeById(dailyPlan.lunch);
  const dinnerRecipe = getRecipeById(dailyPlan.dinner);

  const meals = [
    { title: 'Breakfast', recipe: breakfastRecipe },
    { title: 'Lunch', recipe: lunchRecipe },
    { title: 'Dinner', recipe: dinnerRecipe },
  ];

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header title="Your Daily Plan" />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="space-y-8">
          <p className="text-center text-muted-foreground">
            Here is a sample healthy meal plan for your day.
          </p>
          {meals.map((meal) =>
            meal.recipe ? (
              <Card key={meal.title} className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">
                    {meal.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RecipeCard recipe={meal.recipe} />
                </CardContent>
              </Card>
            ) : null
          )}
        </div>
      </main>
    </div>
  );
}
