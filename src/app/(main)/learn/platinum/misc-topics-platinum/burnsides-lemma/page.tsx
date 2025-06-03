import React from 'react';

const BurnsidesLemmaPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Lemma di Burnside (Livello Platinum)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione al Lemma di Burnside</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il Lemma di Burnside (o più precisamente, il Lemma di Burnside-Frobenius) è un potente strumento della teoria dei gruppi che ci permette di contare il numero di configurazioni uniche considerando le simmetrie. Questo lemma è particolarmente utile nei problemi di enumerazione dove dobbiamo contare oggetti tenendo conto delle loro simmetrie.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In termini semplici, il lemma ci aiuta a rispondere a domande del tipo: "In quanti modi diversi posso colorare le facce di un cubo con n colori?" o "Quante collane diverse posso formare con n perline di m colori?". In questi problemi, due configurazioni sono considerate equivalenti se una può essere trasformata nell'altra attraverso una rotazione o un'altra trasformazione.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il lemma di Burnside è strettamente correlato al concetto di "orbita" e "stabilizzatore" nella teoria dei gruppi. Un'orbita è l'insieme di tutti gli elementi che possono essere raggiunti applicando le trasformazioni del gruppo, mentre lo stabilizzatore di un elemento è il sottogruppo di trasformazioni che lasciano quell'elemento invariato.
        </p>
        <p className="text-lg leading-relaxed">
          Questo potente strumento matematico ha numerose applicazioni nella programmazione competitiva, specialmente nei problemi di conteggio con simmetrie.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Formulazione Matematica</h2>
        <p className="text-lg leading-relaxed mb-4">
          Sia G un gruppo finito che agisce su un insieme X. Per ogni g ∈ G, definiamo X<sup>g</sup> come l'insieme degli elementi di X che sono fissati da g:
        </p>
        <p className="text-lg leading-relaxed mb-4 text-center">
          X<sup>g</sup> = {x ∈ X | g·x = x}
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il lemma di Burnside afferma che il numero di orbite |X/G| (cioè, il numero di classi di equivalenza) è dato dalla media del numero di elementi fissati da ciascun elemento del gruppo:
        </p>
        <p className="text-lg leading-relaxed mb-4 text-center">
          |X/G| = (1/|G|) · Σ<sub>g∈G</sub> |X<sup>g</sup>|
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In altre parole, per trovare il numero di configurazioni uniche, dobbiamo:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Identificare il gruppo G di trasformazioni (simmetrie)</li>
          <li className="mb-1">Per ogni trasformazione g ∈ G, contare quanti elementi di X rimangono invariati sotto g</li>
          <li className="mb-1">Calcolare la media di questi conteggi</li>
        </ol>
        <p className="text-lg leading-relaxed">
          Questa formula può sembrare astratta, ma diventa più chiara quando applicata a problemi concreti.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Esempio: Colorazione di un Quadrato</h2>
        <p className="text-lg leading-relaxed mb-4">
          Consideriamo un esempio semplice: in quanti modi diversi possiamo colorare i quattro vertici di un quadrato usando due colori (bianco e nero), considerando le rotazioni come equivalenti?
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In questo caso:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">X è l'insieme di tutte le possibili colorazioni (2<sup>4</sup> = 16 in totale)</li>
          <li className="mb-1">G è il gruppo delle rotazioni del quadrato (4 rotazioni: 0°, 90°, 180°, 270°)</li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">
          Ora, dobbiamo contare quante colorazioni rimangono invariate sotto ciascuna rotazione:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1"><strong>Rotazione di 0° (identità)</strong>: Tutte le 16 colorazioni rimangono invariate.</li>
          <li className="mb-1"><strong>Rotazione di 90°</strong>: Solo le colorazioni in cui tutti i vertici hanno lo stesso colore rimangono invariate (2 colorazioni: tutto bianco o tutto nero).</li>
          <li className="mb-1"><strong>Rotazione di 180°</strong>: Le colorazioni invarianti sono quelle in cui i vertici opposti hanno lo stesso colore (2<sup>2</sup> = 4 colorazioni).</li>
          <li className="mb-1"><strong>Rotazione di 270°</strong>: Come per la rotazione di 90°, solo 2 colorazioni rimangono invariate.</li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">
          Applicando il lemma di Burnside:
        </p>
        <p className="text-lg leading-relaxed mb-4 text-center">
          |X/G| = (1/4) · (16 + 2 + 4 + 2) = (1/4) · 24 = 6
        </p>
        <p className="text-lg leading-relaxed">
          Quindi, ci sono 6 modi diversi di colorare i vertici di un quadrato considerando le rotazioni come equivalenti.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Il Teorema di Pólya</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il teorema di Pólya è un'estensione del lemma di Burnside che fornisce un metodo più efficiente per calcolare il numero di orbite, specialmente quando il numero di configurazioni è grande. Questo teorema utilizza i concetti di "inventario di cicli" e "funzione generatrice di cicli".
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Per ogni permutazione g ∈ G, definiamo il suo tipo di ciclo come la sequenza (c<sub>1</sub>, c<sub>2</sub>, ..., c<sub>n</sub>), dove c<sub>i</sub> è il numero di cicli di lunghezza i nella decomposizione ciclica di g.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il teorema di Pólya afferma che il numero di orbite è dato dal coefficiente del termine x<sub>1</sub><sup>n</sup> nel polinomio:
        </p>
        <p className="text-lg leading-relaxed mb-4 text-center">
          (1/|G|) · Σ<sub>g∈G</sub> (x<sub>1</sub><sup>c<sub>1</sub></sup> · x<sub>2</sub><sup>c<sub>2</sub></sup> · ... · x<sub>n</sub><sup>c<sub>n</sub></sup>)
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Quando abbiamo m colori, sostituiamo ogni x<sub>i</sub> con m<sup>i</sup>, e il risultato è il numero di colorazioni uniche.
        </p>
        <p className="text-lg leading-relaxed">
          Il teorema di Pólya è particolarmente utile per problemi di colorazione più complessi, come la colorazione delle facce di un cubo o la colorazione di un grafo con simmetrie.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Implementazione in C++</h2>
        <p className="text-lg leading-relaxed mb-4">
          Vediamo un'implementazione in C++ per risolvere il problema della colorazione di un collana con n perline usando m colori, considerando le rotazioni e le riflessioni come equivalenti.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Calcola il massimo comun divisore (MCD) di due numeri
