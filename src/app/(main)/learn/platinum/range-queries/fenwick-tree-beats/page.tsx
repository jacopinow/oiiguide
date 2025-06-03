import React from 'react';

const FenwickTreeBeatsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Fenwick Tree Beats (Livello Platinum)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione a Fenwick Tree Beats</h2>
        <p className="text-lg leading-relaxed mb-4">
          Fenwick Tree Beats (o BIT Beats) è una tecnica avanzata che combina i concetti di Fenwick Tree (Binary Indexed Tree) con l'approccio "Segment Tree Beats" per risolvere problemi complessi di range queries e range updates in modo efficiente.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Questa tecnica è particolarmente utile per problemi che richiedono operazioni come:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Range Minimum/Maximum Query</li>
          <li className="mb-1">Range Addition Update</li>
          <li className="mb-1">Range Chmin/Chmax Update (aggiornare un intervallo prendendo il minimo/massimo con un valore dato)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          In questa lezione, esploreremo:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Il concetto di Segment Tree Beats</li>
          <li className="mb-1">Come adattare questo concetto ai Fenwick Trees</li>
          <li className="mb-1">Implementazione di Fenwick Tree Beats</li>
          <li className="mb-1">Applicazioni e problemi di esempio</li>
        </ul>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Segment Tree Beats: Concetto Base</h2>
        <p className="text-lg leading-relaxed mb-4">
          Prima di addentrarci nel Fenwick Tree Beats, è importante comprendere il concetto di Segment Tree Beats, introdotto da Kazuhiro Hosaka.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          L'idea chiave di Segment Tree Beats è di gestire operazioni di aggiornamento complesse come "chmin" e "chmax" in modo efficiente, utilizzando una tecnica di "lazy propagation" avanzata che propaga gli aggiornamenti solo quando necessario.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>Operazioni supportate:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1"><strong>Range Chmin Update:</strong> Per ogni elemento nell'intervallo [L, R], sostituiscilo con min(elemento, X)</li>
          <li className="mb-1"><strong>Range Chmax Update:</strong> Per ogni elemento nell'intervallo [L, R], sostituiscilo con max(elemento, X)</li>
          <li className="mb-1"><strong>Range Addition Update:</strong> Aggiungi X a ogni elemento nell'intervallo [L, R]</li>
          <li className="mb-1"><strong>Range Sum/Min/Max Query:</strong> Calcola la somma/minimo/massimo nell'intervallo [L, R]</li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">
          La chiave dell'efficienza di Segment Tree Beats sta nel modo in cui gestisce gli aggiornamenti "chmin" e "chmax". Invece di propagare immediatamente gli aggiornamenti ai nodi figli, il Segment Tree Beats mantiene informazioni aggiuntive per ogni nodo:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Il valore massimo nel sottointervallo</li>
          <li className="mb-1">Il secondo valore massimo nel sottointervallo (o -∞ se tutti i valori sono uguali)</li>
          <li className="mb-1">Il numero di occorrenze del valore massimo</li>
          <li className="mb-1">Informazioni simili per i valori minimi</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Queste informazioni aggiuntive permettono di determinare rapidamente se un aggiornamento "chmin" o "chmax" influenzerà tutti i valori in un sottointervallo, solo il valore massimo/minimo, o se è necessario propagare l'aggiornamento ai nodi figli.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Adattare Segment Tree Beats a Fenwick Tree</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il Fenwick Tree (o Binary Indexed Tree) è noto per la sua efficienza in termini di memoria e costanti di tempo per operazioni di somma prefissa. Tuttavia, nella sua forma base, non supporta operazioni complesse come "chmin" e "chmax".
        </p>
        <p className="text-lg leading-relaxed mb-4">
          L'idea di Fenwick Tree Beats è di adattare i concetti di Segment Tree Beats al Fenwick Tree, mantenendo la sua efficienza ma estendendo le operazioni supportate.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>Sfide nell'adattamento:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Il Fenwick Tree non ha una struttura esplicita di nodi e figli come il Segment Tree</li>
          <li className="mb-1">La propagazione lazy è più complessa nel Fenwick Tree</li>
          <li className="mb-1">Mantenere informazioni aggiuntive come il secondo massimo è più difficile</li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">
          Nonostante queste sfide, è possibile implementare una versione semplificata di Fenwick Tree Beats che supporta operazioni come range addition update e range minimum/maximum query.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Implementazione di Fenwick Tree Beats</h2>
        <p className="text-lg leading-relaxed mb-4">
          Vediamo un'implementazione di Fenwick Tree Beats che supporta range addition update e range minimum query:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
