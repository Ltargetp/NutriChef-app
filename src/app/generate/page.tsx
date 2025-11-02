"use client";

import { useFormState, useFormStatus } from 'react-dom';
import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateRecipesAction } from '@/app/actions';
import { Sparkles, Loader2 } from 'lucide-react';

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
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-xl">
                  Suggested Recipes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5 text-foreground">
                  {state.data.map((recipe, index) => (
                    <li key={index}>{recipe}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {state.message && state.message !== 'Success' && !state.errors && (
             <p className="text-center text-destructive">{state.message}</p>
          )}

        </div>
      </main>
    </div>
  );
}
