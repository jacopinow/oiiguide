import React from 'react';

const ZAlgorithmPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Z-Algorithm (Livello Platinum)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione all'Algoritmo Z</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo Z è un potente strumento per il pattern matching nelle stringhe, che permette di trovare tutte le occorrenze di un pattern in un testo in tempo lineare O(n+m), dove n è la lunghezza del testo e m è la lunghezza del pattern.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          A differenza dell'algoritmo KMP (Knuth-Morris-Pratt), che calcola la funzione di fallback per il pattern, l'algoritmo Z calcola quello che viene chiamato "Z-array" o "Z-function" per l'intera stringa concatenata pattern + testo.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          La Z-function Z[i] di una stringa S è definita come la lunghezza del più lungo prefisso comune tra S e il suffisso di S che inizia alla posizione i. In altre parole, Z[i] è la lunghezza della più lunga sottostringa che inizia alla posizione i ed è anche un prefisso di S.
        </p>
        <p className="text-lg leading-relaxed">
          Questo algoritmo è particolarmente utile non solo per il pattern matching, ma anche per molti altri problemi di stringhe, come trovare il periodo minimo di una stringa, contare i palindromi distinti, e altro ancora.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Calcolo dell'Array Z</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il calcolo naïve dell'array Z richiederebbe O(n²) tempo, poiché per ogni posizione i dovremmo confrontare carattere per carattere il prefisso di S con il suffisso che inizia in i. Tuttavia, esiste un algoritmo efficiente che calcola l'array Z in tempo lineare O(n).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          L'idea chiave è utilizzare le informazioni già calcolate per evitare confronti ridondanti. Manteniamo un intervallo [L, R] che rappresenta il più a destra "segmento Z" che abbiamo trovato finora, cioè un sottointervallo [L, R] tale che S[L...R] è anche un prefisso di S.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Per calcolare Z[i], consideriamo tre casi:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Se i > R, non abbiamo informazioni precedenti da utilizzare, quindi calcoliamo Z[i] con un confronto carattere per carattere.</li>
          <li className="mb-1">Se i ≤ R, sappiamo che S[i...R] è un prefisso di S[i-L...R-L+1], quindi possiamo inizializzare Z[i] = min(Z[i-L], R-i+1) e poi estendere se necessario.</li>
        </ol>
        <p className="text-lg leading-relaxed mb-4">
          Vediamo l'implementazione in C++ dell'algoritmo per calcolare l'array Z:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Calcola l'array Z per una stringa s
vector<int> calculateZArray(string s) {
    int n = s.length();
    vector<int> z(n, 0);
    
    // [L, R] è l'intervallo Z più a destra trovato finora
    int L = 0, R = 0;
    
    for (int i = 1; i < n; i++) {
        // Caso 1: i > R, non abbiamo informazioni precedenti
        if (i > R) {
            L = R = i;
            
            // Confronto carattere per carattere
            while (R < n && s[R-L] == s[R]) {
                R++;
            }
            
            z[i] = R - L;
            R--; // Aggiustiamo R per rappresentare l'ultimo carattere del segmento Z
        }
        // Caso 2: i ≤ R, possiamo utilizzare valori Z precedenti
        else {
            // k è la posizione corrispondente a i nel prefisso
            int k = i - L;
            
            // Se Z[k] è minore della lunghezza rimanente nell'intervallo [L, R],
            // allora Z[i] = Z[k]
            if (z[k] < R - i + 1) {
                z[i] = z[k];
            }
            // Altrimenti, dobbiamo estendere l'intervallo [L, R]
            else {
                L = i;
                
                // Confronto carattere per carattere a partire da R+1
                while (R < n && s[R-L] == s[R]) {
                    R++;
                }
                
                z[i] = R - L;
                R--; // Aggiustiamo R per rappresentare l'ultimo carattere del segmento Z
            }
        }
    }
    
    return z;
}

