import React from 'react';

const AhoCorasickPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Algoritmo di Aho-Corasick (Livello Advanced)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo di Aho-Corasick è una potente tecnica per la ricerca di pattern multipli in un testo. Sviluppato da Alfred V. Aho e Margaret J. Corasick nel 1975, questo algoritmo estende l'algoritmo di Knuth-Morris-Pratt (KMP) per gestire simultaneamente più pattern.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          La caratteristica principale dell'algoritmo di Aho-Corasick è la sua efficienza: può trovare tutte le occorrenze di un insieme di pattern in un testo in un tempo proporzionale alla lunghezza del testo più la lunghezza totale dei pattern, più il numero di occorrenze trovate. Questo lo rende particolarmente utile quando si cercano molti pattern contemporaneamente.
        </p>
        <p className="text-lg leading-relaxed">
          In questa lezione, esploreremo:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">La struttura dati dell'automa di Aho-Corasick</li>
          <li className="mb-1">La costruzione dell'automa</li>
          <li className="mb-1">L'algoritmo di ricerca</li>
          <li className="mb-1">Applicazioni pratiche in problemi di programmazione competitiva</li>
        </ul>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Concetti Fondamentali</h2>
        <p className="text-lg leading-relaxed mb-4">
          Prima di addentrarci nell'algoritmo di Aho-Corasick, è importante comprendere alcuni concetti fondamentali.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">2.1 Trie (Albero dei Prefissi)</h3>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo di Aho-Corasick si basa su una struttura dati chiamata Trie (o albero dei prefissi). Un Trie è un albero in cui ogni nodo rappresenta un prefisso di una o più stringhe. Ogni arco è etichettato con un carattere, e seguendo un percorso dalla radice a un nodo, otteniamo un prefisso.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Per esempio, se abbiamo le stringhe "he", "she", "his", e "hers", il Trie corrispondente avrà percorsi per tutti i prefissi di queste stringhe: "", "h", "he", "s", "sh", "she", "hi", "his", "her", "hers".
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">2.2 Funzione di Fallimento</h3>
        <p className="text-lg leading-relaxed mb-4">
          La funzione di fallimento (o link di fallimento) è un concetto chiave nell'algoritmo di Aho-Corasick. Per ogni nodo nel Trie, la funzione di fallimento punta a un altro nodo che rappresenta il più lungo suffisso proprio del percorso corrente che è anche un prefisso di qualche pattern.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In altre parole, se non possiamo continuare a seguire un percorso nel Trie perché il carattere successivo nel testo non corrisponde a nessun arco uscente dal nodo corrente, seguiamo il link di fallimento per trovare un nodo alternativo da cui continuare la ricerca.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">2.3 Output Links</h3>
        <p className="text-lg leading-relaxed mb-4">
          Gli output links (o link di output) sono un altro concetto importante. Per ogni nodo nel Trie, gli output links puntano a tutti i pattern che terminano in quel nodo o in uno dei suoi antenati raggiungibili tramite link di fallimento.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Questi link ci permettono di identificare rapidamente tutti i pattern che sono stati trovati quando raggiungiamo un determinato nodo durante la scansione del testo.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Costruzione dell'Automa di Aho-Corasick</h2>
        <p className="text-lg leading-relaxed mb-4">
          La costruzione dell'automa di Aho-Corasick avviene in tre fasi principali:
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">3.1 Costruzione del Trie</h3>
        <p className="text-lg leading-relaxed mb-4">
          Il primo passo è costruire un Trie con tutti i pattern che vogliamo cercare. Ogni nodo nel Trie rappresenta un prefisso di uno o più pattern, e i nodi che corrispondono alla fine di un pattern sono marcati come terminali.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`struct Node {
    map<char, int> next;  // Transizioni a stati successivi
    bool is_terminal;     // True se questo nodo rappresenta la fine di un pattern
    int pattern_idx;      // Indice del pattern che termina qui (-1 se nessuno)
    int fail;             // Link di fallimento
    vector<int> output;   // Output links
    
    Node() : is_terminal(false), pattern_idx(-1), fail(0) {}
};

vector<Node> build_trie(const vector<string>& patterns) {
    vector<Node> trie(1);  // Inizia con la radice (stato 0)
    
    for (int i = 0; i < patterns.size(); i++) {
        const string& pattern = patterns[i];
        int node = 0;  // Inizia dalla radice
        
        for (char c : pattern) {
            if (!trie[node].next.count(c)) {
                // Crea un nuovo stato se la transizione non esiste
                trie[node].next[c] = trie.size();
                trie.emplace_back();
            }
            node = trie[node].next[c];
        }
        
        // Marca il nodo come terminale e memorizza l'indice del pattern
        trie[node].is_terminal = true;
        trie[node].pattern_idx = i;
    }
    
    return trie;
}`}</code></pre>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">3.2 Calcolo dei Link di Fallimento</h3>
        <p className="text-lg leading-relaxed mb-4">
          Il secondo passo è calcolare i link di fallimento per ogni nodo nel Trie. Questo viene fatto utilizzando una visita in ampiezza (BFS) del Trie, partendo dalla radice.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`void compute_failure_links(vector<Node>& trie) {
    queue<int> q;
    
    // Inizializza la coda con i figli della radice
    for (auto& [c, next] : trie[0].next) {
        q.push(next);
        // I figli della radice hanno link di fallimento alla radice
        trie[next].fail = 0;
    }
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        
        for (auto& [c, next] : trie[node].next) {
            q.push(next);
            
            // Calcola il link di fallimento per next
            int fail = trie[node].fail;
            while (fail != 0 && !trie[fail].next.count(c)) {
                fail = trie[fail].fail;
            }
            
            if (trie[fail].next.count(c)) {
                fail = trie[fail].next[c];
            }
            
            trie[next].fail = fail;
            
            // Aggiungi gli output links dal nodo di fallimento
            if (trie[fail].is_terminal) {
                trie[next].output.push_back(trie[fail].pattern_idx);
            }
            
            // Aggiungi gli output links ereditati dal nodo di fallimento
            for (int pattern_idx : trie[fail].output) {
                trie[next].output.push_back(pattern_idx);
            }
        }
    }
}`}</code></pre>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">3.3 Calcolo degli Output Links</h3>
        <p className="text-lg leading-relaxed mb-4">
          Il terzo passo è calcolare gli output links per ogni nodo. Questo viene fatto durante il calcolo dei link di fallimento, come mostrato nel codice sopra.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Per ogni nodo, gli output links includono:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">L'indice del pattern che termina in questo nodo (se esiste)</li>
          <li className="mb-1">Gli output links del nodo di fallimento</li>
        </ul>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Algoritmo di Ricerca</h2>
        <p className="text-lg leading-relaxed mb-4">
          Una volta costruito l'automa di Aho-Corasick, possiamo utilizzarlo per cercare tutti i pattern nel testo in un'unica passata.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`vector<vector<int>> search(const string& text, const vector<string>& patterns, const vector<Node>& trie) {
    int n = text.size();
    vector<vector<int>> occurrences(patterns.size());
    
    int node = 0;  // Inizia dalla radice
    
    for (int i = 0; i < n; i++) {
        char c = text[i];
        
        // Segui i link di fallimento finché non troviamo una transizione valida o raggiungiamo la radice
        while (node != 0 && !trie[node].next.count(c)) {
            node = trie[node].fail;
        }
        
        // Se esiste una transizione per il carattere corrente, seguila
        if (trie[node].next.count(c)) {
            node = trie[node].next[c];
        }
        
        // Se il nodo corrente è terminale, abbiamo trovato un pattern
        if (trie[node].is_terminal) {
            int pattern_idx = trie[node].pattern_idx;
            int pattern_length = patterns[pattern_idx].size();
            occurrences[pattern_idx].push_back(i - pattern_length + 1);
        }
        
        // Controlla anche gli output links
        for (int pattern_idx : trie[node].output) {
            int pattern_length = patterns[pattern_idx].size();
            occurrences[pattern_idx].push_back(i - pattern_length + 1);
        }
    }
    
    return occurrences;
}`}</code></pre>
        <p className="text-lg leading-relaxed mt-4">
          L'algoritmo di ricerca funziona come segue:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Iniziamo dalla radice dell'automa.</li>
          <li className="mb-1">Per ogni carattere nel testo, cerchiamo di seguire una transizione corrispondente.</li>
          <li className="mb-1">Se non esiste una transizione per il carattere corrente, seguiamo i link di fallimento finché non troviamo una transizione valida o raggiungiamo la radice.</li>
          <li className="mb-1">Dopo aver seguito la transizione, controlliamo se il nodo corrente è terminale o ha output links, e in tal caso registriamo le occorrenze dei pattern corrispondenti.</li>
        </ol>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Implementazione Completa</h2>
        <p className="text-lg leading-relaxed mb-4">
          Ecco un'implementazione completa dell'algoritmo di Aho-Corasick in C++:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

