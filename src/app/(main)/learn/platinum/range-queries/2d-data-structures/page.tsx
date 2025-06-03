import React from 'react';

const DataStructures2DPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Strutture Dati 2D (Livello Platinum)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione alle Strutture Dati 2D</h2>
        <p className="text-lg leading-relaxed mb-4">
          Le strutture dati 2D sono estensioni delle strutture dati monodimensionali che ci permettono di gestire efficientemente query e aggiornamenti su griglie bidimensionali. Queste strutture sono fondamentali per risolvere problemi geometrici e problemi che coinvolgono matrici.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In questa lezione, esploreremo diverse strutture dati 2D, con particolare attenzione a:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Segment Tree 2D</li>
          <li className="mb-1">Fenwick Tree 2D (Binary Indexed Tree 2D)</li>
          <li className="mb-1">Sparse Table 2D</li>
          <li className="mb-1">Tecniche di decomposizione per problemi 2D</li>
        </ul>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Segment Tree 2D</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il Segment Tree 2D è un'estensione naturale del Segment Tree monodimensionale. Ci sono due approcci principali per implementare un Segment Tree 2D:
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>2.1 Segment Tree di Segment Trees:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In questo approccio, costruiamo un Segment Tree primario per una dimensione (ad esempio, le righe), e ogni nodo di questo Segment Tree contiene un Segment Tree secondario per l'altra dimensione (le colonne). Questo approccio è concettualmente più semplice ma richiede più memoria.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1005;
int matrix[MAXN][MAXN];
int tree[4*MAXN][4*MAXN]; // Segment Tree 2D

// Costruzione del Segment Tree secondario (per le colonne)
void build_y(int node_x, int start_x, int end_x, int node_y, int start_y, int end_y) {
    if (start_y == end_y) {
        if (start_x == end_x) {
            // Foglia del Segment Tree 2D
            tree[node_x][node_y] = matrix[start_x][start_y];
        } else {
            // Combina i risultati dai figli del Segment Tree primario
            tree[node_x][node_y] = tree[2*node_x][node_y] + tree[2*node_x+1][node_y];
        }
        return;
    }
    
    int mid_y = (start_y + end_y) / 2;
    build_y(node_x, start_x, end_x, 2*node_y, start_y, mid_y);
    build_y(node_x, start_x, end_x, 2*node_y+1, mid_y+1, end_y);
    
    // Combina i risultati dai figli del Segment Tree secondario
    tree[node_x][node_y] = tree[node_x][2*node_y] + tree[node_x][2*node_y+1];
}

// Costruzione del Segment Tree primario (per le righe)
void build_x(int node_x, int start_x, int end_x, int n) {
    if (start_x != end_x) {
        int mid_x = (start_x + end_x) / 2;
        build_x(2*node_x, start_x, mid_x, n);
        build_x(2*node_x+1, mid_x+1, end_x, n);
    }
    
    // Costruisci il Segment Tree secondario per questo nodo
    build_y(node_x, start_x, end_x, 1, 0, n-1);
}

// Query sul Segment Tree secondario
int query_y(int node_x, int node_y, int start_y, int end_y, int l_y, int r_y) {
    if (r_y < start_y || end_y < l_y) {
        return 0; // Nessuna sovrapposizione
    }
    if (l_y <= start_y && end_y <= r_y) {
        return tree[node_x][node_y]; // Sovrapposizione completa
    }
    
    int mid_y = (start_y + end_y) / 2;
    int left_sum = query_y(node_x, 2*node_y, start_y, mid_y, l_y, r_y);
    int right_sum = query_y(node_x, 2*node_y+1, mid_y+1, end_y, l_y, r_y);
    
    return left_sum + right_sum;
}

// Query sul Segment Tree primario
int query_x(int node_x, int start_x, int end_x, int l_x, int r_x, int l_y, int r_y, int n) {
    if (r_x < start_x || end_x < l_x) {
        return 0; // Nessuna sovrapposizione
    }
    if (l_x <= start_x && end_x <= r_x) {
        return query_y(node_x, 1, 0, n-1, l_y, r_y); // Sovrapposizione completa in x
    }
    
    int mid_x = (start_x + end_x) / 2;
    int left_sum = query_x(2*node_x, start_x, mid_x, l_x, r_x, l_y, r_y, n);
    int right_sum = query_x(2*node_x+1, mid_x+1, end_x, l_x, r_x, l_y, r_y, n);
    
    return left_sum + right_sum;
}

