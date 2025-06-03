import React from 'react';

const FastFourierTransformPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Fast Fourier Transform (FFT) (Livello Advanced)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione</h2>
        <p className="text-lg leading-relaxed mb-4">
          La Fast Fourier Transform (FFT) è un algoritmo efficiente per calcolare la Trasformata Discreta di Fourier (DFT) e la sua inversa. Mentre la DFT richiede O(n²) operazioni, la FFT può calcolarla in O(n log n), rendendo possibili molte applicazioni che altrimenti sarebbero computazionalmente proibitive.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          In programmazione competitiva, la FFT è principalmente utilizzata per moltiplicare polinomi in modo efficiente. La moltiplicazione di due polinomi di grado n richiede O(n²) operazioni con l'algoritmo naive, ma può essere ridotta a O(n log n) utilizzando la FFT.
        </p>
        <p className="text-lg leading-relaxed">
          In questa lezione, esploreremo:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">La teoria matematica alla base della FFT</li>
          <li className="mb-1">L'algoritmo FFT e la sua implementazione</li>
          <li className="mb-1">Come utilizzare la FFT per moltiplicare polinomi</li>
          <li className="mb-1">Applicazioni pratiche in problemi di programmazione competitiva</li>
        </ul>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Fondamenti Matematici</h2>
        <p className="text-lg leading-relaxed mb-4">
          Prima di addentrarci nell'algoritmo FFT, è importante comprendere alcuni concetti matematici fondamentali.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">2.1 Polinomi e loro Rappresentazione</h3>
        <p className="text-lg leading-relaxed mb-4">
          Un polinomio di grado n può essere rappresentato come:
        </p>
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mb-4">
          <p className="text-center text-lg">
            P(x) = a₀ + a₁x + a₂x² + ... + aₙxⁿ
          </p>
        </div>
        <p className="text-lg leading-relaxed mb-4">
          In programmazione, rappresentiamo solitamente un polinomio come un array di coefficienti [a₀, a₁, a₂, ..., aₙ].
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">2.2 Radici dell'Unità</h3>
        <p className="text-lg leading-relaxed mb-4">
          Le radici n-esime dell'unità sono numeri complessi ω tali che ωⁿ = 1. La radice n-esima primitiva dell'unità è:
        </p>
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mb-4">
          <p className="text-center text-lg">
            ωₙ = e^(2πi/n) = cos(2π/n) + i·sin(2π/n)
          </p>
        </div>
        <p className="text-lg leading-relaxed mb-4">
          Le radici n-esime dell'unità hanno proprietà importanti:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">ωₙ^n = 1</li>
          <li className="mb-1">ωₙ^k = ωₙ^(k mod n)</li>
          <li className="mb-1">ωₙ^(n/2) = -1</li>
          <li className="mb-1">ωₙ^k = ω₂ₙ^2k</li>
        </ul>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">2.3 Trasformata Discreta di Fourier (DFT)</h3>
        <p className="text-lg leading-relaxed mb-4">
          La DFT trasforma un polinomio dalla sua rappresentazione coefficiente alla sua rappresentazione punto-valore. Per un polinomio P(x) = a₀ + a₁x + a₂x² + ... + aₙ₋₁xⁿ⁻¹, la DFT calcola i valori [P(ω⁰), P(ω¹), P(ω²), ..., P(ωⁿ⁻¹)], dove ω è una radice n-esima primitiva dell'unità.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Formalmente, la DFT di un vettore a = [a₀, a₁, ..., aₙ₋₁] è un vettore A = [A₀, A₁, ..., Aₙ₋₁] dove:
        </p>
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mb-4">
          <p className="text-center text-lg">
            Aₖ = Σ(j=0 to n-1) aⱼ · ωₙ^(j·k)
          </p>
        </div>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">2.4 Trasformata Inversa di Fourier (IDFT)</h3>
        <p className="text-lg leading-relaxed mb-4">
          L'IDFT trasforma un polinomio dalla sua rappresentazione punto-valore alla sua rappresentazione coefficiente. Per un vettore di valori [y₀, y₁, ..., yₙ₋₁], l'IDFT calcola i coefficienti [a₀, a₁, ..., aₙ₋₁] del polinomio che passa per i punti (ω⁰, y₀), (ω¹, y₁), ..., (ωⁿ⁻¹, yₙ₋₁).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Formalmente, l'IDFT di un vettore A = [A₀, A₁, ..., Aₙ₋₁] è un vettore a = [a₀, a₁, ..., aₙ₋₁] dove:
        </p>
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mb-4">
          <p className="text-center text-lg">
            aⱼ = (1/n) · Σ(k=0 to n-1) Aₖ · ωₙ^(-j·k)
          </p>
        </div>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. L'Algoritmo FFT</h2>
        <p className="text-lg leading-relaxed mb-4">
          La Fast Fourier Transform (FFT) è un algoritmo divide-et-impera che calcola la DFT in O(n log n) invece di O(n²).
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">3.1 Idea Principale</h3>
        <p className="text-lg leading-relaxed mb-4">
          L'idea chiave della FFT è sfruttare la simmetria delle radici dell'unità per dividere il problema in sottoproblemi più piccoli. Consideriamo un polinomio P(x) di grado n-1 (dove n è una potenza di 2):
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Possiamo dividere P(x) in due polinomi di grado (n/2)-1:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">P<sub>even</sub>(x) = a₀ + a₂x + a₄x² + ... + aₙ₋₂x^(n/2-1)</li>
          <li className="mb-1">P<sub>odd</sub>(x) = a₁ + a₃x + a₅x² + ... + aₙ₋₁x^(n/2-1)</li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">
          Quindi, possiamo riscrivere P(x) come:
        </p>
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mb-4">
          <p className="text-center text-lg">
            P(x) = P<sub>even</sub>(x²) + x · P<sub>odd</sub>(x²)
          </p>
        </div>
        <p className="text-lg leading-relaxed mb-4">
          Ora, per calcolare P(ωₙ^k), possiamo usare:
        </p>
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mb-4">
          <p className="text-center text-lg">
            P(ωₙ^k) = P<sub>even</sub>((ωₙ^k)²) + ωₙ^k · P<sub>odd</sub>((ωₙ^k)²)
          </p>
        </div>
        <p className="text-lg leading-relaxed mb-4">
          Poiché (ωₙ^k)² = ωₙ₍₂^k, possiamo calcolare P<sub>even</sub> e P<sub>odd</sub> ricorsivamente.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">3.2 Implementazione della FFT</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