struct AhoCorasick {
    struct Node {
        map<char, int> next;
        bool is_terminal;
        int pattern_idx;
        int fail;
        vector<int> output;
        
        Node() : is_terminal(false), pattern_idx(-1), fail(0) {}
    };
    
    vector<Node> trie;
    vector<string> patterns;
    
    AhoCorasick(const vector<string>& patterns) : patterns(patterns) {
        build_automaton();
    }
    
    void build_automaton() {
        // Costruzione del Trie
        trie.resize(1);  // Inizia con la radice (stato 0)
        
        for (int i = 0; i < patterns.size(); i++) {
            const string& pattern = patterns[i];
            int node = 0;  // Inizia dalla radice
            
            for (char c : pattern) {
                if (!trie[node].next.count(c)) {
                    // Crea un nuovo stato se la transizione non esiste
                    trie[node].next[c] = trie.size();
                    trie.emplace_back();
                }
                node = trie[node].next[c];
            }
            
            // Marca il nodo come terminale e memorizza l'indice del pattern
            trie[node].is_terminal = true;
            trie[node].pattern_idx = i;
        }
        
        // Calcolo dei link di fallimento e degli output links
        queue<int> q;
        
        // Inizializza la coda con i figli della radice
        for (auto& [c, next] : trie[0].next) {
            q.push(next);
            // I figli della radice hanno link di fallimento alla radice
            trie[next].fail = 0;
        }
        
        while (!q.empty()) {
            int node = q.front();
            q.pop();
            
            for (auto& [c, next] : trie[node].next) {
                q.push(next);
                
                // Calcola il link di fallimento per next
                int fail = trie[node].fail;
                while (fail != 0 && !trie[fail].next.count(c)) {
                    fail = trie[fail].fail;
                }
                
                if (trie[fail].next.count(c)) {
                    fail = trie[fail].next[c];
                }
                
                trie[next].fail = fail;
                
                // Aggiungi gli output links
                if (trie[fail].is_terminal) {
                    trie[next].output.push_back(trie[fail].pattern_idx);
                }
                
                for (int pattern_idx : trie[fail].output) {
                    trie[next].output.push_back(pattern_idx);
                }
            }
        }
    }
    
