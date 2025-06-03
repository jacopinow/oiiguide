"[use client]";

import Link from 'next/link';
import { useParams } from "next/navigation";

// Dati di esempio per i topic (da sostituire con dati da API/DB)
const exampleTopics = {
  general: [
    { id: "welcome", title: "Benvenuti nel Forum!", author: "Admin", replies: 15, lastPost: "2 ore fa" },
    { id: "suggestions", title: "Suggerimenti per il Sito", author: "User123", replies: 8, lastPost: "1 giorno fa" },
  ],
  cpp: [
    { id: "stl-vectors", title: "Domanda sui Vettori STL", author: "NewbieCoder", replies: 5, lastPost: "30 minuti fa" },
    { id: "dijkstra-impl", title: "Ottimizzazione Implementazione Dijkstra", author: "ProGrammer", replies: 12, lastPost: "5 ore fa" },
  ],
  problems: [
    { id: "problem-xyz", title: "Aiuto con il problema XYZ di Codeforces", author: "StuckUser", replies: 3, lastPost: "1 ora fa" },
  ],
  contests: [],
};

// Dati di esempio per le categorie del forum (da ripetere o importare se necessario)
const exampleForumCategories: { [key: string]: { name: string; description: string } } = {
  general: { name: "Discussione Generale", description: "Parla di tutto ciò che riguarda la programmazione competitiva." },
  cpp: { name: "C++ Aiuto e Discussione", description: "Domande specifiche su C++, STL, algoritmi in C++." },
  problems: { name: "Aiuto sui Problemi", description: "Bloccato su un problema? Chiedi aiuto qui." },
  contests: { name: "Discussione Contest", description: "Parla dei contest passati, presenti e futuri." },
};

export default function ForumCategoryPage() {
  const params = useParams();
  const categoryId = params.categoryId as string;
  const category = exampleForumCategories[categoryId];
  const topics = exampleTopics[categoryId as keyof typeof exampleTopics] || [];

  if (!category) {
    return <p>Categoria non trovata.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="mb-6">
        <Link href="/forum" className="text-indigo-600 dark:text-indigo-400 hover:underline">&larr; Torna al Forum</Link>
      </div>
      <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">{category.description}</p>

      <div className="mb-6 text-right">
        {/* TODO: Link/Button per creare un nuovo topic in questa categoria */}
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
          Nuovo Topic
        </button>
      </div>

      {topics.length > 0 ? (
        <div className="space-y-4">
          {topics.map((topic) => (
            <Link key={topic.id} href={`/forum/${categoryId}/${topic.id}`} legacyBehavior>
              <a className="block p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">{topic.title}</h2>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <span>Autore: {topic.author}</span> | <span>Risposte: {topic.replies}</span> | <span>Ultimo Messaggio: {topic.lastPost}</span>
                </div>
              </a>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">Nessun topic in questa categoria per ora.</p>
      )}
      {/* TODO: Aggiungere paginazione per i topic */}
    </div>
  );
}

