'use server';

/**
 * @fileOverview A flow that summarizes uploaded notes.
 *
 * - summarizeUploadedNotes - A function that summarizes uploaded notes.
 * - SummarizeUploadedNotesInput - The input type for the summarizeUploadedNotes function.
 * - SummarizeUploadedNotesOutput - The return type for the summarizeUploadedNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeUploadedNotesInputSchema = z.object({
  text: z.string().describe('The text content of the uploaded notes.'),
});
export type SummarizeUploadedNotesInput = z.infer<typeof SummarizeUploadedNotesInputSchema>;

const SummarizeUploadedNotesOutputSchema = z.object({
  summary: z.string().describe('The AI-generated summary of the notes.'),
});
export type SummarizeUploadedNotesOutput = z.infer<typeof SummarizeUploadedNotesOutputSchema>;

export async function summarizeUploadedNotes(input: SummarizeUploadedNotesInput): Promise<SummarizeUploadedNotesOutput> {
  return summarizeUploadedNotesFlow(input);
}

const summarizeUploadedNotesPrompt = ai.definePrompt({
  name: 'summarizeUploadedNotesPrompt',
  input: {schema: SummarizeUploadedNotesInputSchema},
  output: {schema: SummarizeUploadedNotesOutputSchema},
  prompt: `Summarize the following notes into concise bullet points:\n{{{text}}}`,  
});

const summarizeUploadedNotesFlow = ai.defineFlow(
  {
    name: 'summarizeUploadedNotesFlow',
    inputSchema: SummarizeUploadedNotesInputSchema,
    outputSchema: SummarizeUploadedNotesOutputSchema,
  },
  async input => {
    const {output} = await summarizeUploadedNotesPrompt(input);
    return output!;
  }
);
