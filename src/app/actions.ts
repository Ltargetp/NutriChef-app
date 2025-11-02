"use server";

import {
  suggestRecipes,
} from '@/ai/flows/ingredient-based-recipe-suggestion';
import { z } from 'zod';

const formSchema = z.object({
  ingredients: z.string().min(3, 'Please enter at least one ingredient.'),
  excludeIngredients: z.string().optional(),
});

type FormState = {
  message: string;
  data: string[] | null;
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
    // The result from AI is a single string. Parse it into a list.
    // Assuming recipes are separated by newlines and may have numbering/bullet points.
    const recipes = result.recipes
      .split('\n')
      .map((r) => r.trim().replace(/^[*-]?\s*\d*\.\s*/, '')) // Remove bullets/numbering
      .filter((r) => r.length > 0);
      
    return {
      message: 'Success',
      errors: null,
      data: recipes,
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
