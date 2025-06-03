import React from 'react';

const BitwiseOperatorsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Introduzione agli Operatori Bitwise (Livello Silver)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Spiegazione Iniziale del Concetto</h2>
        <p className="text-lg leading-relaxed mb-4">
          Gli **operatori bitwise** (o bit a bit) sono operatori che lavorano direttamente sulla rappresentazione binaria dei numeri interi. Invece di trattare un numero come un singolo valore, lo considerano come una sequenza di bit (0 o 1) e eseguono operazioni logiche su ciascuna coppia di bit corrispondenti (o su singoli bit, nel caso di NOT e shift).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Comprendere e utilizzare gli operatori bitwise può portare a soluzioni molto efficienti per certi tipi di problemi, specialmente quelli che coinvolgono insiemi, maschere di bit (bitmasks), o la manipolazione di flag. Sono spesso usati in programmazione a basso livello, ma trovano applicazioni utili anche nella programmazione competitiva.
        </p>
        <p className="text-lg leading-relaxed">
          I principali operatori bitwise in C++ sono:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1"><strong>AND Bitwise (`&amp;`)</strong></li>
          <li className="mb-1"><strong>OR Bitwise (`|`)</strong></li>
          <li className="mb-1"><strong>XOR Bitwise (`^`)</strong></li>
          <li className="mb-1"><strong>NOT Bitwise (`~`)</strong> (Complemento a uno)</li>
          <li className="mb-1"><strong>Shift a Sinistra (`&lt;&lt;`)</strong></li>
          <li className="mb-1"><strong>Shift a Destra (`&gt;&gt;`)</strong></li>
        </ul>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Ragionamento Preliminare: Rappresentazione Binaria</h2>
        <p className="text-lg leading-relaxed mb-4">
          Per capire gli operatori bitwise, è fondamentale pensare ai numeri nella loro forma binaria. Ad esempio, il numero decimale 5 è `101` in binario. Il numero 3 è `011` in binario (assumendo la stessa lunghezza per allineamento, es. `000...101` e `000...011`).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Le operazioni bitwise vengono eseguite colonna per colonna sui bit corrispondenti. Ad esempio, per `5 &amp; 3`:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded-md text-sm text-center mb-2">
          101  (5)
        &amp; 011  (3)
          ---
          001  (1)
        </pre>
        <p className="text-lg leading-relaxed">
          Ogni operatore ha una sua tabella di verità che definisce il risultato per ogni possibile coppia di bit di input (o singolo bit per NOT).
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Soluzione Guidata: Gli Operatori in Dettaglio</h2>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">3.1 AND Bitwise (`&amp;`)</h3>
          <p className="text-lg leading-relaxed mb-2">L'operatore AND bitwise restituisce 1 per un bit se entrambi i bit corrispondenti sono 1, altrimenti restituisce 0.</p>
          <p className="text-sm mb-2">Tabella di verità: `0&amp;0=0`, `0&amp;1=0`, `1&amp;0=0`, `1&amp;1=1`.</p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`int a = 5;  // Binario: 0101
int b = 3;  // Binario: 0011
int result = a & b; // Risultato: 0001 (Decimale: 1)
// std::cout << result << std::endl; // Output: 1`}
          </code></pre>
          <p className="text-lg leading-relaxed mt-2"><strong>Usi comuni:</strong> Controllare se un bit specifico è acceso (es. `num &amp; (1 &lt;&lt; k)`), spegnere un bit specifico (es. `num &amp; ~(1 &lt;&lt; k)`).</p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">3.2 OR Bitwise (`|`)</h3>
          <p className="text-lg leading-relaxed mb-2">L'operatore OR bitwise restituisce 1 se almeno uno dei bit corrispondenti è 1, altrimenti restituisce 0.</p>
          <p className="text-sm mb-2">Tabella di verità: `0|0=0`, `0|1=1`, `1|0=1`, `1|1=1`.</p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`int a = 5;  // Binario: 0101
int b = 3;  // Binario: 0011
int result = a | b; // Risultato: 0111 (Decimale: 7)
// std::cout << result << std::endl; // Output: 7`}
          </code></pre>
          <p className="text-lg leading-relaxed mt-2"><strong>Usi comuni:</strong> Accendere un bit specifico (es. `num | (1 &lt;&lt; k)`).</p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">3.3 XOR Bitwise (`^`)</h3>
          <p className="text-lg leading-relaxed mb-2">L'operatore XOR (OR esclusivo) bitwise restituisce 1 se i bit corrispondenti sono diversi, altrimenti restituisce 0.</p>
          <p className="text-sm mb-2">Tabella di verità: `0^0=0`, `0^1=1`, `1^0=1`, `1^1=0`.</p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`int a = 5;  // Binario: 0101
int b = 3;  // Binario: 0011
int result = a ^ b; // Risultato: 0110 (Decimale: 6)
// std::cout << result << std::endl; // Output: 6`}
          </code></pre>
          <p className="text-lg leading-relaxed mt-2"><strong>Usi comuni:</strong> Invertire (toggle) un bit specifico (es. `num ^ (1 &lt;&lt; k)`), scambiare due variabili senza una temporanea (`a^=b; b^=a; a^=b;`), trovare l'elemento unico in un array dove tutti gli altri appaiono due volte.</p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">3.4 NOT Bitwise (`~`)</h3>
          <p className="text-lg leading-relaxed mb-2">L'operatore NOT bitwise (complemento a uno) inverte tutti i bit dell'operando (0 diventa 1, 1 diventa 0).</p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`unsigned char a = 5; // Binario: 00000101 (assumendo 8 bit)
unsigned char result = ~a; // Risultato: 11111010 (Decimale: 250)
// std::cout << (int)result << std::endl; // Output: 250

// Attenzione con interi con segno: il risultato dipende dalla rappresentazione (es. complemento a due)
// int signed_a = 5; // ...00000101
// int signed_result = ~signed_a; // ...11111010 (che è -6 in complemento a due)`}
          </code></pre>
          <p className="text-lg leading-relaxed mt-2"><strong>Usi comuni:</strong> Creare maschere (es. `~(1 &lt;&lt; k)` per spegnere il k-esimo bit quando usato con AND).</p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">3.5 Shift a Sinistra (`&lt;&lt;`)</h3>
          <p className="text-lg leading-relaxed mb-2">L'operatore shift a sinistra sposta tutti i bit dell'operando di sinistra di un numero specificato di posizioni a sinistra. I bit più a destra vengono riempiti con 0. Equivale a moltiplicare per 2<sup>k</sup> (dove k è il numero di shift).</p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`int a = 5;      // Binario: 00000101
int result = a << 2; // Sposta di 2 posizioni a sinistra: 00010100 (Decimale: 20)
// std::cout << result << std::endl; // Output: 20 (5 * 2^2 = 5 * 4 = 20)`}
          </code></pre>
          <p className="text-lg leading-relaxed mt-2"><strong>Usi comuni:</strong> Moltiplicare rapidamente per potenze di 2, creare maschere di bit (es. `1 &lt;&lt; k` per ottenere un numero con solo il k-esimo bit acceso).</p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">3.6 Shift a Destra (`&gt;&gt;`)</h3>
          <p className="text-lg leading-relaxed mb-2">L'operatore shift a destra sposta tutti i bit dell'operando di sinistra di un numero specificato di posizioni a destra. Equivale a dividere per 2<sup>k</sup> (divisione intera).</p>
          <p className="text-lg leading-relaxed mb-2">Per gli interi senza segno, i bit più a sinistra vengono riempiti con 0 (shift logico). Per gli interi con segno, il comportamento può dipendere dall'implementazione (shift aritmetico, che preserva il bit di segno, o shift logico). In C++, per i tipi con segno, è spesso uno shift aritmetico.</p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`int a = 20;     // Binario: 00010100