typedef complex<double> cd;
const double PI = acos(-1);

// Funzione per calcolare la FFT
void fft(vector<cd> &a, bool invert) {
    int n = a.size();
    
    // Bit-reversal permutation
    for (int i = 1, j = 0; i < n; i++) {
        int bit = n >> 1;
        for (; j & bit; bit >>= 1)
            j ^= bit;
        j ^= bit;
        
        if (i < j)
            swap(a[i], a[j]);
    }
    
    // Butterfly operations
    for (int len = 2; len <= n; len <<= 1) {
        double ang = 2 * PI / len * (invert ? -1 : 1);
        cd wlen(cos(ang), sin(ang));
        for (int i = 0; i < n; i += len) {
            cd w(1);
            for (int j = 0; j < len / 2; j++) {
                cd u = a[i + j];
                cd v = a[i + j + len / 2] * w;
                a[i + j] = u + v;
                a[i + j + len / 2] = u - v;
                w *= wlen;
            }
        }
    }
    
    // Divide by n for inverse FFT
    if (invert) {
        for (auto &x : a)
            x /= n;
    }
}`}</code></pre>

        <h3 className="text-2xl font-semibold mb-3 mt-6">3.3 Moltiplicazione di Polinomi con FFT</h3>
        <p className="text-lg leading-relaxed mb-4">
          Per moltiplicare due polinomi A(x) e B(x) di grado n-1 e m-1 rispettivamente:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Calcoliamo la DFT di A e B per ottenere le rappresentazioni punto-valore.</li>
          <li className="mb-1">Moltiplichiamo le rappresentazioni punto-valore elemento per elemento.</li>
          <li className="mb-1">Calcoliamo l'IDFT del risultato per ottenere i coefficienti del polinomio prodotto.</li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Funzione per moltiplicare due polinomi usando la FFT
vector<int> multiply(vector<int> const &a, vector<int> const &b) {
    vector<cd> fa(a.begin(), a.end()), fb(b.begin(), b.end());
    int n = 1;
    while (n < a.size() + b.size())
        n <<= 1;
    fa.resize(n);
    fb.resize(n);
    
    fft(fa, false);
    fft(fb, false);
    for (int i = 0; i < n; i++)
        fa[i] *= fb[i];
    fft(fa, true);
    
    vector<int> result(n);
    for (int i = 0; i < n; i++)
        result[i] = round(fa[i].real());
    return result;
}`}</code></pre>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Ottimizzazioni e Considerazioni Pratiche</h2>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">4.1 Precisione Numerica</h3>
        <p className="text-lg leading-relaxed mb-4">
          Quando si lavora con numeri complessi in virgola mobile, possono verificarsi errori di arrotondamento. Per problemi che richiedono risultati esatti, è possibile utilizzare la Number Theoretic Transform (NTT), che opera in un campo finito.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">4.2 Ottimizzazione per Polinomi con Coefficienti Reali</h3>
        <p className="text-lg leading-relaxed mb-4">
          Se i polinomi hanno coefficienti reali, possiamo ottimizzare la FFT calcolando due trasformate contemporaneamente:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// FFT ottimizzata per polinomi con coefficienti reali
