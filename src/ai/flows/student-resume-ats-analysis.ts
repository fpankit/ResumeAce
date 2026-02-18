'use server';
/**
 * @fileOverview This file implements a Genkit flow for analyzing a student's resume against a job description.
 *
 * - studentResumeATSAnalysis - A function that handles the resume analysis process.
 * - StudentResumeATSAnalysisInput - The input type for the studentResumeATSAnalysis function.
 * - StudentResumeATSAnalysisOutput - The return type for the studentResumeATSAnalysis function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const StudentResumeATSAnalysisInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The full text content of the student\'s resume.'),
  jobDescription: z
    .string()
    .describe('The full text content of the job description.'),
});
export type StudentResumeATSAnalysisInput = z.infer<
  typeof StudentResumeATSAnalysisInputSchema
>;

const StudentResumeATSAnalysisOutputSchema = z.object({
  atsScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'A compatibility score (0-100) indicating how well the resume matches the job description based on ATS best practices.'
    ),
  matchedKeywords: z
    .array(z.string())
    .describe(
      'A list of keywords from the job description that were successfully found in the resume.'
    ),
  missingKeywords: z
    .array(z.string())
    .describe(
      'A list of important keywords from the job description that are missing from the resume.'
    ),
  improvementSuggestions: z
    .array(z.string())
    .describe(
      'A list of actionable suggestions to improve the resume\'s compatibility with the job description.'
    ),
  improvedResume: z
    .string()
    .describe(
      'A refined version of the resume text, incorporating suggested improvements for better ATS compatibility.'
    ),
});
export type StudentResumeATSAnalysisOutput = z.infer<
  typeof StudentResumeATSAnalysisOutputSchema
>;

export async function studentResumeATSAnalysis(
  input: StudentResumeATSAnalysisInput
): Promise<StudentResumeATSAnalysisOutput> {
  return studentResumeATSAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'studentResumeATSAnalysisPrompt',
  input: { schema: StudentResumeATSAnalysisInputSchema },
  output: { schema: StudentResumeATSAnalysisOutputSchema },
  prompt: `You are an expert ATS (Applicant Tracking System) and resume analyst.
Your task is to analyze a given resume against a specific job description.

First, carefully read the provided Job Description to identify key skills, qualifications, responsibilities, and industry-specific keywords.

Then, thoroughly review the provided Resume. Based on your analysis, you will perform the following:

1.  **Calculate ATS Score**: Assign a compatibility score from 0 to 100, indicating how well the resume aligns with the job description. Focus on keyword matching, formatting compatibility, and the presence of essential criteria.
2.  **Identify Matched Keywords**: List all significant keywords or phrases from the job description that are present in the resume.
3.  **Identify Missing Keywords**: List important keywords or phrases from the job description that are conspicuously absent from the resume but would significantly improve its ATS compatibility.
4.  **Provide Improvement Suggestions**: Offer specific, actionable advice to enhance the resume for this particular job description. These suggestions should cover content, keyword optimization, and structural improvements for ATS.
5.  **Generate Improved Resume**: Create a revised version of the original resume text. This version should incorporate the suggested improvements, optimizing it for the job description while maintaining clarity and professionalism. Only return the full text of the improved resume. Do not include any conversational text or explanation around it.

Resume:
---
{{{resumeText}}}
---

Job Description:
---
{{{jobDescription}}}
---

Now, provide your analysis and the improved resume in the specified JSON format.`,
});

const studentResumeATSAnalysisFlow = ai.defineFlow(
  {
    name: 'studentResumeATSAnalysisFlow',
    inputSchema: StudentResumeATSAnalysisInputSchema,
    outputSchema: StudentResumeATSAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
