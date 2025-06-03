import React from 'react';

const SimulationPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Simulazione (Livello Bronze)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Teoria: Cos'è la Simulazione?</h2>
        <p className="text-lg leading-relaxed mb-4">
          Nel contesto della programmazione competitiva, la **simulazione** si riferisce al processo di tradurre direttamente le regole e i passaggi di un problema in codice. Invece di cercare un trucco matematico o un algoritmo complesso, si "simula" semplicemente ciò che il problema descrive, passo dopo passo. Questo approccio è spesso il più intuitivo e diretto, specialmente per i problemi di livello Bronze.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          I problemi di simulazione di solito descrivono un processo o un insieme di eventi che si verificano nel tempo o in una sequenza specifica. Il tuo compito è scrivere un programma che imiti fedelmente questo processo per arrivare alla risposta finale. La chiave è leggere attentamente il problema, identificare tutti gli stati, le transizioni e le condizioni, e implementarli meticolosamente.
        </p>
        <p className="text-lg leading-relaxed">
          Nonostante la loro apparente semplicità, i problemi di simulazione possono diventare complicati se ci sono molti dettagli da gestire o casi limite da considerare. È fondamentale essere organizzati, testare il codice con vari input e prestare attenzione ai vincoli del problema (ad esempio, il numero massimo di passaggi della simulazione o la dimensione dei dati).
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Implementazioni ed Esempi in C++</h2>
        <p className="text-lg mb-4 leading-relaxed">
          Vediamo un esempio classico di problema di simulazione: il problema "The Bucket List" da USACO 2018 December Contest, Bronze.
        </p>
        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">Esempio: USACO "The Bucket List"</h3>
          <p className="text-lg leading-relaxed mb-3">
            <strong>Problema:</strong> Farmer John ha N mucche. Per ogni mucca, conosciamo l'ora di inizio (s_i), l'ora di fine (t_i) in cui ha bisogno di essere munta, e il numero di secchi (b_i) che richiede durante quel periodo. Farmer John ha un numero illimitato di postazioni di mungitura, ma un numero limitato di secchi. Qual è il numero massimo di secchi di cui Farmer John ha bisogno contemporaneamente in qualsiasi momento?
          </p>
          <p className="text-lg leading-relaxed mb-3">
            <strong>Approccio di Simulazione:</strong> Possiamo simulare il passare del tempo. Creiamo un array (o un vector) che rappresenti la linea temporale (ad esempio, dall'ora 1 all'ora massima menzionata nell'input, diciamo 1000). Per ogni mucca, iteriamo nel suo intervallo di mungitura [s_i, t_i) e aggiungiamo b_i secchi al conteggio per ciascuna di quelle ore. Infine, troviamo il valore massimo in questo array temporale.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>
#include <algorithm> // Per std::max

struct Event {
  int time;
  int buckets_needed;
  int start_time;
  int end_time;
};

int main() {
  // std::ios_base::sync_with_stdio(false);
  // std::cin.tie(NULL);
  // freopen("blist.in", "r", stdin);
  // freopen("blist.out", "w", stdout);

  int n;
  std::cin >> n;

  // Usiamo un array per tracciare i secchi necessari in ogni momento.
  // I tempi vanno da 1 a 1000 secondo i vincoli del problema.
  std::vector<int> timeline(1001, 0); // Indici da 0 a 1000

  for (int i = 0; i < n; ++i) {
    int s, t, b;
    std::cin >> s >> t >> b;
    // Per ogni ora nell'intervallo [s, t-1], aggiungiamo b secchi.
    // Nota: il problema di solito intende intervalli inclusivi all'inizio ed esclusivi alla fine,
    // o richiede un'attenta interpretazione. Per questo esempio, assumiamo [s, t-1].
    for (int time_unit = s; time_unit < t; ++time_unit) {
      timeline[time_unit] += b;
    }
  }

  int max_buckets = 0;
  for (int i = 1; i <= 1000; ++i) {
    if (timeline[i] > max_buckets) {
      max_buckets = timeline[i];
    }
  }
  // Alternativa più concisa:
  // for (int buckets_at_time_i : timeline) {
  //   max_buckets = std::max(max_buckets, buckets_at_time_i);
  // }

  std::cout << max_buckets << std::endl;

  return 0;
}`} 
          </code></pre>
          <p className="text-lg leading-relaxed mt-3">
            <strong>Nota:</strong> Le righe commentate per `freopen` sono tipiche per i contest USACO per leggere da file `blist.in` e scrivere su `blist.out`. Per testare localmente, puoi commentarle e usare l'input/output standard.
          </p>
        </div>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Analisi della Complessità</h2>
        <p className="text-lg leading-relaxed mb-4">
          La complessità di un algoritmo di simulazione dipende direttamente da quanti passaggi la simulazione deve eseguire e quanto costa ogni passaggio.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Nell'esempio "The Bucket List":
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2">Leggere l'input: O(N), dove N è il numero di mucche.</li>
          <li className="mb-2">Iterare sugli eventi di mungitura: Per ogni mucca, iteriamo al massimo T_max volte (dove T_max è l'ora massima, 1000 nel nostro caso). Quindi, questo ciclo è O(N * T_max).</li>
          <li className="mb-2">Trovare il massimo nell'array timeline: O(T_max).</li>
        </ul>
        <p className="text-lg leading-relaxed">
          La complessità dominante è O(N * T_max). Dati i vincoli tipici di USACO Bronze (N <= 100, T_max <= 1000), N * T_max è circa 100 * 1000 = 100,000, che è ben entro i limiti di tempo (solitamente 1-2 secondi, che permettono circa 10^8 operazioni).
        </p>
        <p className="text-lg leading-relaxed mt-2">
          È sempre cruciale analizzare la complessità per assicurarsi che la simulazione non sia troppo lenta per i vincoli dati.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Esempi Pratici e Strategie</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Problemi basati su griglie:</strong> Molti problemi di simulazione coinvolgono il movimento su una griglia 2D (es. un robot che si muove, un gioco come la diffusione di un incendio). Si usano array 2D per rappresentare la griglia e si aggiornano le celle in base alle regole.</li>
          <li className="mb-2"><strong>Problemi basati sul tempo o su turni:</strong> Giochi o processi che evolvono in turni discreti. Si usa un ciclo per simulare ogni turno, aggiornando lo stato del sistema.</li>
          <li className="mb-2"><strong>Gestione attenta degli stati:</strong> Identifica chiaramente tutte le variabili che definiscono lo stato del tuo sistema in ogni momento della simulazione.</li>
          <li className="mb-2"><strong>Casi limite:</strong> Pensa ai casi estremi. Cosa succede se l'input è vuoto? Cosa succede se tutti i valori sono uguali? Cosa succede all'inizio o alla fine del processo?</li>
          <li className="mb-2"><strong>Debugging:</strong> Stampa lo stato del sistema a intervalli regolari durante la simulazione per verificare che si stia comportando come previsto. Questo è incredibilmente utile per trovare bug.</li>
        </ul>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Esercizi Correlati</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2">USACO Bronze: "Mowing the Field" (simulazione di movimento su griglia).</li>
          <li className="mb-2">USACO Bronze: "The Lost Cow" (simulazione di movimento avanti e indietro).</li>
          <li className="mb-2">USACO Bronze: "Circular Barn" (simulazione di mucche che entrano in un fienile).</li>
          <li className="mb-2">Codeforces: Cerca problemi con tag "implementation" o "simulation" e difficoltà bassa (es. 800-1200).</li>
        </ul>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti ad Altri Concetti</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><a href="./introduction-to-data-structures" className="text-blue-600 dark:text-blue-400 hover:underline">Strutture Dati</a>: La scelta della struttura dati giusta (spesso array o vector per Bronze) è fondamentale per una simulazione efficiente.</li>
          <li className="mb-2"><a href="./time-complexity" className="text-blue-600 dark:text-blue-400 hover:underline">Time Complexity</a>: Devi sempre assicurarti che la tua simulazione termini entro il limite di tempo.</li>
          <li className="mb-2">Ad Hoc Problems: Molti problemi di simulazione rientrano anche nella categoria "ad hoc", il che significa che non richiedono algoritmi standard ma piuttosto un'attenta implementazione delle regole del problema.</li>
        </ul>
      </section>
    </div>
  );
};

export default SimulationPage;

