import React from 'react';

const FunctionalGraphsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Introduzione ai Grafi Funzionali (Livello Silver)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Spiegazione Iniziale del Concetto: Cos'è un Grafo Funzionale?</h2>
        <p className="text-lg leading-relaxed mb-4">
          Un **grafo funzionale** è un tipo speciale di grafo diretto in cui ogni nodo ha esattamente un **out-degree pari a 1**. Questo significa che da ogni nodo esce un solo arco diretto. Possiamo pensare a questo come a una funzione `f` che mappa ogni nodo `u` a un altro nodo `v = f(u)`.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          A causa di questa proprietà, la struttura di un grafo funzionale è abbastanza particolare: consiste in un insieme di **componenti connesse**, ognuna delle quali è formata da un **ciclo diretto** a cui sono attaccati uno o più **alberi diretti** (o "code") che puntano verso i nodi del ciclo. I nodi negli alberi alla fine raggiungono un nodo nel ciclo e poi seguono il ciclo indefinitamente.
        </p>
        <img src="/images/graphs/functional_graph_example.png" alt="Esempio di Grafo Funzionale" className="my-4 mx-auto shadow-md rounded" />
        {/* Immagine placeholder, da generare o trovare successivamente */}
        <p className="text-lg leading-relaxed">
          I grafi funzionali appaiono in problemi dove c'è una transizione deterministica da uno stato all'altro, come seguire una catena di comandi, simulare processi con un unico successore, o analizzare permutazioni.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Ragionamento Preliminare: Struttura e Proprietà</h2>
        <p className="text-lg leading-relaxed mb-4">
          La struttura "ciclo con alberi attaccati" è la caratteristica distintiva. Se iniziamo da un nodo qualsiasi e seguiamo gli archi diretti, alla fine entreremo in un ciclo e vi rimarremo. Questo perché ogni nodo ha un successore e il numero di nodi è finito.
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Componenti:</strong> Un grafo funzionale può essere decomposto in una o più componenti disgiunte. Ogni componente ha la struttura descritta sopra.</li>
          <li className="mb-2"><strong>Cicli:</strong> Ogni componente contiene esattamente un ciclo semplice diretto.</li>
          <li className="mb-2"><strong>Alberi:</strong> I nodi che non fanno parte di un ciclo formano alberi diretti le cui radici (in un certo senso inverso) sono i nodi del ciclo, e gli archi puntano verso il ciclo.</li>
          <li className="mb-2"><strong>In-degree:</strong> L'in-degree di un nodo può essere qualsiasi valore (0 o più), ma l'out-degree è sempre 1.</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Molti problemi sui grafi funzionali coinvolgono il rilevamento di questi cicli, la determinazione della distanza da un nodo a un ciclo, o l'analisi del comportamento a lungo termine seguendo le transizioni.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Soluzione Guidata: Algoritmi Comuni</h2>
        <p className="text-lg leading-relaxed mb-3">
          Dato che ogni nodo ha un solo successore, possiamo rappresentare un grafo funzionale semplicemente con un array `next_node[N]`, dove `next_node[i]` è il nodo a cui punta l'arco uscente dal nodo `i`.
        </p>

        <h3 className="text-2xl font-semibold mt-4 mb-2">3.1 Rilevamento di Cicli e Struttura</h3>
        <p className="text-lg leading-relaxed mb-3">
          Possiamo usare una variante di DFS per trovare i cicli e identificare la struttura di ogni componente. Per ogni nodo, seguiamo la catena di successori. Se incontriamo un nodo già visitato *nella catena corrente*, abbiamo trovato un ciclo. Se incontriamo un nodo già visitato ma *non nella catena corrente*, significa che abbiamo raggiunto una parte del grafo già esplorata (probabilmente un altro ciclo o un albero che punta a un ciclo già processato).
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>
#include <numeric> // Per std::iota

const int MAXN = 100005;
std::vector<int> next_node(MAXN);
std::vector<int> visited_status(MAXN, 0); // 0: non visitato, 1: in visita (stack corrente), 2: visitato completamente
std::vector<int> path; // Per tenere traccia del cammino corrente
std::vector<int> cycle_id(MAXN, -1); // ID del ciclo a cui appartiene un nodo, o -1
int current_cycle_count = 0;