    vector<vector<int>> search(const string& text) {
        int n = text.size();
        vector<vector<int>> occurrences(patterns.size());
        
        int node = 0;  // Inizia dalla radice
        
        for (int i = 0; i < n; i++) {
            char c = text[i];
            
            // Segui i link di fallimento finché non troviamo una transizione valida o raggiungiamo la radice
            while (node != 0 && !trie[node].next.count(c)) {
                node = trie[node].fail;
            }
            
            // Se esiste una transizione per il carattere corrente, seguila
            if (trie[node].next.count(c)) {
                node = trie[node].next[c];
            }
            
            // Se il nodo corrente è terminale, abbiamo trovato un pattern
            if (trie[node].is_terminal) {
                int pattern_idx = trie[node].pattern_idx;
                int pattern_length = patterns[pattern_idx].size();
                occurrences[pattern_idx].push_back(i - pattern_length + 1);
            }
            
            // Controlla anche gli output links
            for (int pattern_idx : trie[node].output) {
                int pattern_length = patterns[pattern_idx].size();
                occurrences[pattern_idx].push_back(i - pattern_length + 1);
            }
        }
        
        return occurrences;
    }
};

int main() {
    string text = "abcabcabcabc";
    vector<string> patterns = {"abc", "cab", "bc"};
    
    AhoCorasick ac(patterns);
    vector<vector<int>> occurrences = ac.search(text);
    
    for (int i = 0; i < patterns.size(); i++) {
        cout << "Pattern: " << patterns[i] << ", Occurrences: ";
        for (int pos : occurrences[i]) {
            cout << pos << " ";
        }
        cout << endl;
    }
    
    return 0;
}