void fft_real(vector<double> &a, vector<double> &b, vector<cd> &fa, vector<cd> &fb) {
    int n = a.size();
    vector<cd> f(n);
    for (int i = 0; i < n; i++)
        f[i] = cd(a[i], b[i]);
    
    fft(f, false);
    
    fa.resize(n);
    fb.resize(n);
    for (int i = 0; i < n; i++) {
        cd f_i = f[i];
        cd f_ni = conj(f[(n - i) % n]);
        fa[i] = (f_i + f_ni) / 2.0;
        fb[i] = (f_i - f_ni) / cd(0, 2);
    }
}`}</code></pre>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">4.3 Implementazione Iterativa</h3>
        <p className="text-lg leading-relaxed mb-4">
          L'implementazione mostrata sopra è iterativa, che è generalmente più efficiente dell'implementazione ricorsiva in contesti pratici. L'implementazione iterativa utilizza la tecnica di bit-reversal permutation per riorganizzare gli elementi.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Applicazioni in Programmazione Competitiva</h2>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">5.1 Moltiplicazione di Numeri Grandi</h3>
        <p className="text-lg leading-relaxed mb-4">
          La FFT può essere utilizzata per moltiplicare numeri molto grandi che non entrano nei tipi di dati standard. Rappresentiamo i numeri come polinomi, dove ogni cifra è un coefficiente, e utilizziamo la FFT per moltiplicarli.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Moltiplicazione di numeri grandi usando la FFT
string multiply_big_numbers(string a, string b) {
    vector<int> da(a.begin(), a.end()), db(b.begin(), b.end());
    for (auto &digit : da) digit -= '0';
    for (auto &digit : db) digit -= '0';
    reverse(da.begin(), da.end());
    reverse(db.begin(), db.end());
    
    vector<int> result = multiply(da, db);
    
    // Gestione dei riporti
    int carry = 0;
    for (int i = 0; i < result.size(); i++) {
        result[i] += carry;
        carry = result[i] / 10;
        result[i] %= 10;
    }
    
    // Rimozione degli zeri non significativi
    while (result.size() > 1 && result.back() == 0)
        result.pop_back();
    
    // Conversione in stringa
    string s;
    for (int i = result.size() - 1; i >= 0; i--)
        s += result[i] + '0';
    
    return s;
}`}</code></pre>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">5.2 Calcolo di Convoluzioni</h3>
        <p className="text-lg leading-relaxed mb-4">
          La FFT può essere utilizzata per calcolare la convoluzione di due sequenze, che ha applicazioni in problemi di conteggio e combinatoria.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Calcolo della convoluzione di due sequenze
