import React from 'react';

const SuffixArrayGoldPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Suffix Array e LCP Array (Livello Gold)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione al Suffix Array</h2>
        <p className="text-lg leading-relaxed mb-4">
          Un **Suffix Array** di una stringa `S` di lunghezza `N` è un array di interi che rappresenta le posizioni di inizio di tutti i suffissi di `S` ordinati lessicograficamente. In altre parole, `suffix_array[i]` è l'indice di inizio del `i`-esimo suffisso più piccolo di `S`.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Ad esempio, per la stringa `S = "banana$"` (il carattere `$` è un terminatore lessicograficamente più piccolo di qualsiasi altro carattere, usato per assicurare che nessun suffisso sia prefisso di un altro e per semplificare alcuni algoritmi):
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-2">
          <li>Suffissi:</li>
          <li className="ml-4">0: "banana$"</li>
          <li className="ml-4">1: "anana$"</li>
          <li className="ml-4">2: "nana$"</li>
          <li className="ml-4">3: "ana$"</li>
          <li className="ml-4">4: "na$"</li>
          <li className="ml-4">5: "a$"</li>
          <li className="ml-4">6: "$"</li>
        </ul>
        <p className="text-lg leading-relaxed mb-2">
          Suffissi ordinati:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="ml-4">"$" (indice 6)</li>
          <li className="ml-4">"a$" (indice 5)</li>
          <li className="ml-4">"ana$" (indice 3)</li>
          <li className="ml-4">"anana$" (indice 1)</li>
          <li className="ml-4">"banana$" (indice 0)</li>
          <li className="ml-4">"na$" (indice 4)</li>
          <li className="ml-4">"nana$" (indice 2)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Quindi, il Suffix Array per "banana$" è `[6, 5, 3, 1, 0, 4, 2]`.
          I Suffix Array sono una struttura dati fondamentale per molti problemi avanzati su stringhe.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Costruzione del Suffix Array</h2>
        <p className="text-lg leading-relaxed mb-4">
          La costruzione naive (generare tutti i suffissi e ordinarli) richiederebbe O(N<sup>2</sup> log N) o O(N<sup>2</sup>) con un buon algoritmo di ordinamento di stringhe. Esistono algoritmi più efficienti:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1"><strong>Algoritmo O(N log<sup>2</sup> N):</strong> Un approccio comune si basa sull'idea di raddoppiamento. Inizialmente, si ordinano i caratteri (suffissi di lunghezza 1). Poi si ordinano i suffissi basandosi sui primi 2 caratteri, poi sui primi 4, 8, e così via. Ogni fase di ordinamento usa i risultati della fase precedente.</li>
          <li className="mb-1"><strong>Algoritmo SA-IS (Suffix Array Induced Sorting) O(N):</strong> Un algoritmo più complesso ma lineare, spesso usato in pratica per la sua efficienza.</li>
          <li className="mb-1"><strong>Algoritmi basati su Suffix Tree O(N):</strong> Un Suffix Tree può essere costruito in O(N) e poi attraversato per ottenere il Suffix Array.</li>
        </ul>
        <p className="text-lg leading-relaxed mb-2">
          Qui descriveremo l'approccio O(N log<sup>2</sup> N) concettualmente, poiché è più semplice da capire.
        </p>
        <h3 className="text-2xl font-medium mt-4 mb-2">2.1 Algoritmo O(N log<sup>2</sup> N)</h3>
        <p className="text-lg leading-relaxed mb-2">
          1.  Aggiungi un carattere sentinella `$` alla fine della stringa `S` se non già presente.
          2.  <strong>Iterazione k=0:</strong> Assegna un rango (o classe di equivalenza) a ogni suffisso basato solo sul suo primo carattere. Il Suffix Array `sa` inizialmente contiene gli indici ordinati in base al primo carattere.
          3.  <strong>Iterazioni successive (k = 1, 2, ... log N):</strong>
              In ogni iterazione `k`, abbiamo i ranghi dei suffissi basati sui loro primi `2^k` caratteri. Vogliamo calcolare i ranghi basati sui primi `2^{k+1}` caratteri.
              Un suffisso che inizia a `i` e ha lunghezza `2^{k+1}` può essere visto come una coppia: `(rank(S[i...i+2^k-1]), rank(S[i+2^k...i+2^{k+1}-1]))`.
              Si ordinano i suffissi in base a queste coppie di ranghi. Questo ordinamento può essere fatto in O(N log N) o O(N) usando counting sort se i ranghi sono piccoli.
              L'array `sa` viene aggiornato con i nuovi indici ordinati. Si calcolano i nuovi ranghi.
          4.  L'algoritmo termina quando tutti i ranghi sono distinti o `2^k >= N`.
        </p>
        <p className="text-lg leading-relaxed">
          L'implementazione dettagliata è abbastanza coinvolta e richiede un'attenta gestione degli indici e delle classi di equivalenza.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Implementazione semplificata concettuale di O(N log^2 N) Suffix Array
