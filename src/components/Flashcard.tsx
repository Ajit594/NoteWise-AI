"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";

interface FlashcardProps {
  question: string;
  answer: string;
  imageQuery: string;
}

export default function Flashcard({ question, answer, imageQuery }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="w-full h-80 [perspective:1000px] cursor-pointer group"
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
          <Card className="w-full h-full flex flex-col justify-between shadow-lg overflow-hidden">
            <div className="relative w-full h-32">
              <Image
                src={`https://picsum.photos/400/200?random=${encodeURIComponent(imageQuery)}`}
                alt={question}
                fill
                className="object-cover"
                data-ai-hint={imageQuery}
              />
            </div>
            <CardContent className="p-4 flex-grow flex items-center justify-center">
              <p className="text-base font-semibold">{question}</p>
            </CardContent>
            <div className="text-xs text-muted-foreground p-2 flex items-center justify-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
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
             <div className="text-xs text-muted-foreground p-2 flex items-center justify-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
              <RefreshCw size={12} />
              Click to flip
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
