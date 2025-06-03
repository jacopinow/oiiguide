import React from 'react';

const LowestCommonAncestorPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Lowest Common Ancestor (LCA) (Livello Advanced)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il Lowest Common Ancestor (LCA) di due nodi in un albero è il nodo più profondo che ha entrambi i nodi come discendenti. Un nodo può essere considerato discendente di se stesso, quindi se uno dei nodi è antenato dell'altro, quel nodo è il loro LCA.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il problema di trovare il LCA è fondamentale in molti algoritmi su alberi e ha numerose applicazioni pratiche, dalla bioinformatica ai sistemi di file gerarchici, fino ai problemi di routing nelle reti.
        </p>
        <p className="text-lg leading-relaxed">
          In questa lezione, esploreremo diversi algoritmi per calcolare il LCA in modo efficiente:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Approccio naive con risalita dell'albero</li>
          <li className="mb-1">Algoritmo di Tarjan (offline)</li>
          <li className="mb-1">Binary Lifting (online)</li>
          <li className="mb-1">Sparse Table e Range Minimum Query (RMQ)</li>
          <li className="mb-1">Algoritmo di Farach-Colton e Bender (LCA in tempo costante)</li>
        </ul>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Approccio Naive</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'approccio più semplice per trovare il LCA di due nodi è risalire l'albero dai nodi fino a trovare un antenato comune.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">2.1 Algoritmo</h3>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Calcola la profondità di ogni nodo nell'albero.</li>
          <li className="mb-1">Porta i due nodi alla stessa profondità facendo risalire il nodo più profondo.</li>
          <li className="mb-1">Risali l'albero da entrambi i nodi contemporaneamente finché non raggiungono lo stesso nodo.</li>
        </ol>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">2.2 Implementazione</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
vector<int> tree[MAXN];
int depth[MAXN];
int parent[MAXN];

// Calcola la profondità e il genitore di ogni nodo
void dfs(int node, int par, int d) {
    depth[node] = d;
    parent[node] = par;
    
    for (int child : tree[node]) {
        if (child != par) {
            dfs(child, node, d + 1);
        }
    }
}

// Trova il LCA di due nodi con l'approccio naive
int lca_naive(int u, int v) {
    // Porta i nodi alla stessa profondità
    while (depth[u] > depth[v]) {
        u = parent[u];
    }
    while (depth[v] > depth[u]) {
        v = parent[v];
    }
    
    // Risali l'albero finché non trovi il LCA
    while (u != v) {
        u = parent[u];
        v = parent[v];
    }
    
    return u;
}

