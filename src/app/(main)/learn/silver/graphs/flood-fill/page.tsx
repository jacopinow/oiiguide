import React from 'react';

const FloodFillPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Flood Fill (Livello Silver)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Spiegazione Iniziale del Concetto</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo **Flood Fill**, noto anche come "seed fill", è un algoritmo che determina l'area connessa a un dato nodo (o "seme") in una griglia multidimensionale (più comunemente una griglia 2D, come un'immagine bitmap o una mappa di un gioco). L'algoritmo "riempie" (o colora, o marca) tutte le celle connesse al seme che soddisfano una certa condizione (ad esempio, hanno lo stesso colore iniziale o sono attraversabili).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          È concettualmente molto simile agli algoritmi di attraversamento di grafi come la Ricerca in Profondità (DFS) o la Ricerca in Ampiezza (BFS), applicati a una griglia. Ogni cella della griglia può essere considerata un nodo, e le celle adiacenti (solitamente le 4 o 8 celle vicine) sono connesse da archi impliciti.
        </p>
        <p className="text-lg leading-relaxed">
          Flood Fill è usato in molti contesti, come nei programmi di fotoritocco (lo strumento "secchiello"), nei giochi per determinare aree controllate o raggiungibili, e in problemi di programmazione competitiva per contare le dimensioni di componenti connesse su una griglia, trovare percorsi, ecc.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Ragionamento Preliminare: Come Funziona?</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo parte da una cella "seme" (start_row, start_col).
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Si verifica se la cella seme soddisfa la condizione per essere riempita (es. ha il colore target o è un tipo di terreno attraversabile).</li>
          <li className="mb-1">Se la condizione è soddisfatta, la cella viene "riempita" (es. cambiata a un nuovo colore, marcata come visitata, o aggiunta a un conteggio).</li>
          <li className="mb-1">L'algoritmo viene poi applicato ricorsivamente (o iterativamente usando uno stack/coda) a tutte le celle adiacenti che non sono ancora state visitate e che soddisfano anch'esse la condizione.</li>
        </ol>
        <p className="text-lg leading-relaxed mb-4">
          Per evitare di processare la stessa cella più volte (e cadere in cicli infiniti), si usa solitamente una griglia ausiliaria `visited` per tenere traccia delle celle già elaborate, oppure si modifica direttamente la griglia originale in modo che le celle riempite non soddisfino più la condizione iniziale.
        </p>
        <p className="text-lg leading-relaxed">
          Le direzioni di adiacenza più comuni sono le 4 direzioni cardinali (su, giù, sinistra, destra). A volte si considerano anche le 8 direzioni (incluse le diagonali).
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Soluzione Guidata: Implementazione (DFS e BFS)</h2>
        <p className="text-lg leading-relaxed mb-3">
          Vediamo come implementare Flood Fill usando sia DFS (ricorsivo) che BFS (iterativo con coda).
          Supponiamo di avere una griglia `grid[R][C]` e vogliamo riempire una componente connessa di celle che hanno un certo `target_value` con un `new_value`, partendo da `(sr, sc)`.
        </p>

        <h3 className="text-2xl font-semibold mt-4 mb-2">3.1 Flood Fill con DFS (Ricorsivo)</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>

int R, C; // Righe e Colonne della griglia
std::vector<std::vector<int>> grid;
// std::vector<std::vector<bool>> visited; // Alternativa se non si modifica la griglia

// Direzioni per le 4 celle adiacenti (delta_riga, delta_colonna)
int dr[] = {-1, 1, 0, 0}; // Su, Giù
int dc[] = {0, 0, -1, 1}; // Sinistra, Destra

// Funzione per verificare se una cella è valida e all'interno della griglia
bool isValid(int r, int c) {
  return r >= 0 && r < R && c >= 0 && c < C;
}

