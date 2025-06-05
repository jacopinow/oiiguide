"use client";
import { useParams } from "next/navigation";
import Link from 'next/link';

// Dati di esempio per le categorie del forum (da sostituire con dati da API/DB)
const exampleForumCategories = [
  { id: "general", name: "Discussione Generale", description: "Parla di tutto ciò che riguarda la programmazione competitiva." },
  { id: "cpp", name: "C++ Aiuto e Discussione", description: "Domande specifiche su C++, STL, algoritmi in C++." },
  { id: "problems", name: "Aiuto sui Problemi", description: "Bloccato su un problema? Chiedi aiuto qui." },
  { id: "contests", name: "Discussione Contest", description: "Parla dei contest passati, presenti e futuri." },
];

export default function ForumHomePage() {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Forum</h1>
      <div className="space-y-4">
        {exampleForumCategories.map((category) => (
          <Link key={category.id} href={`/forum/${category.id}`} legacyBehavior>
            <a className="block p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">{category.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{category.description}</p>
            </a>
          </Link>
        ))}
      </div>
      {/* TODO: Aggiungere funzionalità per creare nuovi topic direttamente dalla homepage del forum o da una pagina dedicata */}
    </div>
  );
}