int main() {
    int n, q;
    cin >> n >> q;
    
    // Costruisci l'albero
    for (int i = 1; i < n; i++) {
        int u, v;
        cin >> u >> v;
        tree[u].push_back(v);
        tree[v].push_back(u);
    }
    
    // Calcola profondità e genitori
    dfs(1, -1, 0);
    
    // Rispondi alle query
    while (q--) {
        int u, v;
        cin >> u >> v;
        cout << lca_naive(u, v) << endl;
    }
    
    return 0;
}`}</code></pre>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">2.3 Complessità</h3>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Tempo:</strong> O(h) per query, dove h è l'altezza dell'albero. Nel caso peggiore, h può essere O(n).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Spazio:</strong> O(n) per memorizzare l'albero, le profondità e i genitori.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Questo approccio è semplice ma inefficiente per alberi profondi o per molte query.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Algoritmo di Tarjan (Offline)</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo di Tarjan è un approccio offline che utilizza Union-Find per risolvere tutte le query LCA in un'unica passata dell'albero.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">3.1 Idea Principale</h3>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo esegue una DFS sull'albero e utilizza Union-Find per tenere traccia dei sottoinsiemi di nodi già visitati. Per ogni nodo visitato, processa tutte le query che coinvolgono quel nodo e marca il nodo come "visitato".
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">3.2 Implementazione</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
vector<int> tree[MAXN];
vector<pair<int, int>> queries[MAXN];  // queries[u] = {v, query_id}
int ancestor[MAXN];
bool visited[MAXN];
int result[MAXN];  // result[i] = LCA della query i

// Union-Find
int parent[MAXN];
int find(int x) {
    if (parent[x] != x) {
        parent[x] = find(parent[x]);
    }
    return parent[x];
}

void unite(int x, int y) {
    parent[find(x)] = find(y);
}

// Algoritmo di Tarjan
void tarjan(int u) {
    parent[u] = u;  // Inizializza il set per questo nodo
    ancestor[u] = u;  // Il nodo è il suo stesso antenato inizialmente
    
    for (int v : tree[u]) {
        if (v != parent[u]) {  // Evita di tornare al genitore
            tarjan(v);
            unite(u, v);  // Unisci i set
            ancestor[find(u)] = u;  // L'antenato del set unito è u
        }
    }
    
    visited[u] = true;  // Marca il nodo come visitato
    
    // Processa le query che coinvolgono u
    for (auto q : queries[u]) {
        int v = q.first;
        int query_id = q.second;
        
        if (visited[v]) {
            result[query_id] = ancestor[find(v)];
        }
    }
}

int main() {
    int n, q;
    cin >> n >> q;
    
    // Costruisci l'albero
    for (int i = 1; i < n; i++) {
        int u, v;
        cin >> u >> v;
        tree[u].push_back(v);
        tree[v].push_back(u);
    }
    
    // Leggi le query
    for (int i = 0; i < q; i++) {
        int u, v;
        cin >> u >> v;
        queries[u].push_back({v, i});
        queries[v].push_back({u, i});
    }
    
    // Inizializza
    memset(visited, false, sizeof(visited));
    
    // Esegui l'algoritmo di Tarjan
    tarjan(1);  // Inizia dalla radice
    
    // Stampa i risultati
    for (int i = 0; i < q; i++) {
        cout << result[i] << endl;
    }
    
    return 0;
}`}</code></pre>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">3.3 Complessità</h3>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Tempo:</strong> O(n + q * α(n)), dove α è la funzione inversa di Ackermann, che cresce molto lentamente e può essere considerata praticamente costante.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Spazio:</strong> O(n + q) per memorizzare l'albero e le query.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Questo algoritmo è molto efficiente ma è offline, il che significa che tutte le query devono essere note in anticipo.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Binary Lifting (Online)</h2>
        <p className="text-lg leading-relaxed mb-4">
          Binary Lifting è una tecnica potente che permette di risolvere il problema LCA in modo online (le query possono essere elaborate una alla volta) con complessità logaritmica.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">4.1 Idea Principale</h3>
        <p className="text-lg leading-relaxed mb-4">
          L'idea è precalcolare, per ogni nodo, il suo 2^j-esimo antenato per j = 0, 1, 2, ... log(n). Questo permette di risalire rapidamente l'albero utilizzando la rappresentazione binaria della differenza di profondità.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">4.2 Implementazione</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
const int LOGN = 20;  // log2(MAXN)

vector<int> tree[MAXN];
int up[MAXN][LOGN];  // up[u][j] = 2^j-esimo antenato di u
int depth[MAXN];

// Calcola la profondità e inizializza up[u][0]
void dfs(int u, int par) {
    depth[u] = depth[par] + 1;
    up[u][0] = par;
    
    for (int j = 1; j < LOGN; j++) {
        up[u][j] = up[up[u][j-1]][j-1];
    }
    
    for (int v : tree[u]) {
        if (v != par) {
            dfs(v, u);
        }
    }
}

// Trova il LCA di due nodi con Binary Lifting
int lca(int u, int v) {
    // Assicurati che u sia il nodo più profondo
    if (depth[u] < depth[v]) {
        swap(u, v);
    }
    
    // Porta u alla stessa profondità di v
    int diff = depth[u] - depth[v];
    for (int j = 0; j < LOGN; j++) {
        if (diff & (1 << j)) {
            u = up[u][j];
        }
    }
    
    // Se u e v sono lo stesso nodo, abbiamo trovato il LCA
    if (u == v) {
        return u;
    }
    
    // Risali l'albero finché non trovi il LCA
    for (int j = LOGN - 1; j >= 0; j--) {
        if (up[u][j] != up[v][j]) {
            u = up[u][j];
            v = up[v][j];
        }
    }
    
    return up[u][0];  // Il genitore di u (o v) è il LCA
}

