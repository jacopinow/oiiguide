import React from 'react';

const KnuthOptimizationPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Ottimizzazione di Knuth (Livello Advanced)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'ottimizzazione di Knuth è una tecnica avanzata per ottimizzare alcuni tipi di problemi di programmazione dinamica, riducendo la complessità da O(n³) a O(n²). Questa ottimizzazione, sviluppata da Donald Knuth, si applica a una classe specifica di problemi di DP che soddisfano determinate proprietà di monotonicità.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In particolare, l'ottimizzazione di Knuth è applicabile quando la ricorsione DP ha la seguente forma:
        </p>
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mb-4">
          <p className="text-center text-lg">
            dp[i][j] = min(dp[i][k] + dp[k+1][j]) + C[i][j] per i ≤ k &lt; j
          </p>
        </div>
        <p className="text-lg leading-relaxed mb-4">
          E soddisfa la condizione di monotonicità:
        </p>
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mb-4">
          <p className="text-center text-lg">
            opt[i][j-1] ≤ opt[i][j] ≤ opt[i+1][j]
          </p>
        </div>
        <p className="text-lg leading-relaxed">
          Dove opt[i][j] è il valore di k che minimizza l'espressione per dp[i][j].
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Condizioni di Applicabilità</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'ottimizzazione di Knuth può essere applicata quando sono soddisfatte le seguenti condizioni:
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">2.1 Forma della Ricorsione</h3>
        <p className="text-lg leading-relaxed mb-4">
          La ricorsione DP deve avere la forma:
        </p>
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mb-4">
          <p className="text-center text-lg">
            dp[i][j] = min(dp[i][k] + dp[k+1][j]) + C[i][j] per i ≤ k &lt; j
          </p>
        </div>
        <p className="text-lg leading-relaxed mb-4">
          Dove C[i][j] è una funzione di costo che può essere calcolata in O(1).
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">2.2 Proprietà di Monotonicità</h3>
        <p className="text-lg leading-relaxed mb-4">
          La posizione ottimale k (che minimizza l'espressione) deve soddisfare la proprietà di monotonicità:
        </p>
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mb-4">
          <p className="text-center text-lg">
            opt[i][j-1] ≤ opt[i][j] ≤ opt[i+1][j]
          </p>
        </div>
        <p className="text-lg leading-relaxed mb-4">
          Questa proprietà significa che quando l'intervallo [i,j] si espande a destra (j aumenta), la posizione ottimale k non può spostarsi a sinistra. Analogamente, quando l'intervallo si espande a sinistra (i diminuisce), la posizione ottimale k non può spostarsi a destra.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">2.3 Quadrangle Inequality</h3>
        <p className="text-lg leading-relaxed mb-4">
          Una condizione sufficiente (ma non necessaria) per la proprietà di monotonicità è la "quadrangle inequality":
        </p>
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mb-4">
          <p className="text-center text-lg">
            C[a][c] + C[b][d] ≤ C[a][d] + C[b][c] per tutti a ≤ b ≤ c ≤ d
          </p>
        </div>
        <p className="text-lg leading-relaxed mb-4">
          Insieme alla proprietà di monotonicità della funzione di costo:
        </p>
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mb-4">
          <p className="text-center text-lg">
            C[b][c] ≤ C[a][d] per tutti a ≤ b ≤ c ≤ d
          </p>
        </div>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Implementazione</h2>
        <p className="text-lg leading-relaxed mb-4">
          Vediamo come implementare l'ottimizzazione di Knuth in C++:
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">3.1 Approccio Naive (O(n³))</h3>
        <p className="text-lg leading-relaxed mb-4">
          Prima di applicare l'ottimizzazione, ecco come apparirebbe un'implementazione naive:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Approccio naive O(n³)
int solve_naive(int n, vector<int>& values) {
    // dp[i][j] = costo minimo per l'intervallo [i,j]
    vector<vector<int>> dp(n+1, vector<int>(n+1, INT_MAX));
    
    // Casi base: intervalli di lunghezza 0 o 1
    for (int i = 1; i <= n; i++) {
        dp[i][i] = 0;  // Costo per un singolo elemento
    }
    
    // Calcola il costo per intervalli di lunghezza crescente
    for (int len = 2; len <= n; len++) {
        for (int i = 1; i <= n - len + 1; i++) {
            int j = i + len - 1;
            
            // Calcola C[i][j] (dipende dal problema specifico)
            int cost = calculate_cost(i, j, values);
            
            // Trova il k ottimale
            for (int k = i; k < j; k++) {
                dp[i][j] = min(dp[i][j], dp[i][k] + dp[k+1][j] + cost);
            }
        }
    }
    
    return dp[1][n];
}

// Funzione per calcolare il costo C[i][j] (esempio)
int calculate_cost(int i, int j, vector<int>& values) {
    // Questo è solo un esempio, il costo effettivo dipende dal problema
    int sum = 0;
    for (int k = i; k <= j; k++) {
        sum += values[k-1];
    }
    return sum;
}`}</code></pre>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">3.2 Ottimizzazione di Knuth (O(n²))</h3>
        <p className="text-lg leading-relaxed mb-4">
          Ecco come implementare l'ottimizzazione di Knuth:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Ottimizzazione di Knuth O(n²)
int solve_knuth(int n, vector<int>& values) {
    // dp[i][j] = costo minimo per l'intervallo [i,j]
    vector<vector<int>> dp(n+1, vector<int>(n+1, INT_MAX));
    
    // opt[i][j] = k ottimale per dp[i][j]
    vector<vector<int>> opt(n+1, vector<int>(n+1, 0));
    
    // Casi base: intervalli di lunghezza 0 o 1
    for (int i = 1; i <= n; i++) {
        dp[i][i] = 0;  // Costo per un singolo elemento
        opt[i][i] = i;  // Il k ottimale per un singolo elemento è l'elemento stesso
    }
    
    // Calcola il costo per intervalli di lunghezza crescente
    for (int len = 2; len <= n; len++) {
        for (int i = 1; i <= n - len + 1; i++) {
            int j = i + len - 1;
            
            // Calcola C[i][j] (dipende dal problema specifico)
            int cost = calculate_cost(i, j, values);
            
            // Trova il k ottimale nell'intervallo [opt[i][j-1], opt[i+1][j]]
            dp[i][j] = INT_MAX;
            for (int k = opt[i][j-1]; k <= opt[i+1][j]; k++) {
                if (k < j) {  // Assicurati che k sia valido
                    int val = dp[i][k] + dp[k+1][j] + cost;
                    if (val < dp[i][j]) {
                        dp[i][j] = val;
                        opt[i][j] = k;
                    }
                }
            }
        }
    }
    
    return dp[1][n];
}`}</code></pre>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">3.3 Ottimizzazione di Knuth (Versione Alternativa)</h3>
        <p className="text-lg leading-relaxed mb-4">
          Un'implementazione alternativa che non richiede la matrice opt esplicita:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Ottimizzazione di Knuth (versione alternativa)
