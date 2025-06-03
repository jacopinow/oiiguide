import React from 'react';

const IntroductionToSortingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Introduzione all'Ordinamento (Livello Bronze)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Teoria: Cos'è l'Ordinamento?</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'**ordinamento** è il processo di organizzare una collezione di elementi (come numeri, stringhe o oggetti più complessi) in un ordine specifico, solitamente crescente o decrescente. È una delle operazioni fondamentali nell'informatica e un prerequisito per molti altri algoritmi e tecniche di risoluzione dei problemi. Saper ordinare i dati in modo efficiente è una competenza cruciale nel competitive programming.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Perché ordinare? Ordinare i dati può semplificare drasticamente i problemi. Ad esempio:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2">Trovare il valore minimo o massimo in una collezione diventa banale (è il primo o l'ultimo elemento).</li>
          <li className="mb-2">Verificare se esistono duplicati è più facile se gli elementi uguali sono adiacenti.</li>
          <li className="mb-2">La ricerca di un elemento specifico può essere molto più veloce (vedi Binary Search, un argomento Silver).</li>
          <li className="mb-2">Molti algoritmi greedy richiedono che i dati siano ordinati secondo un certo criterio.</li>
        </ul>
        <p className="text-lg leading-relaxed">
          A livello Bronze, spesso non ti verrà chiesto di implementare algoritmi di ordinamento complessi da zero durante un contest, ma è importante capire i concetti di base e, soprattutto, come usare le funzioni di ordinamento integrate nel tuo linguaggio (come `std::sort` in C++).
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Algoritmi di Ordinamento Semplici (Concettuali)</h2>
        <p className="text-lg leading-relaxed mb-4">
          Comprendere come funzionano alcuni algoritmi di ordinamento semplici può aiutare a costruire l'intuizione, anche se in pratica userai quasi sempre `std::sort`.
        </p>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">1. Bubble Sort</h3>
          <p className="text-lg leading-relaxed mb-3">
            Bubble Sort confronta ripetutamente coppie adiacenti di elementi e li scambia se sono nell'ordine sbagliato. Gli elementi più grandi "galleggiano" (bubble up) verso la fine dell'array. Si continua a passare sull'array finché non ci sono più scambi da fare.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Esempio concettuale di Bubble Sort
void bubbleSort(std::vector<int>& arr) {
  int n = arr.size();
  bool swapped;
  for (int i = 0; i < n - 1; ++i) {
    swapped = false;
    for (int j = 0; j < n - i - 1; ++j) {
      if (arr[j] > arr[j + 1]) {
        std::swap(arr[j], arr[j + 1]);
        swapped = true;
      }
    }
    if (!swapped) break; // Ottimizzazione: se non ci sono scambi, l'array è ordinato
  }
}`} 
          </code></pre>
          <p className="text-lg leading-relaxed mt-3"><strong>Complessità:</strong> O(N^2) nel caso peggiore e medio. Troppo lento per N grandi.</p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">2. Selection Sort</h3>
          <p className="text-lg leading-relaxed mb-3">
            Selection Sort divide l'array in una parte ordinata e una non ordinata. Ad ogni passo, trova l'elemento più piccolo nella parte non ordinata e lo scambia con il primo elemento della parte non ordinata, espandendo così la parte ordinata.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Esempio concettuale di Selection Sort
void selectionSort(std::vector<int>& arr) {
  int n = arr.size();
  for (int i = 0; i < n - 1; ++i) {
    int min_idx = i;
    for (int j = i + 1; j < n; ++j) {
      if (arr[j] < arr[min_idx]) {
        min_idx = j;
      }
    }
    std::swap(arr[min_idx], arr[i]);
  }
}`} 
          </code></pre>
          <p className="text-lg leading-relaxed mt-3"><strong>Complessità:</strong> O(N^2) in tutti i casi. Anche questo è troppo lento per N grandi.</p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">3. Insertion Sort</h3>
          <p className="text-lg leading-relaxed mb-3">
            Insertion Sort costruisce l'array ordinato un elemento alla volta. Prende ogni elemento dalla parte non ordinata e lo inserisce nella posizione corretta all'interno della parte già ordinata.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Esempio concettuale di Insertion Sort
