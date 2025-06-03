import React from 'react';

const IntroTreeAlgorithmsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Introduzione agli Algoritmi su Alberi (Livello Silver)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Spiegazione Iniziale del Concetto: Cos'è un Albero?</h2>
        <p className="text-lg leading-relaxed mb-4">
          In teoria dei grafi, un **albero** è un tipo speciale di grafo non diretto che è **connesso** e **aciclico** (non contiene cicli). Questa definizione implica diverse proprietà importanti:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2">Esiste un unico cammino semplice tra ogni coppia di nodi in un albero.</li>
          <li className="mb-2">Un albero con N nodi ha esattamente N-1 archi.</li>
          <li className="mb-2">Rimuovere un qualsiasi arco da un albero lo disconnette (lo divide in due alberi più piccoli).</li>
          <li className="mb-2">Aggiungere un qualsiasi arco tra due nodi non adiacenti in un albero crea un ciclo.</li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">
          Gli alberi sono strutture dati fondamentali in informatica e appaiono in molti contesti, come alberi genealogici, gerarchie di file system, alberi di decisione, e come base per strutture dati più complesse (es. heap, alberi binari di ricerca).
        </p>
        <p className="text-lg leading-relaxed">
          Spesso, nei problemi di programmazione competitiva, un nodo dell'albero viene designato come **radice** (root). Un albero con una radice designata è chiamato **albero radicato** (rooted tree). In un albero radicato, possiamo definire relazioni come genitore (parent), figlio (child), antenato (ancestor), discendente (descendant), profondità (depth) di un nodo, e altezza (height) dell'albero.
        </p>
        <img src="/images/graphs/tree_example.png" alt="Esempio di Albero Radicato" className="my-4 mx-auto shadow-md rounded" />
        {/* Immagine placeholder, da generare o trovare successivamente */}
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Ragionamento Preliminare: Proprietà e Terminologia</h2>
        <p className="text-lg leading-relaxed mb-4">
          Comprendere la terminologia degli alberi radicati è cruciale:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Radice (Root):</strong> Il nodo designato come cima della gerarchia (non ha genitore).</li>
          <li className="mb-2"><strong>Genitore (Parent):</strong> Il nodo direttamente sopra un dato nodo nel cammino verso la radice. Ogni nodo tranne la radice ha un unico genitore.</li>
          <li className="mb-2"><strong>Figlio (Child):</strong> Un nodo direttamente sotto un dato nodo.</li>
          <li className="mb-2"><strong>Fratelli (Siblings):</strong> Nodi che hanno lo stesso genitore.</li>
          <li className="mb-2"><strong>Foglia (Leaf):</strong> Un nodo senza figli.</li>
          <li className="mb-2"><strong>Nodo Interno (Internal Node):</strong> Un nodo che non è una foglia (ha almeno un figlio).</li>
          <li className="mb-2"><strong>Profondità (Depth) di un nodo:</strong> La lunghezza del cammino dalla radice al nodo. La profondità della radice è 0.</li>
          <li className="mb-2"><strong>Altezza (Height) di un nodo:</strong> La lunghezza del cammino più lungo dal nodo a una foglia nel suo sottoalbero. L'altezza di una foglia è 0.</li>
          <li className="mb-2"><strong>Altezza (Height) dell'albero:</strong> L'altezza della radice (o la profondità massima di una foglia).</li>
          <li className="mb-2"><strong>Sottoalbero (Subtree):</strong> Un nodo e tutti i suoi discendenti formano un sottoalbero radicato in quel nodo.</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Gli algoritmi su alberi spesso sfruttano queste proprietà strutturali, tipicamente usando DFS o BFS modificati.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Soluzione Guidata: Algoritmi Comuni su Alberi</h2>
        <p className="text-lg leading-relaxed mb-3">
          Molti algoritmi su alberi sono adattamenti di DFS. Quando si esegue un DFS su un albero a partire dalla radice, possiamo calcolare varie proprietà.
        </p>

        <h3 className="text-2xl font-semibold mt-4 mb-2">3.1 Calcolo di Profondità e Genitori</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>

std::vector<std::vector<int>> adj_list;
std::vector<int> depth;    // depth[i] = profondità del nodo i
std::vector<int> parent;   // parent[i] = genitore del nodo i
std::vector<bool> visited; // Per DFS standard

