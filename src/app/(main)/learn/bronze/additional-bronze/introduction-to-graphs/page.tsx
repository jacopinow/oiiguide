import React from 'react';

const IntroGraphsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Introduzione ai Grafi (Livello Bronze)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Teoria: Cosa Sono i Grafi?</h2>
        <p className="text-lg leading-relaxed mb-4">
          Un **grafo** è una struttura matematica usata per rappresentare relazioni tra oggetti. Consiste in un insieme di **nodi** (chiamati anche vertici) e un insieme di **archi** (chiamati anche lati o spigoli) che collegano coppie di nodi. I grafi sono incredibilmente versatili e possono modellare una vasta gamma di scenari del mondo reale e problemi computazionali, come reti stradali, social network, dipendenze tra task, circuiti elettronici e molto altro.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          A livello Bronze, l'introduzione ai grafi è solitamente basilare. Ci si concentra sulla comprensione di cosa sia un grafo, come rappresentarlo in codice e su algoritmi di attraversamento semplici come la Breadth-First Search (BFS) o la Depth-First Search (DFS), anche se questi ultimi sono più tipici del livello Silver. Per Bronze, è importante riconoscere quando un problema può essere modellato come un grafo.
        </p>
        <h3 className="text-2xl font-medium mb-2">Componenti di un Grafo:</h3>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Nodi (Vertici):</strong> Rappresentano gli oggetti o le entità nel nostro sistema (es. città, persone, computer).</li>
          <li className="mb-2"><strong>Archi (Lati):</strong> Rappresentano le connessioni o le relazioni tra coppie di nodi (es. strade tra città, amicizie tra persone, cavi tra computer).</li>
        </ul>
        <h3 className="text-2xl font-medium mb-2">Tipi di Grafi (Introduzione):</h3>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Grafo Non Orientato:</strong> Gli archi non hanno una direzione. Se c'è un arco tra A e B, significa che puoi andare da A a B e da B ad A. (es. amicizia su Facebook).</li>
          <li className="mb-2"><strong>Grafo Orientato (Digrafo):</strong> Gli archi hanno una direzione. Un arco da A a B non implica necessariamente un arco da B ad A. (es. seguire qualcuno su Twitter, strade a senso unico).</li>
          <li className="mb-2"><strong>Grafo Pesato:</strong> Ad ogni arco è associato un "peso" o "costo" (es. distanza di una strada, tempo per completare un task).</li>
          <li className="mb-2"><strong>Grafo Non Pesato:</strong> Gli archi non hanno pesi (o si assume che tutti abbiano peso 1).</li>
        </ul>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Rappresentazione dei Grafi in C++</h2>
        <p className="text-lg leading-relaxed mb-3">
          Ci sono due modi principali per rappresentare i grafi in codice, specialmente utili per i contest:
        </p>
        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">1. Lista di Adiacenza</h3>
          <p className="text-lg leading-relaxed mb-3">
            Per ogni nodo, si memorizza una lista di tutti i nodi ad esso adiacenti (cioè, i nodi direttamente connessi da un arco). Questa è la rappresentazione più comune e spesso la più efficiente per i grafi sparsi (grafi con relativamente pochi archi rispetto al numero di nodi).
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>

