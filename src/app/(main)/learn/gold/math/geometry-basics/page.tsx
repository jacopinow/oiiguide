import React from 'react';

const GeometryBasicsGoldPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Geometria Computazionale - Basi (Livello Gold)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione alla Geometria Computazionale</h2>
        <p className="text-lg leading-relaxed mb-4">
          La geometria computazionale si occupa di algoritmi per risolvere problemi geometrici. A livello Gold, si affrontano problemi che coinvolgono punti, linee, segmenti e poligoni semplici. È fondamentale avere una solida comprensione delle rappresentazioni geometriche e delle operazioni di base.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          A differenza della geometria euclidea pura, nella programmazione competitiva bisogna prestare molta attenzione alla **precisione numerica** (uso di `double` o `long double` e gestione degli errori di approssimazione) e ai **casi degeneri** (punti collineari, segmenti sovrapposti, ecc.).
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Rappresentazione di Oggetti Geometrici</h2>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">2.1 Punti</h3>
          <p className="text-lg leading-relaxed mb-2">
            Un punto nel piano 2D è solitamente rappresentato da una coppia di coordinate `(x, y)`. È utile definire una struct o una classe per i punti, con sovraccarico degli operatori per operazioni comuni (somma, sottrazione, prodotto scalare, prodotto vettoriale).
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <cmath> // Per sqrt, atan2
#include <iomanip> // Per std::fixed, std::setprecision

const double EPS = 1e-9; // Epsilon per confronti con double

struct Point {
  double x, y;

  Point(double _x = 0, double _y = 0) : x(_x), y(_y) {}

  // Operazioni tra punti (vettori)
  Point operator+(const Point& other) const {
    return Point(x + other.x, y + other.y);
  }
  Point operator-(const Point& other) const {
    return Point(x - other.x, y - other.y);
  }
  Point operator*(double scalar) const {
    return Point(x * scalar, y * scalar);
  }
  Point operator/(double scalar) const {
    return Point(x / scalar, y / scalar);
  }

  // Prodotto scalare (dot product)
  double dot(const Point& other) const {
    return x * other.x + y * other.y;
  }

  // Prodotto vettoriale (cross product - componente z in 2D)
  double cross(const Point& other) const {
    return x * other.y - y * other.x;
  }

  // Lunghezza (magnitudine) del vettore dal punto all'origine
  double length() const {
    return std::sqrt(x * x + y * y);
  }
  
  // Distanza da un altro punto
  double distance(const Point& other) const {
    return (*this - other).length();
  }

  // Normalizzazione (vettore unitario)
  Point normalize() const {
    double l = length();
    if (std::abs(l) < EPS) return Point(0,0); // Evita divisione per zero
    return Point(x / l, y / l);
  }
  
  // Rotazione di un angolo theta (in radianti) attorno all'origine
  Point rotate(double theta) const {
    double new_x = x * std::cos(theta) - y * std::sin(theta);
    double new_y = x * std::sin(theta) + y * std::cos(theta);
    return Point(new_x, new_y);
  }

  // Angolo del vettore (da (0,0) a this) rispetto all'asse x positivo
  double angle() const {
    return std::atan2(y, x); // Restituisce in [-PI, PI]
  }

  // Uguaglianza con tolleranza EPS
  bool operator==(const Point& other) const {
    return std::abs(x - other.x) < EPS && std::abs(y - other.y) < EPS;
  }
};

// Input/Output per punti (opzionale)
std::ostream& operator<<(std::ostream& os, const Point& p) {
    os << std::fixed << std::setprecision(9) << "(" << p.x << ", " << p.y << ")";
    return os;
}
`}</code></pre>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">2.2 Linee e Segmenti</h3>
          <p className="text-lg leading-relaxed mb-2">
            Una **linea** può essere rappresentata da due punti distinti `A` e `B`, o da un punto e un vettore direzione, o dall'equazione `ax + by + c = 0`.
            Un **segmento** è una porzione di linea tra due punti estremi `A` e `B`.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`struct Line {
  Point p1, p2; // Due punti sulla linea
  // Oppure: Point p; Vector dir;
  // Oppure: double a, b, c; // ax + by + c = 0

  Line(Point _p1, Point _p2) : p1(_p1), p2(_p2) {}
};

struct Segment {
  Point p1, p2;
  Segment(Point _p1, Point _p2) : p1(_p1), p2(_p2) {}

