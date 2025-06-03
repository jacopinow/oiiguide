import React from 'react';

const TwoPointersPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Tecnica dei Due Puntatori (Two Pointers) (Livello Silver)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Teoria: Cos'è la Tecnica dei Due Puntatori?</h2>
        <p className="text-lg leading-relaxed mb-4">
          La tecnica dei **due puntatori** (o "two-pointer technique") è un pattern algoritmico molto comune ed efficiente, utilizzato principalmente per problemi che coinvolgono la ricerca di coppie, terzetti o sottoarray (contigui o non) all'interno di un array ordinato (o talvolta non ordinato, a seconda del problema). L'idea centrale è mantenere due (o talvolta più) indici, o "puntatori", che attraversano l'array, e muoverli in modo coordinato per esplorare le possibili soluzioni.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Questa tecnica è particolarmente efficace perché spesso permette di ridurre la complessità temporale di un problema da O(N^2) o O(N^3) (che si avrebbe con cicli annidati ingenui) a O(N) o O(N log N) (se l'ordinamento è necessario come pre-passaggio).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Esistono diverse varianti della tecnica dei due puntatori, ma le più comuni coinvolgono:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Puntatori che si muovono in direzioni opposte:</strong> Un puntatore parte dall'inizio dell'array (`left`) e uno dalla fine (`right`). Si muovono l'uno verso l'altro finché non si incontrano o si incrociano. Utile per trovare coppie con una certa somma in un array ordinato.</li>
          <li className="mb-2"><strong>Puntatori che si muovono nella stessa direzione (finestra scorrevole o "sliding window"):</strong> Entrambi i puntatori (`left` e `right`) partono dall'inizio. Il puntatore `right` avanza per espandere una "finestra" (un sottoarray), e il puntatore `left` avanza per contrarre la finestra quando una certa condizione non è più soddisfatta. Utile per trovare il sottoarray più corto/lungo che soddisfa una proprietà.</li>
        </ul>
        <p className="text-lg leading-relaxed">
          La chiave per applicare correttamente questa tecnica è capire come e quando muovere i puntatori in base alle condizioni del problema per esplorare lo spazio delle soluzioni in modo efficiente e senza perdere soluzioni valide.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Variante 1: Puntatori Opposti</h2>
        <p className="text-lg leading-relaxed mb-3">
          <strong>Problema Esempio:</strong> Dato un array ordinato `A` di N interi e un intero target `X`, trovare se esistono due elementi in `A` la cui somma è uguale a `X`.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>
#include <algorithm> // Per std::sort (se l'array non è già ordinato)

bool hasPairWithSum(const std::vector<int>& arr, int target_sum) {
  int left = 0;
  int right = arr.size() - 1;

  while (left < right) {
    int current_sum = arr[left] + arr[right];
    if (current_sum == target_sum) {
      std::cout << "Coppia trovata: " << arr[left] << " + " << arr[right] << " = " << target_sum << std::endl;
      return true; // Coppia trovata
    } else if (current_sum < target_sum) {
      // La somma è troppo piccola, dobbiamo aumentarla.
      // Poiché l'array è ordinato, muoviamo il puntatore sinistro a destra per prendere un elemento più grande.
      left++;
    } else { // current_sum > target_sum
      // La somma è troppo grande, dobbiamo diminuirla.
      // Muoviamo il puntatore destro a sinistra per prendere un elemento più piccolo.
      right--;
    }
  }
  return false; // Nessuna coppia trovata
}