int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}

// Calcola il minimo comune multiplo (mcm) di due numeri
int lcm(int a, int b) {
    return a / gcd(a, b) * b;
}

// Calcola φ(n), dove φ è la funzione di Eulero
int phi(int n) {
    int result = n;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            while (n % i == 0) {
                n /= i;
            }
            result -= result / i;
        }
    }
    if (n > 1) {
        result -= result / n;
    }
    return result;
}

// Calcola il numero di collane uniche con n perline e m colori
// considerando solo le rotazioni (formula di Burnside)
long long countNecklacesRotationOnly(int n, int m) {
    long long result = 0;
    
    // Per ogni divisore d di n
    for (int d = 1; d <= n; d++) {
        if (n % d == 0) {
            // Aggiungiamo φ(d) * m^(n/d)
            result += phi(d) * pow(m, n / d);
        }
    }
    
    // Dividiamo per n (la dimensione del gruppo di rotazioni)
    return result / n;
}

// Calcola il numero di collane uniche con n perline e m colori
// considerando rotazioni e riflessioni (formula di Burnside estesa)
long long countNecklacesRotationAndReflection(int n, int m) {
    long long result = 0;
    
    // Contributo delle rotazioni
    result = n * countNecklacesRotationOnly(n, m);
    
    // Contributo delle riflessioni
    if (n % 2 == 0) {
        // n pari
        result += n / 2 * pow(m, n / 2 + 1);
    } else {
        // n dispari
        result += n * pow(m, (n + 1) / 2);
    }
    
    // Dividiamo per 2n (la dimensione del gruppo diedrale D_n)
    return result / (2 * n);
}

