import React from 'react';

const TwoSatGoldPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">2-Satisfiability (2-SAT) (Livello Gold)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione a 2-SAT</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il problema di **2-Satisfiability (2-SAT)** consiste nel determinare se è possibile assegnare valori di verità (vero o falso) a un insieme di variabili booleane in modo da soddisfare una data formula booleana in Forma Normale Congiuntiva (CNF), dove ogni clausola ha al massimo due letterali.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Un **letterale** è una variabile booleana (es. `x_i`) o la sua negazione (es. `¬x_i`).
          Una **clausola** è una disgiunzione (OR) di letterali. Ad esempio, `(x_1 ∨ ¬x_2)` è una clausola con due letterali.
          Una formula in CNF è una congiunzione (AND) di clausole.
        </p>
        <p className="text-lg leading-relaxed">
          Il problema 2-SAT chiede: data una formula come `(l_1 ∨ l_2) ∧ (l_3 ∨ l_4) ∧ ... ∧ (l_{2k-1} ∨ l_{2k})`, esiste un assegnamento di valori di verità alle variabili che rende l'intera formula vera?
          A differenza del problema generale k-SAT (per k ≥ 3), che è NP-completo, il problema 2-SAT può essere risolto in tempo polinomiale, tipicamente O(N+M) dove N è il numero di variabili e M è il numero di clausole.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Trasformazione in Grafo di Implicazione</h2>
        <p className="text-lg leading-relaxed mb-4">
          La chiave per risolvere 2-SAT è trasformare il problema in un problema su un grafo diretto chiamato **grafo di implicazione**.
          Per ogni variabile booleana `x_i`, creiamo due nodi nel grafo: uno per `x_i` e uno per la sua negazione `¬x_i`.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Ogni clausola `(a ∨ b)` è logicamente equivalente a due implicazioni:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">`¬a ⇒ b` (Se `a` è falso, allora `b` deve essere vero)</li>
          <li className="mb-1">`¬b ⇒ a` (Se `b` è falso, allora `a` deve essere vero)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Per ogni tale implicazione `p ⇒ q`, aggiungiamo un arco diretto da `p` a `q` nel grafo di implicazione.
          Ad esempio, per la clausola `(x_1 ∨ ¬x_2)`:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li>Equivalente a `(¬x_1 ⇒ ¬x_2)` e `(¬(¬x_2) ⇒ x_1)`, cioè `(x_2 ⇒ x_1)`.</li>
          <li>Quindi, aggiungiamo archi: `¬x_1 → ¬x_2` e `x_2 → x_1`.</li>
        </ul>
        <p className="text-lg leading-relaxed mt-2">
          Se una clausola ha un solo letterale, es. `(x_i)`, è equivalente a `(x_i ∨ x_i)`. Questo si traduce in `¬x_i ⇒ x_i`. Aggiungiamo un arco `¬x_i → x_i`.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Condizione di Soddisfacibilità e Componenti Fortemente Connesse (SCC)</h2>
        <p className="text-lg leading-relaxed mb-4">
          Una formula 2-SAT è **insoddisfacibile** se e solo se esiste una variabile `x_i` tale che `x_i` e `¬x_i` appartengono alla stessa Componente Fortemente Connessa (SCC) nel grafo di implicazione.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Intuizione:</strong> Se `x_i` e `¬x_i` sono nella stessa SCC, significa che esiste un cammino da `x_i` a `¬x_i` e un cammino da `¬x_i` a `x_i`. Questo implica che `x_i ⇒ ¬x_i` e `¬x_i ⇒ x_i`. Se `x_i` è vero, allora `¬x_i` deve essere vero (contraddizione). Se `x_i` è falso, allora `¬x_i` è vero, il che implica che `x_i` deve essere vero (contraddizione).
        </p>
        <p className="text-lg leading-relaxed">
          Quindi, l'algoritmo per risolvere 2-SAT è:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Costruire il grafo di implicazione (2N nodi, al massimo 2M archi).</li>
          <li className="mb-1">Trovare tutte le Componenti Fortemente Connesse (SCC) del grafo (usando algoritmi come Tarjan o Kosaraju, in O(Nodi+Archi)).</li>
          <li className="mb-1">Per ogni variabile `x_i`, controllare se `x_i` e `¬x_i` sono nella stessa SCC. Se sì per qualcuna, la formula è insoddisfacibile. Altrimenti, è soddisfacibile.</li>
        </ol>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Assegnamento di Valori (se Soddisfacibile)</h2>
        <p className="text-lg leading-relaxed mb-4">
          Se la formula è soddisfacibile, si può trovare un assegnamento di valori di verità. Considera il **grafo delle componenti** (condensation graph), dove ogni nodo è una SCC e c'è un arco da SCC_A a SCC_B se esiste un arco nel grafo originale da un nodo in SCC_A a un nodo in SCC_B. Questo grafo è un Grafo Aciclico Diretto (DAG).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Assegna un valore di verità a ogni SCC. Se `SCC(¬x_i)` appare dopo `SCC(x_i)` in un ordinamento topologico inverso del grafo delle componenti, allora assegna `x_i = vero`. Altrimenti, assegna `x_i = falso` (cioè, se `comp[x_i] > comp[¬x_i]`, dove `comp[u]` è l'indice della SCC di `u` in ordine topologico inverso, allora `x_i` è vero).
        </p>
        <p className="text-lg leading-relaxed">
          Più semplicemente: per ogni variabile `x_i`:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Se l'indice della SCC di `x_i` (in un ordinamento topologico inverso delle SCC) è maggiore dell'indice della SCC di `¬x_i`, allora assegna `x_i = vero`.</li>
          <li className="mb-1">Altrimenti (se l'indice della SCC di `x_i` è minore), assegna `x_i = falso`.</li>
        </ul>
        <p className="text-lg leading-relaxed mt-2">
          (Nota: Poiché la formula è soddisfacibile, `x_i` e `¬x_i` sono in SCC diverse, quindi una delle due condizioni sarà vera).
          L'ordinamento topologico inverso significa che se c'è un'implicazione `A ⇒ B`, allora `SCC(A)` non può venire dopo `SCC(B)`. Quindi, se `SCC(¬x_i)` ha un indice più piccolo (viene prima) di `SCC(x_i)`, significa che non c'è un'implicazione forte da `x_i` a `¬x_i` che non sia bilanciata da `¬x_i` a `x_i`. Assegnare `x_i` a vero è sicuro.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Implementazione (Cenni)</h2>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <vector>
#include <algorithm> // Per std::reverse
#include <iostream>

// Assumiamo N variabili, indicizzate da 0 a N-1.
// Nodo per x_i: i (da 0 a N-1)
// Nodo per ¬x_i: i + N (da N a 2N-1)

const int MAX_VARS = 100005;
const int MAX_NODES_2SAT = 2 * MAX_VARS;
std::vector<int> adj_2sat[MAX_NODES_2SAT], rev_adj_2sat[MAX_NODES_2SAT];
bool visited_2sat[MAX_NODES_2SAT];
int component[MAX_NODES_2SAT]; // component[i] = SCC id del nodo i
std::vector<int> order_2sat; // Per l'ordinamento topologico nella prima passata di Kosaraju
int N_vars_2sat;

void dfs1_kosaraju(int u) {
    visited_2sat[u] = true;
    for (int v : adj_2sat[u]) {
        if (!visited_2sat[v]) {
            dfs1_kosaraju(v);
        }
    }
    order_2sat.push_back(u);
}

void dfs2_kosaraju(int u, int c) {
    visited_2sat[u] = true;
    component[u] = c;
    for (int v : rev_adj_2sat[u]) {
        if (!visited_2sat[v]) {
            dfs2_kosaraju(v, c);
        }
    }
}

void find_sccs() {
    order_2sat.clear();
    for (int i = 0; i < 2 * N_vars_2sat; ++i) visited_2sat[i] = false;
    for (int i = 0; i < 2 * N_vars_2sat; ++i) {
        if (!visited_2sat[i]) {
            dfs1_kosaraju(i);
        }
    }

    for (int i = 0; i < 2 * N_vars_2sat; ++i) visited_2sat[i] = false;
    int c = 0;
    std::reverse(order_2sat.begin(), order_2sat.end());
    for (int u : order_2sat) {
        if (!visited_2sat[u]) {
            dfs2_kosaraju(u, c++);
        }
    }
}

// Funzione per aggiungere una clausola (a OR b)
// var_a, var_b sono gli indici delle variabili (0 a N-1)
// is_neg_a, is_neg_b indicano se sono negate
void add_clause(int var_a, bool is_neg_a, int var_b, bool is_neg_b) {
    int u = var_a + (is_neg_a ? N_vars_2sat : 0);
    int not_u = var_a + (!is_neg_a ? N_vars_2sat : 0);
    int v = var_b + (is_neg_b ? N_vars_2sat : 0);
    int not_v = var_b + (!is_neg_b ? N_vars_2sat : 0);

    // ¬u ⇒ v  (arco da not_u a v)
    adj_2sat[not_u].push_back(v);
    rev_adj_2sat[v].push_back(not_u);
    // ¬v ⇒ u  (arco da not_v a u)
    adj_2sat[not_v].push_back(u);
    rev_adj_2sat[u].push_back(not_v);
}

// Funzione per aggiungere una clausola con un solo letterale (a)
void add_single_clause(int var_a, bool is_neg_a) {
    // (a V a) -> ~a => a
    int u = var_a + (is_neg_a ? N_vars_2sat : 0);
    int not_u = var_a + (!is_neg_a ? N_vars_2sat : 0);
    adj_2sat[not_u].push_back(u);
    rev_adj_2sat[u].push_back(not_u);
}


// bool solve_2sat(std::vector<bool>& assignment) {
//   find_sccs(); // Calcola le SCC
// 
//   for (int i = 0; i < N_vars_2sat; ++i) {
//     if (component[i] == component[i + N_vars_2sat]) {
//       return false; // Insoddisfacibile
//     }
//   }
// 
//   assignment.resize(N_vars_2sat);
//   for (int i = 0; i < N_vars_2sat; ++i) {
//     // component[i] è l'ID della SCC di x_i
//     // component[i + N_vars_2sat] è l'ID della SCC di ¬x_i
//     // Gli ID delle SCC sono assegnati in ordine topologico inverso
//     assignment[i] = (component[i] > component[i + N_vars_2sat]);
//   }
//   return true;
// }

// Esempio:
// N_vars_2sat = 3;
// (x0 V x1): add_clause(0, false, 1, false)
// (¬x1 V x2): add_clause(1, true, 2, false)
// (¬x0 V ¬x2): add_clause(0, true, 2, true)
// std::vector<bool> sol;
// if (solve_2sat(sol)) { ... print solution ... }
`}</code></pre>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Nota: L'implementazione di SCC (Kosaraju o Tarjan) è un prerequisito. Il codice sopra mostra la struttura per 2-SAT assumendo che SCC sia implementato.</p>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti a Concetti Prerequisiti e Successivi</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Prerequisito:</strong> Logica booleana (CNF, letterali, clausole).</li>
          <li className="mb-2"><strong>Prerequisito:</strong> Grafi diretti, Componenti Fortemente Connesse (SCC), algoritmi per SCC (Tarjan, Kosaraju).</li>
          <li className="mb-2"><strong>Concetto Correlato:</strong> SAT (Satisfiability Problem). 3-SAT è NP-completo.</li>
          <li className="mb-2"><strong>Concetti Avanzati (Platinum):</strong> Applicazioni di 2-SAT in problemi più complessi, riduzione di altri problemi a 2-SAT. Max 2-SAT (trovare un assegnamento che massimizza il numero di clausole soddisfatte, che è NP-difficile).</li>
        </ul>
      </section>
    </div>
  );
};

export default TwoSatGoldPage;

