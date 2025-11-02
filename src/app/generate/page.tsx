"use client";

import { useFormState, useFormStatus } from 'react-dom';
import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { generateRecipesAction } from '@/app/actions';
import { Sparkles, Loader2, Flame, Zap, Brain, Droplets } from 'lucide-react';

const initialState = {
  message: '',
  data: null,
  errors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Recipes
        </>
      )}
    </Button>
  );
}

export default function GeneratePage() {
  const [state, formAction] = useFormState(generateRecipesAction, initialState);

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header title="Generate with AI" />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                <Sparkles className="text-primary" />
                Recipe Generator
              </CardTitle>
              <CardDescription>
                Enter ingredients you have, and our AI will suggest healthy recipes with nutritional info.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="ingredients">Ingredients you have</Label>
                  <Textarea
                    id="ingredients"
                    name="ingredients"
                    placeholder="e.g., chicken breast, broccoli, soy sauce, ginger"
                    required
                  />
                  {state.errors?.ingredients && (
                    <p className="text-sm text-destructive">
                      {state.errors.ingredients[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excludeIngredients">
                    Ingredients to exclude (optional)
                  </Label>
                  <Input
                    id="excludeIngredients"
                    name="excludeIngredients"
                    placeholder="e.g., nuts, dairy"
                  />
                </div>
                <SubmitButton />
              </form>
            </CardContent>
          </Card>

          {state.data && (
            <div className="space-y-4">
               <h2 className="font-headline text-xl text-center">Suggested Recipes</h2>
              {state.data.map((recipe, index) => (
                 <Card key={index}>
                   <CardHeader>
                     <CardTitle className="font-headline text-lg">{recipe.name}</CardTitle>
                     <CardDescription>{recipe.description}</CardDescription>
                   </CardHeader>
                   <CardFooter className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-muted-foreground sm:grid-cols-4">
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
                        <span>{recipe.carbohydrates}g carbs</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Droplets className="h-4 w-4 text-primary/70" />
                        <span>{recipe.fat}g fat</span>
                      </div>
                   </CardFooter>
                 </Card>
              ))}
            </div>
          )}

          {state.message && state.message !== 'Success' && !state.errors && (
             <p className="text-center text-destructive">{state.message}</p>
          )}

        </div>
      </main>
    </div>
  );
}
