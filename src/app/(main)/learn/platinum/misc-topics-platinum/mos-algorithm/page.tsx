import React from 'react';

const MosAlgorithmPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Algoritmo di Mo (Livello Platinum)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione all'Algoritmo di Mo</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo di Mo è una tecnica potente per risolvere problemi che coinvolgono query su intervalli (range queries) in modo offline. A differenza di strutture dati come Segment Tree o Fenwick Tree, che sono progettate per gestire query in tempo reale, l'algoritmo di Mo riordina le query in un modo specifico per ottimizzare il tempo di esecuzione complessivo.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Questo algoritmo è particolarmente utile quando:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Abbiamo un array fisso (che non cambia)</li>
          <li className="mb-1">Dobbiamo rispondere a molte query su intervalli</li>
          <li className="mb-1">Le query sono note in anticipo (offline)</li>
          <li className="mb-1">Possiamo mantenere un risultato incrementalmente (aggiungendo/rimuovendo elementi)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          L'idea fondamentale è riordinare le query in modo da minimizzare il numero di operazioni necessarie per passare da una query all'altra, sfruttando la località spaziale degli intervalli.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Funzionamento dell'Algoritmo</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo di Mo si basa su due concetti chiave:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2">
            <strong>Suddivisione dell'array in blocchi</strong>: Dividiamo l'array di lunghezza n in blocchi di dimensione approssimativamente √n.
          </li>
          <li className="mb-2">
            <strong>Ordinamento speciale delle query</strong>: Ordiniamo le query prima per il blocco in cui si trova l'estremo sinistro, poi per l'estremo destro.
          </li>
        </ol>
        <p className="text-lg leading-relaxed mb-4">
          Questo ordinamento garantisce che il numero totale di operazioni per passare da una query all'altra sia O(n·√n), dove n è la dimensione dell'array.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il processo generale dell'algoritmo è il seguente:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Dividi l'array in blocchi di dimensione √n</li>
          <li className="mb-1">Ordina le query in base al blocco dell'estremo sinistro e poi in base all'estremo destro</li>
          <li className="mb-1">Inizia con un intervallo vuoto [currentL, currentR] = [0, -1]</li>
          <li className="mb-1">Per ogni query [L, R] ordinata:
            <ul className="list-disc list-inside ml-6 mt-1">
              <li>Espandi o contrai l'intervallo corrente per ottenere [L, R]</li>
              <li>Calcola il risultato per la query corrente</li>
            </ul>
          </li>
        </ol>
        <p className="text-lg leading-relaxed">
          L'efficienza dell'algoritmo deriva dal fatto che, con questo ordinamento, il numero totale di operazioni di aggiunta/rimozione di elementi è limitato a O(n·√n).
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Implementazione Base</h2>
        <p className="text-lg leading-relaxed mb-4">
          Vediamo un'implementazione base dell'algoritmo di Mo per risolvere un problema classico: dato un array e Q query [L, R], trovare il numero di elementi distinti nell'intervallo [L, R].
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1e5 + 5;
const int BLOCK_SIZE = 320; // Circa √MAXN

int arr[MAXN];
int freq[MAXN]; // Frequenza di ogni elemento
int distinctCount = 0; // Numero di elementi distinti nell'intervallo corrente

// Struttura per rappresentare una query
struct Query {
    int L, R, idx;
    
    // Costruttore
    Query(int l, int r, int i) : L(l), R(r), idx(i) {}
    
    // Operatore di confronto per l'ordinamento
    bool operator<(const Query& other) const {
        // Blocco dell'estremo sinistro
        int blockL = L / BLOCK_SIZE;
        int otherBlockL = other.L / BLOCK_SIZE;
        
        if (blockL != otherBlockL)
            return blockL < otherBlockL;
        
        // Se sono nello stesso blocco, ordina per R
        return R < other.R;
    }
};

