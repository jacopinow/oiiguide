import React from 'react';

const SweepLineAdvancedPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Sweep Line Avanzato (Livello Platinum)</h1>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">1. Introduzione al Sweep Line Avanzato</h2>
        <p className="text-lg leading-relaxed mb-4">
          La tecnica Sweep Line (o linea di spazzamento) è un potente paradigma algoritmico utilizzato principalmente in geometria computazionale. Abbiamo già visto i concetti base di questa tecnica, ma in questa lezione esploreremo applicazioni più avanzate e complesse che richiedono una comprensione più profonda e sofisticata.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          L'idea fondamentale rimane la stessa: immaginiamo una linea che spazza il piano, generalmente da sinistra a destra o dall'alto verso il basso, fermandosi in punti di interesse (eventi). Durante lo spazzamento, manteniamo una struttura dati che rappresenta lo stato corrente degli oggetti intersecati dalla linea di spazzamento.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Nelle applicazioni avanzate, dovremo gestire:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Eventi più complessi e interdipendenti</li>
          <li className="mb-1">Strutture dati più sofisticate per mantenere lo stato</li>
          <li className="mb-1">Interazioni tra più tipi di oggetti geometrici</li>
          <li className="mb-1">Ottimizzazioni per migliorare l'efficienza</li>
        </ul>
        <p className="text-lg leading-relaxed">
          In questa lezione, esploreremo alcune applicazioni avanzate della tecnica Sweep Line, come l'intersezione di segmenti, l'unione di rettangoli, il calcolo dell'area di unione di poligoni, e altro ancora.
        </p>
      </section>
      
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">2. Intersezione di Segmenti</h2>
        <p className="text-lg leading-relaxed mb-4">
          Uno dei problemi classici risolti con la tecnica Sweep Line avanzata è trovare tutte le intersezioni tra un insieme di segmenti di linea nel piano. Questo problema ha applicazioni in cartografia, computer grafica, progettazione di circuiti integrati e molti altri campi.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          L'algoritmo di Bentley-Ottmann è una soluzione efficiente basata su Sweep Line:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Inizializziamo una coda di priorità con tutti gli endpoint dei segmenti.</li>
          <li className="mb-1">Manteniamo una struttura dati bilanciata (come un albero AVL o un albero rosso-nero) per tenere traccia dei segmenti attualmente intersecati dalla linea di spazzamento, ordinati per la loro posizione y all'intersezione con la linea.</li>
          <li className="mb-1">Processiamo gli eventi in ordine da sinistra a destra:
            <ul className="list-disc list-inside ml-8 mt-1">
              <li>Quando incontriamo l'endpoint sinistro di un segmento, lo inseriamo nella struttura.</li>
              <li>Quando incontriamo l'endpoint destro, lo rimuoviamo.</li>
              <li>In entrambi i casi, controlliamo se il nuovo segmento interseca i suoi vicini nella struttura.</li>
              <li>Se troviamo un'intersezione, aggiungiamo un nuovo evento alla coda di priorità.</li>
            </ul>
          </li>
        </ol>
        <p className="text-lg leading-relaxed mb-4">
          Vediamo un'implementazione dettagliata dell'algoritmo di Bentley-Ottmann:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Struttura per rappresentare un punto
struct Point {
    double x, y;
    
    Point(double _x = 0, double _y = 0) : x(_x), y(_y) {}
    
    bool operator<(const Point& p) const {
        return x < p.x || (x == p.x && y < p.y);
    }
    
    bool operator==(const Point& p) const {
        return fabs(x - p.x) < 1e-9 && fabs(y - p.y) < 1e-9;
    }
};

// Struttura per rappresentare un segmento
struct Segment {
    Point p, q;
    int id;
    
    Segment(Point _p = Point(), Point _q = Point(), int _id = 0) : id(_id) {
        // Assicuriamo che p sia sempre a sinistra di q
        if (_p < _q) {
            p = _p;
            q = _q;
        } else {
            p = _q;
            q = _p;
        }
    }
};

// Struttura per rappresentare un evento
struct Event {
    Point p;
    bool isLeft;
    int segmentId;
    
    Event(Point _p, bool _isLeft, int _segmentId)
        : p(_p), isLeft(_isLeft), segmentId(_segmentId) {}
    
    bool operator<(const Event& e) const {
        // Ordina gli eventi per coordinata x, poi per tipo (endpoint sinistro prima)
        return p.x > e.p.x || (p.x == e.p.x && isLeft < e.isLeft);
    }
};

