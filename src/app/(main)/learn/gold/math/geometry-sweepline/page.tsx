import React from 'react';

const GeometrySweeplineGoldPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Geometria - Algoritmo Sweepline (Livello Gold)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione all'Algoritmo Sweepline</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo **sweepline** (o linea di spazzamento) è una potente tecnica algoritmica utilizzata principalmente in geometria computazionale per risolvere problemi su un insieme di oggetti geometrici. L'idea centrale è immaginare una linea (la "sweepline") che si muove attraverso il piano (o lo spazio), processando gli oggetti geometrici man mano che li incontra.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Invece di considerare tutte le interazioni tra tutti gli oggetti contemporaneamente (che potrebbe essere O(N<sup>2</sup>) o peggio), la sweepline riduce il problema a una dimensione inferiore, considerando solo gli oggetti che sono "attivi" o intersecano la sweepline in un dato momento. Questo spesso porta a soluzioni più efficienti, tipicamente O(N log N).
        </p>
        <p className="text-lg leading-relaxed">
          Componenti chiave di un algoritmo sweepline:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1"><strong>Eventi:</strong> Punti significativi nel piano dove lo stato della sweepline potrebbe cambiare (es. inizio/fine di un segmento, vertici di un poligono, punti di intersezione). Questi eventi vengono ordinati (solitamente per coordinata x, poi y).</li>
          <li className="mb-1"><strong>Stato della Sweepline (Sweep-Line Status - SLS):</strong> Una struttura dati che mantiene le informazioni sugli oggetti geometrici che intersecano la sweepline nella sua posizione attuale. Questa struttura deve supportare efficientemente inserimenti, cancellazioni e query. Spesso si usa un albero binario bilanciato (es. `std::set` o `std::map` in C++, o un segment tree).</li>
          <li className="mb-1"><strong>Gestione degli Eventi:</strong> Quando la sweepline raggiunge un evento, l'algoritmo aggiorna lo SLS e processa l'evento per calcolare parte della soluzione.</li>
        </ul>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Esempio Classico: Intersezione di Segmenti Orizzontali e Verticali</h2>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Problema:</strong> Dato un insieme di N segmenti orizzontali e M segmenti verticali, trovare tutte le coppie di segmenti (uno orizzontale, uno verticale) che si intersecano.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>Approccio Sweepline:</strong>
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">La sweepline si muove orizzontalmente da sinistra a destra (coordinata x).</li>
          <li className="mb-1"><strong>Eventi:</strong>
            <ul className="list-disc list-inside text-lg leading-relaxed ml-6 mt-1">
              <li>Inizio di un segmento orizzontale (x1, y): tipo 'ADD_HORIZ'.</li>
              <li>Fine di un segmento orizzontale (x2, y): tipo 'REMOVE_HORIZ'.</li>
              <li>Segmento verticale (x, y1, y2): tipo 'QUERY_VERT'.</li>
            </ul>
            Ordina tutti gli eventi per coordinata x. In caso di parità, processa prima gli ADD_HORIZ, poi i QUERY_VERT, poi i REMOVE_HORIZ (per gestire correttamente i segmenti che iniziano/finiscono sulla stessa x di un segmento verticale).
          </li>
          <li className="mb-1"><strong>Stato della Sweepline (SLS):</strong> Una struttura dati (es. un Fenwick tree o un segment tree) che mantiene le coordinate y dei segmenti orizzontali attualmente attivi (cioè, quelli che intersecano la sweepline). Questa struttura deve supportare:
            <ul className="list-disc list-inside text-lg leading-relaxed ml-6 mt-1">
              <li>Aggiunta di una coordinata y.</li>
              <li>Rimozione di una coordinata y.</li>
              <li>Query del numero di y attive in un intervallo [y1, y2].</li>
            </ul>
          </li>
          <li className="mb-1"><strong>Gestione degli Eventi:</strong>
            <ul className="list-disc list-inside text-lg leading-relaxed ml-6 mt-1">
              <li><strong>ADD_HORIZ (x1, y):</strong> Aggiungi `y` allo SLS.</li>
              <li><strong>REMOVE_HORIZ (x2, y):</strong> Rimuovi `y` dallo SLS.</li>
              <li><strong>QUERY_VERT (x, y1, y2):</strong> Interroga lo SLS per trovare quanti segmenti orizzontali attivi hanno la loro coordinata y nell'intervallo `[y1, y2]`. Ognuno di questi è un'intersezione.</li>
            </ul>
          </li>
        </ol>
        <p className="text-lg leading-relaxed">
          Se le coordinate y sono grandi, potrebbe essere necessaria la compressione delle coordinate per lo SLS.
          Complessità: O((N+M) log (N+M)) per l'ordinamento degli eventi + O((N+M) log Y_range) per le operazioni sullo SLS, dove Y_range è il range delle coordinate y (o N dopo compressione).
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>
#include <algorithm>
#include <map> // Per la compressione delle coordinate o un set per lo SLS

