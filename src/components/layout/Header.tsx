import { BrainCircuit } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-card shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <BrainCircuit className="h-8 w-8 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold font-headline text-foreground">
            NoteWise AI
          </h1>
        </div>
      </div>
    </header>
  );
}
