'use server';
/**
 * @fileOverview Genkit flow for generating professional resume content.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateContentInputSchema = z.object({
  type: z.enum(['summary', 'experience']).describe('The type of content to generate.'),
  jobTitle: z.string().describe('The user\'s job title.'),
  keywords: z.string().describe('Keywords or skills to include.'),
});
export type GenerateContentInput = z.infer<typeof GenerateContentInputSchema>;

const GenerateContentOutputSchema = z.object({
  generatedText: z.string().describe('The AI-generated professional text.'),
});
export type GenerateContentOutput = z.infer<typeof GenerateContentOutputSchema>;

export async function generateResumeContent(input: GenerateContentInput): Promise<GenerateContentOutput> {
  return generateContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResumeContentPrompt',
  input: { 
    schema: z.object({
      type: z.string(),
      jobTitle: z.string(),
      keywords: z.string(),
      isSummary: z.boolean(),
    }) 
  },
  output: { schema: GenerateContentOutputSchema },
  prompt: `You are a professional resume writer and career coach.
Your task is to generate high-impact, ATS-friendly resume content for a {{{jobTitle}}}.

Type: {{{type}}}
Keywords/Skills: {{{keywords}}}

{{#if isSummary}}
Generate a compelling 3-4 sentence professional summary that highlights key achievements and skills. Use active verbs and quantify results where possible.
{{else}}
Generate a 3-4 bullet point description for a specific work experience entry. Each bullet should start with a strong action verb and focus on accomplishments rather than just duties.
{{/if}}

Output only the generated text, no conversational padding.`,
});

const generateContentFlow = ai.defineFlow(
  {
    name: 'generateContentFlow',
    inputSchema: GenerateContentInputSchema,
    outputSchema: GenerateContentOutputSchema,
  },
  async (input) => {
    // Logic-less templates: pass a pre-calculated boolean for conditionals
    const { output } = await prompt({
      ...input,
      isSummary: input.type === 'summary',
    });
    return output!;
  }
);