vector<int> convolution(vector<int> const &a, vector<int> const &b) {
    return multiply(a, b);
}`}</code></pre>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">5.3 Matching di Stringhe</h3>
        <p className="text-lg leading-relaxed mb-4">
          La FFT può essere utilizzata per implementare algoritmi di matching di stringhe come l'algoritmo di Rabin-Karp in modo più efficiente.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Matching di stringhe usando la FFT
vector<int> string_matching(string text, string pattern) {
    int n = text.size(), m = pattern.size();
    vector<cd> a(n), b(m);
    
    // Convertiamo le stringhe in vettori di numeri complessi
    for (int i = 0; i < n; i++)
        a[i] = text[i] - 'a' + 1;
    for (int i = 0; i < m; i++)
        b[m - i - 1] = pattern[i] - 'a' + 1;
    
    // Calcoliamo la convoluzione
    int size = 1;
    while (size < n + m)
        size <<= 1;
    a.resize(size);
    b.resize(size);
    
    fft(a, false);
    fft(b, false);
    for (int i = 0; i < size; i++)
        a[i] *= b[i];
    fft(a, true);
    
    // Troviamo le posizioni di match
    vector<int> matches;
    for (int i = m - 1; i < n; i++) {
        if (abs(a[i].real() - (pattern[0] - 'a' + 1) * (pattern[m - 1] - 'a' + 1)) < 1e-9)
            matches.push_back(i - m + 1);
    }
    
    return matches;
}`}</code></pre>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Analisi della Complessità</h2>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">6.1 Complessità Temporale</h3>
        <p className="text-lg leading-relaxed mb-4">
          La complessità temporale della FFT è O(n log n), dove n è la dimensione dell'input. Questo è un miglioramento significativo rispetto all'algoritmo naive per la DFT, che ha complessità O(n²).
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Per la moltiplicazione di polinomi, la complessità totale è ancora O(n log n), dove n è la somma dei gradi dei polinomi.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">6.2 Complessità Spaziale</h3>
        <p className="text-lg leading-relaxed mb-4">
          La complessità spaziale della FFT è O(n), dove n è la dimensione dell'input. Questo include lo spazio per memorizzare i coefficienti dei polinomi e i risultati intermedi.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">7. Problemi di Esempio</h2>
        
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Problema 1: Moltiplicazione di Polinomi</h3>
          <p className="mb-2">
            <strong>Descrizione:</strong> Ti vengono dati due polinomi A(x) e B(x) di grado n-1 e m-1 rispettivamente. Calcola il polinomio C(x) = A(x) * B(x).
          </p>
          <p className="mb-2">
            <strong>Soluzione:</strong> Utilizziamo la FFT per moltiplicare i polinomi in O((n+m) log (n+m)) invece di O(n*m).
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mt-2"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

typedef complex<double> cd;
const double PI = acos(-1);

void fft(vector<cd> &a, bool invert) {
    int n = a.size();
    
    for (int i = 1, j = 0; i < n; i++) {
        int bit = n >> 1;
        for (; j & bit; bit >>= 1)
            j ^= bit;
        j ^= bit;
        
        if (i < j)
            swap(a[i], a[j]);
    }
    
    for (int len = 2; len <= n; len <<= 1) {
        double ang = 2 * PI / len * (invert ? -1 : 1);
        cd wlen(cos(ang), sin(ang));
        for (int i = 0; i < n; i += len) {
            cd w(1);
            for (int j = 0; j < len / 2; j++) {
                cd u = a[i + j];
                cd v = a[i + j + len / 2] * w;
                a[i + j] = u + v;
                a[i + j + len / 2] = u - v;
                w *= wlen;
            }
        }
    }
    
    if (invert) {
        for (auto &x : a)
            x /= n;
    }
}

