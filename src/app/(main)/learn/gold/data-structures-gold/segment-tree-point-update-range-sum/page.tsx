import React from 'react';

const SegmentTreeGoldPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Segment Tree - Point Update, Range Sum (Livello Gold)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione al Segment Tree</h2>
        <p className="text-lg leading-relaxed mb-4">
          Un **Segment Tree** (Albero dei Segmenti) è una potente struttura dati ad albero utilizzata principalmente per memorizzare informazioni su intervalli o segmenti. Permette di eseguire query su intervalli e aggiornamenti di singoli elementi in modo efficiente, tipicamente in tempo O(log N), dove N è la dimensione dell'array originale.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          La variante più comune, e quella che tratteremo qui, è il Segment Tree per **Point Update e Range Sum Query**. Questo significa che possiamo:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1"><strong>Aggiornare un singolo elemento</strong> dell'array sottostante.</li>
          <li className="mb-1"><strong>Calcolare la somma</strong> (o un'altra operazione associativa come minimo, massimo, prodotto) degli elementi in un dato intervallo `[L, R]`.</li>
        </ul>
        <p className="text-lg leading-relaxed">
          I Segment Tree sono fondamentali in programmazione competitiva per problemi che richiedono queste due operazioni su grandi array.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Struttura e Idea di Base</h2>
        <p className="text-lg leading-relaxed mb-4">
          Un Segment Tree è un albero binario (non necessariamente completo, ma spesso rappresentato come se lo fosse in un array per semplicità).
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Ogni **nodo foglia** del Segment Tree corrisponde a un singolo elemento dell'array originale.</li>
          <li className="mb-1">Ogni **nodo interno** rappresenta un intervallo che è l'unione degli intervalli dei suoi figli. Il valore memorizzato in un nodo interno è il risultato dell'operazione aggregata (es. somma) sui valori dei suoi figli (o sull'intervallo che rappresenta).</li>
          <li className="mb-1">La **radice** dell'albero rappresenta l'intero array originale (intervallo `[0, N-1]`).</li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">
          Se un nodo rappresenta l'intervallo `[L, R]`, e `L < R`, allora il suo figlio sinistro rappresenterà l'intervallo `[L, mid]` e il suo figlio destro l'intervallo `[mid+1, R]`, dove `mid = L + (R-L)/2`.
        </p>
        <p className="text-lg leading-relaxed">
          L'albero avrà un'altezza di O(log N). La dimensione dell'array usato per memorizzare l'albero è tipicamente `4*N` per essere sicuri di avere abbastanza spazio (o `2*N` se N è una potenza di 2 e si usa un'indicizzazione attenta, ma `4*N` è una stima più sicura e comune).
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Implementazione (Point Update, Range Sum)</h2>
        <p className="text-lg leading-relaxed mb-2">
          Assumiamo un array 0-indicizzato `arr` di dimensione `N`.
          Il Segment Tree sarà memorizzato in un array `tree`.
          La radice è all'indice 1 (convenzione comune). Il figlio sinistro del nodo `idx` è `2*idx`, il figlio destro è `2*idx + 1`.
        </p>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">3.1 Costruzione (Build)</h3>
          <p className="text-lg leading-relaxed mb-2">
            La costruzione avviene ricorsivamente. Se il nodo corrente `idx` rappresenta un intervallo foglia `[L, R]` con `L == R`, allora `tree[idx] = arr[L]`. Altrimenti, si costruiscono ricorsivamente i figli sinistro e destro, e `tree[idx] = tree[2*idx] + tree[2*idx+1]`.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <vector>
#include <iostream>

std::vector<long long> arr; // Array originale (0-indexed)
std::vector<long long> tree; // Segment tree (1-indexed)
int N_seg; // Dimensione dell'array originale

// Costruisce il segment tree
// idx: indice del nodo corrente nel tree
// L, R: intervallo [L,R] rappresentato dal nodo corrente (0-indexed rispetto ad arr)
void build(int idx, int L, int R) {
  if (L == R) { // Nodo foglia
    tree[idx] = arr[L];
  } else {
    int mid = L + (R - L) / 2;
    build(2 * idx, L, mid);         // Costruisci figlio sinistro
    build(2 * idx + 1, mid + 1, R); // Costruisci figlio destro
    tree[idx] = tree[2 * idx] + tree[2 * idx + 1]; // Somma dei figli
  }
}

// Inizializzazione
void init_segment_tree(const std::vector<long long>& inputArray) {
  N_seg = inputArray.size();
  arr = inputArray;
  tree.assign(4 * N_seg, 0); // Abbastanza spazio, inizializzato a 0
  if (N_seg > 0) {
    build(1, 0, N_seg - 1); // La radice è all'indice 1, copre [0, N-1]
  }
}
`}</code></pre>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">3.2 Aggiornamento Puntuale (Point Update)</h3>
          <p className="text-lg leading-relaxed mb-2">
            Per aggiornare `arr[pos]` a un nuovo valore `newValue`, si traversa l'albero dalla radice per trovare il nodo foglia corrispondente a `pos`. Si aggiorna il valore della foglia, e poi si aggiornano i valori di tutti i suoi antenati risalendo verso la radice.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Aggiorna il valore all'indice 'pos' dell'array originale a 'newValue'
// idx: indice del nodo corrente nel tree
// L, R: intervallo [L,R] rappresentato dal nodo corrente
// pos: indice nell'array originale da aggiornare (0-indexed)
// newValue: nuovo valore per arr[pos]
void update(int idx, int L, int R, int pos, long long newValue) {
  if (L == R) { // Nodo foglia corrispondente a pos
    tree[idx] = newValue;
    // arr[pos] = newValue; // Opzionale: aggiornare anche l'array originale se serve
  } else {
    int mid = L + (R - L) / 2;
    if (pos <= mid) { // 'pos' è nel sottoalbero sinistro
      update(2 * idx, L, mid, pos, newValue);
    } else { // 'pos' è nel sottoalbero destro
      update(2 * idx + 1, mid + 1, R, pos, newValue);
    }
    tree[idx] = tree[2 * idx] + tree[2 * idx + 1]; // Ricalcola il valore del nodo corrente
  }
}
`}</code></pre>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">3.3 Query di Intervallo (Range Sum Query)</h3>
          <p className="text-lg leading-relaxed mb-2">
            Per trovare la somma nell'intervallo di query `[queryL, queryR]`, si traversa l'albero. Per un nodo corrente `idx` che rappresenta l'intervallo `[L, R]`:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
            <li>Se `[L, R]` è completamente fuori da `[queryL, queryR]`, ritorna 0 (elemento neutro per la somma).</li>
            <li>Se `[L, R]` è completamente dentro `[queryL, queryR]`, ritorna `tree[idx]`.</li>
            <li>Altrimenti (sovrapposizione parziale), fai ricorsione sui figli sinistro e destro e somma i risultati.</li>
          </ul>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Calcola la somma nell'intervallo [queryL, queryR]
// idx: indice del nodo corrente nel tree
// L, R: intervallo [L,R] rappresentato dal nodo corrente
// queryL, queryR: intervallo della query (0-indexed)
long long query(int idx, int L, int R, int queryL, int queryR) {
  // Caso 1: L'intervallo del nodo [L,R] è completamente fuori dall'intervallo della query [queryL, queryR]
  if (R < queryL || L > queryR) {
    return 0; // Elemento neutro per la somma
  }
  // Caso 2: L'intervallo del nodo [L,R] è completamente dentro l'intervallo della query [queryL, queryR]
  if (queryL <= L && R <= queryR) {
    return tree[idx];
  }
  // Caso 3: Sovrapposizione parziale
  int mid = L + (R - L) / 2;
  long long sumL = query(2 * idx, L, mid, queryL, queryR);
  long long sumR = query(2 * idx + 1, mid + 1, R, queryL, queryR);
  return sumL + sumR;
}

// Funzione wrapper per la query (per comodità)
long long range_sum_query(int queryL, int queryR) {
  if (N_seg == 0 || queryL > queryR || queryL < 0 || queryR >= N_seg) return 0; // Gestione input non validi
  return query(1, 0, N_seg - 1, queryL, queryR);
}

// Esempio di utilizzo:
// int main() {
//   std::vector<long long> initial_array = {1, 3, 5, 7, 9, 11};
//   init_segment_tree(initial_array);
// 
//   // tree dovrebbe contenere i valori aggregati
//   // Esempio: tree[1] = somma di tutto = 36
// 
//   std::cout << "Somma [1, 3] (elementi 3,5,7): " << range_sum_query(1, 3) << std::endl; // 3+5+7 = 15
//   
//   update(1, 0, N_seg - 1, 2, 6); // Aggiorna arr[2] (era 5) a 6
//   // initial_array ora concettualmente è {1, 3, 6, 7, 9, 11}
// 
//   std::cout << "Somma [1, 3] dopo update (elementi 3,6,7): " << range_sum_query(1, 3) << std::endl; // 3+6+7 = 16
//   return 0;
// }`}</code></pre>
        </div>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Complessità</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1"><strong>Costruzione (Build):</strong> O(N), perché ogni nodo dell'albero (circa 2N nodi) viene visitato una volta.</li>
          <li className="mb-1"><strong>Aggiornamento Puntuale (Update):</strong> O(log N), perché si traversa un cammino dalla radice a una foglia.</li>
          <li className="mb-1"><strong>Query di Intervallo (Query):</strong> O(log N). In una query, al massimo due nodi per ogni livello dell'albero vengono visitati completamente (quelli che coprono parti dell'intervallo di query).</li>
          <li className="mb-1"><strong>Spazio:</strong> O(N) (tipicamente 4N).</li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Applicazioni e Varianti</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Range Minimum/Maximum Query (RMQ):</strong> Modificando l'operazione aggregata da somma a minimo/massimo.</li>
          <li className="mb-2"><strong>Range GCD/LCM Query:</strong> Se l'operazione è associativa.</li>
          <li className="mb-2"><strong>Conteggio di elementi con certe proprietà in un intervallo.</strong></li>
          <li className="mb-2"><strong>Lazy Propagation (Propagazione Pigra):</strong> Un'estensione per supportare **Range Updates** (es. aggiungere un valore a tutti gli elementi in un intervallo `[L,R]`) in O(log N). Questo è un argomento più avanzato (spesso Platinum).</li>
          <li className="mb-2"><strong>Segment Tree 2D:</strong> Per query su sottomatrici (più complesso).</li>
          <li className="mb-2"><strong>Segment Tree Persistente:</strong> Per interrogare versioni passate della struttura dati (più avanzato).</li>
          <li className="mb-2">Usato come struttura dati interna in algoritmi di sweepline.</li>
        </ul>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti a Concetti Prerequisiti e Successivi</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Prerequisito:</strong> Comprensione di alberi binari, ricorsione, array.</li>
          <li className="mb-2"><strong>Concetto Correlato:</strong> Fenwick Tree (Binary Indexed Tree - BIT), un'altra struttura dati per point update e prefix sum query (spesso più semplice da implementare e con costanti migliori per somme prefisse, ma meno flessibile del Segment Tree).</li>
          <li className="mb-2"><strong>Concetti Avanzati (Platinum):</strong> Segment Tree con Lazy Propagation, Segment Tree Persistente, Segment Tree 2D, applicazioni in algoritmi di sweepline più complessi.</li>
        </ul>
      </section>
    </div>
  );
};

export default SegmentTreeGoldPage;

