"[use client]";

import { useEffect, useState } from 'react';

// Definizione di un tipo per i dati utente della classifica (esempio)
interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  xp: number;
  // Altri campi come badge, problemi risolti, etc.
}

// Dati di esempio per la classifica (da sostituire con dati da API/DB)
const exampleLeaderboardData: LeaderboardUser[] = [
  { id: "user1", rank: 1, name: "Alice", xp: 10500 },
  { id: "user2", rank: 2, name: "Bob", xp: 9800 },
  { id: "user3", rank: 3, name: "Charlie", xp: 9750 },
  { id: "user4", rank: 4, name: "Diana", xp: 8500 },
  { id: "user5", rank: 5, name: "Edward", xp: 7200 },
  { id: "user6", rank: 6, name: "Fiona", xp: 6800 },
  { id: "user7", rank: 7, name: "George", xp: 6500 },
  { id: "user8", rank: 8, name: "Hannah", xp: 6200 },
  { id: "user9", rank: 9, name: "Ian", xp: 5900 },
  { id: "user10", rank: 10, name: "Julia", xp: 5500 },
];

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula il caricamento dei dati da un'API
    // In un'applicazione reale, qui faresti una richiesta GET a /api/leaderboard o simile
    setTimeout(() => {
      setLeaderboardData(exampleLeaderboardData);
      setLoading(false);
    }, 1000); // Simula un ritardo di rete
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Caricamento classifica...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Classifica Globale</h1>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Rank
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Utente
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                XP
              </th>
              {/* Aggiungere altre colonne se necessario */}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {leaderboardData.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {user.rank}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {user.xp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* TODO: Aggiungere paginazione se la classifica è molto lunga */}
      {/* TODO: Aggiungere filtri per classifiche di gruppo */}
    </div>
  );
}

