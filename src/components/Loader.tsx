import { LoaderCircle } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
      <h2 className="text-2xl font-headline font-semibold">
        Generating Your Study Aids...
      </h2>
      <p className="text-muted-foreground max-w-md">
        Our AI is hard at work creating your summary, flashcards, and quiz. This might take a moment.
      </p>
    </div>
  );
}
