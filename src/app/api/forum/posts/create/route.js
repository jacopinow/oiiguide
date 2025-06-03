import { NextResponse } from 'next/server';

/**
 * Endpoint API per creare un nuovo post in risposta a un topic
 * @route POST /api/forum/posts/create
 */
export async function POST(request) {
  try {
    // Estrai i dati dalla richiesta
    const { userId, topicId, content, codeSnippets } = await request.json();
    
    // Validazione dei dati
    if (!userId || !topicId || !content) {
      return NextResponse.json(
        {
          success: false,
          error: 'Dati mancanti: userId, topicId e content sono richiesti'
        },
        { status: 400 }
      );
    }
    
    // In un'implementazione reale, qui creeremmo il post nel database
    // Per ora, simuliamo la creazione e restituiamo i dati del post creato
    const newPost = createPost(userId, topicId, content, codeSnippets);
    
    // Aggiorna i progressi dell'utente (attività forum)
    updateUserProgress(userId, 'forum_post_created', { postId: newPost.id, topicId });
    
    // Restituisci i dati del post creato
    return NextResponse.json({
      success: true,
      data: newPost
    });
  } catch (error) {
    console.error('Errore nella creazione del post:', error);
    
    // Restituisci un errore
    return NextResponse.json(
      {
        success: false,
        error: 'Si è verificato un errore durante la creazione del post'
      },
      { status: 500 }
    );
  }
}

/**
 * Simula la creazione di un nuovo post
 * @param {string} userId - ID dell'utente
 * @param {string} topicId - ID del topic
 * @param {string} content - Contenuto del post
 * @param {Array} codeSnippets - Snippet di codice nel post
 * @returns {Object} Dati del post creato
 */
function createPost(userId, topicId, content, codeSnippets = []) {
  const currentDate = new Date().toISOString();
  
  // Genera un ID univoco per il post
  const postId = `post_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  
  // Simula i dati dell'utente
  const user = {
    id: userId,
    username: 'user123',
    avatar: 'https://via.placeholder.com/40'
  };
  
  // Processa gli snippet di codice
  const processedCodeSnippets = (codeSnippets || []).map((snippet, index) => ({
    id: `snippet_${postId}_${index}`,
    language: snippet.language || 'cpp',
    code: snippet.code,
    description: snippet.description || ''
  }));
  
  // Crea il post
  return {
    id: postId,
    content,
    codeSnippets: processedCodeSnippets,
    userId,
    user,
    topicId,
    createdAt: currentDate,
    updatedAt: currentDate,
    likes: 0,
    isAcceptedAnswer: false,
    isEdited: false
  };
}

/**
 * Simula l'aggiornamento dei progressi dell'utente
 * @param {string} userId - ID dell'utente
 * @param {string} activityType - Tipo di attività
 * @param {Object} activityData - Dati dell'attività
 */
function updateUserProgress(userId, activityType, activityData) {
  // In un'implementazione reale, qui aggiorneremmo i progressi dell'utente nel database
  // Per ora, simuliamo l'aggiornamento
  console.log(`Aggiornamento progressi per l'utente ${userId}: ${activityType}`, activityData);
}
