import React from 'react';

const RangeUpdateRangeQueryPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Range Update Range Query (Livello Platinum)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione a Range Update Range Query</h2>
        <p className="text-lg leading-relaxed mb-4">
          Nella programmazione competitiva, i problemi di Range Update Range Query (RURQ) sono una classe importante di problemi che richiedono di gestire due tipi di operazioni su un array:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1"><strong>Range Update:</strong> Aggiornare tutti gli elementi in un intervallo [L, R] (ad esempio, aggiungere un valore V a ogni elemento)</li>
          <li className="mb-1"><strong>Range Query:</strong> Calcolare un'aggregazione (somma, minimo, massimo, ecc.) su un intervallo [L, R]</li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">
          Questi problemi sono più complessi rispetto ai problemi di Point Update Range Query (PURQ) che abbiamo visto nella sezione Gold, dove solo un elemento alla volta viene aggiornato. Per risolvere efficientemente i problemi RURQ, abbiamo bisogno di tecniche più avanzate.
        </p>
        <p className="text-lg leading-relaxed">
          In questa lezione, esploreremo:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Segment Tree con Lazy Propagation</li>
          <li className="mb-1">Fenwick Tree per RURQ</li>
          <li className="mb-1">Tecniche di Difference Array</li>
          <li className="mb-1">Square Root Decomposition per RURQ</li>
        </ul>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Segment Tree con Lazy Propagation</h2>
        <p className="text-lg leading-relaxed mb-4">
          La tecnica più comune per risolvere problemi RURQ è l'utilizzo di un Segment Tree con Lazy Propagation. L'idea chiave è di ritardare gli aggiornamenti ai nodi figli fino a quando non è necessario, evitando così aggiornamenti inutili.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>Concetto di Lazy Propagation:</strong>
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Quando un aggiornamento di intervallo copre completamente un nodo, memorizziamo l'aggiornamento in un array "lazy" invece di propagarlo immediatamente ai figli.</li>
          <li className="mb-1">Quando un nodo viene visitato successivamente (per una query o un altro aggiornamento), prima di procedere, applichiamo l'aggiornamento lazy al nodo e propaghiamo l'aggiornamento ai suoi figli.</li>
        </ol>
        <p className="text-lg leading-relaxed mb-2">
          <strong>Implementazione per Range Sum Query con Range Addition Update:</strong>
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
long long tree[4*MAXN]; // Segment tree
long long lazy[4*MAXN]; // Lazy propagation array

// Propaga gli aggiornamenti lazy dal nodo ai suoi figli
void push(int node, int start, int end) {
    if (lazy[node] != 0) {
        // Aggiorna il valore del nodo corrente
        tree[node] += (end - start + 1) * lazy[node];
        
        if (start != end) { // Se non è una foglia
            // Propaga l'aggiornamento ai figli
            lazy[2*node] += lazy[node];
            lazy[2*node+1] += lazy[node];
        }
        
        // Resetta il valore lazy per questo nodo
        lazy[node] = 0;
    }
}

// Costruzione del segment tree
void build(int node, int start, int end, int arr[]) {
    if (start == end) {
        tree[node] = arr[start];
        return;
    }
    int mid = (start + end) / 2;
    build(2*node, start, mid, arr);
    build(2*node+1, mid+1, end, arr);
    tree[node] = tree[2*node] + tree[2*node+1];
}

// Aggiornamento di un intervallo [l, r] aggiungendo val
void update(int node, int start, int end, int l, int r, long long val) {
    // Prima di fare qualsiasi cosa, propaga gli aggiornamenti lazy
    push(node, start, end);
    
    // Nessuna sovrapposizione
    if (start > r || end < l)
        return;
    
    // Sovrapposizione completa
    if (start >= l && end <= r) {
        // Aggiorna il nodo corrente
        tree[node] += (end - start + 1) * val;
        
        if (start != end) { // Se non è una foglia
            // Memorizza l'aggiornamento per i figli
            lazy[2*node] += val;
            lazy[2*node+1] += val;
        }
        return;
    }
    
    // Sovrapposizione parziale
    int mid = (start + end) / 2;
    update(2*node, start, mid, l, r, val);
    update(2*node+1, mid+1, end, l, r, val);
    
    // Aggiorna il nodo corrente dopo aver aggiornato i figli
    tree[node] = tree[2*node] + tree[2*node+1];
}

// Query per la somma nell'intervallo [l, r]
long long query(int node, int start, int end, int l, int r) {
    // Nessuna sovrapposizione
    if (start > r || end < l)
        return 0;
    
    // Prima di fare qualsiasi cosa, propaga gli aggiornamenti lazy
    push(node, start, end);
    
    // Sovrapposizione completa
    if (start >= l && end <= r)
        return tree[node];
    
    // Sovrapposizione parziale
    int mid = (start + end) / 2;
    long long p1 = query(2*node, start, mid, l, r);
    long long p2 = query(2*node+1, mid+1, end, l, r);
    return p1 + p2;
}

