import React from 'react';

const RangeQueriesSweepLinePage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Range Queries con Sweep Line (Livello Platinum)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione a Range Queries con Sweep Line</h2>
        <p className="text-lg leading-relaxed mb-4">
          La tecnica di Sweep Line è un potente strumento algoritmico che può essere combinato con strutture dati come Segment Tree o Fenwick Tree per risolvere problemi complessi di range queries, specialmente in contesti offline (dove tutte le query sono note in anticipo).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          L'idea fondamentale della Sweep Line è "spazzare" lo spazio del problema con una linea immaginaria, processando gli eventi in ordine. Quando combiniamo questa tecnica con strutture dati per range queries, possiamo risolvere efficientemente problemi che altrimenti sarebbero difficili da affrontare.
        </p>
        <p className="text-lg leading-relaxed">
          In questa lezione, esploreremo:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Come combinare Sweep Line con Segment Tree/Fenwick Tree</li>
          <li className="mb-1">Problemi di range queries offline</li>
          <li className="mb-1">Problemi di range updates e range queries</li>
          <li className="mb-1">Problemi geometrici con range queries</li>
        </ul>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Combinare Sweep Line con Segment Tree</h2>
        <p className="text-lg leading-relaxed mb-4">
          La combinazione di Sweep Line con Segment Tree è particolarmente potente per problemi che coinvolgono intervalli o rettangoli. Vediamo un esempio classico: contare il numero di rettangoli che contengono un punto dato.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>Problema:</strong> Dato un insieme di rettangoli e un insieme di punti, per ogni punto, contare quanti rettangoli lo contengono.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Approccio:</strong> Usiamo una sweep line verticale che si muove da sinistra a destra. Manteniamo un Segment Tree che rappresenta l'asse y e tiene traccia di quanti rettangoli sono "attivi" a ogni coordinata y.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
int tree[4*MAXN]; // Segment tree
int lazy[4*MAXN]; // Lazy propagation

// Struttura per gli eventi della sweep line
struct Event {
    int x, y1, y2, type;
    // type: 1 = inizio rettangolo, -1 = fine rettangolo, 0 = punto query
    int query_idx; // Per eventi di tipo punto, indice della query
    
    bool operator<(const Event& other) const {
        if (x != other.x) return x < other.x;
        // Priorità: prima gli inizi, poi i punti, infine le fini
        return type > other.type;
    }
};

// Propagazione lazy
void push(int node, int start, int end) {
    if (lazy[node] != 0) {
        tree[node] += lazy[node];
        if (start != end) {
            lazy[2*node] += lazy[node];
            lazy[2*node+1] += lazy[node];
        }
        lazy[node] = 0;
    }
}

// Aggiornamento range
void update(int node, int start, int end, int l, int r, int val) {
    push(node, start, end);
    if (r < start || end < l) return;
    if (l <= start && end <= r) {
        lazy[node] += val;
        push(node, start, end);
        return;
    }
    int mid = (start + end) / 2;
    update(2*node, start, mid, l, r, val);
    update(2*node+1, mid+1, end, l, r, val);
    tree[node] = max(tree[2*node], tree[2*node+1]);
}

// Query point
int query(int node, int start, int end, int pos) {
    push(node, start, end);
    if (start == end) return tree[node];
    int mid = (start + end) / 2;
    if (pos <= mid) return query(2*node, start, mid, pos);
    else return query(2*node+1, mid+1, end, pos);
}