// Una implementazione robusta è più complessa.
#include <string>
#include <vector>
#include <algorithm>
#include <iostream>

struct Suffix {
    int index; // Indice originale del suffisso in S
    int rank[2]; // Rango basato sui primi 2^k e secondi 2^k caratteri
};

// Funzione di confronto per ordinare i suffissi
int compareSuffixes(const struct Suffix& a, const struct Suffix& b) {
    if (a.rank[0] == b.rank[0]) {
        return (a.rank[1] < b.rank[1] ? 1 : 0);
    }
    return (a.rank[0] < b.rank[0] ? 1 : 0);
}

std::vector<int> buildSuffixArray_Nlog2N(const std::string& txt) {
    int n = txt.length();
    struct Suffix suffixes[n];

    // Inizializzazione: rank[0] è il carattere, rank[1] è il carattere successivo
    for (int i = 0; i < n; i++) {
        suffixes[i].index = i;
        suffixes[i].rank[0] = txt[i]; // Può essere txt[i] - 'a' per compressione
        suffixes[i].rank[1] = ((i + 1) < n) ? (txt[i + 1]) : -1; // -1 per fine stringa
    }

    // Ordina i suffissi inizialmente
    std::sort(suffixes, suffixes + n, [](const Suffix& a, const Suffix& b) {
        return compareSuffixes(a,b);
    });

    int ind[n]; // Per memorizzare l'indice del suffisso i-esimo nell'array suffixes dopo l'ordinamento

    // k raddoppia ad ogni iterazione (lunghezza del confronto)
    for (int k = 4; k < 2 * n; k = k * 2) {
        // Assegna il rango e l'indice del prossimo suffisso
        int rank_val = 0;
        int prev_rank = suffixes[0].rank[0];
        suffixes[0].rank[0] = rank_val;
        ind[suffixes[0].index] = 0;

        for (int i = 1; i < n; i++) {
            // Se i ranghi della coppia corrente e precedente sono diversi, assegna nuovo rango
            if (suffixes[i].rank[0] == prev_rank &&
                suffixes[i].rank[1] == suffixes[i-1].rank[1]) {
                // Stesso rango della precedente
                prev_rank = suffixes[i].rank[0];
                suffixes[i].rank[0] = rank_val;
            } else {
                // Nuovo rango
                prev_rank = suffixes[i].rank[0];
                suffixes[i].rank[0] = ++rank_val;
            }
            ind[suffixes[i].index] = i;
        }

        // Assegna il rango del secondo elemento della coppia
        for (int i = 0; i < n; i++) {
            int next_index = suffixes[i].index + k / 2;
            suffixes[i].rank[1] = (next_index < n) ? 
                                  suffixes[ind[next_index]].rank[0] : -1;
        }

        // Ordina di nuovo i suffissi
        std::sort(suffixes, suffixes + n, [](const Suffix& a, const Suffix& b) {
             return compareSuffixes(a,b);
        });
    }

    std::vector<int> suffixArr(n);
    for (int i = 0; i < n; i++) {
        suffixArr[i] = suffixes[i].index;
    }
    return suffixArr;
}

