import React from 'react';

const CustomComparatorsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Comparatori Personalizzati e Compressione delle Coordinate (Livello Silver)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Parte 1: Comparatori Personalizzati</h2>
        
        <h3 className="text-2xl font-semibold mt-4 mb-2">1. Spiegazione Iniziale del Concetto</h3>
        <p className="text-lg leading-relaxed mb-4">
          Quando usiamo funzioni di ordinamento come `std::sort` in C++, o strutture dati che mantengono l'ordine come `std::set` e `std::map`, queste si basano su un criterio di confronto predefinito (solitamente l'operatore `&lt;` per l'ordine crescente). Tuttavia, ci sono molte situazioni in cui abbiamo bisogno di ordinare oggetti complessi (come struct o classi) o secondo un criterio non standard.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Un **comparatore personalizzato** (o custom comparator) è una funzione o un oggetto funzione che forniamo a questi algoritmi/strutture dati per definire come due elementi debbano essere confrontati. Questo ci dà un controllo بسیار flessibile sull'ordinamento.
        </p>

        <h3 className="text-2xl font-semibold mt-4 mb-2">2. Ragionamento Preliminare</h3>
        <p className="text-lg leading-relaxed mb-4">
          Un comparatore, per `std::sort` e simili, deve implementare una relazione di "ordine debole stretto" (strict weak ordering). In termini più semplici, se abbiamo una funzione `compare(a, b)`, questa deve restituire `true` se `a` deve venire **prima** di `b` nell'ordinamento, e `false` altrimenti. Non deve restituire `true` se `a` e `b` sono considerati equivalenti secondo il criterio di ordinamento.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Ad esempio, se vogliamo ordinare in ordine decrescente, `compare(a, b)` dovrebbe restituire `true` se `a > b`.
          Se vogliamo ordinare una struct `Punto` prima per coordinata `x` e poi per `y` (in caso di parità di `x`), il comparatore dovrà riflettere questa logica a due livelli.
        </p>

        <h3 className="text-2xl font-semibold mt-4 mb-2">3. Soluzione Guidata: Implementazione</h3>
        <p className="text-lg leading-relaxed mb-3">
          Ci sono tre modi principali per fornire un comparatore personalizzato a `std::sort`:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-3">
          <li className="mb-2"><strong>Funzione Booleana Separata:</strong></li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mb-4"><code className="language-cpp">
{`#include <iostream>
#include <vector>
#include <algorithm>

struct Event {
  int time;
  int type; // es. 0 per inizio, 1 per fine
  int id;
};

// Comparatore: ordina per tempo, poi per tipo (inizio prima di fine se tempi uguali)
bool compareEvents(const Event& a, const Event& b) {
  if (a.time != b.time) {
    return a.time < b.time; // Ordina per tempo crescente
  }
  // Se i tempi sono uguali, un evento di "inizio" (type 0) viene prima di "fine" (type 1)
  return a.type < b.type; 
}

int main() {
  std::vector<Event> events = {{5, 0, 1}, {2, 1, 2}, {5, 1, 3}, {2, 0, 4}};
  std::sort(events.begin(), events.end(), compareEvents);
  for (const auto& e : events) {
    std::cout << "Time: " << e.time << ", Type: " << e.type << ", ID: " << e.id << std::endl;
  }
  /* Output:
  Time: 2, Type: 0, ID: 4
  Time: 2, Type: 1, ID: 2
  Time: 5, Type: 0, ID: 1
  Time: 5, Type: 1, ID: 3
  */
  return 0;
}`} 
        </code></pre>
        <ol start={2} className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-3">
          <li className="mb-2"><strong>Funzione Lambda (C++11 e successivi):</strong> Molto comodo per comparatori semplici definiti inline.</li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mb-4"><code className="language-cpp">
{`// ... (struct Event come sopra)
std::vector<Event> events = {{5, 0, 1}, {2, 1, 2}, {5, 1, 3}, {2, 0, 4}};
std::sort(events.begin(), events.end(), [](const Event& a, const Event& b) {
  if (a.time != b.time) {
    return a.time < b.time;
  }
  return a.type < b.type;
});
// ... (stampa come sopra)`} 
        </code></pre>
        <ol start={3} className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-3">
          <li className="mb-2"><strong>Overloading dell'operatore `&lt;` nella struct/classe:</strong> Se l'ordinamento naturale per quella struct/classe è sempre lo stesso, puoi sovraccaricare `operator&lt;`. `std::sort` lo userà di default.</li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`struct Event {
  int time;
  int type;
  int id;

  // Overload dell'operatore <
  bool operator<(const Event& other) const {
    if (time != other.time) {
      return time < other.time;
    }
    return type < other.type;
  }
};

// ...
std::vector<Event> events = {{5, 0, 1}, {2, 1, 2}, {5, 1, 3}, {2, 0, 4}};
std::sort(events.begin(), events.end()); // Usa l'operator< definito
// ... (stampa come sopra)`} 
        </code></pre>

        <h3 className="text-2xl font-semibold mt-4 mb-2">4. Visualizzazione dell'Esecuzione</h3>
        <p className="text-lg leading-relaxed mb-4">
          L'output dell'esempio con gli eventi mostra chiaramente come il comparatore personalizzato ordini prima per `time` e poi, in caso di parità di `time`, per `type`. Questo tipo di ordinamento è cruciale in molti algoritmi, come quelli basati su "sweep line" (linea di scansione).
        </p>

        <h3 className="text-2xl font-semibold mt-4 mb-2">5. Analisi della Complessità</h3>
        <p className="text-lg leading-relaxed mb-4">
          L'uso di un comparatore personalizzato non cambia la complessità dell'algoritmo di ordinamento stesso (es. `std::sort` rimane O(N log N)). Tuttavia, il comparatore viene chiamato O(N log N) volte, quindi la sua efficienza è importante. Un comparatore che esegue operazioni costose può rallentare significativamente l'ordinamento.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Parte 2: Compressione delle Coordinate</h2>

        <h3 className="text-2xl font-semibold mt-4 mb-2">1. Spiegazione Iniziale del Concetto</h3>
        <p className="text-lg leading-relaxed mb-4">
          La **compressione delle coordinate** è una tecnica utilizzata quando i valori effettivi delle coordinate (o altri numeri) in un problema sono grandi, ma il numero di coordinate distinte che ci interessano è relativamente piccolo. L'idea è di mappare questi valori grandi a un insieme più piccolo di interi consecutivi (solitamente da 0 a K-1, dove K è il numero di valori distinti), preservando il loro ordine relativo.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Ad esempio, se le coordinate x rilevanti in un problema sono {10, 500, 2, 1000000, 500}, i valori distinti ordinati sono {2, 10, 500, 1000000}. Possiamo mapparli a {0, 1, 2, 3}. Questo è utile se dobbiamo usare queste coordinate come indici in array o strutture dati (come Segment Tree o Fenwick Tree) che funzionano meglio con indici piccoli.
        </p>

        <h3 className="text-2xl font-semibold mt-4 mb-2">2. Ragionamento Preliminare</h3>
        <p className="text-lg leading-relaxed mb-4">
          Perché comprimere? Se le coordinate possono arrivare fino a 10^9, non possiamo creare un array di quella dimensione. Ma se ci sono solo N (es. N <= 2*10^5) coordinate rilevanti, possiamo lavorare con queste N coordinate mappate a indici da 0 a N-1 (o simile).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il processo tipico è:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Colleziona tutte le coordinate rilevanti dal tuo input.</li>
          <li className="mb-1">Ordinale e rimuovi i duplicati per ottenere un elenco di valori unici ordinati.</li>
          <li className="mb-1">Per ogni coordinata originale, trova la sua nuova posizione (indice) in questo elenco di valori unici. Questa è la sua coordinata compressa.</li>
        </ol>

        <h3 className="text-2xl font-semibold mt-4 mb-2">3. Soluzione Guidata: Implementazione</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>
