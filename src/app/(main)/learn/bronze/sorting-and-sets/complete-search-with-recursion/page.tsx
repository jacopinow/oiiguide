import React from 'react';

const CompleteSearchRecursionPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Ricerca Completa con Ricorsione (Livello Bronze)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Teoria: Cos'è la Ricerca Completa?</h2>
        <p className="text-lg leading-relaxed mb-4">
          La **Ricerca Completa** (spesso chiamata anche "brute force" o forza bruta) è una tecnica di risoluzione dei problemi che consiste nell'esplorare sistematicamente tutte le possibili soluzioni o configurazioni per trovare quella che soddisfa i criteri del problema. È "completa" perché garantisce di esaminare ogni possibilità, quindi se una soluzione esiste, la troverà. A livello Bronze, molti problemi possono essere risolti con questo approccio, specialmente quando lo spazio delle soluzioni non è eccessivamente grande.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          La **ricorsione** è uno strumento potente e naturale per implementare algoritmi di ricerca completa. Una funzione ricorsiva è una funzione che chiama se stessa. In un contesto di ricerca completa, possiamo definire una funzione ricorsiva che costruisce una soluzione passo dopo passo. Ad ogni chiamata, la funzione prova ad estendere la soluzione parziale corrente aggiungendo un elemento o facendo una scelta. Quando una soluzione completa è costruita, viene valutata. Se non è possibile estendere ulteriormente la soluzione parziale o se si raggiunge uno stato non valido, la funzione "torna indietro" (backtrack) e prova un'altra scelta.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Implementazione con la Ricorsione: Struttura Tipica</h2>
        <p className="text-lg leading-relaxed mb-3">
          Una tipica funzione ricorsiva per la ricerca completa ha la seguente struttura:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`void generate_solutions(stato_corrente, parametri_aggiuntivi) {
  // 1. Caso Base: Se lo stato_corrente rappresenta una soluzione completa o non ulteriormente estendibile
  if (is_complete_solution(stato_corrente)) {
    process_solution(stato_corrente); // Valuta o memorizza la soluzione
    return; // Termina questa chiamata ricorsiva
  }

  // 2. Iterazione sulle possibili scelte/mosse successive
  for (ogni_possibile_scelta) {
    if (is_valid_choice(scelta, stato_corrente)) { // Controlla se la scelta è valida
      // Applica la scelta per ottenere un nuovo stato
      nuovo_stato = apply_choice(scelta, stato_corrente);
      
      // Chiamata ricorsiva per esplorare ulteriormente
      generate_solutions(nuovo_stato, parametri_aggiuntivi);
      
      // (Opzionale, ma cruciale per il backtracking) Annulla la scelta per provare altre opzioni
      // Questo è spesso implicito se si passano copie dello stato o se si modifica
      // lo stato e poi lo si ripristina dopo la chiamata ricorsiva.
      // undo_choice(scelta, stato_corrente); 
    }
  }
}`} 
        </code></pre>
        <p className="text-lg leading-relaxed mt-3">
          <strong>Stato Corrente:</strong> Rappresenta la soluzione parziale costruita finora (es. un sottoinsieme di elementi, una permutazione parziale, una posizione su una scacchiera).
          <br/>
          <strong>Caso Base:</strong> La condizione che termina la ricorsione per un particolare percorso. Solitamente si verifica quando una soluzione completa è stata formata o quando non ci sono più scelte valide da fare.
          <br/>
          <strong>Scelte:</strong> Le opzioni disponibili per estendere lo stato corrente (es. includere o non includere un elemento, scegliere il prossimo elemento in una permutazione).
          <br/>
          <strong>Backtracking:</strong> L'idea di "tornare indietro" dopo aver esplorato un percorso. Se una scelta porta a un vicolo cieco o dopo aver processato una soluzione completa, l'algoritmo deve annullare quella scelta per poter esplorare altre alternative. Questo è spesso gestito passando copie dello stato o ripristinando lo stato dopo la chiamata ricorsiva.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Esempio Pratico: Generare Tutti i Sottoinsiemi</h2>
        <p className="text-lg leading-relaxed mb-3">
          Un problema classico risolvibile con ricerca completa ricorsiva è la generazione di tutti i possibili sottoinsiemi di un dato insieme di elementi. Per ogni elemento, abbiamo due scelte: includerlo nel sottoinsieme corrente o non includerlo.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>
#include <numeric> // Per std::accumulate (opzionale)

