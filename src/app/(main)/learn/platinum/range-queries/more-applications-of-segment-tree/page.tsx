import React from 'react';

const MoreApplicationsSegmentTreePage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Applicazioni Avanzate di Segment Tree (Livello Platinum)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione alle Applicazioni Avanzate</h2>
        <p className="text-lg leading-relaxed mb-4">
          Nella sezione Gold, abbiamo visto l'implementazione base di un Segment Tree per range query e point update. In questa sezione Platinum, esploreremo applicazioni più avanzate e potenti di questa struttura dati.
        </p>
        <p className="text-lg leading-relaxed">
          Le applicazioni avanzate di Segment Tree che vedremo includono:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Segment Tree con operazioni non standard</li>
          <li className="mb-1">Segment Tree per query di massimo sottointervallo</li>
          <li className="mb-1">Segment Tree per query di k-esimo elemento</li>
          <li className="mb-1">Segment Tree persistente (cenni)</li>
          <li className="mb-1">Segment Tree 2D (cenni)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Queste applicazioni richiedono una solida comprensione del Segment Tree base, quindi assicurati di aver padroneggiato i concetti fondamentali prima di procedere.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Segment Tree con Operazioni Non Standard</h2>
        <p className="text-lg leading-relaxed mb-4">
          Finora abbiamo visto Segment Tree per operazioni come somma, minimo, massimo. Ma la vera potenza di questa struttura dati sta nella sua flessibilità: possiamo adattarla a molte altre operazioni, purché siano associative.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>Esempio 1: Conteggio di elementi distinti in un range</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Supponiamo di voler contare quanti elementi distinti ci sono in un dato intervallo dell'array. Questo non è direttamente associativo, ma possiamo usare un approccio offline con compressione delle coordinate e sweep line.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Approccio offline per contare elementi distinti in un range
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
int arr[MAXN];
int tree[4*MAXN]; // Segment tree
bool present[MAXN]; // Per tenere traccia degli elementi presenti

// Aggiorna il segment tree
void update(int node, int start, int end, int idx, int val) {
    if (start == end) {
        tree[node] += val;
        return;
    }
    int mid = (start + end) / 2;
    if (idx <= mid)
        update(2*node, start, mid, idx, val);
    else
        update(2*node+1, mid+1, end, idx, val);
    tree[node] = tree[2*node] + tree[2*node+1];
}

// Query sul segment tree
int query(int node, int start, int end, int l, int r) {
    if (r < start || end < l)
        return 0;
    if (l <= start && end <= r)
        return tree[node];
    int mid = (start + end) / 2;
    return query(2*node, start, mid, l, r) + query(2*node+1, mid+1, end, l, r);
}

