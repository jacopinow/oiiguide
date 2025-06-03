import React from 'react';

/**
 * Componente per testare l'integrazione di tutte le API
 */
export default function TestIntegrationPage() {
  const [testResults, setTestResults] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  // Funzione per eseguire tutti i test
  const runAllTests = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setTestResults({});
    
    try {
      // Test API contest imminenti
      await testContestsAPI();
      
      // Test API valutazione sottomissioni
      await testSubmissionsAPI();
      
      // Test API tracking progressi
      await testProgressAPI();
      
      // Test API forum
      await testForumAPI();
      
      // Test API GitHub
      await testGitHubAPI();
      
      // Test API leaderboard
      await testLeaderboardAPI();
      
      // Test API gruppi
      await testGroupsAPI();
      
      // Test integrazione tra API
      await testIntegrationAPI();
      
      setSuccess(true);
    } catch (err) {
      setError(err.message);
      console.error('Errore nei test di integrazione:', err);
    } finally {
      setLoading(false);
    }
  };

  // Test API contest imminenti
  const testContestsAPI = async () => {
    try {
      const response = await fetch('/api/contests/upcoming');
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Errore nel test API contest');
      }
      
      setTestResults(prev => ({
        ...prev,
        contests: {
          status: 'success',
          message: 'API contest imminenti funzionante',
          data: data.data
        }
      }));
      
      return data;
    } catch (err) {
      setTestResults(prev => ({
        ...prev,
        contests: {
          status: 'error',
          message: `Errore API contest: ${err.message}`
        }
      }));
      throw err;
    }
  };

  // Test API valutazione sottomissioni
  const testSubmissionsAPI = async () => {
    try {
      const response = await fetch('/api/submissions/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: 'user123',
          problemId: 'fibonacci',
          code: '// Test code',
          language: 'cpp'
        })
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Errore nel test API sottomissioni');
      }
      
      setTestResults(prev => ({
        ...prev,
        submissions: {
          status: 'success',
          message: 'API valutazione sottomissioni funzionante',
          data: data.result
        }
      }));
      
      return data;
    } catch (err) {
      setTestResults(prev => ({
        ...prev,
        submissions: {
          status: 'error',
          message: `Errore API sottomissioni: ${err.message}`
        }
      }));
      throw err;
    }
  };

  // Test API tracking progressi
  const testProgressAPI = async () => {
    try {
      const response = await fetch('/api/user/progress/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: 'user123',
          activityType: 'problem_solved',
          activityData: {
            problemId: 'test_problem',
            difficulty: 'medium',
            score: 85
          }
        })
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Errore nel test API progressi');
      }
      
      setTestResults(prev => ({
        ...prev,
        progress: {
          status: 'success',
          message: 'API tracking progressi funzionante',
          data: data.data
        }
      }));
      
      return data;
    } catch (err) {
      setTestResults(prev => ({
        ...prev,
        progress: {
          status: 'error',
          message: `Errore API progressi: ${err.message}`
        }
      }));
      throw err;
    }
  };

  // Test API forum
  const testForumAPI = async () => {
    try {
      const response = await fetch('/api/forum/topics/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: 'user123',
          categoryId: 'general',
          title: 'Test Topic',
          content: 'Test content'
        })
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Errore nel test API forum');
      }
      
      setTestResults(prev => ({
        ...prev,
        forum: {
          status: 'success',
          message: 'API forum funzionante',
          data: data.data
        }
      }));
      
      return data;
    } catch (err) {
      setTestResults(prev => ({
        ...prev,
        forum: {
          status: 'error',
          message: `Errore API forum: ${err.message}`
        }
      }));
      throw err;
    }
  };

  // Test API GitHub
  const testGitHubAPI = async () => {
    try {
      const response = await fetch('/api/github/save-solution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: 'user123',
          problemId: 'test_problem',
          code: '// Test code',
          language: 'cpp',
          filename: 'test_solution'
        })
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Errore nel test API GitHub');
      }
      
      setTestResults(prev => ({
        ...prev,
        github: {
          status: 'success',
          message: 'API GitHub funzionante',
          data: data.data
        }
      }));
      
      return data;
    } catch (err) {
      setTestResults(prev => ({
        ...prev,
        github: {
          status: 'error',
          message: `Errore API GitHub: ${err.message}`
        }
      }));
      throw err;
    }
  };

  // Test API leaderboard
  const testLeaderboardAPI = async () => {
    try {
      const response = await fetch('/api/leaderboard');
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Errore nel test API leaderboard');
      }
      
      setTestResults(prev => ({
        ...prev,
        leaderboard: {
          status: 'success',
          message: 'API leaderboard funzionante',
          data: data.data
        }
      }));
      
      return data;
    } catch (err) {
      setTestResults(prev => ({
        ...prev,
        leaderboard: {
          status: 'error',
          message: `Errore API leaderboard: ${err.message}`
        }
      }));
      throw err;
    }
  };

  // Test API gruppi
  const testGroupsAPI = async () => {
    try {
      const response = await fetch('/api/groups');
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Errore nel test API gruppi');
      }
      
      setTestResults(prev => ({
        ...prev,
        groups: {
          status: 'success',
          message: 'API gruppi funzionante',
          data: data.data
        }
      }));
      
      return data;
    } catch (err) {
      setTestResults(prev => ({
        ...prev,
        groups: {
          status: 'error',
          message: `Errore API gruppi: ${err.message}`
        }
      }));
      throw err;
    }
  };

  // Test integrazione tra API
  const testIntegrationAPI = async () => {
    try {
      // Simula un flusso completo: risoluzione problema -> aggiornamento progressi -> salvataggio su GitHub
      
      // 1. Valutazione sottomissione
      const submissionResponse = await fetch('/api/submissions/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: 'user123',
          problemId: 'integration_test',
          code: '// Integration test code',
          language: 'cpp'
        })
      });
      
      const submissionData = await submissionResponse.json();
      
      if (!submissionData.success) {
        throw new Error('Errore nella fase di sottomissione');
      }
      
      // 2. Aggiornamento progressi
      const progressResponse = await fetch('/api/user/progress/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: 'user123',
          activityType: 'problem_solved',
          activityData: {
            problemId: 'integration_test',
            difficulty: 'hard',
            score: 95
          }
        })
      });
      
      const progressData = await progressResponse.json();
      
      if (!progressData.success) {
        throw new Error('Errore nella fase di aggiornamento progressi');
      }
      
      // 3. Salvataggio su GitHub
      const githubResponse = await fetch('/api/github/save-solution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: 'user123',
          problemId: 'integration_test',
          code: '// Integration test code',
          language: 'cpp',
          filename: 'integration_test_solution'
        })
      });
      
      const githubData = await githubResponse.json();
      
      if (!githubData.success) {
        throw new Error('Errore nella fase di salvataggio su GitHub');
      }
      
      // 4. Verifica leaderboard aggiornata
      const leaderboardResponse = await fetch('/api/leaderboard');
      const leaderboardData = await leaderboardResponse.json();
      
      if (!leaderboardData.success) {
        throw new Error('Errore nella verifica della leaderboard');
      }
      
      setTestResults(prev => ({
        ...prev,
        integration: {
          status: 'success',
          message: 'Test di integrazione completato con successo',
          data: {
            submission: submissionData.result,
            progress: progressData.data,
            github: githubData.data
          }
        }
      }));
      
      return {
        submission: submissionData,
        progress: progressData,
        github: githubData,
        leaderboard: leaderboardData
      };
    } catch (err) {
      setTestResults(prev => ({
        ...prev,
        integration: {
          status: 'error',
          message: `Errore nel test di integrazione: ${err.message}`
        }
      }));
      throw err;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Test di Integrazione Backend</h1>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Questa pagina esegue test completi su tutte le API del sito per verificare che funzionino correttamente e siano ben integrate tra loro.
        </p>
        
        <button
          onClick={runAllTests}
          disabled={loading}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Test in corso...' : 'Esegui Tutti i Test'}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
          <p className="font-bold">Errore nei test:</p>
          <p>{error}</p>
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-6">
          <p className="font-bold">Tutti i test completati con successo!</p>
          <p>Tutte le API sono funzionanti e correttamente integrate.</p>
        </div>
      )}
      
      <div className="space-y-6">
        {Object.entries(testResults).map(([key, result]) => (
          <div 
            key={key}
            className={`p-4 rounded ${
              result.status === 'success' 
                ? 'bg-green-50 border-l-4 border-green-500 dark:bg-green-900/20 dark:border-green-500' 
                : 'bg-red-50 border-l-4 border-red-500 dark:bg-red-900/20 dark:border-red-500'
            }`}
          >
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold capitalize">
                Test API {key}
              </h2>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                result.status === 'success' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {result.status === 'success' ? 'Successo' : 'Errore'}
              </span>
            </div>
            
            <p className="mt-2">{result.message}</p>
            
            {result.data && (
              <div className="mt-2">
                <button
                  onClick={() => console.log(`${key} test data:`, result.data)}
                  className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                >
                  Visualizza dati nel console
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
