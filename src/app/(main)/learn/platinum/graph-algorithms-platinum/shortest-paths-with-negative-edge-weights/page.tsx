import React from 'react';

const ShortestPathsNegativeEdgeWeightsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Shortest Paths con Pesi Negativi (Livello Platinum)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione ai Shortest Paths con Pesi Negativi</h2>
        <p className="text-lg leading-relaxed mb-4">
          Nella sezione Gold, abbiamo studiato algoritmi per trovare i cammini minimi in grafi con pesi non negativi, come l'algoritmo di Dijkstra. Tuttavia, Dijkstra non funziona correttamente quando il grafo contiene archi con pesi negativi, poiché l'algoritmo assume che aggiungere un arco a un cammino non possa mai diminuire la distanza totale.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In questa lezione, esploreremo algoritmi che possono gestire grafi con archi a peso negativo:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Algoritmo di Bellman-Ford</li>
          <li className="mb-1">Algoritmo SPFA (Shortest Path Faster Algorithm)</li>
          <li className="mb-1">Algoritmo di Floyd-Warshall</li>
          <li className="mb-1">Rilevamento di cicli negativi</li>
        </ul>
        <p className="text-lg leading-relaxed">
          È importante notare che se un grafo contiene un ciclo con peso totale negativo raggiungibile dal nodo di partenza, il concetto di "cammino minimo" non è ben definito, poiché possiamo continuare a percorrere il ciclo per ottenere una distanza arbitrariamente piccola (negativa).
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Algoritmo di Bellman-Ford</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo di Bellman-Ford è un algoritmo classico per trovare i cammini minimi da un singolo nodo di partenza a tutti gli altri nodi in un grafo diretto con pesi potenzialmente negativi. Può anche rilevare la presenza di cicli negativi raggiungibili dal nodo di partenza.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>Idea di Base:</strong>
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Inizializza la distanza al nodo di partenza a 0 e a tutti gli altri nodi a infinito.</li>
          <li className="mb-1">Ripeti n-1 volte (dove n è il numero di nodi):
            <ul className="list-disc list-inside ml-8 mt-1">
              <li>Per ogni arco (u, v) con peso w, se dist[u] + w < dist[v], aggiorna dist[v] = dist[u] + w.</li>
            </ul>
          </li>
          <li className="mb-1">Controlla se ci sono cicli negativi:
            <ul className="list-disc list-inside ml-8 mt-1">
              <li>Per ogni arco (u, v) con peso w, se dist[u] + w < dist[v], allora esiste un ciclo negativo.</li>
            </ul>
          </li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int INF = 1e9;

// Struttura per rappresentare un arco
struct Edge {
    int u, v, w;
};

// Algoritmo di Bellman-Ford
vector<int> bellmanFord(int n, vector<Edge>& edges, int src) {
    vector<int> dist(n, INF);
    dist[src] = 0;
    
    // Rilassamento degli archi per n-1 volte
    for (int i = 0; i < n - 1; i++) {
        for (auto& edge : edges) {
            if (dist[edge.u] != INF && dist[edge.u] + edge.w < dist[edge.v]) {
                dist[edge.v] = dist[edge.u] + edge.w;
            }
        }
    }
    
    // Controllo per cicli negativi
    for (auto& edge : edges) {
        if (dist[edge.u] != INF && dist[edge.u] + edge.w < dist[edge.v]) {
            // Ciclo negativo rilevato
            return {}; // Ritorna un vettore vuoto per indicare la presenza di un ciclo negativo
        }
    }
    
    return dist;
}