// Aggiornamento sul Segment Tree secondario
void update_y(int node_x, int start_x, int end_x, int node_y, int start_y, int end_y, int x, int y, int val) {
    if (start_y == end_y) {
        if (start_x == end_x) {
            // Foglia del Segment Tree 2D
            tree[node_x][node_y] = val;
        } else {
            // Combina i risultati dai figli del Segment Tree primario
            tree[node_x][node_y] = tree[2*node_x][node_y] + tree[2*node_x+1][node_y];
        }
        return;
    }
    
    int mid_y = (start_y + end_y) / 2;
    if (y <= mid_y) {
        update_y(node_x, start_x, end_x, 2*node_y, start_y, mid_y, x, y, val);
    } else {
        update_y(node_x, start_x, end_x, 2*node_y+1, mid_y+1, end_y, x, y, val);
    }
    
    // Combina i risultati dai figli del Segment Tree secondario
    tree[node_x][node_y] = tree[node_x][2*node_y] + tree[node_x][2*node_y+1];
}

// Aggiornamento sul Segment Tree primario
void update_x(int node_x, int start_x, int end_x, int x, int y, int val, int n) {
    if (start_x != end_x) {
        int mid_x = (start_x + end_x) / 2;
        if (x <= mid_x) {
            update_x(2*node_x, start_x, mid_x, x, y, val, n);
        } else {
            update_x(2*node_x+1, mid_x+1, end_x, x, y, val, n);
        }
    }
    
    // Aggiorna il Segment Tree secondario per questo nodo
    update_y(node_x, start_x, end_x, 1, 0, n-1, x, y, val);
}

// Funzioni wrapper per semplicità d'uso
void build(int n) {
    build_x(1, 0, n-1, n);
}

int query(int l_x, int r_x, int l_y, int r_y, int n) {
    return query_x(1, 0, n-1, l_x, r_x, l_y, r_y, n);
}