// Funzione per aggiungere un elemento all'intervallo corrente
void add(int idx) {
    freq[arr[idx]]++;
    if (freq[arr[idx]] == 1) {
        distinctCount++;
    }
}

// Funzione per rimuovere un elemento dall'intervallo corrente
void remove(int idx) {
    freq[arr[idx]]--;
    if (freq[arr[idx]] == 0) {
        distinctCount--;
    }
}

// Funzione principale che implementa l'algoritmo di Mo
vector<int> moAlgorithm(vector<Query>& queries) {
    vector<int> answers(queries.size());
    
    // Ordina le query secondo l'algoritmo di Mo
    sort(queries.begin(), queries.end());
    
    // Inizializza l'intervallo corrente
    int currentL = 0, currentR = -1;
    
    // Processa ogni query
    for (const Query& q : queries) {
        // Espandi o contrai l'intervallo corrente per ottenere [q.L, q.R]
        
        // Espandi a destra
        while (currentR < q.R) {
            currentR++;
            add(currentR);
        }
        
        // Contrai da destra
        while (currentR > q.R) {
            remove(currentR);
            currentR--;
        }
        
        // Espandi a sinistra (contrai da sinistra)
        while (currentL > q.L) {
            currentL--;
            add(currentL);
        }
        
        // Contrai a sinistra (espandi da sinistra)
        while (currentL < q.L) {
            remove(currentL);
            currentL++;
        }
        
        // Salva la risposta per la query corrente
        answers[q.idx] = distinctCount;
    }
    
    return answers;
}

int main() {
    int n, q;
    cin >> n >> q;
    
    // Leggi l'array
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // Leggi le query
    vector<Query> queries;
    for (int i = 0; i < q; i++) {
        int l, r;
        cin >> l >> r;
        // Adatta a indici 0-based se necessario
        queries.push_back(Query(l, r, i));
    }
    
    // Esegui l'algoritmo di Mo
    vector<int> results = moAlgorithm(queries);
    
    // Stampa i risultati
    for (int i = 0; i < q; i++) {
        cout << results[i] << "\\n";
    }
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4">
          In questa implementazione, manteniamo un array di frequenze per contare quante volte appare ogni elemento nell'intervallo corrente. Il contatore <code>distinctCount</code> tiene traccia del numero di elementi distinti.
        </p>
        <p className="text-lg leading-relaxed">
          Le funzioni <code>add</code> e <code>remove</code> aggiornano le frequenze e il contatore quando aggiungiamo o rimuoviamo un elemento dall'intervallo corrente.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Analisi della Complessità</h2>
        <p className="text-lg leading-relaxed mb-4">
          Analizziamo la complessità temporale dell'algoritmo di Mo:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">
            <strong>Ordinamento delle query</strong>: O(Q log Q), dove Q è il numero di query.
          </li>
          <li className="mb-1">
            <strong>Operazioni di aggiunta/rimozione</strong>: Ogni elemento viene aggiunto o rimosso al massimo O(√n) volte per ogni blocco, e ci sono O(√n) blocchi. Quindi, il numero totale di operazioni è O(n·√n).
          </li>
          <li className="mb-1">
            <strong>Costo per operazione</strong>: Se le operazioni di aggiunta/rimozione hanno un costo costante O(1), la complessità totale è O(n·√n). Se hanno un costo logaritmico O(log n), la complessità diventa O(n·√n·log n).
          </li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">
          La complessità spaziale è generalmente O(n + Q), dove n è la dimensione dell'array e Q è il numero di query.
        </p>
        <p className="text-lg leading-relaxed">
          L'algoritmo di Mo è particolarmente efficiente quando il numero di query Q è grande e le operazioni di aggiunta/rimozione sono relativamente semplici.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Ottimizzazioni</h2>
        <p className="text-lg leading-relaxed mb-4">
          Esistono diverse ottimizzazioni che possono migliorare ulteriormente le prestazioni dell'algoritmo di Mo:
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>5.1 Ordinamento a Zigzag (Hilbert Order)</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Un'ottimizzazione importante è l'ordinamento a zigzag, che può ridurre la complessità a O(n·√n) anche nel caso peggiore. L'idea è di ordinare le query in modo che i blocchi pari siano ordinati in ordine crescente di R, mentre i blocchi dispari siano ordinati in ordine decrescente di R.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Operatore di confronto migliorato per l'ordinamento a zigzag
bool operator<(const Query& other) const {
    int blockL = L / BLOCK_SIZE;
    int otherBlockL = other.L / BLOCK_SIZE;
    
    if (blockL != otherBlockL)
        return blockL < otherBlockL;
    
    // Zigzag: blocchi pari in ordine crescente, blocchi dispari in ordine decrescente
    if (blockL % 2 == 0)
        return R < other.R;
    else
        return R > other.R;
}`}</code></pre>
        <p className="text-lg leading-relaxed mb-2 mt-4">
          <strong>5.2 Ordinamento di Hilbert</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Un'ottimizzazione ancora più avanzata è l'ordinamento basato sulla curva di Hilbert, che può ridurre ulteriormente il numero di operazioni. Questo approccio mappa le coordinate bidimensionali (L, R) su una curva unidimensionale che preserva la località.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>5.3 Dimensione del Blocco Ottimale</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          La dimensione ottimale del blocco può variare a seconda del problema specifico. Sebbene √n sia una buona approssimazione teorica, in pratica potrebbe essere necessario regolare questo valore. Alcuni programmatori utilizzano formule come n^(2/3) o sperimentano con diverse dimensioni.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Esempio di dimensione del blocco ottimizzata
const int BLOCK_SIZE = 700; // Potrebbe essere migliore di √n in alcuni casi`}</code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Applicazioni Avanzate</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo di Mo può essere applicato a una vasta gamma di problemi che coinvolgono query su intervalli. Vediamo alcune applicazioni avanzate:
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>6.1 Moda in un Intervallo</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Trovare l'elemento più frequente (moda) in ogni intervallo [L, R]. Possiamo mantenere un array di frequenze e tenere traccia dell'elemento con la frequenza massima.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Strutture per trovare la moda
int freq[MAXN];
int maxFreq = 0;
int modeElement = 0;