// Funzione per verificare se due segmenti si intersecano
bool doSegmentsIntersect(const Segment& s1, const Segment& s2, Point& intersection) {
    // Implementazione dell'algoritmo di intersezione di segmenti
    // Utilizziamo il prodotto vettoriale per determinare l'orientazione
    
    auto cross = [](const Point& a, const Point& b, const Point& c) -> double {
        return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
    };
    
    double d1 = cross(s2.p, s2.q, s1.p);
    double d2 = cross(s2.p, s2.q, s1.q);
    double d3 = cross(s1.p, s1.q, s2.p);
    double d4 = cross(s1.p, s1.q, s2.q);
    
    // Se i segmenti sono collineari
    if (fabs(d1) < 1e-9 && fabs(d2) < 1e-9) {
        // Verifichiamo se si sovrappongono
        if (s1.p.x > s2.q.x || s2.p.x > s1.q.x || s1.p.y > s2.q.y || s2.p.y > s1.q.y) {
            return false;
        }
        
        // Troviamo il punto di intersezione (il punto più a destra tra i due endpoint sinistri)
        intersection = s1.p.x > s2.p.x ? s1.p : s2.p;
        return true;
    }
    
    // Se i segmenti si intersecano
    if ((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) {
        if ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0)) {
            // Calcoliamo il punto di intersezione
            double t = d3 / (d3 - d4);
            intersection.x = s1.p.x + t * (s1.q.x - s1.p.x);
            intersection.y = s1.p.y + t * (s1.q.y - s1.p.y);
            return true;
        }
    }
    
    return false;
}

// Funzione per calcolare la posizione y di un segmento a una data coordinata x
double getYAtX(const Segment& s, double x) {
    if (fabs(s.p.x - s.q.x) < 1e-9) return s.p.y; // Segmento verticale
    
    double t = (x - s.p.x) / (s.q.x - s.p.x);
    return s.p.y + t * (s.q.y - s.p.y);
}

// Comparatore per ordinare i segmenti nella struttura di stato
struct SegmentComparator {
    double sweepX;
    
    SegmentComparator(double _sweepX) : sweepX(_sweepX) {}
    
    bool operator()(const Segment& s1, const Segment& s2) const {
        double y1 = getYAtX(s1, sweepX);
        double y2 = getYAtX(s2, sweepX);
        return y1 < y2 || (fabs(y1 - y2) < 1e-9 && s1.id < s2.id);
    }
};

// Funzione principale per trovare tutte le intersezioni
vector<Point> findAllIntersections(vector<Segment>& segments) {
    int n = segments.size();
    vector<Point> intersections;
    
    // Coda di priorità per gli eventi
    priority_queue<Event> events;
    
    // Aggiungiamo tutti gli endpoint come eventi
    for (int i = 0; i < n; i++) {
        events.push(Event(segments[i].p, true, i));
        events.push(Event(segments[i].q, false, i));
    }
    
    // Struttura per mantenere i segmenti attivi
    set<Segment, SegmentComparator> active(SegmentComparator(0));
    
    // Processiamo gli eventi
    while (!events.empty()) {
        Event event = events.top();
        events.pop();
        
        // Aggiorniamo la posizione x della linea di spazzamento
        double sweepX = event.p.x;
        active = set<Segment, SegmentComparator>(SegmentComparator(sweepX));
        
        if (event.isLeft) {
            // Endpoint sinistro: aggiungiamo il segmento alla struttura attiva
            auto it = active.insert(segments[event.segmentId]).first;
            
            // Controlliamo le intersezioni con i segmenti vicini
            if (it != active.begin()) {
                auto prev = it;
                prev--;
                Point intersection;
                if (doSegmentsIntersect(*prev, *it, intersection) && intersection.x > sweepX) {
                    intersections.push_back(intersection);
                    events.push(Event(intersection, false, -1)); // Evento di intersezione
                }
            }
            
            auto next = it;
            next++;
            if (next != active.end()) {
                Point intersection;
                if (doSegmentsIntersect(*it, *next, intersection) && intersection.x > sweepX) {
                    intersections.push_back(intersection);
                    events.push(Event(intersection, false, -1)); // Evento di intersezione
                }
            }
        } else {
            // Endpoint destro o intersezione: rimuoviamo il segmento dalla struttura attiva
            if (event.segmentId != -1) {
                auto it = active.find(segments[event.segmentId]);
                if (it != active.end()) {
                    auto prev = it;
                    auto next = it;
                    
                    if (it != active.begin()) prev--;
                    next++;
                    
                    active.erase(it);
                    
                    // Controlliamo se i segmenti adiacenti si intersecano
                    if (prev != active.end() && next != active.end()) {
                        Point intersection;
                        if (doSegmentsIntersect(*prev, *next, intersection) && intersection.x > sweepX) {
                            intersections.push_back(intersection);
                            events.push(Event(intersection, false, -1)); // Evento di intersezione
                        }
                    }
                }
            } else {
                // Evento di intersezione: aggiorniamo la struttura attiva
                // Questo è un punto di intersezione che abbiamo già registrato
            }
        }
    }
    
    // Rimuoviamo i duplicati
    sort(intersections.begin(), intersections.end(), [](const Point& a, const Point& b) {
        return a.x < b.x || (a.x == b.x && a.y < b.y);
    });
    intersections.erase(unique(intersections.begin(), intersections.end(), [](const Point& a, const Point& b) {
        return a == b;
    }), intersections.end());
    
    return intersections;
}