  double length() const {
    return p1.distance(p2);
  }
};
`}</code></pre>
        </div>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Operazioni Geometriche Fondamentali</h2>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">3.1 Prodotto Vettoriale (Cross Product)</h3>
          <p className="text-lg leading-relaxed mb-2">
            Per due vettori `v1 = P - O` e `v2 = Q - O` (con `O` origine comune), il prodotto vettoriale `v1.cross(v2)` (o `(P-O).cross(Q-O)`) in 2D è uno scalare `v1.x * v2.y - v1.y * v2.x`. Il suo segno indica l'orientamento:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
            <li>`> 0`: `v2` è a sinistra di `v1` (svolta a sinistra da `v1` a `v2`).</li>
            <li>`< 0`: `v2` è a destra di `v1` (svolta a destra).</li>
            <li>`= 0`: `v1` e `v2` sono collineari (stessa direzione o opposta).</li>
          </ul>
          <p className="text-lg leading-relaxed mt-2">
            L'area del parallelogramma formato da `v1` e `v2` è `|v1.cross(v2)|`. L'area del triangolo `OPQ` è `0.5 * |(P-O).cross(Q-O)|`.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">3.2 Orientamento di Tre Punti (A, B, C)</h3>
          <p className="text-lg leading-relaxed mb-2">
            Si calcola il prodotto vettoriale dei vettori `BA = A - B` e `BC = C - B`. Cioè, `(A - B).cross(C - B)`.
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
            <li>`> 0`: Svolta a sinistra (C è a sinistra della linea orientata AB).</li>
            <li>`< 0`: Svolta a destra (C è a destra della linea orientata AB).</li>
            <li>`= 0`: A, B, C sono collineari.</li>
          </ul>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Ritorna: >0 se C è a sinistra di AB, <0 se a destra, =0 se collineari
double orientation(Point a, Point b, Point c) {
  return (b - a).cross(c - a);
  // Oppure: (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}
`}</code></pre>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">3.3 Proiezione di un Punto su una Linea</h3>
          <p className="text-lg leading-relaxed mb-2">
            Data una linea definita da `A` e `B`, e un punto `P`, la proiezione di `P` sulla linea `AB` è il punto `P'` sulla linea tale che `PP'` è perpendicolare ad `AB`.
            Sia `v = B - A` (vettore direzione della linea) e `w = P - A`.
            `P' = A + v * (w.dot(v) / v.dot(v))` (se `v.dot(v)` non è zero).
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`Point project_point_onto_line(Point p, Point a, Point b) {
  Point ap = p - a;
  Point ab = b - a;
  double ab_len_sq = ab.dot(ab);
  if (std::abs(ab_len_sq) < EPS) return a; // a e b sono lo stesso punto
  double t = ap.dot(ab) / ab_len_sq;
  return a + ab * t;
}
`}</code></pre>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">3.4 Distanza Punto-Linea e Punto-Segmento</h3>
          <p className="text-lg leading-relaxed mb-2">
            <strong>Distanza Punto-Linea:</strong> La distanza da `P` alla linea `AB` è `| (B-A).cross(P-A) | / (B-A).length()`. (Area del parallelogramma / lunghezza base).
          </p>
          <p className="text-lg leading-relaxed mb-2">
            <strong>Distanza Punto-Segmento:</strong> Sia `P'` la proiezione di `P` sulla linea contenente il segmento `AB`. 
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
            <li>Se `P'` giace sul segmento `AB`, la distanza è `P.distance(P')`.</li>
            <li>Altrimenti, la distanza è `min(P.distance(A), P.distance(B))`.</li>
          </ul>
          <p className="text-lg leading-relaxed mt-2">
            Per verificare se `P'` è sul segmento, si può controllare se il parametro `t` della proiezione (`P' = A + t*(B-A)`) è in `[0, 1]`.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`double dist_point_line(Point p, Point a, Point b) {
  Point ap = p - a;
  Point ab = b - a;
  double ab_len = ab.length();
  if (std::abs(ab_len) < EPS) return p.distance(a); // a e b sono lo stesso punto
  return std::abs(ab.cross(ap)) / ab_len;
}

double dist_point_segment(Point p, Point a, Point b) {
  Point ap = p - a;
  Point ab = b - a;
  double ab_len_sq = ab.dot(ab);

  if (std::abs(ab_len_sq) < EPS) return p.distance(a); // a e b sono lo stesso punto

  double t = ap.dot(ab) / ab_len_sq;

  if (t < 0.0 - EPS) return p.distance(a); // Proiezione prima di a
  if (t > 1.0 + EPS) return p.distance(b); // Proiezione dopo b
  
  Point projection = a + ab * t;
  return p.distance(projection);
}
`}</code></pre>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">3.5 Intersezione di Linee</h3>
          <p className="text-lg leading-relaxed mb-2">
            Date due linee `L1` (definita da `A, B`) e `L2` (definita da `C, D`).
            Se sono parallele (`(B-A).cross(D-C) == 0`), possono non intersecarsi o essere coincidenti.
            Altrimenti, si intersecano in un unico punto. Sia `v1 = B-A` e `v2 = D-C`.
            Il punto di intersezione `P` può essere trovato risolvendo `A + t*v1 = C + u*v2` per `t` (o `u`).
            Una formula: `t = (C-A).cross(v2) / v1.cross(v2)`. Il punto è `A + t*v1`.
            (Attenzione se `v1.cross(v2)` è zero, cioè linee parallele).
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`// Trova il punto di intersezione di due linee AB e CD
// Ritorna un booleano per indicare se l'intersezione esiste (non parallele)
// e il punto di intersezione in intersection_point
bool line_line_intersection(Point a, Point b, Point c, Point d, Point& intersection_point) {
  Point ab_vec = b - a;
  Point cd_vec = d - c;
  double det = ab_vec.cross(cd_vec);

  if (std::abs(det) < EPS) {
    // Linee parallele o coincidenti
    // Per verificare se sono coincidenti e si sovrappongono, si può controllare se C è sulla linea AB
    // e se A è sulla linea CD. Se sono collineari, potrebbero non intersecarsi mai (parallele distinte)
    // o essere la stessa linea.
    // Qui, per semplicità, diciamo solo che non c'è una singola intersezione unica.
    return false; 
  }

  double t = (c - a).cross(cd_vec) / det;
  // double u = (c - a).cross(ab_vec) / det; // Se si volesse il parametro per la seconda linea
  
  intersection_point = a + ab_vec * t;
  return true;
}
`}</code></pre>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-2">3.6 Intersezione di Segmenti</h3>
          <p className="text-lg leading-relaxed mb-2">
            Due segmenti `AB` e `CD` si intersecano se:
          </p>
          <ol className="list-decimal list-inside text-lg leading-relaxed ml-4">
            <li className="mb-1">L'orientamento di `(A, B, C)` è diverso da quello di `(A, B, D)`, E</li>
            <li className="mb-1">L'orientamento di `(C, D, A)` è diverso da quello di `(C, D, B)`.</li>
          </ol>
          <p className="text-lg leading-relaxed mt-2">
            Questo copre il caso generale. Bisogna gestire separatamente i casi degeneri (collinearità):
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
            <li>Un estremo di un segmento giace sull'altro segmento.</li>
            <li>I segmenti sono collineari e si sovrappongono.</li>
          </ul>
          <p className="text-lg leading-relaxed mt-2">
            Una funzione helper `on_segment(P, A, B)` verifica se il punto collineare `P` giace sul segmento `AB`:
            `P.x >= min(A.x, B.x) && P.x <= max(A.x, B.x) && P.y >= min(A.y, B.y) && P.y <= max(A.y, B.y)`.
          </p>
        </div>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Area di un Poligono Semplice</h2>
        <p className="text-lg leading-relaxed mb-4">
          Data una sequenza di vertici `P_0, P_1, ..., P_{n-1}` di un poligono semplice (non auto-intersecante), ordinati in senso orario o antiorario, l'area può essere calcolata con la **formula dell'area di Gauss** (o formula della stringa / shoelace formula):
          `Area = 0.5 * | Σ_{i=0}^{n-1} (P_i.x * P_{i+1}.y - P_{i+1}.x * P_i.y) |`
          dove `P_n = P_0`.
          Alternativamente, usando il prodotto vettoriale rispetto a un'origine arbitraria (es. `(0,0)`):
          `Area = 0.5 * | Σ_{i=0}^{n-1} P_i.cross(P_{i+1}) |` (dove `P_n = P_0`).
          Il segno del risultato prima del valore assoluto indica l'orientamento dei vertici (es. positivo per antiorario, negativo per orario, a seconda della definizione di cross product).
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <vector>

double polygon_area(const std::vector<Point>& vertices) {
  int n = vertices.size();
  if (n < 3) return 0.0; // Non è un poligono

  double area = 0.0;
  for (int i = 0; i < n; ++i) {
    area += vertices[i].cross(vertices[(i + 1) % n]);
  }
  return std::abs(area) / 2.0;
}
`}</code></pre>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Collegamenti a Concetti Prerequisiti e Successivi</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li className="mb-2"><strong>Prerequisito:</strong> Algebra lineare di base (vettori, prodotto scalare). Trigonometria di base.</li>
          <li className="mb-2"><strong>Concetto Correlato:</strong> <a href="./geometry-sweepline" className="text-blue-600 dark:text-blue-400 hover:underline">Geometria - Sweepline (Gold)</a> (molte tecniche di sweepline si basano su queste operazioni fondamentali).</li>
          <li className="mb-2"><strong>Concetti Avanzati (Platinum):</strong> Convex Hull, Rotating Calipers, Voronoi Diagrams, Delaunay Triangulation, intersezione di poligoni.</li>
        </ul>
      </section>
    </div>
  );
};

export default GeometryBasicsGoldPage;

