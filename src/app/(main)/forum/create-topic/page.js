import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

/**
 * Componente per la creazione di un nuovo topic nel forum
 */
export default function CreateTopicPage() {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [category, setCategory] = React.useState('algorithms');
  const [tags, setTags] = React.useState('');
  const [codeSnippet, setCodeSnippet] = React.useState('');
  const [language, setLanguage] = React.useState('cpp');
  const [showCodeEditor, setShowCodeEditor] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [preview, setPreview] = React.useState(false);

  // Funzione per creare un nuovo topic
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setError('Titolo e contenuto sono richiesti');
      return;
    }
    
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    
    try {
      // Prepara i tag
      const tagList = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      // Prepara gli snippet di codice
      const codeSnippets = [];
      if (codeSnippet.trim()) {
        codeSnippets.push({
          language,
          code: codeSnippet,
          description: 'Snippet di codice'
        });
      }
      
      const response = await fetch('/api/forum/topics/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: 'user123', // In un'implementazione reale, questo verrebbe dall'autenticazione
          categoryId: category,
          title,
          content,
          tags: tagList,
          codeSnippets
        })
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Si è verificato un errore durante la creazione del topic');
      }
      
      setSuccess(true);
      
      // Reindirizza alla pagina del topic creato
      // In un'implementazione reale, qui reindirizzerei alla pagina del topic
      setTimeout(() => {
        window.location.href = `/forum/${category}/${data.data.id}`;
      }, 2000);
    } catch (err) {
      setError(err.message);
      console.error('Errore nella creazione del topic:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Funzione per aggiungere uno snippet di codice al contenuto
  const handleAddCodeSnippet = () => {
    if (!codeSnippet.trim()) {
      return;
    }
    
    const snippetPlaceholder = `\n\n[CODE:${language}]\n${codeSnippet}\n[/CODE]\n\n`;
    setContent(prevContent => prevContent + snippetPlaceholder);
    setCodeSnippet('');
    setShowCodeEditor(false);
  };

  // Funzione per renderizzare il contenuto in anteprima
  const renderContent = () => {
    if (!content) {
      return <p className="text-gray-500 dark:text-gray-400 italic">Nessun contenuto</p>;
    }
    
    // Dividi il contenuto in parti normali e snippet di codice
    const parts = content.split(/(\[CODE:[a-z]+\][\s\S]*?\[\/CODE\])/g);
    
    return parts.map((part, index) => {
      const codeMatch = part.match(/\[CODE:([a-z]+)\]([\s\S]*?)\[\/CODE\]/);
      
      if (codeMatch) {
        const lang = codeMatch[1];
        const code = codeMatch[2].trim();
        
        return (
          <div key={index} className="my-4">
            <SyntaxHighlighter language={lang} style={vscDarkPlus} className="rounded-md">
              {code}
            </SyntaxHighlighter>
          </div>
        );
      }
      
      return <div key={index} className="my-2">{part}</div>;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Crea Nuovo Topic</h1>
      
      {success ? (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-6">
          <p className="font-bold">Topic creato con successo!</p>
          <p>Verrai reindirizzato alla pagina del topic...</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
              <p className="font-bold">Errore:</p>
              <p>{error}</p>
            </div>
          )}
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">Nuovo Topic</h2>
              <button
                onClick={() => setPreview(!preview)}
                className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
              >
                {preview ? 'Modifica' : 'Anteprima'}
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Crea un nuovo topic per discutere di algoritmi, problemi o chiedere aiuto alla community.
            </p>
          </div>
          
          {!preview ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Categoria</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                >
                  <option value="general">Generale</option>
                  <option value="algorithms">Algoritmi</option>
                  <option value="data_structures">Strutture Dati</option>
                  <option value="contests">Contest</option>
                  <option value="help">Aiuto</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Titolo</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                  placeholder="Inserisci un titolo descrittivo"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Contenuto</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-64 p-2 border border-gray-300 dark:border-gray-600 rounded font-mono bg-white dark:bg-gray-700"
                  placeholder="Descrivi il tuo problema o argomento di discussione..."
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Tag (separati da virgole)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                  placeholder="es. dp, greedy, graph"
                />
              </div>
              
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => setShowCodeEditor(!showCodeEditor)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  {showCodeEditor ? 'Nascondi Editor Codice' : 'Aggiungi Snippet di Codice'}
                </button>
                
                {showCodeEditor && (
                  <div className="mt-4 p-4 border border-gray-300 dark:border-gray-600 rounded">
                    <div className="mb-2">
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
                    
                    <div className="mb-2">
                      <label className="block text-sm font-medium mb-2">Codice</label>
                      <textarea
                        value={codeSnippet}
                        onChange={(e) => setCodeSnippet(e.target.value)}
                        className="w-full h-40 p-2 border border-gray-300 dark:border-gray-600 rounded font-mono bg-white dark:bg-gray-700"
                        placeholder={`// Inserisci il tuo codice ${language === 'cpp' ? 'C++' : language === 'python' ? 'Python' : language === 'java' ? 'Java' : language === 'javascript' ? 'JavaScript' : 'C#'} qui`}
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={handleAddCodeSnippet}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Inserisci Snippet
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {submitting ? 'Creazione in corso...' : 'Crea Topic'}
              </button>
            </form>
          ) : (
            <div className="border border-gray-300 dark:border-gray-600 rounded p-4">
              <h3 className="text-2xl font-bold mb-2">{title || 'Titolo del Topic'}</h3>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded text-sm">
                  {category === 'general' ? 'Generale' :
                   category === 'algorithms' ? 'Algoritmi' :
                   category === 'data_structures' ? 'Strutture Dati' :
                   category === 'contests' ? 'Contest' :
                   'Aiuto'}
                </span>
                
                {tags.split(',').map((tag, index) => (
                  tag.trim() && (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded text-sm">
                      {tag.trim()}
                    </span>
                  )
                ))}
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                {renderContent()}
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setPreview(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Torna alla Modifica
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
