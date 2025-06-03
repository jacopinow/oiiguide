import React from 'react';

const DSUGoldPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Disjoint Set Union (DSU) - (Livello Gold)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione a Disjoint Set Union (DSU)</h2>
        <p className="text-lg leading-relaxed mb-4">
          La struttura dati **Disjoint Set Union (DSU)**, nota anche come Union-Find o Merge-Find set, è utilizzata per mantenere una collezione di insiemi disgiunti (cioè, insiemi che non hanno elementi in comune). Permette di eseguire due operazioni principali in modo molto efficiente:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1"><strong>Find (Trova):</strong> Determina a quale insieme appartiene un particolare elemento. Questa operazione restituisce un rappresentante (o radice) dell'insieme.</li>
          <li className="mb-1"><strong>Union (Unisci):</strong> Unisce due insiemi disgiunti in un unico insieme.</li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">
          DSU è comunemente usata per problemi che coinvolgono la gestione di componenti connesse in un grafo (dinamicamente), l'algoritmo di Kruskal per il Minimum Spanning Tree (MST), e vari altri problemi dove è necessario raggruppare elementi.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Implementazione di Base e Ottimizzazioni</h2>
        <p className="text-lg leading-relaxed mb-2">
          Ogni insieme è rappresentato come un albero, dove ogni nodo punta al suo genitore. La radice dell'albero è il rappresentante dell'insieme e punta a se stessa (o a un valore speciale come -1).
        </p>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">2.1 Implementazione Base (Senza Ottimizzazioni)</h3>
          <p className="text-lg leading-relaxed mb-2">
            Inizialmente, ogni elemento è nel proprio insieme (è la radice del proprio albero).
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <vector>
#include <numeric> // Per std::iota

std::vector<int> parent_basic;

void make_set_basic(int v) {
  // Inizialmente, ogni elemento è il genitore di se stesso.
  // Assumiamo che gli elementi siano 0-indexed fino a n-1.
  // Questa funzione è implicita se parent_basic è inizializzato correttamente.
  parent_basic[v] = v;
}

// Inizializzazione per n elementi
void init_dsu_basic(int n) {
  parent_basic.resize(n);
  std::iota(parent_basic.begin(), parent_basic.end(), 0); // parent_basic[i] = i
}

int find_set_basic(int v) {
  if (v == parent_basic[v])
    return v;
  return find_set_basic(parent_basic[v]); // Ricorsione per trovare la radice
}

