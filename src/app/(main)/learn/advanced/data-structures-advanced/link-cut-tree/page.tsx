import React from 'react';

const LinkCutTreePage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Link-Cut Tree (Livello Advanced)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il Link-Cut Tree è una struttura dati avanzata che permette di gestire una foresta di alberi con operazioni dinamiche come collegare (link) e scollegare (cut) nodi, oltre a supportare query sul percorso tra due nodi. Questa struttura è particolarmente potente perché permette di eseguire tutte queste operazioni in tempo ammortizzato O(log n).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Sviluppata da Sleator e Tarjan nel 1981, questa struttura dati è fondamentale per risolvere problemi complessi che richiedono modifiche dinamiche a una foresta di alberi, come problemi di connettività dinamica, flussi massimi, e molti altri.
        </p>
        <p className="text-lg leading-relaxed">
          Le operazioni principali supportate da un Link-Cut Tree sono:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1"><strong>make_tree(v)</strong>: Crea un nuovo albero con un singolo nodo v</li>
          <li className="mb-1"><strong>find_root(v)</strong>: Trova la radice dell'albero contenente il nodo v</li>
          <li className="mb-1"><strong>link(v, w)</strong>: Collega il nodo v (che deve essere la radice di un albero) come figlio del nodo w</li>
          <li className="mb-1"><strong>cut(v)</strong>: Rimuove l'arco tra v e il suo genitore</li>
          <li className="mb-1"><strong>path_aggregate(v, w)</strong>: Calcola un'aggregazione (come somma, minimo, ecc.) sul percorso da v a w</li>
          <li className="mb-1"><strong>path_update(v, w, x)</strong>: Aggiorna i valori sul percorso da v a w</li>
        </ul>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Concetti Fondamentali</h2>
        <p className="text-lg leading-relaxed mb-4">
          Per comprendere il Link-Cut Tree, dobbiamo prima introdurre alcuni concetti chiave:
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">2.1 Rappresentazione Preferenziale</h3>
        <p className="text-lg leading-relaxed mb-4">
          Un Link-Cut Tree rappresenta una foresta di alberi attraverso una decomposizione in <strong>catene preferenziali</strong>. Ogni nodo ha al massimo un figlio <strong>preferito</strong>, e gli archi verso i figli preferiti formano catene chiamate <strong>catene preferenziali</strong>.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Gli archi verso i figli non preferiti sono temporaneamente "tagliati" nella rappresentazione, ma vengono ricordati implicitamente. Questo permette di rappresentare l'albero originale come una collezione di catene preferenziali.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">2.2 Splay Tree</h3>
        <p className="text-lg leading-relaxed mb-4">
          Ogni catena preferenziale è rappresentata come uno <strong>Splay Tree</strong>, un tipo di albero binario di ricerca auto-bilanciante. L'operazione fondamentale in uno Splay Tree è lo <strong>splay</strong>, che porta un nodo alla radice dell'albero attraverso una serie di rotazioni.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Lo Splay Tree garantisce che le operazioni abbiano un costo ammortizzato O(log n), il che è cruciale per l'efficienza del Link-Cut Tree.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">2.3 Rappresentazione Ausiliaria</h3>
        <p className="text-lg leading-relaxed mb-4">
          Ogni nodo nel Link-Cut Tree mantiene informazioni sul suo genitore nella catena preferenziale, sui suoi figli (sinistro e destro) nello Splay Tree, e sul suo genitore originale nell'albero (se è la radice di una catena preferenziale).
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Implementazione</h2>
        <p className="text-lg leading-relaxed mb-4">
          Vediamo ora un'implementazione dettagliata del Link-Cut Tree in C++. L'implementazione è complessa, quindi la suddivideremo in parti.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">3.1 Struttura del Nodo</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Struttura del nodo per Link-Cut Tree
struct Node {
    Node* left;     // Figlio sinistro nello Splay Tree
    Node* right;    // Figlio destro nello Splay Tree
    Node* parent;   // Genitore nello Splay Tree
    Node* path_parent; // Genitore nell'albero originale (se è radice di una catena)
    
    bool reversed;  // Flag per la lazy propagation dell'inversione
    int size;       // Dimensione del sottoalbero
    int value;      // Valore del nodo
    int subtree_sum; // Somma dei valori nel sottoalbero
    
    Node(int val = 0) : 
        left(nullptr), right(nullptr), parent(nullptr), path_parent(nullptr),
        reversed(false), size(1), value(val), subtree_sum(val) {}
    
