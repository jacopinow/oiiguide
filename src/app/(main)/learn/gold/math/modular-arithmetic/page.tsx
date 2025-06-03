import React from 'react';

const ModularArithmeticGoldPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Aritmetica Modulare (Livello Gold)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Richiami e Concetti Fondamentali</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'aritmetica modulare, introdotta a livello Silver, diventa uno strumento ancora più potente e versatile a livello Gold. Si esplorano concetti come l'inverso moltiplicativo modulare, la risoluzione di congruenze lineari, il Teorema di Eulero e il Piccolo Teorema di Fermat, e le loro applicazioni in problemi complessi di conteggio e teoria dei numeri.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Ricordiamo che `a ≡ b (mod m)` significa che `m` divide `(a - b)`, ovvero `a` e `b` hanno lo stesso resto quando divisi per `m`. Le operazioni base (addizione, sottrazione, moltiplicazione) modulo `m` sono state trattate nel Silver. A livello Gold, la divisione modulare (tramite inverso moltiplicativo) diventa cruciale.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Inverso Moltiplicativo Modulare</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'**inverso moltiplicativo modulare** di un intero `a` modulo `m` è un intero `x` tale che `(a * x) ≡ 1 (mod m)`. Si denota spesso come `a^{-1} (mod m)`.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          L'inverso esiste se e solo se `gcd(a, m) = 1` (cioè, `a` e `m` sono coprimi).
        </p>
        <p className="text-lg leading-relaxed mb-2">
          Ci sono due metodi principali per calcolare l'inverso moltiplicativo:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Algoritmo di Euclide Esteso:</strong> Se `gcd(a, m) = 1`, l'algoritmo di Euclide esteso trova interi `x` e `y` tali che `ax + my = gcd(a, m) = 1`. Prendendo questa equazione modulo `m`, otteniamo `ax ≡ 1 (mod m)`. Quindi, `x` (o `x mod m` se `x` è negativo o maggiore di `m`) è l'inverso di `a` modulo `m`.</li>
          <li className="mb-2"><strong>Piccolo Teorema di Fermat / Teorema di Eulero:</strong>
            <ul className="list-disc list-inside text-lg leading-relaxed ml-6 mt-1">
              <li>Se `m` è un numero primo e `a` non è divisibile per `m`, allora per il Piccolo Teorema di Fermat, `a^{m-1} ≡ 1 (mod m)`. Quindi, `a * a^{m-2} ≡ 1 (mod m)`, e l'inverso è `a^{m-2} (mod m)`.</li>
              <li>Più in generale, se `gcd(a, m) = 1`, per il Teorema di Eulero, `a^{φ(m)} ≡ 1 (mod m)`, dove `φ(m)` è la funzione totiente di Eulero. L'inverso è `a^{φ(m)-1} (mod m)`.</li>
            </ul>
            Questo metodo richiede il calcolo di `φ(m)` (se `m` non è primo) e l'esponenziazione modulare.
          </li>
        </ul>

        <h3 className="text-2xl font-semibold mt-4 mb-2">2.1 Algoritmo di Euclide Esteso</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>

// Funzione per calcolare gcd(a, b) e i coefficienti x, y tali che ax + by = gcd(a, b)
long long extended_gcd(long long a, long long b, long long &x, long long &y) {
  if (a == 0) {
    x = 0;
    y = 1;
    return b;
  }
  long long x1, y1;
  long long gcd_val = extended_gcd(b % a, a, x1, y1);
  x = y1 - (b / a) * x1;
  y = x1;
  return gcd_val;
}

// Funzione per calcolare l'inverso moltiplicativo modulare di a modulo m
long long mod_inverse_extended_gcd(long long a, long long m) {
  long long x, y;
  long long g = extended_gcd(a, m, x, y);
  if (g != 1) {
    // L'inverso non esiste
    // std::cerr << "L'inverso moltiplicativo non esiste." << std::endl;
    return -1; // O lancia un'eccezione
  }
  // x potrebbe essere negativo, lo portiamo nell'intervallo [0, m-1]
  return (x % m + m) % m;
}