void union_sets_basic(int a, int b) {
  a = find_set_basic(a); // Trova il rappresentante di a
  b = find_set_basic(b); // Trova il rappresentante di b
  if (a != b) { // Se non sono già nello stesso insieme
    parent_basic[b] = a; // Rendi a il genitore di b (unisci b ad a)
  }
}
`}</code></pre>
          <p className="text-lg leading-relaxed mt-2">
            <strong>Complessità:</strong> Senza ottimizzazioni, l'operazione `find_set` può degenerare in O(N) nel caso peggiore (albero lineare). Di conseguenza, `union_sets` può anche essere O(N).
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">2.2 Ottimizzazione: Path Compression (Compressione del Cammino)</h3>
          <p className="text-lg leading-relaxed mb-2">
            Durante un'operazione `find_set(v)`, dopo aver trovato la radice `r`, si fa in modo che tutti i nodi sul cammino da `v` a `r` puntino direttamente a `r`. Questo appiattisce significativamente l'albero.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// find_set con Path Compression
int find_set_path_compression(int v, std::vector<int>& parent_pc) {
  if (v == parent_pc[v])
    return v;
  return parent_pc[v] = find_set_path_compression(parent_pc[v], parent_pc); // Assegna e ritorna
}
`}</code></pre>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">2.3 Ottimizzazione: Union by Size/Rank (Unione per Dimensione/Rango)</h3>
          <p className="text-lg leading-relaxed mb-2">
            Quando si uniscono due alberi, si attacca sempre l'albero più piccolo (in termini di numero di nodi - Union by Size) o meno profondo (in termini di altezza/rango - Union by Rank) all'albero più grande/profondo. Questo aiuta a mantenere gli alberi più piatti.
          </p>
          <p className="text-lg leading-relaxed mb-2">
            <strong>Union by Size:</strong> Si tiene traccia della dimensione di ogni insieme (numero di elementi). Quando si uniscono due insiemi, l'insieme con meno elementi viene attaccato a quello con più elementi. Se le dimensioni sono uguali, la scelta è arbitraria.
          </p>
          <p className="text-lg leading-relaxed mb-2">
            <strong>Union by Rank:</strong> Si tiene traccia di un "rango" per ogni albero (una stima dell'altezza). Quando si uniscono due alberi con ranghi diversi, l'albero con rango inferiore viene attaccato a quello con rango superiore. Se i ranghi sono uguali, si attacca uno all'altro e si incrementa il rango del nuovo albero radice.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">2.4 Implementazione Completa con Path Compression e Union by Size</h3>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <vector>
#include <numeric> // Per std::iota

struct DSU {
  std::vector<int> parent;
  std::vector<int> sz; // Dimensione dell'insieme rappresentato dalla radice

  DSU(int n) {
    parent.resize(n);
    std::iota(parent.begin(), parent.end(), 0); // parent[i] = i
    sz.assign(n, 1); // Ogni insieme ha inizialmente dimensione 1
  }

  int find_set(int v) {
    if (v == parent[v])
      return v;
    return parent[v] = find_set(parent[v]); // Path compression
  }

  void union_sets(int a, int b) {
    a = find_set(a);
    b = find_set(b);
    if (a != b) {
      if (sz[a] < sz[b]) // Union by size: attacca l'albero più piccolo al più grande
        std::swap(a, b);
      parent[b] = a;
      sz[a] += sz[b]; // Aggiorna la dimensione del nuovo insieme radice
    }
  }

  int get_size(int v) { // Ritorna la dimensione dell'insieme contenente v
      return sz[find_set(v)];
  }
};

// Esempio di utilizzo:
// int main() {
//   DSU dsu(5); // 5 elementi: 0, 1, 2, 3, 4
//   dsu.union_sets(0, 1);
//   dsu.union_sets(2, 3);
//   dsu.union_sets(0, 2);
//   // Ora 0, 1, 2, 3 sono nello stesso insieme.
//   // find_set(1) dovrebbe ritornare lo stesso di find_set(3)
//   // get_size(1) dovrebbe ritornare 4
//   // find_set(4) dovrebbe ritornare 4
//   // get_size(4) dovrebbe ritornare 1
//   return 0;
// }`}</code></pre>
          <p className="text-lg leading-relaxed mt-2">
            <strong>Complessità Ammortizzata:</strong> Con entrambe le ottimizzazioni (Path Compression e Union by Size/Rank), la complessità ammortizzata per operazione (`find_set` o `union_sets`) è quasi costante, precisamente O(α(N)), dove α è la funzione inversa di Ackermann, che cresce molto lentamente (α(N) < 5 per tutti i valori pratici di N).
          </p>
        </div>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Applicazioni Comuni</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Algoritmo di Kruskal per Minimum Spanning Tree (MST):</strong> DSU è usata per tenere traccia degli insiemi di vertici connessi. Si considerano gli archi in ordine di peso crescente. Se un arco connette due vertici in insiemi disgiunti, si aggiunge l'arco all'MST e si uniscono i loro insiemi.</li>
          <li className="mb-2"><strong>Rilevamento di Cicli in un Grafo Indiretto:</strong> Quando si aggiungono archi a un grafo, se un arco connette due vertici che sono già nello stesso insieme (secondo DSU), allora l'aggiunta di quell'arco creerebbe un ciclo.</li>
          <li className="mb-2"><strong>Componenti Connesse Dinamicamente:</strong> Man mano che si aggiungono archi a un grafo, DSU può mantenere le componenti connesse. Il numero di insiemi disgiunti corrisponde al numero di componenti connesse.</li>
          <li className="mb-2"><strong>Problemi di Percolazione e Connettività su Griglie.</strong></li>
          <li className="mb-2"><strong>Offline Processing di Query:</strong> A volte, query che sembrano richiedere strutture dati complesse possono essere risolte offline (processando tutte le query insieme) usando DSU, ad esempio, query sulla connettività dopo la rimozione di archi (processando al contrario, aggiungendo archi).</li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Varianti e Estensioni (Cenni)</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>DSU con Dati Aggiuntivi:</strong> È possibile memorizzare informazioni aggiuntive per ogni insieme (es. somma degli elementi, valore massimo) e aggiornarle durante le operazioni di unione.</li>
          <li className="mb-2"><strong>DSU Persistente:</strong> Permette di interrogare versioni passate della struttura dati (più avanzato).</li>
          <li className="mb-2"><strong>DSU Bipartita / con Parità:</strong> Per mantenere informazioni sulla bipartiticità o altre proprietà relative.</li>
        </ul>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti a Concetti Prerequisiti e Successivi</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Prerequisito:</strong> Comprensione di base di grafi, alberi e insiemi.</li>
          <li className="mb-2"><strong>Concetto Correlato:</strong> Algoritmi su Grafi (MST, componenti connesse).</li>
          <li className="mb-2"><strong>Concetti Avanzati (Platinum):</strong> DSU persistente, applicazioni più complesse di DSU in problemi di conteggio o con strutture dati aggiuntive. Link-Cut Tree (per connettività dinamica più generale).</li>
        </ul>
      </section>
    </div>
  );
};

export default DSUGoldPage;

