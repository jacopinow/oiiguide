import React from 'react';

const GraphTraversalPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Attraversamento di Grafi (Graph Traversal) (Livello Silver)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Spiegazione Iniziale del Concetto</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'**attraversamento di grafi** (graph traversal) è il processo di visita di tutti i nodi in un grafo in un ordine specifico. È una delle operazioni più fondamentali sui grafi e serve come base per molti altri algoritmi più complessi. I due algoritmi principali di attraversamento sono la **ricerca in ampiezza** (Breadth-First Search, BFS) e la **ricerca in profondità** (Depth-First Search, DFS).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Un grafo è una struttura dati che consiste di un insieme di **nodi** (o vertici) e un insieme di **archi** che connettono coppie di nodi. Gli archi possono essere **diretti** (hanno una direzione) o **non diretti** (bidirezionali). In programmazione competitiva, i grafi sono spesso rappresentati usando liste di adiacenza o matrici di adiacenza.
        </p>
        <p className="text-lg leading-relaxed">
          L'attraversamento di grafi è essenziale per risolvere problemi come trovare il cammino più breve tra due nodi, determinare se un grafo è connesso, identificare componenti connesse, rilevare cicli, e molto altro.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Rappresentazione dei Grafi in C++</h2>
        <p className="text-lg leading-relaxed mb-4">
          Prima di discutere gli algoritmi di attraversamento, vediamo come rappresentare un grafo in C++. Le due rappresentazioni più comuni sono:
        </p>
        
        <h3 className="text-2xl font-semibold mt-4 mb-2">2.1 Lista di Adiacenza</h3>
        <p className="text-lg leading-relaxed mb-3">
          Una lista di adiacenza è un array (o vector) di liste, dove ogni lista contiene i nodi adiacenti a un dato nodo. È efficiente in termini di spazio per grafi sparsi (con pochi archi rispetto al numero di nodi).
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>

// Rappresentazione con lista di adiacenza
std::vector<std::vector<int>> adj_list;

// Funzione per aggiungere un arco non diretto
void add_edge(int u, int v) {
  adj_list[u].push_back(v);
  adj_list[v].push_back(u); // Rimuovi questa riga per un grafo diretto
}

int main() {
  int n = 5; // Numero di nodi (0-indexed)
  adj_list.resize(n);

  // Aggiungi archi
  add_edge(0, 1);
  add_edge(0, 4);
  add_edge(1, 2);
  add_edge(1, 3);
  add_edge(1, 4);
  add_edge(2, 3);
  add_edge(3, 4);

  // Stampa la lista di adiacenza
  for (int i = 0; i < n; ++i) {
    std::cout << "Nodo " << i << " è connesso a: ";
    for (int neighbor : adj_list[i]) {
      std::cout << neighbor << " ";
    }
    std::cout << std::endl;
  }
  /* Output:
  Nodo 0 è connesso a: 1 4 
  Nodo 1 è connesso a: 0 2 3 4 
  Nodo 2 è connesso a: 1 3 
  Nodo 3 è connesso a: 1 2 4 
  Nodo 4 è connesso a: 0 1 3 
  */

  return 0;
}`} 
        </code></pre>

        <h3 className="text-2xl font-semibold mt-6 mb-2">2.2 Matrice di Adiacenza</h3>
        <p className="text-lg leading-relaxed mb-3">
          Una matrice di adiacenza è una matrice 2D dove `adj_matrix[i][j]` è 1 se esiste un arco dal nodo `i` al nodo `j`, e 0 altrimenti. È efficiente per grafi densi e per verificare rapidamente se esiste un arco tra due nodi.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>

// Rappresentazione con matrice di adiacenza
std::vector<std::vector<int>> adj_matrix;

// Funzione per aggiungere un arco non diretto
void add_edge(int u, int v) {
  adj_matrix[u][v] = 1;
  adj_matrix[v][u] = 1; // Rimuovi questa riga per un grafo diretto
}

int main() {
  int n = 5; // Numero di nodi (0-indexed)
  adj_matrix.resize(n, std::vector<int>(n, 0)); // Inizializza con tutti 0

  // Aggiungi archi
  add_edge(0, 1);
  add_edge(0, 4);
  add_edge(1, 2);
  add_edge(1, 3);
  add_edge(1, 4);
  add_edge(2, 3);
  add_edge(3, 4);

  // Stampa la matrice di adiacenza
  std::cout << "Matrice di adiacenza:" << std::endl;
  for (int i = 0; i < n; ++i) {
    for (int j = 0; j < n; ++j) {
      std::cout << adj_matrix[i][j] << " ";
    }
    std::cout << std::endl;
  }
  /* Output:
  Matrice di adiacenza:
  0 1 0 0 1 
  1 0 1 1 1 
  0 1 0 1 0 
  0 1 1 0 1 
  1 1 0 1 0 
  */

  return 0;
}`} 
        </code></pre>
        <p className="text-lg leading-relaxed mt-3">
          <strong>Quale scegliere?</strong> In generale, per la maggior parte dei problemi di programmazione competitiva, la lista di adiacenza è preferita per la sua efficienza in termini di spazio e per la facilità di iterare sui vicini di un nodo. Tuttavia, la matrice di adiacenza può essere più conveniente quando il grafo è piccolo e denso, o quando è necessario verificare frequentemente l'esistenza di archi specifici.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Ricerca in Profondità (DFS)</h2>
        <p className="text-lg leading-relaxed mb-4">
          La **ricerca in profondità** (Depth-First Search, DFS) esplora il grafo andando il più "in profondità" possibile lungo ogni ramo prima di fare backtracking. Usa uno stack (implicito attraverso la ricorsione o esplicito) per tenere traccia dei nodi da visitare.
        </p>
        
        <h3 className="text-2xl font-semibold mt-4 mb-2">3.1 Implementazione Ricorsiva di DFS</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>

