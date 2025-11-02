'use server';
/**
 * @fileOverview Summarizes and analyzes a recipe, providing insights into its taste, origin, and health benefits.
 *
 * - recipeSummaryAndAnalysis - A function that summarizes and analyzes a recipe.
 * - RecipeSummaryAndAnalysisInput - The input type for the recipeSummaryAndAnalysis function.
 * - RecipeSummaryAndAnalysisOutput - The return type for the recipeSummaryAndAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecipeSummaryAndAnalysisInputSchema = z.object({
  recipeName: z.string().describe('The name of the recipe.'),
  ingredients: z.string().describe('A list of ingredients in the recipe.'),
  instructions: z.string().describe('The instructions for preparing the recipe.'),
});

export type RecipeSummaryAndAnalysisInput = z.infer<
  typeof RecipeSummaryAndAnalysisInputSchema
>;

const RecipeSummaryAndAnalysisOutputSchema = z.object({
  taste: z.string().describe('A description of the taste of the recipe.'),
  origin: z.string().describe('Information about the origin of the recipe.'),
  healthBenefitsSummary: z
    .string()
    .describe('A summary of the health benefits of the recipe.'),
});

export type RecipeSummaryAndAnalysisOutput = z.infer<
  typeof RecipeSummaryAndAnalysisOutputSchema
>;

export async function recipeSummaryAndAnalysis(
  input: RecipeSummaryAndAnalysisInput
): Promise<RecipeSummaryAndAnalysisOutput> {
  return recipeSummaryAndAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recipeSummaryAndAnalysisPrompt',
  input: {schema: RecipeSummaryAndAnalysisInputSchema},
  output: {schema: RecipeSummaryAndAnalysisOutputSchema},
  prompt: `You are an expert food critic and nutritionist. Analyze the following recipe and provide a summary of its taste, origin, and health benefits.

Recipe Name: {{{recipeName}}}
Ingredients: {{{ingredients}}}
Instructions: {{{instructions}}}

Taste: Provide a brief description of the expected taste of the recipe.
Origin: Provide information about the origin or history of the recipe.
Health Benefits Summary: Summarize the key health benefits of the recipe based on its ingredients.`,
});

const recipeSummaryAndAnalysisFlow = ai.defineFlow(
  {
    name: 'recipeSummaryAndAnalysisFlow',
    inputSchema: RecipeSummaryAndAnalysisInputSchema,
    outputSchema: RecipeSummaryAndAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
