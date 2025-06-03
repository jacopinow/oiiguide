import React from 'react';

const CombinatoricsGoldPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Combinatoria (Livello Gold)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione alla Combinatoria Avanzata</h2>
        <p className="text-lg leading-relaxed mb-4">
          La combinatoria è l'arte di contare. A livello Gold, si va oltre le permutazioni e combinazioni di base, esplorando tecniche più sofisticate per contare configurazioni complesse. Argomenti come i coefficienti binomiali modulo un primo, il principio di inclusione-esclusione, le funzioni generatrici (introduzione) e le partizioni di interi diventano rilevanti.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Molti problemi di programmazione competitiva, specialmente quelli che chiedono "in quanti modi...", si basano su principi combinatori. Spesso, la soluzione diretta è troppo lenta (es. enumerare tutte le possibilità), quindi è necessario trovare una formula o un approccio di conteggio più intelligente.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Coefficienti Binomiali (N choose K)</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il coefficiente binomiale `C(n, k)` o `nCk` (leggi "n scegli k") rappresenta il numero di modi per scegliere `k` elementi da un insieme di `n` elementi distinti, senza considerare l'ordine.
          `C(n, k) = n! / (k! * (n-k)!)`.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Proprietà importanti:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">`C(n, k) = C(n, n-k)` (simmetria)</li>
          <li className="mb-1">`C(n, 0) = C(n, n) = 1`</li>
          <li className="mb-1">`C(n, k) = C(n-1, k-1) + C(n-1, k)` (Identità di Pascal, base per il Triangolo di Tartaglia e DP)</li>
        </ul>

        <h3 className="text-2xl font-semibold mt-4 mb-2">2.1 Calcolo di C(n, k) Modulo un Primo `p`</h3>
        <p className="text-lg leading-relaxed mb-2">
          Quando `n` e `k` sono grandi, `n!` può diventare enorme. Se il problema chiede il risultato modulo un primo `p`, possiamo usare la formula `C(n, k) = n! * (k!)^(-1) * ((n-k)!)^(-1) (mod p)`.
          Questo richiede il calcolo dei fattoriali modulo `p` e degli inversi moltiplicativi modulari di `k!` e `(n-k)!` modulo `p`.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>

// Funzione per l'esponenziazione modulare
long long power(long long base, long long exp, long long mod) {
  long long res = 1;
  base %= mod;
  while (exp > 0) {
    if (exp % 2 == 1) res = (res * base) % mod;
    base = (base * base) % mod;
    exp /= 2;
  }
  return res;
}

// Funzione per calcolare l'inverso moltiplicativo modulare (m DEVE essere primo)
long long mod_inverse(long long n, long long mod_prime) {
  return power(n, mod_prime - 2, mod_prime);
}

// Funzione per calcolare C(n, k) mod p (p DEVE essere primo)
// Precalcola i fattoriali se si devono fare molte query
long long nCr_mod_p(int n, int r, long long p, const std::vector<long long>& fact, const std::vector<long long>& invFact) {
  if (r < 0 || r > n) return 0;
  // C(n,r) = n! / (r! * (n-r)!)
  // C(n,r) = fact[n] * invFact[r] * invFact[n-r] % p
  return (((fact[n] * invFact[r]) % p) * invFact[n - r]) % p;
}

const int MAXN_COMB = 200005; // Massimo valore di N per cui precalcolare
long long P_COMB; // Modulo primo
std::vector<long long> fact(MAXN_COMB);
std::vector<long long> invFact(MAXN_COMB);

void precompute_factorials(long long p_val) {
  P_COMB = p_val;
  fact[0] = 1;
  invFact[0] = 1;
  for (int i = 1; i < MAXN_COMB; i++) {
    fact[i] = (fact[i - 1] * i) % P_COMB;
    invFact[i] = mod_inverse(fact[i], P_COMB);
  }
}

