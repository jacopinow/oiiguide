import React from 'react';

const GameTheoryPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Teoria dei Giochi Combinatori (Livello Platinum)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione alla Teoria dei Giochi Combinatori</h2>
        <p className="text-lg leading-relaxed mb-4">
          La teoria dei giochi combinatori è un campo affascinante che studia giochi a informazione perfetta, senza elementi di caso, dove due giocatori si alternano nelle mosse. Questi giochi includono classici come gli scacchi, la dama, il go, e molti altri giochi più semplici che sono spesso oggetto di problemi nelle competizioni di programmazione.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          A differenza dei giochi con elementi di caso (come i giochi di carte) o di informazione imperfetta, nei giochi combinatori entrambi i giocatori hanno accesso a tutte le informazioni sul gioco in ogni momento, e l'unica incertezza riguarda le future mosse dell'avversario.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In questa lezione, esploreremo i concetti fondamentali della teoria dei giochi combinatori, le strategie per determinare il vincitore, e come implementare algoritmi efficienti per risolvere questi problemi.
        </p>
        <p className="text-lg leading-relaxed">
          I giochi combinatori sono particolarmente interessanti dal punto di vista algoritmico perché spesso presentano strutture matematiche eleganti che permettono di determinare il vincitore senza dover esplorare l'intero albero di gioco.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Stati di Gioco e Posizioni Vincenti/Perdenti</h2>
        <p className="text-lg leading-relaxed mb-4">
          Un concetto fondamentale nella teoria dei giochi combinatori è la classificazione degli stati di gioco in posizioni vincenti (P-posizioni) e posizioni perdenti (N-posizioni):
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1"><strong>P-posizione (Posizione Precedente):</strong> Una posizione da cui il giocatore precedente (quello che ha appena mosso) vincerà se gioca in modo ottimale.</li>
          <li className="mb-1"><strong>N-posizione (Posizione Successiva):</strong> Una posizione da cui il giocatore successivo (quello che deve muovere) vincerà se gioca in modo ottimale.</li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">
          Queste definizioni sono ricorsive e possono essere formalizzate come segue:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Una posizione terminale (dove il gioco è finito) è una P-posizione se il giocatore che deve muovere ha perso.</li>
          <li className="mb-1">Una posizione è una N-posizione se esiste almeno una mossa che porta a una P-posizione.</li>
          <li className="mb-1">Una posizione è una P-posizione se tutte le mosse possibili portano a N-posizioni.</li>
        </ol>
        <p className="text-lg leading-relaxed mb-4">
          Utilizzando queste regole, possiamo analizzare un gioco partendo dalle posizioni terminali e risalendo fino alla posizione iniziale, determinando così se il primo o il secondo giocatore ha una strategia vincente.
        </p>
        <p className="text-lg leading-relaxed">
          Vediamo un esempio semplice: consideriamo il gioco in cui due giocatori si alternano a rimuovere 1, 2 o 3 oggetti da un mucchio, e il giocatore che rimuove l'ultimo oggetto vince. Possiamo analizzare questo gioco per determinare quali posizioni (numero di oggetti nel mucchio) sono P-posizioni e quali sono N-posizioni.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Il Gioco di Nim</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il gioco di Nim è uno dei giochi combinatori più studiati e fondamentali. Nella sua forma base, ci sono diversi mucchi di oggetti, e i giocatori si alternano a rimuovere un numero qualsiasi di oggetti (almeno uno) da un singolo mucchio. Il giocatore che rimuove l'ultimo oggetto vince (versione normale) o perde (versione misère).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          La bellezza del Nim sta nel fatto che esiste una formula matematica semplice per determinare se una posizione è vincente o perdente: il <strong>Nim-sum</strong>.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il Nim-sum è calcolato come lo XOR bit a bit delle dimensioni di tutti i mucchi. Se il Nim-sum è zero, la posizione è una P-posizione (il giocatore precedente vincerà); altrimenti, è una N-posizione (il giocatore successivo vincerà).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Vediamo un'implementazione in C++ per calcolare il Nim-sum e determinare se una posizione è vincente:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Calcola il Nim-sum di un array di mucchi
