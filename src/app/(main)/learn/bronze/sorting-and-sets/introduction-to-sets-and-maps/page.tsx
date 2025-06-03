import React from 'react';

const IntroSetsMapsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">(Opzionale) Introduzione a Set e Map (Livello Bronze)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Nota Introduttiva</h2>
        <p className="text-lg leading-relaxed mb-4">
          Sebbene `std::set` e `std::map` siano strutture dati estremamente utili e potenti, sono più comunemente approfondite e richieste a partire dal livello Silver di USACO. Tuttavia, una comprensione di base di cosa sono e a cosa servono può essere vantaggiosa anche per i concorrenti Bronze, specialmente per semplificare alcuni tipi di problemi o per scrivere codice più pulito ed efficiente in determinate situazioni. Questa sezione è considerata "opzionale" per Bronze, ma la conoscenza è sempre un vantaggio!
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Teoria: `std::set`</h2>
        <p className="text-lg leading-relaxed mb-4">
          Un `std::set` in C++ (dalla Standard Template Library, STL) è una struttura dati che memorizza una collezione di elementi **unici** e **ordinati**. Le parole chiave qui sono "unici" (non ci possono essere duplicati) e "ordinati" (gli elementi sono sempre mantenuti in un ordine specifico, solitamente crescente).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Immagina di voler tenere traccia di tutti i diversi tipi di frutta che hai visto, senza ripetizioni e volendoli elencare in ordine alfabetico. Un `std::set` sarebbe perfetto per questo.
        </p>
        <h3 className="text-2xl font-medium mb-2">Caratteristiche Principali di `std::set`:</h3>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Unicità:</strong> Se provi a inserire un elemento già presente, l'inserimento viene ignorato. Il set conterrà solo una copia di quell'elemento.</li>
          <li className="mb-2"><strong>Ordinamento:</strong> Gli elementi in un set sono automaticamente mantenuti in ordine (crescente per default). Questo rende operazioni come trovare il minimo/massimo o verificare l'esistenza di un elemento molto efficienti.</li>
          <li className="mb-2"><strong>Efficienza:</strong> Le operazioni comuni come inserimento, cancellazione e ricerca di un elemento hanno tipicamente una complessità temporale di O(log N), dove N è il numero di elementi nel set. Questo è molto più veloce di O(N) che si avrebbe con un `std::vector` non ordinato per la ricerca.</li>
        </ul>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <set>
#include <string>