int result = a >> 2; // Sposta di 2 posizioni a destra: 00000101 (Decimale: 5)
// std::cout << result << std::endl; // Output: 5 (20 / 2^2 = 20 / 4 = 5)

int neg_a = -20; // Es. in complemento a due: ...11101100
int neg_result = neg_a >> 2; // Spesso ...11111011 (Decimale: -5, shift aritmetico)
// std::cout << neg_result << std::endl;`}
          </code></pre>
          <p className="text-lg leading-relaxed mt-2"><strong>Usi comuni:</strong> Dividere rapidamente per potenze di 2, controllare il valore di un bit specifico (es. `(num &gt;&gt; k) &amp; 1`).</p>
        </div>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Visualizzazione dell'Esecuzione: Esempi Combinati</h2>
        <p className="text-lg leading-relaxed mb-3">Vediamo alcune operazioni comuni con bitmask:</p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Controllare il k-esimo bit (0-indexed):</strong> `bool is_set = (number &amp; (1 &lt;&lt; k)) != 0;`</li>
          <li className="mb-2"><strong>Accendere il k-esimo bit:</strong> `number = number | (1 &lt;&lt; k);` o `number |= (1 &lt;&lt; k);`</li>
          <li className="mb-2"><strong>Spegnere il k-esimo bit:</strong> `number = number &amp; (~(1 &lt;&lt; k));` o `number &amp;= (~(1 &lt;&lt; k));`</li>
          <li className="mb-2"><strong>Invertire (toggle) il k-esimo bit:</strong> `number = number ^ (1 &lt;&lt; k);` o `number ^= (1 &lt;&lt; k);`</li>
          <li className="mb-2"><strong>Isolare il bit meno significativo acceso (LSB):</strong> `lsb = number &amp; (-number);` (sfrutta il complemento a due)</li>
          <li className="mb-2"><strong>Spegnere il bit meno significativo acceso:</strong> `number = number &amp; (number - 1);`</li>
          <li className="mb-2"><strong>Contare i bit accesi (popcount):</strong> In C++20, `std::popcount(unsigned_number)`. Prima, `__builtin_popcount` (GCC/Clang) o implementazione manuale.</li>
        </ul>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`int num = 10; // Binario: 1010
int k = 1;    // Secondo bit da destra (0-indexed)

// Controlla il 1° bit (valore 2)
bool bit_k_is_set = (num & (1 << k)) != 0; // (1010 & 0010) -> 0010 (true)
std::cout << "Il bit " << k << " di " << num << " e' acceso? " << (bit_k_is_set ? "Si" : "No") << std::endl;

// Accendi il 2° bit (valore 4)
int k_on = 2;
num |= (1 << k_on); // 1010 | 0100 -> 1110 (14)
std::cout << "Dopo aver acceso il bit " << k_on << ": " << num << std::endl;

// Spegni il 1° bit (valore 2)
num &= (~(1 << k)); // 1110 & (~0010) -> 1110 & 1101 -> 1100 (12)
std::cout << "Dopo aver spento il bit " << k << ": " << num << std::endl;

// Inverti il 3° bit (valore 8)
int k_toggle = 3;
num ^= (1 << k_toggle); // 1100 ^ 1000 -> 0100 (4)
std::cout << "Dopo aver invertito il bit " << k_toggle << ": " << num << std::endl;`}
        </code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Analisi della Complessità</h2>
        <p className="text-lg leading-relaxed mb-4">
          La maggior parte delle operazioni bitwise singole (AND, OR, XOR, NOT, SHIFT) sono eseguite dall'hardware del processore in un singolo ciclo di clock o comunque in tempo **O(1)**. Questo le rende estremamente veloci.
        </p>
        <p className="text-lg leading-relaxed">
          Quando si usano in cicli (es. per iterare su tutti i sottoinsiemi rappresentati da bitmask), la complessità totale dipenderà dal numero di iterazioni (es. O(2<sup>N</sup>) per iterare su tutti i sottoinsiemi di N elementi).
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Applicazioni Comuni e Problemi USACO</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Bitmasking per rappresentare insiemi:</strong> Un intero può rappresentare un sottoinsieme di N elementi (fino a 32 o 64, a seconda del tipo di intero). Il k-esimo bit acceso significa che il k-esimo elemento è nell'insieme. Utile per DP con stati di sottoinsiemi (DP with bitmask).</li>
          <li className="mb-2"><strong>USACO Silver/Gold: Problemi di DP con Bitmask</strong> - Es. "Travelling Salesperson Problem" (TSP) su piccoli N, o problemi di assegnazione.</li>
          <li className="mb-2"><strong>Gestione di flag e permessi:</strong> Ogni bit può rappresentare un flag booleano.</li>
          <li className="mb-2"><strong>Ottimizzazioni a basso livello:</strong> In alcuni casi, possono sostituire operazioni aritmetiche più lente (es. `x * 2` vs `x &lt;&lt; 1`).</li>
          <li className="mb-2"><strong>USACO Silver: "Cow Steeplechase" (varianti)</strong> - Problemi dove le interazioni tra oggetti possono essere modellate o verificate usando bit.</li>
          <li className="mb-2"><strong>Risolvere problemi con XOR:</strong> Molti problemi eleganti usano le proprietà di XOR (es. `a ^ a = 0`, `a ^ 0 = a`, commutatività, associatività).</li>
        </ul>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti a Concetti Prerequisiti e Successivi</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Prerequisito:</strong> Comprensione della rappresentazione binaria dei numeri.</li>
          <li className="mb-2"><strong>Prerequisito:</strong> Tipi di dati interi (`int`, `long long`, `unsigned`).</li>
          <li className="mb-2"><strong>Concetto Avanzato:</strong> Programmazione Dinamica con Bitmask (DP with Bitmask).</li>
          <li className="mb-2"><strong>Concetto Avanzato:</strong> Strutture dati come Trie (a volte usano bit per navigare).</li>
          <li className="mb-2"><strong>Concetto Correlato:</strong> Aritmetica Modulare (a volte combinata con bitmask per calcolare hash o stati).</li>
        </ul>
      </section>
    </div>
  );
};

export default BitwiseOperatorsPage;