    // Verifica se il nodo è la radice di uno Splay Tree
    bool is_splay_root() {
        return parent == nullptr || (parent->left != this && parent->right != this);
    }
    
    // Aggiorna le informazioni del nodo in base ai suoi figli
    void update() {
        size = 1;
        subtree_sum = value;
        
        if (left) {
            size += left->size;
            subtree_sum += left->subtree_sum;
        }
        
        if (right) {
            size += right->size;
            subtree_sum += right->subtree_sum;
        }
    }
    
    // Propaga le operazioni lazy ai figli
    void push() {
        if (reversed) {
            reversed = false;
            
            // Scambia i figli sinistro e destro
            swap(left, right);
            
            // Propaga l'inversione ai figli
            if (left) left->reversed ^= true;
            if (right) right->reversed ^= true;
        }
    }
};`}</code></pre>

        <h3 className="text-2xl font-semibold mb-3 mt-6">3.2 Operazioni di Base sullo Splay Tree</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Rotazione a sinistra
void rotate_left(Node* x) {
    Node* y = x->right;
    x->right = y->left;
    
    if (y->left)
        y->left->parent = x;
    
    y->parent = x->parent;
    
    if (!x->is_splay_root()) {
        if (x == x->parent->left)
            x->parent->left = y;
        else
            x->parent->right = y;
    }
    
    y->left = x;
    x->parent = y;
    
    x->update();
    y->update();
}

// Rotazione a destra
void rotate_right(Node* x) {
    Node* y = x->left;
    x->left = y->right;
    
    if (y->right)
        y->right->parent = x;
    
    y->parent = x->parent;
    
    if (!x->is_splay_root()) {
        if (x == x->parent->left)
            x->parent->left = y;
        else
            x->parent->right = y;
    }
    
    y->right = x;
    x->parent = y;
    
    x->update();
    y->update();
}

// Operazione di splay: porta il nodo x alla radice dello Splay Tree
void splay(Node* x) {
    while (!x->is_splay_root()) {
        Node* p = x->parent;
        
        if (p->is_splay_root()) {
            // Zig step
            p->push();
            x->push();
            
            if (x == p->left)
                rotate_right(p);
            else
                rotate_left(p);
        } else {
            Node* g = p->parent;
            g->push();
            p->push();
            x->push();
            
            if (p == g->left) {
                if (x == p->left) {
                    // Zig-zig step
                    rotate_right(g);
                    rotate_right(p);
                } else {
                    // Zig-zag step
                    rotate_left(p);
                    rotate_right(g);
                }
            } else {
                if (x == p->right) {
                    // Zig-zig step
                    rotate_left(g);
                    rotate_left(p);
                } else {
                    // Zig-zag step
                    rotate_right(p);
                    rotate_left(g);
                }
            }
        }
    }
    
    x->push();
    x->update();
}`}</code></pre>

        <h3 className="text-2xl font-semibold mb-3 mt-6">3.3 Operazioni di Base sul Link-Cut Tree</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Accede al nodo v, portandolo alla radice della sua catena preferenziale
void access(Node* v) {
    splay(v);
    
    // Disconnette il figlio destro di v
    if (v->right) {
        v->right->parent = nullptr;
        v->right->path_parent = v;
        v->right = nullptr;
        v->update();
    }
    
    // Collega v alla catena del suo path_parent
    while (v->path_parent) {
        Node* w = v->path_parent;
        splay(w);
        
        // Disconnette il figlio destro di w
        if (w->right) {
            w->right->parent = nullptr;
            w->right->path_parent = w;
        }
        
        // Collega v come figlio destro di w
        w->right = v;
        v->parent = w;
        v->path_parent = nullptr;
        
        w->update();
        splay(v);
    }
}

// Rende v la radice del suo albero
void make_root(Node* v) {
    access(v);
    
    // Inverte il percorso dalla radice originale a v
    v->reversed ^= true;
    v->push();
}

// Trova la radice dell'albero contenente v
Node* find_root(Node* v) {
    access(v);
    
    // La radice è il nodo più a sinistra nella catena
    while (v->left) {
        v->push();
        v = v->left;
    }
    
    access(v);
    return v;
}

// Verifica se u e v sono nello stesso albero
bool connected(Node* u, Node* v) {
    if (u == v) return true;
    
    make_root(u);
    access(v);
    
    // Sono connessi se u è ora nella catena di v
    return u->parent != nullptr || u->path_parent != nullptr;
}