#include <algorithm> // Per std::sort, std::unique, std::lower_bound
#include <map> // Alternativa per mappare

// Funzione per ottenere le coordinate compresse
std::vector<int> compressCoordinates(const std::vector<int>& original_coords, std::vector<int>& distinct_sorted_coords) {
  distinct_sorted_coords = original_coords;
  
  // 1. Ordina e rimuovi duplicati
  std::sort(distinct_sorted_coords.begin(), distinct_sorted_coords.end());
  distinct_sorted_coords.erase(
    std::unique(distinct_sorted_coords.begin(), distinct_sorted_coords.end()),
    distinct_sorted_coords.end()
  );
  // Ora distinct_sorted_coords contiene tutti i valori unici in ordine crescente

  std::vector<int> compressed_coords(original_coords.size());
  for (size_t i = 0; i < original_coords.size(); ++i) {
    // 2. Trova l'indice della coordinata originale nell'elenco dei distinti
    // lower_bound restituisce un iteratore al primo elemento >= original_coords[i]
    // Poiché distinct_sorted_coords contiene original_coords[i], questo è l'iteratore a original_coords[i]
    // La distanza da .begin() ci dà l'indice (0-based)
    compressed_coords[i] = std::lower_bound(distinct_sorted_coords.begin(), distinct_sorted_coords.end(), original_coords[i]) 
                           - distinct_sorted_coords.begin();
  }
  return compressed_coords;
}