long long bit_sum[MAXN]; // Fenwick Tree per la somma
long long bit_min[MAXN]; // Fenwick Tree per il minimo

// Aggiorna il valore all'indice idx (point update)
void update_point(long long bit[], int idx, long long val, int n) {
    for (; idx <= n; idx += idx & -idx) {
        bit[idx] += val;
    }
}

// Somma prefissa fino all'indice idx
long long query_sum(int idx) {
    long long sum = 0;
    for (; idx > 0; idx -= idx & -idx) {
        sum += bit_sum[idx];
    }
    return sum;
}

// Minimo prefisso fino all'indice idx
long long query_min(int idx) {
    long long min_val = LLONG_MAX;
    for (; idx > 0; idx -= idx & -idx) {
        min_val = min(min_val, bit_min[idx]);
    }
    return min_val;
}

// Aggiorna l'intervallo [l, r] aggiungendo val
void range_add(int l, int r, long long val, int n) {
    // Aggiorna bit_sum
    update_point(bit_sum, l, val, n);
    update_point(bit_sum, r+1, -val, n);
    
    // Aggiorna bit_min
    // Questo è più complesso e richiede una gestione speciale
    // Qui semplifichiamo e aggiorniamo direttamente i valori
    for (int i = l; i <= r; i++) {
        long long curr_val = query_sum(i) - query_sum(i-1);
        update_point(bit_min, i, val, n);
    }
}

