import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

/**
 * Componente per salvare una soluzione su GitHub
 */
export default function SaveToGitHubPage() {
  const [problemId, setProblemId] = React.useState('fibonacci');
  const [code, setCode] = React.useState('// Soluzione Fibonacci in C++\n#include <iostream>\nusing namespace std;\n\nint main() {\n  int n;\n  cin >> n;\n  \n  if (n <= 0) {\n    cout << 0 << endl;\n    return 0;\n  }\n  \n  if (n == 1 || n == 2) {\n    cout << 1 << endl;\n    return 0;\n  }\n  \n  int a = 1, b = 1;\n  for (int i = 3; i <= n; i++) {\n    int temp = a + b;\n    a = b;\n    b = temp;\n  }\n  \n  cout << b << endl;\n  return 0;\n}');
  const [language, setLanguage] = React.useState('cpp');
  const [filename, setFilename] = React.useState('fibonacci_solution');
  const [commitMessage, setCommitMessage] = React.useState('');
  const [repository, setRepository] = React.useState('');
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [repositories, setRepositories] = React.useState([]);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [result, setResult] = React.useState(null);

  // Simula il caricamento dei repository dell'utente
  React.useEffect(() => {
    if (isAuthenticated) {
      // In un'implementazione reale, qui recupereremmo i repository dell'utente da GitHub
      setRepositories([
        { id: 1, name: 'competitive-programming-solutions', description: 'Le mie soluzioni di programmazione competitiva' },
        { id: 2, name: 'algorithm-implementations', description: 'Implementazioni di algoritmi comuni' },
        { id: 3, name: 'usaco-solutions', description: 'Soluzioni per i problemi USACO' }
      ]);
    }
  }, [isAuthenticated]);

  // Funzione per autenticarsi con GitHub
  const handleAuthenticate = () => {
    // In un'implementazione reale, qui reindirizzerei l'utente all'autenticazione OAuth di GitHub
    // Per ora, simuliamo l'autenticazione
    setIsAuthenticated(true);
  };

  // Funzione per salvare la soluzione su GitHub
  const handleSaveSolution = async (e) => {
    e.preventDefault();
    
    if (!code.trim() || !filename.trim()) {
      setError('Codice e nome file sono richiesti');
      return;
    }
    
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    setResult(null);
    
    try {
      const response = await fetch('/api/github/save-solution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: 'user123', // In un'implementazione reale, questo verrebbe dall'autenticazione
          problemId,
          code,
          language,
          filename,
          commitMessage: commitMessage || `Soluzione per ${problemId}`,
          repoName: repository || 'competitive-programming-solutions'
        })
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Si è verificato un errore durante il salvataggio della soluzione');
      }
      
      setSuccess(true);
      setResult(data.data);
    } catch (err) {
      setError(err.message);
      console.error('Errore nel salvataggio della soluzione:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Funzione per generare l'estensione del file in base al linguaggio
  const getFileExtension = () => {
    switch (language) {
      case 'cpp': return '.cpp';
      case 'python': return '.py';
      case 'java': return '.java';
      case 'javascript': return '.js';
      case 'csharp': return '.cs';
      default: return '.txt';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Salva Soluzione su GitHub</h1>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        {!isAuthenticated ? (
          <div className="text-center py-8">
            <h2 className="text-2xl font-semibold mb-4">Connetti il tuo account GitHub</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Per salvare le tue soluzioni su GitHub, devi prima connettere il tuo account GitHub.
            </p>
            <button
              onClick={handleAuthenticate}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center justify-center mx-auto"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              Connetti con GitHub
            </button>
          </div>
        ) : (
          <>
            {error && (
              <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
                <p className="font-bold">Errore:</p>
                <p>{error}</p>
              </div>
            )}
            
            {success && result && (
              <div className="bg-green-100 text-green-700 p-4 rounded mb-6">
                <p className="font-bold">Soluzione salvata con successo!</p>
                <div className="mt-2">
                  <p><span className="font-medium">Repository:</span> {result.repository}</p>
                  <p><span className="font-medium">File:</span> {result.filename}</p>
                  <p><span className="font-medium">Commit:</span> {result.commitMessage}</p>
                  <div className="mt-2">
                    <a 
                      href={result.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline mr-4"
                    >
                      Visualizza File
                    </a>
                    <a 
                      href={result.commitUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Visualizza Commit
                    </a>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSaveSolution}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Problema</label>
                <input
                  type="text"
                  value={problemId}
                  onChange={(e) => setProblemId(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                  placeholder="ID del problema (es. fibonacci)"
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
                  <option value="javascript">JavaScript</option>
                  <option value="csharp">C#</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Codice</label>
                <div className="mb-2">
                  <SyntaxHighlighter language={language} style={vscDarkPlus} className="rounded-md">
                    {code}
                  </SyntaxHighlighter>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-64 p-2 border border-gray-300 dark:border-gray-600 rounded font-mono bg-white dark:bg-gray-700"
                  placeholder={`// Inserisci il tuo codice ${language === 'cpp' ? 'C++' : language === 'python' ? 'Python' : language === 'java' ? 'Java' : language === 'javascript' ? 'JavaScript' : 'C#'} qui`}
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Nome File</label>
                <div className="flex">
                  <input
                    type="text"
                    value={filename}
                    onChange={(e) => setFilename(e.target.value)}
                    className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-l bg-white dark:bg-gray-700"
                    placeholder="Nome del file (es. fibonacci_solution)"
                  />
                  <span className="p-2 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r bg-gray-100 dark:bg-gray-600">
                    {getFileExtension()}
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Repository</label>
                <select
                  value={repository}
                  onChange={(e) => setRepository(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                >
                  <option value="">Seleziona un repository</option>
                  {repositories.map((repo) => (
                    <option key={repo.id} value={repo.name}>
                      {repo.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Messaggio di Commit</label>
                <input
                  type="text"
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                  placeholder={`Soluzione per ${problemId}`}
                />
              </div>
              
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {submitting ? 'Salvataggio in corso...' : 'Salva su GitHub'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