// Per uno SLS con Fenwick/Segment tree, si assume che le coordinate y siano compresse
// Qui usiamo un std::map<int, int> come contatore per le y attive per semplicità concettuale
// (non ottimale come un Fenwick tree per range query, ma illustra l'idea)

const int ADD_HORIZ = 0;
const int REMOVE_HORIZ = 1;
const int QUERY_VERT = 2;

struct Event {
  int x;
  int y1, y2; // y1 per orizzontali, [y1, y2] per verticali
  int type;
  int id; // Opzionale, per identificare il segmento

  // Ordinamento: prima per x, poi per tipo (ADD < QUERY < REMOVE)
  bool operator<(const Event& other) const {
    if (x != other.x) return x < other.x;
    return type < other.type;
  }
};

// Esempio di struttura per lo SLS (semplificato con map)
// Un Fenwick tree o Segment tree sarebbe più appropriato per query di range efficienti
std::map<int, int> active_ys_count; // y -> count

void add_y(int y) {
  active_ys_count[y]++;
}

void remove_y(int y) {
  active_ys_count[y]--;
  if (active_ys_count[y] == 0) {
    active_ys_count.erase(y);
  }
}

long long query_range(int y_low, int y_high) {
  long long count = 0;
  // Questo è O(N) nel peggiore dei casi con map. Con Fenwick/Segment tree sarebbe O(log Y_range)
  for (auto const& [y_coord, num] : active_ys_count) {
    if (y_coord >= y_low && y_coord <= y_high) {
      count += num;
    }
  }
  return count;
}

