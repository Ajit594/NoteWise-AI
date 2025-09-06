"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";

interface FlashcardProps {
  question: string;
  answer: string;
}

export default function Flashcard({ question, answer }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="w-full h-64 [perspective:1000px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={cn(
          "relative w-full h-full text-center transition-transform duration-700 [transform-style:preserve-3d]",
          isFlipped && "[transform:rotateY(180deg)]"
        )}
      >
        {/* Front of Card */}
        <div className="absolute w-full h-full [backface-visibility:hidden]">
          <Card className="w-full h-full flex flex-col justify-between shadow-lg">
            <CardContent className="p-6 flex-grow flex items-center justify-center">
              <p className="text-lg font-semibold">{question}</p>
            </CardContent>
            <div className="text-xs text-muted-foreground p-2 flex items-center justify-center gap-1">
              <RefreshCw size={12} />
              Click to flip
            </div>
          </Card>
        </div>

        {/* Back of Card */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <Card className="w-full h-full flex flex-col justify-between shadow-lg bg-secondary">
            <CardContent className="p-6 flex-grow flex items-center justify-center">
              <p className="text-base">{answer}</p>
            </CardContent>
             <div className="text-xs text-muted-foreground p-2 flex items-center justify-center gap-1">
              <RefreshCw size={12} />
              Click to flip
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