int main() {
    int n, q;
    cin >> n >> q;
    
    // Costruisci l'albero
    for (int i = 1; i < n; i++) {
        int u, v;
        cin >> u >> v;
        tree[u].push_back(v);
        tree[v].push_back(u);
    }
    
    // Inizializza
    depth[0] = -1;  // Profondità del nodo fittizio 0 (genitore della radice)
    for (int i = 0; i <= n; i++) {
        for (int j = 0; j < LOGN; j++) {
            up[i][j] = 0;  // Inizializza a 0 (nodo fittizio)
        }
    }
    
    // Precalcola le informazioni
    dfs(1, 0);  // Inizia dalla radice con genitore fittizio 0
    
    // Rispondi alle query
    while (q--) {
        int u, v;
        cin >> u >> v;
        cout << lca(u, v) << endl;
    }
    
    return 0;
}`}</code></pre>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">4.3 Complessità</h3>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Tempo:</strong> O(n log n) per il precalcolo e O(log n) per query.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Spazio:</strong> O(n log n) per memorizzare la tabella up.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Binary Lifting è un metodo molto efficiente e versatile che può essere esteso per risolvere altri problemi su alberi.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Sparse Table e Range Minimum Query (RMQ)</h2>
        <p className="text-lg leading-relaxed mb-4">
          Un altro approccio efficiente per il problema LCA è ridurlo a un problema di Range Minimum Query (RMQ) utilizzando l'Euler Tour dell'albero.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">5.1 Idea Principale</h3>
        <p className="text-lg leading-relaxed mb-4">
          L'idea è eseguire un Euler Tour dell'albero, registrando la sequenza di nodi visitati e le loro profondità. Il LCA di due nodi corrisponde al nodo con la profondità minima nell'intervallo dell'Euler Tour tra le prime occorrenze dei due nodi.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">5.2 Implementazione</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
const int LOGN = 20;  // log2(MAXN)

vector<int> tree[MAXN];
int euler[2 * MAXN];  // Euler tour
int first_occurrence[MAXN];  // Prima occorrenza di ogni nodo nell'Euler tour
int depth[MAXN];
int tour_idx;

// Sparse Table per RMQ
int st[2 * MAXN][LOGN];
int log_table[2 * MAXN];

// Esegue l'Euler Tour
void euler_tour(int u, int par, int d) {
    euler[tour_idx] = u;
    first_occurrence[u] = tour_idx;
    depth[u] = d;
    tour_idx++;
    
    for (int v : tree[u]) {
        if (v != par) {
            euler_tour(v, u, d + 1);
            euler[tour_idx] = u;  // Ritorna al genitore
            tour_idx++;
        }
    }
}

// Costruisce la Sparse Table per RMQ
void build_sparse_table(int n) {
    // Inizializza la tabella dei logaritmi
    log_table[1] = 0;
    for (int i = 2; i <= n; i++) {
        log_table[i] = log_table[i/2] + 1;
    }
    
    // Inizializza la Sparse Table con i valori di base
    for (int i = 0; i < n; i++) {
        st[i][0] = i;
    }
    
    // Costruisce la Sparse Table
    for (int j = 1; (1 << j) <= n; j++) {
        for (int i = 0; i + (1 << j) - 1 < n; i++) {
            if (depth[euler[st[i][j-1]]] < depth[euler[st[i + (1 << (j-1))][j-1]]]) {
                st[i][j] = st[i][j-1];
            } else {
                st[i][j] = st[i + (1 << (j-1))][j-1];
            }
        }
    }
}

// Query RMQ con Sparse Table
int rmq(int l, int r) {
    int len = r - l + 1;
    int k = log_table[len];
    
    if (depth[euler[st[l][k]]] < depth[euler[st[r - (1 << k) + 1][k]]]) {
        return st[l][k];
    } else {
        return st[r - (1 << k) + 1][k];
    }
}

// Trova il LCA di due nodi
int lca(int u, int v) {
    int l = first_occurrence[u];
    int r = first_occurrence[v];
    
    if (l > r) {
        swap(l, r);
    }
    
    int idx = rmq(l, r);
    return euler[idx];
}

int main() {
    int n, q;
    cin >> n >> q;
    
    // Costruisci l'albero
    for (int i = 1; i < n; i++) {
        int u, v;
        cin >> u >> v;
        tree[u].push_back(v);
        tree[v].push_back(u);
    }
    
    // Esegui l'Euler Tour
    tour_idx = 0;
    euler_tour(1, -1, 0);
    
    // Costruisci la Sparse Table
    build_sparse_table(tour_idx);
    
    // Rispondi alle query
    while (q--) {
        int u, v;
        cin >> u >> v;
        cout << lca(u, v) << endl;
    }
    
    return 0;
}`}</code></pre>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">5.3 Complessità</h3>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Tempo:</strong> O(n log n) per il precalcolo e O(1) per query.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Spazio:</strong> O(n log n) per memorizzare la Sparse Table.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Questo approccio è molto efficiente per le query, ma richiede più spazio e ha un precalcolo più complesso rispetto a Binary Lifting.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Algoritmo di Farach-Colton e Bender</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo di Farach-Colton e Bender è un metodo avanzato che permette di risolvere il problema LCA in tempo costante per query dopo un precalcolo lineare.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">6.1 Idea Principale</h3>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo si basa sulla riduzione del problema LCA a RMQ, come nell'approccio precedente, ma utilizza una tecnica speciale per risolvere RMQ in tempo costante con precalcolo lineare.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          L'idea chiave è dividere l'array in blocchi di dimensione log n / 2 e utilizzare una combinazione di tabelle precalcolate e maschere di bit per risolvere RMQ in tempo costante.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">6.2 Implementazione</h3>
        <p className="text-lg leading-relaxed mb-4">
          L'implementazione completa di questo algoritmo è piuttosto complessa e va oltre lo scopo di questa lezione. Tuttavia, ecco uno pseudocodice che illustra l'idea generale:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Pseudocodice per l'algoritmo di Farach-Colton e Bender

