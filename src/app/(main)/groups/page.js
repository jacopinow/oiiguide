import React from 'react';

/**
 * Componente per la pagina dei gruppi personalizzati
 */
export default function GroupsPage() {
  const [groups, setGroups] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [showCreateForm, setShowCreateForm] = React.useState(false);
  const [newGroupName, setNewGroupName] = React.useState('');
  const [newGroupDescription, setNewGroupDescription] = React.useState('');
  const [newGroupPrivate, setNewGroupPrivate] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [createError, setCreateError] = React.useState(null);
  const [createSuccess, setCreateSuccess] = React.useState(false);

  // Carica i gruppi all'avvio
  React.useEffect(() => {
    fetchGroups();
  }, []);

  // Funzione per recuperare i gruppi
  const fetchGroups = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/groups');
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Si è verificato un errore durante il recupero dei gruppi');
      }
      
      setGroups(data.data);
    } catch (err) {
      setError(err.message);
      console.error('Errore nel recupero dei gruppi:', err);
    } finally {
      setLoading(false);
    }
  };

  // Funzione per creare un nuovo gruppo
  const handleCreateGroup = async (e) => {
    e.preventDefault();
    
    if (!newGroupName.trim()) {
      setCreateError('Il nome del gruppo è richiesto');
      return;
    }
    
    setSubmitting(true);
    setCreateError(null);
    setCreateSuccess(false);
    
    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: 'user123', // In un'implementazione reale, questo verrebbe dall'autenticazione
          name: newGroupName,
          description: newGroupDescription,
          isPrivate: newGroupPrivate,
          invitedMembers: []
        })
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Si è verificato un errore durante la creazione del gruppo');
      }
      
      setCreateSuccess(true);
      setNewGroupName('');
      setNewGroupDescription('');
      setNewGroupPrivate(false);
      
      // Aggiorna la lista dei gruppi
      fetchGroups();
      
      // Nascondi il form dopo un breve ritardo
      setTimeout(() => {
        setShowCreateForm(false);
        setCreateSuccess(false);
      }, 2000);
    } catch (err) {
      setCreateError(err.message);
      console.error('Errore nella creazione del gruppo:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Funzione per formattare la data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gruppi di Studio</h1>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {showCreateForm ? 'Annulla' : 'Crea Gruppo'}
        </button>
      </div>
      
      {showCreateForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Crea Nuovo Gruppo</h2>
          
          {createError && (
            <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
              <p className="font-bold">Errore:</p>
              <p>{createError}</p>
            </div>
          )}
          
          {createSuccess && (
            <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
              <p className="font-bold">Gruppo creato con successo!</p>
            </div>
          )}
          
          <form onSubmit={handleCreateGroup}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Nome del Gruppo *</label>
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                placeholder="es. Algoritmi Avanzati"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Descrizione</label>
              <textarea
                value={newGroupDescription}
                onChange={(e) => setNewGroupDescription(e.target.value)}
                className="w-full h-24 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                placeholder="Descrivi lo scopo del gruppo..."
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newGroupPrivate}
                  onChange={(e) => setNewGroupPrivate(e.target.checked)}
                  className="mr-2"
                />
                <span>Gruppo Privato (solo su invito)</span>
              </label>
            </div>
            
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? 'Creazione in corso...' : 'Crea Gruppo'}
            </button>
          </form>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
          <p className="font-bold">Errore:</p>
          <p>{error}</p>
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">Caricamento gruppi in corso...</p>
        </div>
      ) : groups.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Non sei ancora iscritto a nessun gruppo.</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Crea il tuo primo gruppo
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {groups.map((group) => (
            <div key={group.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{group.name}</h2>
                {group.isPrivate && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded text-xs">
                    Privato
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {group.description || 'Nessuna descrizione'}
              </p>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Creato il {formatDate(group.createdAt)}
                </p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Membri ({group.members.length})</h3>
                <div className="flex flex-wrap gap-2">
                  {group.members.slice(0, 5).map((member) => (
                    <div key={member.id} className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full flex items-center justify-center mr-1">
                        {member.username.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm">
                        {member.username}
                        {member.role === 'admin' && (
                          <span className="ml-1 text-xs text-gray-500">(Admin)</span>
                        )}
                      </span>
                    </div>
                  ))}
                  {group.members.length > 5 && (
                    <div className="w-8 h-8 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full flex items-center justify-center">
                      +{group.members.length - 5}
                    </div>
                  )}
                </div>
              </div>
              
              {group.challenges.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Sfide Attive</h3>
                  <div className="space-y-2">
                    {group.challenges.map((challenge) => (
                      <div key={challenge.id} className="p-3 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{challenge.name}</h4>
                          <span className="text-xs">
                            {challenge.completions}/{challenge.participants} completati
                          </span>
                        </div>
                        <p className="text-sm mt-1">{challenge.description}</p>
                        <div className="mt-2 text-xs">
                          Scadenza: {formatDate(challenge.endDate)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-4">
                <a 
                  href={`/groups/${group.id}`} 
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Visualizza Gruppo →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
