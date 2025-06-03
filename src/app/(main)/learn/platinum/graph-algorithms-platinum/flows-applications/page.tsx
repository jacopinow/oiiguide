import React from 'react';

const FlowsApplicationsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Applicazioni dei Flussi (Livello Platinum)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione alle Applicazioni dei Flussi</h2>
        <p className="text-lg leading-relaxed mb-4">
          Nelle lezioni precedenti, abbiamo studiato gli algoritmi per il flusso massimo e il min cost max flow. Questi algoritmi sono potenti strumenti che possono essere utilizzati per risolvere una vasta gamma di problemi apparentemente non correlati ai flussi.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In questa lezione, esploreremo diverse applicazioni avanzate degli algoritmi di flusso, concentrandoci su come modellare problemi complessi come problemi di flusso. Vedremo come trasformare problemi di:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Bipartite matching e varianti</li>
          <li className="mb-1">Vertex cover e edge cover</li>
          <li className="mb-1">Cammini disgiunti</li>
          <li className="mb-1">Problemi di taglio</li>
          <li className="mb-1">Problemi di connettività</li>
          <li className="mb-1">Problemi di scheduling</li>
        </ul>
        <p className="text-lg leading-relaxed">
          La capacità di ridurre problemi complessi a problemi di flusso è una competenza fondamentale nella programmazione competitiva di livello avanzato, poiché permette di utilizzare algoritmi efficienti e ben studiati per risolvere una vasta gamma di problemi.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Bipartite Matching e Varianti</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il matching bipartito è uno dei problemi più classici che possono essere risolti con algoritmi di flusso.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>2.1 Matching Bipartito Massimo:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Dato un grafo bipartito G = (L ∪ R, E), dove L e R sono due insiemi disgiunti di nodi e ogni arco collega un nodo in L a un nodo in R, un matching è un sottoinsieme di archi tale che nessun nodo è incidente a più di un arco nel matching. Il problema del matching bipartito massimo consiste nel trovare un matching con il massimo numero di archi.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Per risolvere questo problema con un algoritmo di flusso:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Crea un grafo diretto con una sorgente s e un pozzo t.</li>
          <li className="mb-1">Collega s a ogni nodo in L con capacità 1.</li>
          <li className="mb-1">Collega ogni nodo in R a t con capacità 1.</li>
          <li className="mb-1">Per ogni arco (u, v) nel grafo bipartito originale, dove u ∈ L e v ∈ R, aggiungi un arco diretto (u, v) con capacità 1.</li>
          <li className="mb-1">Trova il flusso massimo da s a t. Il valore del flusso massimo è uguale alla dimensione del matching massimo.</li>
          <li className="mb-1">Gli archi (u, v) con flusso 1, dove u ∈ L e v ∈ R, formano il matching massimo.</li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Risoluzione del problema di matching bipartito massimo
