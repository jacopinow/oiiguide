import React from 'react';

const AdHocProblemsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Problemi Ad Hoc (Livello Bronze)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Teoria: Cosa Sono i Problemi Ad Hoc?</h2>
        <p className="text-lg leading-relaxed mb-4">
          Nel mondo della programmazione competitiva, i problemi "ad hoc" sono quelli che non rientrano nettamente in una categoria algoritmica standard (come grafi, programmazione dinamica, ecc.) e non richiedono la conoscenza di algoritmi o strutture dati particolarmente avanzati. Invece, la loro soluzione di solito si basa su un'attenta osservazione delle regole del problema, sulla logica, su una meticolosa implementazione delle specifiche e, a volte, su un piccolo "trucco" o un'idea intelligente specifica per quel problema.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          La dicitura "ad hoc" significa "per questo scopo specifico". Questi problemi sono progettati per testare la tua capacità di analizzare una situazione unica, di scomporla in parti gestibili e di tradurre la logica in codice funzionante. Sono molto comuni a livello Bronze, dove l'enfasi è spesso sulla corretta implementazione e sulla gestione dei casi limite piuttosto che su algoritmi complessi.
        </p>
        <p className="text-lg leading-relaxed">
          Non esiste una formula magica per risolvere i problemi ad hoc. La chiave è:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Leggere attentamente:</strong> Ogni parola nel testo del problema può essere importante. Assicurati di aver compreso tutti i vincoli, le condizioni e l'obiettivo.</li>
          <li className="mb-2"><strong>Lavorare su esempi:</strong> Prova a risolvere manualmente gli esempi forniti e crea i tuoi esempi, specialmente per i casi limite. Questo aiuta a capire meglio la logica del problema.</li>
          <li className="mb-2"><strong>Scomporre il problema:</strong> Se il problema sembra complesso, cerca di dividerlo in sottoproblemi più piccoli e più facili da gestire.</li>
          <li className="mb-2"><strong>Essere meticolosi:</strong> Presta attenzione ai dettagli dell'implementazione. Errori di un carattere (off-by-one) o una gestione errata dei casi limite sono comuni nei problemi ad hoc.</li>
          <li className="mb-2"><strong>Pensare in modo semplice:</strong> Spesso la soluzione è più diretta di quanto sembri. Non cercare per forza algoritmi complicati se una simulazione o un'implementazione diretta delle regole può funzionare entro i limiti di tempo.</li>
        </ul>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Esempio Pratico: USACO Bronze "Daisy Chains"</h2>
        <p className="text-lg leading-relaxed mb-3">
          <strong>Problema (semplificato):</strong> Hai N fiori, ognuno con un certo numero di petali p_i. Una "catena di margherite fotografica" è un sottoinsieme contiguo di fiori [i, j] tale che la media dei petali dei fiori in questo sottoinsieme è uguale al numero di petali di almeno un fiore in quello stesso sottoinsieme. Conta quante di queste catene esistono.
        </p>
        <p className="text-lg leading-relaxed mb-3">
          <strong>Approccio Ad Hoc:</strong>
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-3">
          <li className="mb-2">Itera su tutti i possibili sottoinsiemi contigui. Un sottoinsieme contiguo è definito da un indice di inizio `i` e un indice di fine `j` (con `i <= j`).</li>
          <li className="mb-2">Per ogni sottoinsieme [i, j]:
            <ul className="list-disc list-inside text-lg leading-relaxed ml-6 mt-1">
              <li className="mb-1">Calcola la somma dei petali dei fiori in questo intervallo.</li>
              <li className="mb-1">Calcola il numero di fiori nell'intervallo (che è `j - i + 1`).</li>
              <li className="mb-1">Calcola la media dei petali. Attenzione: la somma deve essere divisibile per il numero di fiori affinché la media sia un intero (i petali sono interi).</li>
              <li className="mb-1">Se la media è intera, itera nuovamente sui fiori nell'intervallo [i, j] e verifica se almeno uno di essi ha un numero di petali uguale alla media calcolata.</li>
              <li className="mb-1">Se la condizione è soddisfatta, incrementa il contatore delle catene fotografiche.</li>
            </ul>
          </li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>
#include <numeric> // Per std::accumulate

