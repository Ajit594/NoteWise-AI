"use client";

import type { AIResults } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotebookText, Layers, ClipboardCheck, ArrowLeft } from "lucide-react";
import SummaryTab from "./SummaryTab";
import FlashcardsTab from "./FlashcardsTab";
import QuizTab from "./QuizTab";

interface ResultsDisplayProps {
  results: AIResults;
  onReset: () => void;
}

export default function ResultsDisplay({ results, onReset }: ResultsDisplayProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold font-headline">Your Study Aids</h2>
        <Button variant="outline" onClick={onReset}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Start Over
        </Button>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary">
            <NotebookText className="mr-2" /> Summary
          </TabsTrigger>
          <TabsTrigger value="flashcards">
            <Layers className="mr-2" /> Flashcards
          </TabsTrigger>
          <TabsTrigger value="quiz">
            <ClipboardCheck className="mr-2" /> Quiz
          </TabsTrigger>
        </TabsList>
        <TabsContent value="summary" className="mt-6">
          <SummaryTab summary={results.summary.summary} />
        </TabsContent>
        <TabsContent value="flashcards" className="mt-6">
          <FlashcardsTab flashcards={results.flashcards} />
        </TabsContent>
        <TabsContent value="quiz" className="mt-6">
          <QuizTab quizData={results.quiz.quiz} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
