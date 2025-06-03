import React from 'react';

const IntroPrefixSumsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Introduzione alle Somme Prefisse (Livello Silver)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Teoria: Cosa Sono le Somme Prefisse?</h2>
        <p className="text-lg leading-relaxed mb-4">
          Le **somme prefisse** (o prefix sums), note anche come somme cumulative, sono una tecnica fondamentale e molto potente utilizzata per rispondere efficientemente a query di somma su intervalli di un array. Data una sequenza di numeri (un array), l'array delle somme prefisse `pref` è definito in modo tale che `pref[i]` contenga la somma di tutti gli elementi dall'inizio dell'array originale fino all'indice `i` (inclusivo).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Formalmente, se abbiamo un array `A` di N elementi (indicizzati da 0 a N-1), l'array delle somme prefisse `pref` (di dimensione N o N+1, a seconda della convenzione) è tale che:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">`pref[0] = A[0]`</li>
          <li className="mb-1">`pref[i] = A[0] + A[1] + ... + A[i] = pref[i-1] + A[i]` per `i > 0`.</li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">
          Una convenzione comune, e spesso più comoda per evitare casi base nell'indicizzazione, è usare un array di somme prefisse di dimensione N+1, dove `pref[0] = 0` (un elemento fittizio) e `pref[i]` rappresenta la somma dei primi `i` elementi dell'array originale (cioè, `A[0] + ... + A[i-1]`). In questa convenzione:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">`pref[0] = 0`</li>
          <li className="mb-1">`pref[i] = A[0] + A[1] + ... + A[i-1] = pref[i-1] + A[i-1]` per `i > 0`.</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Il vantaggio principale delle somme prefisse è che, una volta calcolato l'array `pref` (cosa che richiede tempo O(N)), possiamo calcolare la somma di qualsiasi sottoarray `A[L...R]` (elementi dall'indice L all'indice R, inclusi) in tempo **O(1)**.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Calcolo e Utilizzo delle Somme Prefisse</h2>

        <h3 className="text-2xl font-medium mb-2">Costruzione dell'Array delle Somme Prefisse</h3>
        <p className="text-lg leading-relaxed mb-3">
          Usando la convenzione con `pref[0] = 0`:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>
#include <numeric> // Per std::partial_sum (alternativa)

