import { NextResponse } from 'next/server';

/**
 * Endpoint API per valutare le sottomissioni di codice
 * @route POST /api/submissions/evaluate
 */
export async function POST(request) {
  try {
    // Estrai i dati dalla richiesta
    const { problemId, code, language } = await request.json();
    
    // Validazione dei dati
    if (!problemId || !code || !language) {
      return NextResponse.json(
        {
          success: false,
          error: 'Dati mancanti: problemId, code e language sono richiesti'
        },
        { status: 400 }
      );
    }
    
    // Verifica che il linguaggio sia supportato
    const supportedLanguages = ['cpp', 'python', 'java'];
    if (!supportedLanguages.includes(language)) {
      return NextResponse.json(
        {
          success: false,
          error: `Linguaggio non supportato: ${language}. I linguaggi supportati sono: ${supportedLanguages.join(', ')}`
        },
        { status: 400 }
      );
    }
    
    // In un'implementazione reale, qui eseguiremmo il codice in un ambiente sandbox
    // e valuteremmo i risultati rispetto ai test case del problema
    // Per ora, simuliamo una valutazione
    const result = simulateEvaluation(problemId, code, language);
    
    // Restituisci il risultato
    return NextResponse.json({
      success: true,
      result
    });
  } catch (error) {
    console.error('Errore nella valutazione della sottomissione:', error);
    
    // Restituisci un errore
    return NextResponse.json(
      {
        success: false,
        error: 'Si è verificato un errore durante la valutazione della sottomissione'
      },
      { status: 500 }
    );
  }
}

/**
 * Simula la valutazione di una sottomissione
 * @param {string} problemId - ID del problema
 * @param {string} code - Codice sottomesso
 * @param {string} language - Linguaggio di programmazione
 * @returns {Object} Risultato della valutazione
 */
function simulateEvaluation(problemId, code, language) {
  // In un'implementazione reale, qui eseguiremmo il codice in un ambiente sandbox
  // e valuteremmo i risultati rispetto ai test case del problema
  
  // Per ora, simuliamo una valutazione basata su alcune euristiche semplici
  
  // Verifica se il codice contiene parole chiave specifiche per il problema
  let status = 'Wrong Answer';
  let score = 0;
  let executionTime = Math.floor(Math.random() * 500) + 50; // 50-550 ms
  let memoryUsage = Math.floor(Math.random() * 50) + 10; // 10-60 MB
  
  // Simulazione di test case
  const testCases = [];
  
  if (problemId === 'fibonacci') {
    // Verifica se il codice contiene parole chiave relative a Fibonacci
    const hasFibonacciKeywords = code.includes('fibonacci') || 
                                code.includes('fib') || 
                                (code.includes('a + b') && code.includes('loop'));
    
    // Simulazione di test case per Fibonacci
    if (hasFibonacciKeywords) {
      // Simuliamo che il codice passi la maggior parte dei test case
      for (let i = 1; i <= 10; i++) {
        testCases.push({
          input: `${i}`,
          expectedOutput: getFibonacci(i).toString(),
          actualOutput: getFibonacci(i).toString(),
          status: i <= 8 || Math.random() > 0.3 ? 'Accepted' : 'Wrong Answer'
        });
      }
      
      // Contiamo quanti test case sono stati accettati
      const acceptedCount = testCases.filter(tc => tc.status === 'Accepted').length;
      score = Math.floor((acceptedCount / testCases.length) * 100);
      
      // Se tutti i test case sono stati accettati, il problema è risolto
      if (acceptedCount === testCases.length) {
        status = 'Accepted';
      } else {
        status = 'Wrong Answer';
      }
    } else {
      // Se il codice non contiene parole chiave relative a Fibonacci, probabilmente è sbagliato
      for (let i = 1; i <= 10; i++) {
        const wrongOutput = Math.floor(Math.random() * 100).toString();
        testCases.push({
          input: `${i}`,
          expectedOutput: getFibonacci(i).toString(),
          actualOutput: wrongOutput,
          status: 'Wrong Answer'
        });
      }
      
      status = 'Wrong Answer';
      score = 0;
    }
  } else {
    // Per altri problemi, simuliamo una valutazione casuale
    for (let i = 1; i <= 5; i++) {
      const isAccepted = Math.random() > 0.4;
      testCases.push({
        input: `Test Case ${i}`,
        expectedOutput: 'Expected Output',
        actualOutput: isAccepted ? 'Expected Output' : 'Wrong Output',
        status: isAccepted ? 'Accepted' : 'Wrong Answer'
      });
    }
    
    // Contiamo quanti test case sono stati accettati
    const acceptedCount = testCases.filter(tc => tc.status === 'Accepted').length;
    score = Math.floor((acceptedCount / testCases.length) * 100);
    
    // Se tutti i test case sono stati accettati, il problema è risolto
    if (acceptedCount === testCases.length) {
      status = 'Accepted';
    } else {
      status = 'Wrong Answer';
    }
  }
  
  // Simuliamo occasionalmente altri tipi di errori
  const errorType = Math.random();
  if (errorType < 0.1) {
    status = 'Time Limit Exceeded';
    executionTime = 1500; // Oltre il limite
  } else if (errorType < 0.15) {
    status = 'Memory Limit Exceeded';
    memoryUsage = 300; // Oltre il limite
  } else if (errorType < 0.2) {
    status = 'Runtime Error';
    testCases.forEach(tc => tc.status = 'Runtime Error');
  }
  
  return {
    status,
    score,
    executionTime,
    memoryUsage,
    testCases
  };
}

/**
 * Calcola l'n-esimo numero di Fibonacci
 * @param {number} n - Indice del numero di Fibonacci
 * @returns {number} n-esimo numero di Fibonacci
 */
function getFibonacci(n) {
  if (n <= 0) return 0;
  if (n === 1 || n === 2) return 1;
  
  let a = 1, b = 1;
  for (let i = 3; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  
  return b;
}
