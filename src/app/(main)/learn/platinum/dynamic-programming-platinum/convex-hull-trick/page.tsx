import React from 'react';

const ConvexHullTrickPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Convex Hull Trick (Livello Platinum)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione al Convex Hull Trick</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il Convex Hull Trick (CHT) è una tecnica avanzata di ottimizzazione per la programmazione dinamica che permette di risolvere efficientemente problemi in cui la funzione di transizione ha una forma specifica. In particolare, è utile quando dobbiamo calcolare il minimo (o massimo) di un insieme di funzioni lineari valutate in un punto specifico.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Formalmente, il CHT ci aiuta a risolvere problemi in cui dobbiamo calcolare espressioni del tipo:
        </p>
        <p className="text-lg leading-relaxed mb-4 text-center">
          dp[i] = min(dp[j] + b[j] * a[i]) per j &lt; i
        </p>
        <p className="text-lg leading-relaxed mb-4">
          dove a[i] e b[j] sono valori noti. Questa forma appare in molti problemi di ottimizzazione, come la minimizzazione dei costi in problemi di allocazione di risorse, problemi di taglio e impacchettamento, e altri.
        </p>
        <p className="text-lg leading-relaxed">
          In questa lezione, esploreremo come implementare e utilizzare il Convex Hull Trick per risolvere efficientemente questi tipi di problemi.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Intuizione Geometrica</h2>
        <p className="text-lg leading-relaxed mb-4">
          Per comprendere il Convex Hull Trick, è utile pensare in termini geometrici. Ogni funzione lineare f(x) = mx + b può essere rappresentata come una linea nel piano cartesiano, dove m è la pendenza e b è l'intercetta.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Quando vogliamo trovare il minimo di un insieme di funzioni lineari in un punto x, stiamo essenzialmente cercando la linea che ha il valore più basso in quel punto. Se disegniamo tutte le linee, il minimo in ogni punto x sarà dato dall'inviluppo inferiore (lower envelope) di queste linee.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          L'inviluppo inferiore di un insieme di linee è formato dalle parti delle linee che sono visibili dal basso. Queste parti formano una struttura convessa, da cui il nome "Convex Hull Trick".
        </p>
        <p className="text-lg leading-relaxed mb-4">
          L'osservazione chiave è che non tutte le linee contribuiscono all'inviluppo inferiore. Alcune linee sono completamente sopra altre e non saranno mai il minimo per nessun valore di x. Possiamo eliminare queste linee, riducendo significativamente il numero di confronti necessari.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Implementazione Base</h2>
        <p className="text-lg leading-relaxed mb-4">
          Vediamo come implementare il Convex Hull Trick in C++. Inizieremo con una versione base che supporta l'aggiunta di linee e la query per il minimo in un punto specifico.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Per semplicità, assumiamo che le linee siano aggiunte in ordine di pendenza decrescente (o crescente, a seconda del problema) e che le query siano fatte in ordine di x crescente.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

// Implementazione base del Convex Hull Trick
struct ConvexHullTrick {
    vector<ll> m, b; // Pendenze e intercette delle linee
    
    // Verifica se la linea l3 è inutile (non fa parte dell'inviluppo inferiore)
    bool bad(int l1, int l2, int l3) {
        // Utilizziamo il prodotto incrociato per verificare se l'angolo è convesso
        // (b[l3] - b[l1]) / (m[l1] - m[l3]) <= (b[l2] - b[l1]) / (m[l1] - m[l2])
        // Riscriviamo per evitare la divisione (che potrebbe causare problemi con numeri negativi)
        return (b[l3] - b[l1]) * (m[l1] - m[l2]) <= (b[l2] - b[l1]) * (m[l1] - m[l3]);
    }
    