vector<int> multiply(vector<int> const &a, vector<int> const &b) {
    vector<cd> fa(a.begin(), a.end()), fb(b.begin(), b.end());
    int n = 1;
    while (n < a.size() + b.size())
        n <<= 1;
    fa.resize(n);
    fb.resize(n);
    
    fft(fa, false);
    fft(fb, false);
    for (int i = 0; i < n; i++)
        fa[i] *= fb[i];
    fft(fa, true);
    
    vector<int> result(n);
    for (int i = 0; i < n; i++)
        result[i] = round(fa[i].real());
    
    // Rimuoviamo gli zeri non significativi
    while (result.size() > 1 && result.back() == 0)
        result.pop_back();
    
    return result;
}

int main() {
    int n, m;
    cin >> n >> m;
    
    vector<int> a(n), b(m);
    for (int i = 0; i < n; i++)
        cin >> a[i];
    for (int i = 0; i < m; i++)
        cin >> b[i];
    
    vector<int> c = multiply(a, b);
    
    for (int coef : c)
        cout << coef << " ";
    cout << endl;
    
    return 0;
}`}</code></pre>
        </div>
        
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Problema 2: Conteggio di Sottostringhe</h3>
          <p className="mb-2">
            <strong>Descrizione:</strong> Ti vengono date due stringhe s e t. Per ogni posizione i in s, conta quante sottostringhe di t appaiono come sottostringhe di s che iniziano alla posizione i.
          </p>
          <p className="mb-2">
            <strong>Soluzione:</strong> Possiamo utilizzare la FFT per calcolare la convoluzione tra s e t, che ci darà il numero di match per ogni posizione.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mt-2"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

typedef complex<double> cd;
const double PI = acos(-1);

void fft(vector<cd> &a, bool invert) {
    // Implementazione della FFT come sopra
}

vector<int> count_substrings(string s, string t) {
    int n = s.size(), m = t.size();
    vector<vector<cd>> a(26, vector<cd>(n, 0)), b(26, vector<cd>(m, 0));
    
    // Prepariamo i vettori per ogni lettera dell'alfabeto
    for (int i = 0; i < n; i++)
        a[s[i] - 'a'][i] = 1;
    for (int i = 0; i < m; i++)
        b[t[i] - 'a'][m - i - 1] = 1;
    
    // Calcoliamo la convoluzione per ogni lettera
    vector<int> result(n, 0);
    for (int c = 0; c < 26; c++) {
        int size = 1;
        while (size < n + m)
            size <<= 1;
        a[c].resize(size);
        b[c].resize(size);
        
        fft(a[c], false);
        fft(b[c], false);
        for (int i = 0; i < size; i++)
            a[c][i] *= b[c][i];
        fft(a[c], true);
        
        // Aggiorniamo il risultato
        for (int i = m - 1; i < n; i++)
            result[i - m + 1] += round(a[c][i].real());
    }
    
    return result;
}

int main() {
    string s, t;
    cin >> s >> t;
    
    vector<int> counts = count_substrings(s, t);
    
    for (int count : counts)
        cout << count << " ";
    cout << endl;
    
    return 0;
}`}</code></pre>
        </div>
        
        <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Problema 3: Calcolo di Potenze di Matrici</h3>
          <p className="mb-2">
            <strong>Descrizione:</strong> Ti viene data una matrice A di dimensione n×n e un intero k. Calcola A^k.
          </p>
          <p className="mb-2">
            <strong>Soluzione:</strong> Possiamo utilizzare la FFT per calcolare potenze di matrici in modo efficiente, rappresentando la matrice come un polinomio caratteristico.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto mt-2"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

typedef complex<double> cd;
const double PI = acos(-1);

void fft(vector<cd> &a, bool invert) {
    // Implementazione della FFT come sopra
}

vector<vector<int>> matrix_power(vector<vector<int>> A, int k, int mod) {
    int n = A.size();
    
    // Caso base: A^0 = I
    if (k == 0) {
        vector<vector<int>> I(n, vector<int>(n, 0));
        for (int i = 0; i < n; i++)
            I[i][i] = 1;
        return I;
    }
    
    // Caso base: A^1 = A
    if (k == 1)
        return A;
    
    // Calcolo ricorsivo: A^k = (A^(k/2))^2 se k è pari, A^k = A * (A^(k/2))^2 se k è dispari
    vector<vector<int>> half_power = matrix_power(A, k / 2, mod);
    vector<vector<int>> result = multiply_matrices(half_power, half_power, mod);
    
    if (k % 2 == 1)
        result = multiply_matrices(A, result, mod);
    
    return result;
}

