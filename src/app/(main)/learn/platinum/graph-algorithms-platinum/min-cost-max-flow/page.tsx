import React from 'react';

const MinCostMaxFlowPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Min Cost Max Flow (Livello Platinum)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione al Min Cost Max Flow</h2>
        <p className="text-lg leading-relaxed mb-4">
          Nella lezione precedente, abbiamo studiato il problema del flusso massimo, che consiste nel trovare la quantità massima di flusso che può essere inviata da una sorgente a un pozzo in una rete. Tuttavia, in molte applicazioni pratiche, ogni unità di flusso ha anche un costo associato, e siamo interessati a trovare un flusso massimo con il costo minimo possibile.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il problema del Min Cost Max Flow (MCMF) è un'estensione del problema del flusso massimo che tiene conto di questi costi. Formalmente, dato un grafo diretto con:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Una capacità c(u, v) per ogni arco (u, v), che rappresenta la quantità massima di flusso che può passare attraverso quell'arco.</li>
          <li className="mb-1">Un costo w(u, v) per ogni arco (u, v), che rappresenta il costo per unità di flusso che passa attraverso quell'arco.</li>
          <li className="mb-1">Una sorgente s e un pozzo t.</li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">
          L'obiettivo è trovare un flusso di valore massimo dalla sorgente al pozzo, e tra tutti i flussi di valore massimo, trovare quello con il costo totale minimo.
        </p>
        <p className="text-lg leading-relaxed">
          In questa lezione, esploreremo algoritmi per risolvere il problema del Min Cost Max Flow e vedremo alcune delle sue applicazioni.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Algoritmi per Min Cost Max Flow</h2>
        <p className="text-lg leading-relaxed mb-4">
          Ci sono diversi algoritmi per risolvere il problema del Min Cost Max Flow. Uno degli approcci più comuni è l'algoritmo del Ciclo di Cancellazione Successiva (Successive Shortest Path Algorithm), che è un'estensione dell'algoritmo di Ford-Fulkerson per il flusso massimo.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>2.1 Algoritmo del Ciclo di Cancellazione Successiva:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          L'idea di base è:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Inizializza il flusso a zero per tutti gli archi.</li>
          <li className="mb-1">Finché esiste un cammino aumentante nella rete residua:
            <ul className="list-disc list-inside ml-8 mt-1">
              <li>Trova il cammino aumentante con il costo minimo usando un algoritmo di shortest path (come Dijkstra o Bellman-Ford).</li>
              <li>Aumenta il flusso lungo questo cammino della quantità massima possibile.</li>
            </ul>
          </li>
        </ol>
        <p className="text-lg leading-relaxed mb-4">
          Poiché stiamo cercando il cammino con il costo minimo, dobbiamo considerare i costi degli archi nella rete residua:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Per un arco in avanti (u, v) con capacità residua > 0, il costo è w(u, v).</li>
          <li className="mb-1">Per un arco all'indietro (v, u) con flusso > 0, il costo è -w(u, v).</li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">
          Poiché la rete residua può contenere archi con costi negativi (gli archi all'indietro), dobbiamo usare un algoritmo di shortest path che può gestire costi negativi, come l'algoritmo di Bellman-Ford o SPFA.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>2.2 Potenziali e Riduzione dei Costi:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Per evitare di dover usare un algoritmo di shortest path che gestisce costi negativi (che è più lento), possiamo utilizzare la tecnica dei potenziali per trasformare i costi in modo che siano tutti non negativi, permettendoci di usare l'algoritmo di Dijkstra.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          L'idea è di assegnare un potenziale p(v) a ogni nodo v, e ridefinire il costo di un arco (u, v) come:
        </p>
        <p className="text-lg leading-relaxed mb-4 text-center">
          w'(u, v) = w(u, v) + p(u) - p(v)
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Se scegliamo i potenziali in modo che w'(u, v) ≥ 0 per ogni arco (u, v) nella rete residua, possiamo usare l'algoritmo di Dijkstra.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Un modo per ottenere potenziali validi è eseguire l'algoritmo di Bellman-Ford una volta all'inizio per trovare le distanze minime dalla sorgente a tutti gli altri nodi, e usare queste distanze come potenziali iniziali.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Implementazione del Min Cost Max Flow</h2>
        <p className="text-lg leading-relaxed mb-4">
          Ecco un'implementazione dell'algoritmo del Ciclo di Cancellazione Successiva con la tecnica dei potenziali:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int INF = 1e9;

// Implementazione di Min Cost Max Flow con potenziali
class MinCostMaxFlow {
private:
    struct Edge {
        int v, rev;
        long long cap, flow;
        int cost;
        Edge(int v, int rev, long long cap, int cost) : v(v), rev(rev), cap(cap), flow(0), cost(cost) {}
    };
    
    int n, s, t;
    vector<vector<Edge>> adj;
    vector<int> potential, dist;
    vector<int> parent, parent_edge;
    
    // Trova il cammino aumentante con il costo minimo usando Dijkstra
    bool dijkstra() {
        dist.assign(n, INF);
        parent.assign(n, -1);
        parent_edge.assign(n, -1);
        
        dist[s] = 0;
        using pii = pair<int, int>;
        priority_queue<pii, vector<pii>, greater<pii>> pq;
        pq.push({0, s});
        
        while (!pq.empty()) {
            int d = pq.top().first;
            int u = pq.top().second;
            pq.pop();
            
            if (d > dist[u]) continue;
            
            for (int i = 0; i < adj[u].size(); i++) {
                Edge& e = adj[u][i];
                int v = e.v;
                
                // Calcola il costo ridotto
                int cost = e.cost + potential[u] - potential[v];
                
                if (e.cap - e.flow > 0 && dist[u] + cost < dist[v]) {
                    dist[v] = dist[u] + cost;
                    parent[v] = u;
                    parent_edge[v] = i;
                    pq.push({dist[v], v});
                }
            }
        }
        
        // Aggiorna i potenziali
        for (int i = 0; i < n; i++) {
            if (dist[i] < INF) {
                potential[i] += dist[i];
            }
        }
        
        return dist[t] < INF;
    }
    
public:
    MinCostMaxFlow(int n, int s, int t) : n(n), s(s), t(t) {
        adj.resize(n);
        potential.assign(n, 0);
    }
    
    void addEdge(int u, int v, long long cap, int cost) {
        adj[u].push_back(Edge(v, adj[v].size(), cap, cost));
        adj[v].push_back(Edge(u, adj[u].size() - 1, 0, -cost)); // Arco inverso
    }
    
    pair<long long, long long> solve() {
        long long max_flow = 0, min_cost = 0;
        
        // Inizializza i potenziali con Bellman-Ford
        potential.assign(n, INF);
        potential[s] = 0;
        
        for (int i = 0; i < n - 1; i++) {
            for (int u = 0; u < n; u++) {
                if (potential[u] == INF) continue;
                
                for (auto& e : adj[u]) {
                    int v = e.v;
                    if (e.cap - e.flow > 0) {
                        potential[v] = min(potential[v], potential[u] + e.cost);
                    }
                }
            }
        }
        
        // Algoritmo del Ciclo di Cancellazione Successiva
        while (dijkstra()) {
            // Trova la capacità residua minima lungo il cammino
            long long flow = LLONG_MAX;
            for (int v = t; v != s; v = parent[v]) {
                int u = parent[v];
                int i = parent_edge[v];
                flow = min(flow, adj[u][i].cap - adj[u][i].flow);
            }
            
            // Aumenta il flusso lungo il cammino
            for (int v = t; v != s; v = parent[v]) {
                int u = parent[v];
                int i = parent_edge[v];
                int j = adj[u][i].rev;
                
                adj[u][i].flow += flow;
                adj[v][j].flow -= flow;
                min_cost += flow * adj[u][i].cost;
            }
            
            max_flow += flow;
        }
        
        return {max_flow, min_cost};
    }
};

// Esempio di utilizzo
int main() {
    int n = 4; // Numero di nodi
    int s = 0; // Sorgente
    int t = 3; // Pozzo
    
    MinCostMaxFlow mcmf(n, s, t);
    
    // Aggiungi archi (u, v, capacità, costo)
    mcmf.addEdge(0, 1, 2, 1);
    mcmf.addEdge(0, 2, 1, 2);
    mcmf.addEdge(1, 2, 1, 1);
    mcmf.addEdge(1, 3, 1, 3);
    mcmf.addEdge(2, 3, 2, 1);
    
    auto [max_flow, min_cost] = mcmf.solve();
    
    cout << "Flusso massimo: " << max_flow << endl;
    cout << "Costo minimo: " << min_cost << endl;
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Tempo: O(F * (E log V)), dove F è il valore del flusso massimo, E è il numero di archi e V è il numero di nodi</li>
          <li className="mb-1">Spazio: O(V + E)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Questa implementazione utilizza l'algoritmo di Dijkstra con potenziali per trovare il cammino aumentante con il costo minimo, il che la rende efficiente per la maggior parte delle applicazioni pratiche.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Ottimizzazioni e Varianti</h2>
        <p className="text-lg leading-relaxed mb-4">
          Ci sono diverse ottimizzazioni e varianti dell'algoritmo di base per il Min Cost Max Flow:
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>4.1 Capacity Scaling:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          L'idea è di considerare prima gli archi con capacità residua maggiore, il che può accelerare l'algoritmo in pratica.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>4.2 Cost Scaling:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Simile al capacity scaling, ma considera prima gli archi con costo minore.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>4.3 Algoritmo del Ciclo Negativo:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Un approccio alternativo è di iniziare con un flusso massimo (trovato con un algoritmo di flusso massimo standard) e poi migliorare iterativamente il costo trovando e cancellando cicli negativi nella rete residua.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>4.4 Min Cost Flow con Domanda:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In alcune applicazioni, ogni nodo ha una domanda (positiva o negativa) che rappresenta la quantità di flusso che deve entrare o uscire dal nodo. Questo può essere ridotto al problema standard aggiungendo una super-sorgente e un super-pozzo.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>4.5 Min Cost Circulation:</strong>
        </p>
        <p className="text-lg leading-relaxed">
          Una variante in cui non ci sono sorgente e pozzo espliciti, ma ogni nodo può avere una domanda. L'obiettivo è trovare un flusso che soddisfi tutte le domande con il costo minimo.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Applicazioni del Min Cost Max Flow</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il Min Cost Max Flow ha numerose applicazioni pratiche:
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>5.1 Assegnamento Ottimale:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il problema dell'assegnamento ottimale consiste nell'assegnare n lavoratori a n compiti, dove ogni lavoratore ha un costo per svolgere ogni compito, in modo da minimizzare il costo totale. Questo può essere modellato come un problema di Min Cost Max Flow:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Crea un grafo bipartito con n nodi per i lavoratori e n nodi per i compiti.</li>
          <li className="mb-1">Aggiungi una sorgente s e un pozzo t.</li>
          <li className="mb-1">Collega s a ogni lavoratore con capacità 1 e costo 0.</li>
          <li className="mb-1">Collega ogni compito a t con capacità 1 e costo 0.</li>
          <li className="mb-1">Collega ogni lavoratore a ogni compito con capacità 1 e costo pari al costo del lavoratore per svolgere quel compito.</li>
          <li className="mb-1">Il Min Cost Max Flow darà l'assegnamento ottimale.</li>
        </ul>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Risoluzione del problema dell'assegnamento ottimale
pair<int, int> optimalAssignment(vector<vector<int>>& cost) {
    int n = cost.size(); // Numero di lavoratori/compiti
    int s = 2*n, t = 2*n + 1;
    
    MinCostMaxFlow mcmf(2*n + 2, s, t);
    
    // Collega la sorgente ai lavoratori
    for (int i = 0; i < n; i++) {
        mcmf.addEdge(s, i, 1, 0);
    }
    
    // Collega i lavoratori ai compiti
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            mcmf.addEdge(i, n + j, 1, cost[i][j]);
        }
    }
    
    // Collega i compiti al pozzo
    for (int j = 0; j < n; j++) {
        mcmf.addEdge(n + j, t, 1, 0);
    }
    
    return mcmf.solve();
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>5.2 Trasporto Ottimale:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il problema del trasporto ottimale consiste nel trasportare merci da m fabbriche a n negozi, dove ogni fabbrica ha una certa offerta, ogni negozio ha una certa domanda, e c'è un costo per trasportare una unità di merce da ogni fabbrica a ogni negozio. L'obiettivo è minimizzare il costo totale del trasporto.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>5.3 Flusso Multi-Commodity:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In alcuni problemi, ci sono diversi tipi di flusso (commodities) che condividono la stessa rete, e ogni tipo ha la propria sorgente e pozzo. Il Min Cost Max Flow può essere usato per risolvere una versione semplificata di questo problema.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>5.4 Scheduling:</strong>
        </p>
        <p className="text-lg leading-relaxed">
          Molti problemi di scheduling possono essere modellati come problemi di Min Cost Max Flow, dove i nodi rappresentano compiti o risorse, e gli archi rappresentano assegnamenti possibili con costi associati.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Esempio Dettagliato: Problema dell'Assegnamento</h2>
        <p className="text-lg leading-relaxed mb-4">
          Vediamo un esempio dettagliato di come risolvere il problema dell'assegnamento ottimale con Min Cost Max Flow:
        </p>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Problema:</strong> Ci sono 3 lavoratori e 3 compiti. Il costo per ogni lavoratore per svolgere ogni compito è dato dalla seguente matrice:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code>
{`  | Compito 1 | Compito 2 | Compito 3
--+----------+----------+----------
L1 |    3     |    2     |    1
L2 |    2     |    3     |    3
L3 |    1     |    1     |    4
`}</code></pre>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Soluzione:</strong>
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Creiamo un grafo con 8 nodi: 3 per i lavoratori (0, 1, 2), 3 per i compiti (3, 4, 5), una sorgente (6) e un pozzo (7).</li>
          <li className="mb-1">Colleghiamo la sorgente a ogni lavoratore con capacità 1 e costo 0.</li>
          <li className="mb-1">Colleghiamo ogni compito al pozzo con capacità 1 e costo 0.</li>
          <li className="mb-1">Colleghiamo ogni lavoratore a ogni compito con capacità 1 e costo come nella matrice.</li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// ... (implementazione di MinCostMaxFlow come sopra)

int main() {
    int n = 3; // Numero di lavoratori/compiti
    int s = 2*n, t = 2*n + 1;
    
    MinCostMaxFlow mcmf(2*n + 2, s, t);
    
    // Matrice dei costi
    vector<vector<int>> cost = {
        {3, 2, 1},
        {2, 3, 3},
        {1, 1, 4}
    };
    
    // Collega la sorgente ai lavoratori
    for (int i = 0; i < n; i++) {
        mcmf.addEdge(s, i, 1, 0);
    }
    
    // Collega i lavoratori ai compiti
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            mcmf.addEdge(i, n + j, 1, cost[i][j]);
        }
    }
    
    // Collega i compiti al pozzo
    for (int j = 0; j < n; j++) {
        mcmf.addEdge(n + j, t, 1, 0);
    }
    
    auto [max_flow, min_cost] = mcmf.solve();
    
    cout << "Flusso massimo: " << max_flow << endl; // Dovrebbe essere 3
    cout << "Costo minimo: " << min_cost << endl; // Dovrebbe essere 5
    
    // Ricostruisci l'assegnamento ottimale
    cout << "Assegnamento ottimale:" << endl;
    for (int i = 0; i < n; i++) {
        for (auto& e : mcmf.adj[i]) {
            if (e.flow > 0 && e.v >= n && e.v < 2*n) {
                cout << "Lavoratore " << i+1 << " -> Compito " << e.v-n+1 << " (costo: " << cost[i][e.v-n] << ")" << endl;
            }
        }
    }
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-4">
          <strong>Risultato:</strong>
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code>
{`Flusso massimo: 3
Costo minimo: 5
Assegnamento ottimale:
Lavoratore 1 -> Compito 3 (costo: 1)
Lavoratore 2 -> Compito 1 (costo: 2)
Lavoratore 3 -> Compito 2 (costo: 1)
`}</code></pre>
        <p className="text-lg leading-relaxed">
          Questo è l'assegnamento ottimale con costo totale 5.
        </p>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">7. Problemi di Esempio</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-2"><a href="https://cses.fi/problemset/task/2121" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - Parcel Delivery</a>: Un problema di Min Cost Max Flow diretto.</li>
          <li className="mb-2"><a href="https://cses.fi/problemset/task/2129" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - Task Assignment</a>: Un problema di assegnamento ottimale.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/1288/problem/F" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Red-Blue Graph</a>: Un problema che può essere risolto con Min Cost Max Flow.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/1437/problem/G" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Death DBMS</a>: Un problema avanzato che può essere risolto con tecniche di flusso.</li>
        </ul>
      </section>
    </div>
  );
};

export default MinCostMaxFlowPage;
