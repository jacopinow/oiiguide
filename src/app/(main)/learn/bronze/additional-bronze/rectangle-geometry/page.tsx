import React from 'react';

const RectangleGeometryPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Geometria dei Rettangoli (Livello Bronze)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Teoria: Geometria con Coordinate Cartesiane</h2>
        <p className="text-lg leading-relaxed mb-4">
          Molti problemi di programmazione competitiva, specialmente a livello Bronze, coinvolgono la geometria semplice su un piano cartesiano 2D. Tipicamente, si lavora con punti, segmenti e, molto comunemente, rettangoli i cui lati sono paralleli agli assi X e Y. Comprendere come rappresentare queste figure e calcolare proprietà come area, perimetro, intersezioni e unioni è fondamentale.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Un **rettangolo con lati paralleli agli assi** può essere definito in vari modi, ma uno comune è specificando le coordinate di due angoli opposti, ad esempio l'angolo in basso a sinistra (x1, y1) e l'angolo in alto a destra (x2, y2). Si assume solitamente che x1 &lt; x2 e y1 &lt; y2.
        </p>
        <img src="/images/geometry/rectangle_coords.png" alt="Rettangolo con coordinate" className="my-4 mx-auto shadow-md rounded" />
        {/* Immagine placeholder, da generare o trovare successivamente */}
        <p className="text-lg leading-relaxed">
          Da queste due coordinate, possiamo derivare le altre due: (x1, y2) e (x2, y1). La larghezza del rettangolo è `x2 - x1` e l'altezza è `y2 - y1`. L'area è `(x2 - x1) * (y2 - y1)`.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Rappresentazione in C++</h2>
        <p className="text-lg leading-relaxed mb-3">
          Possiamo rappresentare un rettangolo usando una struct o una classe:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <iostream>
#include <algorithm> // Per std::max e std::min

struct Point {
  int x, y;
};

struct Rectangle {
  Point bottomLeft;
  Point topRight;
  // Oppure direttamente int x1, y1, x2, y2;

  // Costruttore
  Rectangle(int x1, int y1, int x2, int y2) {
    bottomLeft = {x1, y1};
    topRight = {x2, y2};
  }
  Rectangle(Point bl, Point tr) : bottomLeft(bl), topRight(tr) {}

  int width() const {
    return topRight.x - bottomLeft.x;
  }

  int height() const {
    return topRight.y - bottomLeft.y;
  }

  int area() const {
    if (bottomLeft.x >= topRight.x || bottomLeft.y >= topRight.y) {
        return 0; // Rettangolo degenere o non valido
    }
    return width() * height();
  }
};

int main() {
  Rectangle r1(1, 1, 5, 4); // x1, y1, x2, y2
  std::cout << "Rettangolo 1: (" << r1.bottomLeft.x << "," << r1.bottomLeft.y 
            << ") a (" << r1.topRight.x << "," << r1.topRight.y << ")" << std::endl;
  std::cout << "Larghezza: " << r1.width() << ", Altezza: " << r1.height() 
            << ", Area: " << r1.area() << std::endl;
  // Output: Rettangolo 1: (1,1) a (5,4)
  // Output: Larghezza: 4, Altezza: 3, Area: 12
  return 0;
}`} 
        </code></pre>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Operazioni Comuni sui Rettangoli</h2>
        
        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">1. Intersezione di Due Rettangoli</h3>
          <p className="text-lg leading-relaxed mb-3">
            L'intersezione di due rettangoli R1 (definito da (x1, y1)-(x2, y2)) e R2 (definito da (x3, y3)-(x4, y4)) è un altro rettangolo (se esiste). Le coordinate del rettangolo intersezione (Rx_bl, Ry_bl) - (Rx_tr, Ry_tr) sono:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-3">
            <li>`Rx_bl.x = std::max(R1.bottomLeft.x, R2.bottomLeft.x)`</li>
            <li>`Ry_bl.y = std::max(R1.bottomLeft.y, R2.bottomLeft.y)`</li>
            <li>`Rx_tr.x = std::min(R1.topRight.x, R2.topRight.x)`</li>
            <li>`Ry_tr.y = std::min(R1.topRight.y, R2.topRight.y)`</li>
          </ul>
          <p className="text-lg leading-relaxed mb-3">
            Se `Rx_bl.x >= Rx_tr.x` o `Ry_bl.y >= Ry_tr.y`, allora i rettangoli non si intersecano (o si toccano solo su un lato/angolo), e l'area dell'intersezione è 0.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`Rectangle intersection(const Rectangle& r1, const Rectangle& r2) {
  int inter_x1 = std::max(r1.bottomLeft.x, r2.bottomLeft.x);
  int inter_y1 = std::max(r1.bottomLeft.y, r2.bottomLeft.y);
  int inter_x2 = std::min(r1.topRight.x, r2.topRight.x);
  int inter_y2 = std::min(r1.topRight.y, r2.topRight.y);

  // Se non c'è intersezione valida, restituisce un rettangolo degenere
  if (inter_x1 >= inter_x2 || inter_y1 >= inter_y2) {
    return Rectangle(0, 0, 0, 0); 
  }
  return Rectangle(inter_x1, inter_y1, inter_x2, inter_y2);
}

