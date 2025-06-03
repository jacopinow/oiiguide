import React from 'react';

/**
 * Componente per la pagina della classifica
 */
export default function LeaderboardPage() {
  const [leaderboardType, setLeaderboardType] = React.useState('overall');
  const [leaderboard, setLeaderboard] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Carica i dati della classifica all'avvio
  React.useEffect(() => {
    fetchLeaderboard();
  }, []);

  // Funzione per recuperare i dati della classifica
  const fetchLeaderboard = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/leaderboard');
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Si è verificato un errore durante il recupero della classifica');
      }
      
      setLeaderboard(data.data);
    } catch (err) {
      setError(err.message);
      console.error('Errore nel recupero della classifica:', err);
    } finally {
      setLoading(false);
    }
  };

  // Funzione per ottenere la classifica corrente in base al tipo selezionato
  const getCurrentLeaderboard = () => {
    if (!leaderboard) return [];
    
    switch (leaderboardType) {
      case 'overall': return leaderboard.overall;
      case 'weekly': return leaderboard.weekly;
      case 'problemsSolved': return leaderboard.problemsSolved;
      case 'streak': return leaderboard.streak;
      default: return leaderboard.overall;
    }
  };

  // Funzione per formattare il numero con separatori di migliaia
  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Classifica</h1>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
            <p className="font-bold">Errore:</p>
            <p>{error}</p>
          </div>
        )}
        
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setLeaderboardType('overall')}
              className={`px-4 py-2 rounded ${
                leaderboardType === 'overall' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              XP Totale
            </button>
            <button
              onClick={() => setLeaderboardType('weekly')}
              className={`px-4 py-2 rounded ${
                leaderboardType === 'weekly' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              Attività Settimanale
            </button>
            <button
              onClick={() => setLeaderboardType('problemsSolved')}
              className={`px-4 py-2 rounded ${
                leaderboardType === 'problemsSolved' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              Problemi Risolti
            </button>
            <button
              onClick={() => setLeaderboardType('streak')}
              className={`px-4 py-2 rounded ${
                leaderboardType === 'streak' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              Streak Più Lunga
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">Caricamento classifica in corso...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-2 text-left">Posizione</th>
                  <th className="px-4 py-2 text-left">Utente</th>
                  <th className="px-4 py-2 text-right">
                    {leaderboardType === 'overall' && 'XP Totale'}
                    {leaderboardType === 'weekly' && 'Streak Attuale'}
                    {leaderboardType === 'problemsSolved' && 'Problemi Risolti'}
                    {leaderboardType === 'streak' && 'Streak Più Lunga'}
                  </th>
                  <th className="px-4 py-2 text-right">Livello</th>
                  <th className="px-4 py-2 text-right">Badge</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentLeaderboard().map((user, index) => (
                  <tr 
                    key={user.id} 
                    className={`${
                      index % 2 === 0 
                        ? 'bg-white dark:bg-gray-800' 
                        : 'bg-gray-50 dark:bg-gray-750'
                    } ${
                      index < 3 
                        ? 'border-l-4 ' + (
                            index === 0 
                              ? 'border-yellow-400' 
                              : index === 1 
                                ? 'border-gray-400' 
                                : 'border-amber-700'
                          )
                        : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        {index < 3 ? (
                          <span className={`w-8 h-8 flex items-center justify-center rounded-full mr-2 ${
                            index === 0 
                              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' 
                              : index === 1 
                                ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' 
                                : 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'
                          }`}>
                            {index + 1}
                          </span>
                        ) : (
                          <span className="w-8 h-8 flex items-center justify-center mr-2">
                            {index + 1}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <img 
                          src={user.avatar} 
                          alt={user.username} 
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <span className="font-medium">{user.username}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      {leaderboardType === 'overall' && formatNumber(user.xp)}
                      {leaderboardType === 'weekly' && `${user.streak.current} giorni`}
                      {leaderboardType === 'problemsSolved' && formatNumber(user.problemsSolved)}
                      {leaderboardType === 'streak' && `${user.streak.longest} giorni`}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded">
                        Liv. {user.level}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        {user.badges}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