void update(int x, int y, int val, int n) {
    update_x(1, 0, n-1, x, y, val, n);
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>2.2 Segment Tree 2D Diretto:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In questo approccio, trattiamo il Segment Tree 2D come una struttura unica che divide ricorsivamente il piano in quattro quadranti. Questo approccio è più compatto ma può essere più complesso da implementare.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1005;
int matrix[MAXN][MAXN];
int tree[4*MAXN*MAXN]; // Segment Tree 2D diretto

// Funzione di utilità per calcolare l'indice nel tree
int get_index(int node, int start_x, int end_x, int start_y, int end_y) {
    return node;
}

// Costruzione del Segment Tree 2D
void build(int node, int start_x, int end_x, int start_y, int end_y) {
    if (start_x == end_x && start_y == end_y) {
        // Foglia del Segment Tree 2D
        tree[node] = matrix[start_x][start_y];
        return;
    }
    
    int mid_x = (start_x + end_x) / 2;
    int mid_y = (start_y + end_y) / 2;
    
    // Indici dei quattro figli (quadranti)
    int child1 = get_index(4*node-2, start_x, mid_x, start_y, mid_y);
    int child2 = get_index(4*node-1, start_x, mid_x, mid_y+1, end_y);
    int child3 = get_index(4*node, mid_x+1, end_x, start_y, mid_y);
    int child4 = get_index(4*node+1, mid_x+1, end_x, mid_y+1, end_y);
    
    // Costruisci ricorsivamente i quattro quadranti
    build(child1, start_x, mid_x, start_y, mid_y);
    if (mid_y < end_y) build(child2, start_x, mid_x, mid_y+1, end_y);
    if (mid_x < end_x) build(child3, mid_x+1, end_x, start_y, mid_y);
    if (mid_x < end_x && mid_y < end_y) build(child4, mid_x+1, end_x, mid_y+1, end_y);
    
    // Combina i risultati dai quattro quadranti
    tree[node] = tree[child1];
    if (mid_y < end_y) tree[node] += tree[child2];
    if (mid_x < end_x) tree[node] += tree[child3];
    if (mid_x < end_x && mid_y < end_y) tree[node] += tree[child4];
}

// Query sul Segment Tree 2D
int query(int node, int start_x, int end_x, int start_y, int end_y, int l_x, int r_x, int l_y, int r_y) {
    if (r_x < start_x || end_x < l_x || r_y < start_y || end_y < l_y) {
        return 0; // Nessuna sovrapposizione
    }
    if (l_x <= start_x && end_x <= r_x && l_y <= start_y && end_y <= r_y) {
        return tree[node]; // Sovrapposizione completa
    }
    
    int mid_x = (start_x + end_x) / 2;
    int mid_y = (start_y + end_y) / 2;
    
    // Indici dei quattro figli (quadranti)
    int child1 = get_index(4*node-2, start_x, mid_x, start_y, mid_y);
    int child2 = get_index(4*node-1, start_x, mid_x, mid_y+1, end_y);
    int child3 = get_index(4*node, mid_x+1, end_x, start_y, mid_y);
    int child4 = get_index(4*node+1, mid_x+1, end_x, mid_y+1, end_y);
    
    // Query ricorsivamente sui quattro quadranti
    int sum = 0;
    sum += query(child1, start_x, mid_x, start_y, mid_y, l_x, r_x, l_y, r_y);
    if (mid_y < end_y) sum += query(child2, start_x, mid_x, mid_y+1, end_y, l_x, r_x, l_y, r_y);
    if (mid_x < end_x) sum += query(child3, mid_x+1, end_x, start_y, mid_y, l_x, r_x, l_y, r_y);
    if (mid_x < end_x && mid_y < end_y) sum += query(child4, mid_x+1, end_x, mid_y+1, end_y, l_x, r_x, l_y, r_y);
    
    return sum;
}

// Aggiornamento sul Segment Tree 2D
void update(int node, int start_x, int end_x, int start_y, int end_y, int x, int y, int val) {
    if (start_x == end_x && start_y == end_y) {
        // Foglia del Segment Tree 2D
        tree[node] = val;
        return;
    }
    
    int mid_x = (start_x + end_x) / 2;
    int mid_y = (start_y + end_y) / 2;
    
    // Indici dei quattro figli (quadranti)
    int child1 = get_index(4*node-2, start_x, mid_x, start_y, mid_y);
    int child2 = get_index(4*node-1, start_x, mid_x, mid_y+1, end_y);
    int child3 = get_index(4*node, mid_x+1, end_x, start_y, mid_y);
    int child4 = get_index(4*node+1, mid_x+1, end_x, mid_y+1, end_y);
    
    // Aggiorna ricorsivamente il quadrante appropriato
    if (x <= mid_x && y <= mid_y) {
        update(child1, start_x, mid_x, start_y, mid_y, x, y, val);
    } else if (x <= mid_x && y > mid_y) {
        update(child2, start_x, mid_x, mid_y+1, end_y, x, y, val);
    } else if (x > mid_x && y <= mid_y) {
        update(child3, mid_x+1, end_x, start_y, mid_y, x, y, val);
    } else {
        update(child4, mid_x+1, end_x, mid_y+1, end_y, x, y, val);
    }
    
    // Combina i risultati dai quattro quadranti
    tree[node] = tree[child1];
    if (mid_y < end_y) tree[node] += tree[child2];
    if (mid_x < end_x) tree[node] += tree[child3];
    if (mid_x < end_x && mid_y < end_y) tree[node] += tree[child4];
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Costruzione: O(N² log² N)</li>
          <li className="mb-1">Aggiornamento: O(log² N)</li>
          <li className="mb-1">Query: O(log² N)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Il Segment Tree 2D è molto potente ma richiede molta memoria (O(N² log² N) nel caso peggiore) e può essere complesso da implementare correttamente.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Fenwick Tree 2D (Binary Indexed Tree 2D)</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il Fenwick Tree 2D è un'estensione del Fenwick Tree monodimensionale e offre un'alternativa più efficiente in termini di memoria rispetto al Segment Tree 2D per problemi di somma prefissa 2D.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1005;
int bit[MAXN][MAXN]; // Fenwick Tree 2D

// Aggiorna il valore alla posizione (x, y)
void update(int x, int y, int val, int n, int m) {
    for (int i = x; i <= n; i += i & -i) {
        for (int j = y; j <= m; j += j & -j) {
            bit[i][j] += val;
        }
    }
}

// Somma prefissa fino alla posizione (x, y)
int query(int x, int y) {
    int sum = 0;
    for (int i = x; i > 0; i -= i & -i) {
        for (int j = y; j > 0; j -= j & -j) {
            sum += bit[i][j];
        }
    }
    return sum;
}

// Somma nella regione rettangolare [(x1, y1), (x2, y2)]
int rangeQuery(int x1, int y1, int x2, int y2) {
    return query(x2, y2) - query(x2, y1-1) - query(x1-1, y2) + query(x1-1, y1-1);
}

// Inizializza il Fenwick Tree 2D con una matrice
void initialize(int matrix[MAXN][MAXN], int n, int m) {
    memset(bit, 0, sizeof(bit));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            update(i, j, matrix[i][j], n, m);
        }
    }
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Costruzione: O(N² log N log M)</li>
          <li className="mb-1">Aggiornamento: O(log N log M)</li>
          <li className="mb-1">Query: O(log N log M)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Il Fenwick Tree 2D è più efficiente in termini di memoria rispetto al Segment Tree 2D (O(N²) vs O(N² log² N)) e ha costanti più piccole, ma supporta solo operazioni di somma.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Sparse Table 2D</h2>
        <p className="text-lg leading-relaxed mb-4">
          La Sparse Table 2D è un'estensione della Sparse Table monodimensionale e può essere utilizzata per query di range statiche (senza aggiornamenti) come minimo, massimo, GCD, ecc.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1005;
const int LOGN = 10; // log2(MAXN)
int matrix[MAXN][MAXN];
int st[LOGN][LOGN][MAXN][MAXN]; // Sparse Table 2D

// Costruzione della Sparse Table 2D per Range Minimum Query
void build(int n, int m) {
    // Caso base: blocchi 1x1
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            st[0][0][i][j] = matrix[i][j];
        }
    }
    
    // Preprocessa blocchi 2^k x 1
    for (int k = 1; (1 << k) <= n; k++) {
        for (int i = 0; i + (1 << k) - 1 < n; i++) {
            for (int j = 0; j < m; j++) {
                st[k][0][i][j] = min(st[k-1][0][i][j], st[k-1][0][i + (1 << (k-1))][j]);
            }
        }
    }
    
    // Preprocessa blocchi 1 x 2^k
    for (int k = 1; (1 << k) <= m; k++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j + (1 << k) - 1 < m; j++) {
                st[0][k][i][j] = min(st[0][k-1][i][j], st[0][k-1][i][j + (1 << (k-1))]);
            }
        }
    }
    
    // Preprocessa blocchi 2^k x 2^l
    for (int k = 1; (1 << k) <= n; k++) {
        for (int l = 1; (1 << l) <= m; l++) {
            for (int i = 0; i + (1 << k) - 1 < n; i++) {
                for (int j = 0; j + (1 << l) - 1 < m; j++) {
                    st[k][l][i][j] = min({
                        st[k-1][l-1][i][j],
                        st[k-1][l-1][i][j + (1 << (l-1))],
                        st[k-1][l-1][i + (1 << (k-1))][j],
                        st[k-1][l-1][i + (1 << (k-1))][j + (1 << (l-1))]
                    });
                }
            }
        }
    }
}

