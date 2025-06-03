import React from 'react';

const SumOverSubsetsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Sum Over Subsets DP (Livello Platinum)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione al Sum Over Subsets DP</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il Sum Over Subsets DP (SOS DP) è una tecnica avanzata di programmazione dinamica che permette di calcolare efficientemente somme su tutti i sottoinsiemi di un insieme. Questa tecnica è particolarmente utile quando dobbiamo elaborare funzioni che coinvolgono tutti i sottoinsiemi di una maschera di bit.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In particolare, il SOS DP è utile per calcolare espressioni della forma:
        </p>
        <p className="text-lg leading-relaxed mb-4 text-center">
          g(mask) = ∑ f(submask) per tutti i submask ⊆ mask
        </p>
        <p className="text-lg leading-relaxed mb-4">
          dove f è una funzione nota e g è la funzione che vogliamo calcolare. In altre parole, g(mask) è la somma dei valori di f su tutti i sottoinsiemi di mask.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Senza ottimizzazioni, calcolare g(mask) per tutti i possibili mask richiederebbe O(3ⁿ) operazioni, dove n è il numero di elementi nell'insieme. Tuttavia, utilizzando il SOS DP, possiamo ridurre questa complessità a O(n·2ⁿ), che è un miglioramento significativo per n grandi.
        </p>
        <p className="text-lg leading-relaxed">
          In questa lezione, esploreremo come implementare e utilizzare il SOS DP per risolvere efficientemente problemi che coinvolgono somme su sottoinsiemi.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Intuizione e Approccio</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'idea chiave del SOS DP è di calcolare g(mask) in modo incrementale, considerando un bit alla volta. Definiamo una funzione ausiliaria dp[mask][i] che rappresenta la somma di f(submask) per tutti i submask di mask che differiscono da mask solo nei primi i bit.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Formalmente:
        </p>
        <p className="text-lg leading-relaxed mb-4 text-center">
          dp[mask][i] = ∑ f(submask) per tutti i submask tali che submask ⊆ mask e submask e mask sono identici nei bit da i+1 a n-1
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Con questa definizione, abbiamo:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">dp[mask][0] = f(mask) (caso base)</li>
          <li className="mb-1">dp[mask][n] = g(mask) (risultato finale)</li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">
          La transizione chiave è:
        </p>
        <p className="text-lg leading-relaxed mb-4 text-center">
          dp[mask][i] = dp[mask][i-1] + dp[mask ^ (1 &lt;&lt; (i-1))][i-1] se il bit (i-1) di mask è 1
        </p>
        <p className="text-lg leading-relaxed mb-4 text-center">
          dp[mask][i] = dp[mask][i-1] se il bit (i-1) di mask è 0
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In altre parole, per calcolare dp[mask][i], consideriamo due casi:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Se il bit (i-1) di mask è 1, allora includiamo nella somma tutti i submask che hanno il bit (i-1) impostato a 0.</li>
          <li className="mb-1">In ogni caso, includiamo tutti i submask che hanno il bit (i-1) uguale a quello di mask.</li>
        </ol>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Implementazione Base</h2>
        <p className="text-lg leading-relaxed mb-4">
          Vediamo come implementare il SOS DP in C++. Inizieremo con una versione base che calcola g(mask) per tutti i possibili mask.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Implementazione base del Sum Over Subsets DP
vector<int> sumOverSubsets(vector<int>& f, int n) {
    int N = 1 << n; // Numero totale di maschere
    
    // dp[mask][i] = somma di f(submask) per tutti i submask che differiscono da mask solo nei primi i bit
    vector<vector<int>> dp(N, vector<int>(n + 1, 0));
    
    // Caso base: dp[mask][0] = f(mask)
    for (int mask = 0; mask < N; mask++) {
        dp[mask][0] = f[mask];
    }
    
    // Riempimento della tabella DP
    for (int i = 1; i <= n; i++) {
        for (int mask = 0; mask < N; mask++) {
            if (mask & (1 << (i - 1))) {
                // Se il bit (i-1) di mask è 1, includiamo submask con bit (i-1) = 0
                dp[mask][i] = dp[mask][i - 1] + dp[mask ^ (1 << (i - 1))][i - 1];
            } else {
                // Se il bit (i-1) di mask è 0, non possiamo includere submask con bit (i-1) = 1
                dp[mask][i] = dp[mask][i - 1];
            }
        }
    }
    
    // Risultato finale: dp[mask][n] = g(mask)
    vector<int> g(N);
    for (int mask = 0; mask < N; mask++) {
        g[mask] = dp[mask][n];
    }
    
    return g;
}

