import { config } from 'dotenv';
config();

import '@/ai/flows/generate-flashcards-from-notes.ts';
import '@/ai/flows/create-quiz-from-notes.ts';
import '@/ai/flows/summarize-uploaded-notes.ts';