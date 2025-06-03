"[use client]";

import { useParams } from "next/navigation";

// Definizione di un tipo per le domande del quiz (esempio)
interface QuizQuestion {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
}

// Dati di esempio per un quiz (da sostituire con dati da API/DB)
const exampleQuizData: { [key: string]: { title: string; questions: QuizQuestion[] } } = {
  "dijkstra-basics": {
    title: "Quiz Base sull'Algoritmo di Dijkstra",
    questions: [
      {
        id: "q1",
        text: "Cosa calcola principalmente l'algoritmo di Dijkstra?",
        options: [
          { id: "opt1_1", text: "Il cammino minimo tra due nodi in un grafo pesato." },
          { id: "opt1_2", text: "L'albero ricoprente minimo di un grafo." },
          { id: "opt1_3", text: "Il flusso massimo in una rete." },
          { id: "opt1_4", text: "L'ordinamento topologico di un grafo aciclico diretto." },
        ],
        correctOptionId: "opt1_1",
      },
      {
        id: "q2",
        text: "Quale struttura dati è comunemente usata per ottimizzare Dijkstra?",
        options: [
          { id: "opt2_1", text: "Coda di priorità (min-heap)." },
          { id: "opt2_2", text: "Stack." },
          { id: "opt2_3", text: "Tabella hash." },
          { id: "opt2_4", text: "Lista concatenata." },
        ],
        correctOptionId: "opt2_1",
      },
    ],
  },
};

export default function QuizPage() {
  const params = useParams();
  const quizId = params.quizId as string;
  const quiz = exampleQuizData[quizId];

  // TODO: Gestire lo stato delle risposte, il punteggio, la sottomissione, etc.

  if (!quiz) {
    return <p>Quiz non trovato.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5 text-center">{quiz.title}</h1>
      <form className="space-y-6">
        {quiz.questions.map((question, index) => (
          <div key={question.id} className="p-4 border rounded-md dark:border-gray-700">
            <p className="font-semibold mb-2">
              {index + 1}. {question.text}
            </p>
            <div className="space-y-2">
              {question.options.map((option) => (
                <label key={option.id} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option.id}
                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out dark:bg-gray-600 dark:border-gray-500"
                  />
                  <span>{option.text}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
        >
          Invia Risposte
        </button>
      </form>
    </div>
  );
}