std::vector<std::vector<int>> adj_list;
std::vector<bool> visited;

void dfs(int node) {
  // Marca il nodo corrente come visitato
  visited[node] = true;
  std::cout << "Visitato nodo " << node << std::endl;

  // Visita ricorsivamente tutti i vicini non ancora visitati
  for (int neighbor : adj_list[node]) {
    if (!visited[neighbor]) {
      dfs(neighbor);
    }
  }
}

int main() {
  int n = 5; // Numero di nodi (0-indexed)
  adj_list.resize(n);
  visited.resize(n, false); // Inizializza tutti i nodi come non visitati

  // Aggiungi archi (come nell'esempio precedente)
  adj_list[0].push_back(1); adj_list[1].push_back(0);
  adj_list[0].push_back(4); adj_list[4].push_back(0);
  adj_list[1].push_back(2); adj_list[2].push_back(1);
  adj_list[1].push_back(3); adj_list[3].push_back(1);
  adj_list[1].push_back(4); adj_list[4].push_back(1);
  adj_list[2].push_back(3); adj_list[3].push_back(2);
  adj_list[3].push_back(4); adj_list[4].push_back(3);

  // Esegui DFS partendo dal nodo 0
  std::cout << "DFS a partire dal nodo 0:" << std::endl;
  dfs(0);
  /* Output possibile (l'ordine dei vicini può variare):
  DFS a partire dal nodo 0:
  Visitato nodo 0
  Visitato nodo 1
  Visitato nodo 2
  Visitato nodo 3
  Visitato nodo 4
  */

  return 0;
}`} 
        </code></pre>

        <h3 className="text-2xl font-semibold mt-6 mb-2">3.2 Implementazione Iterativa di DFS (con Stack Esplicito)</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>
#include <stack>

std::vector<std::vector<int>> adj_list;
std::vector<bool> visited;

void dfs_iterative(int start_node) {
  std::stack<int> s;
  s.push(start_node);

  while (!s.empty()) {
    int node = s.top();
    s.pop();

    // Se il nodo non è stato visitato
    if (!visited[node]) {
      visited[node] = true;
      std::cout << "Visitato nodo " << node << std::endl;

      // Aggiungi tutti i vicini non visitati allo stack
      // Nota: li aggiungiamo in ordine inverso per mantenere lo stesso ordine di visita della versione ricorsiva
      for (int i = adj_list[node].size() - 1; i >= 0; --i) {
        int neighbor = adj_list[node][i];
        if (!visited[neighbor]) {
          s.push(neighbor);
        }
      }
    }
  }
}

// ... (main come sopra, ma chiamando dfs_iterative invece di dfs)`} 
        </code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Ricerca in Ampiezza (BFS)</h2>
        <p className="text-lg leading-relaxed mb-4">
          La **ricerca in ampiezza** (Breadth-First Search, BFS) esplora il grafo livello per livello, visitando tutti i vicini di un nodo prima di passare ai vicini dei vicini. Usa una coda per tenere traccia dei nodi da visitare.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          BFS è particolarmente utile per trovare il cammino più breve in un grafo non pesato (dove tutti gli archi hanno lo stesso peso).
        </p>
        
        <h3 className="text-2xl font-semibold mt-4 mb-2">4.1 Implementazione di BFS</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>
