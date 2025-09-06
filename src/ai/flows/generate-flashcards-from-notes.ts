'use server';
/**
 * @fileOverview A flashcard generation AI agent.
 *
 * - generateFlashcardsFromNotes - A function that handles the flashcard generation process.
 * - GenerateFlashcardsInput - The input type for the generateFlashcardsFromNotes function.
 * - GenerateFlashcardsOutput - The return type for the generateFlashcardsFromNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFlashcardsInputSchema = z.object({
  notes: z.string().describe('The notes to generate flashcards from.'),
});
export type GenerateFlashcardsInput = z.infer<typeof GenerateFlashcardsInputSchema>;

const GenerateFlashcardsOutputSchema = z.array(
  z.object({
    question: z.string().describe('The flashcard question.'),
    answer: z.string().describe('The flashcard answer.'),
  })
);
export type GenerateFlashcardsOutput = z.infer<typeof GenerateFlashcardsOutputSchema>;

export async function generateFlashcardsFromNotes(
  input: GenerateFlashcardsInput
): Promise<GenerateFlashcardsOutput> {
  return generateFlashcardsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFlashcardsPrompt',
  input: {schema: GenerateFlashcardsInputSchema},
  output: {schema: GenerateFlashcardsOutputSchema},
  prompt: `Convert the following notes into flashcards. Format as JSON with 'question' and 'answer':\n\n{{{notes}}}`,
});

const generateFlashcardsFlow = ai.defineFlow(
  {
    name: 'generateFlashcardsFlow',
    inputSchema: GenerateFlashcardsInputSchema,
    outputSchema: GenerateFlashcardsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
