import { NextResponse } from 'next/server';

/**
 * Endpoint API per recuperare la classifica degli utenti
 * @route GET /api/leaderboard
 */
export async function GET(request) {
  try {
    // In un'implementazione reale, qui recupereremmo i dati degli utenti dal database
    // e li ordineremmo in base a vari criteri (XP, problemi risolti, ecc.)
    // Per ora, simuliamo una classifica
    const leaderboard = generateLeaderboard();
    
    // Restituisci la classifica
    return NextResponse.json({
      success: true,
      data: leaderboard
    });
  } catch (error) {
    console.error('Errore nel recupero della classifica:', error);
    
    // Restituisci un errore
    return NextResponse.json(
      {
        success: false,
        error: 'Si è verificato un errore durante il recupero della classifica'
      },
      { status: 500 }
    );
  }
}

/**
 * Simula la generazione di una classifica
 * @returns {Object} Dati della classifica
 */
function generateLeaderboard() {
  // Genera utenti casuali per la classifica
  const users = [];
  
  for (let i = 1; i <= 20; i++) {
    const xp = Math.floor(Math.random() * 5000) + 500;
    const level = Math.floor(xp / 500) + 1;
    
    users.push({
      id: `user_${i}`,
      username: `user${i}`,
      avatar: `https://via.placeholder.com/40/3B82F6/FFFFFF?text=${i}`,
      xp,
      level,
      problemsSolved: Math.floor(Math.random() * 100) + 10,
      streak: {
        current: Math.floor(Math.random() * 30) + 1,
        longest: Math.floor(Math.random() * 60) + 30
      },
      badges: Math.floor(Math.random() * 10) + 1,
      joinedAt: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString()
    });
  }
  
  // Ordina gli utenti per XP (decrescente)
  users.sort((a, b) => b.xp - a.xp);
  
  // Aggiungi la posizione in classifica
  users.forEach((user, index) => {
    user.rank = index + 1;
  });
  
  // Crea diverse classifiche
  return {
    overall: users,
    weekly: users.slice().sort((a, b) => b.streak.current - a.streak.current),
    problemsSolved: users.slice().sort((a, b) => b.problemsSolved - a.problemsSolved),
    streak: users.slice().sort((a, b) => b.streak.longest - a.streak.longest)
  };
}
