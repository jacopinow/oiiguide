import React from 'react';

const IntroGreedyPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Introduzione agli Algoritmi Greedy (Livello Bronze)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Teoria: Cosa Sono gli Algoritmi Greedy?</h2>
        <p className="text-lg leading-relaxed mb-4">
          Un **algoritmo greedy** (o "ingordo") è un approccio alla risoluzione dei problemi che fa la scelta che sembra migliore al momento attuale, con la speranza che una serie di scelte localmente ottimali porti a una soluzione globalmente ottimale. In altre parole, ad ogni passo, l'algoritmo greedy sceglie l'opzione che massimizza o minimizza un certo criterio immediato, senza preoccuparsi delle conseguenze future di quella scelta.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Questo approccio è spesso intuitivo e relativamente semplice da implementare. Tuttavia, è importante capire che gli algoritmi greedy non funzionano per tutti i problemi. Per molti problemi, una scelta localmente ottimale può portare a una soluzione globale subottimale o addirittura errata. La difficoltà sta nell'identificare i problemi per i quali l'approccio greedy è corretto e nel dimostrare (o almeno avere una forte intuizione) la sua correttezza.
        </p>
        <p className="text-lg leading-relaxed">
          A livello Bronze, i problemi che si risolvono con un approccio greedy di solito hanno una struttura tale per cui la scelta "ovvia" o "più promettente" al momento è effettivamente quella giusta. Spesso, l'ordinamento dei dati secondo un certo criterio è un passaggio preliminare cruciale per un algoritmo greedy.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Struttura Generale di un Algoritmo Greedy</h2>
        <p className="text-lg leading-relaxed mb-3">
          Un tipico algoritmo greedy segue questi passaggi:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-3">
          <li className="mb-2"><strong>Definire il criterio di scelta greedy:</strong> Qual è la metrica che userai per fare la scelta "migliore" ad ogni passo? (es. l'attività con il tempo di fine più breve, l'oggetto con il miglior rapporto valore/peso, ecc.).</li>
          <li className="mb-2"><strong>Ordinare (spesso):</strong> Molti algoritmi greedy richiedono che i dati di input (oggetti, attività, eventi) siano ordinati secondo il criterio greedy o un altro criterio correlato.</li>
          <li className="mb-2"><strong>Iterare e Scegliere:</strong> Attraversa i dati (spesso quelli ordinati) e, ad ogni passo, prendi una decisione basata sulla scelta greedy:
            <ul className="list-disc list-inside text-lg leading-relaxed ml-6 mt-1">
              <li className="mb-1">Seleziona l'elemento/opzione che soddisfa il criterio greedy.</li>
              <li className="mb-1">Aggiungi l'elemento alla soluzione parziale.</li>
              <li className="mb-1">Aggiorna lo stato del problema (es. rimuovi l'elemento scelto, aggiorna il tempo rimanente, ecc.).</li>
            </ul>
          </li>
          <li className="mb-2"><strong>Terminare:</strong> Continua finché non hai costruito una soluzione completa o non ci sono più scelte valide da fare.</li>
        </ol>
        <p className="text-lg leading-relaxed mt-3">
          La parte più difficile è dimostrare che la strategia greedy porta effettivamente alla soluzione ottimale globale. Per i problemi di contest, specialmente a livello Bronze, se un approccio greedy sembra naturale e passa gli esempi, vale spesso la pena provarlo, ma bisogna essere consapevoli che potrebbe non essere sempre corretto.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Esempio Pratico: Activity Selection Problem (Selezione delle Attività)</h2>
        <p className="text-lg leading-relaxed mb-3">
          Questo è un classico problema per illustrare gli algoritmi greedy.
          <br/>
          <strong>Problema:</strong> Hai un insieme di N attività, ognuna con un orario di inizio (s_i) e un orario di fine (f_i). Vuoi selezionare il massimo numero di attività non sovrapposte (cioè, se selezioni un'attività, non puoi selezionarne un'altra che si sovrappone temporalmente con essa).
        </p>
        <p className="text-lg leading-relaxed mb-3">
          <strong>Approccio Greedy:</strong>
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-3">
          <li className="mb-2">Ordina le attività in base al loro **orario di fine (f_i)** in ordine crescente. Questa è la scelta greedy cruciale.</li>
          <li className="mb-2">Seleziona la prima attività nell'elenco ordinato (quella che finisce prima). Aggiungila alla tua soluzione.</li>
          <li className="mb-2">Itera sulle restanti attività ordinate. Per ogni attività, se il suo orario di inizio (s_i) è maggiore o uguale all'orario di fine dell'ultima attività selezionata, allora seleziona questa attività e aggiungila alla soluzione. Altrimenti, scartala.</li>
        </ol>
        <p className="text-lg leading-relaxed mb-3">
          L'intuizione dietro l'ordinamento per tempo di fine è che, scegliendo l'attività che finisce prima, lasci il maggior tempo possibile per le attività successive.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <vector>
#include <algorithm> // Per std::sort

struct Activity {
  int id;
  int start;
  int finish;
};

// Funzione comparatore per ordinare le attività per tempo di fine
bool compareActivities(const Activity& a, const Activity& b) {
  return a.finish < b.finish;
}

int main() {
  std::vector<Activity> activities = {
    {1, 1, 4}, {2, 3, 5}, {3, 0, 6}, {4, 5, 7}, {5, 3, 9}, {6, 5, 9}, {7, 6, 10}, {8, 8, 11}, {9, 8, 12}, {10, 2, 14}, {11, 12, 16}
  };
  // Esempio USACO: N mucche, ognuna con un intervallo di mungitura [s_i, t_i]. Trova il max numero di mucche che FJ può mungere se può mungere solo una mucca alla volta.

  // 1. Ordina le attività per tempo di fine
  std::sort(activities.begin(), activities.end(), compareActivities);

  std::vector<Activity> selected_activities;
  int count = 0;
  int last_finish_time = 0; // o -infinity se i tempi possono essere negativi

  if (!activities.empty()) {
    // 2. Seleziona la prima attività
    selected_activities.push_back(activities[0]);
    count = 1;
    last_finish_time = activities[0].finish;

    // 3. Itera sulle restanti attività
    for (size_t i = 1; i < activities.size(); ++i) {
      if (activities[i].start >= last_finish_time) {
        selected_activities.push_back(activities[i]);
        count++;
        last_finish_time = activities[i].finish;
      }
    }
  }

  std::cout << "Numero massimo di attivita non sovrapposte: " << count << std::endl;
  std::cout << "Attivita selezionate (ID): ";
  for (const auto& act : selected_activities) {
    std::cout << act.id << " ";
  }
  std::cout << std::endl;
  // Output per l'esempio dato (può variare leggermente in base a come si gestiscono gli uguali tempi di fine):
  // Numero massimo di attivita non sovrapposte: 4
  // Attivita selezionate (ID): 1 4 8 11 (o simile, es. se si sceglie la 2 invece della 1 se finiscono uguale e la 2 inizia prima)

  return 0;
}`} 
        </code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Analisi della Complessità</h2>
        <p className="text-lg leading-relaxed mb-4">
          Per l'Activity Selection Problem:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2">Ordinamento delle attività: O(N log N) usando `std::sort`.</li>
          <li className="mb-2">Iterazione sulle attività ordinate: O(N).</li>
        </ul>
        <p className="text-lg leading-relaxed">
          La complessità dominante è O(N log N) a causa dell'ordinamento. Questo è generalmente molto efficiente.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Esempi Pratici e Problemi USACO (Bronze)</h2>
        <p className="text-lg leading-relaxed mb-4">
          Molti problemi USACO Bronze possono avere una componente greedy:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>USACO Bronze: "Milk Pails"</strong> (sebbene possa essere risolto con ricerca completa per Bronze, una variante potrebbe avere una soluzione greedy se si potesse prendere frazioni di latte - problema dello zaino frazionario).</li>
          <li className="mb-2"><strong>USACO Bronze: "Out of Place"</strong> - L'idea di trovare l'elemento fuori posto e contare gli scambi necessari ha una natura greedy nel cercare di sistemare le cose localmente.</li>
          <li className="mb-2"><strong>Problemi di Scheduling Semplice:</strong> Simili all'Activity Selection, dove devi massimizzare il numero di eventi o il profitto scegliendo tra un insieme di opzioni con vincoli di tempo.</li>
          <li className="mb-2"><strong>Problema del Resto (Coin Change):</strong> Per dare il resto con il minor numero di monete, se il sistema di monete è "canonico" (come quello USA o Euro), la strategia greedy di prendere sempre la moneta di valore più alto possibile funziona. Attenzione: non funziona per tutti i sistemi di monete!</li>
        </ul>
        <p className="text-lg leading-relaxed">
          La chiave è cercare un criterio di ordinamento o una scelta locale che sembri "la migliore" e che semplifichi il problema ad ogni passo.
        </p>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti ad Altri Concetti</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><a href="../sorting-and-sets/introduction-to-sorting" className="text-blue-600 dark:text-blue-400 hover:underline">Ordinamento</a>: Spesso un prerequisito fondamentale per gli algoritmi greedy.</li>
          <li className="mb-2"><a href="../time-complexity" className="text-blue-600 dark:text-blue-400 hover:underline">Time Complexity</a>: Per assicurarsi che l'approccio greedy sia abbastanza veloce.</li>
          <li className="mb-2">Dynamic Programming (Programmazione Dinamica): Molti problemi per i quali un approccio greedy fallisce possono essere risolti con la DP. La DP esplora più opzioni e ricorda le soluzioni ai sottoproblemi, mentre il greedy si impegna in una scelta e non torna indietro.</li>
          <li className="mb-2">Dimostrazioni di Correttezza (Exchange Argument): Per i problemi più avanzati, dimostrare che un algoritmo greedy è corretto spesso coinvolge una tecnica chiamata "exchange argument" (argomento dello scambio), dove si mostra che se una soluzione ottimale differisce dalla scelta greedy, si può trasformare la soluzione ottimale per includere la scelta greedy senza peggiorare il risultato. Questo è oltre lo scopo di Bronze, ma è utile saperlo.</li>
        </ul>
      </section>
    </div>
  );
};

export default IntroGreedyPage;

