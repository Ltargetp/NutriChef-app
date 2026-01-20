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
    <Button type="submit" disabled={pending} className="w-full rounded-full">
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
      <main className="flex-1 overflow-y-auto px-4 pb-12 pt-6 md:px-10 md:pb-16">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-10">
          <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-6 shadow-[0_20px_70px_-45px_rgba(164,31,48,0.35)] backdrop-blur md:p-10 animate-fade-in-up">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_60%)]" />
            <div className="relative z-10 space-y-4">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <Sparkles className="h-4 w-4" />
                AI Kitchen
              </span>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Turn what you have into balanced, bold recipes.
              </h2>
              <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
                List ingredients you have on hand. We’ll craft nutritious dishes and highlight macros for each recipe.
              </p>
            </div>
          </section>

          <Card className="border-border/60 bg-card/80 shadow-lg animate-fade-in-up [animation-delay:120ms]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
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
                    className="min-h-[140px] rounded-2xl border-border/60 bg-background/80 shadow-sm"
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
                    className="h-12 rounded-full border-border/60 bg-background/80"
                  />
                </div>
                <SubmitButton />
              </form>
            </CardContent>
          </Card>

          {state.data && (
            <div className="space-y-5 animate-fade-in-up [animation-delay:200ms]">
              <h2 className="text-center text-xl font-semibold">Suggested Recipes</h2>
              {state.data.map((recipe, index) => (
                <Card key={index} className="border-border/60 bg-card/80 shadow-sm">
                  <CardHeader className="space-y-2">
                    <CardTitle className="text-lg">{recipe.name}</CardTitle>
                    <CardDescription>{recipe.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs text-muted-foreground sm:grid-cols-4">
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