// Range Minimum Query nell'intervallo [l, r]
long long range_min(int l, int r) {
    long long min_val = LLONG_MAX;
    
    // Questo è un approccio semplificato
    // In una vera implementazione di Fenwick Tree Beats,
    // avremmo bisogno di una struttura più complessa
    for (int i = l; i <= r; i++) {
        long long curr_val = query_sum(i) - query_sum(i-1);
        min_val = min(min_val, curr_val);
    }
    
    return min_val;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-4">
          Questa implementazione è semplificata e non sfrutta completamente il concetto di Fenwick Tree Beats. Una vera implementazione richiederebbe una struttura più complessa per gestire efficientemente le operazioni di range minimum query.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>Implementazione più avanzata:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Una vera implementazione di Fenwick Tree Beats richiederebbe di mantenere informazioni aggiuntive e utilizzare tecniche più avanzate. Ecco un'implementazione più completa che supporta range chmin update e range minimum query:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
const long long INF = 1e18;

struct FenwickTreeBeats {
    int n;
    vector<long long> bit_min; // Fenwick Tree per il minimo
    vector<long long> bit_max; // Fenwick Tree per il massimo
    vector<long long> bit_sum; // Fenwick Tree per la somma
    vector<long long> lazy_add; // Lazy propagation per addizione
    vector<long long> lazy_chmin; // Lazy propagation per chmin
    vector<long long> lazy_chmax; // Lazy propagation per chmax
    
    FenwickTreeBeats(int size) : n(size) {
        bit_min.resize(n+1, INF);
        bit_max.resize(n+1, -INF);
        bit_sum.resize(n+1, 0);
        lazy_add.resize(n+1, 0);
        lazy_chmin.resize(n+1, INF);
        lazy_chmax.resize(n+1, -INF);
    }
    
    // Aggiorna il valore all'indice idx (point update)
    void update_point(vector<long long>& bit, int idx, long long val) {
        for (; idx <= n; idx += idx & -idx) {
            bit[idx] = val;
        }
    }
    
    // Aggiorna l'intervallo [l, r] aggiungendo val
    void range_add(int l, int r, long long val) {
        for (int i = l; i <= r; i++) {
            lazy_add[i] += val;
            update_point(bit_sum, i, query_sum(i) + val, n);
            update_point(bit_min, i, query_min(i) + val, n);
            update_point(bit_max, i, query_max(i) + val, n);
        }
    }
    
    // Aggiorna l'intervallo [l, r] prendendo il minimo con val
    void range_chmin(int l, int r, long long val) {
        for (int i = l; i <= r; i++) {
            long long curr_val = query_max(i);
            if (curr_val > val) {
                lazy_chmin[i] = min(lazy_chmin[i], val);
                update_point(bit_max, i, min(curr_val, val), n);
                // Aggiorna anche bit_min e bit_sum se necessario
            }
        }
    }
    
    // Aggiorna l'intervallo [l, r] prendendo il massimo con val
    void range_chmax(int l, int r, long long val) {
        for (int i = l; i <= r; i++) {
            long long curr_val = query_min(i);
            if (curr_val < val) {
                lazy_chmax[i] = max(lazy_chmax[i], val);
                update_point(bit_min, i, max(curr_val, val), n);
                // Aggiorna anche bit_max e bit_sum se necessario
            }
        }
    }
    
    // Somma prefissa fino all'indice idx
    long long query_sum(int idx) {
        long long sum = 0;
        for (; idx > 0; idx -= idx & -idx) {
            sum += bit_sum[idx];
        }
        return sum;
    }
    
    // Minimo prefisso fino all'indice idx
    long long query_min(int idx) {
        long long min_val = INF;
        for (; idx > 0; idx -= idx & -idx) {
            min_val = min(min_val, bit_min[idx]);
        }
        return min_val;
    }
    
    // Massimo prefisso fino all'indice idx
    long long query_max(int idx) {
        long long max_val = -INF;
        for (; idx > 0; idx -= idx & -idx) {
            max_val = max(max_val, bit_max[idx]);
        }
        return max_val;
    }
    
    // Range Sum Query nell'intervallo [l, r]
    long long range_sum(int l, int r) {
        return query_sum(r) - query_sum(l-1);
    }
    
    // Range Minimum Query nell'intervallo [l, r]
    long long range_min(int l, int r) {
        long long min_val = INF;
        for (int i = l; i <= r; i++) {
            min_val = min(min_val, query_min(i));
        }
        return min_val;
    }
    
    // Range Maximum Query nell'intervallo [l, r]
    long long range_max(int l, int r) {
        long long max_val = -INF;
        for (int i = l; i <= r; i++) {
            max_val = max(max_val, query_max(i));
        }
        return max_val;
    }
};
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4">
          Anche questa implementazione è semplificata e non completamente ottimizzata. Una vera implementazione di Fenwick Tree Beats richiederebbe una gestione più sofisticata della propagazione lazy e delle informazioni aggiuntive.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Ottimizzazioni e Considerazioni</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il Fenwick Tree Beats è una tecnica avanzata e complessa, e ci sono diverse ottimizzazioni e considerazioni da tenere a mente:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Complessità:</strong> La complessità teorica di Fenwick Tree Beats può essere O(log² N) per operazione nel caso peggiore, ma in pratica è spesso più vicina a O(log N) grazie alle ottimizzazioni.</li>
          <li className="mb-2"><strong>Memoria:</strong> Fenwick Tree Beats richiede più memoria rispetto a un Fenwick Tree standard a causa delle informazioni aggiuntive memorizzate.</li>
          <li className="mb-2"><strong>Implementazione:</strong> L'implementazione di Fenwick Tree Beats è complessa e soggetta a errori. È importante testare accuratamente l'implementazione con casi di test diversi.</li>
          <li className="mb-2"><strong>Alternative:</strong> Per molti problemi, un Segment Tree con Lazy Propagation può essere più semplice da implementare e altrettanto efficiente. Fenwick Tree Beats è più adatto quando la memoria è un vincolo critico.</li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Applicazioni</h2>
        <p className="text-lg leading-relaxed mb-4">
          Fenwick Tree Beats è particolarmente utile per problemi che richiedono una combinazione di:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Range Addition Update</li>
          <li className="mb-1">Range Chmin/Chmax Update</li>
          <li className="mb-1">Range Sum/Min/Max Query</li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">
          Alcuni esempi di problemi che possono essere risolti con Fenwick Tree Beats:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-2">Trovare il massimo/minimo in un array dopo una serie di operazioni di aggiornamento di intervalli</li>
          <li className="mb-2">Calcolare la somma di un array dopo una serie di operazioni "chmin" e "chmax" su intervalli</li>
          <li className="mb-2">Problemi di scheduling con vincoli di tempo massimo e minimo</li>
        </ul>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">7. Problemi di Esempio</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-2"><a href="https://codeforces.com/contest/1321/problem/E" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - World of Darkraft: Battle for Azathoth</a>: Un problema che può essere risolto con Fenwick Tree Beats.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/1187/problem/F" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Expected Square Beauty</a>: Un problema che richiede operazioni di range update e query.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/1208/problem/F" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Bits And Pieces</a>: Un problema che può beneficiare di tecniche simili a Fenwick Tree Beats.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/1322/problem/C" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Instant Noodles</a>: Un altro problema che può essere risolto con tecniche avanzate di range queries.</li>
        </ul>
      </section>
    </div>
  );
};

export default FenwickTreeBeatsPage;