int solve_knuth_alt(int n, vector<int>& values) {
    // dp[i][j] = costo minimo per l'intervallo [i,j]
    vector<vector<int>> dp(n+1, vector<int>(n+1, INT_MAX));
    
    // best[i][j] = k ottimale per dp[i][j]
    vector<vector<int>> best(n+1, vector<int>(n+1, 0));
    
    // Casi base: intervalli di lunghezza 0 o 1
    for (int i = 1; i <= n; i++) {
        dp[i][i] = 0;
        best[i][i] = i;
    }
    
    // Calcola il costo per intervalli di lunghezza crescente
    for (int len = 2; len <= n; len++) {
        for (int i = 1; i <= n - len + 1; i++) {
            int j = i + len - 1;
            
            // Calcola C[i][j]
            int cost = calculate_cost(i, j, values);
            
            // Trova il k ottimale
            for (int k = best[i][j-1]; k <= best[i+1][j]; k++) {
                if (k < j) {
                    int val = dp[i][k] + dp[k+1][j] + cost;
                    if (val < dp[i][j]) {
                        dp[i][j] = val;
                        best[i][j] = k;
                    }
                }
            }
        }
    }
    
    return dp[1][n];
}`}</code></pre>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Esempi di Applicazione</h2>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">4.1 Optimal Binary Search Tree</h3>
        <p className="text-lg leading-relaxed mb-4">
          Un classico problema che può essere risolto con l'ottimizzazione di Knuth è la costruzione di un albero binario di ricerca ottimale. Dato un insieme di chiavi con le loro frequenze di accesso, vogliamo costruire un BST che minimizzi il costo medio di ricerca.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Optimal Binary Search Tree con ottimizzazione di Knuth
int optimal_bst(vector<int>& keys, vector<int>& freq, int n) {
    // dp[i][j] = costo minimo per un BST con chiavi da i a j
    vector<vector<int>> dp(n+1, vector<int>(n+1, INT_MAX));
    
    // opt[i][j] = radice ottimale per il sottoalbero con chiavi da i a j
    vector<vector<int>> opt(n+1, vector<int>(n+1, 0));
    
    // sum[i][j] = somma delle frequenze delle chiavi da i a j
    vector<vector<int>> sum(n+1, vector<int>(n+1, 0));
    
    // Calcola le somme prefisse delle frequenze
    for (int i = 1; i <= n; i++) {
        sum[i][i] = freq[i-1];
        for (int j = i+1; j <= n; j++) {
            sum[i][j] = sum[i][j-1] + freq[j-1];
        }
    }
    
    // Casi base: alberi con una sola chiave
    for (int i = 1; i <= n; i++) {
        dp[i][i] = freq[i-1];
        opt[i][i] = i;
    }
    
    // Calcola il costo per alberi con più chiavi
    for (int len = 2; len <= n; len++) {
        for (int i = 1; i <= n - len + 1; i++) {
            int j = i + len - 1;
            
            dp[i][j] = INT_MAX;
            
            // Trova la radice ottimale nell'intervallo [opt[i][j-1], opt[i+1][j]]
            for (int r = opt[i][j-1]; r <= opt[i+1][j]; r++) {
                int left_cost = (r > i) ? dp[i][r-1] : 0;
                int right_cost = (r < j) ? dp[r+1][j] : 0;
                int total_cost = left_cost + right_cost + sum[i][j];
                
                if (total_cost < dp[i][j]) {
                    dp[i][j] = total_cost;
                    opt[i][j] = r;
                }
            }
        }
    }
    
    return dp[1][n];
}`}</code></pre>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">4.2 Matrix Chain Multiplication</h3>
        <p className="text-lg leading-relaxed mb-4">
          Un altro problema classico è la moltiplicazione a catena di matrici. Dato un insieme di matrici, vogliamo trovare l'ordine di moltiplicazione che minimizza il numero totale di operazioni.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Matrix Chain Multiplication con ottimizzazione di Knuth