// Query per il minimo nella regione rettangolare [(x1, y1), (x2, y2)]
int query(int x1, int y1, int x2, int y2) {
    int kx = log2(x2 - x1 + 1);
    int ky = log2(y2 - y1 + 1);
    
    return min({
        st[kx][ky][x1][y1],
        st[kx][ky][x1][y2 - (1 << ky) + 1],
        st[kx][ky][x2 - (1 << kx) + 1][y1],
        st[kx][ky][x2 - (1 << kx) + 1][y2 - (1 << ky) + 1]
    });
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Costruzione: O(N² log N log M)</li>
          <li className="mb-1">Query: O(1)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          La Sparse Table 2D è molto efficiente per query (O(1) per operazioni idempotenti come min, max, gcd), ma non supporta aggiornamenti e richiede molta memoria (O(N² log N log M)).
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Tecniche di Decomposizione per Problemi 2D</h2>
        <p className="text-lg leading-relaxed mb-4">
          Per alcuni problemi 2D, possiamo utilizzare tecniche di decomposizione per ridurre la complessità o la memoria richiesta.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>5.1 Decomposizione per Righe/Colonne:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In alcuni casi, possiamo decomporre un problema 2D in una serie di problemi 1D. Ad esempio, per trovare il sottorrettangolo con la somma massima, possiamo utilizzare l'algoritmo di Kadane 2D:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1005;
int matrix[MAXN][MAXN];

// Algoritmo di Kadane 2D per trovare il sottorrettangolo con la somma massima
int maxSubrectangleSum(int n, int m) {
    int max_sum = INT_MIN;
    
    for (int left = 0; left < m; left++) {
        vector<int> temp(n, 0);
        
        for (int right = left; right < m; right++) {
            // Aggiorna l'array temporaneo
            for (int i = 0; i < n; i++) {
                temp[i] += matrix[i][right];
            }
            
            // Applica l'algoritmo di Kadane 1D
            int curr_sum = 0;
            int max_so_far = INT_MIN;
            
            for (int i = 0; i < n; i++) {
                curr_sum = max(temp[i], curr_sum + temp[i]);
                max_so_far = max(max_so_far, curr_sum);
            }
            
            max_sum = max(max_sum, max_so_far);
        }
    }
    
    return max_sum;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>5.2 Square Root Decomposition 2D:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          La Square Root Decomposition può essere estesa a 2D dividendo la griglia in blocchi di dimensione √N x √M:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1005;
int matrix[MAXN][MAXN];
int block_sum[MAXN][MAXN]; // Somma per ogni blocco

// Inizializzazione della Square Root Decomposition 2D
void init(int n, int m) {
    int block_size_n = sqrt(n);
    int block_size_m = sqrt(m);
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            block_sum[i / block_size_n][j / block_size_m] += matrix[i][j];
        }
    }
}