// Esempio di utilizzo
int main() {
    int n = 3; // Numero di elementi nell'insieme
    int N = 1 << n;
    
    // Funzione f: in questo esempio, f(mask) = numero di bit impostati in mask
    vector<int> f(N);
    for (int mask = 0; mask < N; mask++) {
        f[mask] = __builtin_popcount(mask);
    }
    
    vector<int> g = sumOverSubsets(f, n);
    
    cout << "Risultati del Sum Over Subsets:" << endl;
    for (int mask = 0; mask < N; mask++) {
        cout << "g(" << mask << ") = " << g[mask] << endl;
    }
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Tempo: O(n·2ⁿ), dove n è il numero di elementi nell'insieme</li>
          <li className="mb-1">Spazio: O(n·2ⁿ)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Questa implementazione base può essere ottimizzata ulteriormente in termini di spazio, come vedremo nella prossima sezione.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Ottimizzazione dello Spazio</h2>
        <p className="text-lg leading-relaxed mb-4">
          Possiamo ottimizzare l'uso della memoria nell'implementazione del SOS DP osservando che per calcolare dp[mask][i], abbiamo bisogno solo dei valori di dp[mask][i-1] e dp[mask ^ (1 &lt;&lt; (i-1))][i-1]. Questo significa che possiamo utilizzare una sola dimensione per la tabella DP e aggiornare i valori in-place.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Implementazione ottimizzata del Sum Over Subsets DP
vector<int> sumOverSubsetsOptimized(vector<int>& f, int n) {
    int N = 1 << n; // Numero totale di maschere
    
    // dp[mask] = g(mask) alla fine dell'algoritmo
    vector<int> dp = f; // Inizializza con f
    
    // Riempimento della tabella DP
    for (int i = 0; i < n; i++) {
        for (int mask = 0; mask < N; mask++) {
            if (mask & (1 << i)) {
                dp[mask] += dp[mask ^ (1 << i)];
            }
        }
    }
    
    return dp;
}

// Esempio di utilizzo
int main() {
    int n = 3; // Numero di elementi nell'insieme
    int N = 1 << n;
    
    // Funzione f: in questo esempio, f(mask) = numero di bit impostati in mask
    vector<int> f(N);
    for (int mask = 0; mask < N; mask++) {
        f[mask] = __builtin_popcount(mask);
    }
    
    vector<int> g = sumOverSubsetsOptimized(f, n);
    
    cout << "Risultati del Sum Over Subsets (ottimizzato):" << endl;
    for (int mask = 0; mask < N; mask++) {
        cout << "g(" << mask << ") = " << g[mask] << endl;
    }
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Tempo: O(n·2ⁿ), dove n è il numero di elementi nell'insieme</li>
          <li className="mb-1">Spazio: O(2ⁿ)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Questa implementazione ottimizzata utilizza meno memoria e può essere più efficiente in pratica grazie a una migliore località dei dati.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Variante: Somma su Superseti</h2>
        <p className="text-lg leading-relaxed mb-4">
          Oltre alla somma su sottoinsiemi, possiamo anche calcolare la somma su superseti, cioè:
        </p>
        <p className="text-lg leading-relaxed mb-4 text-center">
          h(mask) = ∑ f(supermask) per tutti i supermask ⊇ mask
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Questa variante è utile in problemi dove dobbiamo considerare tutti i superseti di una maschera data. L'implementazione è simile al SOS DP standard, ma con una piccola modifica:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Implementazione della somma su superseti
vector<int> sumOverSupersets(vector<int>& f, int n) {
    int N = 1 << n; // Numero totale di maschere
    
    // dp[mask] = h(mask) alla fine dell'algoritmo
    vector<int> dp = f; // Inizializza con f
    
    // Riempimento della tabella DP
    for (int i = 0; i < n; i++) {
        for (int mask = 0; mask < N; mask++) {
            if (!(mask & (1 << i))) {
                dp[mask] += dp[mask | (1 << i)];
            }
        }
    }
    
    return dp;
}

// Esempio di utilizzo
int main() {
    int n = 3; // Numero di elementi nell'insieme
    int N = 1 << n;
    
    // Funzione f: in questo esempio, f(mask) = numero di bit impostati in mask
    vector<int> f(N);
    for (int mask = 0; mask < N; mask++) {
        f[mask] = __builtin_popcount(mask);
    }
    
    vector<int> h = sumOverSupersets(f, n);
    
    cout << "Risultati della somma su superseti:" << endl;
    for (int mask = 0; mask < N; mask++) {
        cout << "h(" << mask << ") = " << h[mask] << endl;
    }
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Tempo: O(n·2ⁿ), dove n è il numero di elementi nell'insieme</li>
          <li className="mb-1">Spazio: O(2ⁿ)</li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Applicazione: Conteggio di Sottoinsiemi con XOR</h2>
        <p className="text-lg leading-relaxed mb-4">
          Un'applicazione classica del SOS DP è il problema del conteggio di sottoinsiemi con XOR. In questo problema, dato un array di n numeri interi e un valore target k, vogliamo contare il numero di sottoinsiemi dell'array il cui XOR è uguale a k.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Possiamo risolvere questo problema utilizzando il SOS DP:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Definiamo f(mask) come il numero di sottoinsiemi dell'array il cui XOR è uguale a mask.</li>
          <li className="mb-1">Inizialmente, f(0) = 1 (l'insieme vuoto ha XOR 0) e f(mask) = 0 per mask > 0.</li>
          <li className="mb-1">Per ogni elemento x nell'array, aggiorniamo f(mask ^ x) += f(mask) per tutti i mask.</li>
          <li className="mb-1">Alla fine, f(k) sarà il numero di sottoinsiemi con XOR uguale a k.</li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Risoluzione del problema del conteggio di sottoinsiemi con XOR
int countSubsetsWithXOR(vector<int>& arr, int k) {
    int n = arr.size();
    int max_val = *max_element(arr.begin(), arr.end());
    int m = 1;
    
    // Trova il numero di bit necessari per rappresentare il massimo valore
    while (m <= max_val) {
        m <<= 1;
    }
    
    // f[mask] = numero di sottoinsiemi con XOR uguale a mask
    vector<int> f(m, 0);
    f[0] = 1; // L'insieme vuoto ha XOR 0
    
    // Aggiorna f per ogni elemento dell'array
    for (int x : arr) {
        vector<int> new_f = f;
        for (int mask = 0; mask < m; mask++) {
            new_f[mask ^ x] += f[mask];
        }
        f = new_f;
    }
    
    return f[k];
}

// Esempio di utilizzo
int main() {
    vector<int> arr = {1, 2, 3, 4};
    int k = 6;
    
    int count = countSubsetsWithXOR(arr, k);
    
    cout << "Numero di sottoinsiemi con XOR " << k << ": " << count << endl;
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Tempo: O(n·m), dove n è la dimensione dell'array e m è il massimo valore possibile del XOR</li>
          <li className="mb-1">Spazio: O(m)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Questa soluzione è efficiente quando m è relativamente piccolo. Se m è grande, potremmo dover utilizzare altre tecniche, come la trasformata di Fourier veloce (FFT) o strutture dati più avanzate.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">7. Applicazione: Massimo XOR di Sottoinsiemi</h2>
        <p className="text-lg leading-relaxed mb-4">
          Un'altra applicazione interessante del SOS DP è il problema del massimo XOR di sottoinsiemi. In questo problema, dato un array di n numeri interi, vogliamo trovare il valore massimo possibile del XOR di un sottoinsieme dell'array.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Possiamo risolvere questo problema utilizzando un approccio greedy basato sul Trie, ma possiamo anche utilizzare il SOS DP per una soluzione più generale:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Definiamo f(mask) come 1 se esiste un sottoinsieme dell'array il cui XOR è uguale a mask, 0 altrimenti.</li>
          <li className="mb-1">Inizialmente, f(0) = 1 (l'insieme vuoto ha XOR 0) e f(mask) = 0 per mask > 0.</li>
          <li className="mb-1">Per ogni elemento x nell'array, aggiorniamo f(mask ^ x) |= f(mask) per tutti i mask.</li>
          <li className="mb-1">Alla fine, il massimo valore di mask tale che f(mask) = 1 sarà il massimo XOR possibile.</li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Risoluzione del problema del massimo XOR di sottoinsiemi
int maxXORSubset(vector<int>& arr) {
    int n = arr.size();
    int max_val = *max_element(arr.begin(), arr.end());
    int m = 1;
    
    // Trova il numero di bit necessari per rappresentare il massimo valore
    while (m <= max_val) {
        m <<= 1;
    }
    
    // f[mask] = 1 se esiste un sottoinsieme con XOR uguale a mask, 0 altrimenti
    vector<bool> f(m, false);
    f[0] = true; // L'insieme vuoto ha XOR 0
    
    // Aggiorna f per ogni elemento dell'array
    for (int x : arr) {
        vector<bool> new_f = f;
        for (int mask = 0; mask < m; mask++) {
            if (f[mask]) {
                new_f[mask ^ x] = true;
            }
        }
        f = new_f;
    }
    
    // Trova il massimo valore di mask tale che f[mask] = true
    int max_xor = 0;
    for (int mask = 0; mask < m; mask++) {
        if (f[mask]) {
            max_xor = max(max_xor, mask);
        }
    }
    
    return max_xor;
}

// Esempio di utilizzo
int main() {
    vector<int> arr = {1, 2, 3, 4};
    
    int max_xor = maxXORSubset(arr);
    
    cout << "Massimo XOR possibile: " << max_xor << endl;
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Tempo: O(n·m), dove n è la dimensione dell'array e m è il massimo valore possibile del XOR</li>
          <li className="mb-1">Spazio: O(m)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Anche in questo caso, la soluzione è efficiente quando m è relativamente piccolo. Per valori grandi di m, potremmo dover utilizzare altre tecniche.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">8. Applicazione: Conteggio di Coppie con XOR</h2>
        <p className="text-lg leading-relaxed mb-4">
          Un'altra applicazione del SOS DP è il problema del conteggio di coppie con XOR. In questo problema, dato un array di n numeri interi e un valore target k, vogliamo contare il numero di coppie (i, j) tali che arr[i] ^ arr[j] = k.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Possiamo risolvere questo problema utilizzando una tabella di hash, ma possiamo anche utilizzare il SOS DP per una soluzione più generale:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Definiamo count[x] come il numero di occorrenze del valore x nell'array.</li>
          <li className="mb-1">Per ogni valore x nell'array, il numero di coppie (x, y) tali che x ^ y = k è count[x] * count[x ^ k].</li>
          <li className="mb-1">Sommiamo questi conteggi per tutti i valori x nell'array, facendo attenzione a non contare due volte le stesse coppie.</li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Risoluzione del problema del conteggio di coppie con XOR
long long countPairsWithXOR(vector<int>& arr, int k) {
    int n = arr.size();
    
    // Conta le occorrenze di ogni valore nell'array
    unordered_map<int, int> count;
    for (int x : arr) {
        count[x]++;
    }
    
    long long result = 0;
    
    // Per ogni valore x nell'array
    for (auto& [x, cnt] : count) {
        // Cerca y tale che x ^ y = k
        int y = x ^ k;
        
        if (count.find(y) != count.end()) {
            // Se x = y, allora ogni coppia (x, x) contribuisce solo se k = 0
            if (x == y) {
                result += (long long)cnt * (cnt - 1) / 2;
            }
            // Altrimenti, ogni coppia (x, y) contribuisce
            else if (x < y) { // Per evitare di contare due volte
                result += (long long)cnt * count[y];
            }
        }
    }
    
    return result;
}

// Esempio di utilizzo
int main() {
    vector<int> arr = {1, 2, 3, 4, 5, 6, 7};
    int k = 3;
    
    long long count = countPairsWithXOR(arr, k);
    
    cout << "Numero di coppie con XOR " << k << ": " << count << endl;
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Tempo: O(n), dove n è la dimensione dell'array</li>
          <li className="mb-1">Spazio: O(n)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Questa soluzione è molto efficiente e funziona bene anche per array grandi. Tuttavia, se vogliamo contare coppie con XOR in un intervallo o con altre proprietà, potremmo dover utilizzare tecniche più avanzate, come il SOS DP.
        </p>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">9. Problemi di Esempio</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-2"><a href="https://codeforces.com/contest/165/problem/E" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Compatible Numbers</a>: Un problema che può essere risolto con SOS DP.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/383/problem/E" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Vowels</a>: Un problema che utilizza SOS DP in modo creativo.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/449/problem/D" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Jzzhu and Numbers</a>: Un problema che può essere risolto con SOS DP.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/1208/problem/F" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Bits And Pieces</a>: Un problema avanzato che utilizza SOS DP.</li>
        </ul>
      </section>
    </div>
  );
};

export default SumOverSubsetsPage;