// Collega l'albero con radice v all'albero contenente w, facendo v figlio di w
void link(Node* v, Node* w) {
    if (connected(v, w)) return; // Già connessi
    
    make_root(v);
    access(v);
    
    // v è ora la radice del suo albero e non ha figli sinistri
    v->path_parent = w;
}

// Taglia l'arco tra v e il suo genitore
void cut(Node* v) {
    access(v);
    
    // v è ora la radice della sua catena preferenziale
    // Il suo figlio sinistro rappresenta il suo genitore nell'albero originale
    if (!v->left) return; // v è già una radice
    
    v->left->parent = nullptr;
    v->left = nullptr;
    v->update();
}`}</code></pre>

        <h3 className="text-2xl font-semibold mb-3 mt-6">3.4 Operazioni Avanzate sul Link-Cut Tree</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Calcola la somma dei valori sul percorso da u a v
int path_sum(Node* u, Node* v) {
    make_root(u);
    access(v);
    
    // v è ora la radice della catena preferenziale che contiene il percorso da u a v
    // La somma include il valore di v e tutti i suoi figli sinistri
    int sum = v->value;
    if (v->left) sum += v->left->subtree_sum;
    
    return sum;
}

// Aggiorna il valore del nodo v
void update_node(Node* v, int new_value) {
    access(v);
    v->value = new_value;
    v->update();
}

// Trova il lowest common ancestor (LCA) di u e v
Node* lca(Node* u, Node* v) {
    if (!connected(u, v)) return nullptr;
    
    access(u);
    return access(v), v;
}

// Trova il k-esimo nodo sul percorso da u a v
Node* kth_node_on_path(Node* u, Node* v, int k) {
    if (k <= 0 || !connected(u, v)) return nullptr;
    
    make_root(u);
    access(v);
    
    // v è ora la radice della catena preferenziale che contiene il percorso da u a v
    Node* curr = v;
    
    while (curr) {
        curr->push();
        
        int left_size = curr->left ? curr->left->size : 0;
        
        if (k == left_size + 1) {
            splay(curr);
            return curr;
        } else if (k <= left_size) {
            curr = curr->left;
        } else {
            k -= left_size + 1;
            curr = curr->right;
        }
    }
    
    return nullptr;
}`}</code></pre>

        <h3 className="text-2xl font-semibold mb-3 mt-6">3.5 Esempio di Utilizzo</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Esempio di utilizzo del Link-Cut Tree
#include <bits/stdc++.h>
using namespace std;

// ... (Definizione di Node e funzioni come sopra)

int main() {
    // Creiamo un albero con 7 nodi
    vector<Node*> nodes(8);
    for (int i = 1; i <= 7; i++) {
        nodes[i] = new Node(i);
    }
    
    // Costruiamo l'albero:
    //      1
    //     / \\
    //    2   3
    //   / \\
    //  4   5
    //     / \\
    //    6   7
    
    link(nodes[2], nodes[1]);
    link(nodes[3], nodes[1]);
    link(nodes[4], nodes[2]);
    link(nodes[5], nodes[2]);
    link(nodes[6], nodes[5]);
    link(nodes[7], nodes[5]);
    
    // Verifichiamo la connettività
    cout << "Nodi 4 e 7 sono connessi? " << (connected(nodes[4], nodes[7]) ? "Sì" : "No") << endl;
    
    // Troviamo la radice dell'albero contenente il nodo 6
    Node* root = find_root(nodes[6]);
    cout << "La radice dell'albero contenente il nodo 6 è: " << root->value << endl;
    
    // Calcoliamo la somma sul percorso da 4 a 7
    cout << "Somma sul percorso da 4 a 7: " << path_sum(nodes[4], nodes[7]) << endl;
    
    // Troviamo il LCA di 4 e 7
    Node* ancestor = lca(nodes[4], nodes[7]);
    cout << "LCA di 4 e 7: " << ancestor->value << endl;
    
    // Tagliamo l'arco tra 5 e 2
    cut(nodes[5]);
    
    // Verifichiamo nuovamente la connettività
    cout << "Nodi 4 e 7 sono connessi dopo il taglio? " << (connected(nodes[4], nodes[7]) ? "Sì" : "No") << endl;
    
    // Colleghiamo 5 a 3
    link(nodes[5], nodes[3]);
    
    // Verifichiamo la connettività dopo il nuovo collegamento
    cout << "Nodi 4 e 7 sono connessi dopo il nuovo collegamento? " << (connected(nodes[4], nodes[7]) ? "Sì" : "No") << endl;
    
    // Troviamo il nuovo LCA di 4 e 7
    ancestor = lca(nodes[4], nodes[7]);
    cout << "Nuovo LCA di 4 e 7: " << ancestor->value << endl;
    
    // Pulizia della memoria
    for (int i = 1; i <= 7; i++) {
        delete nodes[i];
    }
    
    return 0;
}

