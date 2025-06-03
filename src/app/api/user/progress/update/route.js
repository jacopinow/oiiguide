import { NextResponse } from 'next/server';

/**
 * Endpoint API per aggiornare i progressi dell'utente
 * @route POST /api/user/progress/update
 */
export async function POST(request) {
  try {
    // Estrai i dati dalla richiesta
    const { userId, activityType, activityData } = await request.json();
    
    // Validazione dei dati
    if (!userId || !activityType) {
      return NextResponse.json(
        {
          success: false,
          error: 'Dati mancanti: userId e activityType sono richiesti'
        },
        { status: 400 }
      );
    }
    
    // Tipi di attività supportati
    const supportedActivityTypes = [
      'problem_solved', 
      'quiz_completed', 
      'lesson_completed', 
      'contest_participated'
    ];
    
    if (!supportedActivityTypes.includes(activityType)) {
      return NextResponse.json(
        {
          success: false,
          error: `Tipo di attività non supportato: ${activityType}. I tipi supportati sono: ${supportedActivityTypes.join(', ')}`
        },
        { status: 400 }
      );
    }
    
    // In un'implementazione reale, qui aggiorneremmo i progressi dell'utente nel database
    // Per ora, simuliamo un aggiornamento e restituiamo i dati aggiornati
    const updatedProgress = updateUserProgress(userId, activityType, activityData);
    
    // Verifica se sono stati assegnati nuovi badge
    const newBadges = checkForNewBadges(userId, updatedProgress);
    
    // Restituisci i dati aggiornati
    return NextResponse.json({
      success: true,
      data: {
        progress: updatedProgress,
        newBadges: newBadges
      }
    });
  } catch (error) {
    console.error('Errore nell\'aggiornamento dei progressi:', error);
    
    // Restituisci un errore
    return NextResponse.json(
      {
        success: false,
        error: 'Si è verificato un errore durante l\'aggiornamento dei progressi'
      },
      { status: 500 }
    );
  }
}

/**
 * Simula l'aggiornamento dei progressi dell'utente
 * @param {string} userId - ID dell'utente
 * @param {string} activityType - Tipo di attività
 * @param {Object} activityData - Dati dell'attività
 * @returns {Object} Progressi aggiornati dell'utente
 */
function updateUserProgress(userId, activityType, activityData) {
  // In un'implementazione reale, qui recupereremmo i progressi attuali dell'utente dal database
  // e li aggiorneremmo in base all'attività
  
  // Per ora, simuliamo i progressi
  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  
  // Simuliamo i progressi attuali
  const currentProgress = {
    totalXP: 1250,
    level: 5,
    problemsSolved: 25,
    quizzesCompleted: 10,
    lessonsCompleted: 15,
    contestsParticipated: 3,
    streak: {
      current: 7,
      longest: 12,
      lastActivityDate: currentDate
    },
    badges: [
      { id: 'bronze_problem_solver', name: 'Risolutore Bronze', description: 'Risolvi 10 problemi', dateEarned: '2025-05-10' },
      { id: 'quiz_master', name: 'Quiz Master', description: 'Completa 10 quiz', dateEarned: '2025-05-15' }
    ],
    recentActivities: [
      { type: 'problem_solved', problemId: 'fibonacci', date: '2025-05-22', xpEarned: 50 },
      { type: 'quiz_completed', quizId: 'data_structures_basics', date: '2025-05-21', xpEarned: 30 },
      { type: 'lesson_completed', lessonId: 'introduction_to_dp', date: '2025-05-20', xpEarned: 20 }
    ]
  };
  
  // Copia i progressi attuali per non modificarli direttamente
  const updatedProgress = JSON.parse(JSON.stringify(currentProgress));
  
  // Aggiorna i progressi in base al tipo di attività
  let xpEarned = 0;
  
  switch (activityType) {
    case 'problem_solved':
      updatedProgress.problemsSolved += 1;
      xpEarned = activityData.difficulty === 'easy' ? 50 :
                 activityData.difficulty === 'medium' ? 100 :
                 activityData.difficulty === 'hard' ? 200 : 50;
      break;
    case 'quiz_completed':
      updatedProgress.quizzesCompleted += 1;
      xpEarned = 30;
      break;
    case 'lesson_completed':
      updatedProgress.lessonsCompleted += 1;
      xpEarned = 20;
      break;
    case 'contest_participated':
      updatedProgress.contestsParticipated += 1;
      xpEarned = 100;
      break;
  }
  
  // Aggiorna XP totale
  updatedProgress.totalXP += xpEarned;
  
  // Aggiorna il livello (1 livello ogni 500 XP)
  updatedProgress.level = Math.floor(updatedProgress.totalXP / 500) + 1;
  
  // Aggiorna la streak
  const lastActivityDate = new Date(updatedProgress.streak.lastActivityDate);
  const today = new Date(currentDate);
  const diffDays = Math.floor((today - lastActivityDate) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    // Già aggiornato oggi, non fare nulla
  } else if (diffDays === 1) {
    // Attività consecutiva
    updatedProgress.streak.current += 1;
    updatedProgress.streak.lastActivityDate = currentDate;
    
    // Aggiorna la streak più lunga se necessario
    if (updatedProgress.streak.current > updatedProgress.streak.longest) {
      updatedProgress.streak.longest = updatedProgress.streak.current;
    }
  } else {
    // Streak interrotta
    updatedProgress.streak.current = 1;
    updatedProgress.streak.lastActivityDate = currentDate;
  }
  
  // Aggiungi l'attività recente
  updatedProgress.recentActivities.unshift({
    type: activityType,
    ...activityData,
    date: currentDate,
    xpEarned
  });
  
  // Mantieni solo le 10 attività più recenti
  updatedProgress.recentActivities = updatedProgress.recentActivities.slice(0, 10);
  
  return updatedProgress;
}

