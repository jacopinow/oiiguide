import React from 'react';

const BinarySearchPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Ricerca Binaria (Binary Search) (Livello Silver)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Spiegazione Iniziale del Problema/Concetto</h2>
        <p className="text-lg leading-relaxed mb-4">
          La **ricerca binaria** (o binary search) è un algoritmo di ricerca estremamente efficiente utilizzato per trovare la posizione di un elemento specifico all'interno di un **array ordinato**. L'idea fondamentale è quella di dimezzare ripetutamente lo spazio di ricerca confrontando l'elemento target con l'elemento centrale dell'intervallo di ricerca corrente. Se l'elemento centrale è uguale al target, la ricerca è terminata. Se il target è più piccolo dell'elemento centrale, la ricerca continua nella metà sinistra dell'array; altrimenti, continua nella metà destra.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Questo approccio "dividi et impera" (divide and conquer) è molto più veloce della ricerca lineare (che controlla ogni elemento uno per uno), specialmente per array di grandi dimensioni. La condizione imprescindibile per la ricerca binaria è che l'array su cui si opera sia **ordinato**.
        </p>
        <p className="text-lg leading-relaxed">
          La ricerca binaria non si limita solo a trovare un valore esatto in un array. Può essere adattata per risolvere una vasta gamma di problemi, come trovare il primo/ultimo elemento che soddisfa una certa condizione, o trovare il valore minimo/massimo che soddisfa un criterio (spesso chiamata "binary search on answer" o ricerca binaria sulla risposta).
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Ragionamento Preliminare che Porta alla Soluzione</h2>
        <p className="text-lg leading-relaxed mb-4">
          Immagina di cercare una parola in un dizionario cartaceo (che è ordinato alfabeticamente). Invece di sfogliare pagina per pagina dall'inizio (ricerca lineare), probabilmente aprirai il dizionario circa a metà. Se la parola che cerchi viene prima delle parole in quella pagina, sai che devi concentrarti sulla prima metà del dizionario. Altrimenti, ti concentri sulla seconda metà. Ripeti questo processo, dimezzando ogni volta la sezione del dizionario da esaminare, finché non trovi la parola o determini che non c'è. Questo è esattamente come funziona la ricerca binaria.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Per implementare la ricerca binaria, manteniamo due puntatori (o indici), `low` e `high`, che definiscono l'intervallo corrente in cui stiamo cercando. Inizialmente, `low` è il primo indice dell'array (0) e `high` è l'ultimo indice (`N-1`).
        </p>
        <p className="text-lg leading-relaxed">
          Ad ogni passo:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Calcoliamo l'indice centrale `mid = low + (high - low) / 2`. (Usiamo questa forma invece di `(low + high) / 2` per evitare potenziali overflow se `low` e `high` sono molto grandi).</li>
          <li className="mb-1">Confrontiamo l'elemento `A[mid]` con il valore target `X`.</li>
          <li className="mb-1">Se `A[mid] == X`, abbiamo trovato l'elemento.</li>
          <li className="mb-1">Se `A[mid] < X`, significa che `X` (se presente) deve trovarsi nella metà destra dell'array. Quindi, aggiorniamo `low = mid + 1`.</li>
          <li className="mb-1">Se `A[mid] > X`, significa che `X` (se presente) deve trovarsi nella metà sinistra dell'array. Quindi, aggiorniamo `high = mid - 1`.</li>
        </ol>
        <p className="text-lg leading-relaxed">
          Continuiamo questo processo finché `low <= high`. Se `low` diventa maggiore di `high`, significa che l'intervallo di ricerca è vuoto e l'elemento non è presente nell'array.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Soluzione Guidata Divisa in Piccoli Passi Logici</h2>
        <p className="text-lg leading-relaxed mb-3">
          Vediamo l'implementazione della ricerca binaria per trovare un elemento `X` in un array ordinato `A`.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>
#include <algorithm> // Per std::sort, se necessario

// Funzione di ricerca binaria iterativa
// Restituisce l'indice dell'elemento se trovato, altrimenti -1
int binarySearch(const std::vector<int>& arr, int target) {
  int low = 0;
  int high = arr.size() - 1;

  while (low <= high) {
    int mid = low + (high - low) / 2; // Calcola l'indice centrale

    if (arr[mid] == target) {
      return mid; // Elemento trovato all'indice mid
    } else if (arr[mid] < target) {
      // Il target è nella metà destra
      low = mid + 1;
    } else { // arr[mid] > target
      // Il target è nella metà sinistra
      high = mid - 1;
    }
  }
  return -1; // Elemento non trovato
}

