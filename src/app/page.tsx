export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 dark:text-white">OII Guide</h1>
        <p className="text-xl mb-8 text-center text-gray-600 dark:text-gray-300">
          Benvenuto nel sito di preparazione per le Olimpiadi di Informatica
        </p>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Progetto in fase di configurazione</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Il sito completo sarà disponibile a breve. Stiamo lavorando per offrirti:
          </p>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-4">
            <li>Guide dettagliate per tutti i livelli (Bronze, Silver, Gold, Platinum, Advanced)</li>
            <li>Esercizi pratici con soluzioni commentate</li>
            <li>Simulazioni di contest e valutazione automatica</li>
            <li>Community e forum per la condivisione di conoscenze</li>
          </ul>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Livelli di difficoltà</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Dal livello Bronze per principianti fino al livello Advanced per esperti, troverai contenuti adatti al tuo livello di preparazione.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Contest imminenti</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Presto potrai visualizzare qui i prossimi contest di programmazione competitiva con suggerimenti personalizzati.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
