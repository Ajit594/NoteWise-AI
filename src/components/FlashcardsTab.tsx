import type { GenerateFlashcardsOutput } from "@/ai/flows/generate-flashcards-from-notes";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Flashcard from "./Flashcard";

interface FlashcardsTabProps {
  flashcards: GenerateFlashcardsOutput;
}

export default function FlashcardsTab({ flashcards }: FlashcardsTabProps) {
  if (!flashcards || flashcards.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <p>No flashcards were generated.</p>
      </div>
    );
  }

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {flashcards.map((card, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Flashcard question={card.question} answer={card.answer} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-12" />
      <CarouselNext className="mr-12" />
    </Carousel>
  );
}