// Query per la somma nella regione rettangolare [(x1, y1), (x2, y2)]
int query(int x1, int y1, int x2, int y2, int n, int m) {
    int block_size_n = sqrt(n);
    int block_size_m = sqrt(m);
    
    int sum = 0;
    
    // Blocchi completamente contenuti
    for (int i = x1 / block_size_n + (x1 % block_size_n > 0); i <= x2 / block_size_n - (x2 % block_size_n < block_size_n - 1); i++) {
        for (int j = y1 / block_size_m + (y1 % block_size_m > 0); j <= y2 / block_size_m - (y2 % block_size_m < block_size_m - 1); j++) {
            sum += block_sum[i][j];
        }
    }
    
    // Celle rimanenti
    for (int i = x1; i <= x2; i++) {
        for (int j = y1; j <= y2; j++) {
            if ((i / block_size_n < x1 / block_size_n + (x1 % block_size_n > 0) || i / block_size_n > x2 / block_size_n - (x2 % block_size_n < block_size_n - 1)) ||
                (j / block_size_m < y1 / block_size_m + (y1 % block_size_m > 0) || j / block_size_m > y2 / block_size_m - (y2 % block_size_m < block_size_m - 1))) {
                sum += matrix[i][j];
            }
        }
    }
    
    return sum;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Costruzione: O(N²)</li>
          <li className="mb-1">Query: O(N + M)</li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Ottimizzazioni e Considerazioni</h2>
        <p className="text-lg leading-relaxed mb-4">
          Quando si lavora con strutture dati 2D, ci sono alcune ottimizzazioni e considerazioni importanti:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Memoria:</strong> Le strutture dati 2D possono richiedere molta memoria. È importante scegliere la struttura più appropriata in base ai vincoli del problema.</li>
          <li className="mb-2"><strong>Compressione delle Coordinate:</strong> Se le coordinate sono sparse o molto grandi, la compressione delle coordinate può ridurre significativamente la memoria richiesta.</li>
          <li className="mb-2"><strong>Lazy Propagation:</strong> Per problemi che coinvolgono range updates, la lazy propagation può essere estesa alle strutture dati 2D, ma diventa più complessa.</li>
          <li className="mb-2"><strong>Strutture Dati Alternative:</strong> In alcuni casi, strutture dati come R-trees o Quadtrees possono essere più appropriate per problemi geometrici.</li>
        </ul>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">7. Problemi di Esempio</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-2"><a href="https://cses.fi/problemset/task/1739" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - Forest Queries II</a>: Un problema che richiede range updates e range queries su una griglia 2D.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/1093/problem/E" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Intersection of Permutations</a>: Un problema che può essere risolto con Fenwick Tree 2D.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/1208/problem/E" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Let Them Slide</a>: Un problema che può essere risolto con tecniche di decomposizione.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/1107/problem/G" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Vasya and Maximum Profit</a>: Un problema che può essere risolto con Sparse Table 2D.</li>
        </ul>
      </section>
    </div>
  );
};

export default DataStructures2DPage;