// DFS per calcolare profondità e genitore
// u: nodo corrente, p: genitore di u, d: profondità di u
void dfs_tree_properties(int u, int p, int d) {
  visited[u] = true;
  parent[u] = p;
  depth[u] = d;

  std::cout << "Visitato nodo " << u << " (Genitore: " << p << ", Profondità: " << d << ")" << std::endl;

  for (int v : adj_list[u]) {
    if (v == p) continue; // Non tornare indietro al genitore (perché il grafo è non diretto)
    if (!visited[v]) { // Anche se in un albero non ci saranno cicli, è buona pratica
      dfs_tree_properties(v, u, d + 1);
    }
  }
}

int main() {
  int n = 7; // Numero di nodi (0-indexed)
  adj_list.resize(n);
  depth.resize(n);
  parent.resize(n);
  visited.resize(n, false);

  // Esempio di albero:
  //      0
  //     /|\
  //    1 2 3
  //   /   | \
  //  4    5  6
  adj_list[0].push_back(1); adj_list[1].push_back(0);
  adj_list[0].push_back(2); adj_list[2].push_back(0);
  adj_list[0].push_back(3); adj_list[3].push_back(0);
  adj_list[1].push_back(4); adj_list[4].push_back(1);
  adj_list[2].push_back(5); adj_list[5].push_back(2);
  adj_list[3].push_back(6); adj_list[6].push_back(3);

  int root = 0;
  std::cout << "DFS per proprietà dell'albero (radice " << root << ")" << std::endl;
  dfs_tree_properties(root, -1, 0); // Radice ha genitore -1 (o root stessa) e profondità 0

  std::cout << "\nProprietà calcolate:" << std::endl;
  for (int i = 0; i < n; ++i) {
    std::cout << "Nodo " << i << ": Genitore=" << parent[i] << ", Profondità=" << depth[i] << std::endl;
  }
  /* Output atteso (l'ordine di visita dei figli può variare):
  DFS per proprietà dell'albero (radice 0)
  Visitato nodo 0 (Genitore: -1, Profondità: 0)
  Visitato nodo 1 (Genitore: 0, Profondità: 1)
  Visitato nodo 4 (Genitore: 1, Profondità: 2)
  Visitato nodo 2 (Genitore: 0, Profondità: 1)
  Visitato nodo 5 (Genitore: 2, Profondità: 2)
  Visitato nodo 3 (Genitore: 0, Profondità: 1)
  Visitato nodo 6 (Genitore: 3, Profondità: 2)

  Proprietà calcolate:
  Nodo 0: Genitore=-1, Profondità=0
  Nodo 1: Genitore=0, Profondità=1
  Nodo 2: Genitore=0, Profondità=1
  Nodo 3: Genitore=0, Profondità=1
  Nodo 4: Genitore=1, Profondità=2
  Nodo 5: Genitore=2, Profondità=2
  Nodo 6: Genitore=3, Profondità=2
  */
  return 0;
}`} 
        </code></pre>

        <h3 className="text-2xl font-semibold mt-6 mb-2">3.2 Calcolo delle Dimensioni dei Sottoalberi</h3>
        <p className="text-lg leading-relaxed mb-3">
          La dimensione del sottoalbero radicato in `u` è il numero di nodi in quel sottoalbero (incluso `u` stesso).
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// ... (adj_list, visited come sopra)
std::vector<int> subtree_size;

// DFS per calcolare la dimensione dei sottoalberi
// Restituisce la dimensione del sottoalbero radicato in u
int dfs_subtree_size(int u, int p) {
  visited[u] = true;
  subtree_size[u] = 1; // Il nodo u stesso conta 1

  for (int v : adj_list[u]) {
    if (v == p) continue;
    if (!visited[v]) { // In un albero, questa condizione è ridondante se si salta il genitore
      subtree_size[u] += dfs_subtree_size(v, u);
    }
  }
  return subtree_size[u];
}

// Nel main:
// subtree_size.resize(n);
// visited.assign(n, false); // Resetta visited se usato prima
// dfs_subtree_size(root, -1);
// Stampa subtree_size[i] per ogni nodo i
/* Output atteso per l'albero precedente:
Nodo 0: Dimensione Sottoalbero=7
Nodo 1: Dimensione Sottoalbero=2
Nodo 2: Dimensione Sottoalbero=2
Nodo 3: Dimensione Sottoalbero=2
Nodo 4: Dimensione Sottoalbero=1
Nodo 5: Dimensione Sottoalbero=1
Nodo 6: Dimensione Sottoalbero=1
*/`} 
        </code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Visualizzazione dell'Esecuzione</h2>
        <p className="text-lg leading-relaxed mb-4">
          Consideriamo `dfs_tree_properties(0, -1, 0)` sull'albero dell'esempio:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">`dfs(0, -1, 0)`: `parent[0]=-1`, `depth[0]=0`. Visita i figli (es. 1, 2, 3).</li>
          <li className="mb-1">  `dfs(1, 0, 1)`: `parent[1]=0`, `depth[1]=1`. Visita i figli (es. 4).</li>
          <li className="mb-1">    `dfs(4, 1, 2)`: `parent[4]=1`, `depth[4]=2`. Non ha figli (tranne il genitore). Ritorna.</li>
          <li className="mb-1">  (Ritorno a `dfs(1,...)`) Nessun altro figlio. Ritorna.</li>
          <li className="mb-1">  `dfs(2, 0, 1)`: `parent[2]=0`, `depth[2]=1`. Visita i figli (es. 5).</li>
          <li className="mb-1">    `dfs(5, 2, 2)`: `parent[5]=2`, `depth[5]=2`. Ritorna.</li>
          <li className="mb-1">  (Ritorno a `dfs(2,...)`) Ritorna.</li>
          <li className="mb-1">  `dfs(3, 0, 1)`: ... e così via.</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Per `dfs_subtree_size`, il calcolo avviene post-ordine: la dimensione di un nodo è 1 più la somma delle dimensioni dei sottoalberi dei suoi figli.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Analisi della Complessità</h2>
        <p className="text-lg leading-relaxed mb-4">
          Gli algoritmi basati su DFS (o BFS) su alberi visitano ogni nodo e ogni arco una volta (o un numero costante di volte).
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1"><strong>Complessità Temporale:</strong> O(N + M), dove N è il numero di nodi e M il numero di archi. Poiché in un albero M = N-1, la complessità è O(N).</li>
          <li className="mb-1"><strong>Complessità Spaziale:</strong> O(N) per memorizzare l'albero (lista di adiacenza), i vettori `visited`, `depth`, `parent`, `subtree_size`, e per lo stack di ricorsione nel caso peggiore (albero degenere a forma di lista).</li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Applicazioni Comuni e Problemi USACO</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>USACO Silver: "Subtree Queries" (varianti)</strong> - Problemi che richiedono di calcolare somme, massimi, o altre proprietà sui sottoalberi.</li>
          <li className="mb-2"><strong>USACO Silver: "Mooyo Mooyo"</strong> - Un problema di Flood Fill su griglia che può essere visto come trovare componenti connesse, simile a un attraversamento di albero/grafo.</li>
          <li className="mb-2"><strong>USACO Silver: "Milk Visits"</strong> - Verificare se esiste un cammino tra due nodi in un albero che contiene un certo tipo di latte. Richiede DFS e tracciamento delle proprietà lungo il cammino.</li>
          <li className="mb-2"><strong>Trovare il diametro di un albero:</strong> Il cammino più lungo tra due nodi qualsiasi in un albero. Si può fare con due DFS/BFS.</li>
          <li className="mb-2"><strong>Lowest Common Ancestor (LCA):</strong> Trovare l'antenato comune più profondo di due nodi (argomento più avanzato, spesso Gold).</li>
          <li className="mb-2"><strong>Programmazione Dinamica su Alberi (DP on Trees):</strong> Molti problemi di DP possono essere risolti su alberi (argomento Gold/Platinum).</li>
        </ul>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti a Concetti Prerequisiti e Successivi</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Prerequisito:</strong> <a href="./graph-traversal" className="text-blue-600 dark:text-blue-400 hover:underline">Attraversamento di Grafi (DFS e BFS)</a> (gli algoritmi su alberi sono specializzazioni di questi).</li>
          <li className="mb-2"><strong>Prerequisito:</strong> <a href="../../bronze/additional-bronze/introduction-to-graphs" className="text-blue-600 dark:text-blue-400 hover:underline">Introduzione ai Grafi (Bronze)</a>.</li>
          <li className="mb-2"><strong>Concetto Correlato:</strong> <a href="./introduction-to-functional-graphs" className="text-blue-600 dark:text-blue-400 hover:underline">Grafi Funzionali</a> (un tipo speciale di grafo diretto dove ogni nodo ha out-degree 1, che spesso forma componenti che sono cicli con alberi attaccati).</li>
          <li className="mb-2"><strong>Concetti Avanzati:</strong> Lowest Common Ancestor (LCA), Centroid Decomposition, Heavy-Light Decomposition, DP on Trees.</li>
        </ul>
      </section>
    </div>
  );
};

export default IntroTreeAlgorithmsPage;