// Esempio di utilizzo
int main() {
    string s = "ababab";
    vector<int> z = calculateZArray(s);
    
    cout << "Stringa: " << s << endl;
    cout << "Z-array: ";
    for (int val : z) {
        cout << val << " ";
    }
    cout << endl;
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4">
          Per la stringa "ababab", l'array Z sarà [0, 0, 4, 0, 2, 0]. Questo significa che:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Z[0] = 0 (per convenzione, non calcoliamo Z[0])</li>
          <li className="mb-1">Z[1] = 0 (nessun prefisso comune tra "ababab" e "babab")</li>
          <li className="mb-1">Z[2] = 4 (il prefisso comune tra "ababab" e "abab" è "abab" di lunghezza 4)</li>
          <li className="mb-1">Z[3] = 0 (nessun prefisso comune tra "ababab" e "bab")</li>
          <li className="mb-1">Z[4] = 2 (il prefisso comune tra "ababab" e "ab" è "ab" di lunghezza 2)</li>
          <li className="mb-1">Z[5] = 0 (nessun prefisso comune tra "ababab" e "b")</li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Pattern Matching con l'Algoritmo Z</h2>
        <p className="text-lg leading-relaxed mb-4">
          Una delle applicazioni più comuni dell'algoritmo Z è il pattern matching. Per trovare tutte le occorrenze di un pattern P in un testo T, concateniamo P e T con un carattere separatore che non appare né in P né in T (ad esempio, "$"), formando una nuova stringa S = P + "$" + T.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Calcoliamo l'array Z per S. Se Z[i] = |P| per qualche i > |P| + 1, allora abbiamo trovato un'occorrenza del pattern P nel testo T che inizia alla posizione i - |P| - 1 in T.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Vediamo l'implementazione in C++ del pattern matching utilizzando l'algoritmo Z:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Trova tutte le occorrenze del pattern p nel testo t
vector<int> findPattern(string p, string t) {
    string s = p + "$" + t;
    int n = s.length();
    int m = p.length();
    
    vector<int> z = calculateZArray(s);
    vector<int> occurrences;
    
    // Cerchiamo valori Z che sono uguali alla lunghezza del pattern
    for (int i = m + 1; i < n; i++) {
        if (z[i] == m) {
            // Abbiamo trovato un'occorrenza alla posizione i - m - 1 nel testo originale
            occurrences.push_back(i - m - 1);
        }
    }
    
    return occurrences;
}

// Calcola l'array Z per una stringa s
vector<int> calculateZArray(string s) {
    // ... (stesso codice di prima) ...
}

// Esempio di utilizzo
int main() {
    string text = "ababababa";
    string pattern = "aba";
    
    vector<int> occurrences = findPattern(pattern, text);
    
    cout << "Pattern: " << pattern << endl;
    cout << "Testo: " << text << endl;
    cout << "Occorrenze alle posizioni: ";
    for (int pos : occurrences) {
        cout << pos << " ";
    }
    cout << endl;
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4">
          Per il pattern "aba" nel testo "ababababa", l'algoritmo troverà occorrenze alle posizioni 0, 2, 4 e 6.
        </p>
        <p className="text-lg leading-relaxed">
          La complessità temporale di questo algoritmo è O(n+m), dove n è la lunghezza del testo e m è la lunghezza del pattern, il che lo rende efficiente quanto l'algoritmo KMP.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Applicazioni dell'Algoritmo Z</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo Z ha molte applicazioni oltre al semplice pattern matching. Vediamo alcune delle più comuni:
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>4.1 Trovare il Periodo Minimo di una Stringa:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il periodo di una stringa S è il più piccolo intero p tale che S[i] = S[i+p] per tutti gli i validi. Utilizzando l'array Z, possiamo trovare il periodo minimo di una stringa in tempo lineare.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`int findMinimumPeriod(string s) {
    int n = s.length();
    vector<int> z = calculateZArray(s);
    
    for (int i = 1; i < n; i++) {
        if (i + z[i] == n) {
            return i;
        }
    }
    
    return n;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mb-2 mt-4">
          <strong>4.2 Contare i Prefissi Distinti:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Possiamo utilizzare l'array Z per contare il numero di sottostringhe distinte in una stringa in modo efficiente.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`int countDistinctSubstrings(string s) {
    int n = s.length();
    int count = 0;
    
    for (int i = 0; i < n; i++) {
        // Ogni posizione i può generare al massimo n-i sottostringhe distinte
        // Ma se Z[i] > 0, alcune di queste sottostringhe sono già state contate
        count += n - i;
        
        // Sottraiamo le sottostringhe duplicate
        for (int j = 1; j <= min(z[i], n - i); j++) {
            if (j > z[i - j]) {
                count--;
            }
        }
    }
    
    return count;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mb-2 mt-4">
          <strong>4.3 Longest Common Prefix (LCP):</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo Z può essere utilizzato per calcolare l'array LCP (Longest Common Prefix) per un insieme di stringhe, che è utile in molti problemi di stringhe.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`vector<int> calculateLCP(vector<string>& strings) {
    int n = strings.size();
    vector<int> lcp(n, 0);
    
    for (int i = 1; i < n; i++) {
        string combined = strings[0] + "$" + strings[i];
        vector<int> z = calculateZArray(combined);
        
        // Il LCP tra strings[0] e strings[i] è il valore Z alla posizione |strings[0]| + 1
        lcp[i] = z[strings[0].length() + 1];
    }
    
    return lcp;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4">
          Queste sono solo alcune delle molte applicazioni dell'algoritmo Z. La sua efficienza e versatilità lo rendono uno strumento potente per risolvere una vasta gamma di problemi di stringhe.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Confronto con Altri Algoritmi di Pattern Matching</h2>
        <p className="text-lg leading-relaxed mb-4">
          È utile confrontare l'algoritmo Z con altri algoritmi di pattern matching per comprendere meglio quando utilizzarlo:
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Algoritmo</th>
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Complessità Temporale</th>
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Complessità Spaziale</th>
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Vantaggi</th>
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Svantaggi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Z-Algorithm</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">O(n+m)</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">O(n+m)</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Semplice da implementare, versatile per vari problemi di stringhe</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Richiede la concatenazione di pattern e testo</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">KMP</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">O(n+m)</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">O(m)</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Non richiede concatenazione, buono per stream di dati</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Più complesso da implementare correttamente</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Rabin-Karp</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">O(n+m) in media, O(nm) nel caso peggiore</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">O(1)</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Buono per trovare più pattern contemporaneamente</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Possibilità di collisioni hash, caso peggiore O(nm)</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Suffix Array</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">O(n log n) per la costruzione, O(m log n) per la ricerca</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">O(n)</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Efficiente per ricerche multiple sullo stesso testo</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Costoso da costruire, richiede più memoria</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-lg leading-relaxed mt-4">
          L'algoritmo Z è particolarmente utile quando:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Hai bisogno di trovare tutte le occorrenze di un pattern in un testo</li>
          <li className="mb-1">Vuoi risolvere problemi che coinvolgono prefissi comuni</li>
          <li className="mb-1">Hai bisogno di un algoritmo semplice da implementare con garanzie di complessità lineare</li>
          <li className="mb-1">Stai lavorando con problemi che richiedono il calcolo di proprietà periodiche delle stringhe</li>
        </ul>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Problemi di Esempio</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-2"><a href="https://cses.fi/problemset/task/1733" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - Finding Patterns</a>: Un problema che richiede di trovare più pattern in un testo.</li>
          <li className="mb-2"><a href="https://codeforces.com/problemset/problem/432/D" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Prefixes and Suffixes</a>: Un problema che richiede di trovare tutte le sottostringhe che sono sia prefissi che suffissi.</li>
          <li className="mb-2"><a href="https://www.spoj.com/problems/PERIOD/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">SPOJ - Period</a>: Un problema che richiede di trovare i periodi di una stringa.</li>
          <li className="mb-2"><a href="https://codeforces.com/problemset/problem/126/B" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Password</a>: Un problema che richiede di trovare la sottostringa più lunga che appare sia come prefisso che come suffisso e anche altrove nella stringa.</li>
        </ul>
      </section>
    </div>
  );
};

export default ZAlgorithmPage;
