import React from 'react';

const FlowsIntroductionPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Introduzione ai Flussi (Livello Platinum)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione ai Problemi di Flusso</h2>
        <p className="text-lg leading-relaxed mb-4">
          I problemi di flusso sono una classe importante di problemi nella teoria dei grafi che modellano il movimento di un "flusso" (come acqua, elettricità, dati, traffico) attraverso una rete. Questi problemi hanno numerose applicazioni pratiche e sono fondamentali nella programmazione competitiva di livello avanzato.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In questa lezione, esploreremo:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Concetti fondamentali dei problemi di flusso</li>
          <li className="mb-1">Algoritmo di Ford-Fulkerson e metodo di Edmonds-Karp</li>
          <li className="mb-1">Algoritmo di Dinic</li>
          <li className="mb-1">Applicazioni dei problemi di flusso</li>
        </ul>
        <p className="text-lg leading-relaxed">
          I problemi di flusso sono particolarmente potenti perché molti problemi apparentemente non correlati possono essere ridotti a problemi di flusso e risolti utilizzando algoritmi efficienti.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Concetti Fondamentali</h2>
        <p className="text-lg leading-relaxed mb-4">
          Prima di addentrarci negli algoritmi, è importante comprendere alcuni concetti fondamentali dei problemi di flusso:
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>2.1 Rete di Flusso:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Una rete di flusso è un grafo diretto dove:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Ogni arco ha una capacità non negativa c(u, v) che rappresenta la quantità massima di flusso che può passare attraverso quell'arco.</li>
          <li className="mb-1">Ci sono due nodi speciali: la sorgente (s) e il pozzo (t).</li>
          <li className="mb-1">Il flusso inizia dalla sorgente e termina nel pozzo.</li>
        </ul>
        <p className="text-lg leading-relaxed mb-2">
          <strong>2.2 Flusso:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Un flusso è un'assegnazione di valori f(u, v) a ogni arco (u, v) che soddisfa le seguenti proprietà:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1"><strong>Vincolo di Capacità:</strong> 0 ≤ f(u, v) ≤ c(u, v) per ogni arco (u, v).</li>
          <li className="mb-1"><strong>Conservazione del Flusso:</strong> Per ogni nodo v diverso da s e t, la somma del flusso entrante è uguale alla somma del flusso uscente.</li>
        </ul>
        <p className="text-lg leading-relaxed mb-2">
          <strong>2.3 Flusso Massimo:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il problema del flusso massimo consiste nel trovare un flusso che massimizzi la quantità totale di flusso dalla sorgente al pozzo.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>2.4 Rete Residua:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          La rete residua Gf è un grafo che rappresenta la capacità residua di ogni arco dopo aver assegnato un flusso f. Per ogni arco (u, v) con capacità c(u, v) e flusso f(u, v):
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Se f(u, v) < c(u, v), allora Gf contiene un arco in avanti (u, v) con capacità residua c(u, v) - f(u, v).</li>
          <li className="mb-1">Se f(u, v) > 0, allora Gf contiene un arco all'indietro (v, u) con capacità residua f(u, v).</li>
        </ul>
        <p className="text-lg leading-relaxed mb-2">
          <strong>2.5 Cammino Aumentante:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Un cammino aumentante è un cammino dalla sorgente al pozzo nella rete residua. L'esistenza di un cammino aumentante indica che il flusso può essere aumentato.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>2.6 Taglio:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Un taglio (S, T) è una partizione dei nodi in due insiemi S e T tali che s ∈ S e t ∈ T. La capacità di un taglio è la somma delle capacità degli archi che vanno da S a T.
        </p>
        <p className="text-lg leading-relaxed">
          Il teorema del flusso massimo e taglio minimo afferma che il valore del flusso massimo è uguale alla capacità del taglio minimo.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Algoritmo di Ford-Fulkerson</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo di Ford-Fulkerson è un metodo iterativo per trovare il flusso massimo in una rete di flusso. L'idea di base è:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Inizializza il flusso a zero per tutti gli archi.</li>
          <li className="mb-1">Finché esiste un cammino aumentante nella rete residua:
            <ul className="list-disc list-inside ml-8 mt-1">
              <li>Trova un cammino aumentante.</li>
              <li>Calcola la capacità residua minima lungo il cammino.</li>
              <li>Aumenta il flusso lungo il cammino di questa quantità.</li>
            </ul>
          </li>
        </ol>
        <p className="text-lg leading-relaxed mb-4">
          Il metodo di Edmonds-Karp è un'implementazione specifica dell'algoritmo di Ford-Fulkerson che utilizza la BFS per trovare il cammino aumentante più corto in termini di numero di archi.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int INF = 1e9;