std::vector<int> data = {1, 2, 3}; // L'insieme di cui generare i sottoinsiemi
std::vector<int> current_subset;

void generate_subsets(int k) { // k è l'indice dell'elemento che stiamo considerando
  // Caso Base: abbiamo considerato tutti gli elementi
  if (k == data.size()) {
    // Processa il sottoinsieme corrente
    std::cout << "{ ";
    for (int x : current_subset) {
      std::cout << x << " ";
    }
    std::cout << "}" << std::endl;
    // Esempio: calcolare la somma del sottoinsieme
    // int sum = std::accumulate(current_subset.begin(), current_subset.end(), 0);
    // std::cout << " Sum: " << sum << std::endl;
    return;
  }

  // Scelta 1: Includere l'elemento data[k] nel sottoinsieme
  current_subset.push_back(data[k]);
  generate_subsets(k + 1); // Prosegui con il prossimo elemento
  current_subset.pop_back(); // Backtrack: rimuovi data[k] per provare l'altra scelta

  // Scelta 2: Non includere l'elemento data[k] nel sottoinsieme
  generate_subsets(k + 1); // Prosegui con il prossimo elemento (senza data[k])
}

int main() {
  std::cout << "Tutti i sottoinsiemi di {1, 2, 3}:" << std::endl;
  generate_subsets(0); // Inizia la ricorsione dal primo elemento (indice 0)
  return 0;
}
/* Output:
{ 1 2 3 }
{ 1 2 }
{ 1 3 }
{ 1 }
{ 2 3 }
{ 2 }
{ 3 }
{ }
*/`} 
        </code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Analisi della Complessità</h2>
        <p className="text-lg leading-relaxed mb-4">
          La complessità della ricerca completa dipende dal numero di stati possibili (nodi nell'albero di ricorsione) e dal costo del lavoro svolto in ogni stato.
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Generazione di sottoinsiemi:</strong> Per un insieme di N elementi, ci sono 2^N possibili sottoinsiemi. Se processare ogni sottoinsieme costa O(N) (es. stamparlo), la complessità totale è circa O(N * 2^N).</li>
          <li className="mb-2"><strong>Generazione di permutazioni:</strong> Per N elementi, ci sono N! (N fattoriale) permutazioni. Se processare ogni permutazione costa O(N), la complessità è circa O(N * N!).</li>
        </ul>
        <p className="text-lg leading-relaxed">
          È fondamentale stimare questa complessità. Se N è piccolo (es. N <= 20 per 2^N, N <= 10 per N!), la ricerca completa è spesso fattibile. Altrimenti, è necessario un approccio più efficiente.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Esempi Pratici e Problemi USACO</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>USACO Bronze: "Team Tic Tac Toe"</strong> - Si possono generare tutte le possibili combinazioni vincenti e verificare se esistono nel tabellone.</li>
          <li className="mb-2"><strong>USACO Bronze: "Milk Pails" (variante semplice)</strong> - Si può esplorare ricorsivamente la quantità di latte che si può ottenere combinando i secchi.</li>
          <li className="mb-2"><strong>USACO Bronze: "Cow Gymnastics"</strong> - Si possono generare tutte le coppie di mucche e verificare se la loro classifica è consistente in tutte le sessioni.</li>
          <li className="mb-2">Problemi che chiedono di trovare il numero di modi per fare qualcosa, o il massimo/minimo valore ottenibile da una serie di scelte, spesso si prestano alla ricerca completa quando i vincoli sono piccoli.</li>
        </ul>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti ad Altri Concetti</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><a href="./time-complexity" className="text-blue-600 dark:text-blue-400 hover:underline">Time Complexity</a>: Essenziale per capire se un approccio di ricerca completa è fattibile.</li>
          <li className="mb-2"><a href="./simulation" className="text-blue-600 dark:text-blue-400 hover:underline">Simulazione</a>: A volte la ricerca completa è una forma di simulazione di tutte le possibilità.</li>
          <li className="mb-2">Backtracking: Una tecnica chiave usata implicitamente o esplicitamente nella ricerca completa ricorsiva per esplorare lo spazio delle soluzioni.</li>
          <li className="mb-2">Dynamic Programming (Programmazione Dinamica): Per problemi più complessi dove la ricerca completa pura è troppo lenta, la DP può ottimizzare identificando e riutilizzando soluzioni a sottoproblemi sovrapposti (tipicamente argomenti Silver/Gold).</li>
        </ul>
      </section>
    </div>
  );
};

export default CompleteSearchRecursionPage;