/* Output atteso:
Pattern: abc, Occurrences: 0 3 6 9
Pattern: cab, Occurrences: 1 4 7
Pattern: bc, Occurrences: 1 4 7 10
*/`}</code></pre>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Ottimizzazioni</h2>
        <p className="text-lg leading-relaxed mb-4">
          Ci sono diverse ottimizzazioni che possono essere applicate all'algoritmo di Aho-Corasick:
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">6.1 Utilizzo di Array invece di Map</h3>
        <p className="text-lg leading-relaxed mb-4">
          Se l'alfabeto è limitato (ad esempio, solo lettere minuscole), possiamo utilizzare array invece di map per memorizzare le transizioni, migliorando l'efficienza:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`struct Node {
    int next[26];  // Per l'alfabeto a-z
    bool is_terminal;
    int pattern_idx;
    int fail;
    vector<int> output;
    
    Node() : is_terminal(false), pattern_idx(-1), fail(0) {
        fill(next, next + 26, -1);  // -1 indica che la transizione non esiste
    }
};`}</code></pre>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">6.2 Compressione degli Output Links</h3>
        <p className="text-lg leading-relaxed mb-4">
          Se ci sono molti pattern, gli output links possono diventare molto grandi. Possiamo comprimerli utilizzando una struttura dati più efficiente, come un set o un bitset:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`struct Node {
    // ...
    set<int> output;  // Usa un set invece di un vector per evitare duplicati
    // ...
};`}</code></pre>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">6.3 Calcolo Lazy degli Output Links</h3>
        <p className="text-lg leading-relaxed mb-4">
          Invece di calcolare tutti gli output links durante la costruzione dell'automa, possiamo calcolarli on-demand durante la ricerca, seguendo i link di fallimento:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`vector<vector<int>> search(const string& text) {
    // ...
    
    for (int i = 0; i < n; i++) {
        // ...
        
        // Controlla il nodo corrente e tutti i suoi antenati di fallimento
        int curr = node;
        while (curr != 0) {
            if (trie[curr].is_terminal) {
                int pattern_idx = trie[curr].pattern_idx;
                int pattern_length = patterns[pattern_idx].size();
                occurrences[pattern_idx].push_back(i - pattern_length + 1);
            }
            curr = trie[curr].fail;
        }
    }
    
    // ...
}`}</code></pre>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">7. Analisi della Complessità</h2>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">7.1 Complessità Temporale</h3>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Costruzione dell'automa:</strong> O(m), dove m è la somma delle lunghezze di tutti i pattern. Questo include la costruzione del Trie e il calcolo dei link di fallimento e degli output links.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Ricerca:</strong> O(n + z), dove n è la lunghezza del testo e z è il numero totale di occorrenze trovate. In pratica, la complessità è spesso più vicina a O(n) perché il numero di occorrenze è generalmente molto inferiore alla lunghezza del testo.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">7.2 Complessità Spaziale</h3>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Automa:</strong> O(m), dove m è la somma delle lunghezze di tutti i pattern. Questo include lo spazio per il Trie, i link di fallimento e gli output links.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Risultati:</strong> O(z), dove z è il numero totale di occorrenze trovate.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">8. Applicazioni</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo di Aho-Corasick ha numerose applicazioni pratiche:
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">8.1 Ricerca di Pattern Multipli</h3>
        <p className="text-lg leading-relaxed mb-4">
          L'applicazione più ovvia è la ricerca simultanea di più pattern in un testo, come nei sistemi di filtraggio dei contenuti, antivirus, e motori di ricerca.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">8.2 Analisi Lessicale</h3>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo può essere utilizzato per l'analisi lessicale nei compilatori, dove è necessario identificare token (come parole chiave, identificatori, operatori) in un flusso di caratteri.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">8.3 Bioinformatica</h3>
        <p className="text-lg leading-relaxed mb-4">
          In bioinformatica, l'algoritmo è utilizzato per cercare sequenze di DNA o proteine in database genomici.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">8.4 Sistemi di Rilevamento delle Intrusioni</h3>
        <p className="text-lg leading-relaxed mb-4">
          Nei sistemi di sicurezza informatica, l'algoritmo è utilizzato per rilevare pattern di attacco noti nel traffico di rete.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">9. Problemi di Esempio</h2>
        
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Problema 1: Conteggio di Sottostringhe</h3>
          <p className="mb-2">
            <strong>Descrizione:</strong> Ti viene dato un testo T e un insieme di pattern P. Per ogni pattern, conta quante volte appare come sottostringa di T.
          </p>
          <p className="mb-2">
            <strong>Soluzione:</strong> Questo è un caso d'uso diretto dell'algoritmo di Aho-Corasick. Costruiamo l'automa con tutti i pattern e poi lo utilizziamo per cercare nel testo.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mt-2"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Implementazione di Aho-Corasick come sopra

int main() {
    string text;
    int n;
    cin >> text >> n;
    
    vector<string> patterns(n);
    for (int i = 0; i < n; i++) {
        cin >> patterns[i];
    }
    
    AhoCorasick ac(patterns);
    vector<vector<int>> occurrences = ac.search(text);
    
    for (int i = 0; i < n; i++) {
        cout << patterns[i] << ": " << occurrences[i].size() << endl;
    }
    
    return 0;
}`}</code></pre>
        </div>
        
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Problema 2: Sottosequenze Comuni</h3>
          <p className="mb-2">
            <strong>Descrizione:</strong> Ti vengono date due stringhe A e B. Trova tutte le sottostringhe di A che sono anche sottostringhe di B.
          </p>
          <p className="mb-2">
            <strong>Soluzione:</strong> Possiamo generare tutte le sottostringhe di A e utilizzare Aho-Corasick per cercarle in B. Tuttavia, questo approccio potrebbe essere inefficiente se A è molto lungo. Un approccio migliore è utilizzare un suffix array o un suffix automaton.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mt-2"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Implementazione di Aho-Corasick come sopra

