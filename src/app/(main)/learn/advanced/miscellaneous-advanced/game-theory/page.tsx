import React from 'react';

const GameTheoryAdvancedPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Teoria dei Giochi Avanzata (Livello Advanced)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione</h2>
        <p className="text-lg leading-relaxed mb-4">
          Nella sezione Platinum, abbiamo introdotto i concetti fondamentali della teoria dei giochi combinatori, inclusi i giochi imparziali, il gioco di Nim e il teorema di Sprague-Grundy. In questa sezione Advanced, approfondiremo questi concetti ed esploreremo tecniche e tipi di giochi più complessi.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          La teoria dei giochi combinatori è un campo vasto e affascinante, con applicazioni in molti problemi di programmazione competitiva. Padroneggiare le tecniche avanzate può fornire un vantaggio significativo in contesti competitivi.
        </p>
        <p className="text-lg leading-relaxed">
          In questa lezione, tratteremo:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Giochi su grafi</li>
          <li className="mb-1">Giochi Misere Play</li>
          <li className="mb-1">Giochi Partisan (cenni)</li>
          <li className="mb-1">Applicazioni avanzate del teorema di Sprague-Grundy</li>
          <li className="mb-1">Tecniche di ottimizzazione per stati di gioco complessi</li>
        </ul>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Giochi su Grafi</h2>
        <p className="text-lg leading-relaxed mb-4">
          Molti giochi combinatori possono essere modellati come giochi giocati su grafi. In questi giochi, gli stati corrispondono ai nodi del grafo e le mosse corrispondono agli archi.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">2.1 Concetti Generali</h3>
        <p className="text-lg leading-relaxed mb-4">
          Consideriamo un gioco giocato su un grafo diretto aciclico (DAG). I giocatori muovono alternativamente una pedina da un nodo a un altro seguendo gli archi. Il giocatore che non può muovere perde (condizione di gioco normale).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Questo tipo di gioco è imparziale, quindi possiamo applicare il teorema di Sprague-Grundy. Il valore di Grundy (o nim-valore) di un nodo u è definito come:
        </p>
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mb-4">
          <p className="text-center text-lg">
            Grundy(u) = mex({Grundy(v) | (u, v) è un arco})
          </p>
        </div>
        <p className="text-lg leading-relaxed mb-4">
          Dove mex (Minimum Excluded value) di un insieme di interi non negativi è il più piccolo intero non negativo che non appartiene all'insieme.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Possiamo calcolare i valori di Grundy per tutti i nodi utilizzando la programmazione dinamica o la memoizzazione, partendo dai nodi senza archi uscenti (che hanno Grundy = 0).
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">2.2 Esempio: Gioco di Geography</h3>
        <p className="text-lg leading-relaxed mb-4">
          Nel gioco di Geography, i giocatori nominano alternativamente città. Ogni città nominata deve iniziare con la stessa lettera con cui terminava la città precedente. Una città non può essere nominata due volte. Il giocatore che non può nominare una città valida perde.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Possiamo modellare questo gioco come un grafo in cui i nodi sono le città e un arco (u, v) esiste se la città v inizia con la stessa lettera con cui termina la città u. Il gioco consiste nel muovere una pedina su questo grafo, senza poter visitare lo stesso nodo due volte. Questo è leggermente diverso dal modello base, ma l'idea di calcolare i valori di Grundy può essere adattata.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">2.3 Implementazione del Calcolo di Grundy su DAG</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
vector<int> adj[MAXN];
int grundy[MAXN];
bool visited[MAXN];

// Calcola il valore di Grundy per un nodo u
int calculate_grundy(int u) {
    if (visited[u]) {
        return grundy[u];
    }
    
    visited[u] = true;
    set<int> reachable_grundy_values;
    
    for (int v : adj[u]) {
        reachable_grundy_values.insert(calculate_grundy(v));
    }
    
    // Calcola il mex
    int mex = 0;
    while (reachable_grundy_values.count(mex)) {
        mex++;
    }
    
    grundy[u] = mex;
    return grundy[u];
}