int main() {
  long long a = 7, m = 26;
  long long inv = mod_inverse_extended_gcd(a, m);
  if (inv != -1) {
    std::cout << "L'inverso di " << a << " modulo " << m << " e	res: " << inv << std::endl; // 7 * 15 = 105. 105 mod 26 = 1.
  }
  // Output: L'inverso di 7 modulo 26 e' 15
  return 0;
}`} 
        </code></pre>

        <h3 className="text-2xl font-semibold mt-4 mb-2">2.2 Inverso con Esponenziazione Modulare (per modulo primo)</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Funzione per l'esponenziazione modulare (già vista)
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

// Funzione per calcolare l'inverso moltiplicativo modulare di a modulo m (m DEVE essere primo)
long long mod_inverse_fermat(long long a, long long m_prime) {
  if (m_prime <= 1) return -1; // Modulo non valido
  // gcd(a, m_prime) deve essere 1, il che è vero se m_prime è primo e a non è multiplo di m_prime
  if (a % m_prime == 0) return -1; // Inverso non esiste
  return power(a, m_prime - 2, m_prime);
}

// main per testare mod_inverse_fermat:
// long long a_f = 3, m_f = 11; // 11 è primo
// long long inv_f = mod_inverse_fermat(a_f, m_f);
// std::cout << "L'inverso di " << a_f << " modulo " << m_f << " e	res: " << inv_f << std::endl; // 3 * 4 = 12. 12 mod 11 = 1.
// Output: L'inverso di 3 modulo 11 e' 4`}
        </code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Risoluzione di Congruenze Lineari</h2>
        <p className="text-lg leading-relaxed mb-4">
          Una congruenza lineare è un'equazione della forma `ax ≡ b (mod m)`.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Se `gcd(a, m) = 1`, allora l'inverso `a^{-1}` esiste, e possiamo moltiplicare entrambi i membri per `a^{-1}`:
          `a^{-1} * ax ≡ a^{-1} * b (mod m)`
          `x ≡ a^{-1} * b (mod m)`
          Questa è una soluzione unica modulo `m`.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Se `g = gcd(a, m)` non è 1, la congruenza ha soluzioni se e solo se `g` divide `b`. Se `g | b`, allora ci sono `g` soluzioni incongruenti modulo `m`. Per trovarle, si può dividere l'intera congruenza (inclusi `a`, `b`, e `m`) per `g`:
          `(a/g)x ≡ (b/g) (mod m/g)`
          Ora, `gcd(a/g, m/g) = 1`, quindi possiamo risolvere questa nuova congruenza per `x_0`. Le `g` soluzioni della congruenza originale sono `x_0, x_0 + m/g, x_0 + 2m/g, ..., x_0 + (g-1)m/g` (tutte modulo `m`).
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Teorema Cinese del Resto (CRT) - Introduzione</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il Teorema Cinese del Resto (CRT) fornisce un modo per risolvere un sistema di congruenze lineari simultanee, ognuna con un modulo diverso, a condizione che i moduli siano a due a due coprimi.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Sistema di congruenze:
          `x ≡ a_1 (mod m_1)`
          `x ≡ a_2 (mod m_2)`
          `...`
          `x ≡ a_k (mod m_k)`
          dove `m_1, m_2, ..., m_k` sono a due a due coprimi.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il CRT afferma che esiste una soluzione unica modulo `M = m_1 * m_2 * ... * m_k`.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>Metodo Costruttivo (per due congruenze):</strong>
          Date `x ≡ a_1 (mod m_1)` e `x ≡ a_2 (mod m_2)`.
          Dalla prima, `x = a_1 + k_1 * m_1` per qualche intero `k_1`.
          Sostituendo nella seconda: `a_1 + k_1 * m_1 ≡ a_2 (mod m_2)`.
          `k_1 * m_1 ≡ a_2 - a_1 (mod m_2)`.
          Questa è una congruenza lineare in `k_1`. Possiamo risolverla per `k_1` se `gcd(m_1, m_2) = 1` (che è dato). Sia `k_1_0` una soluzione.
          Allora `k_1 = k_1_0 + j * m_2` per qualche intero `j`.
          Sostituendo `k_1` in `x = a_1 + k_1 * m_1`, otteniamo `x = a_1 + (k_1_0 + j * m_2) * m_1 = (a_1 + k_1_0 * m_1) + j * (m_1 * m_2)`. 
          Quindi, `x ≡ a_1 + k_1_0 * m_1 (mod m_1 * m_2)`.
        </p>
        <p className="text-lg leading-relaxed mt-2">
          Per più di due congruenze, si può applicare questo metodo iterativamente, combinando le prime due, poi il risultato con la terza, e così via. L'implementazione completa del CRT è spesso un argomento più avanzato, ma l'idea base è importante a livello Gold.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Applicazioni in Problemi Competitivi</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Calcolo di Coefficienti Binomiali Modulo m:</strong> Se `m` è primo, `C(n, k) = n! / (k! * (n-k)!) mod m`. Richiede il calcolo di fattoriali e i loro inversi modulari. Se `m` non è primo ma è una potenza di un primo, o un prodotto di primi distinti, si possono usare tecniche più avanzate (Teorema di Lucas, CRT).</li>
          <li className="mb-2"><strong>Problemi di Conteggio con Risultati Grandi:</strong> Quando il numero di modi per fare qualcosa è enorme, spesso si chiede il risultato modulo un numero grande (es. 10<sup>9</sup> + 7, che è primo). Tutte le operazioni intermedie devono essere fatte modulo `m`.</li>
          <li className="mb-2"><strong>Geometria Combinatoria Modulare:</strong> Contare punti su una griglia che soddisfano certe condizioni modulo `m`.</li>
          <li className="mb-2"><strong>Hashing Polinomiale:</strong> L'aritmetica modulare è usata per mantenere gli hash entro limiti gestibili e ridurre le collisioni.</li>
          <li className="mb-2"><strong>Risolvere problemi che si riducono a sistemi di congruenze.</strong></li>
        </ul>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti a Concetti Prerequisiti e Successivi</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Prerequisito:</strong> <a href="../number-theory-silver" className="text-blue-600 dark:text-blue-400 hover:underline">Teoria dei Numeri (Silver)</a> (MCD, aritmetica modulare base).</li>
          <li className="mb-2"><strong>Prerequisito:</strong> <a href="./divisibility" className="text-blue-600 dark:text-blue-400 hover:underline">Divisibilità (Gold)</a> (Funzione Phi di Eulero, Teorema di Eulero).</li>
          <li className="mb-2"><strong>Concetto Correlato:</strong> <a href="../combinatorics" className="text-blue-600 dark:text-blue-400 hover:underline">Combinatoria (Gold)</a> (molti problemi di conteggio richiedono risultati modulo m).</li>
          <li className="mb-2"><strong>Concetti Avanzati (Platinum):</strong> Teorema Cinese del Resto generalizzato (moduli non coprimi), Teorema di Lucas, radici primitive, logaritmi discreti.</li>
        </ul>
      </section>
    </div>
  );
};

export default ModularArithmeticGoldPage;

