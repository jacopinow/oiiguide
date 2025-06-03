import React from 'react';

const DivisibilityGoldPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Divisibilità (Livello Gold)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Richiami e Concetti Fondamentali</h2>
        <p className="text-lg leading-relaxed mb-4">
          A livello Gold, la comprensione della divisibilità va oltre i concetti base visti nel Silver. Si approfondiscono le proprietà dei divisori, le funzioni legate alla teoria dei numeri e le loro applicazioni in algoritmi più complessi.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Ricordiamo che un intero `a` è divisibile per un intero `b` (scritto `b | a`) se `a = kb` per qualche intero `k`. Le nozioni di numeri primi, fattorizzazione prima, MCD (Massimo Comun Divisore) e mcm (minimo comune multiplo) sono prerequisiti fondamentali.
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Teorema Fondamentale dell'Aritmetica:</strong> Ogni intero `n > 1` ha una fattorizzazione prima unica. Es. `N = p_1^{a_1} * p_2^{a_2} * ... * p_k^{a_k}`.</li>
          <li className="mb-2"><strong>Numero di Divisori (funzione `τ(n)` o `d(n)`):</strong> Se `N = p_1^{a_1} * ... * p_k^{a_k}`, allora il numero di divisori di `N` è `(a_1+1)(a_2+1)...(a_k+1)`.</li>
          <li className="mb-2"><strong>Somma dei Divisori (funzione `σ(n)`):</strong> La somma dei divisori di `N` è `(1+p_1+...+p_1^{a_1}) * ... * (1+p_k+...+p_k^{a_k})`. Ogni termine è una somma geometrica: `(p_i^{a_i+1}-1)/(p_i-1)`.</li>
        </ul>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Calcolo Efficiente di Numero e Somma dei Divisori</h2>
        <p className="text-lg leading-relaxed mb-3">
          Per calcolare `τ(n)` e `σ(n)`, il primo passo è ottenere la fattorizzazione prima di `n`.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>
#include <map>
#include <cmath> // Per std::pow

// Funzione per la fattorizzazione prima (già vista nel Silver)
std::map<long long, int> prime_factorization(long long n) {
  std::map<long long, int> factors;
  for (long long i = 2; i * i <= n; ++i) {
    while (n % i == 0) {
      factors[i]++;
      n /= i;
    }
  }
  if (n > 1) {
    factors[n]++;
  }
  return factors;
}

// Calcola il numero di divisori
long long count_divisors(long long n) {
  if (n == 0) return 0; // Convenzione o gestione errore
  if (n == 1) return 1;
  std::map<long long, int> factors = prime_factorization(n);
  long long num_divisors = 1;
  for (auto const& [prime, exponent] : factors) {
    num_divisors *= (exponent + 1);
  }
  return num_divisors;
}

// Calcola la somma dei divisori
long long sum_divisors(long long n) {
  if (n == 0) return 0;
  if (n == 1) return 1;
  std::map<long long, int> factors = prime_factorization(n);
  long long total_sum = 1;
  for (auto const& [prime, exponent] : factors) {
    long long term_sum = 0;
    long long current_power = 1;
    for (int i = 0; i <= exponent; ++i) {
      term_sum += current_power;
      if (i < exponent) { // Evita overflow nell'ultima moltiplicazione se non necessaria
         current_power *= prime;
      }
    }
    // Alternativa con formula della somma geometrica (attenzione a divisione e modulo se necessario)
    // long long term_sum = (std::pow(prime, exponent + 1) - 1) / (prime - 1);
    total_sum *= term_sum;
  }
  return total_sum;
}

int main() {
  long long num = 60;
  std::cout << "Numero: " << num << std::endl;
  
  std::map<long long, int> factors = prime_factorization(num);
  std::cout << "Fattorizzazione prima: ";
  for (auto const& [p, e] : factors) {
    std::cout << p << "^" << e << " "; // 60 = 2^2 * 3^1 * 5^1
  }
  std::cout << std::endl;

  std::cout << "Numero di divisori di " << num << ": " << count_divisors(num) << std::endl; // (2+1)(1+1)(1+1) = 3*2*2 = 12
  std::cout << "Somma dei divisori di " << num << ": " << sum_divisors(num) << std::endl; 
  // (1+2+4)*(1+3)*(1+5) = 7 * 4 * 6 = 168
  return 0;
}`} 
        </code></pre>
        <p className="text-lg leading-relaxed mt-3">
          <strong>Complessità:</strong> La fattorizzazione prima di `n` richiede circa O(sqrt(n)). Il calcolo di `τ(n)` e `σ(n)` dalla fattorizzazione richiede un tempo proporzionale al numero di fattori primi distinti, che è al massimo O(log n).
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Funzione Phi di Eulero (Totiente Function)</h2>
        <p className="text-lg leading-relaxed mb-4">
          La **funzione phi di Eulero**, denotata con `φ(n)`, conta il numero di interi positivi minori o uguali a `n` che sono **coprimi** con `n` (cioè, il loro MCD con `n` è 1).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Proprietà:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Se `p` è un numero primo, `φ(p) = p - 1`.</li>
          <li className="mb-1">Se `p` è primo, `φ(p^k) = p^k - p^{k-1} = p^k(1 - 1/p)`.</li>
          <li className="mb-1">`φ` è una **funzione moltiplicativa**: se `gcd(a, b) = 1`, allora `φ(ab) = φ(a)φ(b)`.</li>
          <li className="mb-1">Formula generale: Se `n = p_1^{a_1} * p_2^{a_2} * ... * p_k^{a_k}`, allora `φ(n) = n * (1 - 1/p_1) * (1 - 1/p_2) * ... * (1 - 1/p_k)`.</li>
        </ul>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`long long euler_phi(long long n) {
  std::map<long long, int> factors = prime_factorization(n);
  long long result = n;
  for (auto const& [prime, exponent] : factors) {
    result -= result / prime; // Equivalente a result = result * (1 - 1/prime)
    // Oppure: result = result / prime * (prime - 1);
  }
  return result;
}