// Esempio di utilizzo
int main() {
    int n = 5; // Numero di nodi
    int m = 8; // Numero di archi
    
    vector<Edge> edges = {
        {0, 1, -1},
        {0, 2, 4},
        {1, 2, 3},
        {1, 3, 2},
        {1, 4, 2},
        {3, 2, 5},
        {3, 1, 1},
        {4, 3, -3}
    };
    
    int src = 0; // Nodo di partenza
    
    vector<int> dist = bellmanFord(n, edges, src);
    
    if (dist.empty()) {
        cout << "Il grafo contiene un ciclo negativo raggiungibile dal nodo di partenza." << endl;
    } else {
        cout << "Distanze minime dal nodo " << src << ":" << endl;
        for (int i = 0; i < n; i++) {
            cout << "Nodo " << i << ": " << (dist[i] == INF ? "INF" : to_string(dist[i])) << endl;
        }
    }
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Tempo: O(V * E), dove V è il numero di nodi e E è il numero di archi</li>
          <li className="mb-1">Spazio: O(V)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          L'algoritmo di Bellman-Ford è più lento dell'algoritmo di Dijkstra (O(V * E) vs O(E log V)), ma può gestire archi con pesi negativi e rilevare cicli negativi.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. SPFA (Shortest Path Faster Algorithm)</h2>
        <p className="text-lg leading-relaxed mb-4">
          SPFA è un'ottimizzazione dell'algoritmo di Bellman-Ford che utilizza una coda per evitare rilassamenti inutili. In pratica, SPFA può essere molto più veloce di Bellman-Ford, specialmente per grafi sparsi, ma la sua complessità nel caso peggiore rimane O(V * E).
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int INF = 1e9;

// SPFA (Shortest Path Faster Algorithm)
vector<int> spfa(int n, vector<vector<pair<int, int>>>& adj, int src) {
    vector<int> dist(n, INF);
    vector<bool> inQueue(n, false);
    vector<int> count(n, 0); // Conta quante volte un nodo è stato inserito nella coda
    queue<int> q;
    
    dist[src] = 0;
    q.push(src);
    inQueue[src] = true;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        inQueue[u] = false;
        
        for (auto& edge : adj[u]) {
            int v = edge.first;
            int w = edge.second;
            
            if (dist[u] != INF && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                
                if (!inQueue[v]) {
                    q.push(v);
                    inQueue[v] = true;
                    count[v]++;
                    
                    // Se un nodo è stato inserito nella coda più di n volte,
                    // allora c'è un ciclo negativo
                    if (count[v] > n) {
                        return {}; // Ciclo negativo rilevato
                    }
                }
            }
        }
    }
    
    return dist;
}

// Esempio di utilizzo
int main() {
    int n = 5; // Numero di nodi
    int m = 8; // Numero di archi
    
    vector<vector<pair<int, int>>> adj(n);
    
    // Aggiungi archi al grafo
    adj[0].push_back({1, -1});
    adj[0].push_back({2, 4});
    adj[1].push_back({2, 3});
    adj[1].push_back({3, 2});
    adj[1].push_back({4, 2});
    adj[3].push_back({2, 5});
    adj[3].push_back({1, 1});
    adj[4].push_back({3, -3});
    
    int src = 0; // Nodo di partenza
    
    vector<int> dist = spfa(n, adj, src);
    
    if (dist.empty()) {
        cout << "Il grafo contiene un ciclo negativo raggiungibile dal nodo di partenza." << endl;
    } else {
        cout << "Distanze minime dal nodo " << src << ":" << endl;
        for (int i = 0; i < n; i++) {
            cout << "Nodo " << i << ": " << (dist[i] == INF ? "INF" : to_string(dist[i])) << endl;
        }
    }
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Tempo: O(V * E) nel caso peggiore, ma spesso molto più veloce in pratica</li>
          <li className="mb-1">Spazio: O(V + E)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          SPFA è generalmente più veloce di Bellman-Ford nella pratica, ma è ancora più lento di Dijkstra per grafi senza archi negativi. Inoltre, SPFA può essere soggetto a attacchi di complessità, dove input appositamente costruiti possono farlo eseguire in tempo O(V * E).
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Algoritmo di Floyd-Warshall</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo di Floyd-Warshall è un algoritmo per trovare i cammini minimi tra tutte le coppie di nodi in un grafo diretto, che può contenere archi con pesi negativi (ma non cicli negativi). A differenza di Bellman-Ford e SPFA, che trovano i cammini minimi da un singolo nodo di partenza, Floyd-Warshall trova i cammini minimi tra tutte le coppie di nodi.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>Idea di Base:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo utilizza la programmazione dinamica per calcolare iterativamente le distanze minime. Per ogni coppia di nodi (i, j), considera se passare attraverso un nodo intermedio k può ridurre la distanza.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int INF = 1e9;

// Algoritmo di Floyd-Warshall
vector<vector<int>> floydWarshall(int n, vector<vector<int>>& graph) {
    vector<vector<int>> dist = graph;
    
    // Inizializza la matrice delle distanze
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (i != j && dist[i][j] == 0) {
                dist[i][j] = INF;
            }
        }
    }
    
    // Calcola le distanze minime
    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (dist[i][k] != INF && dist[k][j] != INF) {
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }
    
    // Controlla se ci sono cicli negativi
    for (int i = 0; i < n; i++) {
        if (dist[i][i] < 0) {
            // Ciclo negativo rilevato
            return {};
        }
    }
    
    return dist;
}