int main() {
  std::vector<int> x_coords = {100, 20, 500, 20, 800, 100};
  std::vector<int> distinct_x; // Verrà popolato dalla funzione
  
  std::vector<int> compressed_x = compressCoordinates(x_coords, distinct_x);

  std::cout << "Coordinate Originali X: ";
  for (int x : x_coords) std::cout << x << " ";
  std::cout << std::endl;

  std::cout << "Coordinate X Distinte Ordinate: ";
  for (int x : distinct_x) std::cout << x << " "; // Output: 20 100 500 800
  std::cout << std::endl;

  std::cout << "Coordinate X Compresse: ";
  for (int cx : compressed_x) std::cout << cx << " "; // Output: 1 0 2 0 3 1
  std::cout << std::endl;

  // Esempio con eventi che usano coordinate (es. sweep line)
  struct Segment { int x1, x2, y; };
  std::vector<Segment> segments = {{10, 100, 5}, {50, 150, 8}, {120, 200, 3}};
  std::vector<int> all_x_coords_for_segments;
  for(const auto& seg : segments) {
      all_x_coords_for_segments.push_back(seg.x1);
      all_x_coords_for_segments.push_back(seg.x2);
  }
  std::vector<int> distinct_segment_x;
  std::vector<int> compressed_segment_x_indices = compressCoordinates(all_x_coords_for_segments, distinct_segment_x);
  // Ora puoi usare gli indici compressi per operare su un Segment Tree o Fenwick Tree
  // la cui dimensione è legata a distinct_segment_x.size()
  std::cout << "\nValori X distinti per segmenti: ";
  for(int val : distinct_segment_x) std::cout << val << " "; // 10 50 100 120 150 200
  std::cout << std::endl;
  return 0;
}`} 
        </code></pre>

        <h3 className="text-2xl font-semibold mt-4 mb-2">4. Visualizzazione dell'Esecuzione</h3>
        <p className="text-lg leading-relaxed mb-4">
          Nell'esempio, `x_coords = {100, 20, 500, 20, 800, 100}`.
          <br/>1. Valori distinti ordinati (`distinct_x`): `{20, 100, 500, 800}`.
          <br/>2. Mappatura:
          <br/>   - 100 è al_indice 1 in `distinct_x` -> compresso a 1.
          <br/>   - 20 è al_indice 0 in `distinct_x` -> compresso a 0.
          <br/>   - 500 è al_indice 2 in `distinct_x` -> compresso a 2.
          <br/>   - 20 è al_indice 0 in `distinct_x` -> compresso a 0.
          <br/>   - 800 è al_indice 3 in `distinct_x` -> compresso a 3.
          <br/>   - 100 è al_indice 1 in `distinct_x` -> compresso a 1.
          <br/>Risultato: `compressed_x = {1, 0, 2, 0, 3, 1}`.
        </p>

        <h3 className="text-2xl font-semibold mt-4 mb-2">5. Analisi della Complessità</h3>
        <p className="text-lg leading-relaxed mb-4">
          Se ci sono N coordinate originali:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Ordinamento: O(N log N).</li>
          <li className="mb-1">`std::unique`: O(N).</li>
          <li className="mb-1">Loop per mappare con `std::lower_bound`: N chiamate a `lower_bound`. Ogni `lower_bound` su un array di al più N elementi distinti costa O(log N). Totale: O(N log N).</li>
        </ul>
        <p className="text-lg leading-relaxed">
          La complessità totale della compressione delle coordinate è dominata da O(N log N).
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Applicazioni e Problemi Comuni</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Comparatori Personalizzati:</strong>
            <ul className="list-disc list-inside text-lg leading-relaxed ml-6 mt-1">
              <li>Ordinare punti per x, poi per y.</li>
              <li>Ordinare intervalli per tempo di inizio, o per tempo di fine (Activity Selection).</li>
              <li>Ordinare stringhe in modo case-insensitive o per lunghezza.</li>
              <li>In algoritmi greedy dove l'ordine di processamento degli elementi è cruciale.</li>
              <li>Usati con `std::priority_queue` per definire l'ordine degli elementi.</li>
            </ul>
          </li>
          <li className="mb-2"><strong>Compressione delle Coordinate:</strong>
            <ul className="list-disc list-inside text-lg leading-relaxed ml-6 mt-1">
              <li>Problemi di geometria dove le coordinate sono grandi ma il loro numero è piccolo (es. USACO Silver/Gold "Rectangular Pasture", problemi di sweep line).</li>
              <li>Quando si usano strutture dati basate su array/indici (Segment Tree, Fenwick Tree, DSU) su valori che non sono piccoli interi consecutivi.</li>
              <li>Problemi dove solo l'ordine relativo dei valori conta, non i valori assoluti.</li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti a Concetti Prerequisiti e Successivi</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Prerequisito (per entrambi):</strong> <a href="../introduction-to-sorting" className="text-blue-600 dark:text-blue-400 hover:underline">Ordinamento (uso di `std::sort`)</a>.</li>
          <li className="mb-2"><strong>Prerequisito (per compressione):</strong> `std::vector`, `std::unique`, `std::lower_bound`.</li>
          <li className="mb-2"><strong>Concetto Correlato (comparatori):</strong> Oggetti Funzione (Functors) in C++.</li>
          <li className="mb-2"><strong>Applicazione (compressione):</strong> Algoritmi Sweep Line, Segment Trees, Fenwick Trees (argomenti Gold/Platinum).</li>
        </ul>
      </section>
    </div>
  );
};

export default CustomComparatorsPage;

