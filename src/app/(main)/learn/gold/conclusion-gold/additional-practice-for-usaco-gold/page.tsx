import React from 'react';

const AdditionalPracticeGoldPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Pratica Aggiuntiva per USACO Gold</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Risorse di Pratica per Argomenti Gold</h2>
        <p className="text-lg leading-relaxed mb-4">
          Questa sezione fornisce una raccolta curata di problemi per praticare gli argomenti del livello Gold. I problemi sono organizzati per argomento e difficoltà crescente, permettendoti di consolidare le tue conoscenze in modo sistematico.
        </p>
        
        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">1.1 Matematica Avanzata</h3>
          <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
            <li className="mb-1"><strong>Divisibilità e Aritmetica Modulare:</strong>
              <ul className="list-circle list-inside text-lg leading-relaxed ml-6 mt-1">
                <li>CSES: <a href="https://cses.fi/problemset/task/1095" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Exponentiation</a> (Facile)</li>
                <li>CSES: <a href="https://cses.fi/problemset/task/1712" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Exponentiation II</a> (Medio)</li>
                <li>Codeforces: <a href="https://codeforces.com/problemset/problem/1117/D" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Magic Gems</a> (Difficile)</li>
              </ul>
            </li>
            <li className="mb-1"><strong>Combinatoria:</strong>
              <ul className="list-circle list-inside text-lg leading-relaxed ml-6 mt-1">
                <li>CSES: <a href="https://cses.fi/problemset/task/1079" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Binomial Coefficients</a> (Facile)</li>
                <li>USACO Gold: <a href="http://www.usaco.org/index.php?page=viewproblem2&cpid=997" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Exercise</a> (Medio)</li>
                <li>Codeforces: <a href="https://codeforces.com/problemset/problem/1342/E" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Placing Rooks</a> (Difficile)</li>
              </ul>
            </li>
            <li className="mb-1"><strong>Geometria Computazionale:</strong>
              <ul className="list-circle list-inside text-lg leading-relaxed ml-6 mt-1">
                <li>CSES: <a href="https://cses.fi/problemset/task/2189" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Point Location Test</a> (Facile)</li>
                <li>CSES: <a href="https://cses.fi/problemset/task/2190" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Line Segment Intersection</a> (Medio)</li>
                <li>USACO Gold: <a href="http://www.usaco.org/index.php?page=viewproblem2&cpid=594" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Fenced In</a> (Difficile)</li>
              </ul>
            </li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">1.2 Strutture Dati Avanzate</h3>
          <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
            <li className="mb-1"><strong>Disjoint Set Union (DSU):</strong>
              <ul className="list-circle list-inside text-lg leading-relaxed ml-6 mt-1">
                <li>CSES: <a href="https://cses.fi/problemset/task/1676" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Road Construction</a> (Facile)</li>
                <li>USACO Gold: <a href="http://www.usaco.org/index.php?page=viewproblem2&cpid=669" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Moocast</a> (Medio)</li>
                <li>Codeforces: <a href="https://codeforces.com/contest/1167/problem/C" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">News Distribution</a> (Medio)</li>
              </ul>
            </li>
            <li className="mb-1"><strong>Segment Tree:</strong>
              <ul className="list-circle list-inside text-lg leading-relaxed ml-6 mt-1">
                <li>CSES: <a href="https://cses.fi/problemset/task/1648" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Dynamic Range Sum Queries</a> (Facile)</li>
                <li>CSES: <a href="https://cses.fi/problemset/task/1649" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Dynamic Range Minimum Queries</a> (Facile)</li>
                <li>USACO Gold: <a href="http://www.usaco.org/index.php?page=viewproblem2&cpid=973" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Milk Pumping</a> (Medio)</li>
                <li>Codeforces: <a href="https://codeforces.com/contest/380/problem/C" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Sereja and Brackets</a> (Difficile)</li>
              </ul>
            </li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">1.3 Algoritmi su Grafi</h3>
          <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
            <li className="mb-1"><strong>Componenti Fortemente Connesse (SCC):</strong>
              <ul className="list-circle list-inside text-lg leading-relaxed ml-6 mt-1">
                <li>CSES: <a href="https://cses.fi/problemset/task/1682" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Flight Routes Check</a> (Medio)</li>
                <li>CSES: <a href="https://cses.fi/problemset/task/1683" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Planets and Kingdoms</a> (Medio)</li>
                <li>USACO Gold: <a href="http://www.usaco.org/index.php?page=viewproblem2&cpid=668" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Lasers and Mirrors</a> (Difficile)</li>
              </ul>
            </li>
            <li className="mb-1"><strong>2-SAT:</strong>
              <ul className="list-circle list-inside text-lg leading-relaxed ml-6 mt-1">
                <li>CSES: <a href="https://cses.fi/problemset/task/1684" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Giant Pizza</a> (Medio)</li>
                <li>Codeforces: <a href="https://codeforces.com/contest/228/problem/E" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">The Road to Berland is Paved With Good Intentions</a> (Difficile)</li>
              </ul>
            </li>
            <li className="mb-1"><strong>Shortest Path:</strong>
              <ul className="list-circle list-inside text-lg leading-relaxed ml-6 mt-1">
                <li>CSES: <a href="https://cses.fi/problemset/task/1671" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Shortest Routes I</a> (Facile - Dijkstra)</li>
                <li>CSES: <a href="https://cses.fi/problemset/task/1672" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Shortest Routes II</a> (Facile - Floyd-Warshall)</li>
                <li>USACO Gold: <a href="http://www.usaco.org/index.php?page=viewproblem2&cpid=969" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Shortcut</a> (Medio)</li>
              </ul>
            </li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">1.4 Programmazione Dinamica</h3>
          <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
            <li className="mb-1"><strong>DP su Alberi:</strong>
              <ul className="list-circle list-inside text-lg leading-relaxed ml-6 mt-1">
                <li>CSES: <a href="https://cses.fi/problemset/task/1130" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Tree Matching</a> (Facile)</li>
                <li>CSES: <a href="https://cses.fi/problemset/task/1131" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Tree Diameter</a> (Facile)</li>
                <li>USACO Gold: <a href="http://www.usaco.org/index.php?page=viewproblem2&cpid=766" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Barn Painting</a> (Medio)</li>
              </ul>
            </li>
            <li className="mb-1"><strong>DP con Bitmask:</strong>
              <ul className="list-circle list-inside text-lg leading-relaxed ml-6 mt-1">
                <li>CSES: <a href="https://cses.fi/problemset/task/1690" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Hamiltonian Flights</a> (Medio)</li>
                <li>AtCoder DP Contest: <a href="https://atcoder.jp/contests/dp/tasks/dp_o" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Matching</a> (Medio)</li>
                <li>USACO Gold: <a href="http://www.usaco.org/index.php?page=viewproblem2&cpid=494" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Guard Mark</a> (Difficile)</li>
              </ul>
            </li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">1.5 Algoritmi su Stringhe</h3>
          <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
            <li className="mb-1"><strong>String Hashing:</strong>
              <ul className="list-circle list-inside text-lg leading-relaxed ml-6 mt-1">
                <li>CSES: <a href="https://cses.fi/problemset/task/1753" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">String Matching</a> (Facile)</li>
                <li>Codeforces: <a href="https://codeforces.com/problemset/problem/271/D" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Good Substrings</a> (Medio)</li>
              </ul>
            </li>
            <li className="mb-1"><strong>KMP:</strong>
              <ul className="list-circle list-inside text-lg leading-relaxed ml-6 mt-1">
                <li>CSES: <a href="https://cses.fi/problemset/task/1753" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">String Matching</a> (Facile)</li>
                <li>Codeforces: <a href="https://codeforces.com/problemset/problem/1200/E" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Compress Words</a> (Medio)</li>
              </ul>
            </li>
            <li className="mb-1"><strong>Suffix Array:</strong>
              <ul className="list-circle list-inside text-lg leading-relaxed ml-6 mt-1">
                <li>CSES: <a href="https://cses.fi/problemset/task/1732" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Finding Borders</a> (Medio)</li>
                <li>CSES: <a href="https://cses.fi/problemset/task/2420" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Palindrome Queries</a> (Difficile)</li>
              </ul>
            </li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">1.6 Tecniche Speciali</h3>
          <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
            <li className="mb-1"><strong>Meet-in-the-Middle:</strong>
              <ul className="list-circle list-inside text-lg leading-relaxed ml-6 mt-1">
                <li>CSES: <a href="https://cses.fi/problemset/task/1628" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Meet in the Middle</a> (Medio)</li>
                <li>Codeforces: <a href="https://codeforces.com/problemset/problem/888/E" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Maximum Subsequence</a> (Medio)</li>
              </ul>
            </li>
          </ul>
        </div>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Contest Passati USACO Gold</h2>
        <p className="text-lg leading-relaxed mb-4">
          Risolvere i contest passati di USACO Gold è un ottimo modo per prepararsi per i contest futuri. Ecco alcuni contest recenti particolarmente formativi:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1"><a href="http://www.usaco.org/index.php?page=dec19results" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Dicembre 2019</a>: Problemi che coprono DP, grafi e strutture dati.</li>
          <li className="mb-1"><a href="http://www.usaco.org/index.php?page=feb20results" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Febbraio 2020</a>: Problemi che coprono DP, grafi e algoritmi greedy.</li>
          <li className="mb-1"><a href="http://www.usaco.org/index.php?page=dec20results" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Dicembre 2020</a>: Problemi che coprono DP, strutture dati e algoritmi su stringhe.</li>
          <li className="mb-1"><a href="http://www.usaco.org/index.php?page=feb21results" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Febbraio 2021</a>: Problemi che coprono DP, grafi e algoritmi greedy.</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Consiglio: Simula le condizioni di contest. Dai a te stesso 4 ore per risolvere i 3 problemi di un contest Gold. Dopo, leggi le soluzioni ufficiali e confrontale con le tue.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Piattaforme di Pratica Aggiuntive</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1"><strong><a href="https://codeforces.com/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces</a>:</strong> Problemi di livello Div1A/B o Div2C/D/E sono generalmente di livello Gold. I contest regolari sono ottimi per la pratica.</li>
          <li className="mb-1"><strong><a href="https://atcoder.jp/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">AtCoder</a>:</strong> I problemi ABC D/E/F e ARC C/D sono spesso di livello Gold. AtCoder è noto per problemi eleganti e ben costruiti.</li>
          <li className="mb-1"><strong><a href="https://cses.fi/problemset/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES Problem Set</a>:</strong> Una raccolta eccellente di problemi standard, molti dei quali di livello Gold.</li>
          <li className="mb-1"><strong><a href="https://leetcode.com/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">LeetCode</a>:</strong> I problemi di difficoltà "Hard" possono essere utili per praticare algoritmi specifici.</li>
          <li className="mb-1"><strong><a href="https://www.hackerrank.com/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">HackerRank</a>:</strong> Ha sezioni dedicate a vari algoritmi e strutture dati.</li>
        </ul>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Risorse di Apprendimento Aggiuntive</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1"><strong><a href="https://cp-algorithms.com/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CP Algorithms</a>:</strong> Una risorsa eccellente con spiegazioni dettagliate di algoritmi e strutture dati.</li>
          <li className="mb-1"><strong><a href="https://codeforces.com/blog/entry/13529" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces: An awesome list for competitive programming</a>:</strong> Una lista curata di risorse per la programmazione competitiva.</li>
          <li className="mb-1"><strong><a href="https://usaco.guide/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">USACO Guide</a>:</strong> Una guida completa per la programmazione competitiva, con focus su USACO.</li>
          <li className="mb-1"><strong><a href="https://cses.fi/book/book.pdf" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Competitive Programmer's Handbook</a>:</strong> Un libro eccellente che copre molti argomenti di livello Gold.</li>
          <li className="mb-1"><strong><a href="https://visualgo.net/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">VisuAlgo</a>:</strong> Visualizzazioni di algoritmi e strutture dati.</li>
        </ul>
      </section>
    </div>
  );
};

export default AdditionalPracticeGoldPage;