// Esempio di utilizzo
int main() {
    int n = 4; // Numero di nodi
    
    // Matrice di adiacenza del grafo
    vector<vector<int>> graph = {
        {0, -1, 4, INF},
        {INF, 0, 3, 2},
        {INF, INF, 0, INF},
        {INF, 1, 5, 0}
    };
    
    vector<vector<int>> dist = floydWarshall(n, graph);
    
    if (dist.empty()) {
        cout << "Il grafo contiene un ciclo negativo." << endl;
    } else {
        cout << "Matrice delle distanze minime:" << endl;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (dist[i][j] == INF) {
                    cout << "INF ";
                } else {
                    cout << dist[i][j] << " ";
                }
            }
            cout << endl;
        }
    }
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Tempo: O(V³), dove V è il numero di nodi</li>
          <li className="mb-1">Spazio: O(V²)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          L'algoritmo di Floyd-Warshall è più lento di eseguire Bellman-Ford o SPFA da ogni nodo (O(V³) vs O(V² * E)), ma è più semplice da implementare e può essere più efficiente per grafi densi dove E ≈ V².
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Rilevamento di Cicli Negativi</h2>
        <p className="text-lg leading-relaxed mb-4">
          Come abbiamo visto, sia Bellman-Ford che Floyd-Warshall possono rilevare la presenza di cicli negativi. Tuttavia, a volte potremmo voler trovare esplicitamente un ciclo negativo, non solo rilevare la sua presenza.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>Trovare un Ciclo Negativo con Bellman-Ford:</strong>
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int INF = 1e9;

// Struttura per rappresentare un arco
struct Edge {
    int u, v, w;
};

// Trova un ciclo negativo con Bellman-Ford
vector<int> findNegativeCycle(int n, vector<Edge>& edges) {
    vector<int> dist(n, 0);
    vector<int> parent(n, -1);
    int x = -1;
    
    // Rilassamento degli archi per n volte
    for (int i = 0; i < n; i++) {
        x = -1;
        for (auto& edge : edges) {
            if (dist[edge.u] + edge.w < dist[edge.v]) {
                dist[edge.v] = dist[edge.u] + edge.w;
                parent[edge.v] = edge.u;
                x = edge.v;
            }
        }
        
        // Se non ci sono aggiornamenti nell'ultima iterazione, non ci sono cicli negativi
        if (x == -1) break;
    }
    
    // Se non ci sono aggiornamenti nell'ultima iterazione, non ci sono cicli negativi
    if (x == -1) return {};
    
    // Altrimenti, x è un nodo in un ciclo negativo
    // Troviamo un nodo che è sicuramente nel ciclo
    for (int i = 0; i < n; i++) {
        x = parent[x];
    }
    
    // Costruiamo il ciclo
    vector<int> cycle;
    int v = x;
    do {
        cycle.push_back(v);
        v = parent[v];
    } while (v != x);
    
    // Invertiamo il ciclo per ottenere l'ordine corretto
    reverse(cycle.begin(), cycle.end());
    
    return cycle;
}

// Esempio di utilizzo
int main() {
    int n = 4; // Numero di nodi
    int m = 5; // Numero di archi
    
    vector<Edge> edges = {
        {0, 1, 1},
        {1, 2, -1},
        {2, 3, -1},
        {3, 1, -1},
        {3, 0, 1}
    };
    
    vector<int> cycle = findNegativeCycle(n, edges);
    
    if (cycle.empty()) {
        cout << "Il grafo non contiene cicli negativi." << endl;
    } else {
        cout << "Ciclo negativo trovato: ";
        for (int node : cycle) {
            cout << node << " ";
        }
        cout << cycle[0] << endl; // Chiudi il ciclo
    }
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Trovare Tutti i Nodi in Cicli Negativi:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          A volte potremmo voler trovare tutti i nodi che sono in un ciclo negativo o che possono raggiungere un ciclo negativo. Questo può essere fatto eseguendo una DFS sui nodi che sono stati aggiornati nell'ultima iterazione di Bellman-Ford.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int INF = 1e9;

// Trova tutti i nodi in cicli negativi o che possono raggiungere cicli negativi
vector<bool> findNodesInNegativeCycles(int n, vector<vector<pair<int, int>>>& adj) {
    vector<int> dist(n, 0);
    vector<bool> inCycle(n, false);
    vector<bool> visited(n, false);
    
    // Rilassamento degli archi per n volte
    for (int i = 0; i < n; i++) {
        bool updated = false;
        for (int u = 0; u < n; u++) {
            for (auto& edge : adj[u]) {
                int v = edge.first;
                int w = edge.second;
                
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    updated = true;
                    
                    // Se siamo all'ultima iterazione, v è in un ciclo negativo
                    if (i == n - 1) {
                        inCycle[v] = true;
                    }
                }
            }
        }
        
        // Se non ci sono aggiornamenti, non ci sono cicli negativi
        if (!updated) break;
    }
    
    // DFS per trovare tutti i nodi che possono raggiungere un ciclo negativo
    function<void(int)> dfs = [&](int u) {
        visited[u] = true;
        inCycle[u] = true;
        
        for (auto& edge : adj[u]) {
            int v = edge.first;
            if (!visited[v]) {
                dfs(v);
            }
        }
    };
    
    // Esegui DFS da tutti i nodi in cicli negativi
    for (int i = 0; i < n; i++) {
        if (inCycle[i] && !visited[i]) {
            dfs(i);
        }
    }
    
    return inCycle;
}