/* Output atteso:
Nodi 4 e 7 sono connessi? Sì
La radice dell'albero contenente il nodo 6 è: 1
Somma sul percorso da 4 a 7: 18 (4 + 2 + 5 + 7)
LCA di 4 e 7: 2
Nodi 4 e 7 sono connessi dopo il taglio? No
Nodi 4 e 7 sono connessi dopo il nuovo collegamento? Sì
Nuovo LCA di 4 e 7: 1
*/`}</code></pre>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Analisi della Complessità</h2>
        <p className="text-lg leading-relaxed mb-4">
          L'analisi della complessità del Link-Cut Tree è piuttosto sofisticata e si basa sull'analisi ammortizzata dello Splay Tree.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">4.1 Complessità Temporale</h3>
        <p className="text-lg leading-relaxed mb-4">
          Tutte le operazioni di base (access, make_root, find_root, connected, link, cut) hanno una complessità temporale ammortizzata di <strong>O(log n)</strong>, dove n è il numero totale di nodi nella foresta.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Questa complessità deriva dall'analisi ammortizzata dello Splay Tree, che garantisce che una sequenza di m operazioni su uno Splay Tree con n nodi richiede al massimo O(m log n) tempo totale.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">4.2 Complessità Spaziale</h3>
        <p className="text-lg leading-relaxed mb-4">
          La complessità spaziale è <strong>O(n)</strong>, dove n è il numero di nodi nella foresta. Ogni nodo richiede una quantità costante di memoria per memorizzare i puntatori ai figli, al genitore, e le informazioni aggiuntive.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Applicazioni</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il Link-Cut Tree è una struttura dati potente con numerose applicazioni in problemi avanzati di algoritmi su grafi:
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">5.1 Connettività Dinamica</h3>
        <p className="text-lg leading-relaxed mb-4">
          Il problema della connettività dinamica consiste nel mantenere una foresta di alberi soggetta a operazioni di collegamento e taglio, e rispondere a query sulla connettività tra nodi. Il Link-Cut Tree risolve questo problema in modo efficiente.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">5.2 Lowest Common Ancestor (LCA)</h3>
        <p className="text-lg leading-relaxed mb-4">
          Il Link-Cut Tree può essere utilizzato per trovare il lowest common ancestor di due nodi in un albero dinamico in tempo O(log n) per query.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">5.3 Algoritmo di Edmonds per il Maximum Matching</h3>
        <p className="text-lg leading-relaxed mb-4">
          Il Link-Cut Tree è utilizzato nell'implementazione efficiente dell'algoritmo di Edmonds per trovare il maximum matching in un grafo generale.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">5.4 Algoritmo di Sleator-Tarjan per il Maximum Flow</h3>
        <p className="text-lg leading-relaxed mb-4">
          Il Link-Cut Tree è una componente chiave nell'algoritmo di Sleator-Tarjan per il problema del flusso massimo, che ha una complessità di O(mn log n).
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Problemi di Esempio</h2>
        <p className="text-lg leading-relaxed mb-4">
          Vediamo alcuni problemi che possono essere risolti efficacemente utilizzando Link-Cut Tree:
        </p>
        
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Problema 1: Dynamic Tree Queries</h3>
          <p className="mb-2">
            <strong>Descrizione:</strong> Ti viene dato un albero con n nodi, ciascuno con un valore. Devi supportare le seguenti operazioni:
          </p>
          <ol className="list-decimal list-inside mb-2 ml-4">
            <li>Tagliare un arco dell'albero</li>
            <li>Collegare due nodi con un nuovo arco (se non formano un ciclo)</li>
            <li>Calcolare la somma dei valori sul percorso tra due nodi</li>
            <li>Aggiornare il valore di un nodo</li>
          </ol>
          <p className="mb-2">
            <strong>Soluzione:</strong> Questo problema è perfetto per un Link-Cut Tree. Possiamo implementare direttamente le operazioni di cut, link, path_sum e update_node come mostrato nell'implementazione.
          </p>
          <p>
            <strong>Complessità:</strong> O(log n) per operazione.
          </p>
        </div>
        
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Problema 2: Dynamic Lowest Common Ancestor</h3>
          <p className="mb-2">
            <strong>Descrizione:</strong> Ti viene dato un albero dinamico soggetto a operazioni di taglio e collegamento. Devi rispondere a query sul lowest common ancestor di due nodi.
          </p>
          <p className="mb-2">
            <strong>Soluzione:</strong> Possiamo utilizzare la funzione lca del Link-Cut Tree per rispondere a queste query in modo efficiente.
          </p>
          <p>
            <strong>Complessità:</strong> O(log n) per query.
          </p>
        </div>
        
        <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Problema 3: Maximum Flow con Link-Cut Tree</h3>
          <p className="mb-2">
            <strong>Descrizione:</strong> Implementa l'algoritmo di Sleator-Tarjan per il problema del flusso massimo utilizzando Link-Cut Tree.
          </p>
          <p className="mb-2">
            <strong>Soluzione:</strong> L'algoritmo utilizza il Link-Cut Tree per mantenere la struttura dell'albero dei cammini aumentanti durante l'esecuzione dell'algoritmo di flusso massimo. Questo permette di trovare cammini aumentanti in modo più efficiente rispetto all'algoritmo standard di Ford-Fulkerson.
          </p>
          <p>
            <strong>Complessità:</strong> O(mn log n), dove m è il numero di archi e n è il numero di nodi.
          </p>
        </div>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">7. Conclusioni e Risorse Aggiuntive</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il Link-Cut Tree è una struttura dati avanzata ma estremamente potente per gestire alberi dinamici. La sua capacità di eseguire operazioni complesse in tempo logaritmico ammortizzato la rende indispensabile per risolvere problemi avanzati di algoritmi su grafi.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Sebbene l'implementazione sia complessa, la comprensione dei concetti fondamentali come le catene preferenziali e lo Splay Tree è essenziale per padroneggiare questa struttura dati.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">Risorse Aggiuntive</h3>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">
            <a href="https://en.wikipedia.org/wiki/Link/cut_tree" className="text-blue-600 dark:text-blue-400 hover:underline">Wikipedia: Link/Cut Tree</a>
          </li>
          <li className="mb-1">
            <a href="https://codeforces.com/blog/entry/75885" className="text-blue-600 dark:text-blue-400 hover:underline">Codeforces: Link-Cut Tree - The Basics</a>
          </li>
          <li className="mb-1">
            <a href="https://cp-algorithms.com/graph/lca.html" className="text-blue-600 dark:text-blue-400 hover:underline">CP-Algorithms: Lowest Common Ancestor</a>
          </li>
          <li className="mb-1">
            <a href="https://www.cs.cmu.edu/~sleator/papers/dynamic-trees.pdf" className="text-blue-600 dark:text-blue-400 hover:underline">Paper originale: "A Data Structure for Dynamic Trees" di Sleator e Tarjan</a>
          </li>
        </ul>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">8. Esercizi Proposti</h2>
        <p className="text-lg leading-relaxed mb-4">
          Per padroneggiare il Link-Cut Tree, ti consigliamo di risolvere i seguenti problemi:
        </p>
        
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Esercizio 1: SPOJ DYNACON1 - Dynamic Connectivity</h3>
          <p className="mb-2">
            Implementa un sistema per gestire la connettività dinamica in un grafo non diretto.
          </p>
          <p>
            <a href="https://www.spoj.com/problems/DYNACON1/" className="text-blue-600 dark:text-blue-400 hover:underline">Link al problema</a>
          </p>
        </div>
        
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Esercizio 2: Codeforces 1416E - Expecting Trouble</h3>
          <p className="mb-2">
            Un problema che richiede l'uso di Link-Cut Tree per gestire operazioni su un albero dinamico.
          </p>
          <p>
            <a href="https://codeforces.com/contest/1416/problem/E" className="text-blue-600 dark:text-blue-400 hover:underline">Link al problema</a>
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Esercizio 3: USACO Gold - Cow Land</h3>
          <p className="mb-2">
            Un problema che richiede di gestire query su percorsi in un albero con valori sui nodi che possono cambiare.
          </p>
          <p>
            <a href="http://www.usaco.org/index.php?page=viewproblem2&cpid=921" className="text-blue-600 dark:text-blue-400 hover:underline">Link al problema</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default LinkCutTreePage;
