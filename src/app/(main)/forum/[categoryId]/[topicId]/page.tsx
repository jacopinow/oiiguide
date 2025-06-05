"use client";

import Link from 'next/link';
import { useParams } from "next/navigation";

// Dati di esempio per un singolo topic (da sostituire con dati da API/DB)
const exampleTopicDetails = {
  "stl-vectors": {
    categoryId: "cpp",
    title: "Domanda sui Vettori STL",
    author: "NewbieCoder",
    createdAt: "3 ore fa",
    posts: [
      {
        id: "post1",
        author: "NewbieCoder",
        avatar: "/avatars/newbie.png", // Esempio di path avatar
        content: "Ciao a tutti, ho un dubbio sull'utilizzo dei vettori nella STL di C++. Quando è preferibile usare `std::vector` rispetto a un array classico? E quali sono i metodi più comuni che dovrei conoscere?",
        postedAt: "3 ore fa",
      },
      {
        id: "post2",
        author: "ProGrammer",
        avatar: "/avatars/pro.png",
        content: "Ciao NewbieCoder! `std::vector` è generalmente preferibile perché gestisce la memoria dinamicamente, quindi non devi preoccuparti della dimensione a priori e puoi aggiungere o rimuovere elementi facilmente. Metodi comuni includono `push_back()`, `pop_back()`, `size()`, `capacity()`, `at()`, `operator[]`, `begin()`, `end()`. Ricorda che `at()` fa un controllo dei limiti e lancia un'eccezione, mentre `operator[]` no.",
        postedAt: "2 ore fa",
      },
      {
        id: "post3",
        author: "Admin",
        avatar: "/avatars/admin.png",
        content: "Ottima spiegazione ProGrammer! Aggiungerei anche `reserve()` per preallocare memoria se conosci approssimativamente la dimensione finale, e `clear()` per rimuovere tutti gli elementi.",
        postedAt: "1 ora fa",
      },
    ],
  },
  "dijkstra-impl": {
    categoryId: "cpp",
    title: "Ottimizzazione Implementazione Dijkstra",
    author: "ProGrammer",
    createdAt: "8 ore fa",
    posts: [
        {
            id: "post1_d",
            author: "ProGrammer",
            avatar: "/avatars/pro.png",
            content: "Sto cercando di ottimizzare la mia implementazione di Dijkstra. Attualmente uso una `std::priority_queue` con `std::pair`. Ci sono modi per renderla più veloce per grafi densi o sparsi?",
            postedAt: "8 ore fa",
        }
    ]
  }
  // Aggiungere altri topic di esempio...
};

export default function ForumTopicPage() {
  const params = useParams();
  const categoryId = params.categoryId as string;
  const topicId = params.topicId as string;
  const topic = exampleTopicDetails[topicId as keyof typeof exampleTopicDetails];

  if (!topic || topic.categoryId !== categoryId) {
    return <p>Topic non trovato o non appartenente a questa categoria.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="mb-6">
        <Link href={`/forum/${categoryId}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">
          &larr; Torna a {categoryId.toUpperCase()} Topics
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-3">{topic.title}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Creato da: {topic.author} - {topic.createdAt}
      </p>

      <div className="space-y-6">
        {topic.posts.map((post, index) => (
          <div key={post.id} className={`p-6 rounded-lg shadow-md ${index === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700 ml-0 md:ml-8'}`}>
            <div className="flex items-start space-x-4">
              {/* <img src={post.avatar || '/avatars/default.png'} alt={`${post.author} avatar`} className="w-10 h-10 rounded-full" /> */}
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-white font-bold">
                {post.author.substring(0,1).toUpperCase()} {/* Placeholder per avatar */}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{post.author}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{post.postedAt}</p>
              </div>
            </div>
            <div className="mt-4 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {post.content}
            </div>
            {/* TODO: Aggiungere opzioni per rispondere, citare, modificare (se l'utente è l'autore) */}
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Rispondi al Topic</h2>
        {/* TODO: Form per la risposta (textarea, pulsante invia) - Richiede autenticazione */}
        <textarea 
          rows={5} 
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Scrivi la tua risposta..."
        />
        <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
          Invia Risposta
        </button>
      </div>
    </div>
  );
}