// Esempio di utilizzo
int main() {
    int arr[MAXN] = {0}; // Array iniziale
    int n = 10; // Dimensione dell'array
    
    // Costruisci il segment tree
    build(1, 0, n-1, arr);
    
    // Aggiorna l'intervallo [0, 4] aggiungendo 5
    update(1, 0, n-1, 0, 4, 5);
    
    // Aggiorna l'intervallo [3, 7] aggiungendo 2
    update(1, 0, n-1, 3, 7, 2);
    
    // Query per la somma nell'intervallo [2, 6]
    long long result = query(1, 0, n-1, 2, 6);
    cout << "Somma nell'intervallo [2, 6]: " << result << endl; // Output: 5*3 + 2*4 = 23
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Costruzione: O(N)</li>
          <li className="mb-1">Aggiornamento: O(log N)</li>
          <li className="mb-1">Query: O(log N)</li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Lazy Propagation per Diverse Operazioni</h2>
        <p className="text-lg leading-relaxed mb-4">
          La lazy propagation può essere adattata per vari tipi di aggiornamenti e query. Vediamo alcuni esempi comuni:
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>3.1 Range Minimum Query con Range Addition Update:</strong>
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Per Range Minimum Query con Range Addition Update
void push_min(int node, int start, int end) {
    if (lazy[node] != 0) {
        // Aggiorna il valore del nodo corrente
        tree[node] += lazy[node];
        
        if (start != end) { // Se non è una foglia
            // Propaga l'aggiornamento ai figli
            lazy[2*node] += lazy[node];
            lazy[2*node+1] += lazy[node];
        }
        
        // Resetta il valore lazy per questo nodo
        lazy[node] = 0;
    }
}

void update_min(int node, int start, int end, int l, int r, long long val) {
    push_min(node, start, end);
    
    if (start > r || end < l)
        return;
    
    if (start >= l && end <= r) {
        tree[node] += val;
        
        if (start != end) {
            lazy[2*node] += val;
            lazy[2*node+1] += val;
        }
        return;
    }
    
    int mid = (start + end) / 2;
    update_min(2*node, start, mid, l, r, val);
    update_min(2*node+1, mid+1, end, l, r, val);
    
    // Per il minimo, prendiamo il minimo dei figli
    tree[node] = min(tree[2*node], tree[2*node+1]);
}

long long query_min(int node, int start, int end, int l, int r) {
    if (start > r || end < l)
        return LLONG_MAX; // Elemento neutro per il minimo
    
    push_min(node, start, end);
    
    if (start >= l && end <= r)
        return tree[node];
    
    int mid = (start + end) / 2;
    long long p1 = query_min(2*node, start, mid, l, r);
    long long p2 = query_min(2*node+1, mid+1, end, l, r);
    return min(p1, p2);
}`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>3.2 Range Sum Query con Range Assignment Update:</strong>
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Per Range Sum Query con Range Assignment Update
// Qui lazy[node] = -1 significa che non c'è un aggiornamento lazy
// Altrimenti, lazy[node] è il valore da assegnare

void push_assign(int node, int start, int end) {
    if (lazy[node] != -1) {
        // Aggiorna il valore del nodo corrente
        tree[node] = (end - start + 1) * lazy[node];
        
        if (start != end) { // Se non è una foglia
            // Propaga l'aggiornamento ai figli
            lazy[2*node] = lazy[node];
            lazy[2*node+1] = lazy[node];
        }
        
        // Resetta il valore lazy per questo nodo
        lazy[node] = -1;
    }
}

void update_assign(int node, int start, int end, int l, int r, long long val) {
    push_assign(node, start, end);
    
    if (start > r || end < l)
        return;
    
    if (start >= l && end <= r) {
        tree[node] = (end - start + 1) * val;
        
        if (start != end) {
            lazy[2*node] = val;
            lazy[2*node+1] = val;
        }
        return;
    }
    
    int mid = (start + end) / 2;
    update_assign(2*node, start, mid, l, r, val);
    update_assign(2*node+1, mid+1, end, l, r, val);
    
    tree[node] = tree[2*node] + tree[2*node+1];
}

long long query_assign(int node, int start, int end, int l, int r) {
    if (start > r || end < l)
        return 0;
    
    push_assign(node, start, end);
    
    if (start >= l && end <= r)
        return tree[node];
    
    int mid = (start + end) / 2;
    long long p1 = query_assign(2*node, start, mid, l, r);
    long long p2 = query_assign(2*node+1, mid+1, end, l, r);
    return p1 + p2;
}`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>3.3 Gestire Più Tipi di Aggiornamenti:</strong>
        </p>
        <p className="text-lg leading-relaxed">
          Per gestire più tipi di aggiornamenti (ad esempio, sia addizione che assegnazione), è necessario utilizzare più array lazy o una struttura più complessa per memorizzare gli aggiornamenti. Questo richiede una gestione attenta dell'ordine in cui gli aggiornamenti vengono applicati.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Fenwick Tree per RURQ</h2>
        <p className="text-lg leading-relaxed mb-4">
          Sebbene il Segment Tree con Lazy Propagation sia la soluzione più generale per problemi RURQ, per alcuni casi specifici (in particolare, Range Sum Query con Range Addition Update), possiamo utilizzare anche il Fenwick Tree (o Binary Indexed Tree), che è più semplice e ha costanti più piccole.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>Approccio con Due Fenwick Trees:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          L'idea è di utilizzare due Fenwick Trees e sfruttare la tecnica del "difference array" (o array di differenze). Se definiamo B[i] = A[i] - A[i-1] (con B[0] = A[0]), allora aggiungere un valore v a A[l...r] equivale a:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Aggiungere v a B[l]</li>
          <li className="mb-1">Sottrarre v da B[r+1]</li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">
          E per calcolare A[i], possiamo usare la somma prefissa di B fino a i: A[i] = B[0] + B[1] + ... + B[i].
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
long long bit1[MAXN]; // Per memorizzare B[i]
long long bit2[MAXN]; // Per memorizzare i * B[i]

// Aggiorna il valore all'indice idx
void update(long long bit[], int idx, long long val, int n) {
    for (; idx <= n; idx += idx & -idx)
        bit[idx] += val;
}

// Somma dal primo elemento fino all'indice idx
long long query(long long bit[], int idx) {
    long long sum = 0;
    for (; idx > 0; idx -= idx & -idx)
        sum += bit[idx];
    return sum;
}

// Aggiorna l'intervallo [l, r] aggiungendo val
void range_update(int l, int r, long long val, int n) {
    // Aggiorna bit1
    update(bit1, l, val, n);
    update(bit1, r+1, -val, n);
    
    // Aggiorna bit2
    update(bit2, l, val * (l-1), n);
    update(bit2, r+1, -val * r, n);
}

// Calcola la somma prefissa fino all'indice idx
long long prefix_sum(int idx) {
    return query(bit1, idx) * idx - query(bit2, idx);
}

// Calcola la somma nell'intervallo [l, r]
long long range_sum(int l, int r) {
    return prefix_sum(r) - prefix_sum(l-1);
}

// Esempio di utilizzo
int main() {
    int n = 10; // Dimensione dell'array
    
    // Aggiorna l'intervallo [1, 5] aggiungendo 5
    range_update(1, 5, 5, n);
    
    // Aggiorna l'intervallo [4, 8] aggiungendo 2
    range_update(4, 8, 2, n);
    
    // Query per la somma nell'intervallo [3, 7]
    long long result = range_sum(3, 7);
    cout << "Somma nell'intervallo [3, 7]: " << result << endl; // Output: 5*3 + 2*4 = 23
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Aggiornamento: O(log N)</li>
          <li className="mb-1">Query: O(log N)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Questo approccio è più efficiente in termini di costanti rispetto al Segment Tree con Lazy Propagation, ma è limitato a operazioni di somma e addizione.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Tecniche di Difference Array</h2>
        <p className="text-lg leading-relaxed mb-4">
          La tecnica del Difference Array (o array di differenze) è un approccio semplice ma potente per problemi RURQ, specialmente quando tutte le query vengono eseguite dopo tutti gli aggiornamenti.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>Idea di Base:</strong>
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Creare un array di differenze D, dove D[i] = A[i] - A[i-1] (con D[0] = A[0]).</li>
          <li className="mb-1">Per aggiornare A[l...r] aggiungendo v, aggiungere v a D[l] e sottrarre v da D[r+1].</li>
          <li className="mb-1">Per ricostruire A dopo tutti gli aggiornamenti, calcolare la somma prefissa di D.</li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Esempio di utilizzo del Difference Array
vector<int> range_addition(int n, vector<vector<int>>& updates) {
    vector<int> diff(n+1, 0);
    
    // Applica tutti gli aggiornamenti
    for (auto& update : updates) {
        int l = update[0], r = update[1], val = update[2];
        diff[l] += val;
        diff[r+1] -= val;
    }
    
    // Ricostruisci l'array originale
    vector<int> result(n, 0);
    result[0] = diff[0];
    for (int i = 1; i < n; i++) {
        result[i] = result[i-1] + diff[i];
    }
    
    return result;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Aggiornamento: O(1) per aggiornamento</li>
          <li className="mb-1">Ricostruzione: O(N)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Questa tecnica è molto efficiente quando tutte le query vengono eseguite dopo tutti gli aggiornamenti, ma non è adatta per query interleaved con aggiornamenti.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Square Root Decomposition per RURQ</h2>
        <p className="text-lg leading-relaxed mb-4">
          Un'altra tecnica per problemi RURQ è la Square Root Decomposition, che offre un buon compromesso tra semplicità e efficienza.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>Idea di Base:</strong>
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Dividere l'array in blocchi di dimensione √N.</li>
          <li className="mb-1">Per ogni blocco, memorizzare un valore lazy per gli aggiornamenti che coprono l'intero blocco.</li>
          <li className="mb-1">Per aggiornamenti che coprono parzialmente un blocco, aggiornare direttamente gli elementi.</li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
int arr[MAXN]; // Array originale
int block_size; // Dimensione del blocco
int num_blocks; // Numero di blocchi
long long block_sum[MAXN]; // Somma per ogni blocco
long long lazy[MAXN]; // Valore lazy per ogni blocco

// Inizializzazione
void init(int n) {
    block_size = sqrt(n);
    num_blocks = (n + block_size - 1) / block_size;
    
    for (int i = 0; i < num_blocks; i++) {
        block_sum[i] = 0;
        lazy[i] = 0;
    }
    
    for (int i = 0; i < n; i++) {
        block_sum[i / block_size] += arr[i];
    }
}

// Aggiornamento di un intervallo [l, r] aggiungendo val
void update(int l, int r, int val, int n) {
    int block_l = l / block_size;
    int block_r = r / block_size;
    
    // Caso 1: l e r sono nello stesso blocco
    if (block_l == block_r) {
        for (int i = l; i <= r; i++) {
            arr[i] += val;
            block_sum[block_l] += val;
        }
        return;
    }
    
    // Caso 2: l e r sono in blocchi diversi
    
    // Aggiorna il primo blocco (parzialmente coperto)
    for (int i = l; i < (block_l + 1) * block_size; i++) {
        arr[i] += val;
        block_sum[block_l] += val;
    }
    
    // Aggiorna i blocchi completamente coperti
    for (int i = block_l + 1; i < block_r; i++) {
        lazy[i] += val;
    }
    
    // Aggiorna l'ultimo blocco (parzialmente coperto)
    for (int i = block_r * block_size; i <= r; i++) {
        arr[i] += val;
        block_sum[block_r] += val;
    }
}

// Query per la somma nell'intervallo [l, r]
long long query(int l, int r, int n) {
    int block_l = l / block_size;
    int block_r = r / block_size;
    long long sum = 0;
    
    // Caso 1: l e r sono nello stesso blocco
    if (block_l == block_r) {
        for (int i = l; i <= r; i++) {
            sum += arr[i] + lazy[block_l];
        }
        return sum;
    }
    
    // Caso 2: l e r sono in blocchi diversi
    
    // Somma dal primo blocco (parzialmente coperto)
    for (int i = l; i < (block_l + 1) * block_size; i++) {
        sum += arr[i] + lazy[block_l];
    }
    
    // Somma dai blocchi completamente coperti
    for (int i = block_l + 1; i < block_r; i++) {
        sum += block_sum[i] + lazy[i] * block_size;
    }
    
    // Somma dall'ultimo blocco (parzialmente coperto)
    for (int i = block_r * block_size; i <= r; i++) {
        sum += arr[i] + lazy[block_r];
    }
    
    return sum;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Aggiornamento: O(√N)</li>
          <li className="mb-1">Query: O(√N)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          La Square Root Decomposition è più semplice da implementare rispetto al Segment Tree con Lazy Propagation, ma ha una complessità peggiore. Tuttavia, può essere più veloce in pratica per array di dimensioni moderate a causa delle costanti più piccole.
        </p>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">7. Problemi di Esempio</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-2"><a href="https://cses.fi/problemset/task/1735" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - Range Updates and Sums</a>: Un problema che richiede sia aggiornamenti di addizione che di assegnazione.</li>
          <li className="mb-2"><a href="https://cses.fi/problemset/task/1736" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - Polynomial Queries</a>: Un problema avanzato che richiede aggiornamenti polinomiali.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/558/problem/E" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - A Simple Task</a>: Un problema che richiede ordinamento di sottointervalli.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/242/problem/E" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - XOR on Segment</a>: Un problema che richiede operazioni XOR su intervalli.</li>
        </ul>
      </section>
    </div>
  );
};

export default RangeUpdateRangeQueryPage;
