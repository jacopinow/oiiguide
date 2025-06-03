import axios from 'axios';

/**
 * Recupera i contest imminenti da Codeforces e AtCoder
 * @returns {Promise<Object>} Oggetto contenente gli array di contest per ciascuna piattaforma
 */
export async function fetchUpcomingContests() {
  try {
    // Recupera i contest da Codeforces
    const codeforcesContests = await fetchCodeforcesContests();
    
    // Recupera i contest da AtCoder
    const atcoderContests = await fetchAtcoderContests();
    
    return {
      codeforces: codeforcesContests,
      atcoder: atcoderContests
    };
  } catch (error) {
    console.error('Errore nel recupero dei contest imminenti:', error);
    
    // In caso di errore, restituisci dati di esempio
    return {
      codeforces: getCodeforcesExampleData(),
      atcoder: getAtcoderExampleData()
    };
  }
}

/**
 * Recupera i contest imminenti da Codeforces tramite API
 * @returns {Promise<Array>} Array di contest Codeforces
 */
async function fetchCodeforcesContests() {
  try {
    const response = await axios.get('https://codeforces.com/api/contest.list');
    
    if (response.data.status !== 'OK') {
      throw new Error('Risposta API Codeforces non valida');
    }
    
    // Filtra solo i contest futuri
    const upcomingContests = response.data.result
      .filter(contest => contest.phase === 'BEFORE')
      .map(contest => ({
        id: contest.id.toString(),
        name: contest.name,
        startTime: new Date(contest.startTimeSeconds * 1000).toISOString(),
        durationMinutes: Math.floor(contest.durationSeconds / 60),
        url: `https://codeforces.com/contests/${contest.id}`,
        difficulty: getDifficultyFromName(contest.name)
      }))
      .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
      .slice(0, 5); // Prendi solo i prossimi 5 contest
    
    return upcomingContests;
  } catch (error) {
    console.error('Errore nel recupero dei contest Codeforces:', error);
    return getCodeforcesExampleData();
  }
}

/**
 * Recupera i contest imminenti da AtCoder tramite web scraping
 * Nota: In un'implementazione reale, questo richiederebbe un servizio backend
 * per il web scraping, poiché AtCoder non offre un'API pubblica
 * @returns {Promise<Array>} Array di contest AtCoder
 */
async function fetchAtcoderContests() {
  try {
    // In un'implementazione reale, questa sarebbe una chiamata a un endpoint backend
    // che esegue web scraping su AtCoder
    // Per ora, restituiamo dati di esempio
    return getAtcoderExampleData();
  } catch (error) {
    console.error('Errore nel recupero dei contest AtCoder:', error);
    return getAtcoderExampleData();
  }
}

/**
 * Determina la difficoltà di un contest Codeforces dal nome
 * @param {string} contestName Nome del contest
 * @returns {string} Livello di difficoltà
 */
function getDifficultyFromName(contestName) {
  const lowerName = contestName.toLowerCase();
  
  if (lowerName.includes('div. 1') || lowerName.includes('div.1')) {
    return 'Div. 1 (Difficile)';
  } else if (lowerName.includes('div. 2') || lowerName.includes('div.2')) {
    return 'Div. 2 (Intermedio)';
  } else if (lowerName.includes('div. 3') || lowerName.includes('div.3')) {
    return 'Div. 3 (Facile-Intermedio)';
  } else if (lowerName.includes('div. 4') || lowerName.includes('div.4')) {
    return 'Div. 4 (Principianti)';
  } else if (lowerName.includes('educational')) {
    return 'Educational (Vari livelli)';
  } else if (lowerName.includes('global')) {
    return 'Global Round (Tutti i livelli)';
  }
  
  return 'Standard (Livello variabile)';
}

/**
 * Restituisce dati di esempio per i contest Codeforces
 * @returns {Array} Array di contest Codeforces di esempio
 */
function getCodeforcesExampleData() {
  return [
    {
      id: '1',
      name: 'Codeforces Round #900 (Div. 3)',
      startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      durationMinutes: 135,
      url: 'https://codeforces.com/contests/1',
      difficulty: 'Div. 3 (Facile-Intermedio)'
    },
    {
      id: '2',
      name: 'Educational Codeforces Round 160',
      startTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      durationMinutes: 120,
      url: 'https://codeforces.com/contests/2',
      difficulty: 'Educational (Vari livelli)'
    },
    {
      id: '3',
      name: 'Codeforces Round #901 (Div. 2)',
      startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      durationMinutes: 120,
      url: 'https://codeforces.com/contests/3',
      difficulty: 'Div. 2 (Intermedio)'
    },
    {
      id: '4',
      name: 'Codeforces Round #902 (Div. 1 + Div. 2)',
      startTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      durationMinutes: 150,
      url: 'https://codeforces.com/contests/4',
      difficulty: 'Div. 1 (Difficile)'
    }
  ];
}

/**
 * Restituisce dati di esempio per i contest AtCoder
 * @returns {Array} Array di contest AtCoder di esempio
 */
function getAtcoderExampleData() {
  return [
    {
      id: '101',
      name: 'AtCoder Beginner Contest 300',
      startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      durationMinutes: 100,
      url: 'https://atcoder.jp/contests/abc300',
      difficulty: 'Beginner (Principianti)'
    },
    {
      id: '102',
      name: 'AtCoder Regular Contest 150',
      startTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
      durationMinutes: 120,
      url: 'https://atcoder.jp/contests/arc150',
      difficulty: 'Regular (Intermedio-Avanzato)'
    },
    {
      id: '103',
      name: 'AtCoder Grand Contest 60',
      startTime: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(),
      durationMinutes: 150,
      url: 'https://atcoder.jp/contests/agc060',
      difficulty: 'Grand (Avanzato)'
    }
  ];
}
