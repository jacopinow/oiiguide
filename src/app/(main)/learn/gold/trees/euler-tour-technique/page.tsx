import React from 'react';

const EulerTourTechniqueGoldPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Tecnica del Tour di Eulero (Livello Gold)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione alla Tecnica del Tour di Eulero</h2>
        <p className="text-lg leading-relaxed mb-4">
          La **Tecnica del Tour di Eulero** (Euler Tour Technique - ETT) è un modo per linearizzare la struttura di un albero. Si ottiene eseguendo una Ricerca in Profondità (DFS) sull'albero e registrando i nodi in un array (il "tour di Eulero") ogni volta che vengono visitati (entrata) e ogni volta che la visita di un loro sottoalbero termina (uscita).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Questa linearizzazione permette di trasformare problemi su sottoalberi o cammini in problemi su intervalli di un array, che possono poi essere risolti efficientemente usando strutture dati come Segment Tree o Fenwick Tree.
        </p>
        <p className="text-lg leading-relaxed">
          Esistono diverse varianti del tour di Eulero. Le più comuni includono:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Registrare un nodo quando si entra e quando si esce dal suo sottoalbero.</li>
          <li className="mb-1">Registrare un nodo solo quando si entra nel suo sottoalbero (o solo quando si esce).</li>
          <li className="mb-1">Registrare gli archi invece dei nodi.</li>
        </ul>
        <p className="text-lg leading-relaxed">
          La variante più usata per le query su sottoalberi registra il tempo di entrata (`tin[u]`) e il tempo di uscita (`tout[u]`) per ogni nodo `u` durante la DFS. Il sottoalbero radicato in `u` corrisponde a tutti i nodi `v` tali che `tin[u] <= tin[v]` e `tout[v] <= tout[u]`.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Implementazione del Tour di Eulero (Tempi di Entrata/Uscita)</h2>
        <p className="text-lg leading-relaxed mb-2">
          Si esegue una DFS a partire dalla radice dell'albero. Si usa un contatore globale `timer`.
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Quando si visita un nodo `u` per la prima volta (entrata): `tin[u] = timer++`.</li>
          <li className="mb-1">Dopo aver visitato tutti i figli di `u` (uscita): `tout[u] = timer++`.</li>
        </ul>
        <p className="text-lg leading-relaxed mb-2">
          L'array del tour di Eulero `euler_tour_array` sarà di dimensione `2*N` (dove N è il numero di nodi). `euler_tour_array[tin[u]]` può memorizzare `u` (o un valore associato a `u`), e `euler_tour_array[tout[u]]` può memorizzare `u` (o un valore per indicare l'uscita).
        </p>
        <p className="text-lg leading-relaxed mb-2">
          Con questa definizione, il sottoalbero radicato in `u` corrisponde all'intervallo di indici `[tin[u], tout[u]]` nell'array `euler_tour_array` (se l'array contiene i nodi sia all'entrata che all'uscita). Più precisamente, i nodi `v` nel sottoalbero di `u` sono quelli per cui `tin[u] <= tin[v]` e `tout[v] <= tout[u]`.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <vector>
#include <iostream>

const int MAXN_ETT = 100005; // Massimo numero di nodi
std::vector<int> adj[MAXN_ETT];
int tin[MAXN_ETT], tout[MAXN_ETT];
int timer_ett;
std::vector<int> euler_tour_nodes; // Opzionale: per memorizzare i nodi nel tour

void dfs_euler_tour(int u, int p) {
  tin[u] = timer_ett++;
  euler_tour_nodes.push_back(u); // Registra il nodo all'entrata

  for (int v : adj[u]) {
    if (v == p) continue;
    dfs_euler_tour(v, u);
  }

  tout[u] = timer_ett++; 
  // euler_tour_nodes.push_back(u); // Opzionale: registra il nodo all'uscita
  // Se si registra anche all'uscita, tout[u] sarà l'indice della seconda occorrenza di u.
  // Se non si registra all'uscita, tout[u] è semplicemente il tempo dopo aver processato il sottoalbero.
  // Per le query su sottoalbero usando tin/tout come intervallo, spesso si usa la versione dove
  // tout[u] è il tempo *dopo* che l'intero sottoalbero di u è stato processato.
  // In questo caso, il sottoalbero di u corrisponde ai nodi v con tin[u] <= tin[v] < tout[u]
  // (se tout[u] è il timer *prima* di incrementarlo per l'uscita di u).
  // Una definizione comune per le query su sottoalbero è:
  // il sottoalbero di u è l'intervallo di nodi v tali che tin[u] <= tin[v] e tout[v] <= tout[u]
  // (quando tout[u] è l'indice dell'uscita di u nel tour array di dimensione 2N).
  // Per semplicità, usiamo la definizione dove tin[u] è l'entrata e tout[u] è l'uscita
  // e il sottoalbero di u è l'intervallo [tin[u], tout[u]] nel tour array.
  // Per questo, euler_tour_nodes dovrebbe contenere i nodi sia all'entrata che all'uscita.
  // Se si usa solo tin e tout per definire un intervallo su un array di valori dei nodi indicizzato da tin,
  // allora tout[u] è il tempo *dopo* il sottoalbero di u.
}

// Versione alternativa di DFS per query su sottoalbero più dirette:
// flat_tree[timer] = valore_nodo_u all'entrata
// sottoalbero di u è l'intervallo [tin[u], tout[u]-1] in flat_tree
int ft_tin[MAXN_ETT], ft_tout[MAXN_ETT];
int ft_timer;
std::vector<long long> node_values; // Valori associati ai nodi originali
std::vector<long long> flat_tree_values; // Valori linearizzati

void dfs_flatten(int u, int p) {
    ft_tin[u] = ft_timer++;
    if (u < node_values.size()) { // Assicurati che u sia un indice valido
        flat_tree_values.push_back(node_values[u]);
    }

    for (int v : adj[u]) {
        if (v == p) continue;
        dfs_flatten(v, u);
    }
    ft_tout[u] = ft_timer; // Tempo *dopo* aver processato il sottoalbero di u
}


// Inizializzazione
void init_ett(int n_nodes, int root) {
  timer_ett = 0;
  euler_tour_nodes.clear();
  // Chiamare dfs_euler_tour(root, -1);

  // Per la versione flatten:
  ft_timer = 0;
  flat_tree_values.clear(); 
  // Assumendo che node_values sia popolato
  // Chiamare dfs_flatten(root, -1);
}

/* Esempio di utilizzo della versione flatten:
int main() {
  int n = 5; // Numero di nodi
  adj[0] = {1, 2};
  adj[1] = {0, 3, 4};
  adj[2] = {0};
  adj[3] = {1};
  adj[4] = {1};

  node_values = {10, 20, 30, 40, 50}; // Valori per i nodi 0, 1, 2, 3, 4

  ft_timer = 0;
  flat_tree_values.reserve(n); // Riserva spazio
  dfs_flatten(0, -1); // Radice 0, nessun genitore

  // Stampa tin e tout
  for (int i = 0; i < n; ++i) {
    std::cout << "Nodo " << i << ": tin = " << ft_tin[i] << ", tout = " << ft_tout[i] << std::endl;
  }
  // Stampa flat_tree_values
  std::cout << "Flat tree values: ";
  for (long long val : flat_tree_values) {
    std::cout << val << " ";
  }
  std::cout << std::endl;

  // Query somma sottoalbero del nodo 1:
  // Intervallo in flat_tree_values: [ft_tin[1], ft_tout[1]-1]
  // ft_tin[1] = 1, ft_tout[1] = 4 (se 3 e 4 sono figli di 1)
  // Sottoalbero di 1: nodi 1, 3, 4. Valori: 20, 40, 50
  // Somma = flat_tree_values[1] + flat_tree_values[2] + flat_tree_values[3]
  // (gli indici dipendono dall'ordine della DFS)

  return 0;
}
*/

`}</code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Applicazioni della Tecnica del Tour di Eulero</h2>
        
        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">3.1 Query su Sottoalberi</h3>
          <p className="text-lg leading-relaxed mb-2">
            Questa è l'applicazione più comune. Se si usa la versione `dfs_flatten` dove `flat_tree_values` memorizza i valori dei nodi nell'ordine `tin`:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
            <li>Il sottoalbero radicato in `u` corrisponde all'intervallo `[ft_tin[u], ft_tout[u]-1]` nell'array `flat_tree_values`.</li>
            <li><strong>Somma dei valori nel sottoalbero di `u`:</strong> Query di somma sull'intervallo `[ft_tin[u], ft_tout[u]-1]` di `flat_tree_values` usando un Segment Tree o Fenwick Tree.</li>
            <li><strong>Aggiornamento del valore del nodo `u`:</strong> Aggiornamento puntuale all'indice `ft_tin[u]` in `flat_tree_values` (e corrispondentemente nel Segment Tree/Fenwick Tree).</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">3.2 Query su Cammini (con LCA)</h3>
          <p className="text-lg leading-relaxed mb-2">
            Le query su un cammino tra due nodi `u` e `v` possono essere più complesse. Sia `l = LCA(u, v)` (Lowest Common Ancestor).
            Il cammino da `u` a `v` è il cammino da `u` a `l` più il cammino da `l` a `v` (con `l` contato una sola volta).
          </p>
          <p className="text-lg leading-relaxed mb-2">
            Se i valori sono sugli **archi**: Si può usare una variante di ETT dove si registrano i nodi all'entrata e all'uscita. La somma dei valori su un cammino `u-v` può essere calcolata come `query(root, u) + query(root, v) - 2*query(root, lca(u,v))`, dove `query(x,y)` è la somma dei pesi degli archi sul cammino da `x` a `y`. Questo spesso si fa associando i pesi degli archi ai nodi figli e usando un ETT sui nodi.
          </p>
          <p className="text-lg leading-relaxed mb-2">
            Se i valori sono sui **nodi**: Una tecnica comune è quella di avere due valori per ogni nodo nell'array del tour (uno positivo all'entrata, uno negativo all'uscita). La somma dei valori sul cammino `u-v` è `sum(tin[u]) + sum(tin[v]) - 2*sum(tin[lca(u,v)]) + value[lca(u,v)]` (se `sum(t)` è la somma dei valori da radice a `t` nel tour). Oppure, più semplicemente, se si vuole la somma dei valori dei nodi sul cammino `u-v`:
            `path_sum(u,v) = query_to_root(u) + query_to_root(v) - 2 * query_to_root(lca(u,v)) + value_at_node(lca(u,v))`.
            Le query `query_to_root(x)` possono essere implementate con un Fenwick tree sull'array del tour di Eulero (quello con `2N` elementi, registrando `+value[node]` all'entrata e `-value[node]` all'uscita, e facendo una query di prefisso).
          </p>
          <p className="text-lg leading-relaxed mb-2">
            L'aggiornamento di un valore di un nodo `u` richiederebbe due aggiornamenti nel Fenwick tree (a `tin[u]` e `tout[u]`).
            Il calcolo dell'LCA è un prerequisito (spesso O(log N) con binary lifting).
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">3.3 Altre Applicazioni</h3>
          <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
            <li className="mb-1">Verificare se `u` è un antenato di `v`: `tin[u] <= tin[v]` AND `tout[u] >= tout[v]`.</li>
            <li className="mb-1">Numero di nodi nel sottoalbero di `u`: `(tout[u] - tin[u] + 1) / 2` (se il tour registra entrata e uscita per ogni nodo). Oppure `ft_tout[u] - ft_tin[u]` nella versione `dfs_flatten`.</li>
          </ul>
        </div>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Complessità</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1"><strong>Costruzione del Tour di Eulero (DFS):</strong> O(N)</li>
          <li className="mb-1"><strong>Query/Update su Sottoalbero (con Segment/Fenwick Tree):</strong> O(log N)</li>
          <li className="mb-1"><strong>Query/Update su Cammino (con LCA e Segment/Fenwick Tree):</strong> O(log N) (assumendo LCA in O(log N))</li>
          <li className="mb-1"><strong>Spazio:</strong> O(N) per `tin`, `tout`, e l'array linearizzato (e per il Segment/Fenwick Tree).</li>
        </ul>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti a Concetti Prerequisiti e Successivi</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Prerequisito:</strong> Alberi, Ricerca in Profondità (DFS).</li>
          <li className="mb-2"><strong>Prerequisito:</strong> <a href="../segment-tree-point-update-range-sum" className="text-blue-600 dark:text-blue-400 hover:underline">Segment Tree</a> o Fenwick Tree.</li>
          <li className="mb-2"><strong>Concetto Correlato:</strong> Lowest Common Ancestor (LCA) (spesso necessario per query su cammini).</li>
          <li className="mb-2"><strong>Concetti Avanzati (Platinum):</strong> Heavy-Light Decomposition (un'altra tecnica per problemi su cammini e sottoalberi, spesso più potente per certi tipi di query), Centroid Decomposition.</li>
        </ul>
      </section>
    </div>
  );
};

export default EulerTourTechniqueGoldPage;

