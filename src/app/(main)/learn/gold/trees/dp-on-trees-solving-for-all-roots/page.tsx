import React from 'react';

const DpOnTreesRerootingGoldPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">DP su Alberi - Risolvere per Tutte le Radici (Rerooting) (Livello Gold)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione al Rerooting</h2>
        <p className="text-lg leading-relaxed mb-4">
          La tecnica del **rerooting** (o "risolvere per tutte le radici") è un'estensione della programmazione dinamica su alberi. Dopo aver calcolato i valori della DP per un albero radicato arbitrariamente (es. al nodo 0), il rerooting permette di calcolare efficientemente quali sarebbero i risultati della DP se l'albero fosse radicato in ogni altro nodo, senza rieseguire l'intera DP da zero per ogni possibile radice.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Questo è utile quando il problema chiede una risposta globale che dipende dalla scelta della radice, o quando si vogliono informazioni relative a ogni nodo come se fosse la radice del proprio "mondo" (es. la somma delle distanze da un nodo a tutti gli altri, il massimo cammino che parte da un nodo).
        </p>
        <p className="text-lg leading-relaxed">
          La tecnica si basa solitamente su due passate DFS:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1"><strong>Prima DFS (Bottom-up):</strong> Calcola i valori della DP per ogni nodo basandosi sui suoi figli (come nella DP su alberi standard). Ad esempio, `dp_down[u]` potrebbe rappresentare una certa proprietà del sottoalbero radicato in `u`.</li>
          <li className="mb-1"><strong>Seconda DFS (Top-down):</strong> Calcola i valori della DP "dall'alto", considerando il contributo del resto dell'albero (cioè, la parte dell'albero al di fuori del sottoalbero corrente). Ad esempio, `dp_up[u]` potrebbe rappresentare una proprietà dell'albero se si rimuove il sottoalbero di `u` e si considera `u` connesso al suo genitore. La risposta finale per il nodo `u` (come se fosse la radice) è spesso una combinazione di `dp_down[u]` e `dp_up[u]`.</li>
        </ul>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Esempio: Somma delle Distanze da un Nodo a Tutti gli Altri</h2>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Problema:</strong> Per ogni nodo `u` in un albero, calcolare la somma delle distanze da `u` a tutti gli altri nodi `v` nell'albero.
        </p>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">2.1 Prima DFS (Bottom-up)</h3>
          <p className="text-lg leading-relaxed mb-2">
            Definiamo due valori per ogni nodo `u`:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-2">
            <li className="mb-1">`count_nodes[u]`: Il numero di nodi nel sottoalbero radicato in `u` (incluso `u`).</li>
            <li className="mb-1">`sum_dist_down[u]`: La somma delle distanze da `u` a tutti i nodi nel sottoalbero radicato in `u`.</li>
          </ul>
          <p className="text-lg leading-relaxed mb-2">
            Calcolo durante una DFS post-order:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
            <li className="mb-1">`count_nodes[u] = 1 + Σ_{v ∈ children(u)} count_nodes[v]`</li>
            <li className="mb-1">`sum_dist_down[u] = Σ_{v ∈ children(u)} (sum_dist_down[v] + count_nodes[v])`.
              L'aggiunta di `count_nodes[v]` è perché per ogni nodo nel sottoalbero di `v`, la sua distanza da `u` è 1 (per l'arco `u-v`) più la sua distanza da `v`.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">2.2 Seconda DFS (Top-down)</h3>
          <p className="text-lg leading-relaxed mb-2">
            Definiamo `sum_dist_up[u]`: la somma delle distanze da `u` a tutti i nodi che **non** sono nel sottoalbero di `u`.
            La risposta finale per il nodo `u` sarà `ans[u] = sum_dist_down[u] + sum_dist_up[u]`.
          </p>
          <p className="text-lg leading-relaxed mb-2">
            Calcolo durante una DFS pre-order (dopo la prima DFS):
            Per la radice `r` dell'albero (scelta arbitrariamente per la prima DFS), `sum_dist_up[r] = 0`.
            Per un nodo `u` e un suo figlio `v` (dove `p` è il genitore di `u` nella DFS corrente):
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
            <li className="mb-1">Il contributo a `sum_dist_up[v]` dal genitore `u` e dalla parte "up" di `u` è:
              `sum_dist_up[v] = (sum_dist_up[u] + (N - count_nodes[u]))` (distanze dai nodi sopra `u` a `u`, più 1 per l'arco `u-v`)
              `+ (sum_dist_down[u] - (sum_dist_down[v] + count_nodes[v]))` (distanze dai nodi negli altri sottoalberi di `u` a `u`)
              `+ (count_nodes[u] - count_nodes[v] -1)` (numero di altri nodi nel sottoalbero di `u` (escluso `v` e il suo sottoalbero), più 1 per l'arco `u-v`)
            </li>
          </ul>
          <p className="text-lg leading-relaxed mt-2 mb-2">
            Una transizione più semplice per `sum_dist_up[v]` (o direttamente per `ans[v]`):
            Sia `N` il numero totale di nodi.
            `ans[v] = ans[u] - count_nodes[v] + (N - count_nodes[v])`.
            Spiegazione: Per passare da `u` a `v`:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
            <li className="mb-1">Per i `count_nodes[v]` nodi nel sottoalbero di `v`, la distanza da `v` è 1 in meno rispetto alla distanza da `u`. Quindi sottraiamo `count_nodes[v]`.</li>
            <li className="mb-1">Per gli `N - count_nodes[v]` nodi al di fuori del sottoalbero di `v`, la distanza da `v` è 1 in più rispetto alla distanza da `u`. Quindi aggiungiamo `N - count_nodes[v]`.</li>
          </ul>
          <p className="text-lg leading-relaxed mt-2">
            Quindi, se `ans[u]` è la somma totale delle distanze da `u`, allora `ans[v] = ans[u] - count_nodes[v] + (N - count_nodes[v])`.
            Il caso base è `ans[root] = sum_dist_down[root]` (calcolato dalla prima DFS).
          </p>
        </div>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <vector>
#include <iostream>

const int MAXN_REROOT = 100005;
std::vector<int> adj_reroot[MAXN_REROOT];
long long count_nodes[MAXN_REROOT]; // Numero di nodi nel sottoalbero
long long sum_dist_down[MAXN_REROOT]; // Somma distanze da u ai nodi nel sottoalbero di u
long long ans_reroot[MAXN_REROOT];    // Risposta finale per ogni nodo u
int N_total_nodes;

// Prima DFS: calcola count_nodes e sum_dist_down
void dfs1_reroot(int u, int p) {
  count_nodes[u] = 1;
  sum_dist_down[u] = 0;
  for (int v : adj_reroot[u]) {
    if (v == p) continue;
    dfs1_reroot(v, u);
    count_nodes[u] += count_nodes[v];
    sum_dist_down[u] += sum_dist_down[v] + count_nodes[v];
  }
}

// Seconda DFS: calcola ans_reroot per ogni nodo
void dfs2_reroot(int u, int p) {
  for (int v : adj_reroot[u]) {
    if (v == p) continue;
    // Transizione per ans_reroot[v] basata su ans_reroot[u]
    ans_reroot[v] = ans_reroot[u] - count_nodes[v] + (N_total_nodes - count_nodes[v]);
    dfs2_reroot(v, u);
  }
}

// Esempio di utilizzo:
// int main() {
//   int n = 5;
//   N_total_nodes = n;
//   adj_reroot[0] = {1};
//   adj_reroot[1] = {0, 2, 3};
//   adj_reroot[2] = {1};
//   adj_reroot[3] = {1, 4};
//   adj_reroot[4] = {3};
// 
//   // Scegli una radice arbitraria, es. 0
//   dfs1_reroot(0, -1);
// 
//   ans_reroot[0] = sum_dist_down[0]; // Caso base per la seconda DFS
//   dfs2_reroot(0, -1);
// 
//   for (int i = 0; i < n; ++i) {
//     std::cout << "Somma distanze dal nodo " << i << ": " << ans_reroot[i] << std::endl;
//   }
//   // Esempio output atteso (può variare leggermente con la struttura esatta):
//   // Nodo 0: (0-1)+(0-2)+(0-3)+(0-4) = 1+2+2+3 = 8
//   // Nodo 1: (1-0)+(1-2)+(1-3)+(1-4) = 1+1+1+2 = 5
//   // Nodo 2: (2-0)+(2-1)+(2-3)+(2-4) = 2+1+2+3 = 8
//   // Nodo 3: (3-0)+(3-1)+(3-2)+(3-4) = 2+1+2+1 = 6
//   // Nodo 4: (4-0)+(4-1)+(4-2)+(4-3) = 3+2+3+1 = 9
//   return 0;
// }`}</code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Struttura Generale del Rerooting</h2>
        <p className="text-lg leading-relaxed mb-4">
          1.  <strong>Scegli una radice arbitraria</strong> (es. nodo 0).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          2.  <strong>Prima DFS (Bottom-up, post-order traversal):</strong>
            Per ogni nodo `u`, calcola `dp_down[u]` (e altre informazioni ausiliarie come `count_nodes[u]`) basandoti sui valori `dp_down[v]` dei suoi figli `v`.
            `dp_down[u] = aggregate ( G(u, v, dp_down[v]) )` per tutti i figli `v` di `u`.
            (dove `G` è una funzione che combina l'informazione del figlio con l'arco `u-v`).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          3.  <strong>Seconda DFS (Top-down, pre-order traversal):</strong>
            Per ogni nodo `u`, calcola `dp_up[u]` (o direttamente la risposta finale `ans[u]`).
            `dp_up[u]` rappresenta l'informazione proveniente dalla parte dell'albero "sopra" `u` (cioè, attraverso il suo genitore `p`).
            La transizione per `dp_up[v]` (dove `v` è figlio di `u`) usa `dp_up[u]` e i valori `dp_down` degli altri fratelli di `v`.
            `dp_up[v] = H(u, v, dp_up[u], aggregate_{w ∈ children(u), w≠v} G(u, w, dp_down[w]) )`.
            La risposta finale `ans[u]` è spesso una combinazione di `dp_down[u]` e `dp_up[u]` (o `dp_down[u]` aggregato con i contributi `dp_up` da ogni direzione).
        </p>
        <p className="text-lg leading-relaxed">
          È cruciale definire attentamente cosa rappresentano `dp_down` e `dp_up` e come si combinano.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Complessità</h2>
        <p className="text-lg leading-relaxed mb-4">
          Entrambe le passate DFS visitano ogni nodo e ogni arco un numero costante di volte. Se le operazioni di aggregazione e le transizioni per ogni nodo richiedono tempo proporzionale al grado del nodo (o costante), la complessità totale del rerooting è **O(N)** o **O(N log N)** (se le aggregazioni richiedono strutture dati logaritmiche, ma è raro per il rerooting base).
        </p>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti a Concetti Prerequisiti e Successivi</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Prerequisito:</strong> <a href="./dp-on-trees-introduction" className="text-blue-600 dark:text-blue-400 hover:underline">DP su Alberi - Introduzione</a>.</li>
          <li className="mb-2"><strong>Prerequisito:</strong> Ricerca in Profondità (DFS).</li>
          <li className="mb-2"><strong>Concetti Avanzati (Platinum):</strong> Problemi di rerooting più complessi con stati multipli o transizioni non banali. Applicazioni in problemi di conteggio o ottimizzazione dove la scelta della radice è implicita.</li>
        </ul>
      </section>
    </div>
  );
};

export default DpOnTreesRerootingGoldPage;