#include <queue>

std::vector<std::vector<int>> adj_list;
std::vector<bool> visited;
std::vector<int> distance; // Per tenere traccia della distanza dal nodo di partenza

void bfs(int start_node) {
  std::queue<int> q;
  q.push(start_node);
  visited[start_node] = true;
  distance[start_node] = 0;

  while (!q.empty()) {
    int node = q.front();
    q.pop();
    std::cout << "Visitato nodo " << node << " a distanza " << distance[node] << std::endl;

    // Visita tutti i vicini non ancora visitati
    for (int neighbor : adj_list[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        distance[neighbor] = distance[node] + 1;
        q.push(neighbor);
      }
    }
  }
}

int main() {
  int n = 5; // Numero di nodi (0-indexed)
  adj_list.resize(n);
  visited.resize(n, false);
  distance.resize(n, -1); // -1 indica che il nodo non è raggiungibile

  // Aggiungi archi (come negli esempi precedenti)
  adj_list[0].push_back(1); adj_list[1].push_back(0);
  adj_list[0].push_back(4); adj_list[4].push_back(0);
  adj_list[1].push_back(2); adj_list[2].push_back(1);
  adj_list[1].push_back(3); adj_list[3].push_back(1);
  adj_list[1].push_back(4); adj_list[4].push_back(1);
  adj_list[2].push_back(3); adj_list[3].push_back(2);
  adj_list[3].push_back(4); adj_list[4].push_back(3);

  // Esegui BFS partendo dal nodo 0
  std::cout << "BFS a partire dal nodo 0:" << std::endl;
  bfs(0);
  /* Output possibile (l'ordine dei vicini può variare):
  BFS a partire dal nodo 0:
  Visitato nodo 0 a distanza 0
  Visitato nodo 1 a distanza 1
  Visitato nodo 4 a distanza 1
  Visitato nodo 2 a distanza 2
  Visitato nodo 3 a distanza 2
  */

  // Stampa le distanze
  std::cout << "\nDistanze dal nodo 0:" << std::endl;
  for (int i = 0; i < n; ++i) {
    std::cout << "Nodo " << i << ": " << distance[i] << std::endl;
  }
  /* Output:
  Distanze dal nodo 0:
  Nodo 0: 0
  Nodo 1: 1
  Nodo 2: 2
  Nodo 3: 2
  Nodo 4: 1
  */

  return 0;
}`} 
        </code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Confronto tra DFS e BFS</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-800">
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Caratteristica</th>
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-left">DFS</th>
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-left">BFS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Struttura dati</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Stack (implicito o esplicito)</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Coda</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Ordine di visita</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Esplora un ramo fino in fondo prima di passare al successivo</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Esplora tutti i nodi a una certa distanza prima di passare alla distanza successiva</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Complessità temporale</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">O(V + E) dove V è il numero di vertici e E il numero di archi</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">O(V + E) dove V è il numero di vertici e E il numero di archi</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Complessità spaziale</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">O(V) nel caso peggiore (grafo lineare)</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">O(V) nel caso peggiore (tutti i nodi allo stesso livello)</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Uso tipico</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Trovare componenti connesse, rilevare cicli, risolvere labirinti, topological sort</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Trovare il cammino più breve in grafi non pesati, trovare tutti i nodi a una certa distanza</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Implementazione</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Più semplice con ricorsione</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Richiede una coda esplicita</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Applicazioni Comuni</h2>
        
        <h3 className="text-2xl font-semibold mt-4 mb-2">6.1 Trovare Componenti Connesse (con DFS)</h3>
        <p className="text-lg leading-relaxed mb-3">
          Una componente connessa in un grafo non diretto è un sottoinsieme di nodi tale che esiste un cammino tra ogni coppia di nodi nel sottoinsieme. Possiamo usare DFS per trovare tutte le componenti connesse.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>

std::vector<std::vector<int>> adj_list;
std::vector<bool> visited;
std::vector<int> component; // Per tenere traccia della componente di ogni nodo

void dfs(int node, int comp_id) {
  visited[node] = true;
  component[node] = comp_id;

  for (int neighbor : adj_list[node]) {
    if (!visited[neighbor]) {
      dfs(neighbor, comp_id);
    }
  }
}

void find_connected_components(int n) {
  int comp_id = 0;
  for (int i = 0; i < n; ++i) {
    if (!visited[i]) {
      dfs(i, comp_id);
      comp_id++;
    }
  }
  std::cout << "Numero di componenti connesse: " << comp_id << std::endl;
  
  // Stampa i nodi in ogni componente
  for (int i = 0; i < comp_id; ++i) {
    std::cout << "Componente " << i << ": ";
    for (int j = 0; j < n; ++j) {
      if (component[j] == i) {
        std::cout << j << " ";
      }
    }
    std::cout << std::endl;
  }
}

int main() {
  int n = 8; // Numero di nodi (0-indexed)
  adj_list.resize(n);
  visited.resize(n, false);
  component.resize(n, -1);

  // Aggiungi archi per creare due componenti connesse
  // Componente 1: 0-1-2-3
  adj_list[0].push_back(1); adj_list[1].push_back(0);
  adj_list[1].push_back(2); adj_list[2].push_back(1);
  adj_list[2].push_back(3); adj_list[3].push_back(2);
  
  // Componente 2: 4-5-6-7
  adj_list[4].push_back(5); adj_list[5].push_back(4);
  adj_list[5].push_back(6); adj_list[6].push_back(5);
  adj_list[6].push_back(7); adj_list[7].push_back(6);

  find_connected_components(n);
  /* Output:
  Numero di componenti connesse: 2
  Componente 0: 0 1 2 3 
  Componente 1: 4 5 6 7 
  */

  return 0;
}`} 
        </code></pre>

        <h3 className="text-2xl font-semibold mt-6 mb-2">6.2 Rilevare Cicli in un Grafo (con DFS)</h3>
        <p className="text-lg leading-relaxed mb-3">
          Un ciclo in un grafo è un cammino che inizia e termina nello stesso nodo. Possiamo usare DFS per rilevare cicli in un grafo.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>

