import React from 'react';

const IntroDataStructuresPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Introduzione alle Strutture Dati (Livello Bronze)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Teoria: Cosa Sono le Strutture Dati?</h2>
        <p className="text-lg leading-relaxed mb-4">
          Nel mondo della programmazione, e in particolare nel competitive programming, i dati sono l'ingrediente fondamentale con cui lavoriamo. Una **struttura dati** è semplicemente un modo organizzato per memorizzare e gestire questi dati, in modo da poter eseguire operazioni su di essi in modo efficiente. La scelta della struttura dati giusta può fare un'enorme differenza nelle prestazioni di un algoritmo, trasformando una soluzione lenta e inefficiente in una veloce e ottimale.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Immagina di dover cercare un nome in un elenco telefonico. Se i nomi fossero in ordine casuale, dovresti scorrerli tutti, uno per uno. Se invece fossero ordinati alfabeticamente, potresti trovare il nome molto più rapidamente. L'elenco ordinato è una semplice struttura dati che migliora l'efficienza della ricerca.
        </p>
        <p className="text-lg leading-relaxed">
          A livello Bronze di USACO, le strutture dati più comuni e fondamentali che incontrerai sono gli **array** (e la loro versione più flessibile in C++, `std::vector`). Comprendere a fondo come funzionano e quando utilizzarli è il primo passo cruciale per risolvere molti problemi.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Strutture Dati Fondamentali per Bronze</h2>
        
        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">Array Statici</h3>
          <p className="text-lg leading-relaxed mb-3">
            Un array è una collezione di elementi dello stesso tipo memorizzati in locazioni di memoria contigue. La dimensione di un array statico in C++ deve essere conosciuta a tempo di compilazione. Gli elementi sono accessibili tramite un indice, che di solito parte da 0.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Dichiarazione di un array di 5 interi
int punteggi[5];

// Inizializzazione durante la dichiarazione
int voti[] = {8, 7, 9, 10, 6};

// Accesso agli elementi
punteggi[0] = 100; // Imposta il primo elemento
int secondoVoto = voti[1]; // Accede al secondo elemento (valore 7)

// Iterare su un array
for (int i = 0; i < 5; ++i) {
  std::cout << voti[i] << " ";
}
// Output: 8 7 9 10 6`} 
          </code></pre>
          <p className="text-lg leading-relaxed mt-3">
            <strong>Pro:</strong> Accesso molto veloce agli elementi (O(1)) se conosci l'indice.
            <br/>
            <strong>Contro:</strong> Dimensione fissa. Non puoi cambiarla dopo la dichiarazione. Rischio di errori "out-of-bounds" se accedi a un indice non valido.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-medium mb-2"><code>std::vector</code> (Array Dinamici)</h3>
          <p className="text-lg leading-relaxed mb-3">
            Il `std::vector` della Standard Template Library (STL) del C++ è una versione più potente e flessibile degli array. Si comporta come un array dinamico, il che significa che la sua dimensione può cambiare durante l'esecuzione del programma. È la struttura dati sequenziale più usata nel competitive programming in C++.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <vector>
#include <iostream>

// Dichiarazione di un vettore di interi vuoto
std::vector<int> numeri;

// Aggiungere elementi (la dimensione aumenta dinamicamente)
numeri.push_back(10);
numeri.push_back(20);
numeri.push_back(30);

// Dichiarazione con dimensione iniziale e valore
std::vector<int> primi(5, 1); // Vettore di 5 elementi, tutti inizializzati a 1

// Accesso agli elementi (come gli array)
std::cout << numeri[0] << std::endl; // Output: 10

// Ottenere la dimensione corrente
std::cout << "Dimensione: " << numeri.size() << std::endl; // Output: Dimensione: 3

// Iterare su un vettore (stile C++11 range-based for loop)
for (int num : numeri) {
  std::cout << num << " ";
}
// Output: 10 20 30`} 
          </code></pre>
          <p className="text-lg leading-relaxed mt-3">
            <strong>Pro:</strong> Dimensione dinamica, gestione automatica della memoria, molte funzioni utili (es. `push_back`, `pop_back`, `size`, `clear`, `empty`).
            <br/>
            <strong>Contro:</strong> Leggermente più lento degli array statici per alcune operazioni a causa della gestione dinamica, ma la differenza è spesso trascurabile per i problemi Bronze.
          </p>
        </div>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Analisi della Complessità (Operazioni Base)</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Accesso a un elemento (array e vector):</strong> O(1) - Tempo costante, dato l'indice.</li>
          <li className="mb-2"><strong>Ricerca di un elemento (array e vector, non ordinati):</strong> O(N) - Tempo lineare, nel caso peggiore devi scorrerli tutti.</li>
          <li className="mb-2"><strong>Inserimento/Rimozione alla fine (vector con `push_back`/`pop_back`):</strong> O(1) ammortizzato. A volte il vector deve ridimensionarsi (costoso), ma in media è veloce.</li>
          <li className="mb-2"><strong>Inserimento/Rimozione in mezzo (vector):</strong> O(N) - Devi spostare gli elementi successivi.</li>
        </ul>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Esempi Pratici nel Competitive Programming (Bronze)</h2>
        <p className="text-lg leading-relaxed mb-4">
          Molti problemi a livello Bronze possono essere risolti semplicemente leggendo l'input in un array o vector e poi processando i dati. Ecco alcuni scenari comuni:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2">Memorizzare una sequenza di numeri per calcolarne la somma, la media, il massimo o il minimo.</li>
          <li className="mb-2">Contare la frequenza di occorrenza di certi valori.</li>
          <li className="mb-2">Simulare processi semplici dove lo stato è rappresentato da una collezione di elementi.</li>
          <li className="mb-2">Problemi di "complete search" o "brute force" dove devi generare e testare tutte le combinazioni o permutazioni di un piccolo insieme di dati, spesso memorizzati in un vector.</li>
        </ul>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Esercizi Correlati</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2">USACO Training: "Your First Submission" (usa array per input/output).</li>
          <li className="mb-2">USACO Bronze Problem: "Sleeping in Class" (può usare prefix sums su array/vector).</li>
          <li className="mb-2">Codeforces Problem Set: Cerca problemi con tag "implementation" o "arrays" e difficoltà bassa (es. 800-1000).</li>
          <li className="mb-2">Scrivere un programma che legge N interi e stampa il secondo numero più grande.</li>
        </ul>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti ad Altri Concetti</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><a href="./time-complexity" className="text-blue-600 dark:text-blue-400 hover:underline">Time Complexity</a>: Capire come le operazioni sulle strutture dati influenzano la complessità totale del tuo algoritmo.</li>
          <li className="mb-2"><a href="../sorting-and-sets/introduction-to-sorting" className="text-blue-600 dark:text-blue-400 hover:underline">Sorting</a>: Spesso, ordinare i dati in un array o vector è il primo passo per risolvere un problema più complesso.</li>
          <li className="mb-2">Stringhe (<code>std::string</code>): Le stringhe in C++ sono simili ai vettori di caratteri e condividono molte proprietà.</li>
        </ul>
      </section>
    </div>
  );
};

export default IntroDataStructuresPage;

