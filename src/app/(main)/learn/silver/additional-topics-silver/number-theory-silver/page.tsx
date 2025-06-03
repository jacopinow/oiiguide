import React from 'react';

const NumberTheorySilverPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Teoria dei Numeri (Livello Silver)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Spiegazione Iniziale del Concetto</h2>
        <p className="text-lg leading-relaxed mb-4">
          La **teoria dei numeri** è una branca della matematica pura che si occupa principalmente dello studio dei numeri interi e delle loro proprietà. A livello USACO Silver, i concetti di teoria dei numeri che si incontrano più frequentemente includono la divisibilità, i numeri primi, il massimo comun divisore (MCD), il minimo comune multiplo (mcm) e l'aritmetica modulare di base.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Questi concetti sono fondamentali per risolvere una varietà di problemi che potrebbero non sembrare immediatamente legati alla teoria dei numeri, ma che possono essere semplificati o risolti efficientemente usando le sue tecniche.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Concetti Chiave</h2>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">2.1 Divisibilità e Fattori</h3>
          <p className="text-lg leading-relaxed mb-2">
            Un intero `a` è **divisibile** per un intero `b` (con `b != 0`) se esiste un intero `k` tale che `a = bk`. In questo caso, `b` è un **divisore** o **fattore** di `a`, e `a` è un **multiplo** di `b`. Si scrive `b | a`.
          </p>
          <p className="text-lg leading-relaxed mb-2">
            Trovare tutti i divisori di un numero `n` può essere fatto iterando da 1 fino a `sqrt(n)`. Se `i` divide `n`, allora anche `n/i` divide `n`.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>
#include <algorithm> // Per std::sort
#include <cmath>     // Per std::sqrt

std::vector<int> get_divisors(int n) {
  std::vector<int> divisors;
  for (int i = 1; i * i <= n; ++i) {
    if (n % i == 0) {
      divisors.push_back(i);
      if (i * i != n) { // Evita di aggiungere due volte la radice quadrata
        divisors.push_back(n / i);
      }
    }
  }
  std::sort(divisors.begin(), divisors.end());
  return divisors;
}

// Esempio:
// std::vector<int> divs = get_divisors(12);
// Output: 1 2 3 4 6 12`}</code></pre>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">2.2 Numeri Primi</h3>
          <p className="text-lg leading-relaxed mb-2">
            Un numero intero `p > 1` è un **numero primo** se i suoi unici divisori positivi sono 1 e `p` stesso. Altrimenti, è chiamato **numero composto**.
          </p>
          <p className="text-lg leading-relaxed mb-2">
            <strong>Test di primalità:</strong> Per verificare se un numero `n` è primo, è sufficiente controllare se ha divisori da 2 fino a `sqrt(n)`.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`bool is_prime(int n) {
  if (n <= 1) return false;
  for (int i = 2; i * i <= n; ++i) {
    if (n % i == 0) {
      return false;
    }
  }
  return true;
}

// Esempio:
// is_prime(7) -> true
// is_prime(10) -> false`}</code></pre>
          <p className="text-lg leading-relaxed mt-2 mb-2">
            <strong>Crivello di Eratostene:</strong> Un algoritmo efficiente per trovare tutti i numeri primi fino a un limite `N`. Inizialmente, tutti i numeri da 2 a `N` sono considerati primi. Si itera da `p = 2`. Se `p` è primo, si marcano tutti i suoi multipli (`2p, 3p, ...`) come non primi. Si ripete con il prossimo numero non marcato.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`std::vector<bool> sieve(int limit) {
  std::vector<bool> is_prime_sieve(limit + 1, true);
  is_prime_sieve[0] = is_prime_sieve[1] = false;
  for (int p = 2; p * p <= limit; ++p) {
    if (is_prime_sieve[p]) {
      for (int i = p * p; i <= limit; i += p) {
        is_prime_sieve[i] = false;
      }
    }
  }
  return is_prime_sieve;
}

// Esempio:
// std::vector<bool> primes_up_to_30 = sieve(30);
// if (primes_up_to_30[13]) { /* 13 è primo */ }`}</code></pre>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">2.3 Fattorizzazione Prima</h3>
          <p className="text-lg leading-relaxed mb-2">
            Il **Teorema Fondamentale dell'Aritmetica** afferma che ogni intero `n > 1` può essere scritto in modo univoco come prodotto di numeri primi (a meno dell'ordine dei fattori).
            Es. `12 = 2^2 * 3^1`.
          </p>
          <p className="text-lg leading-relaxed mb-2">
            Per fattorizzare `n`, si prova a dividerlo per i numeri primi (o tutti i numeri) a partire da 2. Se `p` divide `n`, si conta quante volte `p` compare nella fattorizzazione e si continua con `n / p^k`.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <map>

std::map<int, int> prime_factorization(int n) {
  std::map<int, int> factors;
  for (int i = 2; i * i <= n; ++i) {
    while (n % i == 0) {
      factors[i]++;
      n /= i;
    }
  }
  if (n > 1) { // Se n è rimasto primo dopo il ciclo
    factors[n]++;
  }
  return factors;
}