// Nota: L'implementazione sopra è una semplificazione e potrebbe non essere completamente corretta
// o efficiente come le versioni standard. Le implementazioni reali usano counting sort
// per ottenere O(N log N) e sono più intricate.
`}</code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. LCP Array (Longest Common Prefix)</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'**LCP Array** è un array ausiliario spesso usato insieme al Suffix Array. `lcp[i]` memorizza la lunghezza del più lungo prefisso comune (Longest Common Prefix) tra il suffisso `suffix_array[i]` e il suffisso `suffix_array[i-1]`.
          Per convenzione, `lcp[0]` è spesso indefinito o 0.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>Esempio:</strong> `S = "banana$"`, `sa = [6, 5, 3, 1, 0, 4, 2]`
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li>`lcp[0]`: - (o 0)</li>
          <li>`lcp[1]`: LCP("$", "a$") = 0</li>
          <li>`lcp[2]`: LCP("a$", "ana$") = 1 (prefisso "a")</li>
          <li>`lcp[3]`: LCP("ana$", "anana$") = 3 (prefisso "ana")</li>
          <li>`lcp[4]`: LCP("anana$", "banana$") = 0</li>
          <li>`lcp[5]`: LCP("banana$", "na$") = 0</li>
          <li>`lcp[6]`: LCP("na$", "nana$") = 2 (prefisso "na")</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Quindi, `lcp = [?, 0, 1, 3, 0, 0, 2]`.
        </p>
        <h3 className="text-2xl font-medium mt-4 mb-2">3.1 Costruzione dell'LCP Array (Algoritmo di Kasai)</h3>
        <p className="text-lg leading-relaxed mb-2">
          L'algoritmo di Kasai permette di costruire l'LCP array in tempo **O(N)**, dato il Suffix Array e la stringa originale.
          Richiede anche l'array `rank` (o `pos`), dove `rank[i]` è la posizione del suffisso che inizia a `i` nel Suffix Array ordinato (cioè, l'inverso del Suffix Array: se `sa[j] = i`, allora `rank[i] = j`).
        </p>
        <p className="text-lg leading-relaxed mb-2">
          L'idea chiave è che se il suffisso `S[i...]` ha un LCP di `h` con il suffisso che lo precede nel Suffix Array, allora il suffisso `S[i+1...]` avrà un LCP di almeno `h-1` con il suffisso che lo precede nel Suffix Array (dopo aver rimosso il primo carattere).
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Costruzione LCP Array con Algoritmo di Kasai (O(N))
std::vector<int> buildLCPArray(const std::string& txt, const std::vector<int>& suffixArr) {
    int n = txt.length();
    std::vector<int> lcp(n, 0);
    std::vector<int> rank(n, 0); // rank[i] = posizione del suffisso S[i...] in suffixArr

    for (int i = 0; i < n; i++) {
        rank[suffixArr[i]] = i;
    }

    int k = 0; // Lunghezza dell'LCP corrente
    for (int i = 0; i < n; i++) {
        if (rank[i] == n - 1) { // Ultimo suffisso nell'ordine, non ha un successivo
            k = 0;
            continue;
        }

        // j è l'indice del suffisso che segue S[i...] nell'ordine del Suffix Array
        int j = suffixArr[rank[i] + 1]; 

        // Calcola LCP tra S[i...] e S[j...]
        while (i + k < n && j + k < n && txt[i+k] == txt[j+k]) {
            k++;
        }
        lcp[rank[i] + 1] = k; // lcp[m] è LCP(sa[m-1], sa[m])

        if (k > 0) {
            k--; // Proprietà: LCP per il prossimo suffisso S[i+1...] sarà almeno k-1
        }
    }
    return lcp;
}
`}</code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Applicazioni di Suffix Array e LCP Array</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Ricerca di Pattern (String Matching):</strong> Un pattern `P` può essere cercato in `S` in O(M log N) o O(M + log N) tempo usando ricerca binaria sul Suffix Array.</li>
          <li className="mb-2"><strong>Sottostringa Comune Più Lunga (Longest Common Substring - LCS) di Due Stringhe:</strong> Concatena le due stringhe con un separatore unico (es. `S1 + "#" + S2 + "$"`), costruisci Suffix Array e LCP Array. L'LCS corrisponderà al massimo valore nell'LCP array tra suffissi che originano da stringhe diverse.</li>
          <li className="mb-2"><strong>Numero di Sottostringhe Distinte:</strong> La somma di `(N - sa[i]) - lcp[i]` per `i` da 0 a `N-1`. Ogni suffisso `S[sa[i]...]` introduce `(N - sa[i])` sottostringhe. Di queste, `lcp[i]` sono già state contate dal suffisso precedente nell'ordine.</li>
          <li className="mb-2"><strong>Sottostringa Ripetuta Più Lunga (Longest Repeated Substring):</strong> È semplicemente il massimo valore nell'LCP Array.</li>
          <li className="mb-2"><strong>Costruzione di Suffix Tree/Automaton:</strong> Suffix Array e LCP Array possono essere usati per costruire queste strutture più complesse.</li>
        </ul>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti a Concetti Prerequisiti e Successivi</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Prerequisito:</strong> Stringhe, algoritmi di ordinamento. Comprensione di base di prefissi e suffissi.</li>
          <li className="mb-2"><strong>Concetto Correlato:</strong> <a href="./string-hashing" className="text-blue-600 dark:text-blue-400 hover:underline">String Hashing</a>, <a href="./knuth-morris-pratt" className="text-blue-600 dark:text-blue-400 hover:underline">KMP</a> (altre tecniche per problemi su stringhe).</li>
          <li className="mb-2"><strong>Concetti Avanzati (Platinum):</strong> Suffix Tree, Suffix Automaton (strutture dati che offrono funzionalità simili o più potenti, spesso costruibili da/o con Suffix Array). Applicazioni complesse in bioinformatica e text processing.</li>
        </ul>
      </section>
    </div>
  );
};

export default SuffixArrayGoldPage;

