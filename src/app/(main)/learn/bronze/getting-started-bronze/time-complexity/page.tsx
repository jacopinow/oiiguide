import React from 'react';

const TimeComplexityPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Time Complexity</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Teoria</h2>
        <p className="text-lg leading-relaxed">
          Qui verrà fornita una spiegazione dettagliata della Time Complexity, includendo concetti come la notazione Big O (O grande), Omega (Ω grande), e Theta (Θ grande). Verranno discussi i casi peggiore, medio e migliore.
        </p>
        {/* Ulteriori paragrafi, liste, immagini esplicative, etc. */}
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Implementazioni ed Esempi in C++</h2>
        <p className="text-lg mb-4 leading-relaxed">
          Di seguito verranno presentati esempi di codice C++ per illustrare diverse complessità temporali comuni:
        </p>
        <div>
          <h3 className="text-2xl font-medium mb-2">O(1) - Complessità Costante</h3>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Esempio di codice C++ con complessità O(1)
#include <iostream>

void constantTimeExample(int arr[], int index) {
  // L'accesso a un elemento di un array tramite indice è O(1)
  std::cout << "Elemento: " << arr[index] << std::endl;
}

int main() {
  int myArray[] = {10, 20, 30, 40, 50};
  constantTimeExample(myArray, 2); // Accesso al terzo elemento
  return 0;
}`} 
          </code></pre>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-medium mb-2">O(n) - Complessità Lineare</h3>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Esempio di codice C++ con complessità O(n)
#include <iostream>
#include <vector>

void linearTimeExample(const std::vector<int>& vec) {
  // Iterare su tutti gli elementi di un vettore è O(n)
  for (int x : vec) {
    std::cout << x << " ";
  }
  std::cout << std::endl;
}

int main() {
  std::vector<int> myVector = {1, 2, 3, 4, 5};
  linearTimeExample(myVector);
  return 0;
}`} 
          </code></pre>
        </div>
        {/* Aggiungere esempi per O(log n), O(n log n), O(n^2), O(2^n), O(n!) */}
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Analisi della Complessità</h2>
        <p className="text-lg leading-relaxed">
          Questa sezione spiegherà come analizzare la complessità temporale di algoritmi semplici, cicli singoli, cicli annidati, e funzioni ricorsive. Verranno forniti metodi e trucchi per una stima rapida.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Esempi Pratici nel Competitive Programming</h2>
        <p className="text-lg leading-relaxed">
          Verranno mostrati esempi pratici di come la comprensione della time complexity sia cruciale per risolvere problemi nelle gare di programmazione, ad esempio per scegliere l'algoritmo giusto in base ai vincoli di tempo.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Esercizi Correlati</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2">Esercizio 1: Analizzare la complessità di un dato frammento di codice.</li>
          <li className="mb-2">Esercizio 2: Dato un problema e i suoi vincoli, determinare la massima complessità ammissibile per una soluzione.</li>
          {/* Link a problemi specifici su piattaforme come Codeforces, USACO, etc. */}
        </ul>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti ad Altri Concetti</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><a href="../space-complexity" className="text-blue-600 dark:text-blue-400 hover:underline">Space Complexity</a>: Un concetto strettamente correlato che misura la quantità di memoria utilizzata da un algoritmo.</li>
          <li className="mb-2">Ammortized Analysis: Per analizzare algoritmi dove operazioni costose sono rare.</li>
          {/* Altri collegamenti utili */}
        </ul>
      </section>
    </div>
  );
};

export default TimeComplexityPage;