int main() {
  std::set<int> numeri;

  numeri.insert(50);
  numeri.insert(20);
  numeri.insert(80);
  numeri.insert(20); // Questo inserimento viene ignorato perché 20 è già presente

  std::cout << "Elementi nel set (ordinati):";
  for (int num : numeri) {
    std::cout << " " << num;
  }
  std::cout << std::endl; // Output: 20 50 80

  // Verificare se un elemento esiste
  if (numeri.count(50)) { // .count() restituisce 1 se presente, 0 altrimenti
    std::cout << "50 è nel set." << std::endl;
  }
  if (numeri.find(30) == numeri.end()) { // .find() restituisce un iteratore a numeri.end() se non trovato
    std::cout << "30 non è nel set." << std::endl;
  }

  numeri.erase(50); // Rimuovere un elemento
  std::cout << "Dopo aver rimosso 50:";
  for (int num : numeri) {
    std::cout << " " << num;
  }
  std::cout << std::endl; // Output: 20 80

  std::set<std::string> parole;
  parole.insert("banana");
  parole.insert("mela");
  parole.insert("arancia");
  std::cout << "Parole nel set:";
  for (const std::string& parola : parole) {
      std::cout << " " << parola;
  }
  std::cout << std::endl; // Output: arancia banana mela (ordine alfabetico)
  return 0;
}`} 
        </code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Teoria: `std::map`</h2>
        <p className="text-lg leading-relaxed mb-4">
          Un `std::map` in C++ (anch'esso parte della STL) è una struttura dati che memorizza coppie **chiave-valore**. Ogni chiave in una mappa deve essere unica, e le chiavi sono mantenute ordinate (come in `std::set`). La mappa associa ad ogni chiave un valore corrispondente.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Pensa a un dizionario: ogni parola (la chiave) ha una definizione associata (il valore). Oppure, un elenco telefonico: ogni nome (la chiave) ha un numero di telefono associato (il valore). Le mappe sono perfette per queste situazioni in cui vuoi cercare rapidamente un valore basandoti su una chiave unica.
        </p>
        <h3 className="text-2xl font-medium mb-2">Caratteristiche Principali di `std::map`:</h3>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Coppie Chiave-Valore:</strong> Memorizza dati come associazioni tra una chiave e un valore.</li>
          <li className="mb-2"><strong>Chiavi Uniche e Ordinate:</strong> Le chiavi devono essere uniche e sono mantenute in ordine (crescente per default in base alla chiave).</li>
          <li className="mb-2"><strong>Accesso Rapido tramite Chiave:</strong> Puoi accedere, inserire o cancellare un valore usando la sua chiave. L'accesso tramite l'operatore `[]` è molto comodo.</li>
          <li className="mb-2"><strong>Efficienza:</strong> Inserimento, cancellazione e ricerca per chiave hanno tipicamente una complessità temporale di O(log N), dove N è il numero di coppie nella mappa.</li>
        </ul>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <map>
#include <string>

int main() {
  std::map<std::string, int> punteggi_studenti;

  // Inserire coppie chiave-valore
  punteggi_studenti["Alice"] = 90;
  punteggi_studenti["Bob"] = 85;
  punteggi_studenti.insert(std::make_pair("Charlie", 92));
  punteggi_studenti["Alice"] = 95; // Aggiorna il valore per la chiave "Alice"

  std::cout << "Punteggio di Alice: " << punteggi_studenti["Alice"] << std::endl; // Output: 95
  std::cout << "Punteggio di Bob: " << punteggi_studenti.at("Bob") << std::endl; // Output: 85 (at() lancia eccezione se chiave non esiste)

  // Iterare su una mappa (le coppie sono ordinate per chiave)
  std::cout << "Punteggi (ordinati per nome studente):" << std::endl;
  for (const auto& coppia : punteggi_studenti) { // auto deduce std::pair<const std::string, int>
    std::cout << coppia.first << ": " << coppia.second << std::endl;
  }
  // Output:
  // Alice: 95
  // Bob: 85
  // Charlie: 92

  // Verificare se una chiave esiste
  if (punteggi_studenti.count("David")) {
    std::cout << "David è nella mappa." << std::endl;
  } else {
    std::cout << "David non è nella mappa." << std::endl;
  }

  punteggi_studenti.erase("Bob"); // Rimuovere una coppia tramite chiave
  std::cout << "Dopo aver rimosso Bob:" << std::endl;
  for (const auto& coppia : punteggi_studenti) {
    std::cout << coppia.first << ": " << coppia.second << std::endl;
  }
  return 0;
}`} 
        </code></pre>
        <p className="text-lg leading-relaxed mt-3">
          <strong>Attenzione con `operator[]`:</strong> Se accedi a una mappa con `mappa[chiave_inesistente]`, la mappa inserirà automaticamente quella chiave con un valore predefinito (es. 0 per `int`, stringa vuota per `std::string`). Questo può essere comodo per contare le frequenze, ma può anche introdurre bug se non è il comportamento desiderato. `mappa.at(chiave)` invece lancia un'eccezione se la chiave non esiste.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Quando Usarli (Anche a Livello Bronze)?</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>`std::set` per Unicità e Ordine:</strong>
            <ul className="list-disc list-inside text-lg leading-relaxed ml-6 mt-1">
              <li>Per trovare il numero di elementi distinti in una collezione.</li>
              <li>Per verificare rapidamente se un elemento è già stato visto.</li>
              <li>Quando hai bisogno di processare elementi unici in ordine (es. trovare il k-esimo elemento più piccolo unico).</li>
            </ul>
          </li>
          <li className="mb-2"><strong>`std::map` per Contare Frequenze o Associazioni:</strong>
            <ul className="list-disc list-inside text-lg leading-relaxed ml-6 mt-1">
              <li>Per contare quante volte appare ogni elemento in una lista (es. `std::map<int, int> frequenze;`).</li>
              <li>Per associare stringhe a valori (es. nomi a punteggi, come nell'esempio).</li>
              <li>Quando hai bisogno di cercare un valore basato su una chiave in modo efficiente.</li>
            </ul>
          </li>
        </ul>
        <p className="text-lg leading-relaxed mt-2">
          Anche se potresti risolvere alcuni di questi problemi a livello Bronze usando solo `std::vector` e ordinamento manuale, `std::set` e `std::map` possono spesso portare a soluzioni più concise, meno soggette a errori e talvolta più efficienti in termini di tempo di scrittura del codice durante un contest.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Esercizi Semplici (Idea)</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2">Dato un elenco di numeri, stampa quanti numeri distinti ci sono (usa `std::set`).</li>
          <li className="mb-2">Dato un elenco di parole, stampa ogni parola distinta in ordine alfabetico (usa `std::set<std::string>`).</li>
          <li className="mb-2">Dato un elenco di numeri, stampa la frequenza di ogni numero (usa `std::map<int, int>`).</li>
          <li className="mb-2">USACO Bronze: "Contaminated Milk" - una mappa potrebbe essere utile per tracciare chi ha bevuto quale latte e quando.</li>
        </ul>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti ad Altri Concetti</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><a href="./introduction-to-sorting" className="text-blue-600 dark:text-blue-400 hover:underline">Ordinamento</a>: Set e Map mantengono i loro elementi/chiavi ordinati internamente.</li>
          <li className="mb-2"><a href="../time-complexity" className="text-blue-600 dark:text-blue-400 hover:underline">Time Complexity</a>: Comprendere il O(log N) per le operazioni di set/map è importante.</li>
          <li className="mb-2">Hashing e `std::unordered_set`/`std::unordered_map` (Argomenti più avanzati, solitamente Gold): Versioni non ordinate di set e map che offrono prestazioni medie O(1) per inserimento/ricerca/cancellazione, ma con complessità O(N) nel caso peggiore. Per Bronze/Silver, `std::set` e `std::map` sono generalmente sufficienti e più prevedibili.</li>
        </ul>
      </section>
    </div>
  );
};

export default IntroSetsMapsPage;