    // Aggiunge una linea della forma y = m * x + b
    void add(ll _m, ll _b) {
        m.push_back(_m);
        b.push_back(_b);
        
        // Rimuovi le linee che non fanno parte dell'inviluppo inferiore
        while (m.size() >= 3 && bad(m.size() - 3, m.size() - 2, m.size() - 1)) {
            m.erase(m.end() - 2);
            b.erase(b.end() - 2);
        }
    }
    
    // Trova il valore minimo in x
    ll query(ll x) {
        int size = m.size();
        if (size == 0) return LLONG_MAX; // Nessuna linea
        
        int lo = 0, hi = size - 1;
        
        // Caso speciale: se abbiamo solo una linea
        if (lo == hi) return m[lo] * x + b[lo];
        
        // Ricerca binaria per trovare la linea ottimale
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            
            // Confronta i valori delle linee mid e mid+1 in x
            if (m[mid] * x + b[mid] > m[mid + 1] * x + b[mid + 1]) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        
        return m[lo] * x + b[lo];
    }
};

// Esempio di utilizzo
int main() {
    ConvexHullTrick cht;
    
    // Aggiungi alcune linee (in ordine di pendenza decrescente)
    cht.add(3, 2);  // y = 3x + 2
    cht.add(1, 4);  // y = 1x + 4
    cht.add(-2, 10); // y = -2x + 10
    
    // Query per diversi valori di x
    cout << "Minimo in x = 1: " << cht.query(1) << endl;
    cout << "Minimo in x = 3: " << cht.query(3) << endl;
    cout << "Minimo in x = 5: " << cht.query(5) << endl;
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Aggiunta di una linea: O(1) ammortizzato</li>
          <li className="mb-1">Query: O(log n), dove n è il numero di linee</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Questa implementazione base funziona bene quando le pendenze delle linee sono aggiunte in ordine decrescente (o crescente) e le query sono fatte in ordine crescente di x. Per casi più generali, sono necessarie alcune modifiche.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Implementazione Avanzata: Dynamic Convex Hull Trick</h2>
        <p className="text-lg leading-relaxed mb-4">
          In molti problemi, non possiamo garantire che le linee siano aggiunte in ordine di pendenza o che le query siano fatte in ordine crescente di x. In questi casi, abbiamo bisogno di una versione più generale del Convex Hull Trick, chiamata Dynamic Convex Hull Trick.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Una delle implementazioni più efficienti del Dynamic CHT utilizza un set ordinato per mantenere le linee, con un criterio di ordinamento speciale che permette di trovare la linea ottimale per una query in tempo logaritmico.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
typedef long double ld;

// Implementazione del Dynamic Convex Hull Trick
struct Line {
    ll m, b;
    mutable function<const Line*()> succ;
    
    bool operator<(const Line& rhs) const {
        return m < rhs.m;
    }
    
    bool operator<(ll x) const {
        const Line* s = succ();
        if (!s) return false;
        return b - s->b < (s->m - m) * x;
    }
};

struct DynamicConvexHullTrick : public multiset<Line, less<>> {
    // Verifica se la linea l3 è inutile (non fa parte dell'inviluppo inferiore)
    bool bad(iterator y) {
        auto z = next(y);
        if (y == begin()) {
            if (z == end()) return false;
            return y->m == z->m && y->b >= z->b;
        }
        
        auto x = prev(y);
        if (z == end()) return y->m == x->m && y->b >= x->b;
        
        // Verifica se l'intersezione di x e y è a destra dell'intersezione di y e z
        return (x->b - y->b) * (z->m - y->m) >= (y->b - z->b) * (y->m - x->m);
    }
    
    // Aggiorna i puntatori succ per la ricerca binaria
    void update_succ(iterator it) {
        if (it == end()) return;
        
        auto z = next(it);
        it->succ = [=] { return z == end() ? nullptr : &*z; };
    }
    
    // Aggiunge una linea della forma y = m * x + b
    void add(ll m, ll b) {
        auto it = insert({m, b, {}});
        
        // Rimuovi le linee che non fanno parte dell'inviluppo inferiore
        if (bad(it)) {
            erase(it);
            return;
        }
        
        // Rimuovi le linee successive che diventano inutili
        while (next(it) != end() && bad(next(it))) {
            erase(next(it));
        }
        
        // Rimuovi le linee precedenti che diventano inutili
        while (it != begin() && bad(prev(it))) {
            erase(prev(it));
        }
        
        // Aggiorna i puntatori succ
        if (it != begin()) {
            update_succ(prev(it));
        }
        update_succ(it);
    }
    
    // Trova il valore minimo in x
    ll query(ll x) {
        if (empty()) return LLONG_MAX;
        
        auto it = lower_bound(x);
        if (it == end()) {
            return prev(end())->m * x + prev(end())->b;
        }
        
        return it->m * x + it->b;
    }
};

// Esempio di utilizzo
int main() {
    DynamicConvexHullTrick cht;
    
    // Aggiungi alcune linee (in qualsiasi ordine)
    cht.add(3, 2);  // y = 3x + 2
    cht.add(1, 4);  // y = 1x + 4
    cht.add(-2, 10); // y = -2x + 10
    cht.add(2, 1);  // y = 2x + 1
    
    // Query per diversi valori di x (in qualsiasi ordine)
    cout << "Minimo in x = 1: " << cht.query(1) << endl;
    cout << "Minimo in x = 3: " << cht.query(3) << endl;
    cout << "Minimo in x = 5: " << cht.query(5) << endl;
    cout << "Minimo in x = 0: " << cht.query(0) << endl;
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Aggiunta di una linea: O(log n)</li>
          <li className="mb-1">Query: O(log n), dove n è il numero di linee</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Questa implementazione è più generale e può gestire linee aggiunte in qualsiasi ordine e query fatte in qualsiasi ordine. Tuttavia, è più complessa e potrebbe essere più lenta in pratica rispetto alla versione base per casi specifici.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Applicazione: Problema della Divisione Ottimale</h2>
        <p className="text-lg leading-relaxed mb-4">
          Vediamo un'applicazione classica del Convex Hull Trick: il problema della divisione ottimale. In questo problema, abbiamo un array di n numeri a[1...n] e vogliamo dividerlo in k segmenti contigui in modo da minimizzare la somma dei quadrati delle somme dei segmenti.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Formalmente, se definiamo S(i, j) come la somma degli elementi da a[i] a a[j], vogliamo minimizzare:
        </p>
        <p className="text-lg leading-relaxed mb-4 text-center">
          S(1, i₁)² + S(i₁+1, i₂)² + ... + S(iₖ₋₁+1, n)²
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Possiamo risolvere questo problema utilizzando la programmazione dinamica con il Convex Hull Trick:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Definiamo dp[i][j] come il costo minimo per dividere i primi i elementi in j segmenti.</li>
          <li className="mb-1">La transizione base è:
            <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded-md mt-1 ml-8">dp[i][j] = min(dp[k][j-1] + S(k+1, i)²) per k &lt; i</pre>
          </li>
          <li className="mb-1">Riscriviamo questa transizione in una forma adatta al Convex Hull Trick:
            <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded-md mt-1 ml-8">dp[i][j] = min(dp[k][j-1] + (pref[i] - pref[k])²) per k &lt; i</pre>
            <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded-md mt-1 ml-8">dp[i][j] = min(dp[k][j-1] + pref[i]² - 2*pref[i]*pref[k] + pref[k]²) per k &lt; i</pre>
            <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded-md mt-1 ml-8">dp[i][j] = pref[i]² + min(dp[k][j-1] - 2*pref[i]*pref[k] + pref[k]²) per k &lt; i</pre>
            <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded-md mt-1 ml-8">dp[i][j] = pref[i]² + min(dp[k][j-1] + pref[k]² - 2*pref[k]*pref[i]) per k &lt; i</pre>
          </li>
          <li className="mb-1">Ora possiamo utilizzare il Convex Hull Trick con:
            <ul className="list-disc list-inside ml-8 mt-1">
              <li>m = -2*pref[k]</li>
              <li>b = dp[k][j-1] + pref[k]²</li>
              <li>x = pref[i]</li>
            </ul>
          </li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

// Risoluzione del problema della divisione ottimale utilizzando il Convex Hull Trick
ll solveOptimalDivision(vector<int>& a, int k) {
    int n = a.size();
    
    // Calcola le somme prefisse
    vector<ll> pref(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        pref[i] = pref[i - 1] + a[i - 1];
    }
    
    // dp[i][j] = costo minimo per dividere i primi i elementi in j segmenti
    vector<vector<ll>> dp(n + 1, vector<ll>(k + 1, LLONG_MAX));
    dp[0][0] = 0;
    
    for (int j = 1; j <= k; j++) {
        // Utilizziamo il Convex Hull Trick per ogni j
        DynamicConvexHullTrick cht;
        
        // Aggiungi il caso base
        cht.add(-2 * pref[j - 1], dp[j - 1][j - 1] + pref[j - 1] * pref[j - 1]);
        
        for (int i = j; i <= n; i++) {
            // Calcola dp[i][j] utilizzando il Convex Hull Trick
            dp[i][j] = pref[i] * pref[i] + cht.query(pref[i]);
            
            // Aggiungi la nuova linea per le future query
            if (i < n) {
                cht.add(-2 * pref[i], dp[i][j - 1] + pref[i] * pref[i]);
            }
        }
    }
    
    return dp[n][k];
}

// Esempio di utilizzo
int main() {
    vector<int> a = {1, 2, 3, 4, 5};
    int k = 3;
    
    ll result = solveOptimalDivision(a, k);
    
    cout << "Il costo minimo per dividere l'array in " << k << " segmenti è: " << result << endl;
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Tempo: O(n·k·log n), dove n è la dimensione dell'array e k è il numero di segmenti</li>
          <li className="mb-1">Spazio: O(n·k)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Senza il Convex Hull Trick, la complessità temporale sarebbe O(n²·k), quindi otteniamo un significativo miglioramento per array grandi.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Applicazione: Problema della Vendita di Azioni</h2>
        <p className="text-lg leading-relaxed mb-4">
          Un'altra applicazione interessante del Convex Hull Trick è il problema della vendita di azioni. In questo problema, abbiamo i prezzi di un'azione per n giorni consecutivi, e vogliamo massimizzare il profitto comprando e vendendo l'azione, con la restrizione che possiamo fare al massimo k transazioni (una transazione consiste in un acquisto seguito da una vendita).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Possiamo risolvere questo problema utilizzando la programmazione dinamica:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Definiamo dp[i][j] come il profitto massimo che possiamo ottenere nei primi i giorni con al massimo j transazioni.</li>
          <li className="mb-1">La transizione base è:
            <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded-md mt-1 ml-8">dp[i][j] = max(dp[i-1][j], max(price[i] - price[m] + dp[m-1][j-1]) per m &lt; i)</pre>
          </li>
          <li className="mb-1">Riscriviamo questa transizione in una forma adatta al Convex Hull Trick:
            <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded-md mt-1 ml-8">dp[i][j] = max(dp[i-1][j], price[i] + max(dp[m-1][j-1] - price[m]) per m &lt; i)</pre>
          </li>
          <li className="mb-1">Ora possiamo utilizzare il Convex Hull Trick con:
            <ul className="list-disc list-inside ml-8 mt-1">
              <li>m = 1 (costante)</li>
              <li>b = dp[m-1][j-1] - price[m]</li>
              <li>x = 1 (costante)</li>
            </ul>
          </li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

// Risoluzione del problema della vendita di azioni utilizzando il Convex Hull Trick
ll solveStockTrading(vector<int>& prices, int k) {
    int n = prices.size();
    if (n <= 1) return 0;
    
    // Se k è grande, possiamo fare tutte le transazioni possibili
    if (k >= n / 2) {
        ll profit = 0;
        for (int i = 1; i < n; i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
            }
        }
        return profit;
    }
    
    // dp[i][j] = profitto massimo nei primi i giorni con al massimo j transazioni
    vector<vector<ll>> dp(n, vector<ll>(k + 1, 0));
    
    for (int j = 1; j <= k; j++) {
        // Utilizziamo una struttura per mantenere il massimo di dp[m-1][j-1] - prices[m]
        ll maxDiff = dp[0][j - 1] - prices[0];
        
        for (int i = 1; i < n; i++) {
            // Calcola dp[i][j] utilizzando il massimo precedente
            dp[i][j] = max(dp[i - 1][j], prices[i] + maxDiff);
            
            // Aggiorna il massimo per le future iterazioni
            maxDiff = max(maxDiff, dp[i][j - 1] - prices[i]);
        }
    }
    
    return dp[n - 1][k];
}

// Esempio di utilizzo
int main() {
    vector<int> prices = {3, 2, 6, 5, 0, 3};
    int k = 2;
    
    ll result = solveStockTrading(prices, k);
    
    cout << "Il profitto massimo con " << k << " transazioni è: " << result << endl;
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Tempo: O(n·k), dove n è il numero di giorni e k è il numero massimo di transazioni</li>
          <li className="mb-1">Spazio: O(n·k)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          In questo caso, abbiamo utilizzato una versione semplificata del Convex Hull Trick, poiché la pendenza è costante. Questo ci permette di mantenere solo il massimo valore invece di utilizzare una struttura dati più complessa.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">7. Varianti e Ottimizzazioni</h2>
        <p className="text-lg leading-relaxed mb-4">
          Ci sono diverse varianti e ottimizzazioni del Convex Hull Trick che possono essere utili in vari contesti:
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>7.1 Li-Chao Tree:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il Li-Chao Tree è una struttura dati che generalizza il Convex Hull Trick per gestire l'aggiunta di linee e le query in qualsiasi ordine, con complessità O(log R) per operazione, dove R è il range dei valori di x. È particolarmente utile quando il dominio di x è discreto e limitato.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>7.2 Convex Hull Trick per Funzioni Non Lineari:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il Convex Hull Trick può essere esteso per gestire alcune classi di funzioni non lineari, come le funzioni quadratiche. Questo richiede modifiche più sostanziali all'algoritmo e alla struttura dati.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>7.3 Ottimizzazione della Ricerca Binaria:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In alcuni casi, possiamo ottimizzare la ricerca binaria utilizzando tecniche come la ricerca ternaria o mantenendo un puntatore all'ultima posizione ottimale.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>7.4 Convex Hull Trick Online-Offline:</strong>
        </p>
        <p className="text-lg leading-relaxed">
          In alcuni problemi, possiamo utilizzare una combinazione di approcci online e offline per ottimizzare ulteriormente le prestazioni. Ad esempio, possiamo preprocessare alcune linee offline e poi gestire le query online.
        </p>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">8. Problemi di Esempio</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-2"><a href="https://cses.fi/problemset/task/2086" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - Subarray Squares</a>: Un problema che può essere risolto con il Convex Hull Trick.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/319/problem/C" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Kalila and Dimna in the Logging Industry</a>: Un problema classico che utilizza il Convex Hull Trick.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/1083/problem/E" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - The Fair Nut and Rectangles</a>: Un problema che richiede il Convex Hull Trick.</li>
          <li className="mb-2"><a href="https://www.spoj.com/problems/NKLEAVES/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">SPOJ - Leaves</a>: Un problema che può essere risolto con il Convex Hull Trick.</li>
        </ul>
      </section>
    </div>
  );
};

export default ConvexHullTrickPage;
