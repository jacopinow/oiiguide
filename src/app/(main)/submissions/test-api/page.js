import React from 'react';

/**
 * Componente per testare l'API di valutazione delle sottomissioni
 */
export default function TestSubmissionAPI() {
  const [code, setCode] = React.useState('// Esempio di soluzione Fibonacci in C++\n#include <iostream>\nusing namespace std;\n\nint main() {\n  int n;\n  cin >> n;\n  \n  if (n <= 0) {\n    cout << 0 << endl;\n    return 0;\n  }\n  \n  if (n == 1 || n == 2) {\n    cout << 1 << endl;\n    return 0;\n  }\n  \n  int a = 1, b = 1;\n  for (int i = 3; i <= n; i++) {\n    int temp = a + b;\n    a = b;\n    b = temp;\n  }\n  \n  cout << b << endl;\n  return 0;\n}');
  const [language, setLanguage] = React.useState('cpp');
  const [submitting, setSubmitting] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [error, setError] = React.useState(null);

  // Funzione per inviare il codice per la valutazione
  const handleSubmit = async () => {
    if (!code.trim()) {
      setError('Il codice non può essere vuoto');
      return;
    }
    
    setSubmitting(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await fetch('/api/submissions/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          problemId: 'fibonacci',
          code,
          language
        })
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Si è verificato un errore durante la valutazione');
      }
      
      setResult(data.result);
    } catch (err) {
      setError(err.message);
      console.error('Errore nella sottomissione:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Test API Valutazione Sottomissioni</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Sottomissione</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Problema</label>
            <input
              type="text"
              value="fibonacci"
              disabled
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Linguaggio</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
            >
              <option value="cpp">C++</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Codice</label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 p-2 border border-gray-300 dark:border-gray-600 rounded font-mono bg-white dark:bg-gray-700"
              placeholder={`// Scrivi qui la tua soluzione in ${language === 'cpp' ? 'C++' : language === 'python' ? 'Python' : 'Java'}`}
            ></textarea>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? 'Valutazione in corso...' : 'Invia soluzione'}
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
              
              <div className={`p-4 rounded mb-4 ${
                result.status === 'Accepted' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' :
                result.status === 'Wrong Answer' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200' :
                result.status === 'Time Limit Exceeded' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200' :
                result.status === 'Memory Limit Exceeded' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200' :
                result.status === 'Runtime Error' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200' :
                'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
              }`}>
                <p className="font-bold text-lg">{result.status}</p>
              </div>
              
              {result.testCases && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Test Cases</h3>
                  <div className="space-y-2">
                    {result.testCases.map((testCase, index) => (
                      <div key={index} className={`p-3 rounded ${
                        testCase.status === 'Accepted' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-200' :
                        'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-200'
                      }`}>
                        <div className="flex justify-between items-center mb-2">
                          <span>Test Case #{index + 1}</span>
                          <span className="font-medium">{testCase.status}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="font-semibold">Input:</p>
                            <pre className="p-1 bg-gray-200 dark:bg-gray-600 rounded">{testCase.input}</pre>
                          </div>
                          <div>
                            <p className="font-semibold">Output atteso:</p>
                            <pre className="p-1 bg-gray-200 dark:bg-gray-600 rounded">{testCase.expectedOutput}</pre>
                            <p className="font-semibold mt-1">Output ottenuto:</p>
                            <pre className="p-1 bg-gray-200 dark:bg-gray-600 rounded">{testCase.actualOutput}</pre>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200 rounded">
                  <p className="font-medium">Tempo di esecuzione:</p>
                  <p className="text-lg font-bold">{result.executionTime} ms</p>
                </div>
                
                <div className="p-3 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200 rounded">
                  <p className="font-medium">Memoria utilizzata:</p>
                  <p className="text-lg font-bold">{result.memoryUsage} MB</p>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-200 rounded">
                <p className="font-medium">Punteggio:</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mt-1">
                  <div 
                    className="bg-purple-600 h-4 rounded-full" 
                    style={{ width: `${result.score}%` }}
                  ></div>
                </div>
                <p className="text-right font-bold mt-1">{result.score} / 100</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