void add(int idx) {
    freq[arr[idx]]++;
    if (freq[arr[idx]] > maxFreq) {
        maxFreq = freq[arr[idx]];
        modeElement = arr[idx];
    } else if (freq[arr[idx]] == maxFreq && arr[idx] < modeElement) {
        // In caso di parità, prendiamo l'elemento più piccolo
        modeElement = arr[idx];
    }
}

void remove(int idx) {
    freq[arr[idx]]--;
    
    // Se abbiamo rimosso l'elemento con frequenza massima, dobbiamo ricalcolare
    if (arr[idx] == modeElement && freq[arr[idx]] < maxFreq) {
        // Ricalcola la moda
        maxFreq = 0;
        for (int i = 0; i < MAXN; i++) {
            if (freq[i] > maxFreq) {
                maxFreq = freq[i];
                modeElement = i;
            }
        }
    }
}`}</code></pre>
        <p className="text-lg leading-relaxed mb-2 mt-4">
          <strong>6.2 Numero di Sottointervalli con Proprietà Specifiche</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Possiamo adattare l'algoritmo di Mo per contare il numero di sottointervalli che soddisfano determinate proprietà, come avere esattamente k elementi distinti.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>6.3 Query su Alberi</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo di Mo può essere esteso per gestire query su alberi utilizzando la tecnica dell'Euler Tour. Convertiamo l'albero in un array lineare attraverso una visita DFS, e poi applichiamo l'algoritmo di Mo su questo array.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Strutture per Mo su alberi
vector<int> euler; // Sequenza dell'Euler Tour
vector<int> first; // Prima occorrenza di ogni nodo nell'Euler Tour
vector<int> last;  // Ultima occorrenza di ogni nodo nell'Euler Tour

// Costruisce l'Euler Tour
void dfs(int node, int parent) {
    first[node] = euler.size();
    euler.push_back(node);
    
    for (int child : graph[node]) {
        if (child != parent) {
            dfs(child, node);
            euler.push_back(node); // Aggiungi di nuovo il nodo quando risaliamo
        }
    }
    
    last[node] = euler.size() - 1;
}

// Query per il sottalbero radicato in node
// Diventa una query sull'intervallo [first[node], last[node]]`}</code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">7. Esempio Completo: Numero di Valori Distinti in un Intervallo</h2>
        <p className="text-lg leading-relaxed mb-4">
          Vediamo un esempio completo di come risolvere il problema SPOJ DQUERY: dato un array e Q query [L, R], trovare il numero di elementi distinti nell'intervallo [L, R].
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1e5 + 5;
const int MAXVAL = 1e6 + 5;
int BLOCK_SIZE;