int matrix_chain(vector<int>& dims, int n) {
    // dp[i][j] = costo minimo per moltiplicare le matrici da i a j
    vector<vector<int>> dp(n+1, vector<int>(n+1, INT_MAX));
    
    // opt[i][j] = k ottimale per dp[i][j]
    vector<vector<int>> opt(n+1, vector<int>(n+1, 0));
    
    // Casi base: singole matrici
    for (int i = 1; i <= n; i++) {
        dp[i][i] = 0;
        opt[i][i] = i;
    }
    
    // Calcola il costo per catene di lunghezza crescente
    for (int len = 2; len <= n; len++) {
        for (int i = 1; i <= n - len + 1; i++) {
            int j = i + len - 1;
            
            dp[i][j] = INT_MAX;
            
            // Trova il k ottimale nell'intervallo [opt[i][j-1], opt[i+1][j]]
            for (int k = opt[i][j-1]; k <= opt[i+1][j]; k++) {
                if (k < j) {
                    int cost = dp[i][k] + dp[k+1][j] + dims[i-1] * dims[k] * dims[j];
                    if (cost < dp[i][j]) {
                        dp[i][j] = cost;
                        opt[i][j] = k;
                    }
                }
            }
        }
    }
    
    return dp[1][n];
}`}</code></pre>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Analisi della Complessità</h2>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">5.1 Complessità Temporale</h3>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Approccio Naive:</strong> O(n³), dove n è la dimensione del problema. Questo perché per ogni coppia (i,j), dobbiamo considerare O(n) possibili valori di k.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Con Ottimizzazione di Knuth:</strong> O(n²), perché per ogni coppia (i,j), consideriamo solo O(1) possibili valori di k nell'intervallo [opt[i][j-1], opt[i+1][j]].
        </p>
        <p className="text-lg leading-relaxed mb-4">
          La riduzione da O(n³) a O(n²) è significativa per problemi di grandi dimensioni e può fare la differenza tra una soluzione accettabile e una che supera il limite di tempo.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">5.2 Complessità Spaziale</h3>
        <p className="text-lg leading-relaxed mb-4">
          Sia per l'approccio naive che per l'ottimizzazione di Knuth, la complessità spaziale è O(n²) per memorizzare le matrici dp e opt.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Verifica della Proprietà di Monotonicità</h2>
        <p className="text-lg leading-relaxed mb-4">
          Prima di applicare l'ottimizzazione di Knuth, è importante verificare che il problema soddisfi la proprietà di monotonicità. Questo può essere fatto in diversi modi:
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">6.1 Verifica Matematica</h3>
        <p className="text-lg leading-relaxed mb-4">
          Per alcuni problemi, è possibile dimostrare matematicamente che la proprietà di monotonicità è soddisfatta. Ad esempio, per il problema dell'albero binario di ricerca ottimale, è stato dimostrato che la quadrangle inequality è soddisfatta.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">6.2 Verifica Empirica</h3>
        <p className="text-lg leading-relaxed mb-4">
          In alternativa, è possibile verificare empiricamente la proprietà di monotonicità implementando sia l'approccio naive che l'ottimizzazione di Knuth e confrontando i risultati su un insieme di test case.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Verifica empirica della proprietà di monotonicità
bool verify_monotonicity(int n, vector<int>& values) {
    // Calcola opt[i][j] con l'approccio naive
    vector<vector<int>> dp(n+1, vector<int>(n+1, INT_MAX));
    vector<vector<int>> opt(n+1, vector<int>(n+1, 0));
    
    // Inizializza i casi base
    for (int i = 1; i <= n; i++) {
        dp[i][i] = 0;
        opt[i][i] = i;
    }
    
    // Calcola dp e opt per tutti gli intervalli
    for (int len = 2; len <= n; len++) {
        for (int i = 1; i <= n - len + 1; i++) {
            int j = i + len - 1;
            
            int cost = calculate_cost(i, j, values);
            
            for (int k = i; k < j; k++) {
                int val = dp[i][k] + dp[k+1][j] + cost;
                if (val < dp[i][j]) {
                    dp[i][j] = val;
                    opt[i][j] = k;
                }
            }
        }
    }
    
    // Verifica la proprietà di monotonicità
    for (int i = 1; i <= n; i++) {
        for (int j = i + 1; j <= n; j++) {
            if (j < n && opt[i][j] > opt[i][j+1]) {
                return false;  // Violazione: opt[i][j] > opt[i][j+1]
            }
            if (i > 1 && opt[i][j] < opt[i-1][j]) {
                return false;  // Violazione: opt[i][j] < opt[i-1][j]
            }
        }
    }
    
    return true;  // La proprietà di monotonicità è soddisfatta
}`}</code></pre>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">7. Problemi di Esempio</h2>
        
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Problema 1: Optimal Binary Search Tree</h3>
          <p className="mb-2">
            <strong>Descrizione:</strong> Dato un insieme di n chiavi ordinate e le loro frequenze di accesso, costruisci un albero binario di ricerca che minimizzi il costo medio di ricerca.
          </p>
          <p className="mb-2">
            <strong>Soluzione:</strong> Questo problema può essere risolto con l'ottimizzazione di Knuth, come mostrato nell'esempio 4.1.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mt-2"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