// Esempio:
// euler_phi(10) -> 10 * (1 - 1/2) * (1 - 1/5) = 10 * 1/2 * 4/5 = 4. (Numeri coprimi con 10 <= 10: 1, 3, 7, 9)
// euler_phi(9) -> 9 * (1 - 1/3) = 9 * 2/3 = 6. (Numeri coprimi con 9 <= 9: 1, 2, 4, 5, 7, 8)`}
        </code></pre>
        <p className="text-lg leading-relaxed mt-3">
          <strong>Teorema di Eulero:</strong> Se `gcd(a, n) = 1`, allora `a^{φ(n)} ≡ 1 (mod n)`. Questo è una generalizzazione del Piccolo Teorema di Fermat (che si applica quando `n` è primo, e quindi `φ(n) = n-1`).
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Applicazioni Avanzate della Divisibilità</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Problemi di Conteggio con Vincoli di Divisibilità:</strong> Spesso si usano il principio di inclusione-esclusione combinato con proprietà di divisibilità o MCD/mcm.</li>
          <li className="mb-2"><strong>Somme su Divisori:</strong> A volte è necessario calcolare somme del tipo `Σ_{d|n} f(d)` (somma di `f(d)` per tutti i divisori `d` di `n`). Se `f` è moltiplicativa, anche la funzione somma è moltiplicativa.</li>
          <li className="mb-2"><strong>Crivello Lineare (Linear Sieve):</strong> Una versione ottimizzata del Crivello di Eratostene che calcola i primi e il più piccolo fattore primo (LPF) per ogni numero fino a N in tempo O(N). Può essere esteso per calcolare funzioni aritmetiche come `φ(n)`, `τ(n)`, `σ(n)` per tutti i numeri fino a N in O(N). (Argomento più avanzato, spesso Platinum, ma le basi sono utili).</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Molti problemi di livello Gold richiedono una profonda comprensione di come interagiscono queste proprietà e la capacità di combinarle in modo creativo.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Esempio di Problema (Idea)</h2>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Problema:</strong> Dati N interi, trovare il numero di coppie `(i, j)` con `i < j` tali che `gcd(a_i, a_j) > 1`.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Approccio (Idea):</strong>
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">È più facile contare il complementare: coppie con `gcd(a_i, a_j) = 1` (coprime).</li>
          <li className="mb-1">Per ogni numero `a_i`, fattorizzalo.</li>
          <li className="mb-1">Usa il principio di inclusione-esclusione basato sui fattori primi. Per ogni `a_i`, vuoi contare quanti `a_j` (con `j > i`) non condividono alcun fattore primo con `a_i`.</li>
          <li className="mb-1">Questo può diventare complesso. Un approccio alternativo potrebbe coinvolgere iterare su tutti i possibili MCD primi `p`. Per ogni `p`, conta quanti numeri nell'array sono multipli di `p`. Se ci sono `k` tali numeri, formano `k*(k-1)/2` coppie che hanno `p` come fattore comune. Bisogna poi usare inclusione-esclusione per gestire i casi in cui le coppie condividono più fattori primi (es. multipli di 6 sono contati sia per 2 che per 3).</li>
        </ol>
        <p className="text-lg leading-relaxed">
          Questo tipo di problema evidenzia come la fattorizzazione e il conteggio basato sui divisori siano centrali.
        </p>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti a Concetti Prerequisiti e Successivi</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Prerequisito:</strong> <a href="../number-theory-silver" className="text-blue-600 dark:text-blue-400 hover:underline">Teoria dei Numeri (Silver)</a> (MCD, mcm, primi, fattorizzazione base, aritmetica modulare base).</li>
          <li className="mb-2"><strong>Concetto Correlato:</strong> <a href="../combinatorics" className="text-blue-600 dark:text-blue-400 hover:underline">Combinatoria</a> (spesso usata insieme per problemi di conteggio).</li>
          <li className="mb-2"><strong>Concetto Correlato:</strong> <a href="../modular-arithmetic" className="text-blue-600 dark:text-blue-400 hover:underline">Aritmetica Modulare (Gold)</a> (per Teorema di Eulero, inverso moltiplicativo).</li>
          <li className="mb-2"><strong>Concetti Avanzati (Platinum):</strong> Crivello Lineare per calcolo di funzioni aritmetiche, Principio di Inclusione-Esclusione avanzato, Funzione di Mobius e Inversione di Mobius.</li>
        </ul>
      </section>
    </div>
  );
};

export default DivisibilityGoldPage;