// Esempio di utilizzo
int main() {
    int n = 5; // Numero di nodi
    
    vector<vector<pair<int, int>>> adj(n);
    
    // Aggiungi archi al grafo
    adj[0].push_back({1, 1});
    adj[1].push_back({2, 2});
    adj[2].push_back({3, -6});
    adj[3].push_back({1, 1});
    adj[3].push_back({4, 3});
    
    vector<bool> inCycle = findNodesInNegativeCycles(n, adj);
    
    cout << "Nodi in cicli negativi o che possono raggiungere cicli negativi:" << endl;
    for (int i = 0; i < n; i++) {
        if (inCycle[i]) {
            cout << i << " ";
        }
    }
    cout << endl;
    
    return 0;
}
`}</code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Applicazioni e Considerazioni</h2>
        <p className="text-lg leading-relaxed mb-4">
          Gli algoritmi per shortest paths con pesi negativi hanno diverse applicazioni pratiche:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Arbitraggio Valutario:</strong> Rilevare opportunità di arbitraggio nei mercati valutari, dove un ciclo negativo rappresenta un'opportunità di profitto.</li>
          <li className="mb-2"><strong>Scheduling:</strong> Problemi di scheduling con vincoli di precedenza e ritardi, dove i pesi negativi possono rappresentare guadagni o risparmi.</li>
          <li className="mb-2"><strong>Routing di Rete:</strong> In alcuni protocolli di routing, i pesi negativi possono rappresentare guadagni o preferenze.</li>
        </ul>
        <p className="text-lg leading-relaxed mb-2">
          <strong>Considerazioni Pratiche:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-2"><strong>Scelta dell'Algoritmo:</strong> Se il grafo non ha archi negativi, Dijkstra è generalmente la scelta migliore. Se ci sono archi negativi ma non cicli negativi, Bellman-Ford o SPFA sono buone scelte per single-source shortest paths, mentre Floyd-Warshall è preferibile per all-pairs shortest paths in grafi densi.</li>
          <li className="mb-2"><strong>Rilevamento di Cicli Negativi:</strong> In molte applicazioni, è importante non solo trovare i cammini minimi, ma anche rilevare la presenza di cicli negativi.</li>
          <li className="mb-2"><strong>Ottimizzazioni:</strong> SPFA è un'ottimizzazione di Bellman-Ford che può essere molto più veloce in pratica, ma è ancora soggetto a attacchi di complessità. Altre ottimizzazioni includono l'early termination se non ci sono aggiornamenti in un'iterazione.</li>
        </ul>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">7. Problemi di Esempio</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-2"><a href="https://cses.fi/problemset/task/1673" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - High Score</a>: Un problema che richiede di trovare il cammino con il punteggio massimo in un grafo con archi positivi e negativi.</li>
          <li className="mb-2"><a href="https://cses.fi/problemset/task/1197" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - Cycle Finding</a>: Un problema che richiede di trovare un ciclo negativo in un grafo.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/295/problem/B" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Greg and Graph</a>: Un problema che richiede di calcolare le distanze minime tra tutte le coppie di nodi in un grafo che cambia nel tempo.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/601/problem/A" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - The Two Routes</a>: Un problema che richiede di trovare il cammino minimo in un grafo con vincoli aggiuntivi.</li>
        </ul>
      </section>
    </div>
  );
};

export default ShortestPathsNegativeEdgeWeightsPage;