int arr[MAXN];
int freq[MAXVAL];
int distinctCount = 0;

struct Query {
    int L, R, idx;
    
    Query(int l, int r, int i) : L(l), R(r), idx(i) {}
    
    bool operator<(const Query& other) const {
        int blockL = L / BLOCK_SIZE;
        int otherBlockL = other.L / BLOCK_SIZE;
        
        if (blockL != otherBlockL)
            return blockL < otherBlockL;
        
        // Zigzag ordering
        if (blockL % 2 == 0)
            return R < other.R;
        else
            return R > other.R;
    }
};

void add(int idx) {
    freq[arr[idx]]++;
    if (freq[arr[idx]] == 1) {
        distinctCount++;
    }
}

void remove(int idx) {
    freq[arr[idx]]--;
    if (freq[arr[idx]] == 0) {
        distinctCount--;
    }
}

vector<int> moAlgorithm(vector<Query>& queries) {
    vector<int> answers(queries.size());
    
    sort(queries.begin(), queries.end());
    
    int currentL = 0, currentR = -1;
    
    for (const Query& q : queries) {
        while (currentR < q.R) {
            currentR++;
            add(currentR);
        }
        
        while (currentR > q.R) {
            remove(currentR);
            currentR--;
        }
        
        while (currentL > q.L) {
            currentL--;
            add(currentL);
        }
        
        while (currentL < q.L) {
            remove(currentL);
            currentL++;
        }
        
        answers[q.idx] = distinctCount;
    }
    
    return answers;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n;
    cin >> n;
    
    BLOCK_SIZE = sqrt(n);
    
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    int q;
    cin >> q;
    
    vector<Query> queries;
    for (int i = 0; i < q; i++) {
        int l, r;
        cin >> l >> r;
        // Adatta a indici 0-based
        queries.push_back(Query(l-1, r-1, i));
    }
    
    vector<int> results = moAlgorithm(queries);
    
    for (int i = 0; i < q; i++) {
        cout << results[i] << "\\n";
    }
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4">
          Questo codice risolve efficacemente il problema DQUERY utilizzando l'algoritmo di Mo con l'ottimizzazione dell'ordinamento a zigzag. La complessità temporale è O((n+q)·√n), che è sufficiente per gestire i vincoli del problema.
        </p>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">8. Problemi di Esempio</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-2"><a href="https://www.spoj.com/problems/DQUERY/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">SPOJ - DQUERY</a>: Trovare il numero di elementi distinti in un intervallo.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/86/problem/D" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Powerful Array</a>: Calcolare la somma di a[i]^2 * count(a[i]) per ogni intervallo.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/617/problem/E" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - XOR and Favorite Number</a>: Contare il numero di sottointervalli con XOR uguale a un dato valore.</li>
          <li className="mb-2"><a href="https://www.spoj.com/problems/COT2/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">SPOJ - COT2</a>: Trovare il numero di valori distinti sul percorso tra due nodi in un albero.</li>
        </ul>
      </section>
    </div>
  );
};

export default MosAlgorithmPage;