int main() {
    string A, B;
    cin >> A >> B;
    
    int n = A.size();
    set<string> common_substrings;
    
    // Genera tutte le sottostringhe di A
    vector<string> substrings;
    for (int i = 0; i < n; i++) {
        for (int j = 1; i + j <= n; j++) {
            substrings.push_back(A.substr(i, j));
        }
    }
    
    // Cerca le sottostringhe in B
    AhoCorasick ac(substrings);
    vector<vector<int>> occurrences = ac.search(B);
    
    for (int i = 0; i < substrings.size(); i++) {
        if (!occurrences[i].empty()) {
            common_substrings.insert(substrings[i]);
        }
    }
    
    for (const string& s : common_substrings) {
        cout << s << endl;
    }
    
    return 0;
}`}</code></pre>
        </div>
        
        <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Problema 3: Filtraggio di Testo</h3>
          <p className="mb-2">
            <strong>Descrizione:</strong> Ti viene dato un testo T e un insieme di parole proibite P. Sostituisci ogni occorrenza di una parola proibita con asterischi.
          </p>
          <p className="mb-2">
            <strong>Soluzione:</strong> Utilizziamo Aho-Corasick per trovare tutte le occorrenze delle parole proibite, e poi le sostituiamo con asterischi.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mt-2"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Implementazione di Aho-Corasick come sopra

string filter_text(const string& text, const vector<string>& forbidden_words) {
    AhoCorasick ac(forbidden_words);
    vector<vector<int>> occurrences = ac.search(text);
    
    // Crea una mappa di posizioni da censurare
    map<int, int> censored;
    for (int i = 0; i < forbidden_words.size(); i++) {
        for (int pos : occurrences[i]) {
            int length = forbidden_words[i].size();
            for (int j = pos; j < pos + length; j++) {
                censored[j] = 1;
            }
        }
    }
    
    // Costruisci il testo censurato
    string result = text;
    for (auto& [pos, _] : censored) {
        result[pos] = '*';
    }
    
    return result;
}

int main() {
    string text;
    int n;
    cin >> text >> n;
    
    vector<string> forbidden_words(n);
    for (int i = 0; i < n; i++) {
        cin >> forbidden_words[i];
    }
    
    string filtered = filter_text(text, forbidden_words);
    cout << filtered << endl;
    
    return 0;
}`}</code></pre>
        </div>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">10. Conclusioni e Risorse Aggiuntive</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo di Aho-Corasick è uno strumento potente per la ricerca di pattern multipli in un testo. La sua efficienza lo rende particolarmente utile in applicazioni che richiedono la ricerca di un gran numero di pattern contemporaneamente.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Sebbene l'implementazione possa sembrare complessa, i concetti fondamentali sono relativamente semplici: costruiamo un Trie con tutti i pattern, calcoliamo i link di fallimento per gestire i mismatch, e utilizziamo gli output links per identificare rapidamente tutti i pattern trovati.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">Risorse Aggiuntive</h3>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">
            <a href="https://en.wikipedia.org/wiki/Aho%E2%80%93Corasick_algorithm" className="text-blue-600 dark:text-blue-400 hover:underline">Wikipedia: Aho-Corasick Algorithm</a>
          </li>
          <li className="mb-1">
            <a href="https://cp-algorithms.com/string/aho_corasick.html" className="text-blue-600 dark:text-blue-400 hover:underline">CP-Algorithms: Aho-Corasick Algorithm</a>
          </li>
          <li className="mb-1">
            <a href="https://www.geeksforgeeks.org/aho-corasick-algorithm-pattern-searching/" className="text-blue-600 dark:text-blue-400 hover:underline">GeeksforGeeks: Aho-Corasick Algorithm</a>
          </li>
          <li className="mb-1">
            <a href="https://www.cs.uku.fi/~kilpelai/BSA05/lectures/slides04.pdf" className="text-blue-600 dark:text-blue-400 hover:underline">Lecture Slides: Aho-Corasick Algorithm</a>
          </li>
        </ul>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">11. Esercizi Proposti</h2>
        <p className="text-lg leading-relaxed mb-4">
          Per padroneggiare l'algoritmo di Aho-Corasick, ti consigliamo di risolvere i seguenti problemi:
        </p>
        
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Esercizio 1: SPOJ DICT - Search in the dictionary</h3>
          <p className="mb-2">
            Dato un dizionario di parole e un insieme di query, trova tutte le parole nel dizionario che iniziano con ogni query.
          </p>
          <p>
            <a href="https://www.spoj.com/problems/DICT/" className="text-blue-600 dark:text-blue-400 hover:underline">Link al problema</a>
          </p>
        </div>
        
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Esercizio 2: Codeforces 963D - Frequency of String</h3>
          <p className="mb-2">
            Dato un testo e un insieme di pattern, trova la lunghezza minima di una sottostringa del testo che contiene almeno k occorrenze di ogni pattern.
          </p>
          <p>
            <a href="https://codeforces.com/problemset/problem/963/D" className="text-blue-600 dark:text-blue-400 hover:underline">Link al problema</a>
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Esercizio 3: SPOJ ADAJOBS - Ada and Jobs</h3>
          <p className="mb-2">
            Implementa un sistema di ricerca di parole chiave in un insieme di documenti.
          </p>
          <p>
            <a href="https://www.spoj.com/problems/ADAJOBS/" className="text-blue-600 dark:text-blue-400 hover:underline">Link al problema</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default AhoCorasickPage;