// Algoritmo di Edmonds-Karp per il flusso massimo
int edmondsKarp(vector<vector<int>>& capacity, int s, int t) {
    int n = capacity.size();
    vector<vector<int>> flow(n, vector<int>(n, 0));
    int max_flow = 0;
    
    while (true) {
        // Trova un cammino aumentante usando BFS
        vector<int> parent(n, -1);
        queue<pair<int, int>> q;
        q.push({s, INF});
        parent[s] = -2; // Marcatore speciale per la sorgente
        
        while (!q.empty() && parent[t] == -1) {
            int u = q.front().first;
            int flow_so_far = q.front().second;
            q.pop();
            
            for (int v = 0; v < n; v++) {
                if (parent[v] == -1 && capacity[u][v] - flow[u][v] > 0) {
                    parent[v] = u;
                    int new_flow = min(flow_so_far, capacity[u][v] - flow[u][v]);
                    if (v == t) {
                        // Abbiamo raggiunto il pozzo
                        max_flow += new_flow;
                        
                        // Aggiorna il flusso lungo il cammino
                        int curr = t;
                        while (curr != s) {
                            int prev = parent[curr];
                            flow[prev][curr] += new_flow;
                            flow[curr][prev] -= new_flow; // Flusso inverso
                            curr = prev;
                        }
                        
                        break;
                    }
                    q.push({v, new_flow});
                }
            }
        }
        
        // Se non abbiamo trovato un cammino aumentante, abbiamo finito
        if (parent[t] == -1) break;
    }
    
    return max_flow;
}

