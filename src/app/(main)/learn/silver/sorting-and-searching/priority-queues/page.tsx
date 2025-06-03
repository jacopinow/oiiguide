import React from 'react';

const PriorityQueuesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Code Prioritarie (Priority Queues) (Livello Silver)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Spiegazione Iniziale del Concetto</h2>
        <p className="text-lg leading-relaxed mb-4">
          Una **coda prioritaria** (priority queue) è una struttura dati che mantiene una collezione di elementi, ciascuno con un valore di priorità associato. A differenza di una coda normale (FIFO - First In, First Out), in una coda prioritaria gli elementi vengono estratti in base alla loro priorità, non all'ordine di inserimento.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Le operazioni principali di una coda prioritaria sono:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Inserimento (push/insert):</strong> Aggiunge un elemento alla coda con una priorità specificata.</li>
          <li className="mb-2"><strong>Estrazione del massimo/minimo (pop/extract-max/min):</strong> Rimuove e restituisce l'elemento con la priorità più alta (o più bassa, a seconda dell'implementazione).</li>
          <li className="mb-2"><strong>Visualizzazione del massimo/minimo (top/peek):</strong> Restituisce l'elemento con la priorità più alta (o più bassa) senza rimuoverlo.</li>
        </ul>
        <p className="text-lg leading-relaxed">
          In C++, la Standard Template Library (STL) fornisce una implementazione di coda prioritaria chiamata `std::priority_queue`. Per default, questa è una coda prioritaria di massimo (max-heap), cioè l'elemento con il valore più grande ha la priorità più alta e viene estratto per primo.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Ragionamento Preliminare: Perché Usare le Code Prioritarie?</h2>
        <p className="text-lg leading-relaxed mb-4">
          Le code prioritarie sono estremamente utili quando abbiamo bisogno di:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Mantenere un insieme dinamico di elementi ordinati:</strong> Elementi vengono aggiunti e rimossi continuamente, ma vogliamo sempre accedere all'elemento con la priorità più alta/bassa.</li>
          <li className="mb-2"><strong>Implementare algoritmi greedy:</strong> Molti algoritmi greedy richiedono di selezionare ripetutamente l'elemento "migliore" (secondo qualche criterio) da un insieme.</li>
          <li className="mb-2"><strong>Simulare eventi in ordine di tempo:</strong> In simulazioni, gli eventi possono essere inseriti in una coda prioritaria ordinata per tempo di esecuzione.</li>
          <li className="mb-2"><strong>Implementare algoritmi come Dijkstra o Prim:</strong> Questi algoritmi per grafi richiedono di selezionare ripetutamente il nodo o l'arco con il peso minimo.</li>
        </ul>
        <p className="text-lg leading-relaxed">
          La forza delle code prioritarie sta nel fatto che offrono inserimento e estrazione del massimo/minimo in tempo logaritmico (O(log N)), molto più efficiente rispetto a mantenere un array ordinato (che richiederebbe O(N) per l'inserimento) o a cercare il massimo/minimo in un array non ordinato (che richiederebbe O(N) per ogni estrazione).
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Soluzione Guidata: Implementazione e Uso in C++</h2>
        
        <h3 className="text-2xl font-semibold mt-4 mb-2">3.1 Coda Prioritaria di Massimo (Default)</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <queue> // Per std::priority_queue

int main() {
  // Coda prioritaria di massimo (max-heap) - l'elemento più grande ha la priorità più alta
  std::priority_queue<int> max_pq;

  // Inserimento di elementi
  max_pq.push(10);
  max_pq.push(30);
  max_pq.push(20);
  max_pq.push(5);

  std::cout << "Elementi estratti dalla coda prioritaria di massimo:" << std::endl;
  while (!max_pq.empty()) {
    std::cout << max_pq.top() << " "; // Visualizza l'elemento con priorità più alta
    max_pq.pop(); // Rimuove l'elemento con priorità più alta
  }
  std::cout << std::endl;
  // Output: 30 20 10 5 (ordine decrescente)

  return 0;
}`} 
        </code></pre>

        <h3 className="text-2xl font-semibold mt-6 mb-2">3.2 Coda Prioritaria di Minimo</h3>
        <p className="text-lg leading-relaxed mb-3">
          Per creare una coda prioritaria di minimo (min-heap), dove l'elemento più piccolo ha la priorità più alta, possiamo usare un comparatore personalizzato o, più semplicemente, invertire il segno della comparazione:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <queue>
#include <vector>
#include <functional> // Per std::greater

int main() {
  // Metodo 1: Usando std::greater come comparatore
  std::priority_queue<int, std::vector<int>, std::greater<int>> min_pq1;

  // Metodo 2: Usando una lambda come comparatore
  auto compare = [](int a, int b) { return a > b; }; // Nota: la condizione è invertita rispetto all'intuizione
  std::priority_queue<int, std::vector<int>, decltype(compare)> min_pq2(compare);

  // Inserimento di elementi in entrambe le code
  for (int val : {10, 30, 20, 5}) {
    min_pq1.push(val);
    min_pq2.push(val);
  }

  std::cout << "Elementi estratti dalla coda prioritaria di minimo (metodo 1):" << std::endl;
  while (!min_pq1.empty()) {
    std::cout << min_pq1.top() << " ";
    min_pq1.pop();
  }
  std::cout << std::endl;
  // Output: 5 10 20 30 (ordine crescente)

  std::cout << "Elementi estratti dalla coda prioritaria di minimo (metodo 2):" << std::endl;
  while (!min_pq2.empty()) {
    std::cout << min_pq2.top() << " ";
    min_pq2.pop();
  }
  std::cout << std::endl;
  // Output: 5 10 20 30 (ordine crescente)

  return 0;
}`} 
        </code></pre>

        <h3 className="text-2xl font-semibold mt-6 mb-2">3.3 Coda Prioritaria con Struct/Classi Personalizzate</h3>
        <p className="text-lg leading-relaxed mb-3">
          Spesso, in problemi di programmazione competitiva, abbiamo bisogno di code prioritarie che contengono oggetti più complessi di semplici interi. Possiamo usare struct o classi personalizzate, ma dobbiamo definire come confrontarle:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <queue>