int calculateNimSum(vector<int>& piles) {
    int nimSum = 0;
    for (int pile : piles) {
        nimSum ^= pile;  // XOR bit a bit
    }
    return nimSum;
}

// Determina se la posizione corrente è vincente per il giocatore che deve muovere
bool isWinningPosition(vector<int>& piles) {
    return calculateNimSum(piles) != 0;
}

// Trova una mossa vincente, se esiste
pair<int, int> findWinningMove(vector<int>& piles) {
    int nimSum = calculateNimSum(piles);
    
    // Se nimSum è 0, non esiste una mossa vincente
    if (nimSum == 0) {
        return {-1, -1};  // Nessuna mossa vincente
    }
    
    // Altrimenti, cerchiamo un mucchio che, se modificato correttamente,
    // renderà il nimSum uguale a 0
    for (int i = 0; i < piles.size(); i++) {
        int newPileSize = piles[i] ^ nimSum;
        
        // La nuova dimensione del mucchio deve essere minore dell'originale
        if (newPileSize < piles[i]) {
            return {i, piles[i] - newPileSize};  // Mucchio e numero di oggetti da rimuovere
        }
    }
    
    return {-1, -1};  // Non dovrebbe mai accadere se nimSum != 0
}

// Esempio di utilizzo
int main() {
    vector<int> piles = {3, 4, 5};
    
    cout << "Posizione iniziale: ";
    for (int pile : piles) {
        cout << pile << " ";
    }
    cout << endl;
    
    if (isWinningPosition(piles)) {
        auto [pileIndex, objectsToRemove] = findWinningMove(piles);
        cout << "Questa è una posizione vincente per il giocatore corrente." << endl;
        cout << "Mossa vincente: rimuovere " << objectsToRemove << " oggetti dal mucchio " << pileIndex + 1 << endl;
    } else {
        cout << "Questa è una posizione perdente per il giocatore corrente." << endl;
    }
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4">
          Questa implementazione non solo determina se una posizione è vincente, ma trova anche una mossa vincente specifica se esiste. La strategia ottimale nel Nim è sempre lasciare un Nim-sum di zero dopo la propria mossa.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Il Teorema di Sprague-Grundy</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il teorema di Sprague-Grundy è una generalizzazione potente che permette di analizzare giochi combinatori più complessi riducendoli a equivalenti del gioco di Nim. Questo teorema è fondamentale per risolvere una vasta gamma di problemi di teoria dei giochi nelle competizioni di programmazione.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il concetto chiave è il <strong>numero di Grundy</strong> (o valore di Nim) di una posizione, che rappresenta la dimensione equivalente di un mucchio di Nim.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Formalmente, il numero di Grundy g(p) di una posizione p è definito ricorsivamente come:
        </p>
        <p className="text-lg leading-relaxed mb-4 text-center">
          g(p) = mex({g(p') | p' è raggiungibile da p con una singola mossa})
        </p>
        <p className="text-lg leading-relaxed mb-4">
          dove mex (minimum excludent) di un insieme S è il più piccolo numero non negativo che non appartiene a S.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il teorema di Sprague-Grundy afferma che in un gioco composto da più sottogioochi indipendenti, il numero di Grundy dell'intero gioco è lo XOR dei numeri di Grundy dei sottogioochi.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Vediamo un'implementazione per calcolare i numeri di Grundy per un gioco semplice: il gioco in cui i giocatori possono rimuovere 1, 2 o 3 oggetti da un mucchio.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Calcola il mex (minimum excludent) di un insieme
int mex(unordered_set<int>& s) {
    int m = 0;
    while (s.count(m)) {
        m++;
    }
    return m;
}

// Calcola i numeri di Grundy per il gioco in cui si possono rimuovere 1, 2 o 3 oggetti
vector<int> calculateGrundyNumbers(int n) {
    vector<int> grundy(n + 1, 0);
    
    for (int i = 1; i <= n; i++) {
        unordered_set<int> s;
        
        // Consideriamo tutte le mosse possibili
        for (int j = 1; j <= 3 && i - j >= 0; j++) {
            s.insert(grundy[i - j]);
        }
        
        // Il numero di Grundy è il mex dei numeri di Grundy delle posizioni raggiungibili
        grundy[i] = mex(s);
    }
    
    return grundy;
}

// Esempio di utilizzo
int main() {
    int n = 15;  // Calcoliamo i numeri di Grundy fino a 15
    
    vector<int> grundy = calculateGrundyNumbers(n);
    
    cout << "Numeri di Grundy per il gioco di rimozione 1-2-3:" << endl;
    for (int i = 0; i <= n; i++) {
        cout << "g(" << i << ") = " << grundy[i] << endl;
    }
    
    // Analizziamo un gioco composto da più mucchi
    vector<int> piles = {7, 4, 2};
    int nimSum = 0;
    
    cout << "\nGioco composto da mucchi: ";
    for (int pile : piles) {
        cout << pile << " ";
        nimSum ^= grundy[pile];
    }
    cout << endl;
    
    if (nimSum != 0) {
        cout << "Il primo giocatore ha una strategia vincente." << endl;
    } else {
        cout << "Il secondo giocatore ha una strategia vincente." << endl;
    }
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4">
          Questa implementazione calcola i numeri di Grundy per il gioco di rimozione 1-2-3 e poi li utilizza per analizzare un gioco composto da più mucchi. Il pattern dei numeri di Grundy per questo gioco è [0, 1, 2, 3, 0, 1, 2, 3, ...], che è periodico con periodo 4.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Giochi Imparziali e Partizionali</h2>
        <p className="text-lg leading-relaxed mb-4">
          I giochi combinatori possono essere classificati in due categorie principali:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1"><strong>Giochi Imparziali:</strong> Entrambi i giocatori hanno le stesse mosse disponibili in qualsiasi posizione. Esempi includono Nim, Chomp, e Hackenbush imparziale.</li>
          <li className="mb-1"><strong>Giochi Partizionali:</strong> Le mosse disponibili dipendono dal giocatore. Esempi includono gli scacchi, la dama, e Hackenbush colorato.</li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">
          Il teorema di Sprague-Grundy si applica direttamente ai giochi imparziali, mentre per i giochi partizionali sono necessarie teorie più avanzate come la teoria dei giochi combinatori di Conway.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Per i giochi imparziali, possiamo utilizzare i numeri di Grundy per determinare se una posizione è vincente o perdente. Per i giochi partizionali, spesso dobbiamo ricorrere a tecniche specifiche per il gioco in questione.
        </p>
        <p className="text-lg leading-relaxed">
          Nelle competizioni di programmazione, la maggior parte dei problemi di teoria dei giochi riguarda giochi imparziali, che possono essere analizzati utilizzando il teorema di Sprague-Grundy.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Giochi di Nim Generalizzati</h2>
        <p className="text-lg leading-relaxed mb-4">
          Esistono molte varianti e generalizzazioni del gioco di Nim che possono essere analizzate utilizzando il teorema di Sprague-Grundy. Vediamo alcune di queste varianti:
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>6.1 Nim con Restrizioni sulle Mosse:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In questa variante, i giocatori possono rimuovere solo un certo numero di oggetti da un mucchio. Ad esempio, nel "Nim-k", i giocatori possono rimuovere al massimo k oggetti per mossa.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>6.2 Nim Misère:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Nel Nim misère, il giocatore che rimuove l'ultimo oggetto perde (invece di vincere). L'analisi di questa variante è più complessa, ma per la maggior parte delle posizioni, la strategia è la stessa del Nim normale, tranne quando si arriva a posizioni con tutti i mucchi di dimensione 1.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>6.3 Staircase Nim:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In questa variante, gli oggetti sono disposti in una scala, e un giocatore può rimuovere oggetti solo da un gradino e da tutti i gradini superiori.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>6.4 Grundy's Game:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In questo gioco, i giocatori dividono un mucchio in due mucchi di dimensioni diverse. Il giocatore che non può più muovere perde.
        </p>
        <p className="text-lg leading-relaxed">
          Per ciascuna di queste varianti, possiamo calcolare i numeri di Grundy e utilizzare il teorema di Sprague-Grundy per determinare le posizioni vincenti e perdenti.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">7. Memorizzazione e Ottimizzazione</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il calcolo dei numeri di Grundy può diventare computazionalmente costoso per giochi complessi o posizioni grandi. Possiamo utilizzare tecniche di memorizzazione (memoization) per ottimizzare il calcolo.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Vediamo un'implementazione ottimizzata per calcolare i numeri di Grundy per il gioco di Grundy:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Calcola il mex (minimum excludent) di un insieme
int mex(unordered_set<int>& s) {
    int m = 0;
    while (s.count(m)) {
        m++;
    }
    return m;
}

// Calcola il numero di Grundy per il gioco di Grundy con memorizzazione
int calculateGrundyNumber(int n, vector<int>& memo) {
    // Caso base
    if (n <= 1) return 0;
    
    // Se già calcolato, restituisci il valore memorizzato
    if (memo[n] != -1) return memo[n];
    
    unordered_set<int> s;
    
    // Consideriamo tutte le mosse possibili
    for (int i = 1; i <= n / 2; i++) {
        // In Grundy's Game, possiamo dividere un mucchio in due mucchi di dimensioni i e n-i
        if (i != n - i) {
            s.insert(calculateGrundyNumber(i, memo) ^ calculateGrundyNumber(n - i, memo));
        }
    }
    
    // Il numero di Grundy è il mex dei numeri di Grundy delle posizioni raggiungibili
    memo[n] = mex(s);
    return memo[n];
}

// Esempio di utilizzo
int main() {
    int n = 50;  // Calcoliamo i numeri di Grundy fino a 50
    
    vector<int> memo(n + 1, -1);
    
    cout << "Numeri di Grundy per il gioco di Grundy:" << endl;
    for (int i = 0; i <= n; i++) {
        cout << "g(" << i << ") = " << calculateGrundyNumber(i, memo) << endl;
    }
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4">
          Questa implementazione utilizza la memorizzazione per evitare di ricalcolare i numeri di Grundy per le stesse posizioni più volte. Questo è particolarmente importante per giochi come Grundy's Game, dove il calcolo ricorsivo può diventare molto costoso.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">8. Applicazione: Gioco di Wythoff</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il gioco di Wythoff è un gioco interessante che combina elementi del Nim con movimenti diagonali. Ci sono due mucchi di oggetti, e un giocatore può:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Rimuovere un numero qualsiasi di oggetti da un singolo mucchio (come nel Nim).</li>
          <li className="mb-1">Rimuovere lo stesso numero di oggetti da entrambi i mucchi.</li>
        </ol>
        <p className="text-lg leading-relaxed mb-4">
          Il giocatore che rimuove l'ultimo oggetto vince.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Sorprendentemente, le posizioni perdenti (P-posizioni) in questo gioco seguono un pattern basato sulla sezione aurea φ = (1 + √5) / 2 ≈ 1.618:
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Le P-posizioni sono della forma (⌊nφ⌋, ⌊nφ²⌋) o (⌊nφ²⌋, ⌊nφ⌋) per n ≥ 0, dove ⌊x⌋ rappresenta la parte intera di x.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Vediamo un'implementazione per determinare se una posizione nel gioco di Wythoff è vincente o perdente:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Verifica se una posizione nel gioco di Wythoff è una P-posizione
bool isPPosition(int a, int b) {
    // Assicuriamoci che a <= b
    if (a > b) swap(a, b);
    
    // La sezione aurea
    const double phi = (1 + sqrt(5)) / 2;
    
    // Calcoliamo n tale che a = ⌊nφ⌋
    int n = round(a / phi);
    
    // Verifichiamo se b = ⌊nφ²⌋
    int expectedB = floor(n * phi * phi);
    
    return b == expectedB;
}

// Trova una mossa vincente, se esiste
pair<int, int> findWinningMove(int a, int b) {
    // Assicuriamoci che a <= b
    if (a > b) swap(a, b);
    
    // Prova a rimuovere oggetti da un singolo mucchio
    for (int i = 1; i <= a; i++) {
        if (isPPosition(a - i, b)) {
            return {i, 0};  // Rimuovi i oggetti dal mucchio a
        }
    }
    
    for (int i = 1; i <= b; i++) {
        if (isPPosition(a, b - i)) {
            return {0, i};  // Rimuovi i oggetti dal mucchio b
        }
    }
    
    // Prova a rimuovere oggetti da entrambi i mucchi
    for (int i = 1; i <= min(a, b); i++) {
        if (isPPosition(a - i, b - i)) {
            return {i, i};  // Rimuovi i oggetti da entrambi i mucchi
        }
    }
    
    // Non dovrebbe mai accadere se la posizione è vincente
    return {-1, -1};
}

// Esempio di utilizzo
int main() {
    int a = 10, b = 15;
    
    cout << "Posizione: (" << a << ", " << b << ")" << endl;
    
    if (isPPosition(a, b)) {
        cout << "Questa è una posizione perdente per il giocatore corrente." << endl;
    } else {
        auto [moveA, moveB] = findWinningMove(a, b);
        cout << "Questa è una posizione vincente per il giocatore corrente." << endl;
        
        if (moveB == 0) {
            cout << "Mossa vincente: rimuovere " << moveA << " oggetti dal mucchio A." << endl;
        } else if (moveA == 0) {
            cout << "Mossa vincente: rimuovere " << moveB << " oggetti dal mucchio B." << endl;
        } else {
            cout << "Mossa vincente: rimuovere " << moveA << " oggetti da entrambi i mucchi." << endl;
        }
    }
    
    // Stampa le prime P-posizioni
    cout << "\nPrime P-posizioni nel gioco di Wythoff:" << endl;
    for (int n = 0; n <= 10; n++) {
        int a = floor(n * (1 + sqrt(5)) / 2);
        int b = floor(n * (1 + sqrt(5)) / 2 * (1 + sqrt(5)) / 2);
        cout << "(" << a << ", " << b << ")" << endl;
    }
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4">
          Questa implementazione utilizza la formula basata sulla sezione aurea per determinare se una posizione è una P-posizione, e poi trova una mossa vincente se esiste. Il gioco di Wythoff è un esempio affascinante di come la matematica possa essere utilizzata per analizzare giochi combinatori.
        </p>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">9. Problemi di Esempio</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-2"><a href="https://cses.fi/problemset/task/1730" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - Nim Game I</a>: Un problema base sul gioco di Nim.</li>
          <li className="mb-2"><a href="https://cses.fi/problemset/task/1098" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - Nim Game II</a>: Una variante del gioco di Nim.</li>
          <li className="mb-2"><a href="https://cses.fi/problemset/task/1729" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - Stick Game</a>: Un problema che richiede il calcolo dei numeri di Grundy.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/1451/problem/E2" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Bitwise Queries (Hard Version)</a>: Un problema che utilizza concetti di teoria dei giochi e XOR.</li>
        </ul>
      </section>
    </div>
  );
};

export default GameTheoryPage;