// Esempio:
// std::map<int, int> factors_of_12 = prime_factorization(12);
// factors_of_12[2] -> 2
// factors_of_12[3] -> 1`}</code></pre>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">2.4 Massimo Comun Divisore (MCD o GCD)</h3>
          <p className="text-lg leading-relaxed mb-2">
            Il MCD di due interi `a` e `b` è il più grande intero positivo che divide sia `a` che `b`. L'**Algoritmo di Euclide** è un metodo efficiente per calcolare il MCD.
            `gcd(a, b) = gcd(b, a % b)`. Il caso base è `gcd(a, 0) = a`.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`int gcd(int a, int b) {
  while (b) {
    a %= b;
    std::swap(a, b);
  }
  return a;
}
// In C++17 e successivi, c'è std::gcd
// #include <numeric>
// int result = std::gcd(a, b);

// Esempio:
// gcd(48, 18) -> 6`}</code></pre>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">2.5 Minimo Comune Multiplo (mcm o LCM)</h3>
          <p className="text-lg leading-relaxed mb-2">
            Il mcm di due interi `a` e `b` è il più piccolo intero positivo che è multiplo sia di `a` che di `b`.
            Si può calcolare usando il MCD: `lcm(a, b) = (|a * b|) / gcd(a, b)`.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`long long lcm(int a, int b) {
  if (a == 0 || b == 0) return 0;
  return std::abs((long long)a * b) / gcd(a, b);
}
// In C++17 e successivi, c'è std::lcm
// #include <numeric>
// long long result = std::lcm(a, b);

// Esempio:
// lcm(12, 18) -> 36`}</code></pre>
          <p className="text-lg leading-relaxed mt-2">Attenzione all'overflow quando si calcola `a * b` se `a` e `b` sono grandi. È meglio calcolare `(a / gcd(a,b)) * b`.</p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">2.6 Aritmetica Modulare (Base)</h3>
          <p className="text-lg leading-relaxed mb-2">
            L'aritmetica modulare si occupa dei resti delle divisioni. `a mod m` (o `a % m` in C++) è il resto della divisione di `a` per `m`.
            Due numeri `a` e `b` sono **congruenti modulo m** se hanno lo stesso resto quando divisi per `m`. Si scrive `a ≡ b (mod m)`.
          </p>
          <p className="text-lg leading-relaxed mb-2">
            Proprietà utili:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
            <li>`(a + b) mod m = ((a mod m) + (b mod m)) mod m`</li>
            <li>`(a - b) mod m = ((a mod m) - (b mod m) + m) mod m` (aggiungere `m` per garantire risultato positivo)</li>
            <li>`(a * b) mod m = ((a mod m) * (b mod m)) mod m`</li>
          </ul>
          <p className="text-lg leading-relaxed mt-2">
            La divisione modulare è più complessa e richiede il concetto di **inverso moltiplicativo modulare** (generalmente argomento Gold).
            L'elevamento a potenza modulare (`a^b mod m`) può essere fatto efficientemente usando l'algoritmo di **esponenziazione binaria** (o esponenziazione per quadrati).
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`long long power(long long base, long long exp, long long mod) {
  long long res = 1;
  base %= mod;
  while (exp > 0) {
    if (exp % 2 == 1) res = (res * base) % mod;
    base = (base * base) % mod;
    exp /= 2;
  }
  return res;
}

// Esempio:
// power(3, 5, 7) -> 3^5 mod 7 = 243 mod 7 = 5`}</code></pre>
        </div>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Applicazioni Comuni e Problemi USACO</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Problemi di conteggio con grandi numeri:</strong> Quando il risultato può essere molto grande, spesso viene chiesto di darlo modulo un numero grande (es. 10<sup>9</sup> + 7, che è un primo).</li>
          <li className="mb-2"><strong>USACO Silver: "Divisibility by 7" (varianti)</strong> - Problemi che richiedono di verificare la divisibilità o proprietà legate ai resti.</li>
          <li className="mb-2"><strong>Problemi basati su griglie o cicli:</strong> A volte le dimensioni o le ripetizioni possono essere analizzate usando MCD, mcm o proprietà modulari.</li>
          <li className="mb-2"><strong>USACO Silver: "Why Did the Cow Cross the Road III"</strong> - Problemi che possono coinvolgere il Crivello di Eratostene o la fattorizzazione per analizzare le proprietà dei numeri.</li>
          <li className="mb-2"><strong>Combinatoria di base:</strong> Calcolo di coefficienti binomiali modulo un primo (richiede inversi modulari per i denominatori, spesso più avanzato, ma le basi dell'aritmetica modulare sono utili).</li>
        </ul>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti a Concetti Prerequisiti e Successivi</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Prerequisito:</strong> Aritmetica di base, comprensione di interi e divisione.</li>
          <li className="mb-2"><strong>Concetto Correlato:</strong> <a href="./intro-to-bitwise-operators" className="text-blue-600 dark:text-blue-400 hover:underline">Operatori Bitwise</a> (a volte usati in combinazione, specialmente per l'esponenziazione binaria).</li>
          <li className="mb-2"><strong>Concetti Avanzati (USACO Gold/Platinum):</strong>
            <ul className="list-disc list-inside text-lg leading-relaxed ml-6 mt-1">
              <li>Algoritmo di Euclide Esteso e Inverso Moltiplicativo Modulare.</li>
              <li>Teorema Cinese del Resto.</li>
              <li>Teorema di Eulero e Piccolo Teorema di Fermat.</li>
              <li>Funzioni di Teoria dei Numeri (phi di Eulero, funzione di Mobius).</li>
              <li>Test di primalità più avanzati (Miller-Rabin).</li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default NumberTheorySilverPage;

