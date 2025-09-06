# NoteWise AI 🧠✨

**Turn your notes into knowledge, instantly.**

NoteWise AI is an intelligent study companion that leverages the power of Generative AI to automatically create summaries, interactive flashcards, and quizzes from your course notes. Stop spending hours creating study materials and start focusing on what matters most: learning.
---

## 🚀 The Problem

Students are often overwhelmed with dense lecture notes, textbooks, and articles. The process of manually summarizing content, creating flashcards, and writing practice questions is tedious, time-consuming, and can be a barrier to effective learning.

## ✨ Our Solution

NoteWise AI streamlines the entire study process. Simply paste your notes or upload a document (PDF, DOCX, TXT), and our AI will instantly generate:

*   **🎯 Key Points Summary:** A concise, bulleted list of the most important information.
*   **🖼️ Interactive Flashcards:** Beautifully designed flashcards with questions, answers, and **AI-generated images** to create strong visual associations.
*   **✍️ Challenging Quizzes:** A multiple-choice quiz to test your knowledge and help you identify areas for improvement.

This allows students to create high-quality, personalized study aids in seconds, not hours.

---

## 🛠️ Tech Stack

NoteWise AI is built with a modern, scalable, and powerful tech stack:

*   **Frontend:** [Next.js](https://nextjs.org/) & [React](https://react.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
*   **Generative AI:** [Google's Genkit](https://firebase.google.com/docs/genkit) & Gemini Models

We used **Google's Genkit** to orchestrate multiple calls to the Gemini AI model, enabling us to generate structured JSON for summaries, flashcards, and quizzes in a single, efficient server action. This includes advanced features like extracting text from documents and generating relevant image queries for the flashcards.

---

## 🏁 Getting Started

### Prerequisites

*   Node.js (v18 or later)
*   npm or yarn

### Installation & Running Locally

1.  **Clone the repository:**
    ```bash
    git clone https://your-repo-url/notewise-ai.git
    cd notewise-ai
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your environment variables:**
    Create a `.env` file in the root of your project and add your Google AI API Key:
    ```
    GEMINI_API_KEY=your_google_ai_api_key
    ```

4.  **Run the development server:**
    The app runs on port `9002` by default.
    ```bash
    npm run dev
    ```

5.  **Start the Genkit development service:**
    In a separate terminal, run:
    ```bash
    npm run genkit:dev
    ```

Open [http://localhost:9002](http://localhost:9002) in your browser to see the result!

---

## 🏆 Why NoteWise AI Stands Out

*   **Efficiency:** Drastically reduces the time and effort required to create study materials.
*   **Enhanced Learning:** Visual aids on flashcards and instant quiz feedback improve retention and understanding.
*   **Accessibility:** Supports both text input and common document formats (PDF, DOCX), making it versatile for any type of note-taker.
*   **Modern UI:** A clean, responsive, and intuitive interface that makes studying a pleasure, not a chore.

We believe NoteWise AI is a powerful tool that can make a real difference in any student's academic journey. Thank you for your consideration!