int main() {
  std::vector<int> sorted_array = {2, 5, 7, 8, 11, 12, 15, 18, 22, 25};
  
  int target1 = 11;
  int index1 = binarySearch(sorted_array, target1);
  if (index1 != -1) {
    std::cout << target1 << " trovato all'indice: " << index1 << std::endl;
  } else {
    std::cout << target1 << " non trovato." << std::endl;
  }
  // Output: 11 trovato all'indice: 4

  int target2 = 13;
  int index2 = binarySearch(sorted_array, target2);
  if (index2 != -1) {
    std::cout << target2 << " trovato all'indice: " << index2 << std::endl;
  } else {
    std::cout << target2 << " non trovato." << std::endl;
  }
  // Output: 13 non trovato.

  int target3 = 2;
  int index3 = binarySearch(sorted_array, target3);
  if (index3 != -1) {
    std::cout << target3 << " trovato all'indice: " << index3 << std::endl;
  } else {
    std::cout << target3 << " non trovato." << std::endl;
  }
  // Output: 2 trovato all'indice: 0

  int target4 = 25;
  int index4 = binarySearch(sorted_array, target4);
  if (index4 != -1) {
    std::cout << target4 << " trovato all'indice: " << index4 << std::endl;
  } else {
    std::cout << target4 << " non trovato." << std::endl;
  }
  // Output: 25 trovato all'indice: 9
  return 0;
}`} 
        </code></pre>
        <p className="text-lg leading-relaxed mt-3">
          <strong>Funzioni STL in C++:</strong> La Standard Template Library (STL) del C++ fornisce funzioni integrate per la ricerca binaria che sono ottimizzate e sicure da usare:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mt-2">
          <li className="mb-1">`std::binary_search(arr.begin(), arr.end(), target)`: Restituisce `true` se `target` è presente, `false` altrimenti.</li>
          <li className="mb-1">`std::lower_bound(arr.begin(), arr.end(), target)`: Restituisce un iteratore al primo elemento che **non è minore** di `target` (cioè, >= `target`). Se tutti gli elementi sono minori di `target`, restituisce `arr.end()`.</li>
          <li className="mb-1">`std::upper_bound(arr.begin(), arr.end(), target)`: Restituisce un iteratore al primo elemento che è **maggiore** di `target`. Se nessun elemento è maggiore di `target`, restituisce `arr.end()`.</li>
        </ul>
        <p className="text-lg leading-relaxed mt-2">
          `lower_bound` e `upper_bound` sono estremamente utili per problemi più complessi, come contare il numero di occorrenze di un elemento o trovare elementi in un certo intervallo.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Visualizzazione dell'Esecuzione con Esempi</h2>
        <p className="text-lg leading-relaxed mb-3">
          Consideriamo `arr = {2, 5, 7, 8, 11, 12, 15, 18, 22, 25}` e `target = 11`.
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Inizio: `low = 0`, `high = 9`. `mid = 0 + (9-0)/2 = 4`. `arr[4] = 11`.</li>
          <li className="mb-1">`arr[mid] (11) == target (11)`. Trovato! Restituisce `mid = 4`.</li>
        </ol>
        <p className="text-lg leading-relaxed mb-3">
          Consideriamo `arr = {2, 5, 7, 8, 11, 12, 15, 18, 22, 25}` e `target = 13`.
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Inizio: `low = 0`, `high = 9`. `mid = 4`. `arr[4] = 11`.</li>
          <li className="mb-1">`arr[mid] (11) < target (13)`. Quindi, `low = mid + 1 = 5`. Ora `low = 5`, `high = 9`.</li>
          <li className="mb-1">`mid = 5 + (9-5)/2 = 5 + 2 = 7`. `arr[7] = 18`.</li>
          <li className="mb-1">`arr[mid] (18) > target (13)`. Quindi, `high = mid - 1 = 6`. Ora `low = 5`, `high = 6`.</li>
          <li className="mb-1">`mid = 5 + (6-5)/2 = 5 + 0 = 5`. `arr[5] = 12`.</li>
          <li className="mb-1">`arr[mid] (12) < target (13)`. Quindi, `low = mid + 1 = 6`. Ora `low = 6`, `high = 6`.</li>
          <li className="mb-1">`mid = 6 + (6-6)/2 = 6`. `arr[6] = 15`.</li>
          <li className="mb-1">`arr[mid] (15) > target (13)`. Quindi, `high = mid - 1 = 5`. Ora `low = 6`, `high = 5`.</li>
          <li className="mb-1">`low (6) > high (5)`. Il ciclo termina. Elemento non trovato. Restituisce -1.</li>
        </ol>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Analisi della Complessità Spiegata in Modo Semplice</h2>
        <p className="text-lg leading-relaxed mb-4">
          Ad ogni passo della ricerca binaria, dimezziamo lo spazio di ricerca. Se l'array ha N elementi, dopo il primo confronto rimangono circa N/2 elementi. Dopo il secondo, N/4, e così via. Continuiamo finché lo spazio di ricerca si riduce a 1 elemento (o 0).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Questo processo è equivalente a chiedersi: quante volte possiamo dividere N per 2 finché non arriviamo a 1? Questa è la definizione del logaritmo in base 2 di N, scritto come `log₂(N)`.
        </p>
        <p className="text-lg leading-relaxed">
          Quindi, la complessità temporale della ricerca binaria è **O(log N)**. Questo è estremamente efficiente. Per esempio:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Per N = 1.000, log₂(N) ≈ 10.</li>
          <li className="mb-1">Per N = 1.000.000, log₂(N) ≈ 20.</li>
          <li className="mb-1">Per N = 1.000.000.000, log₂(N) ≈ 30.</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Anche per array molto grandi, la ricerca binaria richiede pochissimi confronti. La complessità spaziale è O(1) per la versione iterativa (usiamo solo un numero costante di variabili aggiuntive).
        </p>
        <p className="text-lg leading-relaxed">
          Ricorda che se l'array non è ordinato, devi prima ordinarlo, il che costa O(N log N) con `std::sort`. In tal caso, la complessità totale sarebbe dominata dall'ordinamento.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Possibili Ottimizzazioni e Varianti (Ricerca Binaria sulla Risposta)</h2>
        <p className="text-lg leading-relaxed mb-4">
          Una potente applicazione della ricerca binaria è la **ricerca binaria sulla risposta** (o "Binary Search on the Answer"). Questa tecnica si usa quando vogliamo trovare il valore minimo o massimo di una "risposta" che soddisfa una certa condizione, e la condizione ha una proprietà monotona.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Proprietà Monotona:</strong> Se un valore `X` soddisfa la condizione, allora tutti i valori più grandi (o più piccoli, a seconda del problema) di `X` la soddisfano anche (o non la soddisfano). Formalmente, se una funzione `check(x)` restituisce `true` se `x` è una risposta valida, allora `check(x)` deve essere monotona (es. `false, false, ..., false, true, true, ..., true` o `true, true, ..., true, false, false, ..., false`).
        </p>
        <p className="text-lg leading-relaxed mb-3">
          <strong>Esempio:</strong> USACO Silver "Aggressive Cows". Dobbiamo posizionare K mucche in N stalle (date le loro posizioni su una linea) in modo tale che la distanza minima tra due mucche qualsiasi sia massimizzata. Qui, la "risposta" è la distanza minima. Possiamo fare una ricerca binaria su questa distanza. Per una data distanza `D`, possiamo verificare se è possibile posizionare K mucche con almeno `D` di distanza tra loro (questa è la funzione `check(D)`). Se `check(D)` è `true`, allora potremmo provare una distanza `D'` più grande. Se `check(D)` è `false`, dobbiamo provare una distanza più piccola.
        </p>
        <p className="text-lg leading-relaxed">
          La ricerca binaria sulla risposta è un pattern molto comune nei problemi di livello Silver e Gold.
        </p>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti a Concetti Prerequisiti e Successivi</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Prerequisito:</strong> <a href="../introduction-to-sorting" className="text-blue-600 dark:text-blue-400 hover:underline">Ordinamento</a> (l'array deve essere ordinato).</li>
          <li className="mb-2"><strong>Prerequisito:</strong> <a href="../../bronze/getting-started-bronze/time-complexity" className="text-blue-600 dark:text-blue-400 hover:underline">Complessità Temporale (basi)</a> (per apprezzare il O(log N)).</li>
          <li className="mb-2"><strong>Concetto Correlato:</strong> <a href="../prefix-sums/two-pointers" className="text-blue-600 dark:text-blue-400 hover:underline">Tecnica dei Due Puntatori</a> (un altro modo per sfruttare array ordinati).</li>
          <li className="mb-2"><strong>Estensione:</strong> Ternary Search (per trovare il massimo/minimo di funzioni unimodali).</li>
          <li className="mb-2"><strong>Applicazione:</strong> Molti problemi di ottimizzazione e ricerca in USACO Silver/Gold.</li>
          <li className="mb-2"><strong>Strutture Dati:</strong> `std::set` e `std::map` in C++ usano internamente strutture simili ad alberi bilanciati che permettono operazioni in O(log N), concettualmente simile alla ricerca binaria.</li>
        </ul>
      </section>
    </div>
  );
};

export default BinarySearchPage;

