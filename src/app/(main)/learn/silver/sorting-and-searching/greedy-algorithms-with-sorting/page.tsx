import React from 'react';

const GreedyWithSortingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Algoritmi Greedy con Ordinamento (Livello Silver)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Spiegazione Iniziale del Concetto</h2>
        <p className="text-lg leading-relaxed mb-4">
          Gli **algoritmi greedy** (o avidi) sono un approccio alla risoluzione dei problemi che consiste nel fare la scelta che sembra ottimale a livello locale in ogni fase, nella speranza di trovare una soluzione ottimale globale. Non sempre un approccio greedy porta alla soluzione ottimale globale, ma per una certa classe di problemi, funziona sorprendentemente bene.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Molti problemi risolvibili con un approccio greedy richiedono, come passo preliminare cruciale, l'**ordinamento** dei dati di input secondo un criterio specifico. L'ordinamento aiuta a strutturare il problema in modo tale che la scelta greedy locale diventi più ovvia o più facile da dimostrare corretta.
        </p>
        <p className="text-lg leading-relaxed">
          In questa lezione, esploreremo come l'ordinamento può essere combinato con strategie greedy per risolvere vari problemi, tipicamente incontrati a livello USACO Silver.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Ragionamento Preliminare: Perché Ordinare?</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'ordinamento trasforma un insieme disordinato di elementi in una sequenza strutturata. Questa struttura può rivelare proprietà o relazioni che rendono più semplice l'applicazione di una strategia greedy. Ad esempio:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Processare elementi in un ordine specifico:</strong> Ordinare per tempo di inizio/fine, per peso, per dimensione, ecc., permette di considerare gli elementi in un ordine che facilita la decisione greedy.</li>
          <li className="mb-2"><strong>Identificare candidati migliori:</strong> Dopo l'ordinamento, il "miglior" candidato per la scelta greedy corrente (es. l'intervallo più corto, l'elemento più leggero) è spesso all'inizio o alla fine della sequenza ordinata.</li>
          <li className="mb-2"><strong>Semplificare le condizioni:</strong> L'ordinamento può semplificare le condizioni che devono essere verificate per fare una scelta greedy.</li>
          <li className="mb-2"><strong>Dimostrazione di correttezza (Exchange Argument):</strong> Spesso, la correttezza di un algoritmo greedy che coinvolge l'ordinamento può essere dimostrata usando un "exchange argument" (argomento di scambio). Si assume che esista una soluzione ottimale che non segue la scelta greedy, e si mostra che si può trasformare questa soluzione in una altrettanto buona (o migliore) che *fa* la scelta greedy, senza peggiorare il risultato. L'ordinamento è spesso chiave in queste dimostrazioni.</li>
        </ul>
        <p className="text-lg leading-relaxed">
          La sfida principale è identificare il **corretto criterio di ordinamento** e la **corretta scelta greedy** da fare in ogni passo.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Soluzione Guidata: Esempi Classici</h2>
        
        <h3 className="text-2xl font-semibold mt-4 mb-2">Esempio 1: Activity Selection Problem (Selezione delle Attività)</h3>
        <p className="text-lg leading-relaxed mb-3">
          <strong>Problema:</strong> Date N attività, ognuna con un tempo di inizio `s_i` e un tempo di fine `f_i`, selezionare il massimo numero di attività non sovrapposte che possono essere eseguite da una singola persona (o su una singola risorsa).
        </p>
        <p className="text-lg leading-relaxed mb-3">
          <strong>Strategia Greedy con Ordinamento:</strong>
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-3">
          <li className="mb-1">Ordina le attività in base al loro **tempo di fine** crescente.</li>
          <li className="mb-1">Seleziona la prima attività nell'elenco ordinato (quella che finisce prima).</li>
          <li className="mb-1">Scorri le restanti attività ordinate. Per ogni attività, se il suo tempo di inizio è maggiore o uguale al tempo di fine dell'ultima attività selezionata, seleziona questa attività.</li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>
#include <algorithm> // Per std::sort

struct Activity {
  int id;
  int start_time;
  int end_time;
};

// Comparatore per ordinare le attività per tempo di fine crescente
bool compareActivities(const Activity& a, const Activity& b) {
  return a.end_time < b.end_time;
}

