import React from 'react';

/**
 * Componente per la pagina di sottomissione e valutazione automatica
 */
export default function SubmissionPage() {
  const [code, setCode] = React.useState('');
  const [language, setLanguage] = React.useState('cpp');
  const [submitting, setSubmitting] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [error, setError] = React.useState(null);

  // Esempio di problema
  const problem = {
    id: 'fibonacci',
    title: 'Sequenza di Fibonacci',
    description: 'Calcola l\'n-esimo numero della sequenza di Fibonacci.',
    timeLimit: 1000, // ms
    memoryLimit: 256, // MB
    inputFormat: 'Un intero n (1 ≤ n ≤ 45)',
    outputFormat: 'L\'n-esimo numero della sequenza di Fibonacci',
    examples: [
      {
        input: '10',
        output: '55'
      },
      {
        input: '1',
        output: '1'
      }
    ]
  };

  // Funzione per inviare il codice per la valutazione
  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
          problemId: problem.id,
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
      <h1 className="text-3xl font-bold mb-6 text-center">{problem.title}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Descrizione del problema */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Descrizione</h2>
          <p className="mb-4">{problem.description}</p>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Input</h3>
            <p>{problem.inputFormat}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Output</h3>
            <p>{problem.outputFormat}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Limiti</h3>
            <p>Tempo: {problem.timeLimit} ms</p>
            <p>Memoria: {problem.memoryLimit} MB</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Esempi</h3>
            {problem.examples.map((example, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                <div className="mb-2">
                  <h4 className="font-semibold">Input:</h4>
                  <pre className="p-2 bg-gray-200 dark:bg-gray-600 rounded">{example.input}</pre>
                </div>
                <div>
                  <h4 className="font-semibold">Output:</h4>
                  <pre className="p-2 bg-gray-200 dark:bg-gray-600 rounded">{example.output}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Editor di codice e risultati */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Soluzione</h2>
            
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
                      <div key={index} className={`p-3 rounded flex justify-between items-center ${
                        testCase.status === 'Accepted' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-200' :
                        'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-200'
                      }`}>
                        <span>Test Case #{index + 1}</span>
                        <span className="font-medium">{testCase.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {result.executionTime && (
                <div className="mt-4">
                  <p><span className="font-medium">Tempo di esecuzione:</span> {result.executionTime} ms</p>
                </div>
              )}
              
              {result.memoryUsage && (
                <div className="mt-2">
                  <p><span className="font-medium">Memoria utilizzata:</span> {result.memoryUsage} MB</p>
                </div>
              )}
              
              {result.score && (
                <div className="mt-4 p-3 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200 rounded">
                  <p className="font-bold">Punteggio: {result.score} / 100</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
