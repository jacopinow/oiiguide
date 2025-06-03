"[use client]";

import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaExternalLinkAlt, FaLightbulb, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

// Definizione dei livelli utente (esempio, da sincronizzare con il sistema di livelli del sito)
type UserLevel = 'Principiante' | 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Esperto';

interface Contest {
  id: string;
  platform: 'Codeforces' | 'AtCoder';
  name: string;
  startTime: string; // Formato ISO 8601 o stringa leggibile
  duration: string;
  url: string;
  difficulty?: string; // Es. "Div. 2", "Beginner Contest", "Rated for <= 1900"
  rawDifficulty?: any; // Per logica di consiglio
  // Campo per il consiglio personalizzato
  recommendation?: {
    text: string;
    type: 'good' | 'caution' | 'neutral';
  };
}

// Dati di esempio per i contest (da sostituire con dati da API)
const exampleContests: Contest[] = [
  {
    id: "cf1",
    platform: "Codeforces",
    name: "Codeforces Round #999 (Div. 2)",
    startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // Tra 2 giorni
    duration: "2h",
    url: "https://codeforces.com/contests",
    difficulty: "Div. 2 (Rated for <= 2099)",
    rawDifficulty: { type: 'CF_DIV2', maxRating: 2099 }
  },
  {
    id: "cf2",
    platform: "Codeforces",
    name: "Codeforces Round #998 (Div. 3)",
    startTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // Tra 5 giorni
    duration: "2h 15m",
    url: "https://codeforces.com/contests",
    difficulty: "Div. 3 (Rated for <= 1599)",
    rawDifficulty: { type: 'CF_DIV3', maxRating: 1599 }
  },
  {
    id: "ac1",
    platform: "AtCoder",
    name: "AtCoder Beginner Contest 350",
    startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // Tra 3 giorni
    duration: "1h 40m",
    url: "https://atcoder.jp/contests",
    difficulty: "Beginner (Rated for <= 1199)",
    rawDifficulty: { type: 'AT_BEGINNER', maxRating: 1199 }
  },
  {
    id: "ac2",
    platform: "AtCoder",
    name: "AtCoder Regular Contest 180",
    startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Tra 7 giorni
    duration: "2h",
    url: "https://atcoder.jp/contests",
    difficulty: "Regular (Rated for <= 2799)",
    rawDifficulty: { type: 'AT_REGULAR', maxRating: 2799 }
  },
];

// Funzione per generare consigli (logica di esempio)
const generateRecommendation = (contest: Contest, userLevel: UserLevel): { text: string; type: 'good' | 'caution' | 'neutral' } => {
  // Mappatura approssimativa livelli USACO a rating (molto semplificata)
  const levelToRating = {
    'Principiante': 800,
    'Bronze': 1200,
    'Silver': 1600,
    'Gold': 2000,
    'Platinum': 2400,
    'Esperto': 2800,
  };
  const userRatingEquivalent = levelToRating[userLevel] || 1200; // Default a Silver basso

  if (contest.platform === 'Codeforces') {
    if (contest.rawDifficulty.type === 'CF_DIV3') {
      if (userRatingEquivalent <= 1700) return { text: "Fortemente consigliato per il tuo livello! Ottima pratica.", type: 'good' };
      return { text: "Potrebbe essere un po' facile, ma utile per consolidare.", type: 'neutral' };
    }
    if (contest.rawDifficulty.type === 'CF_DIV2') {
      if (userRatingEquivalent >= 1400 && userRatingEquivalent <= 2200) return { text: "Sfida adatta al tuo livello. Provalo!", type: 'good' };
      if (userRatingEquivalent < 1400) return { text: "Potrebbe essere molto difficile. Considera di fare l'upsolving.", type: 'caution' };
      return { text: "Buona pratica, anche se potresti trovarlo non troppo stimolante.", type: 'neutral' };
    }
  } else if (contest.platform === 'AtCoder') {
    if (contest.rawDifficulty.type === 'AT_BEGINNER') {
      if (userRatingEquivalent <= 1300) return { text: "Perfetto per il tuo livello! Non perderlo.", type: 'good' };
      return { text: "Utile per riscaldamento o per puntare a un full score veloce.", type: 'neutral' };
    }
    if (contest.rawDifficulty.type === 'AT_REGULAR') {
      if (userRatingEquivalent >= 1600 && userRatingEquivalent <= 2800) return { text: "Ottima sfida per testare le tue abilità.", type: 'good' };
      if (userRatingEquivalent < 1600) return { text: "Molto impegnativo. Ottimo per imparare guardando le soluzioni dopo.", type: 'caution' };
      return { text: "Una buona gara di allenamento.", type: 'neutral' };
    }
  }
  return { text: "Valuta attentamente la difficoltà in base alla tua esperienza.", type: 'neutral' };
};

