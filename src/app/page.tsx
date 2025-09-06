"use client";

import { useState } from "react";
import type { GenerateFlashcardsOutput } from "@/ai/flows/generate-flashcards-from-notes";
import type { CreateQuizFromNotesOutput } from "@/ai/flows/create-quiz-from-notes";
import type { SummarizeUploadedNotesOutput } from "@/ai/flows/summarize-uploaded-notes";
import { generateStudyAids } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

import Header from "@/components/layout/Header";
import NoteInputForm from "@/components/NoteInputForm";
import ResultsDisplay from "@/components/ResultsDisplay";
import Loader from "@/components/Loader";

export interface AIResults {
  summary: SummarizeUploadedNotesOutput;
  flashcards: GenerateFlashcardsOutput;
  quiz: CreateQuizFromNotesOutput;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [aiResults, setAiResults] = useState<AIResults | null>(null);
  const { toast } = useToast();

  const handleGenerate = async (notes: string) => {
    setIsLoading(true);
    setAiResults(null);
    try {
      const results = await generateStudyAids(notes);
      if (results) {
        setAiResults(results);
      } else {
        throw new Error("Failed to generate study aids. The AI returned no results.");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: (error as Error).message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAiResults(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <Loader />
          ) : aiResults ? (
            <ResultsDisplay results={aiResults} onReset={handleReset} />
          ) : (
            <NoteInputForm onGenerate={handleGenerate} isLoading={isLoading} />
          )}
        </div>
      </main>
    </div>
  );
}
