import React from 'react';

const MorePrefixSumsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Approfondimenti sulle Somme Prefisse (Livello Silver)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Oltre le Basi: Somme Prefisse 2D</h2>
        <p className="text-lg leading-relaxed mb-4">
          Dopo aver compreso le somme prefisse su array monodimensionali, un'estensione naturale e molto utile è applicare lo stesso concetto a matrici bidimensionali (2D). Le somme prefisse 2D ci permettono di calcolare la somma degli elementi all'interno di una qualsiasi sottomatrice rettangolare in tempo O(1), dopo un precalcolo iniziale.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Data una matrice `M` di dimensioni `Righe x Colonne`, l'array delle somme prefisse 2D, `pref2D[i][j]`, memorizzerà la somma di tutti gli elementi nella sottomatrice che va dall'angolo in alto a sinistra `M[0][0]` fino all'elemento `M[i-1][j-1]` (usando la convenzione con `pref2D[0][...] = 0` e `pref2D[...][0] = 0`).
        </p>
        <h3 className="text-2xl font-medium mb-2">Formula di Calcolo per `pref2D`</h3>
        <p className="text-lg leading-relaxed mb-3">
          Per calcolare `pref2D[i][j]`, possiamo usare la seguente relazione ricorsiva (assumendo che `i` e `j` siano 1-indicizzati per `pref2D` e `M` sia 0-indicizzata):
        </p>
        <p className="text-lg leading-relaxed mb-3 font-semibold text-center bg-blue-100 dark:bg-blue-900 p-3 rounded">
          `pref2D[i][j] = M[i-1][j-1] + pref2D[i-1][j] + pref2D[i][j-1] - pref2D[i-1][j-1]`
        </p>
        <img src="/images/geometry/prefix_sum_2d_formula.png" alt="Formula Somme Prefisse 2D" className="my-4 mx-auto shadow-md rounded" />
        {/* Immagine placeholder, da generare o trovare successivamente */}
        <p className="text-lg leading-relaxed mb-3">
          <strong>Spiegazione della formula:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">`M[i-1][j-1]`: È l'elemento corrente che stiamo aggiungendo alla somma.</li>
          <li className="mb-1">`pref2D[i-1][j]`: È la somma della sottomatrice sopra quella corrente (fino alla riga `i-1`, colonna `j`).</li>
          <li className="mb-1">`pref2D[i][j-1]`: È la somma della sottomatrice a sinistra di quella corrente (fino alla riga `i`, colonna `j-1`).</li>
          <li className="mb-1">`pref2D[i-1][j-1]`: Quando sommiamo `pref2D[i-1][j]` e `pref2D[i][j-1]`, la regione `pref2D[i-1][j-1]` (in alto a sinistra rispetto a `M[i-1][j-1]`) viene contata due volte. Quindi, dobbiamo sottrarla una volta per correggere il conteggio.</li>
        </ul>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Implementazione delle Somme Prefisse 2D</h2>

        <h3 className="text-2xl font-medium mb-2">Costruzione dell'Array `pref2D`</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>

