'use server';

/**
 * @fileOverview Generates a multiple-choice quiz from uploaded notes.
 *
 * - createQuizFromNotes - A function that generates a quiz from notes.
 * - CreateQuizFromNotesInput - The input type for the createQuizFromNotes function.
 * - CreateQuizFromNotesOutput - The return type for the createQuizFromNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreateQuizFromNotesInputSchema = z.object({
  notes: z.string().describe('The notes to generate a quiz from.'),
});
export type CreateQuizFromNotesInput = z.infer<typeof CreateQuizFromNotesInputSchema>;

const CreateQuizFromNotesOutputSchema = z.object({
  quiz: z.array(
    z.object({
      question: z.string().describe('The quiz question.'),
      options: z.array(z.string()).describe('The possible answers.'),
      answer: z.string().describe('The correct answer.'),
    })
  ).describe('The generated quiz in JSON format.'),
});
export type CreateQuizFromNotesOutput = z.infer<typeof CreateQuizFromNotesOutputSchema>;

export async function createQuizFromNotes(input: CreateQuizFromNotesInput): Promise<CreateQuizFromNotesOutput> {
  return createQuizFromNotesFlow(input);
}

const createQuizFromNotesPrompt = ai.definePrompt({
  name: 'createQuizFromNotesPrompt',
  input: {schema: CreateQuizFromNotesInputSchema},
  output: {schema: CreateQuizFromNotesOutputSchema},
  prompt: `Generate 5 multiple choice questions with 4 options each and the correct answer based on the following notes.\nFormat as JSON: [{
  question: string // The quiz question,
  options: string[] // Possible answers,
  answer: string // The correct answer
}]\n\nNotes: {{{notes}}}`,
});

const createQuizFromNotesFlow = ai.defineFlow(
  {
    name: 'createQuizFromNotesFlow',
    inputSchema: CreateQuizFromNotesInputSchema,
    outputSchema: CreateQuizFromNotesOutputSchema,
  },
  async input => {
    const {output} = await createQuizFromNotesPrompt(input);
    return output!;
  }
);
