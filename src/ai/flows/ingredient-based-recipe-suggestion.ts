// IngredientBasedRecipeSuggestion
'use server';
/**
 * @fileOverview A recipe suggestion AI agent that returns recipes based on ingredients provided by the user.
 *
 * - suggestRecipes - A function that suggests recipes based on a list of ingredients.
 * - SuggestRecipesInput - The input type for the suggestRecipes function.
 * - SuggestRecipesOutput - The return type for the suggestRecipes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRecipesInputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma-separated list of ingredients the user has on hand.'),
  excludeIngredients: z
    .string()
    .optional()
    .describe('A comma-separated list of ingredients to exclude from the suggestions.'),
});
export type SuggestRecipesInput = z.infer<typeof SuggestRecipesInputSchema>;

const SuggestedRecipeSchema = z.object({
    name: z.string().describe("The name of the suggested recipe."),
    description: z.string().describe("A short, enticing description of the recipe."),
    calories: z.number().describe("Estimated calories for one serving."),
    protein: z.number().describe("Grams of protein per serving."),
    fat: z.number().describe("Grams of fat per serving."),
    carbohydrates: z.number().describe("Grams of carbohydrates per serving."),
});

const SuggestRecipesOutputSchema = z.object({
  recipes: z
    .array(SuggestedRecipeSchema)
    .describe('A list of healthy recipe suggestions based on the provided ingredients.'),
});
export type SuggestRecipesOutput = z.infer<typeof SuggestRecipesOutputSchema>;

export async function suggestRecipes(input: SuggestRecipesInput): Promise<SuggestRecipesOutput> {
  return suggestRecipesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRecipesPrompt',
  input: {schema: SuggestRecipesInputSchema},
  output: {schema: SuggestRecipesOutputSchema},
  prompt: `You are a recipe suggestion AI for a healthy eating app. Based on the ingredients the user has on hand, suggest a few healthy recipes that the user can make.

For each recipe, you must provide:
1.  A recipe name.
2.  A short description.
3.  An estimated nutrition breakdown per serving: calories, protein (in grams), fat (in grams), and carbohydrates (in grams).

Ingredients on hand: {{{ingredients}}}

Exclude these ingredients: {{excludeIngredients}}

Generate the recipes now.`,
});

const suggestRecipesFlow = ai.defineFlow(
  {
    name: 'suggestRecipesFlow',
    inputSchema: SuggestRecipesInputSchema,
    outputSchema: SuggestRecipesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
