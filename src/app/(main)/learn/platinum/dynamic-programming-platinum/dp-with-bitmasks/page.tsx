import React from 'react';

const DPWithBitmasksPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Programmazione Dinamica con Bitmasks (Livello Platinum)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione alla DP con Bitmasks</h2>
        <p className="text-lg leading-relaxed mb-4">
          La programmazione dinamica (DP) con bitmasks è una tecnica potente che combina la programmazione dinamica con la rappresentazione di stati utilizzando maschere di bit. Questa tecnica è particolarmente utile quando dobbiamo tenere traccia di sottoinsiemi di un insieme relativamente piccolo di elementi (tipicamente fino a 20-25 elementi).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In questa tecnica, utilizziamo un intero come una maschera di bit, dove ogni bit rappresenta la presenza o l'assenza di un elemento specifico nel sottoinsieme corrente. Ad esempio, la maschera 10110 (in binario) rappresenta il sottoinsieme {1, 2, 4} di un insieme di 5 elementi.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          La DP con bitmasks è particolarmente efficace per problemi che coinvolgono:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Enumerazione di tutti i sottoinsiemi possibili</li>
          <li className="mb-1">Problemi di assegnazione o partizionamento</li>
          <li className="mb-1">Problemi che richiedono di considerare tutte le permutazioni</li>
          <li className="mb-1">Problemi con stati che possono essere rappresentati come presenza/assenza di elementi</li>
        </ul>
        <p className="text-lg leading-relaxed">
          In questa lezione, esploreremo come utilizzare la DP con bitmasks per risolvere vari problemi algoritmici complessi.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Operazioni di Base sui Bitmasks</h2>
        <p className="text-lg leading-relaxed mb-4">
          Prima di immergerci nella DP con bitmasks, rivediamo alcune operazioni di base sui bitmasks che saranno utili:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Verifica se il bit i-esimo è impostato nella maschera mask
bool isSet(int mask, int i) {
    return (mask & (1 << i)) != 0;
}

// Imposta il bit i-esimo nella maschera mask
int setBit(int mask, int i) {
    return mask | (1 << i);
}

// Cancella il bit i-esimo nella maschera mask
int clearBit(int mask, int i) {
    return mask & ~(1 << i);
}

// Inverte il bit i-esimo nella maschera mask
int toggleBit(int mask, int i) {
    return mask ^ (1 << i);
}

// Conta il numero di bit impostati nella maschera mask
int countBits(int mask) {
    int count = 0;
    while (mask) {
        count += mask & 1;
        mask >>= 1;
    }
    return count;
    // Alternativa: return __builtin_popcount(mask); // GCC intrinsic
}

// Verifica se mask1 è un sottoinsieme di mask2
bool isSubset(int mask1, int mask2) {
    return (mask1 & mask2) == mask1;
}

// Ottiene il prossimo sottoinsieme della maschera mask
int nextSubset(int subset, int mask) {
    return (subset - 1) & mask;
}

// Itera su tutti i sottoinsiemi di mask
void iterateSubsets(int mask) {
    for (int subset = mask; subset; subset = (subset - 1) & mask) {
        // Fai qualcosa con subset
    }
}