int main() {
  int num_nodes = 5;
  // adj[i] conterrà una lista dei nodi adiacenti al nodo i
  std::vector<std::vector<int>> adj(num_nodes);

  // Esempio di un grafo non orientato con 3 archi:
  // 0 -- 1
  // 0 -- 2
  // 1 -- 3
  // 2 -- 4

  // Funzione helper per aggiungere un arco non orientato
  auto add_edge = [&](int u, int v) {
    adj[u].push_back(v);
    adj[v].push_back(u); // Per grafi non orientati, aggiungi in entrambe le direzioni
  };

  add_edge(0, 1);
  add_edge(0, 2);
  add_edge(1, 3);
  add_edge(2, 4);

  // Stampare la lista di adiacenza
  for (int i = 0; i < num_nodes; ++i) {
    std::cout << "Nodi adiacenti a " << i << ": ";
    for (int neighbor : adj[i]) {
      std::cout << neighbor << " ";
    }
    std::cout << std::endl;
  }
  /* Output:
  Nodi adiacenti a 0: 1 2 
  Nodi adiacenti a 1: 0 3 
  Nodi adiacenti a 2: 0 4 
  Nodi adiacenti a 3: 1 
  Nodi adiacenti a 4: 2 
  */

  // Per grafi orientati, si omette la seconda chiamata adj[v].push_back(u)
  // Per grafi pesati, invece di std::vector<int>, si usa std::vector<std::pair<int, int>>
  // dove pair.first è il nodo vicino e pair.second è il peso dell'arco.
  // Esempio: std::vector<std::vector<std::pair<int, int>>> adj_weighted(num_nodes);
  // adj_weighted[u].push_back({v, weight});
  return 0;
}`} 
          </code></pre>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">2. Matrice di Adiacenza</h3>
          <p className="text-lg leading-relaxed mb-3">
            Si usa una matrice (array 2D) `adj_matrix[N][N]`, dove `N` è il numero di nodi. `adj_matrix[i][j]` è 1 (o true) se c'è un arco dal nodo `i` al nodo `j`, e 0 (o false) altrimenti. Per grafi pesati, `adj_matrix[i][j]` può contenere il peso dell'arco (o un valore speciale come infinito se non c'è arco).
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>

int main() {
  int num_nodes = 5;
  // Inizializza la matrice con 0 (nessun arco)
  std::vector<std::vector<int>> adj_matrix(num_nodes, std::vector<int>(num_nodes, 0));

  // Esempio di un grafo non orientato con 3 archi:
  // 0 -- 1
  // 0 -- 2
  // 1 -- 3
  // 2 -- 4

  // Funzione helper per aggiungere un arco non orientato
  auto add_edge_matrix = [&](int u, int v) {
    adj_matrix[u][v] = 1;
    adj_matrix[v][u] = 1; // Per grafi non orientati
  };

  add_edge_matrix(0, 1);
  add_edge_matrix(0, 2);
  add_edge_matrix(1, 3);
  add_edge_matrix(2, 4);

  // Stampare la matrice di adiacenza
  for (int i = 0; i < num_nodes; ++i) {
    for (int j = 0; j < num_nodes; ++j) {
      std::cout << adj_matrix[i][j] << " ";
    }
    std::cout << std::endl;
  }
  /* Output:
  0 1 1 0 0 
  1 0 0 1 0 
  1 0 0 0 1 
  0 1 0 0 0 
  0 0 1 0 0 
  */
  return 0;
}`} 
          </code></pre>
          <p className="text-lg leading-relaxed mt-3">
            <strong>Pro della Matrice di Adiacenza:</strong> Verifica dell'esistenza di un arco tra due nodi (i, j) in O(1).
            <br/>
            <strong>Contro della Matrice di Adiacenza:</strong> Richiede O(N^2) spazio, che può essere troppo se N è grande (es. N > 2000-5000). Iterare su tutti i vicini di un nodo richiede O(N) tempo.
            <br/>
            Per la maggior parte dei problemi di contest, specialmente con N grandi, la **lista di adiacenza è preferita**.
          </p>
        </div>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Concetti Base sui Grafi per Bronze</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Connettività:</strong> Un grafo è connesso se esiste un percorso tra ogni coppia di nodi. Per i grafi orientati, si parla di componenti fortemente connesse.</li>
          <li className="mb-2"><strong>Componenti Connesse:</strong> In un grafo non orientato, una componente connessa è un sottografo in cui tutti i nodi sono raggiungibili tra loro, e non sono raggiungibili da nodi al di fuori della componente. Trovare il numero di componenti connesse è un problema comune.</li>
          <li className="mb-2"><strong>Cicli:</strong> Un ciclo è un percorso in un grafo che inizia e finisce nello stesso nodo. Rilevare cicli può essere importante.</li>
          <li className="mb-2"><strong>Grado di un Nodo:</strong> In un grafo non orientato, il grado di un nodo è il numero di archi connessi ad esso. In un grafo orientato, si distingue tra grado entrante (in-degree) e grado uscente (out-degree).</li>
        </ul>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Esempi Pratici e Problemi USACO (Bronze)</h2>
        <p className="text-lg leading-relaxed mb-4">
          Molti problemi Bronze possono essere modellati come grafi, anche se non richiedono algoritmi di grafo complessi. L'abilità sta nel riconoscere la struttura del grafo.
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>USACO Bronze: "The Great Revegetation"</strong> - Le preferenze delle mucche possono essere viste come archi in un grafo, e si cerca di assegnare tipi di erba (colori) ai nodi (pascoli) in modo che i vicini abbiano tipi diversi se la preferenza è "diversa".</li>
          <li className="mb-2"><strong>USACO Bronze: "Livestock Lineup"</strong> - Le condizioni di vicinanza tra mucche possono essere modellate come un grafo dove si cerca un ordinamento topologico o una permutazione che soddisfi i vincoli.</li>
          <li className="mb-2"><strong>Problemi di raggiungibilità semplice:</strong> "Si può andare dal punto A al punto B?" Questo è un problema fondamentale sui grafi, spesso risolvibile con DFS o BFS (più tipici di Silver, ma il concetto può apparire).</li>
          <li className="mb-2"><strong>Contare le componenti connesse:</strong> Dato un insieme di relazioni (es. amicizie), quanti gruppi separati ci sono?</li>
        </ul>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti ad Altri Concetti</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><a href="../getting-started-bronze/introduction-to-data-structures" className="text-blue-600 dark:text-blue-400 hover:underline">Strutture Dati</a>: Le liste di adiacenza usano `std::vector`.</li>
          <li className="mb-2"><a href="../time-complexity" className="text-blue-600 dark:text-blue-400 hover:underline">Time Complexity</a>: Importante per scegliere la rappresentazione giusta (lista vs. matrice).</li>
          <li className="mb-2">Graph Traversal (DFS, BFS) (Argomenti Silver): Algoritmi fondamentali per esplorare i grafi, risolvere problemi di raggiungibilità, trovare componenti connesse, cicli, ecc.</li>
          <li className="mb-2">Trees (Alberi) (Argomenti Silver): Un tipo speciale di grafo (connesso e aciclico).</li>
        </ul>
      </section>
    </div>
  );
};

export default IntroGraphsPage;

