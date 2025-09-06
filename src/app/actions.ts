"use server";

import { generateFlashcardsFromNotes } from "@/ai/flows/generate-flashcards-from-notes";
import { createQuizFromNotes } from "@/ai/flows/create-quiz-from-notes";
import { summarizeUploadedNotes } from "@/ai/flows/summarize-uploaded-notes";

export async function generateStudyAids(notes: string) {
  if (!notes || notes.trim().length < 50) {
    throw new Error("Please provide at least 50 characters of notes to generate study aids.");
  }

  try {
    const [summaryResult, flashcardsResult, quizResult] = await Promise.all([
      summarizeUploadedNotes({ text: notes }),
      generateFlashcardsFromNotes({ notes }),
      createQuizFromNotes({ notes }),
    ]);

    if (!summaryResult || !flashcardsResult || !quizResult) {
      throw new Error("One or more AI generation steps failed.");
    }
    
    return {
      summary: summaryResult,
      flashcards: flashcardsResult,
      quiz: quizResult,
    };
  } catch (error) {
    console.error("Error generating study aids:", error);
    throw new Error("Failed to generate study aids. Please check the server logs.");
  }
}