// Itera su tutti i sottoinsiemi di dimensione k di mask
void iterateKSubsets(int mask, int k) {
    int subset = (1 << k) - 1; // Primo sottoinsieme: k bit meno significativi impostati
    while (subset <= mask) {
        // Fai qualcosa con subset
        
        // Genera il prossimo sottoinsieme di dimensione k (algoritmo di Gosper)
        int c = subset & -subset;
        int r = subset + c;
        subset = (((r ^ subset) >> 2) / c) | r;
    }
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4">
          Queste operazioni di base ci permetteranno di manipolare efficacemente i bitmasks nei nostri algoritmi di DP.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Il Problema del Commesso Viaggiatore (TSP)</h2>
        <p className="text-lg leading-relaxed mb-4">
          Uno dei problemi classici che può essere risolto utilizzando la DP con bitmasks è il Problema del Commesso Viaggiatore (Traveling Salesman Problem, TSP). In questo problema, dato un grafo completo con n nodi e pesi sugli archi, dobbiamo trovare il ciclo hamiltoniano di peso minimo, cioè un percorso che visita ogni nodo esattamente una volta e ritorna al nodo di partenza, con il costo totale minimo.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Possiamo risolvere questo problema utilizzando la DP con bitmasks come segue:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Definiamo dp[mask][i] come il costo minimo di un percorso che parte dal nodo 0, visita esattamente i nodi nel sottoinsieme rappresentato da mask, e termina al nodo i.</li>
          <li className="mb-1">La base della ricorsione è dp[1][0] = 0, che rappresenta il percorso che parte dal nodo 0 e visita solo il nodo 0.</li>
          <li className="mb-1">La transizione è:
            <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded-md mt-1 ml-8">dp[mask][i] = min(dp[mask ^ (1 << i)][j] + cost[j][i]) per ogni j in mask, j ≠ i</pre>
          </li>
          <li className="mb-1">La risposta finale è min(dp[(1 << n) - 1][i] + cost[i][0]) per ogni i da 1 a n-1, che rappresenta il costo minimo di un ciclo hamiltoniano.</li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int INF = 1e9;

// Risoluzione del Problema del Commesso Viaggiatore (TSP) con DP e bitmasks
int solveTSP(vector<vector<int>>& cost) {
    int n = cost.size();
    vector<vector<int>> dp(1 << n, vector<int>(n, INF));
    
    // Caso base: partenza dal nodo 0
    dp[1][0] = 0;
    
    // Riempimento della tabella DP
    for (int mask = 1; mask < (1 << n); mask++) {
        if (!(mask & 1)) continue; // Il nodo 0 deve essere incluso
        
        for (int i = 0; i < n; i++) {
            if (!(mask & (1 << i))) continue; // i deve essere in mask
            
            // Se mask contiene solo il nodo i
            if (mask == (1 << i)) {
                if (i == 0) dp[mask][i] = 0;
                continue;
            }
            
            // Maschera senza il nodo i
            int prevMask = mask ^ (1 << i);
            
            // Prova tutti i nodi j come predecessori di i
            for (int j = 0; j < n; j++) {
                if (!(prevMask & (1 << j))) continue; // j deve essere in prevMask
                
                dp[mask][i] = min(dp[mask][i], dp[prevMask][j] + cost[j][i]);
            }
        }
    }
    
    // Trova il costo minimo del ciclo hamiltoniano
    int fullMask = (1 << n) - 1;
    int minCost = INF;
    
    for (int i = 1; i < n; i++) {
        minCost = min(minCost, dp[fullMask][i] + cost[i][0]);
    }
    
    return minCost;
}

// Esempio di utilizzo
int main() {
    int n = 4; // Numero di nodi
    
    // Matrice dei costi
    vector<vector<int>> cost = {
        {0, 10, 15, 20},
        {10, 0, 35, 25},
        {15, 35, 0, 30},
        {20, 25, 30, 0}
    };
    
    int minCost = solveTSP(cost);
    
    cout << "Il costo minimo del ciclo hamiltoniano è: " << minCost << endl;
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Tempo: O(n² · 2ⁿ), dove n è il numero di nodi</li>
          <li className="mb-1">Spazio: O(n · 2ⁿ)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Questa soluzione è efficiente per n fino a circa 20-25, a seconda della potenza di calcolo disponibile.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Problema dell'Assegnamento Ottimale</h2>
        <p className="text-lg leading-relaxed mb-4">
          Un altro problema classico che può essere risolto con la DP con bitmasks è il Problema dell'Assegnamento Ottimale. In questo problema, abbiamo n lavoratori e n compiti, e ogni lavoratore ha un costo per svolgere ogni compito. L'obiettivo è assegnare esattamente un compito a ogni lavoratore in modo da minimizzare il costo totale.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Possiamo risolvere questo problema utilizzando la DP con bitmasks come segue:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Definiamo dp[mask] come il costo minimo per assegnare i compiti nel sottoinsieme rappresentato da mask ai primi countBits(mask) lavoratori.</li>
          <li className="mb-1">La base della ricorsione è dp[0] = 0, che rappresenta il caso in cui non ci sono compiti assegnati.</li>
          <li className="mb-1">La transizione è:
            <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded-md mt-1 ml-8">dp[mask] = min(dp[mask ^ (1 << j)] + cost[countBits(mask) - 1][j]) per ogni j in mask</pre>
          </li>
          <li className="mb-1">La risposta finale è dp[(1 << n) - 1], che rappresenta il costo minimo per assegnare tutti i compiti.</li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int INF = 1e9;

// Risoluzione del Problema dell'Assegnamento Ottimale con DP e bitmasks
int solveAssignment(vector<vector<int>>& cost) {
    int n = cost.size();
    vector<int> dp(1 << n, INF);
    
    // Caso base: nessun compito assegnato
    dp[0] = 0;
    
    // Riempimento della tabella DP
    for (int mask = 0; mask < (1 << n); mask++) {
        int worker = __builtin_popcount(mask); // Numero di bit impostati = numero di compiti già assegnati
        
        if (worker < n) { // Se non tutti i lavoratori hanno un compito
            for (int task = 0; task < n; task++) {
                if (!(mask & (1 << task))) { // Se il compito task non è ancora assegnato
                    dp[mask | (1 << task)] = min(dp[mask | (1 << task)], dp[mask] + cost[worker][task]);
                }
            }
        }
    }
    
    return dp[(1 << n) - 1];
}

// Esempio di utilizzo
int main() {
    int n = 3; // Numero di lavoratori/compiti
    
    // Matrice dei costi: cost[i][j] = costo per il lavoratore i di svolgere il compito j
    vector<vector<int>> cost = {
        {3, 2, 7},
        {5, 1, 3},
        {2, 7, 2}
    };
    
    int minCost = solveAssignment(cost);
    
    cout << "Il costo minimo dell'assegnamento ottimale è: " << minCost << endl;
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Tempo: O(n · 2ⁿ), dove n è il numero di lavoratori/compiti</li>
          <li className="mb-1">Spazio: O(2ⁿ)</li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Problema del Sottoinsieme con Vincoli</h2>
        <p className="text-lg leading-relaxed mb-4">
          Un altro problema interessante che può essere risolto con la DP con bitmasks è il Problema del Sottoinsieme con Vincoli. In questo problema, abbiamo un insieme di n elementi, e vogliamo selezionare un sottoinsieme che soddisfi certi vincoli e ottimizzi una certa funzione obiettivo.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Ad esempio, consideriamo il problema in cui abbiamo n elementi, ognuno con un valore e un peso, e vogliamo selezionare un sottoinsieme di elementi tale che la somma dei pesi non superi un certo limite W e la somma dei valori sia massimizzata. Inoltre, ci sono vincoli di compatibilità: alcuni elementi non possono essere selezionati insieme.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Possiamo risolvere questo problema utilizzando la DP con bitmasks come segue:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Definiamo dp[mask] come il valore massimo che possiamo ottenere selezionando un sottoinsieme degli elementi rappresentato da mask, tale che la somma dei pesi non superi W e tutti i vincoli di compatibilità siano soddisfatti.</li>
          <li className="mb-1">La base della ricorsione è dp[0] = 0, che rappresenta il caso in cui non ci sono elementi selezionati.</li>
          <li className="mb-1">La transizione considera tutti i sottoinsiemi validi di mask e prende il massimo.</li>
          <li className="mb-1">La risposta finale è il massimo di dp[mask] per tutti i mask validi.</li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Risoluzione del Problema del Sottoinsieme con Vincoli utilizzando DP e bitmasks
int solveSubsetWithConstraints(vector<int>& value, vector<int>& weight, int W, vector<pair<int, int>>& incompatible) {
    int n = value.size();
    vector<int> dp(1 << n, -1); // -1 indica che il sottoinsieme non è valido
    
    // Caso base: nessun elemento selezionato
    dp[0] = 0;
    
    // Preprocessamento: crea una maschera di incompatibilità per ogni elemento
    vector<int> incompatMask(n, 0);
    for (auto& [i, j] : incompatible) {
        incompatMask[i] |= (1 << j);
        incompatMask[j] |= (1 << i);
    }
    
    // Riempimento della tabella DP
    for (int mask = 1; mask < (1 << n); mask++) {
        int totalWeight = 0;
        bool valid = true;
        
        // Verifica se il sottoinsieme è valido (nessun elemento incompatibile)
        for (int i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                totalWeight += weight[i];
                
                // Verifica se l'elemento i è compatibile con gli altri elementi selezionati
                if (mask & incompatMask[i]) {
                    valid = false;
                    break;
                }
            }
        }
        
        if (!valid || totalWeight > W) continue; // Sottoinsieme non valido
        
        // Calcola il valore totale del sottoinsieme
        int totalValue = 0;
        for (int i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                totalValue += value[i];
            }
        }
        
        dp[mask] = totalValue;
    }
    
    // Trova il valore massimo tra tutti i sottoinsiemi validi
    int maxValue = 0;
    for (int mask = 0; mask < (1 << n); mask++) {
        if (dp[mask] != -1) {
            maxValue = max(maxValue, dp[mask]);
        }
    }
    
    return maxValue;
}

// Esempio di utilizzo
int main() {
    int n = 4; // Numero di elementi
    int W = 10; // Limite di peso
    
    // Valori degli elementi
    vector<int> value = {10, 40, 30, 50};
    
    // Pesi degli elementi
    vector<int> weight = {5, 4, 6, 3};
    
    // Coppie di elementi incompatibili (non possono essere selezionati insieme)
    vector<pair<int, int>> incompatible = {
        {0, 2},
        {1, 3}
    };
    
    int maxValue = solveSubsetWithConstraints(value, weight, W, incompatible);
    
    cout << "Il valore massimo ottenibile è: " << maxValue << endl;
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Tempo: O(n · 2ⁿ), dove n è il numero di elementi</li>
          <li className="mb-1">Spazio: O(2ⁿ)</li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Problema della Copertura di Insieme</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il Problema della Copertura di Insieme (Set Cover Problem) è un altro problema che può essere risolto efficacemente con la DP con bitmasks quando il numero di elementi è piccolo. In questo problema, abbiamo un universo U di n elementi e una collezione S di m sottoinsiemi di U. L'obiettivo è selezionare il minor numero possibile di sottoinsiemi da S tale che la loro unione sia uguale a U.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Possiamo risolvere questo problema utilizzando la DP con bitmasks come segue:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Definiamo dp[mask] come il numero minimo di sottoinsiemi necessari per coprire gli elementi rappresentati da mask.</li>
          <li className="mb-1">La base della ricorsione è dp[0] = 0, che rappresenta il caso in cui non ci sono elementi da coprire.</li>
          <li className="mb-1">La transizione considera tutti i sottoinsiemi disponibili e prende il minimo.</li>
          <li className="mb-1">La risposta finale è dp[(1 << n) - 1], che rappresenta il numero minimo di sottoinsiemi necessari per coprire tutti gli elementi.</li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

const int INF = 1e9;

// Risoluzione del Problema della Copertura di Insieme utilizzando DP e bitmasks
int solveSetCover(vector<int>& subsets, int n) {
    int m = subsets.size();
    vector<int> dp(1 << n, INF);
    
    // Caso base: nessun elemento da coprire
    dp[0] = 0;
    
    // Riempimento della tabella DP
    for (int mask = 0; mask < (1 << n); mask++) {
        // Prova ad aggiungere ogni sottoinsieme
        for (int i = 0; i < m; i++) {
            // Nuovo mask dopo aver aggiunto il sottoinsieme i
            int newMask = mask | subsets[i];
            
            // Aggiorna dp[newMask] se è più conveniente
            dp[newMask] = min(dp[newMask], dp[mask] + 1);
        }
    }
    
    return dp[(1 << n) - 1];
}

// Esempio di utilizzo
int main() {
    int n = 5; // Numero di elementi nell'universo
    int m = 3; // Numero di sottoinsiemi
    
    // Sottoinsiemi rappresentati come bitmasks
    // Ad esempio, 10101 rappresenta il sottoinsieme {0, 2, 4}
    vector<int> subsets = {
        0b10101, // {0, 2, 4}
        0b11010, // {1, 3, 4}
        0b01101  // {0, 2, 3}
    };
    
    int minSubsets = solveSetCover(subsets, n);
    
    cout << "Il numero minimo di sottoinsiemi necessari è: " << minSubsets << endl;
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Tempo: O(m · 2ⁿ), dove n è il numero di elementi e m è il numero di sottoinsiemi</li>
          <li className="mb-1">Spazio: O(2ⁿ)</li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">7. Ottimizzazioni e Considerazioni Pratiche</h2>
        <p className="text-lg leading-relaxed mb-4">
          Quando si utilizza la DP con bitmasks, ci sono diverse ottimizzazioni e considerazioni pratiche da tenere a mente:
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>7.1 Memoizzazione vs Tabulazione:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          La DP può essere implementata utilizzando sia l'approccio top-down (memoizzazione) che l'approccio bottom-up (tabulazione). La memoizzazione può essere più intuitiva e può evitare di calcolare stati non necessari, ma la tabulazione può essere più efficiente in termini di costanti nascoste.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Approccio top-down (memoizzazione) per il TSP
int tspMemoization(vector<vector<int>>& cost, int mask, int pos, vector<vector<int>>& memo) {
    int n = cost.size();
    
    // Caso base: tutti i nodi sono stati visitati
    if (mask == (1 << n) - 1) {
        return cost[pos][0]; // Ritorna al nodo di partenza
    }
    
    // Se questo stato è già stato calcolato
    if (memo[mask][pos] != -1) {
        return memo[mask][pos];
    }
    
    int ans = INF;
    
    // Prova a visitare tutti i nodi non ancora visitati
    for (int city = 0; city < n; city++) {
        if (!(mask & (1 << city))) {
            ans = min(ans, cost[pos][city] + tspMemoization(cost, mask | (1 << city), city, memo));
        }
    }
    
    return memo[mask][pos] = ans;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>7.2 Iterazione Efficiente sui Sottoinsiemi:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In molti problemi, è necessario iterare su tutti i sottoinsiemi di un insieme o su tutti i sottoinsiemi di un sottoinsieme. Ci sono modi efficienti per farlo:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Itera su tutti i sottoinsiemi di mask
for (int subset = mask; subset; subset = (subset - 1) & mask) {
    // Fai qualcosa con subset
}

// Itera su tutti i sottoinsiemi di dimensione k di mask
int subset = (1 << k) - 1; // Primo sottoinsieme: k bit meno significativi impostati
while (subset <= mask) {
    // Fai qualcosa con subset
    
    // Genera il prossimo sottoinsieme di dimensione k (algoritmo di Gosper)
    int c = subset & -subset;
    int r = subset + c;
    subset = (((r ^ subset) >> 2) / c) | r;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>7.3 Compressione della Memoria:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Quando n è grande, la memoria richiesta per memorizzare tutti gli stati può diventare un problema. In alcuni casi, è possibile utilizzare tecniche di compressione della memoria, come la rolling DP o la compressione degli stati.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>7.4 Parallelizzazione:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          La DP con bitmasks può essere facilmente parallelizzata, poiché gli stati sono spesso indipendenti. Questo può portare a significativi miglioramenti delle prestazioni su hardware multi-core.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>7.5 Limiti Pratici:</strong>
        </p>
        <p className="text-lg leading-relaxed">
          A causa della complessità esponenziale, la DP con bitmasks è pratica solo per problemi con n relativamente piccolo (tipicamente fino a 20-25). Per problemi più grandi, è necessario utilizzare altre tecniche, come algoritmi di approssimazione o euristiche.
        </p>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">8. Problemi di Esempio</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-2"><a href="https://cses.fi/problemset/task/1690" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - Hamiltonian Flights</a>: Un problema che può essere risolto con DP e bitmasks.</li>
          <li className="mb-2"><a href="https://cses.fi/problemset/task/1653" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - Elevator Rides</a>: Un problema che utilizza DP con bitmasks in modo creativo.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/1391/problem/E" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Pairs of Pairs</a>: Un problema che può essere risolto con DP e bitmasks.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/1215/problem/E" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Marbles</a>: Un problema avanzato che utilizza DP con bitmasks.</li>
        </ul>
      </section>
    </div>
  );
};

export default DPWithBitmasksPage;