// Esempio di utilizzo:
// int main() {
//   long long prime_mod = 1e9 + 7;
//   precompute_factorials(prime_mod);
//   std::cout << "C(10, 3) mod " << prime_mod << " = " << nCr_mod_p(10, 3, prime_mod, fact, invFact) << std::endl; // 120
//   std::cout << "C(5, 2) mod " << prime_mod << " = " << nCr_mod_p(5, 2, prime_mod, fact, invFact) << std::endl;   // 10
//   return 0;
// }`}</code></pre>
        <p className="text-lg leading-relaxed mt-2">
          <strong>Nota:</strong> Questo metodo funziona se `p` è un primo maggiore di `n`. Se `p <= n`, allora `p` potrebbe apparire nel denominatore `k!` o `(n-k)!`, e il suo inverso modulo `p` non esisterebbe. In tal caso, si usa il **Teorema di Lucas** (generalmente argomento Platinum).
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Principio di Inclusione-Esclusione</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il Principio di Inclusione-Esclusione (PIE) è una tecnica di conteggio che permette di trovare la cardinalità dell'unione di più insiemi.
          Per due insiemi: `|A ∪ B| = |A| + |B| - |A ∩ B|`.
          Per tre insiemi: `|A ∪ B ∪ C| = |A| + |B| + |C| - (|A ∩ B| + |A ∩ C| + |B ∩ C|) + |A ∩ B ∩ C|`.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In generale, per `n` insiemi `A_1, ..., A_n`:
          `|∪_{i=1}^{n} A_i| = Σ|A_i| - Σ|A_i ∩ A_j| + Σ|A_i ∩ A_j ∩ A_k| - ... + (-1)^{n-1} |A_1 ∩ ... ∩ A_n|`.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Spesso, si usa il PIE per contare oggetti che soddisfano *almeno una* di certe proprietà, o, più comunemente, per contare oggetti che *non soddisfano nessuna* di certe proprietà (usando la forma complementare: `|Universo| - |Oggetti con almeno una proprietà|`).
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>Esempio: Numero di interi fino a N non divisibili per p1, p2, p3 (primi distinti).</strong>
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Sia `S` l'insieme degli interi da 1 a `N`. `|S| = N`.</li>
          <li className="mb-1">Sia `A_1` l'insieme dei multipli di `p1` in `S`. `|A_1| = floor(N/p1)`.</li>
          <li className="mb-1">Sia `A_2` l'insieme dei multipli di `p2` in `S`. `|A_2| = floor(N/p2)`.</li>
          <li className="mb-1">Sia `A_3` l'insieme dei multipli di `p3` in `S`. `|A_3| = floor(N/p3)`.</li>
          <li className="mb-1">`|A_1 ∩ A_2|` = multipli di `p1*p2` = `floor(N/(p1*p2))`. Similmente per le altre coppie.</li>
          <li className="mb-1">`|A_1 ∩ A_2 ∩ A_3|` = multipli di `p1*p2*p3` = `floor(N/(p1*p2*p3))`.</li>
          <li className="mb-1">Numero di interi divisibili per almeno uno: `|A_1|+|A_2|+|A_3| - (|A_1∩A_2|+|A_1∩A_3|+|A_2∩A_3|) + |A_1∩A_2∩A_3|`.</li>
          <li className="mb-1">Numero di interi non divisibili per nessuno: `N - (risultato del punto precedente)`.</li>
        </ol>
        <p className="text-lg leading-relaxed">
          Il PIE può essere implementato iterando su tutti i sottoinsiemi delle proprietà. Se ci sono `k` proprietà, ci sono `2^k` termini da considerare. Questo è fattibile se `k` è piccolo (es. fino a 20-25).
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Conteggio con DP (Programmazione Dinamica)</h2>
        <p className="text-lg leading-relaxed mb-4">
          Molti problemi di conteggio possono essere risolti usando la programmazione dinamica. Lo stato della DP spesso rappresenta una configurazione parziale, e il valore è il numero di modi per raggiungere quello stato o completare la configurazione da quello stato.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Esempio: Numero di modi per ottenere una somma `S` usando `k` dadi a `F` facce.</strong>
          `dp[i][j]` = numero di modi per ottenere somma `j` usando `i` dadi.
          Transizione: `dp[i][j] = Σ_{f=1}^{F} dp[i-1][j-f]` (se `j-f >= 0`).
          Caso base: `dp[0][0] = 1`.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          A livello Gold, le DP di conteggio possono diventare più complesse, coinvolgendo bitmask, DP su alberi, o DP su stringhe/sequenze con vincoli specifici.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Altri Concetti Combinatori Rilevanti</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Numeri di Catalan:</strong> Appaiono in molti problemi di conteggio, come il numero di alberi binari ben formati, cammini di Dyck, triangolazioni di poligoni, ecc. `C_n = (1/(n+1)) * C(2n, n)`.</li>
          <li className="mb-2"><strong>Partizioni di Interi:</strong> Numero di modi per scrivere un intero `n` come somma di interi positivi. Può essere risolto con DP. `p(n, k)` = numero di partizioni di `n` in `k` parti, o in parti la cui massima è `k`.</li>
          <li className="mb-2"><strong>Permutazioni con Ripetizioni:</strong> Se ci sono `n` oggetti con `n_1` del tipo 1, `n_2` del tipo 2, ..., `n_k` del tipo k (dove `Σ n_i = n`), il numero di permutazioni distinte è `n! / (n_1! * n_2! * ... * n_k!)`.</li>
          <li className="mb-2"><strong>Conteggio di Cammini su Griglie:</strong> Spesso si riduce a `C(righe+colonne, righe)` se si possono fare solo movimenti in due direzioni (es. destra e giù).</li>
          <li className="mb-2"><strong>Funzioni Generatrici (Introduzione):</strong> Un potente strumento per risolvere problemi di conteggio, specialmente quelli con ricorsioni lineari o partizioni. Una funzione generatrice `A(x) = Σ a_n x^n` codifica una sequenza `a_n`. Le operazioni su queste funzioni (somma, prodotto) corrispondono a operazioni combinatorie sulle sequenze. (Generalmente più avanzato, ma l'idea può apparire).</li>
        </ul>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti a Concetti Prerequisiti e Successivi</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Prerequisito:</strong> Combinatoria di base (permutazioni, combinazioni semplici).</li>
          <li className="mb-2"><strong>Concetto Correlato:</strong> <a href="../modular-arithmetic" className="text-blue-600 dark:text-blue-400 hover:underline">Aritmetica Modulare (Gold)</a> (per calcolare risultati modulo `m`).</li>
          <li className="mb-2"><strong>Concetto Correlato:</strong> <a href="../divisibility" className="text-blue-600 dark:text-blue-400 hover:underline">Divisibilità (Gold)</a> (per problemi che coinvolgono proprietà dei divisori nel conteggio).</li>
          <li className="mb-2"><strong>Concetto Correlato:</strong> Programmazione Dinamica (molti problemi di conteggio si risolvono con DP).</li>
          <li className="mb-2"><strong>Concetti Avanzati (Platinum):</strong> Teorema di Lucas, Funzioni Generatrici avanzate, Inversione di Mobius per conteggio, Burnside's Lemma / Teorema di Polya.</li>
        </ul>
      </section>
    </div>
  );
};

export default CombinatoricsGoldPage;