int bipartiteMatching(int n, int m, vector<vector<int>>& graph) {
    int s = 0, t = n + m + 1;
    Dinic dinic(n + m + 2, s, t);
    
    // Collega la sorgente ai nodi del primo insieme
    for (int i = 1; i <= n; i++) {
        dinic.addEdge(s, i, 1);
    }
    
    // Collega i nodi del primo insieme ai nodi del secondo insieme
    for (int i = 1; i <= n; i++) {
        for (int j : graph[i]) {
            dinic.addEdge(i, n + j, 1);
        }
    }
    
    // Collega i nodi del secondo insieme al pozzo
    for (int j = 1; j <= m; j++) {
        dinic.addEdge(n + j, t, 1);
    }
    
    return dinic.maxFlow();
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>2.2 Matching Bipartito con Vincoli:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In alcune varianti del problema, ci sono vincoli aggiuntivi:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2"><strong>Matching con Capacità:</strong> Ogni nodo può essere abbinato a un numero limitato di nodi. Per modellare questo, basta modificare le capacità degli archi dalla sorgente ai nodi in L e dai nodi in R al pozzo.</li>
          <li className="mb-2"><strong>Matching con Preferenze:</strong> Ogni arco ha un peso che rappresenta la preferenza. Questo può essere risolto con un algoritmo di min cost max flow.</li>
          <li className="mb-2"><strong>Matching con Gruppi:</strong> I nodi sono divisi in gruppi e ci sono vincoli sul numero di abbinamenti per gruppo. Questo può essere modellato aggiungendo nodi intermedi per i gruppi.</li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Vertex Cover e Edge Cover</h2>
        <p className="text-lg leading-relaxed mb-4">
          I problemi di vertex cover e edge cover sono strettamente correlati al matching bipartito.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>3.1 Vertex Cover Minimo in Grafi Bipartiti:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Un vertex cover è un sottoinsieme di nodi tale che ogni arco del grafo è incidente ad almeno un nodo nel sottoinsieme. Il problema del vertex cover minimo consiste nel trovare un vertex cover con il minimo numero di nodi.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Per i grafi bipartiti, il teorema di König afferma che la dimensione del vertex cover minimo è uguale alla dimensione del matching massimo. Inoltre, dato un matching massimo, possiamo costruire un vertex cover minimo come segue:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Trova un matching massimo M.</li>
          <li className="mb-1">Costruisci un grafo diretto G' come segue:
            <ul className="list-disc list-inside ml-8 mt-1">
              <li>Per ogni arco (u, v) nel matching M, dove u ∈ L e v ∈ R, aggiungi un arco diretto (v, u).</li>
              <li>Per ogni arco (u, v) non nel matching M, dove u ∈ L e v ∈ R, aggiungi un arco diretto (u, v).</li>
            </ul>
          </li>
          <li className="mb-1">Trova tutti i nodi in L che non sono raggiungibili da nodi in R non abbinati in G'.</li>
          <li className="mb-1">Il vertex cover minimo è l'unione di:
            <ul className="list-disc list-inside ml-8 mt-1">
              <li>I nodi in L che sono raggiungibili da nodi in R non abbinati in G'.</li>
              <li>I nodi in R che non sono raggiungibili da nodi in R non abbinati in G'.</li>
            </ul>
          </li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Risoluzione del problema del vertex cover minimo in grafi bipartiti
vector<int> minVertexCover(int n, int m, vector<vector<int>>& graph) {
    // Trova un matching massimo
    int s = 0, t = n + m + 1;
    Dinic dinic(n + m + 2, s, t);
    
    // ... (costruzione del grafo come in bipartiteMatching)
    
    int max_matching = dinic.maxFlow();
    
    // Ricostruisci il matching
    vector<int> match_r(m + 1, -1);
    for (int i = 1; i <= n; i++) {
        for (auto& e : dinic.adj[i]) {
            if (e.flow > 0 && e.v > n && e.v <= n + m) {
                match_r[e.v - n] = i;
            }
        }
    }
    
    // Costruisci il grafo diretto G'
    vector<vector<int>> g_prime(n + m + 1);
    for (int i = 1; i <= n; i++) {
        for (int j : graph[i]) {
            if (match_r[j] == i) {
                // Arco nel matching: (v, u)
                g_prime[n + j].push_back(i);
            } else {
                // Arco non nel matching: (u, v)
                g_prime[i].push_back(n + j);
            }
        }
    }
    
    // Trova i nodi in R non abbinati
    vector<int> unmatched_r;
    for (int j = 1; j <= m; j++) {
        if (match_r[j] == -1) {
            unmatched_r.push_back(n + j);
        }
    }
    
    // BFS per trovare i nodi raggiungibili da nodi in R non abbinati
    vector<bool> reachable(n + m + 1, false);
    queue<int> q;
    for (int v : unmatched_r) {
        q.push(v);
        reachable[v] = true;
    }
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        for (int v : g_prime[u]) {
            if (!reachable[v]) {
                reachable[v] = true;
                q.push(v);
            }
        }
    }
    
    // Costruisci il vertex cover minimo
    vector<int> vertex_cover;
    for (int i = 1; i <= n; i++) {
        if (reachable[i]) {
            vertex_cover.push_back(i);
        }
    }
    for (int j = 1; j <= m; j++) {
        if (!reachable[n + j]) {
            vertex_cover.push_back(n + j);
        }
    }
    
    return vertex_cover;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>3.2 Edge Cover Minimo:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Un edge cover è un sottoinsieme di archi tale che ogni nodo del grafo è incidente ad almeno un arco nel sottoinsieme. Il problema dell'edge cover minimo consiste nel trovare un edge cover con il minimo numero di archi.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Per i grafi bipartiti senza nodi isolati, l'edge cover minimo può essere trovato a partire da un matching massimo:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Trova un matching massimo M.</li>
          <li className="mb-1">Per ogni nodo non coperto da M, aggiungi un arco incidente a quel nodo.</li>
        </ol>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Cammini Disgiunti</h2>
        <p className="text-lg leading-relaxed mb-4">
          I problemi di cammini disgiunti sono un'altra importante applicazione degli algoritmi di flusso.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>4.1 Cammini Edge-Disgiunti:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Due cammini sono edge-disgiunti se non condividono alcun arco. Il problema dei cammini edge-disgiunti massimi consiste nel trovare il massimo numero di cammini edge-disgiunti tra due nodi s e t.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Questo problema può essere risolto direttamente con un algoritmo di flusso massimo:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Assegna capacità 1 a ogni arco del grafo.</li>
          <li className="mb-1">Trova il flusso massimo da s a t. Il valore del flusso massimo è uguale al numero massimo di cammini edge-disgiunti.</li>
          <li className="mb-1">I cammini edge-disgiunti possono essere ricostruiti decomponendo il flusso.</li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Risoluzione del problema dei cammini edge-disgiunti massimi
int maxEdgeDisjointPaths(int n, vector<vector<int>>& graph, int s, int t) {
    Dinic dinic(n, s, t);
    
    // Aggiungi archi con capacità 1
    for (int u = 0; u < n; u++) {
        for (int v : graph[u]) {
            dinic.addEdge(u, v, 1);
        }
    }
    
    return dinic.maxFlow();
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>4.2 Cammini Vertex-Disgiunti:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Due cammini sono vertex-disgiunti se non condividono alcun nodo (eccetto s e t). Il problema dei cammini vertex-disgiunti massimi consiste nel trovare il massimo numero di cammini vertex-disgiunti tra due nodi s e t.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Questo problema può essere ridotto al problema dei cammini edge-disgiunti attraverso una trasformazione del grafo:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Per ogni nodo v (eccetto s e t), crea due nodi v_in e v_out.</li>
          <li className="mb-1">Aggiungi un arco (v_in, v_out) con capacità 1.</li>
          <li className="mb-1">Per ogni arco (u, v) nel grafo originale:
            <ul className="list-disc list-inside ml-8 mt-1">
              <li>Se u = s, aggiungi un arco (s, v_in) con capacità 1.</li>
              <li>Se v = t, aggiungi un arco (u_out, t) con capacità 1.</li>
              <li>Altrimenti, aggiungi un arco (u_out, v_in) con capacità 1.</li>
            </ul>
          </li>
          <li className="mb-1">Trova il flusso massimo da s a t nel nuovo grafo. Il valore del flusso massimo è uguale al numero massimo di cammini vertex-disgiunti.</li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Risoluzione del problema dei cammini vertex-disgiunti massimi
int maxVertexDisjointPaths(int n, vector<vector<int>>& graph, int s, int t) {
    // Crea un nuovo grafo con 2*n nodi
    Dinic dinic(2*n, s, t);
    
    // Aggiungi archi (v_in, v_out) con capacità 1
    for (int v = 0; v < n; v++) {
        if (v != s && v != t) {
            dinic.addEdge(v, v + n, 1);
        }
    }
    
    // Aggiungi archi dal grafo originale
    for (int u = 0; u < n; u++) {
        for (int v : graph[u]) {
            if (u == s) {
                dinic.addEdge(s, v, 1);
            } else if (v == t) {
                dinic.addEdge(u + n, t, 1);
            } else {
                dinic.addEdge(u + n, v, 1);
            }
        }
    }
    
    return dinic.maxFlow();
}
`}</code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Problemi di Taglio</h2>
        <p className="text-lg leading-relaxed mb-4">
          I problemi di taglio sono un'altra importante applicazione degli algoritmi di flusso, grazie al teorema del flusso massimo e taglio minimo.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>5.1 Taglio Minimo:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Un taglio (S, T) è una partizione dei nodi in due insiemi S e T tali che s ∈ S e t ∈ T. La capacità di un taglio è la somma delle capacità degli archi che vanno da S a T. Il problema del taglio minimo consiste nel trovare un taglio con la capacità minima.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il teorema del flusso massimo e taglio minimo afferma che il valore del flusso massimo è uguale alla capacità del taglio minimo. Quindi, possiamo trovare un taglio minimo trovando un flusso massimo e poi identificando i nodi raggiungibili dalla sorgente nella rete residua.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Risoluzione del problema del taglio minimo
pair<int, vector<int>> minCut(int n, vector<vector<pair<int, int>>>& graph, int s, int t) {
    Dinic dinic(n, s, t);
    
    // Aggiungi archi
    for (int u = 0; u < n; u++) {
        for (auto [v, cap] : graph[u]) {
            dinic.addEdge(u, v, cap);
        }
    }
    
    // Trova il flusso massimo
    int max_flow = dinic.maxFlow();
    
    // Trova i nodi raggiungibili dalla sorgente nella rete residua
    vector<bool> reachable(n, false);
    queue<int> q;
    q.push(s);
    reachable[s] = true;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        for (auto& e : dinic.adj[u]) {
            if (!reachable[e.v] && e.cap - e.flow > 0) {
                reachable[e.v] = true;
                q.push(e.v);
            }
        }
    }
    
    // Costruisci il taglio minimo
    vector<int> cut;
    for (int u = 0; u < n; u++) {
        if (reachable[u]) {
            cut.push_back(u);
        }
    }
    
    return {max_flow, cut};
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>5.2 Taglio Minimo Globale:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il problema del taglio minimo globale consiste nel trovare un taglio con la capacità minima senza specificare s e t. Questo può essere risolto con l'algoritmo di Stoer-Wagner, ma può anche essere approssimato eseguendo l'algoritmo del taglio minimo per tutte le possibili coppie di nodi.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>5.3 Taglio Multiway:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il problema del taglio multiway consiste nel partizionare i nodi in k insiemi in modo da minimizzare la capacità totale degli archi che attraversano le partizioni. Questo è un problema NP-hard in generale, ma ci sono approssimazioni basate su algoritmi di flusso.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Problemi di Connettività</h2>
        <p className="text-lg leading-relaxed mb-4">
          Gli algoritmi di flusso possono essere utilizzati per risolvere vari problemi di connettività nei grafi.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>6.1 Connettività Edge:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          La connettività edge di un grafo è il numero minimo di archi che devono essere rimossi per disconnettere il grafo. Per un grafo con n nodi, la connettività edge può essere calcolata trovando il taglio minimo tra ogni coppia di nodi e prendendo il minimo.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>6.2 Connettività Vertex:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          La connettività vertex di un grafo è il numero minimo di nodi che devono essere rimossi per disconnettere il grafo o ridurlo a un singolo nodo. Questo può essere ridotto al problema della connettività edge attraverso la stessa trasformazione usata per i cammini vertex-disgiunti.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>6.3 Teorema di Menger:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il teorema di Menger afferma che la connettività edge tra due nodi s e t è uguale al numero massimo di cammini edge-disgiunti tra s e t. Analogamente, la connettività vertex tra s e t è uguale al numero massimo di cammini vertex-disgiunti tra s e t.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">7. Problemi di Scheduling</h2>
        <p className="text-lg leading-relaxed mb-4">
          Molti problemi di scheduling possono essere modellati come problemi di flusso.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>7.1 Assegnamento di Compiti:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il problema dell'assegnamento di compiti consiste nell'assegnare n compiti a m lavoratori, dove ogni lavoratore può svolgere un sottoinsieme di compiti e ha una capacità limitata. Questo può essere modellato come un problema di flusso massimo o min cost max flow.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>7.2 Scheduling con Vincoli di Precedenza:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In alcuni problemi di scheduling, ci sono vincoli di precedenza tra i compiti (ad esempio, il compito A deve essere completato prima del compito B). Questi problemi possono essere modellati come problemi di flusso con vincoli aggiuntivi.
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>7.3 Scheduling con Risorse Limitate:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In problemi di scheduling con risorse limitate, ci sono un numero limitato di risorse che possono essere utilizzate contemporaneamente. Questi problemi possono essere modellati come problemi di flusso con capacità sugli archi che rappresentano le risorse.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">8. Esempio Dettagliato: Problema del Progetto</h2>
        <p className="text-lg leading-relaxed mb-4">
          Vediamo un esempio dettagliato di come modellare un problema complesso come un problema di flusso.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Problema:</strong> Ci sono n progetti e m lavoratori. Ogni lavoratore può lavorare su un sottoinsieme di progetti e ha un costo per ogni progetto. Ogni progetto richiede un certo numero di lavoratori. L'obiettivo è assegnare i lavoratori ai progetti in modo da soddisfare i requisiti di ogni progetto con il costo minimo.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          <strong>Soluzione:</strong>
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Crea un grafo con una sorgente s, un pozzo t, n nodi per i progetti e m nodi per i lavoratori.</li>
          <li className="mb-1">Collega s a ogni nodo progetto i con capacità req[i] (il numero di lavoratori richiesti dal progetto i) e costo 0.</li>
          <li className="mb-1">Collega ogni nodo lavoratore j a t con capacità 1 (ogni lavoratore può lavorare su al più un progetto) e costo 0.</li>
          <li className="mb-1">Per ogni coppia (i, j) tale che il lavoratore j può lavorare sul progetto i, collega il nodo progetto i al nodo lavoratore j con capacità 1 e costo cost[i][j].</li>
          <li className="mb-1">Risolvi il problema del min cost max flow. Se il flusso massimo è uguale alla somma dei requisiti dei progetti, allora esiste una soluzione valida.</li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Risoluzione del problema del progetto
pair<bool, int> projectAssignment(int n, int m, vector<int>& req, vector<vector<int>>& can_work, vector<vector<int>>& cost) {
    int s = 0, t = n + m + 1;
    int total_req = 0;
    
    MinCostMaxFlow mcmf(n + m + 2, s, t);
    
    // Collega la sorgente ai progetti
    for (int i = 1; i <= n; i++) {
        mcmf.addEdge(s, i, req[i-1], 0);
        total_req += req[i-1];
    }
    
    // Collega i lavoratori al pozzo
    for (int j = 1; j <= m; j++) {
        mcmf.addEdge(n + j, t, 1, 0);
    }
    
    // Collega i progetti ai lavoratori
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (can_work[i-1][j-1]) {
                mcmf.addEdge(i, n + j, 1, cost[i-1][j-1]);
            }
        }
    }
    
    auto [max_flow, min_cost] = mcmf.solve();
    
    // Se il flusso massimo è uguale alla somma dei requisiti, esiste una soluzione valida
    return {max_flow == total_req, min_cost};
}
`}</code></pre>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">9. Problemi di Esempio</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-2"><a href="https://cses.fi/problemset/task/1695" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - Police Chase</a>: Un problema di taglio minimo.</li>
          <li className="mb-2"><a href="https://cses.fi/problemset/task/1696" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - School Dance</a>: Un problema di matching bipartito.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/1473/problem/F" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Strange Set</a>: Un problema che può essere risolto con flusso.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/1404/problem/E" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Bricks</a>: Un problema che può essere risolto con flusso massimo.</li>
        </ul>
      </section>
    </div>
  );
};

export default FlowsApplicationsPage;