int optimal_bst(vector<int>& keys, vector<int>& freq, int n) {
    // Implementazione come mostrato nell'esempio 4.1
    // ...
}

int main() {
    int n;
    cin >> n;
    
    vector<int> keys(n);
    vector<int> freq(n);
    
    for (int i = 0; i < n; i++) {
        cin >> keys[i];
    }
    
    for (int i = 0; i < n; i++) {
        cin >> freq[i];
    }
    
    int min_cost = optimal_bst(keys, freq, n);
    cout << "Costo minimo: " << min_cost << endl;
    
    return 0;
}`}</code></pre>
        </div>
        
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Problema 2: Matrix Chain Multiplication</h3>
          <p className="mb-2">
            <strong>Descrizione:</strong> Date n matrici A₁, A₂, ..., Aₙ con dimensioni p₀×p₁, p₁×p₂, ..., pₙ₋₁×pₙ, trova l'ordine di moltiplicazione che minimizza il numero totale di operazioni.
          </p>
          <p className="mb-2">
            <strong>Soluzione:</strong> Questo problema può essere risolto con l'ottimizzazione di Knuth, come mostrato nell'esempio 4.2.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mt-2"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

int matrix_chain(vector<int>& dims, int n) {
    // Implementazione come mostrato nell'esempio 4.2
    // ...
}

int main() {
    int n;
    cin >> n;
    
    vector<int> dims(n + 1);
    for (int i = 0; i <= n; i++) {
        cin >> dims[i];
    }
    
    int min_ops = matrix_chain(dims, n);
    cout << "Numero minimo di operazioni: " << min_ops << endl;
    
    return 0;
}`}</code></pre>
        </div>
        
        <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Problema 3: Partizione Ottimale</h3>
          <p className="mb-2">
            <strong>Descrizione:</strong> Dato un array di n numeri, vogliamo dividerlo in k segmenti contigui in modo da minimizzare la somma dei costi di ogni segmento. Il costo di un segmento è dato da una funzione C(i,j).
          </p>
          <p className="mb-2">
            <strong>Soluzione:</strong> Se la funzione di costo soddisfa la quadrangle inequality, possiamo utilizzare l'ottimizzazione di Knuth.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mt-2"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

