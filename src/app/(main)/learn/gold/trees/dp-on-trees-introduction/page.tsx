import React from 'react';

const DpOnTreesIntroGoldPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Programmazione Dinamica su Alberi - Introduzione (Livello Gold)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Cos'è la Programmazione Dinamica su Alberi?</h2>
        <p className="text-lg leading-relaxed mb-4">
          La **Programmazione Dinamica su Alberi (DP su Alberi)** è una tecnica che applica i principi della programmazione dinamica per risolvere problemi su strutture ad albero. Tipicamente, si calcolano valori (stati della DP) per ogni nodo dell'albero, basandosi sui valori già calcolati per i suoi figli (o, a volte, per il suo genitore e altri antenati, a seconda del tipo di DP).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          L'idea chiave è che la soluzione per un sottoalbero radicato in un nodo `u` può essere derivata dalle soluzioni dei sottoalberi radicati nei figli di `u`. Questo si adatta bene a una traversata dell'albero, solitamente una Ricerca in Profondità (DFS).
        </p>
        <p className="text-lg leading-relaxed">
          I problemi comuni che si risolvono con DP su alberi includono:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Trovare la dimensione massima di un matching indipendente in un albero.</li>
          <li className="mb-1">Calcolare il diametro di un albero.</li>
          <li className="mb-1">Trovare il numero di modi per colorare un albero con certe restrizioni.</li>
          <li className="mb-1">Ottimizzare valori su sottoalberi (es. massima somma di un cammino, minimo numero di nodi da rimuovere per soddisfare una condizione).
          </li>
        </ul>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Definizione degli Stati della DP</h2>
        <p className="text-lg leading-relaxed mb-4">
          La parte più cruciale della DP su alberi è definire correttamente gli **stati della DP**. Lo stato `dp[u]` (o `dp[u][state_type]`) dovrebbe catturare tutte le informazioni necessarie sul sottoalbero radicato in `u` per prendere decisioni ottimali per il genitore di `u` (o per il problema complessivo se `u` è la radice).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Spesso, lo stato dipende da se il nodo `u` stesso è incluso in una qualche configurazione (es. un matching, un vertex cover) o da quale stato assume (es. colore).
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>Esempio: Massimo Matching Indipendente in un Albero</strong>
        </p>
        <p className="text-lg leading-relaxed mb-2">
          Un matching indipendente è un insieme di archi senza nodi in comune.
          Stati della DP per un nodo `u`:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">`dp[u][0]`: Dimensione massima del matching indipendente nel sottoalbero di `u`, assumendo che l'arco che connette `u` al suo genitore (se esiste) **non** sia nel matching. In questo caso, `u` è libero di essere matchato con uno dei suoi figli.</li>
          <li className="mb-1">`dp[u][1]`: Dimensione massima del matching indipendente nel sottoalbero di `u`, assumendo che l'arco che connette `u` al suo genitore (se esiste) **sia** nel matching. In questo caso, `u` è già matchato con il suo genitore e non può essere matchato con nessuno dei suoi figli.</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Questa definizione è più adatta se si pensa in termini di "il nodo u è matchato con il suo genitore" vs "il nodo u non è matchato con il suo genitore".
          Una definizione più comune e spesso più semplice per il massimo matching indipendente è:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
            <li className="mb-1">`dp[u][0]`: Dimensione massima del matching nel sottoalbero di `u`, dato che `u` **non è matchato** con nessuno dei suoi figli (ma potrebbe essere matchato con il suo genitore, se la DP è calcolata dal basso verso l'alto, questa decisione è del genitore).</li>
            <li className="mb-1">`dp[u][1]`: Dimensione massima del matching nel sottoalbero di `u`, dato che `u` **è matchato** con uno dei suoi figli.</li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Transizioni della DP (Calcolo Ricorsivo)</h2>
        <p className="text-lg leading-relaxed mb-4">
          Le transizioni sono definite durante una traversata DFS. Quando la DFS ritorna da un figlio `v` di `u`, i valori `dp[v][...]` sono già stati calcolati. Questi valori vengono usati per calcolare `dp[u][...]`.
        </p>

        <p className="text-lg leading-relaxed mb-2">
          <strong>Continuando l'esempio del Massimo Matching Indipendente (seconda definizione):</strong>
        </p>
        <p className="text-lg leading-relaxed mb-2">
          Per un nodo `u` e i suoi figli `v_1, v_2, ..., v_k`:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-2">
            <strong>`dp[u][0]` (u non è matchato con un figlio):</strong>
            Se `u` non è matchato con nessuno dei suoi figli, allora per ogni figlio `v_i`, possiamo prendere la migliore soluzione possibile per il sottoalbero di `v_i`, che è `max(dp[v_i][0], dp[v_i][1])` (poiché `v_i` può essere matchato con un suo figlio o meno, dato che `u` non lo sta usando).
            Quindi, `dp[u][0] = Σ_{i} max(dp[v_i][0], dp[v_i][1])`.
          </li>
          <li className="mb-2">
            <strong>`dp[u][1]` (u è matchato con un figlio `v_j`):</strong>
            Se `u` è matchato con un figlio `v_j`, allora l'arco `(u, v_j)` contribuisce con 1 al matching. Per questo figlio `v_j`, esso non può essere matchato con i suoi figli, quindi contribuisce con `dp[v_j][0]`. Per tutti gli altri figli `v_i` (con `i != j`), `u` non è matchato con loro, quindi contribuiscono con `max(dp[v_i][0], dp[v_i][1])`.
            Dobbiamo scegliere il figlio `v_j` che massimizza questa quantità:
            `dp[u][1] = max_{v_j ∈ children(u)} (1 + dp[v_j][0] + Σ_{v_i ∈ children(u), i!=j} max(dp[v_i][0], dp[v_i][1]))`.
            Questo può essere riscritto come:
            `dp[u][1] = max_{v_j ∈ children(u)} (1 + dp[v_j][0] - max(dp[v_j][0], dp[v_j][1]) + Σ_{v_i ∈ children(u)} max(dp[v_i][0], dp[v_i][1]))`
            `dp[u][1] = Σ_{v_i ∈ children(u)} max(dp[v_i][0], dp[v_i][1]) + max_{v_j ∈ children(u)} (1 + dp[v_j][0] - max(dp[v_j][0], dp[v_j][1]))`.
            Nota che `Σ_{v_i ∈ children(u)} max(dp[v_i][0], dp[v_i][1])` è `dp[u][0]`. Quindi:
            `dp[u][1] = dp[u][0] + max_{v_j ∈ children(u)} (1 + dp[v_j][0] - max(dp[v_j][0], dp[v_j][1]))`.
            Se non ci sono figli, `dp[u][1]` è tipicamente `-∞` o non possibile.
          </li>
        </ul>
        <p className="text-lg leading-relaxed">
          La risposta finale per l'albero radicato in `root` sarà `max(dp[root][0], dp[root][1])`.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <vector>
#include <algorithm> // Per std::max

const int MAXN_DP_TREES = 100005;
std::vector<int> adj_dp[MAXN_DP_TREES];
long long dp[MAXN_DP_TREES][2]; // dp[u][0]: u non matchato con figli, dp[u][1]: u matchato con un figlio
bool visited_dp[MAXN_DP_TREES];

void dfs_max_matching(int u, int p) {
  visited_dp[u] = true;
  dp[u][0] = 0;
  dp[u][1] = -1e18; // Inizializza a un valore molto piccolo, indica non possibile se non ci sono figli

  bool has_children = false;
  long long sum_of_max_children = 0;

  for (int v : adj_dp[u]) {
    if (v == p) continue;
    has_children = true;
    dfs_max_matching(v, u);
    sum_of_max_children += std::max(dp[v][0], dp[v][1]);
  }

  dp[u][0] = sum_of_max_children;

  if (has_children) {
      dp[u][1] = -1e18; // Resetta per il calcolo corretto del massimo
      for (int v : adj_dp[u]) {
          if (v == p) continue;
          // Contributo se u è matchato con v:
          // 1 (per l'arco u-v) + dp[v][0] (v non può essere matchato con i suoi figli)
          // + somma dei max(dp[figlio_k][0], dp[figlio_k][1]) per tutti gli altri figli k != v
          long long current_match_with_v = 1 + dp[v][0] + (sum_of_max_children - std::max(dp[v][0], dp[v][1]));
          dp[u][1] = std::max(dp[u][1], current_match_with_v);
      }
  } else {
      // Se u è una foglia, non può essere matchato con un figlio.
      // dp[u][1] rimane -INF (o 0 se si definisce che un matching di 0 archi è possibile)
      // Per coerenza, se non può formare un arco con un figlio, dp[u][1] dovrebbe essere -INF.
      // Se il problema permette matching di 0, allora dp[u][0]=0, dp[u][1]=0 per una foglia.
      // La definizione qui implica che dp[u][1] è il caso in cui u *forma* un arco con un figlio.
      // Quindi per una foglia, dp[u][1] è -INF.
      dp[u][1] = -1e18; // Nodo foglia non può essere matchato con un figlio
  }
}

// Esempio di utilizzo:
// int main() {
//   int n_nodes_tree = 5;
//   adj_dp[0] = {1};
//   adj_dp[1] = {0, 2, 3};
//   adj_dp[2] = {1};
//   adj_dp[3] = {1, 4};
//   adj_dp[4] = {3};
// 
//   for(int i=0; i<n_nodes_tree; ++i) visited_dp[i] = false;
//   dfs_max_matching(0, -1); // Radice 0, nessun genitore
// 
//   long long ans = std::max(dp[0][0], dp[0][1]);
//   if (ans < 0) ans = 0; // Se nessun matching è possibile (es. albero con 1 nodo)
//   std::cout << "Dimensione massima del matching indipendente: " << ans << std::endl;
//   // Per l'albero esempio: 0-1, 3-4. Risultato: 2
//   return 0;
// }`}</code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Ordine di Calcolo e Casi Base</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1"><strong>Ordine Post-Order (DFS):</strong> La DP su alberi è tipicamente calcolata usando una traversata DFS. I valori per un nodo `u` sono calcolati dopo che la DFS ha visitato e calcolato i valori per tutti i figli di `u`.</li>
          <li className="mb-1"><strong>Casi Base:</strong> I nodi foglia sono i casi base. Per una foglia `l`, `dp[l][0]` è solitamente 0 (nessun arco nel sottoalbero). `dp[l][1]` (se `l` è matchato con un figlio) è spesso `-∞` o 0 a seconda della definizione esatta e del problema.</li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Complessità</h2>
        <p className="text-lg leading-relaxed mb-4">
          Se ogni stato della DP per un nodo `u` può essere calcolato in tempo proporzionale al numero dei suoi figli (o un piccolo numero di stati per figlio), e ogni arco dell'albero viene attraversato due volte dalla DFS, la complessità totale è solitamente **O(N * S)** o **O(N * S<sup>2</sup>)**, dove N è il numero di nodi e S è il numero di stati per nodo (o il numero massimo di figli per nodo se le transizioni dipendono da quello).
        </p>
        <p className="text-lg leading-relaxed">
          Per l'esempio del massimo matching con 2 stati per nodo, e transizioni che iterano sui figli, la complessità è O(N) perché ogni arco `(u,v)` è considerato una volta quando si calcola `dp[u]` basandosi su `dp[v]`. Ogni nodo viene visitato una volta dalla DFS.
        </p>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti a Concetti Prerequisiti e Successivi</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Prerequisito:</strong> Alberi, Ricerca in Profondità (DFS).</li>
          <li className="mb-2"><strong>Prerequisito:</strong> Programmazione Dinamica (concetti base).</li>
          <li className="mb-2"><strong>Concetto Correlato:</strong> <a href="./euler-tour-technique" className="text-blue-600 dark:text-blue-400 hover:underline">Tecnica del Tour di Eulero</a> (può essere usata in combinazione se le query sono su sottoalberi e ci sono aggiornamenti).</li>
          <li className="mb-2"><strong>Concetto Successivo:</strong> <a href="./dp-on-trees-solving-for-all-roots" className="text-blue-600 dark:text-blue-400 hover:underline">DP su Alberi - Risolvere per Tutte le Radici (Rerooting)</a>.</li>
          <li className="mb-2"><strong>Concetti Avanzati (Platinum):</strong> DP su alberi con stati più complessi, DP con bitmask su alberi, Centroid Decomposition con DP.</li>
        </ul>
      </section>
    </div>
  );
};

export default DpOnTreesIntroGoldPage;