// Soluzione per contare elementi distinti in range
vector<int> countDistinct(vector<int>& arr, vector<pair<int, int>>& queries) {
    int n = arr.size();
    int q = queries.size();
    
    // Compressione delle coordinate
    vector<int> values = arr;
    sort(values.begin(), values.end());
    values.erase(unique(values.begin(), values.end()), values.end());
    
    // Mappa valori originali a indici compressi
    unordered_map<int, int> value_to_idx;
    for (int i = 0; i < values.size(); i++) {
        value_to_idx[values[i]] = i;
    }
    
    // Converti array originale in indici compressi
    vector<int> compressed(n);
    for (int i = 0; i < n; i++) {
        compressed[i] = value_to_idx[arr[i]];
    }
    
    // Prepara le query offline
    vector<tuple<int, int, int>> offline_queries;
    for (int i = 0; i < q; i++) {
        offline_queries.push_back({queries[i].first, queries[i].second, i});
    }
    sort(offline_queries.begin(), offline_queries.end());
    
    // Processa le query con sweep line
    vector<int> results(q);
    vector<int> last_pos(values.size(), -1);
    
    int curr_l = 0;
    memset(tree, 0, sizeof(tree));
    
    for (auto [l, r, idx] : offline_queries) {
        // Aggiorna la finestra corrente
        while (curr_l < l) {
            int val = compressed[curr_l];
            if (last_pos[val] == curr_l) {
                // Rimuovi questo elemento
                update(1, 0, n-1, val, -1);
            }
            curr_l++;
        }
        
        while (curr_l > l) {
            curr_l--;
            int val = compressed[curr_l];
            if (last_pos[val] < curr_l || last_pos[val] > r) {
                // Aggiungi questo elemento
                update(1, 0, n-1, val, 1);
                last_pos[val] = curr_l;
            }
        }
        
        // Esegui la query
        results[idx] = query(1, 0, n-1, l, r);
    }
    
    return results;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Esempio 2: Segment Tree per GCD (Massimo Comun Divisore)</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il GCD è un'operazione associativa (GCD(a, GCD(b, c)) = GCD(GCD(a, b), c)), quindi possiamo usare un Segment Tree per calcolare il GCD di un intervallo.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Segment Tree per GCD
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
int arr[MAXN];
int tree[4*MAXN];

// Costruzione del segment tree
void build(int node, int start, int end) {
    if (start == end) {
        tree[node] = arr[start];
        return;
    }
    int mid = (start + end) / 2;
    build(2*node, start, mid);
    build(2*node+1, mid+1, end);
    tree[node] = __gcd(tree[2*node], tree[2*node+1]);
}

// Aggiornamento di un elemento
void update(int node, int start, int end, int idx, int val) {
    if (start == end) {
        arr[idx] = val;
        tree[node] = val;
        return;
    }
    int mid = (start + end) / 2;
    if (idx <= mid)
        update(2*node, start, mid, idx, val);
    else
        update(2*node+1, mid+1, end, idx, val);
    tree[node] = __gcd(tree[2*node], tree[2*node+1]);
}

// Query per il GCD in un range
int query(int node, int start, int end, int l, int r) {
    if (r < start || end < l)
        return 0; // 0 è l'elemento neutro per il GCD
    if (l <= start && end <= r)
        return tree[node];
    int mid = (start + end) / 2;
    int left_gcd = query(2*node, start, mid, l, r);
    int right_gcd = query(2*node+1, mid+1, end, l, r);
    return __gcd(left_gcd, right_gcd);
}
`}</code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Segment Tree per Massimo Sottointervallo</h2>
        <p className="text-lg leading-relaxed mb-4">
          Un problema classico è trovare il sottointervallo contiguo con la somma massima (Maximum Subarray Sum). Possiamo risolverlo in O(n) con l'algoritmo di Kadane, ma con un Segment Tree possiamo supportare anche query e aggiornamenti.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          Per ogni nodo del Segment Tree, memorizziamo 4 valori:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1"><strong>sum</strong>: la somma di tutti gli elementi nell'intervallo</li>
          <li className="mb-1"><strong>max_sum</strong>: la somma massima di un sottointervallo contiguo</li>
          <li className="mb-1"><strong>prefix_sum</strong>: la somma massima di un sottointervallo che inizia dall'estremo sinistro</li>
          <li className="mb-1"><strong>suffix_sum</strong>: la somma massima di un sottointervallo che termina all'estremo destro</li>
        </ul>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Segment Tree per Maximum Subarray Sum
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
int arr[MAXN];

struct Node {
    int sum;
    int max_sum;
    int prefix_sum;
    int suffix_sum;
    
    Node() : sum(0), max_sum(INT_MIN), prefix_sum(INT_MIN), suffix_sum(INT_MIN) {}
    
    Node(int val) {
        sum = val;
        max_sum = val;
        prefix_sum = val;
        suffix_sum = val;
    }
};

Node tree[4*MAXN];

// Funzione per combinare due nodi
Node combine(Node left, Node right) {
    Node res;
    res.sum = left.sum + right.sum;
    res.prefix_sum = max(left.prefix_sum, left.sum + right.prefix_sum);
    res.suffix_sum = max(right.suffix_sum, right.sum + left.suffix_sum);
    res.max_sum = max({left.max_sum, right.max_sum, left.suffix_sum + right.prefix_sum});
    return res;
}

// Costruzione del segment tree
void build(int node, int start, int end) {
    if (start == end) {
        tree[node] = Node(arr[start]);
        return;
    }
    int mid = (start + end) / 2;
    build(2*node, start, mid);
    build(2*node+1, mid+1, end);
    tree[node] = combine(tree[2*node], tree[2*node+1]);
}

// Aggiornamento di un elemento
void update(int node, int start, int end, int idx, int val) {
    if (start == end) {
        arr[idx] = val;
        tree[node] = Node(val);
        return;
    }
    int mid = (start + end) / 2;
    if (idx <= mid)
        update(2*node, start, mid, idx, val);
    else
        update(2*node+1, mid+1, end, idx, val);
    tree[node] = combine(tree[2*node], tree[2*node+1]);
}

// Query per il massimo sottointervallo
Node query(int node, int start, int end, int l, int r) {
    if (r < start || end < l)
        return Node(); // Elemento neutro
    if (l <= start && end <= r)
        return tree[node];
    int mid = (start + end) / 2;
    Node left_result = query(2*node, start, mid, l, r);
    Node right_result = query(2*node+1, mid+1, end, l, r);
    return combine(left_result, right_result);
}

// Esempio di utilizzo
int maxSubarraySum(int l, int r) {
    return query(1, 0, MAXN-1, l, r).max_sum;
}
`}</code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Segment Tree per K-esimo Elemento</h2>
        <p className="text-lg leading-relaxed mb-4">
          Un'altra applicazione interessante è trovare il k-esimo elemento più piccolo in un intervallo. Questo può essere fatto con un Segment Tree dove ogni nodo memorizza un istogramma (o un conteggio) degli elementi nel suo intervallo.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          Ci sono diversi approcci:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Segment Tree con Merge Sort Tree (ogni nodo memorizza un array ordinato)</li>
          <li className="mb-1">Segment Tree con conteggio (se i valori sono limitati)</li>
          <li className="mb-1">Segment Tree con compressione delle coordinate</li>
        </ol>
        <p className="text-lg leading-relaxed mb-2">
          Vediamo l'implementazione con Merge Sort Tree:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Merge Sort Tree per k-esimo elemento
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
int arr[MAXN];
vector<int> tree[4*MAXN]; // Ogni nodo memorizza un array ordinato