// Esempio di utilizzo
int main() {
    int n = 6; // Numero di nodi
    
    // Matrice di capacità
    vector<vector<int>> capacity = {
        {0, 16, 13, 0, 0, 0},
        {0, 0, 10, 12, 0, 0},
        {0, 4, 0, 0, 14, 0},
        {0, 0, 9, 0, 0, 20},
        {0, 0, 0, 7, 0, 4},
        {0, 0, 0, 0, 0, 0}
    };
    
    int s = 0; // Sorgente
    int t = 5; // Pozzo
    
    int max_flow = edmondsKarp(capacity, s, t);
    
    cout << "Il flusso massimo è: " << max_flow << endl;
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Tempo: O(V * E²), dove V è il numero di nodi e E è il numero di archi</li>
          <li className="mb-1">Spazio: O(V²) per la rappresentazione a matrice di adiacenza</li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Algoritmo di Dinic</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo di Dinic è un'ottimizzazione dell'algoritmo di Ford-Fulkerson che utilizza due concetti chiave:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1"><strong>Grafo a Livelli:</strong> Un grafo a livelli è un sottografo della rete residua dove ogni nodo è etichettato con un livello che rappresenta la distanza minima dalla sorgente.</li>
          <li className="mb-1"><strong>Cammini Bloccanti:</strong> Un cammino bloccante è un cammino dalla sorgente al pozzo nel grafo a livelli dove tutti gli archi sono saturi (cioè, non possono trasportare più flusso).</li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo di Dinic funziona in fasi:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Costruisci il grafo a livelli usando BFS.</li>
          <li className="mb-1">Finché esistono cammini bloccanti nel grafo a livelli:
            <ul className="list-disc list-inside ml-8 mt-1">
              <li>Trova un cammino bloccante usando DFS.</li>
              <li>Aumenta il flusso lungo il cammino.</li>
            </ul>
          </li>
          <li className="mb-1">Se non ci sono più cammini bloccanti, torna al passo 1 e costruisci un nuovo grafo a livelli.</li>
          <li className="mb-1">Se non è possibile costruire un grafo a livelli che raggiunga il pozzo, termina l'algoritmo.</li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int INF = 1e9;

// Algoritmo di Dinic per il flusso massimo
class Dinic {
private:
    int n, s, t;
    vector<vector<int>> capacity, flow;
    vector<int> level, ptr;
    
    // Costruisce il grafo a livelli
    bool bfs() {
        fill(level.begin(), level.end(), -1);
        level[s] = 0;
        queue<int> q;
        q.push(s);
        
        while (!q.empty() && level[t] == -1) {
            int u = q.front();
            q.pop();
            
            for (int v = 0; v < n; v++) {
                if (level[v] == -1 && capacity[u][v] - flow[u][v] > 0) {
                    level[v] = level[u] + 1;
                    q.push(v);
                }
            }
        }
        
        return level[t] != -1;
    }
    
    // Trova un cammino bloccante usando DFS
    int dfs(int u, int flow_so_far) {
        if (u == t || flow_so_far == 0) return flow_so_far;
        
        for (int& i = ptr[u]; i < n; i++) {
            int v = i;
            if (level[v] == level[u] + 1 && capacity[u][v] - flow[u][v] > 0) {
                int curr_flow = min(flow_so_far, capacity[u][v] - flow[u][v]);
                int bottleneck = dfs(v, curr_flow);
                
                if (bottleneck > 0) {
                    flow[u][v] += bottleneck;
                    flow[v][u] -= bottleneck;
                    return bottleneck;
                }
            }
        }
        
        return 0;
    }
    
public:
    Dinic(int n, int s, int t) : n(n), s(s), t(t) {
        capacity.assign(n, vector<int>(n, 0));
        flow.assign(n, vector<int>(n, 0));
        level.resize(n);
        ptr.resize(n);
    }
    
    void addEdge(int u, int v, int cap) {
        capacity[u][v] = cap;
    }
    
    int maxFlow() {
        int total_flow = 0;
        
        while (bfs()) {
            fill(ptr.begin(), ptr.end(), 0);
            while (int curr_flow = dfs(s, INF)) {
                total_flow += curr_flow;
            }
        }
        
        return total_flow;
    }
};

// Esempio di utilizzo
int main() {
    int n = 6; // Numero di nodi
    int s = 0; // Sorgente
    int t = 5; // Pozzo
    
    Dinic dinic(n, s, t);
    
    // Aggiungi archi
    dinic.addEdge(0, 1, 16);
    dinic.addEdge(0, 2, 13);
    dinic.addEdge(1, 2, 10);
    dinic.addEdge(1, 3, 12);
    dinic.addEdge(2, 1, 4);
    dinic.addEdge(2, 4, 14);
    dinic.addEdge(3, 2, 9);
    dinic.addEdge(3, 5, 20);
    dinic.addEdge(4, 3, 7);
    dinic.addEdge(4, 5, 4);
    
    int max_flow = dinic.maxFlow();
    
    cout << "Il flusso massimo è: " << max_flow << endl;
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Tempo: O(V² * E) nel caso generale, ma può essere molto più veloce in pratica</li>
          <li className="mb-1">Spazio: O(V²) per la rappresentazione a matrice di adiacenza</li>
        </ul>
        <p className="text-lg leading-relaxed">
          L'algoritmo di Dinic è significativamente più veloce dell'algoritmo di Edmonds-Karp nella pratica e può essere ulteriormente ottimizzato per casi specifici.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Implementazione con Lista di Adiacenza</h2>
        <p className="text-lg leading-relaxed mb-4">
          Le implementazioni precedenti utilizzano una matrice di adiacenza per rappresentare il grafo, che è semplice ma inefficiente per grafi sparsi. Un'implementazione più efficiente utilizza una lista di adiacenza con archi espliciti:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int INF = 1e9;

// Implementazione di Dinic con lista di adiacenza
class Dinic {
private:
    struct Edge {
        int v, rev, cap, flow;
        Edge(int v, int rev, int cap) : v(v), rev(rev), cap(cap), flow(0) {}
    };
    
    int n, s, t;
    vector<vector<Edge>> adj;
    vector<int> level, ptr;
    
    // Costruisce il grafo a livelli
    bool bfs() {
        fill(level.begin(), level.end(), -1);
        level[s] = 0;
        queue<int> q;
        q.push(s);
        
        while (!q.empty() && level[t] == -1) {
            int u = q.front();
            q.pop();
            
            for (auto& e : adj[u]) {
                if (level[e.v] == -1 && e.cap - e.flow > 0) {
                    level[e.v] = level[u] + 1;
                    q.push(e.v);
                }
            }
        }
        
        return level[t] != -1;
    }
    
    // Trova un cammino bloccante usando DFS
    int dfs(int u, int flow_so_far) {
        if (u == t || flow_so_far == 0) return flow_so_far;
        
        for (int& i = ptr[u]; i < adj[u].size(); i++) {
            Edge& e = adj[u][i];
            
            if (level[e.v] == level[u] + 1 && e.cap - e.flow > 0) {
                int curr_flow = min(flow_so_far, e.cap - e.flow);
                int bottleneck = dfs(e.v, curr_flow);
                
                if (bottleneck > 0) {
                    e.flow += bottleneck;
                    adj[e.v][e.rev].flow -= bottleneck;
                    return bottleneck;
                }
            }
        }
        
        return 0;
    }
    
public:
    Dinic(int n, int s, int t) : n(n), s(s), t(t) {
        adj.resize(n);
        level.resize(n);
        ptr.resize(n);
    }
    
    void addEdge(int u, int v, int cap) {
        adj[u].push_back(Edge(v, adj[v].size(), cap));
        adj[v].push_back(Edge(u, adj[u].size() - 1, 0)); // Arco inverso
    }
    
    int maxFlow() {
        int total_flow = 0;
        
        while (bfs()) {
            fill(ptr.begin(), ptr.end(), 0);
            while (int curr_flow = dfs(s, INF)) {
                total_flow += curr_flow;
            }
        }
        
        return total_flow;
    }
};

// Esempio di utilizzo
int main() {
    int n = 6; // Numero di nodi
    int s = 0; // Sorgente
    int t = 5; // Pozzo
    
    Dinic dinic(n, s, t);
    
    // Aggiungi archi
    dinic.addEdge(0, 1, 16);
    dinic.addEdge(0, 2, 13);
    dinic.addEdge(1, 2, 10);
    dinic.addEdge(1, 3, 12);
    dinic.addEdge(2, 1, 4);
    dinic.addEdge(2, 4, 14);
    dinic.addEdge(3, 2, 9);
    dinic.addEdge(3, 5, 20);
    dinic.addEdge(4, 3, 7);
    dinic.addEdge(4, 5, 4);
    
    int max_flow = dinic.maxFlow();
    
    cout << "Il flusso massimo è: " << max_flow << endl;
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Tempo: O(V² * E) nel caso generale, ma può essere molto più veloce in pratica</li>
          <li className="mb-1">Spazio: O(V + E) per la rappresentazione a lista di adiacenza</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Questa implementazione è più efficiente in termini di memoria e spesso più veloce per grafi sparsi.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Applicazioni dei Problemi di Flusso</h2>
        <p className="text-lg leading-relaxed mb-4">
          I problemi di flusso hanno numerose applicazioni pratiche e teoriche:
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>6.1 Bipartite Matching:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il problema del matching bipartito massimo può essere ridotto a un problema di flusso massimo:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Crea un grafo con una sorgente s e un pozzo t.</li>
          <li className="mb-1">Collega s a tutti i nodi del primo insieme con capacità 1.</li>
          <li className="mb-1">Collega tutti i nodi del secondo insieme a t con capacità 1.</li>
          <li className="mb-1">Collega i nodi del primo insieme ai nodi del secondo insieme con capacità 1 se c'è un arco nel grafo bipartito originale.</li>
          <li className="mb-1">Il flusso massimo corrisponde al matching massimo.</li>
        </ul>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Risoluzione del problema di matching bipartito usando Dinic
int bipartiteMatching(int n, int m, vector<vector<int>>& graph) {
    int s = 0, t = n + m + 1;
    Dinic dinic(n + m + 2, s, t);
    
    // Collega la sorgente ai nodi del primo insieme
    for (int i = 1; i <= n; i++) {
        dinic.addEdge(s, i, 1);
    }
    
    // Collega i nodi del primo insieme ai nodi del secondo insieme
    for (int i = 1; i <= n; i++) {
        for (int j : graph[i]) {
            dinic.addEdge(i, n + j, 1);
        }
    }
    
    // Collega i nodi del secondo insieme al pozzo
    for (int j = 1; j <= m; j++) {
        dinic.addEdge(n + j, t, 1);
    }
    
    return dinic.maxFlow();
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>6.2 Vertex Cover in Bipartite Graphs:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il teorema di König afferma che in un grafo bipartito, la dimensione del matching massimo è uguale alla dimensione del vertex cover minimo. Possiamo trovare un vertex cover minimo usando il flusso massimo e il taglio minimo.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>6.3 Edge-Disjoint Paths:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il problema di trovare il massimo numero di cammini edge-disjoint (cioè, cammini che non condividono archi) tra due nodi può essere risolto assegnando capacità 1 a ogni arco e trovando il flusso massimo.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>6.4 Problemi di Assegnazione:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Molti problemi di assegnazione (ad esempio, assegnare lavoratori a compiti) possono essere modellati come problemi di flusso con costi.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>6.5 Problemi di Taglio:</strong>
        </p>
        <p className="text-lg leading-relaxed">
          Il problema del taglio minimo (trovare un taglio di capacità minima) è duale al problema del flusso massimo e può essere risolto trovando il flusso massimo.
        </p>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">7. Problemi di Esempio</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-2"><a href="https://cses.fi/problemset/task/1694" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - Download Speed</a>: Un problema di flusso massimo diretto.</li>
          <li className="mb-2"><a href="https://cses.fi/problemset/task/1696" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - School Dance</a>: Un problema di matching bipartito che può essere risolto con flusso massimo.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/1082/problem/G" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Petya and Graph</a>: Un problema che richiede di modellare un problema di taglio minimo.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/1404/problem/E" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Bricks</a>: Un problema che può essere risolto con flusso massimo.</li>
        </ul>
      </section>
    </div>
  );
};

export default FlowsIntroductionPage;