// 1. Esegui l'Euler Tour dell'albero
euler_tour(root);

// 2. Dividi l'array dell'Euler Tour in blocchi di dimensione log n / 2
block_size = log(n) / 2;
num_blocks = ceil(euler_tour_size / block_size);

// 3. Per ogni blocco, precalcola il minimo
for each block b:
    compute_block_minimum(b);

// 4. Costruisci una Sparse Table sui minimi dei blocchi
build_sparse_table(block_minimums);

// 5. Precalcola tutte le possibili query RMQ per blocchi di dimensione log n / 2
// (ci sono 2^(log n / 2) = sqrt(n) possibili configurazioni)
precompute_all_possible_rmq();

// 6. Per una query RMQ(l, r):
rmq(l, r):
    // Trova i blocchi che contengono l e r
    block_l = l / block_size;
    block_r = r / block_size;
    
    if block_l == block_r:
        // l e r sono nello stesso blocco, usa la tabella precalcolata
        return precomputed_rmq(l % block_size, r % block_size, block_type[block_l]);
    else:
        // Calcola il minimo in tre parti:
        // 1. Dal punto l alla fine del suo blocco
        min1 = precomputed_rmq(l % block_size, block_size - 1, block_type[block_l]);
        
        // 2. Dai blocchi completi tra l e r
        min2 = sparse_table_query(block_l + 1, block_r - 1);
        
        // 3. Dall'inizio del blocco di r fino a r
        min3 = precomputed_rmq(0, r % block_size, block_type[block_r]);
        
        // Restituisci il minimo globale
        return min(min1, min2, min3);