std::vector<std::vector<int>> adj_list;
std::vector<bool> visited;
std::vector<bool> in_stack; // Per tenere traccia dei nodi nel cammino corrente

bool has_cycle_dfs(int node, int parent) {
  visited[node] = true;
  in_stack[node] = true;

  for (int neighbor : adj_list[node]) {
    if (neighbor == parent) continue; // Ignora l'arco bidirezionale verso il genitore
    
    if (!visited[neighbor]) {
      if (has_cycle_dfs(neighbor, node)) {
        return true;
      }
    } else if (in_stack[neighbor]) {
      // Se il vicino è già stato visitato ed è nel cammino corrente, abbiamo trovato un ciclo
      return true;
    }
  }

  in_stack[node] = false; // Backtracking
  return false;
}

bool has_cycle(int n) {
  for (int i = 0; i < n; ++i) {
    if (!visited[i]) {
      if (has_cycle_dfs(i, -1)) {
        return true;
      }
    }
  }
  return false;
}

int main() {
  int n = 5; // Numero di nodi (0-indexed)
  adj_list.resize(n);
  visited.resize(n, false);
  in_stack.resize(n, false);

  // Aggiungi archi per creare un grafo con un ciclo
  adj_list[0].push_back(1); adj_list[1].push_back(0);
  adj_list[1].push_back(2); adj_list[2].push_back(1);
  adj_list[2].push_back(3); adj_list[3].push_back(2);
  adj_list[3].push_back(4); adj_list[4].push_back(3);
  adj_list[4].push_back(1); adj_list[1].push_back(4); // Questo arco crea un ciclo 1-2-3-4-1

  if (has_cycle(n)) {
    std::cout << "Il grafo contiene un ciclo." << std::endl;
  } else {
    std::cout << "Il grafo non contiene cicli." << std::endl;
  }
  // Output: Il grafo contiene un ciclo.

  return 0;
}`} 
        </code></pre>

        <h3 className="text-2xl font-semibold mt-6 mb-2">6.3 Trovare il Cammino Più Breve (con BFS)</h3>
        <p className="text-lg leading-relaxed mb-3">
          In un grafo non pesato, BFS può essere usato per trovare il cammino più breve tra due nodi.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>
#include <queue>

std::vector<std::vector<int>> adj_list;
std::vector<bool> visited;
std::vector<int> distance;
std::vector<int> parent; // Per ricostruire il cammino

void bfs_shortest_path(int start_node, int end_node) {
  std::queue<int> q;
  q.push(start_node);
  visited[start_node] = true;
  distance[start_node] = 0;
  parent[start_node] = -1; // Il nodo di partenza non ha un genitore

  while (!q.empty()) {
    int node = q.front();
    q.pop();

    if (node == end_node) break; // Abbiamo trovato il nodo di destinazione

    for (int neighbor : adj_list[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        distance[neighbor] = distance[node] + 1;
        parent[neighbor] = node;
        q.push(neighbor);
      }
    }
  }

  // Verifica se il nodo di destinazione è stato raggiunto
  if (!visited[end_node]) {
    std::cout << "Non esiste un cammino da " << start_node << " a " << end_node << std::endl;
    return;
  }

  // Ricostruisci il cammino
  std::vector<int> path;
  for (int node = end_node; node != -1; node = parent[node]) {
    path.push_back(node);
  }
  std::reverse(path.begin(), path.end());

  std::cout << "Cammino più breve da " << start_node << " a " << end_node << " (lunghezza " << distance[end_node] << "): ";
  for (int node : path) {
    std::cout << node << " ";
  }
  std::cout << std::endl;
}

int main() {
  int n = 6; // Numero di nodi (0-indexed)
  adj_list.resize(n);
  visited.resize(n, false);
  distance.resize(n, -1);
  parent.resize(n, -1);

  // Aggiungi archi
  adj_list[0].push_back(1); adj_list[1].push_back(0);
  adj_list[0].push_back(2); adj_list[2].push_back(0);
  adj_list[1].push_back(3); adj_list[3].push_back(1);
  adj_list[2].push_back(3); adj_list[3].push_back(2);
  adj_list[2].push_back(4); adj_list[4].push_back(2);
  adj_list[3].push_back(4); adj_list[4].push_back(3);
  adj_list[3].push_back(5); adj_list[5].push_back(3);
  adj_list[4].push_back(5); adj_list[5].push_back(4);

  int start_node = 0;
  int end_node = 5;
  bfs_shortest_path(start_node, end_node);
  // Output: Cammino più breve da 0 a 5 (lunghezza 3): 0 1 3 5 

  return 0;
}`} 
        </code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">7. Problemi USACO Comuni e Suggerimenti</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>USACO Silver: "Closing the Farm"</strong> - Richiede di trovare componenti connesse in un grafo che cambia nel tempo.</li>
          <li className="mb-2"><strong>USACO Silver: "Moocast"</strong> - Costruire un grafo basato su distanze e poi trovare componenti connesse.</li>
          <li className="mb-2"><strong>USACO Silver: "Milk Pails"</strong> - Rappresentare stati come nodi di un grafo e usare BFS per trovare il cammino più breve.</li>
          <li className="mb-2"><strong>Suggerimenti per problemi di grafi:</strong>
            <ul className="list-disc list-inside text-lg leading-relaxed ml-6 mt-1">
              <li>Identifica chiaramente cosa rappresentano i nodi e gli archi nel problema.</li>
              <li>Scegli la rappresentazione del grafo più adatta (lista di adiacenza vs matrice di adiacenza).</li>
              <li>Usa DFS per esplorare in profondità, trovare componenti connesse, rilevare cicli.</li>
              <li>Usa BFS per trovare cammini più brevi in grafi non pesati.</li>
              <li>Ricorda di marcare i nodi come visitati per evitare cicli infiniti.</li>
              <li>Per grafi non diretti, fai attenzione a non rivisitare il nodo genitore.</li>
            </ul>
          </li>
        </ul>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti a Concetti Prerequisiti e Successivi</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Prerequisito:</strong> <a href="../../bronze/additional-bronze/introduction-to-graphs" className="text-blue-600 dark:text-blue-400 hover:underline">Introduzione ai Grafi (Bronze)</a>.</li>
          <li className="mb-2"><strong>Concetto Correlato:</strong> <a href="./flood-fill" className="text-blue-600 dark:text-blue-400 hover:underline">Flood Fill</a> (una variante di DFS/BFS su griglie).</li>
          <li className="mb-2"><strong>Concetto Correlato:</strong> <a href="./introduction-to-tree-algorithms" className="text-blue-600 dark:text-blue-400 hover:underline">Algoritmi su Alberi</a> (gli alberi sono un tipo speciale di grafo).</li>
          <li className="mb-2"><strong>Concetto Avanzato:</strong> Algoritmo di Dijkstra (per trovare il cammino più breve in grafi pesati).</li>
          <li className="mb-2"><strong>Concetto Avanzato:</strong> Topological Sort (per grafi diretti aciclici).</li>
        </ul>
      </section>
    </div>
  );
};

export default GraphTraversalPage;