int main() {
    int n, m;
    cout << "Inserisci il numero di perline (n): ";
    cin >> n;
    cout << "Inserisci il numero di colori (m): ";
    cin >> m;
    
    long long rotationOnly = countNecklacesRotationOnly(n, m);
    long long rotationAndReflection = countNecklacesRotationAndReflection(n, m);
    
    cout << "Numero di collane uniche considerando solo le rotazioni: " << rotationOnly << endl;
    cout << "Numero di collane uniche considerando rotazioni e riflessioni: " << rotationAndReflection << endl;
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4">
          Questa implementazione utilizza formule derivate dal lemma di Burnside per calcolare il numero di collane uniche. La funzione <code>countNecklacesRotationOnly</code> considera solo le rotazioni, mentre <code>countNecklacesRotationAndReflection</code> considera sia le rotazioni che le riflessioni.
        </p>
        <p className="text-lg leading-relaxed">
          La formula per le collane con solo rotazioni è nota come formula di Burnside, mentre quella per le collane con rotazioni e riflessioni è un'applicazione più generale del lemma.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Applicazioni in Problemi di Programmazione Competitiva</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il lemma di Burnside e il teorema di Pólya hanno numerose applicazioni nei problemi di programmazione competitiva. Vediamo alcuni esempi:
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>6.1 Colorazione di Grafi con Simmetrie</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Quando un grafo ha simmetrie (automorfismi), possiamo utilizzare il lemma di Burnside per contare il numero di colorazioni uniche dei suoi vertici o archi.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Esempio: Contare le colorazioni uniche di un grafo con simmetrie
long long countUniqueGraphColorings(const vector<vector<int>>& automorphisms, int n, int m) {
    long long result = 0;
    
    // Per ogni automorfismo del grafo
    for (const auto& perm : automorphisms) {
        // Calcola il numero di cicli nella permutazione
        vector<bool> visited(n, false);
        int numCycles = 0;
        
        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                numCycles++;
                int j = i;
                while (!visited[j]) {
                    visited[j] = true;
                    j = perm[j];
                }
            }
        }
        
        // Aggiungi m^numCycles al risultato
        result += pow(m, numCycles);
    }
    
    // Dividi per il numero di automorfismi
    return result / automorphisms.size();
}
`}</code></pre>
        <p className="text-lg leading-relaxed mb-2 mt-4">
          <strong>6.2 Conteggio di Configurazioni su Griglia</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Possiamo utilizzare il lemma di Burnside per contare il numero di configurazioni uniche su una griglia, considerando le rotazioni e le riflessioni.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Esempio: Contare le configurazioni uniche su una griglia n×n con m colori
long long countUniqueGridConfigurations(int n, int m) {
    // Gruppo delle simmetrie del quadrato (D4)
    // 4 rotazioni e 4 riflessioni
    
    long long result = 0;
    
    // Identità: tutte le celle sono indipendenti
    result += pow(m, n * n);
    
    // Rotazione di 90°: solo le celle sul centro rimangono fisse
    result += pow(m, (n % 2 == 1 ? 1 : 0));
    
    // Rotazione di 180°: celle simmetriche rispetto al centro sono accoppiate
    result += pow(m, (n * n + (n % 2 == 1 ? 1 : 0)) / 2);
    
    // Rotazione di 270°: come la rotazione di 90°
    result += pow(m, (n % 2 == 1 ? 1 : 0));
    
    // Riflessione orizzontale: celle simmetriche rispetto all'asse orizzontale
    result += pow(m, (n * n + (n % 2 == 1 ? n : 0)) / 2);
    
    // Riflessione verticale: celle simmetriche rispetto all'asse verticale
    result += pow(m, (n * n + (n % 2 == 1 ? n : 0)) / 2);
    
    // Riflessione diagonale: celle simmetriche rispetto alla diagonale principale
    result += pow(m, (n * n + n) / 2);
    
    // Riflessione anti-diagonale: celle simmetriche rispetto alla diagonale secondaria
    result += pow(m, (n * n + n) / 2);
    
    // Dividi per 8 (dimensione del gruppo D4)
    return result / 8;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mb-2 mt-4">
          <strong>6.3 Conteggio di Alberi Etichettati</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il lemma di Burnside può essere utilizzato per contare il numero di alberi etichettati non isomorfi.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Esempio: Formula di Cayley per il numero di alberi etichettati
long long countLabeledTrees(int n) {
    // Il numero di alberi etichettati su n vertici è n^(n-2)
    return pow(n, n - 2);
}

// Conteggio di alberi non etichettati è più complesso e richiede
// l'applicazione del lemma di Burnside con il gruppo simmetrico S_n
`}</code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">7. Ottimizzazioni e Considerazioni Pratiche</h2>
        <p className="text-lg leading-relaxed mb-4">
          Quando si applica il lemma di Burnside in problemi di programmazione competitiva, ci sono alcune ottimizzazioni e considerazioni pratiche da tenere a mente:
        </p>
        <p className="text-lg leading-relaxed mb-2">
          <strong>7.1 Gestione dei Numeri Grandi</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          I risultati possono diventare molto grandi, quindi potrebbe essere necessario utilizzare l'aritmetica modulare o tipi di dati per numeri grandi.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Esempio: Calcolo con aritmetica modulare
