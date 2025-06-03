import React from 'react';

const TwoSatPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">2-SAT (Livello Platinum)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione al Problema 2-SAT</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il problema 2-SAT (2-Satisfiability) è un caso speciale del problema di soddisfacibilità booleana (SAT) in cui ogni clausola contiene esattamente due letterali. Un letterale è una variabile booleana o la sua negazione.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Formalmente, dato un insieme di variabili booleane x₁, x₂, ..., xₙ e un insieme di clausole, ognuna nella forma (a ∨ b) dove a e b sono letterali, il problema 2-SAT consiste nel determinare se esiste un'assegnazione di valori di verità alle variabili che soddisfi tutte le clausole.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          A differenza del problema SAT generale, che è NP-completo, il problema 2-SAT può essere risolto in tempo lineare utilizzando le componenti fortemente connesse di un grafo di implicazioni.
        </p>
        <p className="text-lg leading-relaxed">
          In questa lezione, esploreremo in dettaglio come risolvere il problema 2-SAT e vedremo alcune delle sue applicazioni pratiche.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Grafo delle Implicazioni</h2>
        <p className="text-lg leading-relaxed mb-4">
          La chiave per risolvere il problema 2-SAT è costruire un grafo delle implicazioni. Ogni clausola (a ∨ b) può essere riscritta come due implicazioni logiche: (¬a ⇒ b) e (¬b ⇒ a). Queste implicazioni formano gli archi del grafo.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Per costruire il grafo delle implicazioni:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Crea 2n nodi, dove n è il numero di variabili. I nodi 0, 1, ..., n-1 rappresentano le variabili x₁, x₂, ..., xₙ, e i nodi n, n+1, ..., 2n-1 rappresentano le negazioni ¬x₁, ¬x₂, ..., ¬xₙ.</li>
          <li className="mb-1">Per ogni clausola (a ∨ b), aggiungi due archi diretti:
            <ul className="list-disc list-inside ml-8 mt-1">
              <li>Un arco da ¬a a b, rappresentando l'implicazione ¬a ⇒ b.</li>
              <li>Un arco da ¬b a a, rappresentando l'implicazione ¬b ⇒ a.</li>
            </ul>
          </li>
        </ol>
        <p className="text-lg leading-relaxed mb-4">
          Ecco un esempio di come costruire il grafo delle implicazioni per la formula (x₁ ∨ x₂) ∧ (¬x₁ ∨ x₃) ∧ (¬x₂ ∨ ¬x₃):
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Costruzione del grafo delle implicazioni per 2-SAT
vector<vector<int>> buildImplicationGraph(int n, vector<pair<int, int>>& clauses) {
    vector<vector<int>> adj(2*n);
    
    for (auto& clause : clauses) {
        int a = clause.first;
        int b = clause.second;
        
        // Converti i letterali in indici di nodi
        // Se a < 0, rappresenta ¬x_{-a}, altrimenti rappresenta x_a
        int u = abs(a) - 1;
        int v = abs(b) - 1;
        
        // Nodi per i letterali negati
        int not_u = u + n;
        int not_v = v + n;
        
        if (a < 0) swap(u, not_u);
        if (b < 0) swap(v, not_v);
        
        // (a ∨ b) è equivalente a (¬a → b) ∧ (¬b → a)
        adj[not_u].push_back(v);
        adj[not_v].push_back(u);
    }
    
    return adj;
}