void find_cycle_and_structure(int u) {
  visited_status[u] = 1; // Marca come in visita
  path.push_back(u);

  int v = next_node[u];
  if (v != -1) { // Assumendo che -1 significhi nessun successore (non dovrebbe accadere in un grafo funzionale puro)
    if (visited_status[v] == 1) { // Ciclo trovato!
      // Tutti i nodi nel path da v in poi fanno parte del ciclo
      bool in_cycle_segment = false;
      for (int node_in_path : path) {
        if (node_in_path == v) {
          in_cycle_segment = true;
        }
        if (in_cycle_segment) {
          cycle_id[node_in_path] = current_cycle_count;
          // std::cout << "Nodo " << node_in_path << " è nel ciclo " << current_cycle_count << std::endl;
        }
      }
      current_cycle_count++;
    } else if (visited_status[v] == 0) { // Non visitato, continua DFS
      find_cycle_and_structure(v);
    }
    // Se visited_status[v] == 2, il nodo v e il suo sotto-grafo sono già stati processati.
    // Se cycle_id[u] è ancora -1, significa che u è in un albero che punta a un ciclo già trovato.
    // Potremmo propagare l'ID del ciclo di v a u se necessario.
  }

  path.pop_back();
  visited_status[u] = 2; // Marca come visitato completamente
}