// 7. LCA(u, v) = euler[rmq(first_occurrence[u], first_occurrence[v])]`}</code></pre>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">6.3 Complessità</h3>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Tempo:</strong> O(n) per il precalcolo e O(1) per query.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Spazio:</strong> O(n) per memorizzare le strutture dati necessarie.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Questo algoritmo è teoricamente ottimale, ma a causa della sua complessità e delle costanti nascoste, in pratica spesso si preferisce utilizzare Binary Lifting o l'approccio con Sparse Table.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">7. Applicazioni del LCA</h2>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">7.1 Distanza tra Nodi</h3>
        <p className="text-lg leading-relaxed mb-4">
          La distanza tra due nodi u e v in un albero può essere calcolata come:
        </p>
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mb-4">
          <p className="text-center text-lg">
            dist(u, v) = depth[u] + depth[v] - 2 * depth[lca(u, v)]
          </p>
        </div>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Calcola la distanza tra due nodi
int distance(int u, int v) {
    int lca_node = lca(u, v);
    return depth[u] + depth[v] - 2 * depth[lca_node];
}`}</code></pre>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">7.2 K-esimo Antenato</h3>
        <p className="text-lg leading-relaxed mb-4">
          Con Binary Lifting, possiamo facilmente trovare il k-esimo antenato di un nodo:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Trova il k-esimo antenato di un nodo
int kth_ancestor(int u, int k) {
    for (int j = 0; j < LOGN; j++) {
        if (k & (1 << j)) {
            u = up[u][j];
        }
    }
    return u;
}`}</code></pre>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">7.3 K-esimo Nodo sul Percorso</h3>
        <p className="text-lg leading-relaxed mb-4">
          Possiamo trovare il k-esimo nodo sul percorso da u a v:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Trova il k-esimo nodo sul percorso da u a v
int kth_node_on_path(int u, int v, int k) {
    int lca_node = lca(u, v);
    int dist_u_lca = depth[u] - depth[lca_node];
    
    if (k <= dist_u_lca) {
        // Il k-esimo nodo è nel percorso da u a lca
        return kth_ancestor(u, k);
    } else {
        // Il k-esimo nodo è nel percorso da lca a v
        int dist_lca_v = depth[v] - depth[lca_node];
        int k_from_v = dist_u_lca + dist_lca_v - k;
        return kth_ancestor(v, k_from_v);
    }
}`}</code></pre>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">7.4 Percorso più Lungo in un Albero (Diametro)</h3>
        <p className="text-lg leading-relaxed mb-4">
          Il diametro di un albero è la lunghezza del percorso più lungo tra due nodi. Può essere calcolato utilizzando due DFS:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Calcola il diametro di un albero
pair<int, int> farthest_node(int start) {
    vector<int> dist(MAXN, -1);
    queue<int> q;
    q.push(start);
    dist[start] = 0;
    
    int farthest = start;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        if (dist[u] > dist[farthest]) {
            farthest = u;
        }
        
        for (int v : tree[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    
    return {farthest, dist[farthest]};
}

int diameter() {
    // Trova il nodo più lontano dalla radice
    pair<int, int> end1 = farthest_node(1);
    
    // Trova il nodo più lontano da end1
    pair<int, int> end2 = farthest_node(end1.first);
    
    return end2.second;  // La distanza è il diametro
}`}</code></pre>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">8. Problemi di Esempio</h2>
        
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Problema 1: Distanza tra Nodi</h3>
          <p className="mb-2">
            <strong>Descrizione:</strong> Ti viene dato un albero con n nodi e q query. Per ogni query, devi trovare la distanza tra due nodi u e v.
          </p>
          <p className="mb-2">
            <strong>Soluzione:</strong> Utilizziamo Binary Lifting per calcolare il LCA e poi calcoliamo la distanza come depth[u] + depth[v] - 2 * depth[lca(u, v)].
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mt-2"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
const int LOGN = 20;

vector<int> tree[MAXN];
int up[MAXN][LOGN];
int depth[MAXN];

