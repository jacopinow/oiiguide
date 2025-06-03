import React from 'react';

const StronglyConnectedComponentsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Componenti Fortemente Connesse (SCC) (Livello Platinum)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione alle Componenti Fortemente Connesse</h2>
        <p className="text-lg leading-relaxed mb-4">
          In un grafo diretto, una componente fortemente connessa (SCC, Strongly Connected Component) è un sottoinsieme massimale di nodi tale che per ogni coppia di nodi u e v nella componente, esiste un cammino da u a v e un cammino da v a u. In altre parole, ogni nodo nella componente è raggiungibile da ogni altro nodo nella stessa componente.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Le componenti fortemente connesse sono un concetto fondamentale nella teoria dei grafi e hanno numerose applicazioni, tra cui:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Analisi di dipendenze circolari</li>
          <li className="mb-1">Risoluzione di sistemi di equazioni</li>
          <li className="mb-1">Analisi di reti sociali e web</li>
          <li className="mb-1">Risoluzione di problemi di soddisfacibilità (2-SAT)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          In questa lezione, esploreremo algoritmi efficienti per trovare le componenti fortemente connesse in un grafo diretto e vedremo alcune delle loro applicazioni.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Algoritmo di Kosaraju</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo di Kosaraju è uno degli algoritmi più semplici per trovare le componenti fortemente connesse in un grafo diretto. L'algoritmo funziona in due passaggi:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Esegui una DFS sul grafo originale e memorizza i nodi in ordine di fine visita (ordine topologico inverso).</li>
          <li className="mb-1">Esegui una DFS sul grafo trasposto (cioè, il grafo con tutti gli archi invertiti) seguendo l'ordine dei nodi trovato nel passaggio 1. Ogni albero DFS formato in questo passaggio è una componente fortemente connessa.</li>
        </ol>
        <p className="text-lg leading-relaxed mb-4">
          L'intuizione dietro l'algoritmo è che se eseguiamo una DFS a partire da un nodo in una componente fortemente connessa, possiamo raggiungere tutti i nodi nella stessa componente. Inoltre, l'ordine topologico inverso garantisce che iniziamo la seconda DFS da nodi che sono "più a valle" nel grafo, il che ci permette di identificare correttamente le componenti.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Algoritmo di Kosaraju per trovare le componenti fortemente connesse
vector<vector<int>> kosaraju(int n, vector<vector<int>>& adj) {
    vector<vector<int>> adj_rev(n); // Grafo trasposto
    
    // Costruisci il grafo trasposto
    for (int u = 0; u < n; u++) {
        for (int v : adj[u]) {
            adj_rev[v].push_back(u);
        }
    }
    
    vector<bool> visited(n, false);
    vector<int> order; // Ordine di fine visita
    
    // Prima DFS per ottenere l'ordine topologico inverso
    function<void(int)> dfs1 = [&](int u) {
        visited[u] = true;
        for (int v : adj[u]) {
            if (!visited[v]) {
                dfs1(v);
            }
        }
        order.push_back(u);
    };
    
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs1(i);
        }
    }
    
    reverse(order.begin(), order.end()); // Inverti l'ordine
    
    // Seconda DFS sul grafo trasposto
    visited.assign(n, false);
    vector<vector<int>> scc;
    
    function<void(int, vector<int>&)> dfs2 = [&](int u, vector<int>& component) {
        visited[u] = true;
        component.push_back(u);
        for (int v : adj_rev[u]) {
            if (!visited[v]) {
                dfs2(v, component);
            }
        }
    };
    
    for (int u : order) {
        if (!visited[u]) {
            vector<int> component;
            dfs2(u, component);
            scc.push_back(component);
        }
    }
    
    return scc;
}