int optimal_partition(vector<int>& arr, int n, int k) {
    // dp[i][j] = costo minimo per dividere i primi i elementi in j segmenti
    vector<vector<int>> dp(n+1, vector<int>(k+1, INT_MAX));
    
    // opt[i][j] = ultimo elemento del j-esimo segmento nella partizione ottimale dei primi i elementi
    vector<vector<int>> opt(n+1, vector<int>(k+1, 0));
    
    // Calcola i costi per tutti i possibili segmenti
    vector<vector<int>> cost(n+1, vector<int>(n+1, 0));
    for (int i = 1; i <= n; i++) {
        for (int j = i; j <= n; j++) {
            // Calcola il costo del segmento [i,j]
            cost[i][j] = calculate_segment_cost(arr, i, j);
        }
    }
    
    // Caso base: un solo segmento
    for (int i = 1; i <= n; i++) {
        dp[i][1] = cost[1][i];
        opt[i][1] = 0;
    }
    
    // Calcola il costo per più segmenti
    for (int j = 2; j <= k; j++) {
        for (int i = j; i <= n; i++) {
            dp[i][j] = INT_MAX;
            
            // Trova l'ultimo elemento del (j-1)-esimo segmento
            for (int p = opt[i-1][j-1]; p <= opt[i][j-1]; p++) {
                if (p < i) {
                    int val = dp[p][j-1] + cost[p+1][i];
                    if (val < dp[i][j]) {
                        dp[i][j] = val;
                        opt[i][j] = p;
                    }
                }
            }
        }
    }
    
    return dp[n][k];
}