int main() {
  std::vector<Event> events;
  int num_intersections = 0;

  // Esempio: Segmento orizzontale da (1,3) a (5,3)
  events.push_back({1, 3, 0, ADD_HORIZ});
  events.push_back({5, 3, 0, REMOVE_HORIZ});

  // Esempio: Segmento orizzontale da (2,1) a (6,1)
  events.push_back({2, 1, 0, ADD_HORIZ});
  events.push_back({6, 1, 0, REMOVE_HORIZ});

  // Esempio: Segmento verticale da (3,0) a (3,4)
  events.push_back({3, 0, 4, QUERY_VERT});

  // Esempio: Segmento verticale da (5,2) a (5,4)
  events.push_back({5, 2, 4, QUERY_VERT});

  std::sort(events.begin(), events.end());

  for (const auto& event : events) {
    if (event.type == ADD_HORIZ) {
      add_y(event.y1);
      // std::cout << "ADD: x=" << event.x << ", y=" << event.y1 << std::endl;
    } else if (event.type == REMOVE_HORIZ) {
      remove_y(event.y1);
      // std::cout << "REMOVE: x=" << event.x << ", y=" << event.y1 << std::endl;
    } else { // QUERY_VERT
      long long current_intersections = query_range(event.y1, event.y2);
      num_intersections += current_intersections;
      // std::cout << "QUERY: x=" << event.x << ", y_range=[" << event.y1 << "," << event.y2 << "] found " << current_intersections << std::endl;
    }
  }

  std::cout << "Numero totale di intersezioni: " << num_intersections << std::endl;
  // Per l'esempio: (3,0)-(3,4) interseca (1,3)-(5,3) e (2,1)-(6,1) -> 2 intersezioni
  // (5,2)-(5,4) interseca (1,3)-(5,3) -> 1 intersezione (al limite, se REMOVE è dopo QUERY)
  // L'ordinamento degli eventi è cruciale qui.
  // Con l'ordinamento ADD < QUERY < REMOVE:
  // Evento x=3, y1=0, y2=4 (QUERY_VERT):
  //   active_ys_count: {1:1, 3:1}. query_range(0,4) -> 1 (per y=1) + 1 (per y=3) = 2.
  // Evento x=5, y1=3 (REMOVE_HORIZ):
  //   active_ys_count: {1:1}. remove_y(3).
  // Evento x=5, y1=2, y2=4 (QUERY_VERT):
  //   active_ys_count: {1:1}. query_range(2,4) -> 0.
  // Se l'evento di (1,3)-(5,3) fosse rimosso a x=5.0001, o se il segmento verticale fosse a x=4.9999,
  // il risultato cambierebbe. La gestione precisa dei limiti è importante.
  // Se il segmento orizzontale (1,3)-(5,3) viene rimosso a x=5, e il verticale è a x=5,
  // l'intersezione a (5,3) viene contata se QUERY_VERT è processato prima di REMOVE_HORIZ a x=5.

  return 0;
}
`}</code></pre>
        <p class="text-lg leading-relaxed mt-2">
          <strong>Nota sulla gestione dei limiti:</strong> L'ordine di processamento degli eventi con la stessa coordinata x è cruciale. Generalmente: ADD prima di QUERY, QUERY prima di REMOVE. Questo assicura che i segmenti che iniziano/finiscono esattamente sulla x di un segmento verticale siano gestiti correttamente.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Unione di Rettangoli (Area)</h2>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Problema:</strong> Dato un insieme di N rettangoli con lati paralleli agli assi, calcolare l'area totale coperta dalla loro unione.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>Approccio Sweepline:</strong>
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">La sweepline si muove verticalmente dal basso verso l'alto (coordinata y), ma è più comune farla muovere orizzontalmente (coordinata x).
             Assumiamo sweepline orizzontale che si muove da sinistra a destra (coordinata x).</li>
          <li className="mb-1"><strong>Eventi:</strong> Per ogni rettangolo `(x1, y1, x2, y2)` (con `x1 < x2, y1 < y2`):
            <ul className="list-disc list-inside text-lg leading-relaxed ml-6 mt-1">
              <li>Lato sinistro del rettangolo: evento a `x1`, tipo 'ADD_RECT', con intervallo y `[y1, y2]`.</li>
              <li>Lato destro del rettangolo: evento a `x2`, tipo 'REMOVE_RECT', con intervallo y `[y1, y2]`.</li>
            </ul>
            Ordina gli eventi per coordinata x.
          </li>
          <li className="mb-1"><strong>Stato della Sweepline (SLS):</strong> Una struttura dati (tipicamente un **segment tree**) che copre l'intero range delle coordinate y (compresse se necessario). Ogni nodo del segment tree rappresenta un intervallo di y. Per ogni nodo foglia (corrispondente a un intervallo y unitario dopo la compressione), si mantiene:
            <ul className="list-disc list-inside text-lg leading-relaxed ml-6 mt-1">
              <li>`count`: Quanti rettangoli attivi coprono questo intervallo y.</li>
              <li>`covered_length`: La lunghezza dell'intervallo y che è coperta da almeno un rettangolo (cioè, `covered_length` è la lunghezza dell'intervallo y se `count > 0`, altrimenti 0).</li>
            </ul>
            I nodi interni del segment tree aggregano `covered_length` dai figli. La radice del segment tree darà la lunghezza totale sull'asse y attualmente coperta da rettangoli attivi.
          </li>
          <li className="mb-1"><strong>Gestione degli Eventi:</strong>
            <ul className="list-disc list-inside text-lg leading-relaxed ml-6 mt-1">
              <li>Sia `x_prev` la coordinata x dell'evento precedente e `x_curr` la coordinata x dell'evento attuale.</li>
              <li>L'area aggiunta tra `x_prev` e `x_curr` è `(lunghezza_y_coperta_dallo_SLS) * (x_curr - x_prev)`. Aggiungi questo all'area totale.</li>
              <li>Processa l'evento a `x_curr`:
                <ul className="list-disc list-inside text-lg leading-relaxed ml-8 mt-1">
                  <li><strong>ADD_RECT (x1, [y1, y2]):</strong> Incrementa `count` per l'intervallo `[y1, y2]` nel segment tree. Aggiorna `covered_length` nel segment tree.</li>
                  <li><strong>REMOVE_RECT (x2, [y1, y2]):</strong> Decrementa `count` per l'intervallo `[y1, y2]` nel segment tree. Aggiorna `covered_length` nel segment tree.</li>
                </ul>
              </li>
              <li>Aggiorna `x_prev = x_curr`.</li>
            </ul>
          </li>
        </ol>
        <p className="text-lg leading-relaxed">
          La compressione delle coordinate y è quasi sempre necessaria. Il segment tree opererà sugli indici delle coordinate y compresse.
          Complessità: O(N log N) per l'ordinamento e O(N log Y_coords) per le operazioni sul segment tree.
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">L'implementazione di un segment tree per l'unione di rettangoli è complessa e va oltre un semplice esempio qui, ma l'idea concettuale è quella descritta.</p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Altre Applicazioni Comuni</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Closest Pair of Points:</strong> Un classico problema risolvibile con sweepline (anche se l'approccio divide et impera è più comune). La sweepline si muove sull'asse x, mantenendo i punti in una striscia attorno alla sweepline ordinati per y.</li>
          <li className="mb-2"><strong>Intersezione Generale di Segmenti (Bentley-Ottmann):</strong> Trovare tutte le intersezioni tra un insieme di N segmenti qualsiasi. Gli eventi sono gli estremi dei segmenti e i punti di intersezione trovati dinamicamente. Lo SLS mantiene i segmenti che intersecano la sweepline, ordinati per y. Quando si inserisce/rimuove un segmento, si controllano le intersezioni con i suoi vicini nello SLS. Complessità O((N+K) log N), dove K è il numero di intersezioni.</li>
          <li className="mb-2"><strong>Costruzione di Diagrammi di Voronoi (Fortune's Algorithm):</strong> Un algoritmo sweepline più avanzato.</li>
        </ul>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti a Concetti Prerequisiti e Successivi</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Prerequisito:</strong> <a href="./geometry-basics" className="text-blue-600 dark:text-blue-400 hover:underline">Geometria - Basi (Gold)</a> (punti, linee, segmenti, intersezioni base).</li>
          <li className="mb-2"><strong>Prerequisito:</strong> Strutture dati come alberi binari bilanciati (`std::set`), Fenwick tree, Segment tree.</li>
          <li className="mb-2"><strong>Prerequisito:</strong> Ordinamento, compressione delle coordinate.</li>
          <li className="mb-2"><strong>Concetti Avanzati (Platinum):</strong> Algoritmi sweepline più complessi, strutture dati geometriche avanzate (es. K-D tree, range tree), problemi di sweepline in 3D. Molti problemi nella sezione "Range Queries with Sweep Line" di USACO Guide Platinum.</li>
        </ul>
      </section>
    </div>
  );
};

export default GeometrySweeplineGoldPage;

