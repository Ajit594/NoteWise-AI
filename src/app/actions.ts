"use server";

import { generateFlashcardsFromNotes } from "@/ai/flows/generate-flashcards-from-notes";
import { createQuizFromNotes } from "@/ai/flows/create-quiz-from-notes";
import { summarizeUploadedNotes } from "@/ai/flows/summarize-uploaded-notes";
import { extractTextFromFile } from "@/ai/flows/extract-text-from-file";

export async function generateStudyAids(notes: string | null, fileDataUri?: string) {
  let notesToProcess = notes;
  
  if (fileDataUri) {
    if (!fileDataUri.startsWith('data:')) {
      throw new Error("Invalid file format. Please upload a valid document.");
    }
    const extractedTextResult = await extractTextFromFile({ fileDataUri });
    notesToProcess = extractedTextResult.text;
  }

  if (!notesToProcess || notesToProcess.trim().length < 50) {
    throw new Error("Please provide at least 50 characters of notes (or a file with equivalent content) to generate study aids.");
  }

  try {
    const [summaryResult, flashcardsResult, quizResult] = await Promise.all([
      summarizeUploadedNotes({ text: notesToProcess }),
      generateFlashcardsFromNotes({ notes: notesToProcess }),
      createQuizFromNotes({ notes: notesToProcess }),
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