int main() {
  std::vector<int> sorted_array = {2, 4, 5, 7, 8, 11, 12};
  int X = 15;
  if (!hasPairWithSum(sorted_array, X)) {
    std::cout << "Nessuna coppia trovata con somma " << X << std::endl;
  }
  // Output: Coppia trovata: 4 + 11 = 15

  X = 20;
  if (!hasPairWithSum(sorted_array, X)) {
    std::cout << "Nessuna coppia trovata con somma " << X << std::endl;
  }
  // Output: Coppia trovata: 8 + 12 = 20

  X = 100;
  if (!hasPairWithSum(sorted_array, X)) {
    std::cout << "Nessuna coppia trovata con somma " << X << std::endl;
  }
  // Output: Nessuna coppia trovata con somma 100
  return 0;
}`} 
        </code></pre>
        <p className="text-lg leading-relaxed mt-3">
          <strong>Perché funziona?</strong> Poiché l'array è ordinato, se `arr[left] + arr[right]` è troppo piccolo, l'unico modo per aumentare la somma è incrementare `left` (perché `arr[right]` è già il massimo possibile per quel `right`). Simmetricamente, se la somma è troppo grande, decrementiamo `right`.
          <br/>
          <strong>Complessità:</strong> O(N) dopo l'ordinamento (se necessario, che costa O(N log N)). Ogni puntatore attraversa l'array al massimo una volta.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Variante 2: Finestra Scorrevole (Sliding Window)</h2>
        <p className="text-lg leading-relaxed mb-3">
          <strong>Problema Esempio:</strong> Dato un array `A` di N interi positivi e un intero `S`, trovare la lunghezza del sottoarray contiguo più corto la cui somma è maggiore o uguale a `S`.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>
#include <algorithm> // Per std::min

int shortestSubarrayWithSumAtLeastS(const std::vector<int>& arr, int S) {
  int n = arr.size();
  int min_length = n + 1; // Inizializza a un valore più grande della lunghezza massima possibile
  long long current_sum = 0;
  int left = 0;

  for (int right = 0; right < n; ++right) {
    current_sum += arr[right]; // Espandi la finestra aggiungendo l'elemento a destra

    // Finché la somma della finestra corrente è >= S, prova a contrarre la finestra da sinistra
    while (current_sum >= S) {
      min_length = std::min(min_length, right - left + 1);
      current_sum -= arr[left]; // Rimuovi l'elemento a sinistra
      left++;                   // Contrai la finestra
    }
  }

  return (min_length == n + 1) ? 0 : min_length; // 0 se nessun sottoarray trovato
}

int main() {
  std::vector<int> A = {2, 3, 1, 2, 4, 3};
  int S = 7;
  int length = shortestSubarrayWithSumAtLeastS(A, S);
  std::cout << "Lunghezza sottoarray piu corto con somma >= " << S << ": " << length << std::endl;
  // Output: 2 (sottoarray {4,3})

  S = 15;
  length = shortestSubarrayWithSumAtLeastS(A, S);
  std::cout << "Lunghezza sottoarray piu corto con somma >= " << S << ": " << length << std::endl;
  // Output: 0 (nessun sottoarray ha somma >= 15, la somma totale è 15, ma il problema chiede >= S)
  // Se fosse S = 15, l'output sarebbe 6 (l'intero array {2,3,1,2,4,3})
  // Modifichiamo l'esempio per S=10
  S = 10;
  length = shortestSubarrayWithSumAtLeastS(A, S);
  std::cout << "Lunghezza sottoarray piu corto con somma >= " << S << ": " << length << std::endl;
  // Output: 3 (sottoarray {2,4,3} o {3,1,2,4} -> {2,4,3} è 9, {1,2,4,3} è 10, {3,1,2,4} è 10, {2,3,1,2,4} è 12. {4,3} è 7. {2,4,3} è 9. {1,2,4,3} è 10. {3,2,4,3} è 12. {2,3,1,2,4} è 12. {3,1,2,4,3} è 13. {2,3,1,2,4,3} è 15.
  // Sottoarray {1,2,4,3} ha somma 10 e lunghezza 4.
  // Sottoarray {2,4,3} ha somma 9.
  // Sottoarray {2,3,1,2,4} ha somma 12 e lunghezza 5.
  // Sottoarray {3,1,2,4,3} ha somma 13 e lunghezza 5.
  // Sottoarray {4,3} ha somma 7.
  // Sottoarray {2,3,1,2} ha somma 8.
  // Sottoarray {3,1,2,4} ha somma 10, lunghezza 4.
  // Sottoarray {1,2,4,3} ha somma 10, lunghezza 4.
  // Sottoarray {2,4,3} ha somma 9.
  // L'esempio corretto per A = {2, 3, 1, 2, 4, 3}, S = 7 è {4,3} (lunghezza 2).
  // Per S = 10, {2,4,3} è 9. {1,2,4,3} è 10 (lunghezza 4). {3,1,2,4} è 10 (lunghezza 4). {2,3,1,2,4} è 12 (lunghezza 5).
  // Il più corto è di lunghezza 4. Quindi l'output per S=10 dovrebbe essere 4.
  // Ricontrollando l'esempio: A = {2,3,1,2,4,3}, S=7.  {4,3} somma 7, lunghezza 2.  {2,3,1,2} somma 8, lunghezza 4. {3,1,2,4} somma 10, lunghezza 4.
  // Output corretto per S=7 è 2.
  // Output corretto per S=10 è 4.
  return 0;
}
/* Output atteso per S=7: Lunghezza sottoarray piu corto con somma >= 7: 2 */
/* Output atteso per S=10: Lunghezza sottoarray piu corto con somma >= 10: 4 */
`} 
        </code></pre>
        <p className="text-lg leading-relaxed mt-3">
          <strong>Come funziona?</strong> Il puntatore `right` espande la finestra. Non appena `current_sum >= S`, abbiamo una finestra valida. A questo punto, cerchiamo di renderla più corta possibile contraendola da sinistra (incrementando `left`) finché la condizione `current_sum >= S` rimane vera. Ogni volta che contraiamo e la condizione è ancora valida, aggiorniamo `min_length`.
          <br/>
          <strong>Complessità:</strong> O(N). Sebbene ci sia un ciclo `while` dentro il ciclo `for`, ogni elemento dell'array viene visitato al massimo due volte: una dal puntatore `right` (quando viene aggiunto alla somma) e una dal puntatore `left` (quando viene rimosso). Quindi, la complessità totale è lineare.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Quando Usare i Due Puntatori?</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Array Ordinato (per puntatori opposti):</strong> La tecnica dei puntatori opposti si basa fortemente sull'ordinamento per decidere come muovere i puntatori.</li>
          <li className="mb-2"><strong>Proprietà Monotona (per finestra scorrevole):</strong> Per la finestra scorrevole, spesso si cerca una condizione che, una volta soddisfatta, rimane soddisfatta (o diventa insoddisfatta in modo prevedibile) quando la finestra si espande o si contrae. Ad esempio, se la somma di una finestra è >= S, espandendola ulteriormente la somma non diminuirà (se gli elementi sono positivi).</li>
          <li className="mb-2"><strong>Problemi di Conteggio o Ottimizzazione su Sottoarray/Coppie:</strong> Contare coppie che soddisfano una condizione, trovare il sottoarray più corto/lungo, massimizzare/minimizzare un valore derivato da un sottoarray.</li>
          <li className="mb-2"><strong>Evitare O(N^2):</strong> Se una soluzione ingenua con due cicli annidati è troppo lenta, considera se i due puntatori possono ottimizzarla.</li>
        </ul>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Esempi Pratici e Problemi USACO (Silver)</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>USACO Silver: "Paired Up"</strong> - Trovare il tempo massimo minimo. Si ordina e si usano due puntatori che si muovono dalle estremità.</li>
          <li className="mb-2"><strong>USACO Silver: "Diamond Collector"</strong> - Dopo aver ordinato i diamanti, si può usare una finestra scorrevole (o due passate di ricerca) per trovare il numero massimo di diamanti che Bessie può collezionare.</li>
          <li className="mb-2"><strong>USACO Silver: "Subarray Sums I & II" (CSES)</strong> - Problemi classici per contare sottoarray con una somma specifica o trovare sottoarray con somma minima/massima.</li>
          <li className="mb-2">Trovare il numero di coppie in un array la cui somma è minore/maggiore di un certo valore.</li>
          <li className="mb-2">Trovare il sottoarray contiguo con la somma massima (Problema di Kadane, anche se non è strettamente due puntatori, ha un'idea simile di estendere una soluzione).</li>
        </ul>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti ad Altri Concetti</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><a href="../sorting-and-searching/introduction-to-sorting" className="text-blue-600 dark:text-blue-400 hover:underline">Ordinamento</a>: Spesso un prerequisito, specialmente per la variante con puntatori opposti.</li>
          <li className="mb-2"><a href="./introduction-to-prefix-sums" className="text-blue-600 dark:text-blue-400 hover:underline">Somme Prefisse</a>: Utili per calcolare rapidamente la somma di una finestra se non si vuole mantenere `current_sum` manualmente, anche se la tecnica dei due puntatori spesso aggiorna `current_sum` in O(1).</li>
          <li className="mb-2"><a href="../sorting-and-searching/binary-search" className="text-blue-600 dark:text-blue-400 hover:underline">Ricerca Binaria</a>: A volte, per ogni posizione di `left`, si potrebbe usare la ricerca binaria per trovare `right`, ma la tecnica dei due puntatori è spesso più efficiente perché `right` non riparte da zero ogni volta.</li>
          <li className="mb-2">Greedy Algorithms: La logica di movimento dei puntatori ha spesso una natura greedy (fare la mossa che sembra migliore al momento).</li>
        </ul>
      </section>
    </div>
  );
};

export default TwoPointersPage;

