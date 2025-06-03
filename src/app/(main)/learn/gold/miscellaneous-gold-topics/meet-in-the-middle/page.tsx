import React from 'react';

const MeetInTheMiddleGoldPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Meet-in-the-Middle (Livello Gold)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione a Meet-in-the-Middle</h2>
        <p className="text-lg leading-relaxed mb-4">
          La tecnica **Meet-in-the-Middle (MITM)** è un approccio algoritmico che divide un problema in due sotto-problemi (approssimativamente) di metà dimensione. Si risolvono questi due sotto-problemi indipendentemente e poi si combinano le loro soluzioni per ottenere la soluzione al problema originale.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Questa tecnica è particolarmente utile quando la soluzione per forza bruta al problema originale ha una complessità esponenziale, ad esempio O(2<sup>N</sup>) o O(N!). Applicando MITM, la complessità può spesso essere ridotta a qualcosa come O(2<sup>N/2</sup> * operazione_di_combinazione), che è significativamente più veloce per valori moderati di N (es. N fino a 40-50).
        </p>
        <p className="text-lg leading-relaxed">
          Il nome "meet-in-the-middle" deriva dall'idea che si generano soluzioni parziali da entrambe le "estremità" del problema e poi si cerca un modo per farle "incontrare" nel mezzo per formare una soluzione completa.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Scenario Tipico: Problema della Somma di Sottoinsiemi (Subset Sum)</h2>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Problema:</strong> Dato un insieme di N numeri interi e un intero target S, determinare se esiste un sottoinsieme dei numeri dati la cui somma sia uguale a S. (O contare quanti tali sottoinsiemi esistono, o trovare un tale sottoinsieme).
        </p>
        <p className="text-lg leading-relaxed mb-2">
          La soluzione per forza bruta enumera tutti i 2<sup>N</sup> sottoinsiemi, che è troppo lenta per N > 20-25.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>Approccio Meet-in-the-Middle:</strong>
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Dividi l'insieme originale di N numeri in due metà: la prima metà con N/2 elementi (chiamiamola A) e la seconda metà con N - N/2 elementi (chiamiamola B).</li>
          <li className="mb-1">Genera tutte le possibili somme di sottoinsiemi per la prima metà (A). Memorizza queste somme in un elenco, `sums_A`. Ci saranno al massimo 2<sup>N/2</sup> somme.</li>
          <li className="mb-1">Genera tutte le possibili somme di sottoinsiemi per la seconda metà (B). Memorizza queste somme in un elenco, `sums_B`. Ci saranno al massimo 2<sup>N - N/2</sup> somme.</li>
          <li className="mb-1">Ora, per ogni somma `s_A` in `sums_A`, vogliamo trovare se esiste una somma `s_B` in `sums_B` tale che `s_A + s_B = S`. Questo è equivalente a cercare `S - s_A` in `sums_B`.</li>
          <li className="mb-1">Per rendere efficiente questa ricerca, si può ordinare uno degli elenchi (es. `sums_B`) e poi, per ogni `s_A`, usare la ricerca binaria per trovare `S - s_A` in `sums_B`. In alternativa, si possono usare hash map/set.</li>
        </ol>
        <p className="text-lg leading-relaxed">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li>Generare `sums_A`: O(2<sup>N/2</sup>)</li>
          <li>Generare `sums_B`: O(2<sup>N - N/2</sup>)</li>
          <li>Ordinare `sums_B`: O(2<sup>N - N/2</sup> * log(2<sup>N - N/2</sup>)) = O(2<sup>N/2</sup> * (N/2))</li>
          <li>Ricerca per ogni `s_A`: O(2<sup>N/2</sup> * log(2<sup>N - N/2</sup>)) = O(2<sup>N/2</sup> * (N/2))</li>
          <li>Complessità totale approssimativa: O(N * 2<sup>N/2</sup>). Questo è molto meglio di O(2<sup>N</sup>). Ad esempio, per N=40, 2<sup>40</sup> è circa 10<sup>12</sup>, mentre 40 * 2<sup>20</sup> è circa 40 * 10<sup>6</sup> = 4 * 10<sup>7</sup>, che è fattibile.</li>
        </ul>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <vector>
#include <numeric>
#include <algorithm> // Per std::sort, std::lower_bound
#include <iostream>

// Funzione per generare tutte le somme di sottoinsiemi di un dato array
void generate_subset_sums(const std::vector<long long>& arr, int start_idx, int end_idx, 
                          long long current_sum, std::vector<long long>& sums_list) {
    if (start_idx > end_idx) {
        sums_list.push_back(current_sum);
        return;
    }
    // Includi l'elemento corrente
    generate_subset_sums(arr, start_idx + 1, end_idx, current_sum + arr[start_idx], sums_list);
    // Escludi l'elemento corrente
    generate_subset_sums(arr, start_idx + 1, end_idx, current_sum, sums_list);
}

// Problema: contare il numero di sottoinsiemi con somma S
long long count_subsets_with_sum_S(const std::vector<long long>& arr, long long S) {
    int n = arr.size();
    if (n == 0) return (S == 0 ? 1 : 0);

    std::vector<long long> sums_A, sums_B;
    
    // Genera somme per la prima metà (A)
    // Gli indici vanno da 0 a n/2 - 1
    generate_subset_sums(arr, 0, n / 2 - 1, 0, sums_A);
    
    // Genera somme per la seconda metà (B)
    // Gli indici vanno da n/2 a n - 1
    generate_subset_sums(arr, n / 2, n - 1, 0, sums_B);

    std::sort(sums_B.begin(), sums_B.end());

    long long count = 0;
    for (long long s_A : sums_A) {
        long long target_B = S - s_A;
        // Trova quante volte target_B appare in sums_B
        auto lower = std::lower_bound(sums_B.begin(), sums_B.end(), target_B);
        auto upper = std::upper_bound(sums_B.begin(), sums_B.end(), target_B);
        count += (upper - lower);
    }
    return count;
}