int main() {
  std::vector<int> A = {2, 8, 3, 5, 7, 4, 1, 9};
  int N = A.size();

  // Array delle somme prefisse (dimensione N+1, pref[0] = 0)
  std::vector<long long> pref(N + 1, 0); // Usare long long per evitare overflow se le somme sono grandi

  for (int i = 0; i < N; ++i) {
    pref[i + 1] = pref[i] + A[i];
  }

  std::cout << "Array Originale (A): ";
  for (int x : A) std::cout << x << " ";
  std::cout << std::endl;

  std::cout << "Array Somme Prefisse (pref): ";
  for (long long p_val : pref) std::cout << p_val << " ";
  std::cout << std::endl;
  // Output A: 2 8 3 5 7 4 1 9 
  // Output pref: 0 2 10 13 18 25 29 30 39 

  // Alternativa con std::partial_sum (nota: scrive su un range, quindi pref deve avere dimensione N)
  // std::vector<long long> pref_alternative(N);
  // std::partial_sum(A.begin(), A.end(), pref_alternative.begin());
  // std::cout << "Somme Prefisse (std::partial_sum): 0 "; // Aggiungiamo lo 0 manualmente se serve
  // for (long long p_val : pref_alternative) std::cout << p_val << " ";
  // std::cout << std::endl;

  return 0;
}`} 
        </code></pre>

        <h3 className="text-2xl font-medium mt-6 mb-2">Query di Somma su Intervallo</h3>
        <p className="text-lg leading-relaxed mb-3">
          Per calcolare la somma degli elementi dell'array originale `A` dall'indice `L` all'indice `R` (inclusi, 0-indexed), cioè `A[L] + A[L+1] + ... + A[R]`, possiamo usare l'array `pref` (quello con `pref[0]=0`) come segue:
        </p>
        <p className="text-lg leading-relaxed mb-3 font-semibold text-center bg-blue-100 dark:bg-blue-900 p-3 rounded">
          `Sum(A[L...R]) = pref[R+1] - pref[L]`
        </p>
        <p className="text-lg leading-relaxed mb-3">
          <strong>Spiegazione:</strong>
          <br/>
          `pref[R+1]` = `A[0] + ... + A[L-1] + A[L] + ... + A[R]`
          <br/>
          `pref[L]`   = `A[0] + ... + A[L-1]`
          <br/>
          Sottraendo `pref[L]` da `pref[R+1]`, gli elementi da `A[0]` a `A[L-1]` si cancellano, lasciando esattamente la somma desiderata.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Continuando dall'esempio precedente...
// Array A: {2, 8, 3, 5, 7, 4, 1, 9}
// Array pref: {0, 2, 10, 13, 18, 25, 29, 30, 39}

// Calcolare la somma di A[2...5] (elementi: 3, 5, 7, 4)
int L = 2;
int R = 5;
long long sum_L_R = pref[R + 1] - pref[L];
// pref[5+1] = pref[6] = 29 (somma A[0]...A[5])
// pref[2] = 10 (somma A[0]...A[1])
// sum_L_R = 29 - 10 = 19
// Verifica: 3 + 5 + 7 + 4 = 19. Corretto!
std::cout << "Somma A[" << L << "..." << R << "]: " << sum_L_R << std::endl;

// Calcolare la somma di A[0...3] (elementi: 2, 8, 3, 5)
L = 0;
R = 3;
sum_L_R = pref[R + 1] - pref[L];
// pref[3+1] = pref[4] = 18 (somma A[0]...A[3])
// pref[0] = 0
// sum_L_R = 18 - 0 = 18
// Verifica: 2 + 8 + 3 + 5 = 18. Corretto!
std::cout << "Somma A[" << L << "..." << R << "]: " << sum_L_R << std::endl;`} 
        </code></pre>
        <p className="text-lg leading-relaxed mt-3">
          Se si usa la convenzione `pref[i] = A[0] + ... + A[i]`, allora `Sum(A[L...R]) = pref[R] - (L > 0 ? pref[L-1] : 0)`. La convenzione con `pref[0]=0` è generalmente più pulita per evitare il ternario.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Analisi della Complessità</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Precalcolo dell'array `pref`:</strong> O(N), dove N è la dimensione dell'array originale. Si esegue una singola passata sull'array.</li>
          <li className="mb-2"><strong>Query di somma su un intervallo [L, R]:</strong> O(1), una volta che `pref` è stato calcolato. Richiede solo una sottrazione.</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Questo rende le somme prefisse estremamente efficienti quando si devono eseguire molte query di somma su intervalli diversi dello stesso array. Se si dovessero calcolare le somme iterando sull'intervallo ogni volta, ogni query costerebbe O(R-L+1), che può essere O(N) nel caso peggiore. Con Q query, l'approccio ingenuo sarebbe O(Q*N), mentre con le somme prefisse diventa O(N + Q).
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Esempi Pratici e Problemi USACO (Silver)</h2>
        <p className="text-lg leading-relaxed mb-4">
          Le somme prefisse sono un mattone fondamentale per molti problemi più complessi.
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>USACO Silver: "Subsequences Summing to Sevens" (o varianti)</strong> - Trovare il sottoarray contiguo più lungo la cui somma è divisibile per K. Le somme prefisse modulo K sono utili qui.</li>
          <li className="mb-2"><strong>USACO Silver: "Why Did the Cow Cross the Road III"</strong> - Problemi che coinvolgono il conteggio di coppie o il calcolo di valori su intervalli possono spesso beneficiare delle somme prefisse.</li>
          <li className="mb-2"><strong>Problemi di query su intervalli 1D:</strong> Qualsiasi problema che richieda ripetutamente la somma di valori in un intervallo di un array statico è un candidato per le somme prefisse.</li>
          <li className="mb-2"><strong>Estensione a 2D (Prefix Sums su Matrici):</strong> Le somme prefisse possono essere estese a matrici 2D per calcolare la somma di una sottomatrice in O(1) dopo un precalcolo O(N*M). Questo è un argomento comune in Silver/Gold. (Vedi la lezione "More on Prefix Sums").</li>
          <li className="mb-2"><strong>Differenze Finite (Difference Arrays):</strong> L'operazione inversa delle somme prefisse. Se hai bisogno di aggiornare un intervallo di valori (es. aggiungere X a tutti gli elementi in A[L...R]) molte volte e poi interrogare i valori finali, gli array di differenze sono utili.</li>
        </ul>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti ad Altri Concetti</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><a href="./more-on-prefix-sums" className="text-blue-600 dark:text-blue-400 hover:underline">More on Prefix Sums</a>: Approfondimenti, somme prefisse 2D, e applicazioni più avanzate.</li>
          <li className="mb-2"><a href="./two-pointers" className="text-blue-600 dark:text-blue-400 hover:underline">Two Pointers (Due Puntatori)</a>: A volte usato in combinazione con somme prefisse o per problemi simili che coinvolgono sottoarray.</li>
          <li className="mb-2"><a href="../sorting-and-searching/binary-search" className="text-blue-600 dark:text-blue-400 hover:underline">Binary Search (Ricerca Binaria)</a>: Se le somme prefisse sono monotone, si può usare la ricerca binaria su di esse per trovare intervalli con somme specifiche.</li>
          <li className="mb-2">Dynamic Programming (Programmazione Dinamica): Alcuni problemi di DP possono usare somme prefisse per ottimizzare le transizioni.</li>
          <li className="mb-2">Data Structures for Range Queries (Segment Trees, Fenwick Trees - argomenti Gold/Platinum): Per problemi dove l'array originale può essere modificato tra una query di somma e l'altra. Le somme prefisse funzionano bene solo per array statici.</li>
        </ul>
      </section>
    </div>
  );
};

export default IntroPrefixSumsPage;

