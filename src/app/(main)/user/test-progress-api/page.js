import React from 'react';

/**
 * Componente per testare l'API di tracking progressi e assegnazione badge
 */
export default function TestProgressAPI() {
  const [userId, setUserId] = React.useState('user123');
  const [activityType, setActivityType] = React.useState('problem_solved');
  const [activityData, setActivityData] = React.useState({
    problemId: 'fibonacci',
    difficulty: 'medium',
    score: 85
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [error, setError] = React.useState(null);

  // Funzione per aggiornare i progressi dell'utente
  const handleUpdateProgress = async () => {
    setSubmitting(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await fetch('/api/user/progress/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          activityType,
          activityData: getActivityData()
        })
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Si è verificato un errore durante l\'aggiornamento dei progressi');
      }
      
      setResult(data.data);
    } catch (err) {
      setError(err.message);
      console.error('Errore nell\'aggiornamento dei progressi:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Funzione per ottenere i dati dell'attività in base al tipo selezionato
  const getActivityData = () => {
    switch (activityType) {
      case 'problem_solved':
        return {
          problemId: 'fibonacci',
          difficulty: 'medium',
          score: 85
        };
      case 'quiz_completed':
        return {
          quizId: 'data_structures_basics',
          score: 90
        };
      case 'lesson_completed':
        return {
          lessonId: 'introduction_to_dp',
          moduleId: 'dynamic_programming'
        };
      case 'contest_participated':
        return {
          contestId: 'codeforces_div2_123',
          rank: 150,
          totalParticipants: 1000
        };
      default:
        return {};
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Test API Tracking Progressi e Badge</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Aggiornamento Progressi</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">User ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Tipo di Attività</label>
            <select
              value={activityType}
              onChange={(e) => setActivityType(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
            >
              <option value="problem_solved">Problema Risolto</option>
              <option value="quiz_completed">Quiz Completato</option>
              <option value="lesson_completed">Lezione Completata</option>
              <option value="contest_participated">Contest Partecipato</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Dati Attività</label>
            <pre className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 font-mono text-sm">
              {JSON.stringify(getActivityData(), null, 2)}
            </pre>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              I dati dell'attività vengono generati automaticamente in base al tipo selezionato.
            </p>
          </div>
          
          <button
            onClick={handleUpdateProgress}
            disabled={submitting}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? 'Aggiornamento in corso...' : 'Aggiorna Progressi'}
          </button>
        </div>
        
        <div className="space-y-6">
          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded">
              <p className="font-bold">Errore:</p>
              <p>{error}</p>
            </div>
          )}
          
          {result && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Risultato</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Progressi Aggiornati</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200 rounded">
                    <p className="font-medium">XP Totale:</p>
                    <p className="text-lg font-bold">{result.progress.totalXP}</p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-200 rounded">
                    <p className="font-medium">Livello:</p>
                    <p className="text-lg font-bold">{result.progress.level}</p>
                  </div>
                  
                  <div className="p-3 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-200 rounded">
                    <p className="font-medium">Problemi Risolti:</p>
                    <p className="text-lg font-bold">{result.progress.problemsSolved}</p>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-200 rounded">
                    <p className="font-medium">Quiz Completati:</p>
                    <p className="text-lg font-bold">{result.progress.quizzesCompleted}</p>
                  </div>
                  
                  <div className="p-3 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200 rounded">
                    <p className="font-medium">Lezioni Completate:</p>
                    <p className="text-lg font-bold">{result.progress.lessonsCompleted}</p>
                  </div>
                  
                  <div className="p-3 bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-200 rounded">
                    <p className="font-medium">Contest Partecipati:</p>
                    <p className="text-lg font-bold">{result.progress.contestsParticipated}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Streak</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-200 rounded">
                    <p className="font-medium">Streak Attuale:</p>
                    <p className="text-lg font-bold">{result.progress.streak.current} giorni</p>
                  </div>
                  
                  <div className="p-3 bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-200 rounded">
                    <p className="font-medium">Streak Più Lunga:</p>
                    <p className="text-lg font-bold">{result.progress.streak.longest} giorni</p>
                  </div>
                </div>
              </div>
              
              {result.newBadges && result.newBadges.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Nuovi Badge!</h3>
                  <div className="space-y-2">
                    {result.newBadges.map((badge, index) => (
                      <div key={index} className="p-3 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200 rounded flex items-center">
                        <div className="mr-3 bg-yellow-200 dark:bg-yellow-800 p-2 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600 dark:text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-bold">{badge.name}</p>
                          <p className="text-sm">{badge.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Attività Recenti</h3>
                <div className="space-y-2">
                  {result.progress.recentActivities.map((activity, index) => (
                    <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">
                          {activity.type === 'problem_solved' ? 'Problema Risolto' :
                           activity.type === 'quiz_completed' ? 'Quiz Completato' :
                           activity.type === 'lesson_completed' ? 'Lezione Completata' :
                           activity.type === 'contest_participated' ? 'Contest Partecipato' :
                           activity.type}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</span>
                      </div>
                      <div className="mt-1 text-sm">
                        {activity.type === 'problem_solved' && <span>Problema: {activity.problemId}</span>}
                        {activity.type === 'quiz_completed' && <span>Quiz: {activity.quizId}</span>}
                        {activity.type === 'lesson_completed' && <span>Lezione: {activity.lessonId}</span>}
                        {activity.type === 'contest_participated' && <span>Contest: {activity.contestId}</span>}
                      </div>
                      <div className="mt-1 text-sm text-green-600 dark:text-green-400">
                        +{activity.xpEarned} XP
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