void dfs(int u, int par) {
    depth[u] = depth[par] + 1;
    up[u][0] = par;
    
    for (int j = 1; j < LOGN; j++) {
        up[u][j] = up[up[u][j-1]][j-1];
    }
    
    for (int v : tree[u]) {
        if (v != par) {
            dfs(v, u);
        }
    }
}

int lca(int u, int v) {
    if (depth[u] < depth[v]) {
        swap(u, v);
    }
    
    int diff = depth[u] - depth[v];
    for (int j = 0; j < LOGN; j++) {
        if (diff & (1 << j)) {
            u = up[u][j];
        }
    }
    
    if (u == v) {
        return u;
    }
    
    for (int j = LOGN - 1; j >= 0; j--) {
        if (up[u][j] != up[v][j]) {
            u = up[u][j];
            v = up[v][j];
        }
    }
    
    return up[u][0];
}

int distance(int u, int v) {
    int lca_node = lca(u, v);
    return depth[u] + depth[v] - 2 * depth[lca_node];
}

int main() {
    int n, q;
    cin >> n >> q;
    
    for (int i = 1; i < n; i++) {
        int u, v;
        cin >> u >> v;
        tree[u].push_back(v);
        tree[v].push_back(u);
    }
    
    depth[0] = -1;
    dfs(1, 0);
    
    while (q--) {
        int u, v;
        cin >> u >> v;
        cout << distance(u, v) << endl;
    }
    
    return 0;
}`}</code></pre>
        </div>
        
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Problema 2: K-esimo Antenato</h3>
          <p className="mb-2">
            <strong>Descrizione:</strong> Ti viene dato un albero con n nodi e q query. Per ogni query, devi trovare il k-esimo antenato di un nodo u.
          </p>
          <p className="mb-2">
            <strong>Soluzione:</strong> Utilizziamo Binary Lifting per trovare il k-esimo antenato in modo efficiente.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mt-2"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
const int LOGN = 20;

vector<int> tree[MAXN];
int up[MAXN][LOGN];
int depth[MAXN];

void dfs(int u, int par) {
    depth[u] = depth[par] + 1;
    up[u][0] = par;
    
    for (int j = 1; j < LOGN; j++) {
        up[u][j] = up[up[u][j-1]][j-1];
    }
    
    for (int v : tree[u]) {
        if (v != par) {
            dfs(v, u);
        }
    }
}

int kth_ancestor(int u, int k) {
    if (depth[u] <= k) {
        return -1;  // Non esiste un k-esimo antenato
    }
    
    for (int j = 0; j < LOGN; j++) {
        if (k & (1 << j)) {
            u = up[u][j];
        }
    }
    
    return u;
}

int main() {
    int n, q;
    cin >> n >> q;
    
    for (int i = 1; i < n; i++) {
        int u, v;
        cin >> u >> v;
        tree[u].push_back(v);
        tree[v].push_back(u);
    }
    
    depth[0] = -1;
    dfs(1, 0);
    
    while (q--) {
        int u, k;
        cin >> u >> k;
        cout << kth_ancestor(u, k) << endl;
    }
    
    return 0;
}`}</code></pre>
        </div>
        
        <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Problema 3: Percorso più Lungo</h3>
          <p className="mb-2">
            <strong>Descrizione:</strong> Ti viene dato un albero con n nodi. Devi trovare la lunghezza del percorso più lungo (diametro) nell'albero.
          </p>
          <p className="mb-2">
            <strong>Soluzione:</strong> Utilizziamo due DFS per trovare il diametro dell'albero.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mt-2"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
vector<int> tree[MAXN];
int dist[MAXN];