// Esempio di utilizzo:
// int main() {
//   std::vector<long long> nums = {1, 2, 3, 4, 5, 10, 12, 13, 15, 1, 2, 3, 7, 8, 9, 10, 11, 12, 1, 2};
//   // N = 20. 2^20 è circa 10^6. MITM con 2^10 = 1024.
//   long long target_sum = 25;
//   long long num_subsets = count_subsets_with_sum_S(nums, target_sum);
//   std::cout << "Numero di sottoinsiemi con somma " << target_sum << ": " << num_subsets << std::endl;
// 
//   std::vector<long long> nums2 = {3, 34, 4, 12, 5, 2};
//   long long target_sum2 = 9;
//   // Sottoinsiemi: {4,5}, {3,4,2}
//   long long num_subsets2 = count_subsets_with_sum_S(nums2, target_sum2);
//   std::cout << "Numero di sottoinsiemi con somma " << target_sum2 << ": " << num_subsets2 << std::endl; // Atteso: 2
//   return 0;
// }
`}</code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Quando Usare Meet-in-the-Middle</h2>
        <p className="text-lg leading-relaxed mb-4">
          MITM è una buona candidata quando:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">La soluzione per forza bruta è esponenziale (es. O(c<sup>N</sup>)).</li>
          <li className="mb-1">Il problema può essere diviso in due sotto-problemi indipendenti di dimensione circa N/2.</li>
          <li className="mb-1">Le soluzioni dei due sotto-problemi possono essere combinate efficientemente (es. con ordinamento e ricerca binaria, o usando hash map).</li>
          <li className="mb-1">N è in un range dove O(c<sup>N/2</sup>) è fattibile, ma O(c<sup>N</sup>) non lo è (tipicamente N tra 30 e 50 per c=2).</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Oltre al Subset Sum, MITM può essere applicato a problemi come:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Trovare il numero di cammini di una certa lunghezza in un grafo (se il grafo è piccolo o la lunghezza è piccola).</li>
          <li className="mb-1">Problemi di zaino (Knapsack) con un numero limitato di oggetti.</li>
          <li className="mb-1">Problemi di string matching o sequenze dove si cercano combinazioni.</li>
          <li className="mb-1">Alcuni problemi geometrici.</li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Considerazioni sull'Implementazione</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Gestione della Memoria:</strong> Gli elenchi di somme parziali (`sums_A`, `sums_B`) possono diventare grandi (fino a 2<sup>N/2</sup> elementi). Assicurarsi di avere abbastanza memoria.</li>
          <li className="mb-2"><strong>Divisione degli Elementi:</strong> La divisione in N/2 e N - N/2 è comune. A volte, una divisione leggermente sbilanciata può essere migliore se la fase di combinazione è più costosa per una delle due metà.</li>
          <li className="mb-2"><strong>Combinazione:</strong>
            <ul className="list-disc list-inside text-lg leading-relaxed ml-6 mt-1">
              <li><strong>Ordinamento + Ricerca Binaria:</strong> Come nell'esempio, O(M log M + K log M) dove M e K sono le dimensioni delle liste di somme.</li>
              <li><strong>Hash Map:</strong> Inserire `sums_A` in una hash map (somma -> conteggio). Poi, per ogni `s_B` in `sums_B`, cercare `S - s_B` nella hash map. Complessità media O(M + K). Può essere più veloce ma ha costanti peggiori e usa più memoria.</li>
              <li><strong>Two Pointers:</strong> Se entrambi gli elenchi `sums_A` e `sums_B` sono ordinati, si può usare una tecnica a due puntatori per trovare coppie che sommano a S. Se `sums_A` è ordinato in modo crescente e `sums_B` in modo decrescente (o si cerca `S - s_A` in `sums_B` ordinato), si può fare in O(M+K).</li>
            </ul>
          </li>
          <li className="mb-2"><strong>Varianti del Problema:</strong>
            <ul className="list-disc list-inside text-lg leading-relaxed ml-6 mt-1">
              <li><strong>Trovare un qualsiasi sottoinsieme:</strong> Si può fermare non appena si trova una coppia `s_A + s_B = S`. Potrebbe essere necessario memorizzare anche gli elementi che formano le somme parziali.</li>
              <li><strong>Ottimizzazione (es. trovare la somma più vicina a S):</strong> La fase di combinazione cambierebbe. Ad esempio, per ogni `s_A`, cercare in `sums_B` (ordinato) l'elemento più vicino a `S - s_A`.</li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti a Concetti Prerequisiti e Successivi</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Prerequisito:</strong> Ricorsione, backtracking (per generare sottoinsiemi/combinazioni).</li>
          <li className="mb-2"><strong>Prerequisito:</strong> Algoritmi di ordinamento, ricerca binaria.</li>
          <li className="mb-2"><strong>Prerequisito:</strong> Comprensione dell'analisi di complessità (specialmente esponenziale).</li>
          <li className="mb-2"><strong>Concetto Correlato:</strong> Programmazione Dinamica (spesso usata per problemi di subset sum con vincoli diversi, es. se i numeri sono piccoli o il target S è piccolo).</li>
          <li className="mb-2"><strong>Concetti Avanzati (Platinum):</strong> Applicazioni più complesse di MITM, combinazione con altre tecniche come DP con bitmask.</li>
        </ul>
      </section>
    </div>
  );
};

export default MeetInTheMiddleGoldPage;

