"use client";

import { useState } from "react";
import type { CreateQuizFromNotesOutput } from "@/ai/flows/create-quiz-from-notes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, ArrowRight, RotateCw, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type QuizData = CreateQuizFromNotesOutput["quiz"];

interface QuizTabProps {
  quizData: QuizData;
}

export default function QuizTab({ quizData }: QuizTabProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  if (!quizData || quizData.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <p>No quiz was generated.</p>
      </div>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];
  const score = quizData.reduce((acc, question, index) => {
    return acc + (userAnswers[index] === question.answer ? 1 : 0);
  }, 0);

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleAnswerSelect = (value: string) => {
    setUserAnswers({ ...userAnswers, [currentQuestionIndex]: value });
  };
  
  const handleTryAgain = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <Card className="shadow-md">
        <CardHeader className="items-center text-center">
          <Trophy className="w-16 h-16 text-yellow-500" />
          <CardTitle className="font-headline text-2xl">Quiz Completed!</CardTitle>
          <CardDescription>You scored {score} out of {quizData.length}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {quizData.map((question, index) => (
            <div key={index}>
              <p className="font-semibold mb-2">
                {index + 1}. {question.question}
              </p>
              <div className="space-y-2">
                {question.options.map((option) => {
                  const isCorrect = option === question.answer;
                  const isUserChoice = userAnswers[index] === option;
                  
                  return (
                    <div
                      key={option}
                      className={cn(
                        "flex items-center space-x-2 rounded-md border p-3 text-sm",
                        isCorrect && "bg-green-100 border-green-300 dark:bg-green-900/50 dark:border-green-700",
                        isUserChoice && !isCorrect && "bg-red-100 border-red-300 dark:bg-red-900/50 dark:border-red-700"
                      )}
                    >
                      {isCorrect ? <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" /> : isUserChoice ? <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" /> : <div className="h-4 w-4" />}
                      <Label htmlFor={`q${index}-${option}`}>{option}</Label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button onClick={handleTryAgain} className="w-full">
            <RotateCw className="mr-2" /> Try Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="font-headline text-xl">
          Question {currentQuestionIndex + 1} of {quizData.length}
        </CardTitle>
        <Progress value={((currentQuestionIndex + 1) / quizData.length) * 100} className="mt-2" />
        <CardDescription className="pt-4 text-lg text-foreground">{currentQuestion.question}</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup onValueChange={handleAnswerSelect} value={userAnswers[currentQuestionIndex]}>
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <div key={option} className="flex items-center space-x-3">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="text-base font-normal">{option}</Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button onClick={handleNext} disabled={!userAnswers[currentQuestionIndex]} className="ml-auto">
          {currentQuestionIndex === quizData.length - 1 ? "Finish Quiz" : "Next Question"}
          <ArrowRight className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