// Trova il nodo più lontano da start e la sua distanza
pair<int, int> farthest_node(int start) {
    fill(dist, dist + MAXN, -1);
    queue<int> q;
    q.push(start);
    dist[start] = 0;
    
    int farthest = start;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        if (dist[u] > dist[farthest]) {
            farthest = u;
        }
        
        for (int v : tree[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    
    return {farthest, dist[farthest]};
}

int diameter() {
    // Trova il nodo più lontano dalla radice
    pair<int, int> end1 = farthest_node(1);
    
    // Trova il nodo più lontano da end1
    pair<int, int> end2 = farthest_node(end1.first);
    
    return end2.second;  // La distanza è il diametro
}

int main() {
    int n;
    cin >> n;
    
    for (int i = 1; i < n; i++) {
        int u, v;
        cin >> u >> v;
        tree[u].push_back(v);
        tree[v].push_back(u);
    }
    
    cout << "Diametro dell'albero: " << diameter() << endl;
    
    return 0;
}`}</code></pre>
        </div>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">9. Conclusioni e Risorse Aggiuntive</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il problema del Lowest Common Ancestor è fondamentale in molti algoritmi su alberi e ha numerose applicazioni pratiche. Abbiamo esplorato diversi algoritmi per risolverlo, ciascuno con i suoi vantaggi e svantaggi:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">L'approccio naive è semplice ma inefficiente per alberi profondi.</li>
          <li className="mb-1">L'algoritmo di Tarjan è efficiente ma offline.</li>
          <li className="mb-1">Binary Lifting è un metodo versatile e efficiente per query online.</li>
          <li className="mb-1">L'approccio con Sparse Table e RMQ offre query in tempo costante con un precalcolo ragionevole.</li>
          <li className="mb-1">L'algoritmo di Farach-Colton e Bender è teoricamente ottimale ma complesso da implementare.</li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">
          In pratica, Binary Lifting è spesso la scelta migliore per la sua semplicità ed efficienza.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">Risorse Aggiuntive</h3>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">
            <a href="https://cp-algorithms.com/graph/lca.html" className="text-blue-600 dark:text-blue-400 hover:underline">CP-Algorithms: Lowest Common Ancestor</a>
          </li>
          <li className="mb-1">
            <a href="https://cp-algorithms.com/graph/lca_binary_lifting.html" className="text-blue-600 dark:text-blue-400 hover:underline">CP-Algorithms: Binary Lifting</a>
          </li>
          <li className="mb-1">
            <a href="https://cp-algorithms.com/data_structures/sparse-table.html" className="text-blue-600 dark:text-blue-400 hover:underline">CP-Algorithms: Sparse Table</a>
          </li>
          <li className="mb-1">
            <a href="https://www.geeksforgeeks.org/lca-in-a-tree-using-binary-lifting-technique/" className="text-blue-600 dark:text-blue-400 hover:underline">GeeksforGeeks: LCA using Binary Lifting</a>
          </li>
        </ul>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">10. Esercizi Proposti</h2>
        <p className="text-lg leading-relaxed mb-4">
          Per padroneggiare il concetto di Lowest Common Ancestor, ti consigliamo di risolvere i seguenti problemi:
        </p>
        
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Esercizio 1: SPOJ LCA - Lowest Common Ancestor</h3>
          <p className="mb-2">
            Un problema classico per implementare l'algoritmo LCA.
          </p>
          <p>
            <a href="https://www.spoj.com/problems/LCA/" className="text-blue-600 dark:text-blue-400 hover:underline">Link al problema</a>
          </p>
        </div>
        
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Esercizio 2: Codeforces 191C - Fools and Roads</h3>
          <p className="mb-2">
            Un problema che richiede l'uso di LCA per calcolare il numero di volte che ogni arco viene attraversato.
          </p>
          <p>
            <a href="https://codeforces.com/contest/191/problem/C" className="text-blue-600 dark:text-blue-400 hover:underline">Link al problema</a>
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Esercizio 3: USACO Gold - Cow Land</h3>
          <p className="mb-2">
            Un problema che combina LCA con operazioni XOR su percorsi in un albero.
          </p>
          <p>
            <a href="http://www.usaco.org/index.php?page=viewproblem2&cpid=921" className="text-blue-600 dark:text-blue-400 hover:underline">Link al problema</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default LowestCommonAncestorPage;