#include <string>

struct Task {
  std::string name;
  int priority;
  int duration;

  // Metodo 1: Overload dell'operatore < per confronto diretto
  bool operator<(const Task& other) const {
    // Nota: per std::priority_queue, l'elemento con priorità più alta è quello che è "maggiore"
    // Quindi, se vogliamo che la priorità numerica più alta sia estratta prima, usiamo <
    // Se vogliamo che la priorità numerica più bassa sia estratta prima, usiamo >
    return priority < other.priority; // Per una max-heap basata sul campo 'priority'
    // return priority > other.priority; // Per una min-heap basata sul campo 'priority'
  }
};

// Metodo 2: Funzione di confronto separata
struct CompareTask {
  bool operator()(const Task& a, const Task& b) const {
    // Nota: per std::priority_queue con comparatore personalizzato, l'elemento con priorità più alta
    // è quello per cui il comparatore restituisce false quando confrontato con altri
    return a.priority < b.priority; // Per una max-heap
    // return a.priority > b.priority; // Per una min-heap
  }
};

int main() {
  // Usando l'overload dell'operatore < (Metodo 1)
  std::priority_queue<Task> task_pq1;

  // Usando la funzione di confronto separata (Metodo 2)
  std::priority_queue<Task, std::vector<Task>, CompareTask> task_pq2;

  // Inserimento di task
  Task tasks[] = {
    {"Studiare", 3, 120},
    {"Fare la spesa", 1, 60},
    {"Esercizio fisico", 2, 45},
    {"Progetto urgente", 5, 180},
    {"Rispondere alle email", 4, 30}
  };

  for (const auto& task : tasks) {
    task_pq1.push(task);
    task_pq2.push(task);
  }

  std::cout << "Task estratti dalla coda prioritaria (metodo 1):" << std::endl;
  while (!task_pq1.empty()) {
    Task current = task_pq1.top();
    std::cout << "Nome: " << current.name << ", Priorità: " << current.priority 
              << ", Durata: " << current.duration << " min" << std::endl;
    task_pq1.pop();
  }
  /* Output (ordinato per priorità decrescente):
  Nome: Progetto urgente, Priorità: 5, Durata: 180 min
  Nome: Rispondere alle email, Priorità: 4, Durata: 30 min
  Nome: Studiare, Priorità: 3, Durata: 120 min
  Nome: Esercizio fisico, Priorità: 2, Durata: 45 min
  Nome: Fare la spesa, Priorità: 1, Durata: 60 min
  */

  return 0;
}`} 
        </code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Visualizzazione dell'Esecuzione: Esempio Pratico</h2>
        <p className="text-lg leading-relaxed mb-4">
          Vediamo un esempio pratico di come una coda prioritaria può essere usata per risolvere un problema tipico di programmazione competitiva.
        </p>
        <p className="text-lg leading-relaxed mb-3">
          <strong>Problema:</strong> Hai N processi, ciascuno con un tempo di arrivo `a_i` e un tempo di esecuzione `t_i`. Ogni processo viene eseguito senza interruzioni una volta iniziato. I processi vengono eseguiti in ordine di arrivo, ma se più processi arrivano contemporaneamente, quelli con tempo di esecuzione minore hanno la precedenza. Calcola il tempo di completamento di ogni processo.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <queue>
#include <vector>
#include <algorithm>

struct Process {
  int id;
  int arrival_time;
  int execution_time;
  int completion_time; // Da calcolare

  // Per ordinare i processi per tempo di arrivo
  bool operator<(const Process& other) const {
    return arrival_time < other.arrival_time;
  }
};

// Comparatore per la coda prioritaria: processi con tempo di esecuzione minore hanno priorità più alta
struct CompareExecutionTime {
  bool operator()(const Process& a, const Process& b) const {
    return a.execution_time > b.execution_time; // Min-heap per execution_time
  }
};

int main() {
  std::vector<Process> processes = {
    {1, 0, 5, 0}, // id, arrival_time, execution_time, completion_time (inizializzato a 0)
    {2, 1, 3, 0},
    {3, 2, 8, 0},
    {4, 3, 2, 0},
    {5, 4, 4, 0},
    {6, 4, 1, 0}
  };

  // Ordina i processi per tempo di arrivo
  std::sort(processes.begin(), processes.end());

  // Coda prioritaria per i processi pronti, ordinati per tempo di esecuzione (min-heap)
  std::priority_queue<Process, std::vector<Process>, CompareExecutionTime> ready_queue;

  int current_time = 0;
  size_t next_process_idx = 0;

  // Continua finché tutti i processi sono stati completati
  while (next_process_idx < processes.size() || !ready_queue.empty()) {
    // Aggiungi alla ready_queue tutti i processi arrivati fino a current_time
    while (next_process_idx < processes.size() && processes[next_process_idx].arrival_time <= current_time) {
      ready_queue.push(processes[next_process_idx]);
      next_process_idx++;
    }

    if (ready_queue.empty()) {
      // Se non ci sono processi pronti, avanza il tempo fino all'arrivo del prossimo processo
      current_time = processes[next_process_idx].arrival_time;
    } else {
      // Esegui il processo con il tempo di esecuzione minore
      Process current_process = ready_queue.top();
      ready_queue.pop();

      // Aggiorna il tempo corrente e il tempo di completamento del processo
      current_time += current_process.execution_time;
      
      // Aggiorna il tempo di completamento nel vettore originale
      for (auto& p : processes) {
        if (p.id == current_process.id) {
          p.completion_time = current_time;
          break;
        }
      }
    }
  }

  // Stampa i risultati
  std::cout << "Risultati:" << std::endl;
  std::cout << "ID\tArrivo\tEsecuzione\tCompletamento\tTurnaround\tAttesa" << std::endl;
  for (const auto& p : processes) {
    int turnaround_time = p.completion_time - p.arrival_time;
    int waiting_time = turnaround_time - p.execution_time;
    std::cout << p.id << "\t" << p.arrival_time << "\t" << p.execution_time << "\t\t"
              << p.completion_time << "\t\t" << turnaround_time << "\t\t" << waiting_time << std::endl;
  }
  /* Output atteso (potrebbe variare leggermente):
  Risultati:
  ID	Arrivo	Esecuzione	Completamento	Turnaround	Attesa
  1	0	5		5		5		0
  2	1	3		8		7		4
  3	2	8		23		21		13
  4	3	2		10		7		5
  5	4	4		14		10		6
  6	4	1		9		5		4
  */

  return 0;
}`} 
        </code></pre>
        <p className="text-lg leading-relaxed mt-3">
          <strong>Spiegazione dell'esecuzione:</strong>
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Inizialmente, `current_time = 0` e il processo 1 arriva. Viene aggiunto alla `ready_queue` e poi estratto per l'esecuzione. Dopo 5 unità di tempo, `current_time = 5`.</li>
          <li className="mb-1">Nel frattempo, i processi 2, 3 e 4 sono arrivati. Vengono tutti aggiunti alla `ready_queue`. Il processo 2 ha il tempo di esecuzione minore tra questi (3), quindi viene estratto. Dopo la sua esecuzione, `current_time = 8`.</li>
          <li className="mb-1">I processi 3, 4, 5 e 6 sono ora nella `ready_queue`. Il processo 6 ha il tempo di esecuzione minore (1), quindi viene estratto. Dopo la sua esecuzione, `current_time = 9`.</li>
          <li className="mb-1">I processi 3, 4 e 5 sono nella `ready_queue`. Il processo 4 ha il tempo di esecuzione minore (2), quindi viene estratto. Dopo la sua esecuzione, `current_time = 11`.</li>
          <li className="mb-1">E così via...</li>
        </ol>
        <p className="text-lg leading-relaxed">
          Questo esempio mostra come una coda prioritaria può essere usata per implementare un algoritmo di scheduling dei processi, un problema comune in informatica e in programmazione competitiva.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Analisi della Complessità</h2>
        <p className="text-lg leading-relaxed mb-4">
          Le code prioritarie in C++ (implementate tipicamente come heap binari) hanno le seguenti complessità temporali:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1"><strong>Inserimento (push):</strong> O(log N), dove N è il numero di elementi nella coda.</li>
          <li className="mb-1"><strong>Estrazione del massimo/minimo (pop):</strong> O(log N).</li>
          <li className="mb-1"><strong>Visualizzazione del massimo/minimo (top):</strong> O(1).</li>
          <li className="mb-1"><strong>Verifica se la coda è vuota (empty):</strong> O(1).</li>
          <li className="mb-1"><strong>Ottenere la dimensione della coda (size):</strong> O(1).</li>
        </ul>
        <p className="text-lg leading-relaxed">
          La complessità spaziale è O(N), dove N è il numero di elementi nella coda.
        </p>
        <p className="text-lg leading-relaxed">
          <strong>Nota importante:</strong> A differenza di altre strutture dati come `std::set` o `std::map`, `std::priority_queue` non supporta l'aggiornamento efficiente della priorità di un elemento già inserito. Se hai bisogno di questa funzionalità, potresti dover implementare una coda prioritaria personalizzata o usare altre strutture dati come un set con un comparatore personalizzato.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Problemi USACO Comuni e Suggerimenti</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>USACO Silver: "Convention II"</strong> - Le mucche arrivano a una convenzione con tempi di arrivo e priorità (seniority). Una coda prioritaria può essere usata per gestire quali mucche vengono servite in quale ordine.</li>
          <li className="mb-2"><strong>USACO Silver/Gold: Problemi di simulazione di eventi</strong> - Molti problemi richiedono di simulare eventi che accadono in tempi diversi. Una coda prioritaria ordinata per tempo è spesso la soluzione.</li>
          <li className="mb-2"><strong>Algoritmo di Dijkstra</strong> - Per trovare il cammino minimo in un grafo pesato, Dijkstra usa una coda prioritaria per selezionare sempre il nodo non visitato con la distanza minima.</li>
          <li className="mb-2"><strong>Algoritmo di Prim</strong> - Per trovare l'albero di copertura minimo, Prim usa una coda prioritaria per selezionare l'arco di peso minimo che connette un nodo non visitato.</li>
          <li className="mb-2"><strong>K elementi più grandi/piccoli</strong> - Per trovare i K elementi più grandi in un array, puoi usare una min-heap di dimensione K.</li>
          <li className="mb-2"><strong>Mediana in streaming</strong> - Per trovare la mediana di un flusso di numeri, puoi usare due code prioritarie (una max-heap per la metà inferiore e una min-heap per la metà superiore).</li>
        </ul>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti a Concetti Prerequisiti e Successivi</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Prerequisito:</strong> <a href="./introduction-to-sorting" className="text-blue-600 dark:text-blue-400 hover:underline">Ordinamento</a> (per capire il concetto di ordinamento).</li>
          <li className="mb-2"><strong>Prerequisito:</strong> <a href="./custom-comparators-and-coordinate-compression" className="text-blue-600 dark:text-blue-400 hover:underline">Comparatori Personalizzati</a> (per definire l'ordine di priorità).</li>
          <li className="mb-2"><strong>Concetto Correlato:</strong> <a href="./greedy-algorithms-with-sorting" className="text-blue-600 dark:text-blue-400 hover:underline">Algoritmi Greedy con Ordinamento</a> (le code prioritarie sono spesso usate in algoritmi greedy).</li>
          <li className="mb-2"><strong>Applicazione:</strong> <a href="../graphs/graph-traversal" className="text-blue-600 dark:text-blue-400 hover:underline">Attraversamento di Grafi</a> (per algoritmi come Dijkstra).</li>
          <li className="mb-2"><strong>Strutture Dati Avanzate:</strong> Heap di Fibonacci, che offrono operazioni più efficienti per alcuni casi d'uso (argomento avanzato).</li>
        </ul>
      </section>
    </div>
  );
};

export default PriorityQueuesPage;