int calculate_segment_cost(vector<int>& arr, int i, int j) {
    // Calcola il costo del segmento [i,j]
    // Questo dipende dal problema specifico
    int sum = 0;
    for (int k = i; k <= j; k++) {
        sum += arr[k-1];
    }
    return sum;
}

int main() {
    int n, k;
    cin >> n >> k;
    
    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    int min_cost = optimal_partition(arr, n, k);
    cout << "Costo minimo: " << min_cost << endl;
    
    return 0;
}`}</code></pre>
        </div>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">8. Conclusioni e Risorse Aggiuntive</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'ottimizzazione di Knuth è una tecnica potente per migliorare l'efficienza di alcuni problemi di programmazione dinamica. Sebbene sia applicabile solo a una classe specifica di problemi, può portare a miglioramenti significativi delle prestazioni quando è applicabile.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          È importante ricordare che l'ottimizzazione di Knuth richiede che il problema soddisfi determinate proprietà di monotonicità. Prima di applicarla, è necessario verificare che queste proprietà siano soddisfatte, sia matematicamente che empiricamente.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">Risorse Aggiuntive</h3>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">
            <a href="https://en.wikipedia.org/wiki/Knuth%27s_optimization" className="text-blue-600 dark:text-blue-400 hover:underline">Wikipedia: Knuth's Optimization</a>
          </li>
          <li className="mb-1">
            <a href="https://cp-algorithms.com/dynamic_programming/knuth-optimization.html" className="text-blue-600 dark:text-blue-400 hover:underline">CP-Algorithms: Knuth Optimization</a>
          </li>
          <li className="mb-1">
            <a href="https://www.geeksforgeeks.org/optimal-binary-search-tree-dp-24/" className="text-blue-600 dark:text-blue-400 hover:underline">GeeksforGeeks: Optimal Binary Search Tree</a>
          </li>
          <li className="mb-1">
            <a href="https://www.geeksforgeeks.org/matrix-chain-multiplication-dp-8/" className="text-blue-600 dark:text-blue-400 hover:underline">GeeksforGeeks: Matrix Chain Multiplication</a>
          </li>
        </ul>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">9. Esercizi Proposti</h2>
        <p className="text-lg leading-relaxed mb-4">
          Per padroneggiare l'ottimizzazione di Knuth, ti consigliamo di risolvere i seguenti problemi:
        </p>
        
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Esercizio 1: SPOJ MIXTURES - Mixtures</h3>
          <p className="mb-2">
            Un problema che richiede di trovare l'ordine ottimale per mescolare pozioni colorate.
          </p>
          <p>
            <a href="https://www.spoj.com/problems/MIXTURES/" className="text-blue-600 dark:text-blue-400 hover:underline">Link al problema</a>
          </p>
        </div>
        
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Esercizio 2: Codeforces 321E - Ciel and Gondolas</h3>
          <p className="mb-2">
            Un problema di partizione ottimale che può essere risolto con l'ottimizzazione di Knuth.
          </p>
          <p>
            <a href="https://codeforces.com/contest/321/problem/E" className="text-blue-600 dark:text-blue-400 hover:underline">Link al problema</a>
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Esercizio 3: USACO Gold - Circular Barn</h3>
          <p className="mb-2">
            Un problema che richiede di trovare la posizione ottimale per le porte in un fienile circolare.
          </p>
          <p>
            <a href="http://www.usaco.org/index.php?page=viewproblem2&cpid=626" className="text-blue-600 dark:text-blue-400 hover:underline">Link al problema</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default KnuthOptimizationPage;