// Esempio di utilizzo
int main() {
    int n = 8; // Numero di nodi
    vector<vector<int>> adj(n);
    
    // Aggiungi archi
    adj[0].push_back(1);
    adj[1].push_back(2);
    adj[2].push_back(0);
    adj[2].push_back(3);
    adj[3].push_back(4);
    adj[4].push_back(5);
    adj[5].push_back(3);
    adj[6].push_back(5);
    adj[6].push_back(7);
    adj[7].push_back(6);
    
    vector<vector<int>> scc = kosaraju(n, adj);
    
    cout << "Componenti fortemente connesse:" << endl;
    for (int i = 0; i < scc.size(); i++) {
        cout << "Componente " << i+1 << ": ";
        for (int u : scc[i]) {
            cout << u << " ";
        }
        cout << endl;
    }
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Tempo: O(V + E), dove V è il numero di nodi e E è il numero di archi</li>
          <li className="mb-1">Spazio: O(V + E)</li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Algoritmo di Tarjan</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo di Tarjan è un altro algoritmo efficiente per trovare le componenti fortemente connesse, che utilizza una singola DFS. L'algoritmo si basa sul concetto di "lowlink", che è il nodo più antico (in termini di ordine di visita DFS) che può essere raggiunto da un nodo attraverso gli archi dell'albero DFS e al massimo un arco all'indietro.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo utilizza uno stack per tenere traccia dei nodi che potrebbero formare una componente fortemente connessa. Un nodo è la radice di una componente fortemente connessa se il suo lowlink è uguale al suo indice di visita.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Algoritmo di Tarjan per trovare le componenti fortemente connesse
vector<vector<int>> tarjan(int n, vector<vector<int>>& adj) {
    vector<int> disc(n, -1); // Tempo di scoperta
    vector<int> low(n, -1); // Lowlink
    vector<bool> in_stack(n, false);
    stack<int> st;
    vector<vector<int>> scc;
    int time = 0;
    
    function<void(int)> dfs = [&](int u) {
        disc[u] = low[u] = time++;
        st.push(u);
        in_stack[u] = true;
        
        for (int v : adj[u]) {
            if (disc[v] == -1) {
                // v non è ancora stato visitato
                dfs(v);
                low[u] = min(low[u], low[v]);
            } else if (in_stack[v]) {
                // v è nello stack, quindi è un arco all'indietro
                low[u] = min(low[u], disc[v]);
            }
        }
        
        // Se u è la radice di una SCC
        if (low[u] == disc[u]) {
            vector<int> component;
            int v;
            do {
                v = st.top();
                st.pop();
                in_stack[v] = false;
                component.push_back(v);
            } while (v != u);
            
            scc.push_back(component);
        }
    };
    
    for (int i = 0; i < n; i++) {
        if (disc[i] == -1) {
            dfs(i);
        }
    }
    
    return scc;
}

// Esempio di utilizzo
int main() {
    int n = 8; // Numero di nodi
    vector<vector<int>> adj(n);
    
    // Aggiungi archi
    adj[0].push_back(1);
    adj[1].push_back(2);
    adj[2].push_back(0);
    adj[2].push_back(3);
    adj[3].push_back(4);
    adj[4].push_back(5);
    adj[5].push_back(3);
    adj[6].push_back(5);
    adj[6].push_back(7);
    adj[7].push_back(6);
    
    vector<vector<int>> scc = tarjan(n, adj);
    
    cout << "Componenti fortemente connesse:" << endl;
    for (int i = 0; i < scc.size(); i++) {
        cout << "Componente " << i+1 << ": ";
        for (int u : scc[i]) {
            cout << u << " ";
        }
        cout << endl;
    }
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Tempo: O(V + E), dove V è il numero di nodi e E è il numero di archi</li>
          <li className="mb-1">Spazio: O(V)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          L'algoritmo di Tarjan è generalmente preferito all'algoritmo di Kosaraju nella pratica, poiché richiede una sola DFS e non necessita di costruire il grafo trasposto.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Grafo delle Componenti</h2>
        <p className="text-lg leading-relaxed mb-4">
          Una volta trovate le componenti fortemente connesse, possiamo costruire il grafo delle componenti (o grafo condensato), dove ogni componente fortemente connessa è rappresentata da un singolo nodo, e c'è un arco da una componente A a una componente B se esiste almeno un arco da un nodo in A a un nodo in B nel grafo originale.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il grafo delle componenti è un grafo diretto aciclico (DAG), il che lo rende più semplice da analizzare rispetto al grafo originale.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Costruzione del grafo delle componenti
pair<vector<int>, vector<vector<int>>> buildComponentGraph(int n, vector<vector<int>>& adj, vector<vector<int>>& scc) {
    int num_scc = scc.size();
    vector<int> component(n); // Mappa ogni nodo alla sua componente
    
    // Assegna ogni nodo alla sua componente
    for (int i = 0; i < num_scc; i++) {
        for (int u : scc[i]) {
            component[u] = i;
        }
    }
    
    // Costruisci il grafo delle componenti
    vector<vector<int>> comp_graph(num_scc);
    vector<bool> added(num_scc * num_scc, false); // Per evitare archi duplicati
    
    for (int u = 0; u < n; u++) {
        int comp_u = component[u];
        for (int v : adj[u]) {
            int comp_v = component[v];
            if (comp_u != comp_v && !added[comp_u * num_scc + comp_v]) {
                comp_graph[comp_u].push_back(comp_v);
                added[comp_u * num_scc + comp_v] = true;
            }
        }
    }
    
    return {component, comp_graph};
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Applicazioni del Grafo delle Componenti:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-2"><strong>Ordinamento Topologico:</strong> Il grafo delle componenti è un DAG, quindi possiamo trovare un ordinamento topologico delle componenti.</li>
          <li className="mb-2"><strong>Cammino Più Lungo:</strong> Possiamo trovare il cammino più lungo nel grafo delle componenti, che può essere utile in problemi di scheduling.</li>
          <li className="mb-2"><strong>Analisi di Raggiungibilità:</strong> Possiamo determinare quali componenti sono raggiungibili da quali altre componenti.</li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Applicazioni delle Componenti Fortemente Connesse</h2>
        <p className="text-lg leading-relaxed mb-4">
          Le componenti fortemente connesse hanno numerose applicazioni nella risoluzione di problemi algoritmici.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>5.1 Risoluzione di 2-SAT:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il problema 2-SAT (2-Satisfiability) consiste nel determinare se esiste un'assegnazione di valori di verità a variabili booleane che soddisfi una formula in forma normale congiuntiva dove ogni clausola contiene esattamente due letterali.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il problema 2-SAT può essere risolto in tempo lineare utilizzando le componenti fortemente connesse:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Per ogni variabile x, crea due nodi: uno per x e uno per ¬x.</li>
          <li className="mb-1">Per ogni clausola (a ∨ b), aggiungi gli archi (¬a → b) e (¬b → a), che rappresentano le implicazioni logiche ¬a ⇒ b e ¬b ⇒ a.</li>
          <li className="mb-1">Trova le componenti fortemente connesse del grafo.</li>
          <li className="mb-1">Se una variabile x e la sua negazione ¬x sono nella stessa componente, allora la formula non è soddisfacibile.</li>
          <li className="mb-1">Altrimenti, la formula è soddisfacibile, e possiamo costruire un'assegnazione valida utilizzando l'ordinamento topologico delle componenti.</li>
        </ol>
        <p className="text-lg leading-relaxed mb-2">
          <strong>5.2 Cicli in Grafi Diretti:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Le componenti fortemente connesse possono essere utilizzate per trovare cicli in grafi diretti. Se una componente contiene più di un nodo o un nodo con un auto-ciclo, allora contiene un ciclo.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>5.3 Condensazione di Grafi:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          La condensazione di un grafo (cioè, la costruzione del grafo delle componenti) è utile per semplificare l'analisi di grafi complessi, poiché il grafo condensato è un DAG.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>5.4 Analisi di Dipendenze Circolari:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In sistemi con dipendenze, le componenti fortemente connesse rappresentano gruppi di elementi che dipendono circolarmente l'uno dall'altro. Identificare queste componenti può aiutare a risolvere problemi di deadlock o a ottimizzare l'ordine di elaborazione.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Esempio Dettagliato: Risoluzione di 2-SAT</h2>
        <p className="text-lg leading-relaxed mb-4">
          Vediamo un esempio dettagliato di come risolvere un problema 2-SAT utilizzando le componenti fortemente connesse.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Problema:</strong> Dato un insieme di clausole, ognuna contenente due letterali, determinare se esiste un'assegnazione di valori di verità che soddisfi tutte le clausole.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Esempio:</strong> Consideriamo la formula (x₁ ∨ x₂) ∧ (¬x₁ ∨ x₃) ∧ (¬x₂ ∨ ¬x₃) ∧ (x₃ ∨ x₄) ∧ (¬x₃ ∨ ¬x₄).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Soluzione:</strong>
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Creiamo un grafo con 2n nodi, dove n è il numero di variabili. I nodi 0, 1, ..., n-1 rappresentano le variabili x₁, x₂, ..., xₙ, e i nodi n, n+1, ..., 2n-1 rappresentano le negazioni ¬x₁, ¬x₂, ..., ¬xₙ.</li>
          <li className="mb-1">Per ogni clausola (a ∨ b), aggiungiamo gli archi (¬a → b) e (¬b → a).</li>
          <li className="mb-1">Troviamo le componenti fortemente connesse del grafo.</li>
          <li className="mb-1">Verifichiamo se una variabile e la sua negazione sono nella stessa componente.</li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Risoluzione di 2-SAT utilizzando le componenti fortemente connesse
pair<bool, vector<bool>> solve2SAT(int n, vector<pair<int, int>>& clauses) {
    // Costruisci il grafo delle implicazioni
    vector<vector<int>> adj(2*n);
    
    for (auto& clause : clauses) {
        int a = clause.first;
        int b = clause.second;
        
        // Converti i letterali in indici di nodi
        // Se a < 0, rappresenta ¬x_{-a}, altrimenti rappresenta x_a
        // Utilizziamo 2*|a|-1 per ¬x_a e 2*|a|-2 per x_a
        int u = abs(a) - 1;
        int v = abs(b) - 1;
        
        if (a < 0) u += n;
        if (b < 0) v += n;
        
        // (a ∨ b) è equivalente a (¬a → b) ∧ (¬b → a)
        adj[(u + n) % (2*n)].push_back(v);
        adj[(v + n) % (2*n)].push_back(u);
    }
    
    // Trova le componenti fortemente connesse
    vector<vector<int>> scc = tarjan(2*n, adj);
    
    // Verifica se una variabile e la sua negazione sono nella stessa componente
    vector<int> component(2*n);
    for (int i = 0; i < scc.size(); i++) {
        for (int u : scc[i]) {
            component[u] = i;
        }
    }
    
    for (int i = 0; i < n; i++) {
        if (component[i] == component[i + n]) {
            // La formula non è soddisfacibile
            return {false, {}};
        }
    }
    
    // La formula è soddisfacibile
    // Costruisci un'assegnazione valida
    vector<bool> assignment(n);
    
    // Ordina le componenti topologicamente
    vector<int> topo_order(2*n);
    for (int i = 0; i < 2*n; i++) {
        topo_order[i] = i;
    }
    
    sort(topo_order.begin(), topo_order.end(), [&](int u, int v) {
        return component[u] > component[v];
    });
    
    // Assegna i valori di verità
    vector<bool> assigned(n, false);
    for (int u : topo_order) {
        if (u < n) {
            // u rappresenta x_{u+1}
            if (!assigned[u]) {
                assignment[u] = true;
                assigned[u] = true;
            }
        } else {
            // u rappresenta ¬x_{u-n+1}
            if (!assigned[u - n]) {
                assignment[u - n] = false;
                assigned[u - n] = true;
            }
        }
    }
    
    return {true, assignment};
}

// Esempio di utilizzo
int main() {
    int n = 4; // Numero di variabili
    
    // Clausole: (x₁ ∨ x₂) ∧ (¬x₁ ∨ x₃) ∧ (¬x₂ ∨ ¬x₃) ∧ (x₃ ∨ x₄) ∧ (¬x₃ ∨ ¬x₄)
    vector<pair<int, int>> clauses = {
        {1, 2},
        {-1, 3},
        {-2, -3},
        {3, 4},
        {-3, -4}
    };
    
    auto [satisfiable, assignment] = solve2SAT(n, clauses);
    
    if (satisfiable) {
        cout << "La formula è soddisfacibile." << endl;
        cout << "Assegnazione: ";
        for (int i = 0; i < n; i++) {
            cout << "x" << i+1 << " = " << assignment[i] << ", ";
        }
        cout << endl;
    } else {
        cout << "La formula non è soddisfacibile." << endl;
    }
    
    return 0;
}
`}</code></pre>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">7. Problemi di Esempio</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-2"><a href="https://cses.fi/problemset/task/1682" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - Flight Routes Check</a>: Un problema che richiede di verificare se un grafo è fortemente connesso.</li>
          <li className="mb-2"><a href="https://cses.fi/problemset/task/1683" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - Planets and Kingdoms</a>: Un problema che richiede di trovare le componenti fortemente connesse.</li>
          <li className="mb-2"><a href="https://cses.fi/problemset/task/1684" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - Giant Pizza</a>: Un problema 2-SAT.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/427/problem/C" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Checkposts</a>: Un problema che utilizza le componenti fortemente connesse.</li>
        </ul>
      </section>
    </div>
  );
};

export default StronglyConnectedComponentsPage;
