import React from 'react';

/**
 * Componente per testare l'API dei contest imminenti
 */
export default function TestContestsAPI() {
  const [contests, setContests] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Funzione per recuperare i contest imminenti
  const fetchContests = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/contests/upcoming');
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Si è verificato un errore');
      }
      
      setContests(data.data);
    } catch (err) {
      setError(err.message);
      console.error('Errore nel recupero dei contest:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Test API Contest Imminenti</h1>
      
      <div className="flex justify-center mb-6">
        <button
          onClick={fetchContests}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Caricamento...' : 'Recupera Contest'}
        </button>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
          <p className="font-bold">Errore:</p>
          <p>{error}</p>
        </div>
      )}
      
      {contests && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Codeforces</h2>
            {contests.codeforces.length > 0 ? (
              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-auto">
                {JSON.stringify(contests.codeforces, null, 2)}
              </pre>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">Nessun contest Codeforces trovato.</p>
            )}
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">AtCoder</h2>
            {contests.atcoder.length > 0 ? (
              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-auto">
                {JSON.stringify(contests.atcoder, null, 2)}
              </pre>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">Nessun contest AtCoder trovato.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