// Esempio di utilizzo
int main() {
    int n = 3; // Numero di variabili
    
    // Clausole: (x₁ ∨ x₂) ∧ (¬x₁ ∨ x₃) ∧ (¬x₂ ∨ ¬x₃)
    vector<pair<int, int>> clauses = {
        {1, 2},
        {-1, 3},
        {-2, -3}
    };
    
    vector<vector<int>> adj = buildImplicationGraph(n, clauses);
    
    cout << "Grafo delle implicazioni:" << endl;
    for (int u = 0; u < 2*n; u++) {
        cout << (u < n ? "x" : "¬x") << (u < n ? u+1 : u-n+1) << " -> ";
        for (int v : adj[u]) {
            cout << (v < n ? "x" : "¬x") << (v < n ? v+1 : v-n+1) << " ";
        }
        cout << endl;
    }
    
    return 0;
}
`}</code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Risoluzione di 2-SAT con Componenti Fortemente Connesse</h2>
        <p className="text-lg leading-relaxed mb-4">
          Una volta costruito il grafo delle implicazioni, possiamo risolvere il problema 2-SAT utilizzando le componenti fortemente connesse (SCC):
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Trova le componenti fortemente connesse del grafo delle implicazioni.</li>
          <li className="mb-1">Verifica se una variabile e la sua negazione sono nella stessa componente. Se sì, la formula non è soddisfacibile.</li>
          <li className="mb-1">Se la formula è soddisfacibile, costruisci un'assegnazione valida utilizzando l'ordinamento topologico delle componenti.</li>
        </ol>
        <p className="text-lg leading-relaxed mb-4">
          L'intuizione dietro questo approccio è che se una variabile x e la sua negazione ¬x sono nella stessa componente fortemente connessa, allora c'è un cammino da x a ¬x e un cammino da ¬x a x nel grafo delle implicazioni. Questo significa che x ⇒ ¬x e ¬x ⇒ x, il che è una contraddizione.
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

// Risoluzione di 2-SAT utilizzando le componenti fortemente connesse
pair<bool, vector<bool>> solve2SAT(int n, vector<pair<int, int>>& clauses) {
    // Costruisci il grafo delle implicazioni
    vector<vector<int>> adj = buildImplicationGraph(n, clauses);
    
    // Trova le componenti fortemente connesse
    vector<vector<int>> scc = kosaraju(2*n, adj);
    
    // Assegna ogni nodo alla sua componente
    vector<int> component(2*n);
    for (int i = 0; i < scc.size(); i++) {
        for (int u : scc[i]) {
            component[u] = i;
        }
    }
    
    // Verifica se una variabile e la sua negazione sono nella stessa componente
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
    vector<pair<int, int>> topo_order;
    for (int i = 0; i < 2*n; i++) {
        topo_order.push_back({component[i], i});
    }
    
    sort(topo_order.begin(), topo_order.end());
    
    // Assegna i valori di verità
    vector<bool> assigned(n, false);
    for (auto [comp, u] : topo_order) {
        if (u < n) {
            // u rappresenta x_{u+1}
            if (!assigned[u]) {
                assignment[u] = false;
                assigned[u] = true;
            }
        } else {
            // u rappresenta ¬x_{u-n+1}
            if (!assigned[u - n]) {
                assignment[u - n] = true;
                assigned[u - n] = true;
            }
        }
    }
    
    return {true, assignment};
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Tempo: O(N + M), dove N è il numero di variabili e M è il numero di clausole</li>
          <li className="mb-1">Spazio: O(N + M)</li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Applicazioni di 2-SAT</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il problema 2-SAT ha numerose applicazioni pratiche in vari campi dell'informatica e dell'ottimizzazione.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>4.1 Problemi di Scheduling:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Molti problemi di scheduling possono essere formulati come problemi 2-SAT. Ad esempio, se abbiamo un insieme di attività e vincoli del tipo "l'attività A deve essere completata prima dell'attività B" o "le attività A e B non possono essere eseguite contemporaneamente", possiamo modellare questi vincoli come clausole 2-SAT.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>4.2 Problemi di Colorazione:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il problema di colorazione a 2 colori di un grafo può essere formulato come un problema 2-SAT. Per ogni arco (u, v), aggiungiamo le clausole (color_u ∨ color_v) e (¬color_u ∨ ¬color_v), che assicurano che u e v abbiano colori diversi.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>4.3 Problemi di Assegnazione:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Problemi di assegnazione con vincoli binari possono spesso essere formulati come problemi 2-SAT. Ad esempio, se abbiamo un insieme di lavoratori e compiti, e vincoli del tipo "il lavoratore A non può svolgere il compito B" o "se il lavoratore A svolge il compito B, allora il lavoratore C deve svolgere il compito D", possiamo modellare questi vincoli come clausole 2-SAT.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>4.4 Problemi di Percorso:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Alcuni problemi di percorso in grafi possono essere formulati come problemi 2-SAT. Ad esempio, se vogliamo trovare un cammino che visiti un sottoinsieme di nodi e soddisfi certi vincoli, possiamo modellare questi vincoli come clausole 2-SAT.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Estensioni e Varianti</h2>
        <p className="text-lg leading-relaxed mb-4">
          Ci sono diverse estensioni e varianti del problema 2-SAT che sono utili in varie applicazioni.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>5.1 2-SAT con Pesi:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In questa variante, ogni clausola ha un peso, e l'obiettivo è trovare un'assegnazione che massimizzi la somma dei pesi delle clausole soddisfatte. Questo problema è NP-hard in generale, ma ci sono approssimazioni e casi speciali che possono essere risolti in tempo polinomiale.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>5.2 MAX-2-SAT:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il problema MAX-2-SAT consiste nel trovare un'assegnazione che soddisfi il massimo numero di clausole. Questo problema è NP-hard, ma ci sono algoritmi di approssimazione con garanzie di prestazione.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>5.3 2-SAT con Vincoli Aggiuntivi:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In alcune applicazioni, oltre alle clausole 2-SAT standard, ci sono vincoli aggiuntivi che non possono essere espressi come clausole 2-SAT. In questi casi, possiamo utilizzare tecniche di programmazione lineare intera o altri metodi di ottimizzazione.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Esempio Dettagliato: Problema di Scheduling</h2>
        <p className="text-lg leading-relaxed mb-4">
          Vediamo un esempio dettagliato di come utilizzare 2-SAT per risolvere un problema di scheduling.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Problema:</strong> Abbiamo n attività, ognuna con un tempo di inizio e un tempo di fine. Vogliamo selezionare un sottoinsieme di attività tale che:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Nessuna coppia di attività selezionate si sovrappone.</li>
          <li className="mb-1">Per ogni coppia di attività (i, j) in un insieme dato di coppie, almeno una delle due attività deve essere selezionata.</li>
        </ol>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Soluzione:</strong>
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Per ogni attività i, creiamo una variabile booleana x_i che è vera se l'attività i è selezionata, falsa altrimenti.</li>
          <li className="mb-1">Per ogni coppia di attività (i, j) che si sovrappongono, aggiungiamo la clausola (¬x_i ∨ ¬x_j), che assicura che al massimo una delle due attività può essere selezionata.</li>
          <li className="mb-1">Per ogni coppia di attività (i, j) nell'insieme dato, aggiungiamo la clausola (x_i ∨ x_j), che assicura che almeno una delle due attività deve essere selezionata.</li>
          <li className="mb-1">Risolviamo il problema 2-SAT risultante.</li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Struttura per rappresentare un'attività
struct Activity {
    int start, end;
};

// Risoluzione del problema di scheduling utilizzando 2-SAT
pair<bool, vector<bool>> solveScheduling(int n, vector<Activity>& activities, vector<pair<int, int>>& required_pairs) {
    vector<pair<int, int>> clauses;
    
    // Aggiungi clausole per attività che si sovrappongono
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (activities[i].start < activities[j].end && activities[j].start < activities[i].end) {
                // Le attività i e j si sovrappongono, aggiungi la clausola (¬x_i ∨ ¬x_j)
                clauses.push_back({-(i+1), -(j+1)});
            }
        }
    }
    
    // Aggiungi clausole per coppie di attività richieste
    for (auto& [i, j] : required_pairs) {
        // Almeno una delle attività i e j deve essere selezionata, aggiungi la clausola (x_i ∨ x_j)
        clauses.push_back({i, j});
    }
    
    // Risolvi il problema 2-SAT
    return solve2SAT(n, clauses);
}

// Esempio di utilizzo
int main() {
    int n = 4; // Numero di attività
    
    // Attività: (tempo di inizio, tempo di fine)
    vector<Activity> activities = {
        {1, 3},
        {2, 5},
        {4, 7},
        {6, 8}
    };
    
    // Coppie di attività richieste: almeno una delle due attività deve essere selezionata
    vector<pair<int, int>> required_pairs = {
        {1, 3},
        {2, 4}
    };
    
    auto [feasible, selected] = solveScheduling(n, activities, required_pairs);
    
    if (feasible) {
        cout << "È possibile selezionare un sottoinsieme di attività che soddisfa tutti i vincoli." << endl;
        cout << "Attività selezionate: ";
        for (int i = 0; i < n; i++) {
            if (selected[i]) {
                cout << i+1 << " ";
            }
        }
        cout << endl;
    } else {
        cout << "Non è possibile selezionare un sottoinsieme di attività che soddisfa tutti i vincoli." << endl;
    }
    
    return 0;
}
`}</code></pre>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">7. Problemi di Esempio</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-2"><a href="https://cses.fi/problemset/task/1684" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - Giant Pizza</a>: Un problema classico di 2-SAT.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/228/problem/E" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - The Road to Berland is Paved With Good Intentions</a>: Un problema che può essere risolto con 2-SAT.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/776/problem/D" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - The Door Problem</a>: Un problema che può essere modellato come 2-SAT.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/1215/problem/F" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Radio Stations</a>: Un problema avanzato che utilizza 2-SAT.</li>
        </ul>
      </section>
    </div>
  );
};

export default TwoSatPage;
