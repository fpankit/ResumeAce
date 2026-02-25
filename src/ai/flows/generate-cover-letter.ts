'use server';
/**
 * @fileOverview Genkit flow for generating professional cover letters.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateCoverLetterInputSchema = z.object({
  fullName: z.string(),
  jobTitle: z.string(),
  companyName: z.string(),
  skills: z.string().describe('Key skills or achievements to highlight.'),
  tone: z.enum(['professional', 'enthusiastic', 'creative']).default('professional'),
});
export type GenerateCoverLetterInput = z.infer<typeof GenerateCoverLetterInputSchema>;

const GenerateCoverLetterOutputSchema = z.object({
  content: z.string().describe('The generated cover letter body text.'),
});
export type GenerateCoverLetterOutput = z.infer<typeof GenerateCoverLetterOutputSchema>;

export async function generateCoverLetter(input: GenerateCoverLetterInput): Promise<GenerateCoverLetterOutput> {
  return generateCoverLetterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCoverLetterPrompt',
  input: { schema: GenerateCoverLetterInputSchema },
  output: { schema: GenerateCoverLetterOutputSchema },
  prompt: `You are an expert career coach and professional writer.
Your task is to write a high-impact cover letter for {{{fullName}}}, applying for the position of {{{jobTitle}}} at {{{companyName}}}.

Highlight the following skills/achievements:
{{{skills}}}

Tone: {{{tone}}}

The cover letter should:
1. Start with a professional salutation.
2. Have a strong opening hook about why they want to join {{{companyName}}}.
3. Connect their skills ({{{skills}}}) directly to the value they will bring.
4. End with a confident call to action.

Use professional formatting. Only output the letter body, no conversational filler.`,
});

const generateCoverLetterFlow = ai.defineFlow(
  {
    name: 'generateCoverLetterFlow',
    inputSchema: GenerateCoverLetterInputSchema,
    outputSchema: GenerateCoverLetterOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