export default function ContestsPage() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  // Simula il livello dell'utente attuale (da integrare con il sistema di autenticazione e profilo)
  const [currentUserLevel] = useState<UserLevel>('Silver'); 

  useEffect(() => {
    // Simula il caricamento dei dati da un'API
    // In un'applicazione reale, qui faresti una richiesta GET a /api/contests o simile
    // e poi mapperesti i dati per includere le raccomandazioni
    setTimeout(() => {
      const processedContests = exampleContests.map(c => ({
        ...c,
        recommendation: generateRecommendation(c, currentUserLevel)
      })).sort((a,b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
      setContests(processedContests);
      setLoading(false);
    }, 1000); // Simula un ritardo di rete
  }, [currentUserLevel]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('it-IT', { dateStyle: 'full', timeStyle: 'short' });
  };

  const getRecommendationIcon = (type: 'good' | 'caution' | 'neutral') => {
    if (type === 'good') return <FaCheckCircle className="text-green-500 mr-2" />;
    if (type === 'caution') return <FaExclamationTriangle className="text-yellow-500 mr-2" />;
    return <FaLightbulb className="text-blue-500 mr-2" />;
  };

  if (loading) {
    return <p className="text-center mt-10">Caricamento contest imminenti...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Contest Imminenti</h1>
      
      {contests.length === 0 && !loading && (
        <p className="text-center text-gray-600 dark:text-gray-400">Nessun contest imminente trovato al momento.</p>
      )}

      <div className="space-y-6">
        {contests.map((contest) => (
          <div key={contest.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
              <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2 sm:mb-0">{contest.name}</h2>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${contest.platform === 'Codeforces' ? 'bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100' : 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100'}`}>
                {contest.platform}
              </span>
            </div>
            <div className="text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <p className="flex items-center"><FaCalendarAlt className="mr-2 text-gray-500 dark:text-gray-400" /> <strong>Inizio:</strong> {formatDate(contest.startTime)}</p>
              <p><strong className="ml-6">Durata:</strong> {contest.duration}</p>
              {contest.difficulty && (
                <p><strong className="ml-6">Difficoltà:</strong> {contest.difficulty}</p>
              )}
            </div>

            {contest.recommendation && (
              <div className={`flex items-center p-3 rounded-md mb-4 ${contest.recommendation.type === 'good' ? 'bg-green-50 dark:bg-green-900' : contest.recommendation.type === 'caution' ? 'bg-yellow-50 dark:bg-yellow-900' : 'bg-blue-50 dark:bg-blue-900'}`}>
                {getRecommendationIcon(contest.recommendation.type)}
                <p className={`text-sm ${contest.recommendation.type === 'good' ? 'text-green-700 dark:text-green-200' : contest.recommendation.type === 'caution' ? 'text-yellow-700 dark:text-yellow-200' : 'text-blue-700 dark:text-blue-200'}`}>
                  {contest.recommendation.text}
                </p>
              </div>
            )}

            <a 
              href={contest.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Vai al Contest <FaExternalLinkAlt className="ml-2" />
            </a>
          </div>
        ))}
      </div>
      <p className="text-xs text-center mt-8 text-gray-500 dark:text-gray-400">Le informazioni sui contest sono indicative e soggette a modifiche. Controlla sempre i siti ufficiali. Livello utente attuale per i consigli: {currentUserLevel}.</p>
      {/* TODO: Aggiungere filtri per piattaforma, difficoltà, ecc. */}
      {/* TODO: Implementare l'aggiornamento automatico da API reali */}
    </div>
  );
}