/**
 * Verifica se l'utente ha guadagnato nuovi badge
 * @param {string} userId - ID dell'utente
 * @param {Object} progress - Progressi aggiornati dell'utente
 * @returns {Array} Nuovi badge guadagnati
 */
function checkForNewBadges(userId, progress) {
  // In un'implementazione reale, qui verificheremmo i badge già ottenuti dall'utente
  // e controlleremmo se ha soddisfatto i requisiti per nuovi badge
  
  // Definizione dei badge disponibili
  const availableBadges = [
    { id: 'bronze_problem_solver', name: 'Risolutore Bronze', description: 'Risolvi 10 problemi', requirement: { type: 'problemsSolved', value: 10 } },
    { id: 'silver_problem_solver', name: 'Risolutore Silver', description: 'Risolvi 25 problemi', requirement: { type: 'problemsSolved', value: 25 } },
    { id: 'gold_problem_solver', name: 'Risolutore Gold', description: 'Risolvi 50 problemi', requirement: { type: 'problemsSolved', value: 50 } },
    { id: 'platinum_problem_solver', name: 'Risolutore Platinum', description: 'Risolvi 100 problemi', requirement: { type: 'problemsSolved', value: 100 } },
    
    { id: 'quiz_master', name: 'Quiz Master', description: 'Completa 10 quiz', requirement: { type: 'quizzesCompleted', value: 10 } },
    { id: 'quiz_champion', name: 'Quiz Champion', description: 'Completa 25 quiz', requirement: { type: 'quizzesCompleted', value: 25 } },
    
    { id: 'lesson_learner', name: 'Studente Diligente', description: 'Completa 10 lezioni', requirement: { type: 'lessonsCompleted', value: 10 } },
    { id: 'lesson_master', name: 'Maestro delle Lezioni', description: 'Completa 25 lezioni', requirement: { type: 'lessonsCompleted', value: 25 } },
    
    { id: 'contest_participant', name: 'Partecipante Contest', description: 'Partecipa a 5 contest', requirement: { type: 'contestsParticipated', value: 5 } },
    { id: 'contest_veteran', name: 'Veterano dei Contest', description: 'Partecipa a 10 contest', requirement: { type: 'contestsParticipated', value: 10 } },
    
    { id: 'streak_week', name: 'Streak Settimanale', description: 'Mantieni una streak di 7 giorni', requirement: { type: 'streak.current', value: 7 } },
    { id: 'streak_month', name: 'Streak Mensile', description: 'Mantieni una streak di 30 giorni', requirement: { type: 'streak.current', value: 30 } },
    
    { id: 'level_5', name: 'Livello 5', description: 'Raggiungi il livello 5', requirement: { type: 'level', value: 5 } },
    { id: 'level_10', name: 'Livello 10', description: 'Raggiungi il livello 10', requirement: { type: 'level', value: 10 } }
  ];
  
  // Estrai gli ID dei badge già ottenuti
  const earnedBadgeIds = progress.badges.map(badge => badge.id);
  
  // Verifica quali nuovi badge sono stati guadagnati
  const newBadges = [];
  
  for (const badge of availableBadges) {
    // Salta i badge già ottenuti
    if (earnedBadgeIds.includes(badge.id)) {
      continue;
    }
    
    // Verifica se il requisito è soddisfatto
    const requirementPath = badge.requirement.type.split('.');
    let currentValue = progress;
    
    for (const path of requirementPath) {
      currentValue = currentValue[path];
    }
    
    if (currentValue >= badge.requirement.value) {
      // Badge guadagnato!
      const newBadge = {
        ...badge,
        dateEarned: new Date().toISOString().split('T')[0]
      };
      
      newBadges.push(newBadge);
      
      // Aggiungi il badge ai progressi dell'utente
      progress.badges.push(newBadge);
    }
  }
  
  return newBadges;
}