int main() {
  std::vector<Activity> activities = {
    {1, 1, 4}, {2, 3, 5}, {3, 0, 6}, {4, 5, 7}, {5, 3, 9}, {6, 5, 9}, {7, 6, 10}, {8, 8, 11}, {9, 8, 12}, {10, 2, 14}, {11, 12, 16}
  };

  std::sort(activities.begin(), activities.end(), compareActivities);

  std::vector<Activity> selected_activities;
  if (activities.empty()) {
    std::cout << "Nessuna attività da selezionare." << std::endl;
    return 0;
  }

  selected_activities.push_back(activities[0]); // Seleziona la prima attività (quella che finisce prima)
  int last_finish_time = activities[0].end_time;

  for (size_t i = 1; i < activities.size(); ++i) {
    if (activities[i].start_time >= last_finish_time) {
      selected_activities.push_back(activities[i]);
      last_finish_time = activities[i].end_time;
    }
  }

  std::cout << "Numero massimo di attività selezionate: " << selected_activities.size() << std::endl;
  std::cout << "Attività selezionate (ID): ";
  for (const auto& act : selected_activities) {
    std::cout << act.id << " (S:" << act.start_time << ", F:" << act.end_time << ") ";
  }
  std::cout << std::endl;
  // Output atteso (può variare leggermente se ci sono più attività con lo stesso end_time, ma il numero dovrebbe essere 4):
  // Numero massimo di attività selezionate: 4
  // Attività selezionate (ID): 1 (S:1, F:4) 4 (S:5, F:7) 8 (S:8, F:11) 11 (S:12, F:16) 
  return 0;
}`} 
        </code></pre>
        <p className="text-lg leading-relaxed mt-3">
          <strong>Perché ordinare per tempo di fine?</strong> Scegliendo l'attività che finisce prima, lasciamo più tempo disponibile per le attività successive. Questa scelta locale "libera la risorsa il prima possibile", che si dimostra essere globalmente ottimale.
        </p>

        <h3 className="text-2xl font-semibold mt-6 mb-2">Esempio 2: Problema dello Zaino Frazionario (Fractional Knapsack)</h3>
        <p className="text-lg leading-relaxed mb-3">
          <strong>Problema:</strong> Hai uno zaino con capacità massima `W` e N oggetti. Ogni oggetto `i` ha un valore `v_i` e un peso `w_i`. Puoi prendere frazioni di oggetti. L'obiettivo è massimizzare il valore totale degli oggetti nello zaino.
        </p>
        <p className="text-lg leading-relaxed mb-3">
          <strong>Strategia Greedy con Ordinamento:</strong>
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-3">
          <li className="mb-1">Calcola il rapporto valore/peso (`v_i / w_i`) per ogni oggetto. Questo rappresenta il "valore per unità di peso".</li>
          <li className="mb-1">Ordina gli oggetti in base a questo rapporto in ordine **decrescente**.</li>
          <li className="mb-1">Scorri gli oggetti ordinati. Per ogni oggetto, prendine il più possibile (fino a esaurire l'oggetto o la capacità residua dello zaino).</li>
        </ol>
        {/* Implementazione C++ per Zaino Frazionario omessa per brevità, ma il concetto è chiaro */} 
        <p className="text-lg leading-relaxed mt-3">
          <strong>Perché ordinare per rapporto valore/peso?</strong> Intuitivamente, vogliamo dare priorità agli oggetti che offrono il maggior valore per ogni unità di peso che occupano. Questa strategia massimizza il valore totale.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Dimostrazione di Correttezza (Idea Generale con Exchange Argument)</h2>
        <p className="text-lg leading-relaxed mb-4">
          Per molti algoritmi greedy basati sull'ordinamento, la correttezza si dimostra con un "exchange argument". L'idea è:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Assumi che la tua strategia greedy `G` produca una soluzione `S_G`.</li>
          <li className="mb-1">Assumi che esista una soluzione ottimale `S_OPT` diversa da `S_G`.</li>
          <li className="mb-1">Trova il primo punto in cui `S_G` e `S_OPT` differiscono. Cioè, `S_G` fa una scelta `x` e `S_OPT` fa una scelta `y` (o non fa `x`).</li>
          <li className="mb-1">Mostra che puoi modificare `S_OPT` "scambiando" `y` con `x` (o aggiungendo `x` e rimuovendo qualcos'altro) per ottenere una nuova soluzione `S'_OPT` che è ancora ottimale (o non peggiore) e che è "più simile" a `S_G`.</li>
          <li className="mb-1">Ripetendo questo processo, puoi trasformare `S_OPT` in `S_G` senza peggiorare la qualità della soluzione, dimostrando che `S_G` è anch'essa ottimale.</li>
        </ol>
        <p className="text-lg leading-relaxed">
          L'ordinamento è cruciale qui perché spesso garantisce che la scelta greedy `x` sia, in qualche modo misurabile, "non peggiore" o "preferibile" alla scelta `y` fatta da `S_OPT` in quel punto.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Analisi della Complessità</h2>
        <p className="text-lg leading-relaxed mb-4">
          La complessità di un algoritmo greedy che coinvolge l'ordinamento è solitamente dominata dal passo di ordinamento stesso.
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Ordinamento: O(N log N) usando un algoritmo efficiente come `std::sort`.</li>
          <li className="mb-1">Passo Greedy: Solitamente una singola passata attraverso i dati ordinati, che costa O(N).</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Quindi, la complessità temporale totale è tipicamente **O(N log N)**.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Problemi USACO Comuni e Suggerimenti</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>USACO Silver: "Convention" / "Convention II"</strong> - Problemi che coinvolgono l'assegnazione di mucche a bus o eventi a risorse, spesso ordinando per tempi di arrivo o altre priorità.</li>
          <li className="mb-2"><strong>USACO Silver: "Lemonade Line"</strong> - Le mucche aspettano in fila; ordinare per il loro requisito di attesa può portare a una soluzione greedy.</li>
          <li className="mb-2"><strong>USACO Silver: "High Card Low Card"</strong> - Problemi di abbinamento di carte dove ordinare le carte di Bessie e Elsie è un primo passo fondamentale.</li>
          <li className="mb-2"><strong>Quando sospettare un greedy con ordinamento:</strong>
            <ul className="list-disc list-inside text-lg leading-relaxed ml-6 mt-1">
              <li>Il problema chiede di massimizzare/minimizzare una quantità selezionando un sottoinsieme di elementi.</li>
              <li>C'è un senso di "priorità" o "urgenza" (es. finire prima, costo minore, valore maggiore per unità).</li>
              <li>Una volta fatta una scelta, questa non influenza retroattivamente le scelte passate in modo complesso (proprietà della scelta greedy).</li>
            </ul>
          </li>
          <li className="mb-2"><strong>Sperimenta con diversi criteri di ordinamento:</strong> Se un criterio non funziona, prova a pensare se un altro ordine potrebbe rendere la scelta greedy più chiara. Ad esempio, per intervalli, potresti ordinare per inizio, per fine, per lunghezza, ecc.</li>
        </ul>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti a Concetti Prerequisiti e Successivi</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Prerequisito:</strong> <a href="./introduction-to-sorting" className="text-blue-600 dark:text-blue-400 hover:underline">Ordinamento</a> (fondamentale).</li>
          <li className="mb-2"><strong>Prerequisito:</strong> <a href="./custom-comparators-and-coordinate-compression" className="text-blue-600 dark:text-blue-400 hover:underline">Comparatori Personalizzati</a> (spesso necessari per ordinare struct/oggetti secondo il criterio greedy).</li>
          <li className="mb-2"><strong>Concetto Base:</strong> <a href="../../bronze/additional-bronze/introduction-to-greedy-algorithms" className="text-blue-600 dark:text-blue-400 hover:underline">Introduzione agli Algoritmi Greedy (Bronze)</a>.</li>
          <li className="mb-2"><strong>Strutture Dati Utili:</strong> <a href="./priority-queues" className="text-blue-600 dark:text-blue-400 hover:underline">Code Prioritarie (Priority Queues)</a>, che implementano intrinsecamente una forma di scelta greedy (prendere sempre l'elemento con priorità massima/minima).</li>
          <li className="mb-2"><strong>Tecniche Avanzate:</strong> Programmazione Dinamica (quando il greedy fallisce, la DP potrebbe essere la soluzione).</li>
        </ul>
      </section>
    </div>
  );
};

export default GreedyWithSortingPage;