void insertionSort(std::vector<int>& arr) {
  int n = arr.size();
  for (int i = 1; i < n; ++i) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
}`} 
          </code></pre>
          <p className="text-lg leading-relaxed mt-3"><strong>Complessità:</strong> O(N^2) nel caso peggiore e medio. Efficiente per array piccoli o quasi ordinati.</p>
        </div>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">L'Ordinamento Pratico: `std::sort` in C++</h2>
        <p className="text-lg leading-relaxed mb-3">
          In C++, la Standard Template Library (STL) fornisce una funzione di ordinamento altamente ottimizzata chiamata `std::sort`. Questa è la funzione che dovresti usare quasi sempre nei contest.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>
#include <algorithm> // Necessario per std::sort
#include <functional> // Necessario per std::greater<int>() per ordine decrescente

int main() {
  std::vector<int> numeri = {5, 1, 4, 2, 8};

  // Ordinamento crescente (default)
  std::sort(numeri.begin(), numeri.end());
  std::cout << "Crescente: ";
  for (int x : numeri) std::cout << x << " "; // Output: 1 2 4 5 8
  std::cout << std::endl;

  // Ordinamento decrescente
  std::vector<int> numeri2 = {5, 1, 4, 2, 8};
  std::sort(numeri2.begin(), numeri2.end(), std::greater<int>());
  // Alternativa con lambda (C++11 in poi):
  // std::sort(numeri2.begin(), numeri2.end(), [](int a, int b) {
  //   return a > b;
  // });
  std::cout << "Decrescente: ";
  for (int x : numeri2) std::cout << x << " "; // Output: 8 5 4 2 1
  std::cout << std::endl;

  // Ordinare un array statico
  int arr[] = {7, 3, 9, 0, 5};
  int n = sizeof(arr) / sizeof(arr[0]);
  std::sort(arr, arr + n);
  std::cout << "Array statico crescente: ";
  for (int i = 0; i < n; ++i) std::cout << arr[i] << " "; // Output: 0 3 5 7 9
  std::cout << std::endl;

  return 0;
}`} 
        </code></pre>
        <p className="text-lg leading-relaxed mt-3">
          `std::sort` prende due iteratori come argomenti, che definiscono l'intervallo da ordinare (di solito `begin()` e `end()` per un `std::vector`). Opzionalmente, può prendere un terzo argomento, una funzione o un oggetto funzione (comparatore), per definire un ordine personalizzato.
        </p>
        <p className="text-lg leading-relaxed mt-2">
          <strong>Complessità di `std::sort`:</strong> Solitamente è implementato usando un algoritmo efficiente come Introsort (un ibrido di Quicksort, Heapsort e Insertion Sort), che ha una complessità media e nel caso peggiore di **O(N log N)**. Questo è abbastanza veloce per la maggior parte dei problemi di livello Bronze e Silver.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Esempi Pratici e Problemi USACO</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Trovare la mediana:</strong> Ordina i numeri e prendi l'elemento centrale.</li>
          <li className="mb-2"><strong>USACO Bronze: "Why Did the Cow Cross the Road II"</strong> - Ordinare gli intervalli di tempo può aiutare a risolvere il problema.</li>
          <li className="mb-2"><strong>USACO Bronze: "Sleeping in Class"</strong> - Dopo aver calcolato le somme prefisse, l'ordinamento non è direttamente necessario, ma molti problemi di conteggio o accoppiamento beneficiano dell'ordinamento.</li>
          <li className="mb-2"><strong>Problemi di frequenza:</strong> Ordina l'array, poi itera per contare facilmente gli elementi adiacenti uguali.</li>
          <li className="mb-2">Molti problemi di tipo "greedy" richiedono di processare gli elementi in un ordine specifico (es. ordinare per profitto, per peso, per data di scadenza).</li>
        </ul>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti ad Altri Concetti</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><a href="./time-complexity" className="text-blue-600 dark:text-blue-400 hover:underline">Time Complexity</a>: Capire perché O(N log N) è molto meglio di O(N^2).</li>
          <li className="mb-2"><a href="../introduction-to-data-structures" className="text-blue-600 dark:text-blue-400 hover:underline">Strutture Dati</a>: L'ordinamento si applica a strutture come array e vector.</li>
          <li className="mb-2">Custom Comparators (Argomento Silver): Per ordinare oggetti complessi o secondo criteri non standard.</li>
          <li className="mb-2">Binary Search (Argomento Silver): Può essere applicato solo su array/vector ordinati.</li>
          <li className="mb-2"><a href="./introduction-to-sets-and-maps" className="text-blue-600 dark:text-blue-400 hover:underline">Sets e Maps</a>: Strutture dati che mantengono automaticamente i loro elementi ordinati (argomento opzionale per Bronze, più comune in Silver).</li>
        </ul>
      </section>
    </div>
  );
};

export default IntroductionToSortingPage;