const int MOD = 1e9 + 7;

// Calcola (base^exp) % MOD
long long modPow(long long base, long long exp) {
    long long result = 1;
    base %= MOD;
    while (exp > 0) {
        if (exp % 2 == 1) {
            result = (result * base) % MOD;
        }
        base = (base * base) % MOD;
        exp /= 2;
    }
    return result;
}

// Versione modulare della funzione di conteggio delle collane
long long countNecklacesRotationOnlyMod(int n, int m) {
    long long result = 0;
    
    for (int d = 1; d <= n; d++) {
        if (n % d == 0) {
            result = (result + phi(d) * modPow(m, n / d)) % MOD;
        }
    }
    
    // Calcola l'inverso modulare di n
    long long invN = modPow(n, MOD - 2);  // Valido solo se MOD è primo
    
    return (result * invN) % MOD;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mb-2 mt-4">
          <strong>7.2 Ottimizzazione del Calcolo dei Cicli</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il calcolo dei cicli in una permutazione può essere ottimizzato utilizzando una struttura dati Union-Find o un array di visitati.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Calcolo ottimizzato del numero di cicli in una permutazione
int countCycles(const vector<int>& perm) {
    int n = perm.size();
    vector<bool> visited(n, false);
    int cycles = 0;
    
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            cycles++;
            int j = i;
            while (!visited[j]) {
                visited[j] = true;
                j = perm[j];
            }
        }
    }
    
    return cycles;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mb-2 mt-4">
          <strong>7.3 Sfruttamento delle Simmetrie</strong>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In alcuni problemi, possiamo sfruttare le proprietà specifiche del gruppo di simmetrie per semplificare i calcoli.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Esempio: Sfruttamento delle proprietà del gruppo ciclico
// Per le collane con solo rotazioni, possiamo usare la formula di Burnside
long long countNecklacesRotationOnlyOptimized(int n, int m) {
    long long result = 0;
    
    // Utilizziamo la formula: (1/n) * Σ_{d|n} φ(d) * m^(n/d)
    for (int d = 1; d <= n; d++) {
        if (n % d == 0) {
            result += phi(d) * pow(m, n / d);
        }
    }
    
    return result / n;
}
`}</code></pre>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">8. Problemi di Esempio</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-2"><a href="https://codeforces.com/problemset/problem/722/D" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Generating Sets</a>: Un problema che richiede l'applicazione del lemma di Burnside per contare configurazioni uniche.</li>
          <li className="mb-2"><a href="https://www.spoj.com/problems/TRANSP/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">SPOJ - Transformations</a>: Un problema che richiede di contare configurazioni considerando trasformazioni.</li>
          <li className="mb-2"><a href="https://codeforces.com/problemset/problem/1194/E" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Count The Rectangles</a>: Un problema che può essere risolto utilizzando tecniche simili al lemma di Burnside.</li>
          <li className="mb-2"><a href="https://codeforces.com/problemset/problem/1100/E" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - Andrew and Taxi</a>: Un problema che coinvolge grafi con simmetrie.</li>
        </ul>
      </section>
    </div>
  );
};

export default BurnsidesLemmaPage;