// Costruzione del Merge Sort Tree
void build(int node, int start, int end) {
    if (start == end) {
        tree[node].push_back(arr[start]);
        return;
    }
    int mid = (start + end) / 2;
    build(2*node, start, mid);
    build(2*node+1, mid+1, end);
    
    // Merge dei due array ordinati (come nel merge sort)
    merge(tree[2*node].begin(), tree[2*node].end(),
          tree[2*node+1].begin(), tree[2*node+1].end(),
          back_inserter(tree[node]));
}

// Conta quanti elementi sono <= val nell'intervallo [l, r]
int countLessEqual(int node, int start, int end, int l, int r, int val) {
    if (r < start || end < l)
        return 0;
    if (l <= start && end <= r)
        return upper_bound(tree[node].begin(), tree[node].end(), val) - tree[node].begin();
    int mid = (start + end) / 2;
    return countLessEqual(2*node, start, mid, l, r, val) +
           countLessEqual(2*node+1, mid+1, end, l, r, val);
}

// Trova il k-esimo elemento più piccolo nell'intervallo [l, r]
int kthSmallest(int l, int r, int k) {
    int n = r - l + 1;
    if (k < 1 || k > n)
        return -1; // Errore: k fuori range
    
    // Ricerca binaria sul risultato
    int low = INT_MIN, high = INT_MAX;
    while (low < high) {
        int mid = low + (high - low) / 2;
        int count = countLessEqual(1, 0, MAXN-1, l, r, mid);
        
        if (count < k)
            low = mid + 1;
        else
            high = mid;
    }
    
    return low;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          Questo approccio ha complessità O(n log n) per la costruzione e O(log² n) per query.
        </p>
        <p className="text-lg leading-relaxed">
          Un'alternativa più efficiente per valori limitati è usare un Segment Tree con conteggio:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Segment Tree con conteggio per k-esimo elemento (valori limitati)
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
const int MAXVAL = 100005; // Valore massimo nell'array
int arr[MAXN];
int tree[4*MAXN][MAXVAL]; // tree[node][val] = conteggio di 'val' nell'intervallo

// Costruzione del Segment Tree con conteggio
void build(int node, int start, int end) {
    if (start == end) {
        tree[node][arr[start]]++;
        return;
    }
    int mid = (start + end) / 2;
    build(2*node, start, mid);
    build(2*node+1, mid+1, end);
    
    // Combina i conteggi
    for (int i = 0; i < MAXVAL; i++) {
        tree[node][i] = tree[2*node][i] + tree[2*node+1][i];
    }
}

// Trova il k-esimo elemento più piccolo nell'intervallo [l, r]
int kthSmallest(int node, int start, int end, int l, int r, int k) {
    if (start == end)
        return start;
    
    int mid = (start + end) / 2;
    int count_left = 0;
    for (int i = 0; i < MAXVAL; i++) {
        count_left += min(tree[2*node][i], k);
        if (count_left >= k)
            return kthSmallest(2*node, start, mid, l, r, k);
    }
    
    // Se non abbiamo trovato k elementi nel sottoalbero sinistro
    return kthSmallest(2*node+1, mid+1, end, l, r, k - count_left);
}
`}</code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Cenni a Segment Tree Persistente</h2>
        <p className="text-lg leading-relaxed mb-4">
          Un Segment Tree persistente è una versione del Segment Tree che mantiene tutte le versioni precedenti dopo ogni aggiornamento. Questo è utile per problemi che richiedono query su versioni storiche dell'array.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          L'idea chiave è che, invece di modificare i nodi esistenti, creiamo nuovi nodi per il percorso dall'aggiornamento alla radice. Questo richiede O(log n) spazio aggiuntivo per ogni aggiornamento.
        </p>
        <p className="text-lg leading-relaxed">
          Un'implementazione dettagliata di Segment Tree persistente è oltre lo scopo di questa pagina, ma è un argomento importante per problemi avanzati di range query.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Cenni a Segment Tree 2D</h2>
        <p className="text-lg leading-relaxed mb-4">
          Per problemi che coinvolgono query su regioni rettangolari in una griglia 2D, possiamo estendere il concetto di Segment Tree a due dimensioni.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          Ci sono due approcci principali:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Segment Tree di Segment Trees: ogni nodo del Segment Tree esterno gestisce una dimensione, e contiene un intero Segment Tree per l'altra dimensione.</li>
          <li className="mb-1">Segment Tree 2D diretto: generalizza la struttura ad albero per gestire direttamente regioni rettangolari.</li>
        </ol>
        <p className="text-lg leading-relaxed">
          Questi argomenti sono trattati più in dettaglio nella sezione "2D Data Structures".
        </p>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">7. Problemi di Esempio</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-2"><a href="https://cses.fi/problemset/task/1190" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - Subarray Sum Queries</a>: Richiede un Segment Tree per massimo sottointervallo con aggiornamenti.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/1234/problem/D" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Distinct Characters Queries</a>: Richiede un Segment Tree per contare caratteri distinti in un intervallo.</li>
          <li className="mb-2"><a href="https://cses.fi/problemset/task/1144" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - Salary Queries</a>: Può essere risolto con un Segment Tree per k-esimo elemento o con un Fenwick Tree.</li>
          <li className="mb-2"><a href="https://cses.fi/problemset/task/1736" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - Polynomial Queries</a>: Un problema avanzato che richiede un Segment Tree con lazy propagation e operazioni polinomiali.</li>
        </ul>
      </section>
    </div>
  );
};

export default MoreApplicationsSegmentTreePage;
