"use server";

import {
  suggestRecipes, SuggestRecipesOutput,
} from '@/ai/flows/ingredient-based-recipe-suggestion';
import { z } from 'zod';

const formSchema = z.object({
  ingredients: z.string().min(3, 'Please enter at least one ingredient.'),
  excludeIngredients: z.string().optional(),
});

type FormState = {
  message: string;
  data: SuggestRecipesOutput['recipes'] | null;
  errors: Record<string, string[] | undefined> | null;
}

export async function generateRecipesAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = formSchema.safeParse({
    ingredients: formData.get('ingredients'),
    excludeIngredients: formData.get('excludeIngredients'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
      data: null,
    };
  }

  try {
    const result = await suggestRecipes(validatedFields.data);
    return {
      message: 'Success',
      errors: null,
      data: result.recipes,
    };
  } catch (error) {
    console.error('AI Action Error:', error);
    return {
      message: 'An error occurred while generating recipes. Please try again.',
      errors: null,
      data: null,
    };
  }
}
