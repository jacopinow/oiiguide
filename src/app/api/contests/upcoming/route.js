import { NextResponse } from 'next/server';
import { fetchUpcomingContests } from '@/lib/api/contests';

/**
 * Endpoint API per recuperare i contest imminenti
 * @route GET /api/contests/upcoming
 */
export async function GET() {
  try {
    // Recupera i contest imminenti da Codeforces e AtCoder
    const contests = await fetchUpcomingContests();
    
    // Restituisci i dati come risposta JSON
    return NextResponse.json({
      success: true,
      data: contests
    });
  } catch (error) {
    console.error('Errore nell\'API dei contest imminenti:', error);
    
    // Restituisci un errore
    return NextResponse.json(
      {
        success: false,
        error: 'Si è verificato un errore nel recupero dei contest imminenti'
      },
      { status: 500 }
    );
  }
}