// Esempio di utilizzo
int main() {
    vector<Segment> segments = {
        Segment(Point(1, 1), Point(5, 5), 0),
        Segment(Point(1, 5), Point(5, 1), 1),
        Segment(Point(2, 2), Point(4, 4), 2),
        Segment(Point(3, 1), Point(3, 5), 3)
    };
    
    vector<Point> intersections = findAllIntersections(segments);
    
    cout << "Numero di intersezioni trovate: " << intersections.size() << endl;
    for (const auto& p : intersections) {
        cout << "Intersezione in (" << p.x << ", " << p.y << ")" << endl;
    }
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Tempo: O((n + k) log n), dove n è il numero di segmenti e k è il numero di intersezioni</li>
          <li className="mb-1">Spazio: O(n + k)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Questa implementazione dell'algoritmo di Bentley-Ottmann è efficiente per trovare tutte le intersezioni tra segmenti. Tuttavia, è importante notare che la gestione delle degenerazioni (come segmenti collineari o più di due segmenti che si intersecano nello stesso punto) richiede particolare attenzione e può complicare l'implementazione.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">3. Area dell'Unione di Rettangoli</h2>
        <p className="text-lg leading-relaxed mb-4">
          Un altro problema classico risolto con la tecnica Sweep Line avanzata è calcolare l'area dell'unione di un insieme di rettangoli con lati paralleli agli assi. Questo problema ha applicazioni in computer grafica, progettazione di layout e analisi di immagini.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          L'idea è di spazzare il piano da sinistra a destra, mantenendo un insieme di intervalli attivi lungo l'asse y:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Ordiniamo tutti i bordi verticali dei rettangoli da sinistra a destra.</li>
          <li className="mb-1">Per ogni posizione x, manteniamo un insieme di intervalli attivi lungo l'asse y.</li>
          <li className="mb-1">Quando incontriamo il bordo sinistro di un rettangolo, aggiungiamo il suo intervallo y all'insieme attivo.</li>
          <li className="mb-1">Quando incontriamo il bordo destro, rimuoviamo l'intervallo.</li>
          <li className="mb-1">Ad ogni passo, calcoliamo la lunghezza totale degli intervalli attivi e la moltiplichiamo per la distanza tra la posizione x corrente e la successiva.</li>
        </ol>
        <p className="text-lg leading-relaxed mb-4">
          Per gestire efficientemente gli intervalli attivi, possiamo utilizzare un albero di intervalli o una struttura simile.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Struttura per rappresentare un rettangolo
struct Rectangle {
    int x1, y1, x2, y2;
    
    Rectangle(int _x1, int _y1, int _x2, int _y2)
        : x1(_x1), y1(_y1), x2(_x2), y2(_y2) {}
};

// Struttura per rappresentare un evento
struct Event {
    int x;
    int y1, y2;
    bool isStart;
    
    Event(int _x, int _y1, int _y2, bool _isStart)
        : x(_x), y1(_y1), y2(_y2), isStart(_isStart) {}
    
    bool operator<(const Event& e) const {
        return x < e.x;
    }
};

// Struttura per gestire gli intervalli attivi
class IntervalTree {
private:
    map<int, int> tree;
    
public:
    // Aggiunge un intervallo [y1, y2)
    void addInterval(int y1, int y2) {
        tree[y1]++;
        tree[y2]--;
    }
    
    // Rimuove un intervallo [y1, y2)
    void removeInterval(int y1, int y2) {
        tree[y1]--;
        tree[y2]++;
    }
    
    // Calcola la lunghezza totale degli intervalli attivi
    int getTotalLength() {
        int result = 0;
        int count = 0;
        int prev = 0;
        
        for (auto& [y, delta] : tree) {
            if (count > 0) {
                result += y - prev;
            }
            count += delta;
            prev = y;
        }
        
        return result;
    }
};

// Funzione principale per calcolare l'area dell'unione di rettangoli
long long unionArea(vector<Rectangle>& rectangles) {
    vector<Event> events;
    
    // Creiamo gli eventi per ogni rettangolo
    for (const auto& rect : rectangles) {
        events.push_back(Event(rect.x1, rect.y1, rect.y2, true));  // Bordo sinistro
        events.push_back(Event(rect.x2, rect.y1, rect.y2, false)); // Bordo destro
    }
    
    // Ordiniamo gli eventi per coordinata x
    sort(events.begin(), events.end());
    
    long long area = 0;
    IntervalTree activeIntervals;
    
    // Processiamo gli eventi
    for (size_t i = 0; i < events.size(); i++) {
        // Calcoliamo l'area tra l'evento corrente e il successivo
        if (i > 0) {
            area += (long long)(events[i].x - events[i-1].x) * activeIntervals.getTotalLength();
        }
        
        // Aggiorniamo gli intervalli attivi
        if (events[i].isStart) {
            activeIntervals.addInterval(events[i].y1, events[i].y2);
        } else {
            activeIntervals.removeInterval(events[i].y1, events[i].y2);
        }
    }
    
    return area;
}

// Esempio di utilizzo
int main() {
    vector<Rectangle> rectangles = {
        Rectangle(1, 1, 3, 3),
        Rectangle(2, 2, 4, 4),
        Rectangle(0, 0, 2, 2)
    };
    
    long long area = unionArea(rectangles);
    
    cout << "Area dell'unione dei rettangoli: " << area << endl;
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Tempo: O(n log n), dove n è il numero di rettangoli</li>
          <li className="mb-1">Spazio: O(n)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Questa implementazione utilizza una struttura dati basata su map per gestire gli intervalli attivi. In pratica, potremmo utilizzare strutture più efficienti come un albero di intervalli o un albero di segmenti per migliorare ulteriormente le prestazioni.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">4. Closest Pair of Points</h2>
        <p className="text-lg leading-relaxed mb-4">
          Un altro problema interessante che può essere risolto con una variante della tecnica Sweep Line è trovare la coppia di punti più vicini in un insieme di punti nel piano. Sebbene questo problema possa essere risolto con l'algoritmo divide et impera in O(n log n), la tecnica Sweep Line offre un'alternativa elegante con la stessa complessità.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          L'idea è di spazzare il piano da sinistra a destra, mantenendo una finestra di punti potenzialmente vicini:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Ordiniamo tutti i punti per coordinata x.</li>
          <li className="mb-1">Inizializziamo la distanza minima d con un valore grande.</li>
          <li className="mb-1">Manteniamo un insieme di punti attivi, ordinati per coordinata y.</li>
          <li className="mb-1">Per ogni punto p, rimuoviamo dall'insieme attivo tutti i punti con coordinata x minore di p.x - d.</li>
          <li className="mb-1">Cerchiamo nell'insieme attivo tutti i punti con coordinata y nell'intervallo [p.y - d, p.y + d] e aggiorniamo d se troviamo una distanza minore.</li>
          <li className="mb-1">Aggiungiamo p all'insieme attivo.</li>
        </ol>
        <p className="text-lg leading-relaxed mb-4">
          L'osservazione chiave è che dobbiamo considerare solo i punti all'interno di una striscia verticale di larghezza 2d centrata sul punto corrente.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Struttura per rappresentare un punto
struct Point {
    double x, y;
    
    Point(double _x = 0, double _y = 0) : x(_x), y(_y) {}
    
    bool operator<(const Point& p) const {
        return x < p.x || (x == p.x && y < p.y);
    }
};

// Comparatore per ordinare i punti per coordinata y
struct CompareY {
    bool operator()(const Point& p1, const Point& p2) const {
        return p1.y < p2.y;
    }
};

// Funzione per calcolare la distanza euclidea tra due punti
double distance(const Point& p1, const Point& p2) {
    double dx = p1.x - p2.x;
    double dy = p1.y - p2.y;
    return sqrt(dx * dx + dy * dy);
}

// Funzione principale per trovare la coppia di punti più vicini
pair<Point, Point> closestPair(vector<Point>& points) {
    int n = points.size();
    if (n <= 1) return {Point(), Point()};
    
    // Ordiniamo i punti per coordinata x
    sort(points.begin(), points.end());
    
    // Inizializziamo la distanza minima con un valore grande
    double minDist = numeric_limits<double>::max();
    pair<Point, Point> closestPair;
    
    // Insieme di punti attivi, ordinati per coordinata y
    set<Point, CompareY> activePoints;
    
    int left = 0; // Indice del punto più a sinistra nell'insieme attivo
    
    for (int i = 0; i < n; i++) {
        // Rimuoviamo i punti che sono troppo lontani a sinistra
        while (left < i && points[i].x - points[left].x > minDist) {
            activePoints.erase(points[left]);
            left++;
        }
        
        // Cerchiamo i punti nell'intervallo [y - minDist, y + minDist]
        auto lower = activePoints.lower_bound(Point(0, points[i].y - minDist));
        auto upper = activePoints.upper_bound(Point(0, points[i].y + minDist));
        
        // Controlliamo la distanza con tutti i punti nell'intervallo
        for (auto it = lower; it != upper; it++) {
            double dist = distance(*it, points[i]);
            if (dist < minDist) {
                minDist = dist;
                closestPair = {*it, points[i]};
            }
        }
        
        // Aggiungiamo il punto corrente all'insieme attivo
        activePoints.insert(points[i]);
    }
    
    return closestPair;
}

// Esempio di utilizzo
int main() {
    vector<Point> points = {
        Point(2, 3),
        Point(12, 30),
        Point(40, 50),
        Point(5, 1),
        Point(12, 10),
        Point(3, 4)
    };
    
    auto [p1, p2] = closestPair(points);
    
    cout << "La coppia di punti più vicini è:" << endl;
    cout << "(" << p1.x << ", " << p1.y << ") e (" << p2.x << ", " << p2.y << ")" << endl;
    cout << "Distanza: " << distance(p1, p2) << endl;
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Tempo: O(n log n), dove n è il numero di punti</li>
          <li className="mb-1">Spazio: O(n)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Questa implementazione utilizza un set ordinato per mantenere i punti attivi. L'osservazione chiave che rende l'algoritmo efficiente è che, per ogni punto, dobbiamo considerare solo un numero costante di punti nell'insieme attivo.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">5. Perimetro dell'Unione di Rettangoli</h2>
        <p className="text-lg leading-relaxed mb-4">
          Un problema correlato all'area dell'unione di rettangoli è calcolare il perimetro dell'unione. Questo problema è più complesso perché dobbiamo tenere traccia dei bordi che fanno parte del perimetro esterno.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Possiamo utilizzare una variante della tecnica Sweep Line:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Trattiamo separatamente i bordi orizzontali e verticali.</li>
          <li className="mb-1">Per i bordi orizzontali, spazziamo il piano da basso verso l'alto, mantenendo un insieme di intervalli attivi lungo l'asse x.</li>
          <li className="mb-1">Per i bordi verticali, spazziamo il piano da sinistra a destra, mantenendo un insieme di intervalli attivi lungo l'asse y.</li>
          <li className="mb-1">Ad ogni passo, calcoliamo la lunghezza dei bordi che fanno parte del perimetro esterno.</li>
        </ol>
        <p className="text-lg leading-relaxed mb-4">
          Vediamo un'implementazione che calcola il perimetro dell'unione di rettangoli:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Struttura per rappresentare un rettangolo
struct Rectangle {
    int x1, y1, x2, y2;
    
    Rectangle(int _x1, int _y1, int _x2, int _y2)
        : x1(_x1), y1(_y1), x2(_x2), y2(_y2) {}
};

// Struttura per rappresentare un evento orizzontale
struct HorizontalEvent {
    int x1, x2, y;
    bool isBottom;
    
    HorizontalEvent(int _x1, int _x2, int _y, bool _isBottom)
        : x1(_x1), x2(_x2), y(_y), isBottom(_isBottom) {}
    
    bool operator<(const HorizontalEvent& e) const {
        return y < e.y || (y == e.y && isBottom > e.isBottom);
    }
};

// Struttura per rappresentare un evento verticale
struct VerticalEvent {
    int x, y1, y2;
    bool isLeft;
    
    VerticalEvent(int _x, int _y1, int _y2, bool _isLeft)
        : x(_x), y1(_y1), y2(_y2), isLeft(_isLeft) {}
    
    bool operator<(const VerticalEvent& e) const {
        return x < e.x || (x == e.x && isLeft > e.isLeft);
    }
};

// Struttura per gestire gli intervalli attivi
class IntervalSet {
private:
    map<int, int> intervals;
    
public:
    // Aggiunge un intervallo [a, b)
    void addInterval(int a, int b) {
        intervals[a]++;
        intervals[b]--;
    }
    
    // Rimuove un intervallo [a, b)
    void removeInterval(int a, int b) {
        intervals[a]--;
        intervals[b]++;
    }
    
    // Calcola la lunghezza totale degli intervalli attivi
    int getTotalLength() {
        int result = 0;
        int count = 0;
        int prev = 0;
        
        for (auto& [pos, delta] : intervals) {
            if (count > 0) {
                result += pos - prev;
            }
            count += delta;
            prev = pos;
        }
        
        return result;
    }
    
    // Calcola la lunghezza del perimetro (bordi esterni)
    int getPerimeterLength() {
        int result = 0;
        int count = 0;
        int prev = 0;
        vector<pair<int, int>> edges;
        
        for (auto& [pos, delta] : intervals) {
            if (count == 0 && delta > 0) {
                edges.push_back({pos, 1}); // Inizio di un bordo esterno
            } else if (count > 0 && count + delta == 0) {
                edges.push_back({pos, -1}); // Fine di un bordo esterno
            }
            count += delta;
            prev = pos;
        }
        
        for (size_t i = 0; i < edges.size(); i += 2) {
            result += edges[i+1].first - edges[i].first;
        }
        
        return result;
    }
};

// Funzione principale per calcolare il perimetro dell'unione di rettangoli
int unionPerimeter(vector<Rectangle>& rectangles) {
    vector<HorizontalEvent> horizontalEvents;
    vector<VerticalEvent> verticalEvents;
    
    // Creiamo gli eventi per ogni rettangolo
    for (const auto& rect : rectangles) {
        // Eventi orizzontali
        horizontalEvents.push_back(HorizontalEvent(rect.x1, rect.x2, rect.y1, true));  // Bordo inferiore
        horizontalEvents.push_back(HorizontalEvent(rect.x1, rect.x2, rect.y2, false)); // Bordo superiore
        
        // Eventi verticali
        verticalEvents.push_back(VerticalEvent(rect.x1, rect.y1, rect.y2, true));  // Bordo sinistro
        verticalEvents.push_back(VerticalEvent(rect.x2, rect.y1, rect.y2, false)); // Bordo destro
    }
    
    // Ordiniamo gli eventi
    sort(horizontalEvents.begin(), horizontalEvents.end());
    sort(verticalEvents.begin(), verticalEvents.end());
    
    int horizontalPerimeter = 0;
    IntervalSet activeHorizontalIntervals;
    
    // Processiamo gli eventi orizzontali
    for (size_t i = 0; i < horizontalEvents.size(); i++) {
        // Calcoliamo il perimetro orizzontale
        if (i > 0) {
            horizontalPerimeter += (horizontalEvents[i].y - horizontalEvents[i-1].y) * 
                                  activeHorizontalIntervals.getPerimeterLength();
        }
        
        // Aggiorniamo gli intervalli attivi
        if (horizontalEvents[i].isBottom) {
            activeHorizontalIntervals.addInterval(horizontalEvents[i].x1, horizontalEvents[i].x2);
        } else {
            activeHorizontalIntervals.removeInterval(horizontalEvents[i].x1, horizontalEvents[i].x2);
        }
    }
    
    int verticalPerimeter = 0;
    IntervalSet activeVerticalIntervals;
    
    // Processiamo gli eventi verticali
    for (size_t i = 0; i < verticalEvents.size(); i++) {
        // Calcoliamo il perimetro verticale
        if (i > 0) {
            verticalPerimeter += (verticalEvents[i].x - verticalEvents[i-1].x) * 
                                activeVerticalIntervals.getPerimeterLength();
        }
        
        // Aggiorniamo gli intervalli attivi
        if (verticalEvents[i].isLeft) {
            activeVerticalIntervals.addInterval(verticalEvents[i].y1, verticalEvents[i].y2);
        } else {
            activeVerticalIntervals.removeInterval(verticalEvents[i].y1, verticalEvents[i].y2);
        }
    }
    
    return horizontalPerimeter + verticalPerimeter;
}

// Esempio di utilizzo
int main() {
    vector<Rectangle> rectangles = {
        Rectangle(1, 1, 3, 3),
        Rectangle(2, 2, 4, 4),
        Rectangle(0, 0, 2, 2)
    };
    
    int perimeter = unionPerimeter(rectangles);
    
    cout << "Perimetro dell'unione dei rettangoli: " << perimeter << endl;
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Tempo: O(n log n), dove n è il numero di rettangoli</li>
          <li className="mb-1">Spazio: O(n)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Questa implementazione è più complessa rispetto al calcolo dell'area, poiché dobbiamo tenere traccia dei bordi esterni. La classe IntervalSet è stata estesa per calcolare la lunghezza del perimetro, considerando solo i bordi che fanno parte del perimetro esterno.
        </p>
      </section>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">6. Applicazione: Problema della Galleria d'Arte</h2>
        <p className="text-lg leading-relaxed mb-4">
          Il problema della galleria d'arte è un classico problema di geometria computazionale: dato un poligono semplice che rappresenta la pianta di una galleria d'arte, trovare il numero minimo di guardie necessarie per sorvegliare l'intera galleria, assumendo che ogni guardia possa vedere in tutte le direzioni.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Il teorema della galleria d'arte afferma che ⌊n/3⌋ guardie sono sempre sufficienti e talvolta necessarie per sorvegliare un poligono semplice con n vertici. Tuttavia, trovare il posizionamento ottimale delle guardie è un problema NP-difficile.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Possiamo utilizzare una variante della tecnica Sweep Line per trovare una soluzione approssimata:
        </p>
        <ol className="list-decimal list-inside text-lg leading-relaxed ml-4 mb-4">
          <li className="mb-1">Triangoliamo il poligono.</li>
          <li className="mb-1">Costruiamo il grafo duale della triangolazione, dove ogni nodo rappresenta un triangolo e c'è un arco tra due nodi se i triangoli corrispondenti condividono un lato.</li>
          <li className="mb-1">Troviamo una colorazione a 3 colori del grafo duale.</li>
          <li className="mb-1">Scegliamo il colore con il minor numero di nodi e posizioniamo le guardie nei triangoli corrispondenti.</li>
        </ol>
        <p className="text-lg leading-relaxed mb-4">
          Vediamo un'implementazione semplificata che utilizza la triangolazione e la colorazione a 3 colori:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto"><code className="language-cpp">
{`#include <bits/stdc++.h>
using namespace std;

// Struttura per rappresentare un punto
struct Point {
    double x, y;
    
    Point(double _x = 0, double _y = 0) : x(_x), y(_y) {}
    
    bool operator==(const Point& p) const {
        return fabs(x - p.x) < 1e-9 && fabs(y - p.y) < 1e-9;
    }
};

// Struttura per rappresentare un triangolo
struct Triangle {
    Point a, b, c;
    
    Triangle(Point _a, Point _b, Point _c) : a(_a), b(_b), c(_c) {}
};

// Funzione per verificare se un punto è all'interno di un triangolo
bool isPointInTriangle(const Point& p, const Triangle& t) {
    auto cross = [](const Point& a, const Point& b, const Point& c) -> double {
        return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
    };
    
    double d1 = cross(p, t.a, t.b);
    double d2 = cross(p, t.b, t.c);
    double d3 = cross(p, t.c, t.a);
    
    bool has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
    bool has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0);
    
    return !(has_neg && has_pos);
}

// Funzione per triangolare un poligono semplice
// Nota: questa è una versione semplificata che funziona solo per poligoni convessi
vector<Triangle> triangulatePolygon(const vector<Point>& polygon) {
    int n = polygon.size();
    if (n < 3) return {};
    
    vector<Triangle> triangulation;
    
    // Per un poligono convesso, possiamo triangolare facilmente
    for (int i = 1; i < n - 1; i++) {
        triangulation.push_back(Triangle(polygon[0], polygon[i], polygon[i+1]));
    }
    
    return triangulation;
}

// Funzione per costruire il grafo duale della triangolazione
vector<vector<int>> buildDualGraph(const vector<Triangle>& triangulation) {
    int n = triangulation.size();
    vector<vector<int>> graph(n);
    
    // Due triangoli sono adiacenti se condividono un lato
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            // Verifichiamo se i triangoli i e j condividono un lato
            // Questa è una versione semplificata
            if ((triangulation[i].a == triangulation[j].a && triangulation[i].b == triangulation[j].b) ||
                (triangulation[i].a == triangulation[j].b && triangulation[i].b == triangulation[j].c) ||
                (triangulation[i].a == triangulation[j].c && triangulation[i].b == triangulation[j].a) ||
                (triangulation[i].b == triangulation[j].a && triangulation[i].c == triangulation[j].b) ||
                (triangulation[i].b == triangulation[j].b && triangulation[i].c == triangulation[j].c) ||
                (triangulation[i].b == triangulation[j].c && triangulation[i].c == triangulation[j].a) ||
                (triangulation[i].c == triangulation[j].a && triangulation[i].a == triangulation[j].b) ||
                (triangulation[i].c == triangulation[j].b && triangulation[i].a == triangulation[j].c) ||
                (triangulation[i].c == triangulation[j].c && triangulation[i].a == triangulation[j].a)) {
                graph[i].push_back(j);
                graph[j].push_back(i);
            }
        }
    }
    
    return graph;
}

// Funzione per colorare un grafo con 3 colori
// Nota: questa è una versione semplificata che potrebbe non funzionare per tutti i grafi
vector<int> color3Graph(const vector<vector<int>>& graph) {
    int n = graph.size();
    vector<int> colors(n, -1);
    
    function<bool(int)> dfs = [&](int node) -> bool {
        // Troviamo i colori disponibili
        vector<bool> used(3, false);
        for (int neighbor : graph[node]) {
            if (colors[neighbor] != -1) {
                used[colors[neighbor]] = true;
            }
        }
        
        // Assegniamo il primo colore disponibile
        for (int color = 0; color < 3; color++) {
            if (!used[color]) {
                colors[node] = color;
                
                // Verifichiamo se possiamo colorare il resto del grafo
                bool valid = true;
                for (int neighbor : graph[node]) {
                    if (colors[neighbor] == -1) {
                        if (!dfs(neighbor)) {
                            valid = false;
                            break;
                        }
                    }
                }
                
                if (valid) return true;
                
                // Backtracking
                colors[node] = -1;
            }
        }
        
        return false;
    };
    
    // Iniziamo la colorazione dal nodo 0
    if (n > 0) dfs(0);
    
    return colors;
}

// Funzione principale per risolvere il problema della galleria d'arte
vector<Point> artGalleryProblem(const vector<Point>& polygon) {
    // Trianguliamo il poligono
    vector<Triangle> triangulation = triangulatePolygon(polygon);
    
    // Costruiamo il grafo duale
    vector<vector<int>> dualGraph = buildDualGraph(triangulation);
    
    // Coloriamo il grafo con 3 colori
    vector<int> colors = color3Graph(dualGraph);
    
    // Contiamo il numero di triangoli per ogni colore
    vector<int> colorCount(3, 0);
    for (int color : colors) {
        if (color != -1) {
            colorCount[color]++;
        }
    }
    
    // Troviamo il colore con il minor numero di triangoli
    int minColor = min_element(colorCount.begin(), colorCount.end()) - colorCount.begin();
    
    // Posizioniamo le guardie nei triangoli del colore scelto
    vector<Point> guards;
    for (int i = 0; i < (int)colors.size(); i++) {
        if (colors[i] == minColor) {
            // Posizioniamo la guardia nel centroide del triangolo
            Point guard(
                (triangulation[i].a.x + triangulation[i].b.x + triangulation[i].c.x) / 3,
                (triangulation[i].a.y + triangulation[i].b.y + triangulation[i].c.y) / 3
            );
            guards.push_back(guard);
        }
    }
    
    return guards;
}

// Esempio di utilizzo
int main() {
    // Esempio di un poligono convesso (un esagono)
    vector<Point> polygon = {
        Point(0, 0),
        Point(1, 0),
        Point(2, 1),
        Point(1, 2),
        Point(0, 2),
        Point(-1, 1)
    };
    
    vector<Point> guards = artGalleryProblem(polygon);
    
    cout << "Numero di guardie necessarie: " << guards.size() << endl;
    cout << "Posizioni delle guardie:" << endl;
    for (const auto& guard : guards) {
        cout << "(" << guard.x << ", " << guard.y << ")" << endl;
    }
    
    return 0;
}
`}</code></pre>
        <p className="text-lg leading-relaxed mt-4 mb-2">
          <strong>Complessità:</strong>
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-1">Tempo: O(n log n) per la triangolazione, O(n) per la colorazione</li>
          <li className="mb-1">Spazio: O(n)</li>
        </ul>
        <p className="text-lg leading-relaxed">
          Questa implementazione è una versione semplificata che funziona solo per poligoni convessi. Per poligoni generali, la triangolazione e la costruzione del grafo duale sono più complesse. Inoltre, la colorazione a 3 colori è garantita per grafi planari, ma l'algoritmo di colorazione potrebbe richiedere backtracking.
        </p>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">7. Problemi di Esempio</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed ml-4">
          <li className="mb-2"><a href="https://cses.fi/problemset/task/1740" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">CSES - Intersection Points</a>: Un problema che richiede di contare il numero di intersezioni tra segmenti.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/1000/problem/F" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - One Occurrence</a>: Un problema che può essere risolto con una variante della tecnica Sweep Line.</li>
          <li className="mb-2"><a href="https://codeforces.com/contest/1284/problem/D" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Codeforces - New Year and Conference</a>: Un problema che richiede l'uso della tecnica Sweep Line per verificare sovrapposizioni.</li>
          <li className="mb-2"><a href="https://www.spoj.com/problems/NKMARS/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">SPOJ - Mars Maps</a>: Un problema che richiede di calcolare l'area dell'unione di rettangoli.</li>
        </ul>
      </section>
    </div>
  );
};

export default SweepLineAdvancedPage;