void floodFillDFS(int r, int c, int target_value, int new_value) {
  // 1. Caso base: cella non valida o non ha il valore target
  if (!isValid(r, c) || grid[r][c] != target_value) {
    return;
  }
  // Se target_value == new_value, si entra in un ciclo infinito se non si usa una griglia visited
  // In questo caso, assumiamo che target_value != new_value, oppure che si marchi come visitato.
  // Se si usa una griglia visited:
  // if (!isValid(r, c) || visited[r][c] || grid[r][c] != target_value) return;
  // visited[r][c] = true;

  // 2. Riempi la cella corrente
  grid[r][c] = new_value;

  // 3. Chiama ricorsivamente per i vicini
  for (int i = 0; i < 4; ++i) {
    floodFillDFS(r + dr[i], c + dc[i], target_value, new_value);
  }
}

void printGrid() {
  for (int i = 0; i < R; ++i) {
    for (int j = 0; j < C; ++j) {
      std::cout << grid[i][j] << " ";
    }
    std::cout << std::endl;
  }
}

int main() {
  R = 5; C = 5;
  grid = {
    {1, 1, 1, 1, 0},
    {1, 1, 0, 1, 0},
    {1, 0, 0, 0, 1},
    {0, 0, 0, 1, 1},
    {0, 0, 1, 1, 1}
  };

  std::cout << "Griglia Originale:" << std::endl;
  printGrid();

  int start_row = 1, start_col = 1;
  int target_val = 1;
  int new_val = 2;

  floodFillDFS(start_row, start_col, target_val, new_val);

  std::cout << "\nGriglia dopo Flood Fill (DFS) partendo da (" << start_row << "," << start_col << ") con target=" << target_val << ", new_val=" << new_val << ":" << std::endl;
  printGrid();
  /* Output atteso:
  Griglia dopo Flood Fill (DFS) partendo da (1,1) con target=1, new_val=2:
  2 2 2 2 0 
  2 2 0 2 0 
  2 0 0 0 1 
  0 0 0 1 1 
  0 0 1 1 1 
  */
  return 0;
}`} 
        </code></pre>

        <h3 className="text-2xl font-semibold mt-6 mb-2">3.2 Flood Fill con BFS (Iterativo)</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>
#include <queue>

int R_bfs, C_bfs;
std::vector<std::vector<int>> grid_bfs;

int dr_bfs[] = {-1, 1, 0, 0};
int dc_bfs[] = {0, 0, -1, 1};

bool isValid_bfs(int r, int c) {
  return r >= 0 && r < R_bfs && c >= 0 && c < C_bfs;
}

void floodFillBFS(int sr, int sc, int target_value, int new_value) {
  if (!isValid_bfs(sr, sc) || grid_bfs[sr][sc] != target_value) {
    return;
  }
  // Se target_value == new_value, serve una griglia visited per evitare cicli
  if (target_value == new_value) return; // Semplificazione per questo esempio

  std::queue<std::pair<int, int>> q;
  q.push({sr, sc});
  grid_bfs[sr][sc] = new_value; // Riempi la cella seme

  while (!q.empty()) {
    std::pair<int, int> curr = q.front();
    q.pop();
    int r = curr.first;
    int c = curr.second;

    for (int i = 0; i < 4; ++i) {
      int nr = r + dr_bfs[i];
      int nc = c + dc_bfs[i];

      if (isValid_bfs(nr, nc) && grid_bfs[nr][nc] == target_value) {
        grid_bfs[nr][nc] = new_value;
        q.push({nr, nc});
      }
    }
  }
}

void printGrid_bfs() {
  for (int i = 0; i < R_bfs; ++i) {
    for (int j = 0; j < C_bfs; ++j) {
      std::cout << grid_bfs[i][j] << " ";
    }
    std::cout << std::endl;
  }
}

// main per BFS (simile a quello per DFS, ma usando le variabili _bfs)
// int main() { ... grid_bfs = ...; floodFillBFS(...); printGrid_bfs(); ... }`}
        </code></pre>
        <p className="text-lg leading-relaxed mt-3">
          <strong>Nota Importante:</strong> Se `target_value` è uguale a `new_value`, è essenziale usare una griglia `visited` separata per entrambe le implementazioni (DFS e BFS) per evitare un ciclo infinito. Negli esempi sopra, per semplicità, si assume che `target_value != new_value` o che la modifica del valore della cella sia sufficiente a marcare come "visitato" per quel `target_value`.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Visualizzazione dell'Esecuzione</h2>
        <p className="text-lg leading-relaxed mb-4">
          Consideriamo la griglia dell'esempio DFS e la chiamata `floodFillDFS(1, 1, 1, 2)`.
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">`floodFillDFS(1,1,1,2)`: `grid[1][1]` è 1. Lo cambia in 2. Chiama i vicini.</li>
          <li className="mb-1">  `floodFillDFS(0,1,1,2)` (da (1,1) su): `grid[0][1]` è 1. Lo cambia in 2. Chiama i vicini.</li>
          <li className="mb-1">    `floodFillDFS(-1,1,1,2)` (da (0,1) su): Invalido.</li>
          <li className="mb-1">    `floodFillDFS(1,1,1,2)` (da (0,1) giù): `grid[1][1]` è ora 2 (non 1). Ritorna.</li>
          <li className="mb-1">    `floodFillDFS(0,0,1,2)` (da (0,1) sx): `grid[0][0]` è 1. Lo cambia in 2. Chiama i vicini... e così via.</li>
        </ul>
        <p className="text-lg leading-relaxed">
          L'algoritmo si espande dalla cella seme, colorando tutte le celle connesse che avevano il `target_value`.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Analisi della Complessità</h2>
        <p className="text-lg leading-relaxed mb-4">
          Sia per DFS che per BFS, ogni cella della griglia viene visitata (e aggiunta allo stack/coda) al massimo una volta.
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1"><strong>Complessità Temporale:</strong> O(R * C), dove R è il numero di righe e C è il numero di colonne. Questo perché ogni cella viene processata un numero costante di volte.</li>
          <li className="mb-1"><strong>Complessità Spaziale:</strong>
            <ul className="list-disc list-inside text-lg leading-relaxed ml-6 mt-1">
              <li>Per DFS ricorsivo: O(R * C) nel caso peggiore, a causa della profondità dello stack di ricorsione (es. una griglia a forma di serpente).</li>
              <li>Per BFS (e DFS iterativo): O(R * C) nel caso peggiore, per memorizzare tutti i nodi nella coda/stack.</li>
              <li>Se si usa una griglia `visited` separata, questa aggiunge O(R * C) allo spazio.</li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Applicazioni Comuni e Problemi USACO</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Contare le dimensioni di una componente connessa:</strong> Modifica Flood Fill per incrementare un contatore invece di cambiare colore.</li>
          <li className="mb-2"><strong>USACO Silver: "Counting Rooms" (CSES)</strong> - Un classico problema di Flood Fill per contare il numero di stanze (componenti connesse di ".") in una mappa.</li>
          <li className="mb-2"><strong>USACO Silver: "Icy Perimeter"</strong> - Trovare l'area e il perimetro della più grande componente connessa di "gelato" in una griglia. Richiede Flood Fill e poi un calcolo del perimetro.</li>
          <li className="mb-2"><strong>USACO Silver: "Moocast" (variante su griglia)</strong> - Se le mucche sono su una griglia e possono comunicare con quelle vicine.</li>
          <li className="mb-2"><strong>Risolvere labirinti:</strong> Trovare un percorso da un punto A a un punto B.</li>
          <li className="mb-2"><strong>Determinare se due celle appartengono alla stessa regione.</strong></li>
        </ul>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti a Concetti Prerequisiti e Successivi</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Prerequisito:</strong> <a href="./graph-traversal" className="text-blue-600 dark:text-blue-400 hover:underline">Attraversamento di Grafi (DFS e BFS)</a> (Flood Fill è un'applicazione diretta di questi).</li>
          <li className="mb-2"><strong>Prerequisito:</strong> Rappresentazione di griglie 2D (uso di `std::vector<std::vector<char>>` o simili).</li>
          <li className="mb-2"><strong>Concetto Correlato:</strong> Componenti Connesse in grafi generici.</li>
          <li className="mb-2"><strong>Applicazione:</strong> Molti problemi di simulazione o analisi di mappe in USACO Silver.</li>
        </ul>
      </section>
    </div>
  );
};

export default FloodFillPage;

