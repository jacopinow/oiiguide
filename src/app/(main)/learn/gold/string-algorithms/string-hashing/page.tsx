import React from 'react';

const StringHashingGoldPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">String Hashing (Livello Gold)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione allo String Hashing</h2>
        <p className="text-lg leading-relaxed mb-4">
          Lo **String Hashing** è una tecnica utilizzata per convertire una stringa in un numero intero (il suo "hash") in modo tale che stringhe diverse abbiano (idealmente) hash diversi. Questo permette di confrontare stringhe o sottostringhe in tempo O(1) (dopo un precalcolo O(N)), invece che in O(N) carattere per carattere.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          La tecnica più comune è il **Polynomial Rolling Hash**. Data una stringa `S = s_0s_1...s_{n-1}`, il suo hash è calcolato come:
          `hash(S) = (s_0 * p^0 + s_1 * p^1 + ... + s_{n-1} * p^{n-1}) mod m`
          o, più comunemente (per facilitare il calcolo del rolling hash per sottostringhe):
          `hash(S) = (s_0 * p^{n-1} + s_1 * p^{n-2} + ... + s_{n-1} * p^0) mod m`
        </p>
        <p className="text-lg leading-relaxed">
          Dove:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">`s_i` è il valore numerico del carattere `i`-esimo (es. `s_i - 'a' + 1`).</li>
          <li className="mb-1">`p` è una costante intera scelta (una base, solitamente un numero primo più grande della dimensione dell'alfabeto).</li>
          <li className="mb-1">`m` è un modulo grande (solitamente un numero primo grande) per evitare overflow e ridurre le collisioni.</li>
        </ul>
        <p className="text-lg leading-relaxed">
          <strong>Collisioni:</strong> È possibile (anche se raro con buone scelte di `p` e `m`) che due stringhe diverse abbiano lo stesso hash. Per ridurre la probabilità di collisione, si può usare il **double hashing** (due diverse coppie di `(p, m)`).
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Scelta di Base (p) e Modulo (m)</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Base `p`:</strong>
            <ul className="list-disc list-inside text-lg leading-relaxed ml-6 mt-1">
              <li>Deve essere maggiore della dimensione dell'alfabeto (es. > 26 per minuscole, > 52 per maiuscole/minuscole).</li>
              <li>Numeri primi comuni: 31, 37, 53. A volte si usano numeri primi più grandi come 131, 151, o numeri casuali (ma fissi per un'esecuzione).</li>
              <li>Evitare basi troppo piccole o troppo vicine a potenze di 2 se il modulo è una potenza di 2 (non comune).</li>
            </ul>
          </li>
          <li className="mb-2"><strong>Modulo `m`:</strong>
            <ul className="list-disc list-inside text-lg leading-relaxed ml-6 mt-1">
              <li>Un numero primo grande per minimizzare le collisioni. Esempi comuni: `10^9 + 7`, `10^9 + 9`, `10^9 + 21`, `10^9 + 33`.</li>
              <li>A volte si usa `2^{64}` implicitamente con `unsigned long long` in C++, ma questo può essere vulnerabile a test anti-hashing se la base `p` non è scelta con cura (deve essere dispari).</li>
              <li>Se si usa un solo hash, `m` dovrebbe essere il più grande possibile (vicino al limite del tipo di dato, es. `long long`).</li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Calcolo degli Hash (Prefissi e Sottostringhe)</h2>
        <p className="text-lg leading-relaxed mb-2">
          Usando la formula `hash(S) = (s_0 * p^{k-1} + s_1 * p^{k-2} + ... + s_{k-1} * p^0) mod m` per una stringa di lunghezza `k`.
        </p>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">3.1 Hash dei Prefissi</h3>
          <p className="text-lg leading-relaxed mb-2">
            Possiamo precalcolare l'hash di tutti i prefissi della stringa `S`.
            `hash_prefix[i] = hash(S[0...i])`.
            `hash_prefix[i] = (hash_prefix[i-1] * p + val(S[i])) mod m`.
            (Attenzione: questa è per la formula `s_0*p^i + s_1*p^{i-1} + ...`. Se si usa `s_0*p^0 + s_1*p^1 + ...`, la formula è `hash_prefix[i] = (hash_prefix[i-1] + val(S[i]) * p^i) mod m`).
            È più comune usare la prima forma per il rolling hash.
          </p>
          <p className="text-lg leading-relaxed mb-2">
            Per la formula `hash(S) = (s_0 * p^{k-1} + ... + s_{k-1} * p^0) mod m`:
            `h[i]` = hash del prefisso `S[0...i-1]` (lunghezza `i`).
            `h[0] = 0`
            `h[i+1] = (h[i] * p + val(S[i])) mod m`.
            Precalcoliamo anche le potenze di `p`: `p_pow[i] = p^i mod m`.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">3.2 Hash di una Sottostringa S[L...R]</h3>
          <p className="text-lg leading-relaxed mb-2">
            L'hash della sottostringa `S[L...R]` (0-indicizzata) può essere calcolato usando gli hash dei prefissi:
            `hash(S[L...R]) = (h[R+1] - h[L] * p_pow[R-L+1]) mod m`.
            Bisogna fare attenzione con il modulo per i numeri negativi: `(a - b) mod m = (a - b % m + m) % m`.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <string>
#include <vector>
#include <iostream>

long long P = 31; // Base
long long M = 1e9 + 7; // Modulo

const int MAX_LEN = 1000005;
long long p_pow[MAX_LEN];
long long inv_p_pow[MAX_LEN]; // Opzionale, per un'altra formula di sottostringa

long long power(long long base, long long exp) {
    long long res = 1;
    base %= M;
    while (exp > 0) {
        if (exp % 2 == 1) res = (res * base) % M;
        base = (base * base) % M;
        exp /= 2;
    }
    return res;
}

long long modInverse(long long n) {
    return power(n, M - 2); // M deve essere primo (Teorema di Fermat)
}

void precompute_powers(int max_n) {
  p_pow[0] = 1;
  // inv_p_pow[0] = 1; // Se si usa l'inverso
  // long long p_inv = modInverse(P); // Se si usa l'inverso
  for (int i = 1; i < max_n; ++i) {
    p_pow[i] = (p_pow[i - 1] * P) % M;
    // inv_p_pow[i] = (inv_p_pow[i-1] * p_inv) % M; // Se si usa l'inverso
  }
}

std::vector<long long> calculate_prefix_hashes(const std::string& s) {
  int n = s.length();
  std::vector<long long> h(n + 1, 0);
  for (int i = 0; i < n; ++i) {
    // Assumiamo caratteri 'a'-'z'. Per altri alfabeti, aggiustare il +1.
    // È importante che 'a' non sia 0 se p=0 è possibile, o se si vuole distinguere "a" da "aa" con p=1.
    // Usare s[i] - 'a' + 1 è una pratica comune.
    h[i+1] = (h[i] * P + (s[i] - 'a' + 1)) % M;
  }
  return h;
}

long long get_substring_hash(const std::vector<long long>& prefix_hashes, int L, int R) {
  // Hash di S[L...R] (0-indicizzato)
  // Lunghezza della sottostringa = R - L + 1
  int len = R - L + 1;
  long long hash_val = (prefix_hashes[R+1] - (prefix_hashes[L] * p_pow[len]) % M + M) % M;
  return hash_val;
}

// Esempio di utilizzo:
// int main() {
//   std::string text = "abacaba";
//   precompute_powers(text.length() + 1);
//   std::vector<long long> hashes = calculate_prefix_hashes(text);
// 
//   // Hash di "aba" (indici 0-2)
//   std::cout << "Hash di S[0..2] ('aba'): " << get_substring_hash(hashes, 0, 2) << std::endl;
//   // Hash di "bac" (indici 1-3)
//   std::cout << "Hash di S[1..3] ('bac'): " << get_substring_hash(hashes, 1, 3) << std::endl;
//   // Hash di "aba" (indici 4-6)
//   std::cout << "Hash di S[4..6] ('aba'): " << get_substring_hash(hashes, 4, 6) << std::endl;
//   // Dovrebbe dare lo stesso hash per S[0..2] e S[4..6]
//   return 0;
// }
`}</code></pre>
        </div>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Double Hashing</h2>
        <p className="text-lg leading-relaxed mb-4">
          Per ridurre ulteriormente la probabilità di collisioni (specialmente in contest con test anti-hashing), si può usare il double hashing. Si calcolano due hash diversi per ogni stringa/sottostringa usando due coppie distinte di `(p1, m1)` e `(p2, m2)`. Due stringhe sono considerate uguali solo se entrambe le loro coppie di hash sono uguali.
        </p>
        <p className="text-lg leading-relaxed">
          Questo aumenta leggermente le costanti di tempo (circa x2) ma rende le collisioni estremamente improbabili.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Applicazioni Comuni</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>String Matching (Rabin-Karp):</strong> Trovare occorrenze di un pattern `P` in un testo `T`. Si calcola l'hash di `P`, poi si fa scorrere una finestra della stessa lunghezza di `P` su `T`, calcolando l'hash della finestra in O(1) (rolling hash). Se gli hash combaciano, si verifica per sicurezza (o si confida nell'hash se la probabilità di collisione è bassa).</li>
          <li className="mb-2"><strong>Numero di Sottostringhe Distinte:</strong> Inserire gli hash di tutte le sottostringhe in un `std::set` e restituire la dimensione del set.</li>
          <li className="mb-2"><strong>Sottostringa Comune Più Lunga (LCS):</strong> Si può usare hashing e ricerca binaria sulla lunghezza della LCS. Per una data lunghezza `k`, si verifica se esiste una sottostringa di lunghezza `k` comune a entrambe le stringhe.</li>
          <li className="mb-2"><strong>Verifica di Palindromi:</strong> Una stringa `S` è un palindromo se `hash(S) == hash(reverse(S))`. L'hash di `reverse(S)` può essere calcolato precalcolando gli hash dei suffissi (o hash della stringa rovesciata).</li>
          <li className="mb-2"><strong>Periodo di una Stringa.</strong></li>
        </ul>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti a Concetti Prerequisiti e Successivi</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Prerequisito:</strong> Aritmetica modulare di base.</li>
          <li className="mb-2"><strong>Concetto Correlato:</strong> Algoritmo di Knuth-Morris-Pratt (KMP), Algoritmo di Z (altri algoritmi di string matching).</li>
          <li className="mb-2"><strong>Concetti Avanzati (Platinum):</strong> Suffix Array, Suffix Tree, Suffix Automaton (strutture dati più potenti per problemi su stringhe, ma più complesse). Hashing Polinomiale 2D (per pattern in griglie).</li>
        </ul>
      </section>
    </div>
  );
};

export default StringHashingGoldPage;