int main() {
  std::vector<std::vector<int>> M = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
  };
  int R = M.size();    // Numero di righe
  int C = M[0].size(); // Numero di colonne

  // Array delle somme prefisse 2D (dimensioni R+1 x C+1)
  // pref2D[0][...] e pref2D[...][0] sono inizializzati a 0
  std::vector<std::vector<long long>> pref2D(R + 1, std::vector<long long>(C + 1, 0));

  for (int i = 1; i <= R; ++i) {
    for (int j = 1; j <= C; ++j) {
      pref2D[i][j] = M[i-1][j-1] + pref2D[i-1][j] + pref2D[i][j-1] - pref2D[i-1][j-1];
    }
  }

  std::cout << "Matrice Originale M:" << std::endl;
  for (int i = 0; i < R; ++i) {
    for (int j = 0; j < C; ++j) {
      std::cout << M[i][j] << "\t";
    }
    std::cout << std::endl;
  }

  std::cout << "\nMatrice Somme Prefisse 2D (pref2D):" << std::endl;
  for (int i = 0; i <= R; ++i) {
    for (int j = 0; j <= C; ++j) {
      std::cout << pref2D[i][j] << "\t";
    }
    std::cout << std::endl;
  }
  /* Output pref2D:
  0   0   0   0   
  0   1   3   6   
  0   5   12  21  
  0   12  27  45  
  */
  return 0;
}`} 
        </code></pre>

        <h3 className="text-2xl font-medium mt-6 mb-2">Query di Somma su Sottomatrice</h3>
        <p className="text-lg leading-relaxed mb-3">
          Per calcolare la somma degli elementi in una sottomatrice definita dall'angolo in alto a sinistra `(r1, c1)` e dall'angolo in basso a destra `(r2, c2)` (0-indicizzati per la matrice originale `M`), usiamo la seguente formula con `pref2D` (1-indicizzato):
        </p>
        <p className="text-lg leading-relaxed mb-3 font-semibold text-center bg-blue-100 dark:bg-blue-900 p-3 rounded">
          `Sum(M[r1..r2][c1..c2]) = pref2D[r2+1][c2+1] - pref2D[r1][c2+1] - pref2D[r2+1][c1] + pref2D[r1][c1]`
        </p>
        <img src="/images/geometry/prefix_sum_2d_query.png" alt="Query Somme Prefisse 2D" className="my-4 mx-auto shadow-md rounded" />
        {/* Immagine placeholder, da generare o trovare successivamente */}
        <p className="text-lg leading-relaxed mb-3">
          <strong>Spiegazione della formula:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">`pref2D[r2+1][c2+1]`: Somma totale dal (0,0) originale fino a (r2, c2). Include la sottomatrice desiderata e altre tre regioni.</li>
          <li className="mb-1">`pref2D[r1][c2+1]`: Somma della regione sopra la sottomatrice desiderata. La sottraiamo.</li>
          <li className="mb-1">`pref2D[r2+1][c1]`: Somma della regione a sinistra della sottomatrice desiderata. La sottraiamo.</li>
          <li className="mb-1">`pref2D[r1][c1]`: Quando sottraiamo le due regioni sopra, la regione in alto a sinistra (da (0,0) a (r1-1, c1-1)) viene sottratta due volte. Quindi, dobbiamo riaggiungerla una volta.</li>
        </ul>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Continuando dall'esempio precedente...
// Matrice M:
// 1  2  3
// 4  5  6
// 7  8  9
// Matrice pref2D:
// 0   0   0   0   
// 0   1   3   6   
// 0   5   12  21  
// 0   12  27  45

// Calcolare la somma della sottomatrice M[0..1][1..2]
// (elementi: {{2,3}, {5,6}} -> 2+3+5+6 = 16)
int r1 = 0, c1 = 1;
int r2 = 1, c2 = 2;

long long sum_submatrix = pref2D[r2 + 1][c2 + 1] - pref2D[r1][c2 + 1] - pref2D[r2 + 1][c1] + pref2D[r1][c1];
// pref2D[1+1][2+1] = pref2D[2][3] = 21
// pref2D[0][2+1]   = pref2D[0][3] = 0
// pref2D[1+1][1]   = pref2D[2][1] = 5
// pref2D[0][1]     = pref2D[0][1] = 0
// sum_submatrix = 21 - 0 - 5 + 0 = 16. Corretto!
std::cout << "Somma M[" << r1 << ".." << r2 << "][" << c1 << ".." << c2 << "]: " << sum_submatrix << std::endl;

// Calcolare la somma della sottomatrice M[1..2][0..1]
// (elementi: {{4,5}, {7,8}} -> 4+5+7+8 = 24)
r1 = 1, c1 = 0;
r2 = 2, c2 = 1;
sum_submatrix = pref2D[r2 + 1][c2 + 1] - pref2D[r1][c2 + 1] - pref2D[r2 + 1][c1] + pref2D[r1][c1];
// pref2D[2+1][1+1] = pref2D[3][2] = 27
// pref2D[1][1+1]   = pref2D[1][2] = 3
// pref2D[2+1][0]   = pref2D[3][0] = 0
// pref2D[1][0]     = pref2D[1][0] = 0
// sum_submatrix = 27 - 3 - 0 + 0 = 24. Corretto!
std::cout << "Somma M[" << r1 << ".." << r2 << "][" << c1 << ".." << c2 << "]: " << sum_submatrix << std::endl;`} 
        </code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Analisi della Complessità (2D)</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Precalcolo dell'array `pref2D`:</strong> O(R * C), dove R è il numero di righe e C il numero di colonne. Si esegue una passata sulla matrice.</li>
          <li className="mb-2"><strong>Query di somma su una sottomatrice:</strong> O(1), una volta che `pref2D` è stato calcolato.</li>
        </ul>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Applicazioni e Problemi Comuni</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>USACO Silver: "Forest Queries" (CSES) / "Rectangular Pasture" (varianti)</strong>: Problemi che richiedono di contare punti o calcolare somme in rettangoli su una griglia 2D.</li>
          <li className="mb-2"><strong>Massima somma di una sottomatrice (con vincoli):</strong> Sebbene il problema generale della massima somma di una sottomatrice (Kadane 2D) sia più complesso, le somme prefisse sono un ingrediente.</li>
          <li className="mb-2"><strong>Image Processing:</strong> Calcolo di somme di intensità di pixel in regioni di un'immagine.</li>
          <li className="mb-2"><strong>Game Boards:</strong> Analisi di porzioni di una scacchiera o di un campo di gioco.</li>
        </ul>
        <p className="text-lg leading-relaxed mt-2">
          <strong>Nota sulle Coordinate:</strong> Fai molta attenzione all'indicizzazione (0-based vs 1-based) e ai confini (inclusivi vs esclusivi) quando implementi somme prefisse 2D e le relative query. È facile commettere errori off-by-one.
        </p>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti ed Estensioni</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><a href="./introduction-to-prefix-sums" className="text-blue-600 dark:text-blue-400 hover:underline">Introduzione alle Somme Prefisse (1D)</a>: La base per comprendere le somme prefisse 2D.</li>
          <li className="mb-2"><strong>Difference Arrays 2D:</strong> Simile al caso 1D, per aggiornamenti su sottomatrici e query sui valori finali.</li>
          <li className="mb-2">Data Structures for Range Queries (Segment Trees 2D, k-d Trees - argomenti molto avanzati): Per quando la matrice originale può cambiare tra le query.</li>
        </ul>
      </section>
    </div>
  );
};

export default MorePrefixSumsPage;