// Soluzione al problema
vector<int> countRectangles(vector<vector<int>>& rectangles, vector<vector<int>>& points) {
    int n = rectangles.size();
    int m = points.size();
    
    // Compressione delle coordinate y
    set<int> y_coords;
    for (auto& rect : rectangles) {
        y_coords.insert(rect[1]); // y1
        y_coords.insert(rect[3]); // y2
    }
    for (auto& point : points) {
        y_coords.insert(point[1]); // y
    }
    
    // Mappa coordinate y originali a indici compressi
    map<int, int> y_to_idx;
    int idx = 0;
    for (int y : y_coords) {
        y_to_idx[y] = idx++;
    }
    
    // Prepara gli eventi per la sweep line
    vector<Event> events;
    for (int i = 0; i < n; i++) {
        int x1 = rectangles[i][0], y1 = rectangles[i][1];
        int x2 = rectangles[i][2], y2 = rectangles[i][3];
        
        // Inizio rettangolo
        events.push_back({x1, y_to_idx[y1], y_to_idx[y2], 1, -1});
        // Fine rettangolo
        events.push_back({x2, y_to_idx[y1], y_to_idx[y2], -1, -1});
    }
    
    for (int i = 0; i < m; i++) {
        int x = points[i][0], y = points[i][1];
        events.push_back({x, y_to_idx[y], 0, 0, i});
    }
    
    // Ordina gli eventi
    sort(events.begin(), events.end());
    
    // Inizializza il segment tree
    memset(tree, 0, sizeof(tree));
    memset(lazy, 0, sizeof(lazy));
    
    // Processa gli eventi con la sweep line
    vector<int> results(m, 0);
    for (auto& event : events) {
        if (event.type == 1) {
            // Inizio rettangolo: incrementa il conteggio nell'intervallo y
            update(1, 0, idx-1, event.y1, event.y2, 1);
        } else if (event.type == -1) {
            // Fine rettangolo: decrementa il conteggio nell'intervallo y
            update(1, 0, idx-1, event.y1, event.y2, -1);
        } else {
            // Punto query: conta quanti rettangoli contengono questo punto
            results[event.query_idx] = query(1, 0, idx-1, event.y1);
        }
    }
    
    return results;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4">
          Questo approccio ha complessità O((N+M) log N), dove N è il numero di rettangoli e M è il numero di punti.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Range Updates e Range Queries Offline</h2>
        <p className="text-lg leading-relaxed mb-4">
          Un altro scenario comune è quando abbiamo una serie di aggiornamenti di intervalli e query di intervalli, e vogliamo processarli offline. La sweep line può essere molto efficace in questo caso.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>Problema:</strong> Dato un array inizialmente vuoto e una serie di operazioni:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Aggiorna l'intervallo [L, R] aggiungendo un valore V</li>
          <li className="mb-1">Trova la somma nell'intervallo [L, R]</li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Approccio:</strong> Usiamo una sweep line che si muove lungo l'asse degli indici. Manteniamo un Fenwick Tree (o Segment Tree) per gestire le query di somma.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
long long bit[MAXN]; // Fenwick Tree (Binary Indexed Tree)

// Aggiorna il valore all'indice idx
void update(int idx, long long val, int n) {
    for (; idx <= n; idx += idx & -idx)
        bit[idx] += val;
}

// Somma dal primo elemento fino all'indice idx
long long query(int idx) {
    long long sum = 0;
    for (; idx > 0; idx -= idx & -idx)
        sum += bit[idx];
    return sum;
}

// Somma nell'intervallo [l, r]
long long rangeQuery(int l, int r) {
    return query(r) - query(l-1);
}

// Struttura per gli eventi della sweep line
struct Event {
    int pos, type, idx;
    long long val;
    
    bool operator<(const Event& other) const {
        if (pos != other.pos) return pos < other.pos;
        return type < other.type; // Priorità: prima gli aggiornamenti, poi le query
    }
};

// Soluzione al problema
vector<long long> processQueries(vector<vector<int>>& updates, vector<vector<int>>& queries) {
    int n = MAXN - 1; // Dimensione massima dell'array
    
    // Prepara gli eventi per la sweep line
    vector<Event> events;
    for (int i = 0; i < updates.size(); i++) {
        int l = updates[i][0], r = updates[i][1];
        long long v = updates[i][2];
        
        // Aggiungi v all'indice l
        events.push_back({l, 0, i, v});
        // Sottrai v all'indice r+1 (tecnica di difference array)
        events.push_back({r+1, 0, i, -v});
    }
    
    for (int i = 0; i < queries.size(); i++) {
        int l = queries[i][0], r = queries[i][1];
        events.push_back({l, 1, i, 0}); // Inizio query
        events.push_back({r, 2, i, 0}); // Fine query
    }
    
    // Ordina gli eventi
    sort(events.begin(), events.end());
    
    // Inizializza il Fenwick Tree
    memset(bit, 0, sizeof(bit));
    
    // Processa gli eventi con la sweep line
    vector<long long> results(queries.size(), 0);
    map<int, long long> query_start_sum; // Memorizza la somma all'inizio di ogni query
    
    for (auto& event : events) {
        if (event.type == 0) {
            // Aggiornamento: aggiungi val all'indice pos
            update(event.pos, event.val, n);
        } else if (event.type == 1) {
            // Inizio query: memorizza la somma corrente
            query_start_sum[event.idx] = query(event.pos - 1);
        } else {
            // Fine query: calcola il risultato
            long long end_sum = query(event.pos);
            results[event.idx] = end_sum - query_start_sum[event.idx];
        }
    }
    
    return results;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4">
          Questo approccio ha complessità O((U+Q) log N), dove U è il numero di aggiornamenti, Q è il numero di query, e N è la dimensione dell'array.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Problemi Geometrici con Range Queries</h2>
        <p className="text-lg leading-relaxed mb-4">
          La combinazione di Sweep Line e strutture dati per range queries è particolarmente potente per problemi geometrici. Vediamo un altro esempio: trovare l'area totale coperta da un insieme di rettangoli.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>Problema:</strong> Dato un insieme di rettangoli con lati paralleli agli assi, trovare l'area totale coperta (contando le sovrapposizioni una sola volta).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Approccio:</strong> Usiamo una sweep line che si muove lungo l'asse x. Per ogni posizione x, manteniamo un Segment Tree che tiene traccia degli intervalli y coperti dai rettangoli attivi.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
int tree[4*MAXN]; // Segment tree per contare quanti rettangoli coprono ogni intervallo
int lazy[4*MAXN]; // Lazy propagation

// Struttura per gli eventi della sweep line
struct Event {
    int x, y1, y2, type;
    // type: 1 = inizio rettangolo, -1 = fine rettangolo
    
    bool operator<(const Event& other) const {
        return x < other.x;
    }
};

// Propagazione lazy
void push(int node, int start, int end) {
    if (lazy[node] != 0) {
        tree[node] += lazy[node];
        if (start != end) {
            lazy[2*node] += lazy[node];
            lazy[2*node+1] += lazy[node];
        }
        lazy[node] = 0;
    }
}

// Aggiornamento range
void update(int node, int start, int end, int l, int r, int val) {
    push(node, start, end);
    if (r < start || end < l) return;
    if (l <= start && end <= r) {
        lazy[node] += val;
        push(node, start, end);
        return;
    }
    int mid = (start + end) / 2;
    update(2*node, start, mid, l, r, val);
    update(2*node+1, mid+1, end, l, r, val);
    
    // Il valore di un nodo è la lunghezza dell'intervallo coperto
    tree[node] = 0;
    if (tree[2*node] > 0) tree[node] += (mid - start + 1);
    if (tree[2*node+1] > 0) tree[node] += (end - mid);
}

// Calcola la lunghezza totale degli intervalli coperti
int getTotalLength(int node, int start, int end) {
    push(node, start, end);
    if (tree[node] > 0) return end - start + 1;
    if (start == end) return 0;
    
    int mid = (start + end) / 2;
    return getTotalLength(2*node, start, mid) + getTotalLength(2*node+1, mid+1, end);
}

// Soluzione al problema
long long totalArea(vector<vector<int>>& rectangles) {
    // Compressione delle coordinate y
    set<int> y_coords;
    for (auto& rect : rectangles) {
        y_coords.insert(rect[1]); // y1
        y_coords.insert(rect[3]); // y2
    }
    
    // Mappa coordinate y originali a indici compressi
    map<int, int> y_to_idx;
    vector<int> idx_to_y;
    int idx = 0;
    for (int y : y_coords) {
        y_to_idx[y] = idx;
        idx_to_y.push_back(y);
        idx++;
    }
    
    // Prepara gli eventi per la sweep line
    vector<Event> events;
    for (auto& rect : rectangles) {
        int x1 = rect[0], y1 = rect[1];
        int x2 = rect[2], y2 = rect[3];
        
        // Inizio rettangolo
        events.push_back({x1, y_to_idx[y1], y_to_idx[y2], 1});
        // Fine rettangolo
        events.push_back({x2, y_to_idx[y1], y_to_idx[y2], -1});
    }
    
    // Ordina gli eventi
    sort(events.begin(), events.end());
    
    // Inizializza il segment tree
    memset(tree, 0, sizeof(tree));
    memset(lazy, 0, sizeof(lazy));
    
    // Processa gli eventi con la sweep line
    long long total_area = 0;
    int prev_x = events[0].x;
    
    for (auto& event : events) {
        // Calcola l'area tra l'evento precedente e quello corrente
        int width = event.x - prev_x;
        if (width > 0) {
            int height = getTotalLength(1, 0, idx_to_y.size()-2);
            total_area += (long long)width * height;
        }
        
        // Aggiorna il segment tree
        update(1, 0, idx_to_y.size()-2, event.y1, event.y2-1, event.type);
        
        prev_x = event.x;
    }
    
    return total_area;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4">
          Questo approccio ha complessità O(N log N), dove N è il numero di rettangoli.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Ottimizzazioni e Considerazioni</h2>
        <p className="text-lg leading-relaxed mb-4">
          Quando si combinano Sweep Line e strutture dati per range queries, ci sono alcune ottimizzazioni e considerazioni importanti:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Compressione delle Coordinate:</strong> Spesso è utile comprimere le coordinate per ridurre la dimensione del Segment Tree. Questo è particolarmente importante quando le coordinate possono essere molto grandi.</li>
          <li className="mb-2"><strong>Gestione degli Eventi:</strong> L'ordine in cui si processano gli eventi è cruciale. In generale, per eventi con la stessa coordinata x, si processano prima gli inizi, poi le query, e infine le fini.</li>
          <li className="mb-2"><strong>Lazy Propagation:</strong> Per problemi che coinvolgono range updates, la lazy propagation è essenziale per mantenere una buona complessità temporale.</li>
          <li className="mb-2"><strong>Strutture Dati Alternative:</strong> In alcuni casi, un Fenwick Tree può essere più efficiente di un Segment Tree, specialmente per operazioni di somma.</li>
        </ul>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Problemi di Esempio</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-2"><a href="https://cses.fi/problemset/task/1741" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - Area of Rectangles</a>: Calcolare l'area totale coperta da un insieme di rettangoli.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/1000/problem/F" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - One Occurrence</a>: Trovare un elemento che appare esattamente una volta in un intervallo.</li>
          <li className="mb-2"><a href="https://cses.fi/problemset/task/1734" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - Distinct Values Queries</a>: Contare il numero di valori distinti in un intervallo.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/1093/problem/E" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Intersection of Permutations</a>: Un problema avanzato che combina sweep line, compressione delle coordinate e Fenwick Tree.</li>
        </ul>
      </section>
    </div>
  );
};

export default RangeQueriesSweepLinePage;