int main() {
    int n, m; // n = numero di nodi, m = numero di archi
    cin >> n >> m;
    
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
    }
    
    // Inizializza
    memset(visited, false, sizeof(visited));
    
    // Calcola i valori di Grundy per tutti i nodi
    // Assumiamo che il grafo sia un DAG
    // Potrebbe essere necessario un ordinamento topologico o partire dai nodi terminali
    for (int i = 1; i <= n; i++) {
        if (!visited[i]) {
            calculate_grundy(i);
        }
    }
    
    // Esempio: determina se il primo giocatore vince partendo dal nodo 1
    if (grundy[1] > 0) {
        cout << "Il primo giocatore vince partendo dal nodo 1" << endl;
    } else {
        cout << "Il secondo giocatore vince partendo dal nodo 1" << endl;
    }
    
    return 0;
}`}</code></pre>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Giochi Misere Play</h2>
        <p className="text-lg leading-relaxed mb-4">
          Nei giochi Misere Play, la condizione di vittoria è invertita: il giocatore che fa l'ultima mossa perde.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">3.1 Teorema di Bouton per Nim Misere</h3>
        <p className="text-lg leading-relaxed mb-4">
          Sorprendentemente, la strategia per Nim Misere è quasi identica a quella per Nim normale. Il teorema di Sprague-Grundy si applica ancora per determinare le posizioni P (vincenti per il secondo giocatore) e N (vincenti per il primo giocatore), con una sola eccezione.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Teorema (Nim Misere):</strong> Una posizione nel gioco di Nim Misere è una posizione P (vincente per il secondo giocatore) se e solo se:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Il nim-sum di tutte le pile è 0, E tutte le pile hanno dimensione al massimo 1.</li>
          <li className="mb-1">Il nim-sum di tutte le pile è diverso da 0, E almeno una pila ha dimensione maggiore di 1.</li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">
          In altre parole, la strategia è la stessa del Nim normale, tranne quando il gioco si riduce a un insieme di pile di dimensione 1. Se il nim-sum è 0 e tutte le pile sono di dimensione 1, la posizione è N in Misere Play (mentre sarebbe P in Normal Play). Se il nim-sum è diverso da 0 e tutte le pile sono di dimensione 1, la posizione è P in Misere Play (mentre sarebbe N in Normal Play).
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">3.2 Giochi Imparziali Generali in Misere Play</h3>
        <p className="text-lg leading-relaxed mb-4">
          Per giochi imparziali generali, determinare la strategia vincente in Misere Play è molto più complesso. Il teorema di Sprague-Grundy non si applica direttamente nella sua forma standard. Tuttavia, per molti giochi, la strategia Misere coincide con la strategia normale fino agli ultimi stadi del gioco.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Giochi Partisan (Cenni)</h2>
        <p className="text-lg leading-relaxed mb-4">
          Nei giochi Partisan, i giocatori hanno a disposizione mosse diverse. Ad esempio, in scacchi, il Bianco può muovere solo i pezzi bianchi e il Nero solo i pezzi neri.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          La teoria per i giochi Partisan è significativamente più complessa di quella per i giochi imparziali. Il teorema di Sprague-Grundy non si applica. La teoria principale per analizzare questi giochi è stata sviluppata da John Conway e coinvolge i <strong>numeri surreali</strong>.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Un gioco G è rappresentato come {L | R}, dove L è l'insieme delle opzioni (giochi) disponibili per il giocatore Sinistro e R è l'insieme delle opzioni disponibili per il giocatore Destro. L'analisi di questi giochi richiede concetti come il valore del gioco, il confronto tra giochi e la somma di giochi, che sono definiti in modo ricorsivo.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Sebbene affascinante, la teoria completa dei giochi Partisan e dei numeri surreali è raramente necessaria in dettaglio per i problemi standard di programmazione competitiva, ma comprendere la distinzione tra giochi imparziali e partisan è importante.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Applicazioni Avanzate di Sprague-Grundy</h2>
        <p className="text-lg leading-relaxed mb-4">
          A volte, il calcolo diretto dei valori di Grundy per tutti gli stati è impraticabile a causa dell'elevato numero di stati. In questi casi, è necessario trovare pattern o proprietà per calcolare i valori di Grundy in modo più efficiente.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">5.1 Periodicità dei Valori di Grundy</h3>
        <p className="text-lg leading-relaxed mb-4">
          In alcuni giochi, la sequenza dei valori di Grundy può diventare periodica. Ad esempio, in un gioco di sottrazione in cui si possono rimuovere 1, 2 o 3 oggetti, i valori di Grundy sono 0, 1, 2, 3, 0, 1, 2, 3, ... con periodo 4. Identificare tali periodicità può semplificare notevolmente il calcolo.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">5.2 Giochi su Griglie</h3>
        <p className="text-lg leading-relaxed mb-4">
          Consideriamo un gioco in cui una pedina si muove su una griglia infinita. Da (x, y), può muoversi a (x-1, y), (x, y-1) o (x-1, y-1). Il valore di Grundy per la posizione (x, y) è Grundy(x, y) = mex({Grundy(x-1, y), Grundy(x, y-1), Grundy(x-1, y-1)}). Si può dimostrare che Grundy(x, y) = x XOR y.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">5.3 Decomposizione del Gioco</h3>
        <p className="text-lg leading-relaxed mb-4">
          Se un gioco può essere decomposto nella somma di più giochi indipendenti (come Nim con più pile), il valore di Grundy del gioco complessivo è il nim-sum (XOR) dei valori di Grundy dei giochi componenti.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Tecniche di Ottimizzazione</h2>
        <p className="text-lg leading-relaxed mb-4">
          Quando si affrontano problemi di teoria dei giochi con un gran numero di stati, sono necessarie tecniche di ottimizzazione.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">6.1 Memoizzazione</h3>
        <p className="text-lg leading-relaxed mb-4">
          Come visto nell'implementazione del calcolo di Grundy, la memoizzazione è fondamentale per evitare di ricalcolare i valori per gli stessi stati più volte.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">6.2 Sfruttare la Simmetria</h3>
        <p className="text-lg leading-relaxed mb-4">
          Se il gioco presenta simmetrie, è possibile ridurre il numero di stati da considerare. Ad esempio, in un gioco su una scacchiera, stati che sono rotazioni o riflessioni l'uno dell'altro potrebbero essere equivalenti.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">6.3 Compressione degli Stati</h3>
        <p className="text-lg leading-relaxed mb-4">
          Se lo stato del gioco può essere rappresentato in modo compatto (ad esempio, usando bitmask per rappresentare sottoinsiemi o configurazioni), è possibile utilizzare strutture dati come map o hash table per la memoizzazione.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">7. Problemi di Esempio Avanzati</h2>
        
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Problema 1: Gioco su un Albero</h3>
          <p className="mb-2">
            <strong>Descrizione:</strong> Due giocatori muovono alternativamente una pedina su un albero. Inizialmente, la pedina è sulla radice. Una mossa consiste nel spostare la pedina da un nodo u a un suo figlio v. Il giocatore che non può muovere perde. Determina se il primo giocatore ha una strategia vincente.
          </p>
          <p className="mb-2">
            <strong>Soluzione:</strong> Questo è un gioco imparziale su un DAG (l'albero diretto dalla radice alle foglie). Possiamo calcolare i valori di Grundy per ogni nodo utilizzando la ricorsione Grundy(u) = mex({Grundy(v) | v è figlio di u}). Il primo giocatore vince se Grundy(radice) > 0.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mt-2"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
vector<int> adj[MAXN];
int grundy[MAXN];

int calculate_grundy(int u) {
    if (grundy[u] != -1) {
        return grundy[u];
    }
    
    set<int> reachable_grundy_values;
    for (int v : adj[u]) {
        reachable_grundy_values.insert(calculate_grundy(v));
    }
    
    int mex = 0;
    while (reachable_grundy_values.count(mex)) {
        mex++;
    }
    
    return grundy[u] = mex;
}

int main() {
    int n;
    cin >> n;
    
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        // Assumiamo che l'arco sia da u a v se u è genitore di v
        // Potrebbe essere necessario costruire l'albero orientato prima
        adj[u].push_back(v);
    }
    
    memset(grundy, -1, sizeof(grundy));
    
    int root_grundy = calculate_grundy(1); // Assumiamo che 1 sia la radice
    
    if (root_grundy > 0) {
        cout << "Primo giocatore vince" << endl;
    } else {
        cout << "Secondo giocatore vince" << endl;
    }
    
    return 0;
}`}</code></pre>
        </div>
        
        <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Problema 2: Nim con Mosse Limitate</h3>
          <p className="mb-2">
            <strong>Descrizione:</strong> Una variante del gioco di Nim in cui da una pila di dimensione n, si possono rimuovere solo k oggetti, dove k appartiene a un insieme fisso S di mosse consentite.
          </p>
          <p className="mb-2">
            <strong>Soluzione:</strong> Questo è ancora un gioco imparziale. Il valore di Grundy per una pila di dimensione n è Grundy(n) = mex({Grundy(n-k) | k ∈ S e n-k ≥ 0}). Possiamo calcolare i valori di Grundy per tutte le dimensioni possibili utilizzando la programmazione dinamica. Se ci sono più pile, il valore di Grundy totale è il nim-sum dei valori di Grundy delle singole pile.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mt-2"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int MAX_SIZE = 1005;