int main() {
  int n = 7; // Numero di nodi
  // Esempio: 0->1, 1->2, 2->0 (ciclo 0-1-2)
  //          3->1 (albero che punta al ciclo)
  //          4->5, 5->6, 6->4 (ciclo 4-5-6)
  next_node[0] = 1; 
  next_node[1] = 2; 
  next_node[2] = 0;
  next_node[3] = 1;
  next_node[4] = 5;
  next_node[5] = 6;
  next_node[6] = 4;

  for (int i = 0; i < n; ++i) {
    if (visited_status[i] == 0) {
      find_cycle_and_structure(i);
    }
  }

  std::cout << "Identificatori dei cicli per ogni nodo:" << std::endl;
  for (int i = 0; i < n; ++i) {
    std::cout << "Nodo " << i << ": Ciclo ID = " << cycle_id[i] << std::endl;
  }
  /* Output atteso (gli ID dei cicli possono variare, ma i gruppi dovrebbero essere consistenti):
  Nodo 0: Ciclo ID = 0
  Nodo 1: Ciclo ID = 0
  Nodo 2: Ciclo ID = 0
  Nodo 3: Ciclo ID = -1 (o propagato a 0 se gestito)
  Nodo 4: Ciclo ID = 1
  Nodo 5: Ciclo ID = 1
  Nodo 6: Ciclo ID = 1
  */

  // Per i nodi come il 3, che puntano a un ciclo ma non ne fanno parte,
  // si può fare un secondo passaggio per assegnare loro l'ID del ciclo del loro successore, se necessario.
  for (int i = 0; i < n; ++i) {
    if (cycle_id[i] == -1 && cycle_id[next_node[i]] != -1) {
        // Questo è un modo semplice per propagare, ma potrebbe richiedere più passaggi o un approccio diverso
        // per una corretta identificazione dell'albero a cui appartiene.
        // std::cout << "Nodo " << i << " punta al ciclo " << cycle_id[next_node[i]] << std::endl;
    }
  }

  return 0;
}`} 
        </code></pre>
        <p className="text-lg leading-relaxed mt-3">
          Un approccio alternativo e spesso più robusto per analizzare la struttura è il "Floyd's cycle-finding algorithm" (algoritmo della lepre e della tartaruga) per trovare un nodo nel ciclo, e poi un altro passaggio per identificare tutti i nodi del ciclo e gli alberi attaccati.
        </p>

        <h3 className="text-2xl font-semibold mt-6 mb-2">3.2 Query sul K-esimo Successore</h3>
        <p className="text-lg leading-relaxed mb-3">
          Un problema comune è trovare il nodo raggiunto partendo da `u` dopo aver seguito `k` archi. Questo può essere risolto efficientemente usando la tecnica del **raddoppio binario** (binary lifting).
        </p>
        <p className="text-lg leading-relaxed mb-3">
          Precalcoliamo `up[i][j]`, che è il 2<sup>j</sup>-esimo successore del nodo `i`. Cioè, `up[i][0] = next_node[i]`, e `up[i][j] = up[ up[i][j-1] ][j-1]`. Questo precalcolo richiede O(N log K_max) tempo.
        </p>
        <p className="text-lg leading-relaxed mb-3">
          Per trovare il k-esimo successore di `u`, decomponiamo `k` nella sua rappresentazione binaria. Se il bit `j` è acceso in `k`, saltiamo di 2<sup>j</sup> passi. Questo richiede O(log k) tempo per query.
        </p>
        {/* Implementazione di Binary Lifting omessa per brevità, ma il concetto è chiave */} 
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Visualizzazione dell'Esecuzione</h2>
        <p className="text-lg leading-relaxed mb-4">
          Consideriamo l'esempio `0->1, 1->2, 2->0` e `3->1`.
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">`find_cycle_and_structure(0)`: path={0}, v=1.</li>
          <li className="mb-1">  `find_cycle_and_structure(1)`: path={0,1}, v=2.</li>
          <li className="mb-1">    `find_cycle_and_structure(2)`: path={0,1,2}, v=0. `visited_status[0]` è 1 (in visita). Ciclo trovato! Nodi 0,1,2 nel ciclo. Assegna `cycle_id=0`.</li>
          <li className="mb-1">    (Ritorno da `dfs(2)`) `visited_status[2]=2`.</li>
          <li className="mb-1">  (Ritorno da `dfs(1)`) `visited_status[1]=2`.</li>
          <li className="mb-1">(Ritorno da `dfs(0)`) `visited_status[0]=2`.</li>
          <li className="mb-1">`find_cycle_and_structure(3)` (se non già visitato): path={3}, v=1. `visited_status[1]` è 2 (visitato completamente). Il nodo 3 punta a una struttura già analizzata.</li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Analisi della Complessità</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1"><strong>Rilevamento Cicli con DFS:</strong> O(N) perché ogni nodo e arco viene visitato un numero costante di volte.</li>
          <li className="mb-1"><strong>Binary Lifting (Raddoppio Binario):</strong>
            <ul className="list-disc list-inside text-lg leading-relaxed ml-6 mt-1">
              <li>Precalcolo: O(N log K_max), dove K_max è il massimo numero di passi.</li>
              <li>Query K-esimo successore: O(log K).</li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Applicazioni Comuni e Problemi USACO</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>USACO Silver: "Flight Routes Check" (CSES, variante)</strong> - Problemi che coinvolgono il seguire percorsi in un grafo funzionale.</li>
          <li className="mb-2"><strong>USACO Silver: "Haircut" (varianti con successori)</strong> - Se ogni mucca ha una "prossima mucca" in una sequenza.</li>
          <li className="mb-2"><strong>USACO Gold: "Planet Queries I & II" (CSES)</strong> - Classici problemi di K-esimo successore usando binary lifting.</li>
          <li className="mb-2">Simulazione di processi dove ogni stato ha un unico stato successivo.</li>
          <li className="mb-2">Analisi di permutazioni (una permutazione può essere vista come un grafo funzionale dove ogni nodo ha in-degree e out-degree 1, quindi solo cicli).</li>
          <li className="mb-2">Trovare il punto di incontro di due percorsi che seguono le transizioni del grafo funzionale.</li>
        </ul>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti a Concetti Prerequisiti e Successivi</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Prerequisito:</strong> <a href="./graph-traversal" className="text-blue-600 dark:text-blue-400 hover:underline">Attraversamento di Grafi (DFS e BFS)</a>.</li>
          <li className="mb-2"><strong>Prerequisito:</strong> <a href="./introduction-to-tree-algorithms" className="text-blue-600 dark:text-blue-400 hover:underline">Algoritmi su Alberi</a> (per capire le componenti arboree).</li>
          <li className="mb-2"><strong>Concetto Correlato:</strong> Rilevamento di cicli in grafi generici.</li>
          <li className="mb-2"><strong>Tecnica Avanzata:</strong> Binary Lifting (Raddoppio Binario) per query efficienti sul K-esimo successore.</li>
        </ul>
      </section>
    </div>
  );
};

export default FunctionalGraphsPage;