int main() {
  int n;
  std::cin >> n;
  std::vector<int> petals(n);
  for (int i = 0; i < n; ++i) {
    std::cin >> petals[i];
  }

  int photo_chains_count = 0;

  // Itera su tutti i possibili indici di inizio i
  for (int i = 0; i < n; ++i) {
    // Itera su tutti i possibili indici di fine j, con j >= i
    for (int j = i; j < n; ++j) {
      // Ora consideriamo il sottoinsieme contiguo da petals[i] a petals[j]
      int current_sum = 0;
      int num_flowers = 0;
      std::vector<int> current_sub_array;

      for (int k = i; k <= j; ++k) {
        current_sum += petals[k];
        num_flowers++;
        current_sub_array.push_back(petals[k]);
      }

      // Verifica se la media è intera
      if (current_sum % num_flowers == 0) {
        int average_petals = current_sum / num_flowers;
        bool found_average_flower = false;
        for (int p_val : current_sub_array) {
          if (p_val == average_petals) {
            found_average_flower = true;
            break;
          }
        }
        if (found_average_flower) {
          photo_chains_count++;
        }
      }
    }
  }

  std::cout << photo_chains_count << std::endl;

  return 0;
}`} 
        </code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Analisi della Complessità</h2>
        <p className="text-lg leading-relaxed mb-4">
          Nell'esempio "Daisy Chains":
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2">Il ciclo esterno per `i` va N volte.</li>
          <li className="mb-2">Il ciclo interno per `j` va al massimo N volte.</li>
          <li className="mb-2">Il ciclo per calcolare la somma e creare `current_sub_array` (indice `k`) va al massimo N volte.</li>
          <li className="mb-2">Il ciclo per verificare la presenza della media nel `current_sub_array` va al massimo N volte.</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Quindi, la complessità totale è circa O(N * N * N) = O(N^3) o O(N^4) se la creazione del sottoarray è fatta in modo meno efficiente o se si usa `std::accumulate` dentro il ciclo k. Per i vincoli tipici di Bronze (es. N <= 100), N^3 (100^3 = 1,000,000) è generalmente accettabile. N^4 (100^4 = 100,000,000) potrebbe essere troppo lento. È importante ottimizzare i cicli interni se possibile. Nell'esempio sopra, il calcolo della somma e la verifica della media possono essere fatti in un unico passaggio per l'intervallo [i,j], portando a O(N^3).
        </p>
        <p className="text-lg leading-relaxed mt-2">
          Per i problemi ad hoc, è cruciale identificare la complessità della tua soluzione diretta e verificare se rientra nei limiti di tempo. Se N è molto piccolo (es. N <= 20), anche soluzioni esponenziali potrebbero passare.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Strategie Comuni per Problemi Ad Hoc</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Simulazione Diretta:</strong> Molti problemi ad hoc sono semplicemente simulazioni. Segui le regole passo dopo passo. (Vedi la lezione sulla <a href="../getting-started-bronze/simulation" className="text-blue-600 dark:text-blue-400 hover:underline">Simulazione</a>).</li>
          <li className="mb-2"><strong>Gestione dei Casi:</strong> A volte il problema si divide naturalmente in alcuni casi distinti. Analizza ogni caso separatamente.</li>
          <li className="mb-2"><strong>Lavorare all'indietro:</strong> In rari casi, pensare al problema partendo dalla fine e andando verso l'inizio può semplificare la logica.</li>
          <li className="mb-2"><strong>Invarianti e Proprietà:</strong> Cerca proprietà che rimangono vere durante il processo descritto dal problema.</li>
          <li className="mb-2"><strong>Geometria Semplice:</strong> Problemi che coinvolgono punti, linee o rettangoli su un piano 2D, spesso con coordinate intere. (Vedi la lezione su <a href="./rectangle-geometry" className="text-blue-600 dark:text-blue-400 hover:underline">Rectangle Geometry</a>).</li>
          <li className="mb-2"><strong>Manipolazione di Stringhe:</strong> Problemi che richiedono di processare o trasformare stringhe secondo regole specifiche.</li>
        </ul>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Esercizi Correlati (Tipici Ad Hoc per Bronze)</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2">USACO Bronze: "Mixing Milk" (simulazione con tre secchi).</li>
          <li className="mb-2">USACO Bronze: "The Bovine Shuffle" (seguire le posizioni delle mucche dopo N shuffle).</li>
          <li className="mb-2">USACO Bronze: "Blocked Billboard" (calcolare l'area visibile di cartelloni).</li>
          <li className="mb-2">USACO Bronze: "Shell Game" (simulare il gioco delle tre tazze).</li>
          <li className="mb-2">Molti problemi della prima divisione dei contest Codeforces (Div2 A, Div3 A/B) sono spesso di natura ad hoc.</li>
        </ul>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti ad Altri Concetti</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><a href="../getting-started-bronze/simulation" className="text-blue-600 dark:text-blue-400 hover:underline">Simulazione</a>: Molti problemi ad hoc sono risolti tramite simulazione.</li>
          <li className="mb-2"><a href="../sorting-and-sets/complete-search-with-recursion" className="text-blue-600 dark:text-blue-400 hover:underline">Ricerca Completa</a>: Se lo spazio delle soluzioni è piccolo, una ricerca completa può essere un approccio ad hoc.</li>
          <li className="mb-2"><a href="../getting-started-bronze/time-complexity" className="text-blue-600 dark:text-blue-400 hover:underline">Time Complexity</a>: Sempre fondamentale per assicurarsi che la soluzione ad hoc sia abbastanza veloce.</li>
          <li className="mb-2">Debugging: Essenziale per i problemi ad hoc, data la loro natura spesso intricata e piena di casi specifici.</li>
        </ul>
      </section>
    </div>
  );
};

export default AdHocProblemsPage;