int grundy[MAX_SIZE];
set<int> allowed_moves;

int calculate_grundy(int n) {
    if (n == 0) return 0;
    if (grundy[n] != -1) return grundy[n];
    
    set<int> reachable_grundy_values;
    for (int k : allowed_moves) {
        if (n - k >= 0) {
            reachable_grundy_values.insert(calculate_grundy(n - k));
        }
    }
    
    int mex = 0;
    while (reachable_grundy_values.count(mex)) {
        mex++;
    }
    
    return grundy[n] = mex;
}

int main() {
    int num_piles;
    cin >> num_piles;
    
    int num_moves;
    cin >> num_moves;
    for (int i = 0; i < num_moves; i++) {
        int k;
        cin >> k;
        allowed_moves.insert(k);
    }
    
    memset(grundy, -1, sizeof(grundy));
    
    int nim_sum = 0;
    for (int i = 0; i < num_piles; i++) {
        int pile_size;
        cin >> pile_size;
        nim_sum ^= calculate_grundy(pile_size);
    }
    
    if (nim_sum > 0) {
        cout << "Primo giocatore vince" << endl;
    } else {
        cout << "Secondo giocatore vince" << endl;
    }
    
    return 0;
}`}</code></pre>
        </div>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">8. Conclusioni e Risorse Aggiuntive</h2>
        <p className="text-lg leading-relaxed mb-4">
          La teoria dei giochi combinatori avanzata estende i concetti di base a scenari più complessi, come giochi su grafi, giochi Misere Play e giochi Partisan. Sebbene il teorema di Sprague-Grundy sia lo strumento principale per i giochi imparziali, è fondamentale comprendere i suoi limiti e le tecniche per affrontare giochi più generali o con un gran numero di stati.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Padroneggiare queste tecniche avanzate richiede pratica e una solida comprensione dei concetti fondamentali. L'analisi dei pattern, la decomposizione del gioco e le tecniche di ottimizzazione sono essenziali per risolvere problemi complessi di teoria dei giochi.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">Risorse Aggiuntive</h3>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">
            <a href="https://cp-algorithms.com/game_theory/sprague_grundy_theorem.html" className="text-blue-600 dark:text-blue-400 hover:underline">CP-Algorithms: Sprague-Grundy Theorem</a>
          </li>
          <li className="mb-1">
            <a href="https://en.wikipedia.org/wiki/Combinatorial_game_theory" className="text-blue-600 dark:text-blue-400 hover:underline">Wikipedia: Combinatorial Game Theory</a>
          </li>
          <li className="mb-1">
            <a href="https://www.amazon.com/Winning-Ways-Your-Mathematical-Plays/dp/1568811306" className="text-blue-600 dark:text-blue-400 hover:underline">Libro: "Winning Ways for Your Mathematical Plays" di Berlekamp, Conway, Guy</a> (Riferimento classico e completo)
          </li>
          <li className="mb-1">
            <a href="https://www.topcoder.com/thrive/articles/Game%20Theory" className="text-blue-600 dark:text-blue-400 hover:underline">TopCoder: Tutorial sulla Teoria dei Giochi</a>
          </li>
        </ul>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">9. Esercizi Proposti</h2>
        <p className="text-lg leading-relaxed mb-4">
          Per padroneggiare la teoria dei giochi avanzata, ti consigliamo di risolvere i seguenti problemi:
        </p>
        
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Esercizio 1: Codeforces 1149C - Tree Generator™</h3>
          <p className="mb-2">
            Un problema che coinvolge giochi su alberi e richiede il calcolo di valori di Grundy.
          </p>
          <p>
            <a href="https://codeforces.com/problemset/problem/1149/C" className="text-blue-600 dark:text-blue-400 hover:underline">Link al problema</a>
          </p>
        </div>
        
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Esercizio 2: AtCoder Grand Contest 010 - C - Cleaning</h3>
          <p className="mb-2">
            Un problema di gioco su un albero che richiede un'analisi attenta delle condizioni di vittoria.
          </p>
          <p>
            <a href="https://atcoder.jp/contests/agc010/tasks/agc010_c" className="text-blue-600 dark:text-blue-400 hover:underline">Link al problema</a>
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Esercizio 3: TopCoder SRM 638 - NarrowPassage</h3>
          <p className="mb-2">
            Un problema di gioco che può essere modellato su un grafo e risolto con Sprague-Grundy.
          </p>
          <p>
            <a href="https://community.topcoder.com/stat?c=problem_statement&pm=13500" className="text-blue-600 dark:text-blue-400 hover:underline">Link al problema</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default GameTheoryAdvancedPage;
