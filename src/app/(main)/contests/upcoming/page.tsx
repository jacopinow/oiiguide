import React from 'react';
import { fetchUpcomingContests } from '@/lib/api/contests';

// Componente per la pagina dei contest imminenti
export default async function UpcomingContestsPage() {
  // Recupera i contest imminenti dalle API di Codeforces e AtCoder
  const contests = await fetchUpcomingContests();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Contest Imminenti</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Codeforces</h2>
          <div className="space-y-4">
            {contests.codeforces.length > 0 ? (
              contests.codeforces.map((contest) => (
                <ContestCard 
                  key={contest.id}
                  contest={contest}
                  platform="codeforces"
                />
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">Nessun contest Codeforces imminente trovato.</p>
            )}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">AtCoder</h2>
          <div className="space-y-4">
            {contests.atcoder.length > 0 ? (
              contests.atcoder.map((contest) => (
                <ContestCard 
                  key={contest.id}
                  contest={contest}
                  platform="atcoder"
                />
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">Nessun contest AtCoder imminente trovato.</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Consigli per la Partecipazione</h2>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Partecipa regolarmente ai contest per migliorare le tue abilità di problem solving sotto pressione.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Dopo ogni contest, dedica del tempo a rivedere i problemi che non sei riuscito a risolvere.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Per i principianti, i contest Codeforces Div.3 e AtCoder Beginner sono ottimi punti di partenza.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Man mano che migliori, prova a partecipare a contest di livello più alto per continuare a sfidare te stesso.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

// Componente per la card di un singolo contest
function ContestCard({ contest, platform }) {
  // Funzione per determinare il colore del badge in base alla difficoltà
  const getBadgeColor = () => {
    if (platform === 'codeforces') {
      if (contest.difficulty.includes('Div. 1')) return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      if (contest.difficulty.includes('Div. 2')) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      if (contest.difficulty.includes('Div. 3')) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    } else {
      if (contest.difficulty.includes('Beginner')) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      if (contest.difficulty.includes('Regular')) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      if (contest.difficulty.includes('Grand')) return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  // Funzione per determinare il messaggio di raccomandazione in base al livello utente
  const getRecommendation = () => {
    // In una versione reale, questo verrebbe determinato in base al livello dell'utente
    // Per ora, usiamo una logica semplificata
    if (platform === 'codeforces') {
      if (contest.difficulty.includes('Div. 1')) return 'Consigliato per livello Platinum/Advanced';
      if (contest.difficulty.includes('Div. 2')) return 'Consigliato per livello Gold/Platinum';
      if (contest.difficulty.includes('Div. 3')) return 'Consigliato per livello Silver/Gold';
      if (contest.difficulty.includes('Div. 4')) return 'Consigliato per livello Bronze/Silver';
    } else {
      if (contest.difficulty.includes('Beginner')) return 'Consigliato per livello Bronze/Silver';
      if (contest.difficulty.includes('Regular')) return 'Consigliato per livello Gold/Platinum';
      if (contest.difficulty.includes('Grand')) return 'Consigliato per livello Platinum/Advanced';
    }
    return 'Valuta in base al tuo livello attuale';
  };

  // Formatta la data e l'ora del contest
  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return new Intl.DateTimeFormat('it-IT', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Calcola la durata in ore e minuti
  const formatDuration = (durationMinutes) => {
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    return `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`;
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{contest.name}</h3>
        <span className={`px-2 py-1 rounded text-xs font-medium ${getBadgeColor()}`}>
          {contest.difficulty}
        </span>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <p><span className="font-medium">Data:</span> {formatDateTime(contest.startTime)}</p>
        <p><span className="font-medium">Durata:</span> {formatDuration(contest.durationMinutes)}</p>
        <p className="text-xs italic">{getRecommendation()}</p>
      </div>
      
      <div className="mt-3">
        <a 
          href={contest.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
        >
          Vai al contest →
        </a>
      </div>
    </div>
  );
}