// ... in main ...
// Rectangle r1(1, 1, 5, 4);
// Rectangle r2(3, 2, 7, 6);
// Rectangle inter = intersection(r1, r2);
// std::cout << "Area intersezione: " << inter.area() << std::endl; // Output: 4 (rettangolo (3,2)-(5,4))`} 
          </code></pre>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">2. Area dell'Unione di Due Rettangoli</h3>
          <p className="text-lg leading-relaxed mb-3">
            L'area dell'unione di due rettangoli R1 e R2 può essere calcolata usando il Principio di Inclusione-Esclusione:
            <br/>
            `Area(Unione) = Area(R1) + Area(R2) - Area(Intersezione(R1, R2))`
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`int union_area(const Rectangle& r1, const Rectangle& r2) {
  int area1 = r1.area();
  int area2 = r2.area();
  int inter_area = intersection(r1, r2).area();
  return area1 + area2 - inter_area;
}

// ... in main ...
// Rectangle r1(1, 1, 5, 4); // Area 12
// Rectangle r2(3, 2, 7, 6); // Area 12
// // Intersezione è (3,2)-(5,4), area 4
// std::cout << "Area unione: " << union_area(r1, r2) << std::endl; // Output: 12 + 12 - 4 = 20`} 
          </code></pre>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">3. Verificare se un Punto è Dentro un Rettangolo</h3>
          <p className="text-lg leading-relaxed mb-3">
            Un punto P(px, py) è dentro (o sul bordo) di un rettangolo R (x1, y1)-(x2, y2) se:
            <br/>
            `x1 <= px <= x2`  AND  `y1 <= py <= y2`
          </p>
        </div>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Esempi Pratici e Problemi USACO (Bronze)</h2>
        <p className="text-lg leading-relaxed mb-4">
          I problemi di geometria dei rettangoli a livello Bronze spesso coinvolgono il calcolo di aree, intersezioni o la copertura di una regione.
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>USACO Bronze: "Blocked Billboard"</strong> - Dati due cartelloni e un camion che ne copre una parte, calcolare l'area visibile totale dei cartelloni. Questo richiede di calcolare l'area di ogni cartellone e sottrarre le aree delle intersezioni con il camion.</li>
          <li className="mb-2"><strong>USACO Bronze: "Square Pasture"</strong> - Dati due recinti rettangolari, trovare il più piccolo recinto quadrato che li contenga entrambi. Si tratta di trovare il rettangolo di delimitazione minimo (bounding box) dei due rettangoli e poi il lato del quadrato che lo contiene.</li>
          <li className="mb-2"><strong>USACO Bronze: "Fence Painting"</strong> - Dati due intervalli (rettangoli 1D) su una staccionata che Farmer John dipinge, calcolare la lunghezza totale dipinta. Questo è un caso 1D di unione di rettangoli.</li>
          <li className="mb-2">Problemi che chiedono di calcolare l'area coperta da più rettangoli (può diventare complesso se ci sono molte sovrapposizioni, ma per due o tre rettangoli si usa l'inclusione-esclusione).</li>
        </ul>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti ad Altri Concetti</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><a href="../getting-started-bronze/simulation" className="text-blue-600 dark:text-blue-400 hover:underline">Simulazione</a>: A volte i problemi geometrici possono essere risolti simulando il posizionamento o la copertura.</li>
          <li className="mb-2"><a href="../additional-bronze/ad-hoc-problems" className="text-blue-600 dark:text-blue-400 hover:underline">Problemi Ad Hoc</a>: Molti problemi di geometria semplice rientrano in questa categoria.</li>
          <li className="mb-2">Sweep Line Algorithm (Algoritmo della Linea di Scansione) (Argomento più avanzato, Gold/Platinum): Per problemi più complessi con molti rettangoli, come calcolare l'area totale dell'unione di N rettangoli.</li>
          <li className="mb-2">Coordinate Compression (Compressione delle Coordinate) (Argomento Silver/Gold): Utile quando le coordinate sono grandi ma il numero di coordinate distinte è piccolo.</li>
        </ul>
      </section>
    </div>
  );
};

export default RectangleGeometryPage;