vector<vector<int>> multiply_matrices(vector<vector<int>> A, vector<vector<int>> B, int mod) {
    int n = A.size();
    vector<vector<int>> C(n, vector<int>(n, 0));
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            for (int k = 0; k < n; k++) {
                C[i][j] = (C[i][j] + 1LL * A[i][k] * B[k][j] % mod) % mod;
            }
        }
    }
    
    return C;
}

int main() {
    int n, k, mod;
    cin >> n >> k >> mod;
    
    vector<vector<int>> A(n, vector<int>(n));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cin >> A[i][j];
        }
    }
    
    vector<vector<int>> result = matrix_power(A, k, mod);
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cout << result[i][j] << " ";
        }
        cout << endl;
    }
    
    return 0;
}`}</code></pre>
        </div>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">8. Conclusioni e Risorse Aggiuntive</h2>
        <p className="text-lg leading-relaxed mb-4">
          La Fast Fourier Transform è un algoritmo potente con numerose applicazioni in programmazione competitiva e oltre. La sua capacità di ridurre la complessità da O(n²) a O(n log n) per operazioni come la moltiplicazione di polinomi la rende indispensabile per risolvere problemi che altrimenti sarebbero computazionalmente proibitivi.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Sebbene l'implementazione e la comprensione della FFT possano sembrare complesse all'inizio, padroneggiare questo algoritmo apre la porta a una vasta gamma di problemi avanzati.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 mt-6">Risorse Aggiuntive</h3>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">
            <a href="https://cp-algorithms.com/algebra/fft.html" className="text-blue-600 dark:text-blue-400 hover:underline">CP-Algorithms: Fast Fourier Transform</a>
          </li>
          <li className="mb-1">
            <a href="https://codeforces.com/blog/entry/43499" className="text-blue-600 dark:text-blue-400 hover:underline">Codeforces: Tutorial on FFT and NTT</a>
          </li>
          <li className="mb-1">
            <a href="https://www.youtube.com/watch?v=h7apO7q16V0" className="text-blue-600 dark:text-blue-400 hover:underline">Video: FFT in Competitive Programming</a>
          </li>
          <li className="mb-1">
            <a href="https://en.wikipedia.org/wiki/Fast_Fourier_transform" className="text-blue-600 dark:text-blue-400 hover:underline">Wikipedia: Fast Fourier Transform</a>
          </li>
        </ul>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">9. Esercizi Proposti</h2>
        <p className="text-lg leading-relaxed mb-4">
          Per padroneggiare la Fast Fourier Transform, ti consigliamo di risolvere i seguenti problemi:
        </p>
        
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Esercizio 1: SPOJ POLYMUL - Polynomial Multiplication</h3>
          <p className="mb-2">
            Implementa un algoritmo per moltiplicare due polinomi utilizzando la FFT.
          </p>
          <p>
            <a href="https://www.spoj.com/problems/POLYMUL/" className="text-blue-600 dark:text-blue-400 hover:underline">Link al problema</a>
          </p>
        </div>
        
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Esercizio 2: Codeforces 993E - Nikita and Order Statistics</h3>
          <p className="mb-2">
            Un problema che richiede l'uso della FFT per calcolare statistiche d'ordine in modo efficiente.
          </p>
          <p>
            <a href="https://codeforces.com/contest/993/problem/E" className="text-blue-600 dark:text-blue-400 hover:underline">Link al problema</a>
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Esercizio 3: ICPC World Finals 2018 - Uncrossed Knight's Tour</h3>
          <p className="mb-2">
            Un problema avanzato che richiede l'uso della FFT per calcolare convoluzioni in modo efficiente.
          </p>
          <p>
            <a href="https://icpc.global/worldfinals/problems/2018-ACM-ICPC-World-Finals/icpc2018.pdf" className="text-blue-600 dark:text-blue-400 hover:underline">Link al problema</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default FastFourierTransformPage;
