import React from 'react';

const KMPGoldPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Algoritmo di Knuth-Morris-Pratt (KMP) (Livello Gold)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione all'Algoritmo KMP</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo di Knuth-Morris-Pratt (KMP) è un efficiente algoritmo di string matching che cerca le occorrenze di un "pattern" (o "parola chiave") `P` all'interno di un "testo" `T`. La sua efficienza deriva dal precalcolo di informazioni sul pattern stesso, che permettono di evitare confronti ridondanti durante la ricerca nel testo.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          A differenza dell'approccio naive (che può richiedere O(N*M) tempo, dove N è la lunghezza del testo e M quella del pattern), KMP ha una complessità temporale di **O(N + M)**.
        </p>
        <p className="text-lg leading-relaxed">
          L'idea chiave di KMP è che quando si verifica un mismatch tra il pattern e il testo, le informazioni sui prefissi del pattern che sono anche suoi suffissi possono essere usate per "spostare" il pattern in avanti nel testo in modo intelligente, senza dover ricominciare il confronto dall'inizio del pattern.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. La Funzione Prefisso (LPS Array)</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il cuore dell'algoritmo KMP è la costruzione di un array ausiliario chiamato **LPS (Longest Proper Prefix Suffix)** array, a volte noto come "pi function" o "failure function". Per un pattern `P` di lunghezza `M`, `lps[i]` è la lunghezza del più lungo prefisso proprio di `P[0...i]` che è anche un suffisso di `P[0...i]`.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          Un "prefisso proprio" di una stringa è un prefisso che non è la stringa intera. Un "suffisso proprio" è un suffisso che non è la stringa intera.
          Per `lps[i]`, consideriamo il prefisso `P[0...i]`. Cerchiamo il più lungo `P[0...k-1]` (con `k < i+1`) che sia uguale a `P[i-k+1...i]`. `lps[i]` sarà `k`.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>Esempio:</strong> Pattern `P = "ababa"`
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li>`lps[0]` (per `P[0] = "a"`): 0 (nessun prefisso proprio)</li>
          <li>`lps[1]` (per `P[0..1] = "ab"`): 0 (prefissi propri: "a"; suffissi propri: "b")</li>
          <li>`lps[2]` (per `P[0..2] = "aba"`): 1 (prefisso "a" == suffisso "a")</li>
          <li>`lps[3]` (per `P[0..3] = "abab"`): 2 (prefisso "ab" == suffisso "ab")</li>
          <li>`lps[4]` (per `P[0..4] = "ababa"`): 3 (prefisso "aba" == suffisso "aba")</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Quindi, `lps = [0, 0, 1, 2, 3]`.
        </p>

        <h3 className="text-2xl font-medium mt-4 mb-2">2.1 Calcolo dell'LPS Array</h3>
        <p className="text-lg leading-relaxed mb-2">
          L'array LPS può essere calcolato in tempo O(M) usando un approccio simile alla ricerca KMP stessa.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <vector>
#include <string>
#include <iostream>

// Calcola l'array LPS per il pattern P
std::vector<int> compute_lps_array(const std::string& pattern) {
  int m = pattern.length();
  std::vector<int> lps(m, 0);
  int length = 0; // Lunghezza del precedente longest prefix suffix
  int i = 1;

  // lps[0] è sempre 0, quindi partiamo da i = 1
  while (i < m) {
    if (pattern[i] == pattern[length]) {
      length++;
      lps[i] = length;
      i++;
    } else { // pattern[i] != pattern[length]
      if (length != 0) {
        // Questo è il trucco: non incrementare i ancora.
        // Invece, proviamo il prossimo longest prefix suffix più corto,
        // che è lps[length-1].
        length = lps[length - 1];
      } else { // Se length è 0, non c'è un prefisso-suffisso più corto
        lps[i] = 0;
        i++;
      }
    }
  }
  return lps;
}

// Esempio di utilizzo per LPS:
// int main() {
//   std::string p = "ababa";
//   std::vector<int> lps_p = compute_lps_array(p);
//   std::cout << "LPS array for '" << p << "': ";
//   for (int val : lps_p) std::cout << val << " "; // Output: 0 0 1 2 3
//   std::cout << std::endl;
// 
//   std::string p2 = "aaabaaa";
//   std::vector<int> lps_p2 = compute_lps_array(p2);
//   std::cout << "LPS array for '" << p2 << "': ";
//   for (int val : lps_p2) std::cout << val << " "; // Output: 0 1 2 0 1 2 3
//   std::cout << std::endl;
//   return 0;
// }`}</code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. L'Algoritmo di Ricerca KMP</h2>
        <p className="text-lg leading-relaxed mb-4">
          Una volta calcolato l'array LPS per il pattern `P`, si può procedere con la ricerca nel testo `T`.
          Si usano due puntatori: `i` per il testo `T` e `j` per il pattern `P`.
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Inizializza `i = 0` (indice per `T`) e `j = 0` (indice per `P`).</li>
          <li className="mb-1">Mentre `i < N` (lunghezza di `T`):
            <ol type="a" className="list-inside text-lg leading-relaxed ml-6 mt-1">
              <li className="mb-1">Se `T[i] == P[j]`:
                Incrementa `i` e `j`.
                Se `j == M` (lunghezza di `P`), allora è stata trovata un'occorrenza del pattern che termina all'indice `i-1` del testo. Registra l'occorrenza (es. `i-j`). Per trovare altre occorrenze, si "sposta" il pattern usando `j = lps[j-1]` (come se ci fosse stato un mismatch dopo un match completo).
              </li>
              <li className="mb-1">Se `T[i] != P[j]`:
                <ul className="list-disc list-inside text-lg leading-relaxed ml-8 mt-1">
                  <li>Se `j != 0`, significa che c'era un match parziale. Invece di ricominciare `j` da 0, usiamo l'LPS array: `j = lps[j-1]`. Questo sposta il pattern in modo che il più lungo prefisso di `P` che è anche un suffisso del match parziale corrente sia allineato con la porzione del testo appena confrontata. Non incrementare `i`.</li>
                  <li>Se `j == 0`, significa che non c'è stato nemmeno un match del primo carattere. Incrementa `i` per passare al prossimo carattere del testo.</li>
                </ul>
              </li>
            </ol>
          </li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Funzione di ricerca KMP
void kmp_search(const std::string& text, const std::string& pattern) {
  int n = text.length();
  int m = pattern.length();
  if (m == 0) return; // Pattern vuoto
  if (m > n) return; // Pattern più lungo del testo

  std::vector<int> lps = compute_lps_array(pattern);

  int i = 0; // Indice per text[]
  int j = 0; // Indice per pattern[]
  std::vector<int> occurrences;

  while (i < n) {
    if (pattern[j] == text[i]) {
      i++;
      j++;
    }

    if (j == m) {
      // Trovata un'occorrenza all'indice i - j
      occurrences.push_back(i - j);
      // Per continuare la ricerca, spostiamo il pattern
      j = lps[j - 1];
    } else if (i < n && pattern[j] != text[i]) {
      // Mismatch dopo j match
      // Non fare match lps[0...lps[j-1]] caratteri, essi combaceranno comunque.
      if (j != 0) {
        j = lps[j - 1];
      } else {
        i = i + 1;
      }
    }
  }
  
  // Stampa le occorrenze (opzionale)
  if (!occurrences.empty()) {
    std::cout << "Pattern '" << pattern << "' trovato agli indici: ";
    for (size_t k = 0; k < occurrences.size(); ++k) {
        std::cout << occurrences[k] << (k == occurrences.size() - 1 ? "" : ", ");
    }
    std::cout << std::endl;
  } else {
    std::cout << "Pattern '" << pattern << "' non trovato nel testo." << std::endl;
  }
}

// Esempio di utilizzo KMP Search:
// int main() {
//   std::string txt = "ABABDABACDABABCABAB";
//   std::string pat = "ABABCABAB";
//   kmp_search(txt, pat); // Output: Pattern 'ABABCABAB' trovato agli indici: 10
// 
//   std::string txt2 = "AAAAABAAABA";
//   std::string pat2 = "AAAA";
//   kmp_search(txt2, pat2); // Output: Pattern 'AAAA' trovato agli indici: 0, 1, 7
// 
//   std::string txt3 = "THIS IS A TEST TEXT";
//   std::string pat3 = "TEST";
//   kmp_search(txt3, pat3); // Output: Pattern 'TEST' trovato agli indici: 10
//   return 0;
// }`}</code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Complessità</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1"><strong>Calcolo dell'LPS Array:</strong> O(M), dove M è la lunghezza del pattern.</li>
          <li className="mb-1"><strong>Ricerca KMP:</strong> O(N), dove N è la lunghezza del testo. L'indice `i` (per il testo) non torna mai indietro. L'indice `j` (per il pattern) può diminuire, ma il numero totale di decrementi di `j` non può superare il numero di incrementi (che è al massimo N).</li>
          <li className="mb-1"><strong>Complessità Totale:</strong> O(N + M).</li>
          <li className="mb-1"><strong>Spazio:</strong> O(M) per l'LPS array.</li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Applicazioni</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>String Matching Veloce:</strong> L'applicazione principale.</li>
          <li className="mb-2"><strong>Trovare il Periodo di una Stringa:</strong> Se `n` è la lunghezza della stringa `S`, e `len = lps[n-1]`, allora se `n % (n - len) == 0`, il periodo più breve è `n - len`. Altrimenti, il periodo è `n`.</li>
          <li className="mb-2"><strong>Numero di Occorrenze di Ogni Prefisso come Sottostringa.</strong></li>
          <li className="mb-2"><strong>Costruzione di Automi a Stati Finiti per il matching di pattern.</strong></li>
        </ul>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti a Concetti Prerequisiti e Successivi</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Prerequisito:</strong> Familiarità con stringhe e array.</li>
          <li className="mb-2"><strong>Concetto Correlato:</strong> <a href="./string-hashing" className="text-blue-600 dark:text-blue-400 hover:underline">String Hashing</a> (un altro metodo per string matching, spesso più semplice da implementare ma con possibilità di collisioni).</li>
          <li className="mb-2"><strong>Concetto Correlato:</strong> Algoritmo Z (simile a KMP, calcola `Z[i]` = lunghezza del più lungo prefisso di S che matcha S[i...]).</li>
          <li className="mb-2"><strong>Concetti Avanzati (Platinum):</strong> Suffix Array, Suffix Tree, Suffix Automaton (per problemi su stringhe più complessi). Aho-Corasick (per il matching di pattern multipli).</li>
        </ul>
      </section>
    </div>
  );
};

export default KMPGoldPage;

