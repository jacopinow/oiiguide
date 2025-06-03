"[use client]";

import { useState } from "react";
import Editor from "@monaco-editor/react";

// TODO: Definire una struttura dati più completa per i problemi, includendo descrizione, vincoli, esempi, test case, ecc.
const exampleProblemDetails = {
  "example-problem-1": {
    title: "Somma di Due Numeri",
    description: "Dati due interi a e b, calcola la loro somma.",
    constraints: "-10^9 <= a, b <= 10^9",
    examples: [
      { input: "a = 2, b = 3", output: "5" },
      { input: "a = -1, b = 1", output: "0" },
    ],
    defaultCode: "#include <iostream>\n\nint main() {\n    int a, b;\n    std::cin >> a >> b;\n    // Scrivi qui la tua soluzione\n    std::cout << a + b << std::endl;\n    return 0;\n}"
  },
  "another-problem": {
    title: "Controllo Parità",
    description: "Dato un intero n, determina se è pari o dispari.",
    constraints: "1 <= n <= 10^9",
    examples: [
      { input: "n = 2", output: "Pari" },
      { input: "n = 3", output: "Dispari" },
    ],
    defaultCode: "#include <iostream>\n#include <string>\n\nint main() {\n    int n;\n    std::cin >> n;\n    if (n % 2 == 0) {\n        std::cout << \"Pari\" << std::endl;\n    } else {\n        std::cout << \"Dispari\" << std::endl;\n    }\n    return 0;\n}"
  }
};

type Props = {
  params: { problemId: string };
};

export default function ProblemPage({ params }: Props) {
  const problemId = decodeURIComponent(params.problemId);
  const problem = exampleProblemDetails[problemId as keyof typeof exampleProblemDetails] || 
                  { title: "Problema non Trovato", description: "", constraints: "", examples: [], defaultCode: "// Problema non trovato" };

  const [code, setCode] = useState(problem.defaultCode);
  const [output, setOutput] = useState(""); // Per l'output della sottomissione (simulato)

  function handleEditorChange(value: string | undefined) {
    setCode(value || "");
  }

  const handleSubmitCode = () => {
    // In un'applicazione reale, questo invierebbe il codice a un backend per la valutazione
    // Qui simuliamo un output basato sul codice (molto semplificato)
    console.log("Codice inviato:", code);
    if (problemId === "example-problem-1" && code.includes("a + b")) {
      setOutput("Simulazione: Test case superati! Risultato corretto.");
    } else if (problemId === "another-problem" && code.includes("n % 2 == 0")) {
        setOutput("Simulazione: Test case superati! Risultato corretto.");
    } else if (problem.title === "Problema non Trovato") {
        setOutput("Impossibile eseguire: problema non trovato.");
    }else {
      setOutput("Simulazione: Errore di compilazione o logica errata.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">{problem.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Colonna Sinistra: Descrizione Problema */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300">Descrizione del Problema</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 whitespace-pre-line">
            {problem.description || "Nessuna descrizione disponibile."}
          </p>
          
          {problem.constraints && (
            <>
              <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Vincoli</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                {problem.constraints}
              </p>
            </>
          )}

          {problem.examples && problem.examples.length > 0 && (
            <>
              <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Esempi</h3>
              {problem.examples.map((example, index) => (
                <div key={index} className="mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Input:</p>
                  <pre className="text-sm text-gray-800 dark:text-gray-200 font-mono bg-gray-100 dark:bg-gray-600 p-2 rounded mt-1">{example.input}</pre>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-2">Output:</p>
                  <pre className="text-sm text-gray-800 dark:text-gray-200 font-mono bg-gray-100 dark:bg-gray-600 p-2 rounded mt-1">{example.output}</pre>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Colonna Destra: Editor e Output */}
        <div className="flex flex-col">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden flex-grow">
            <Editor
              height="50vh" // Altezza dell'editor
              defaultLanguage="cpp"
              defaultValue={code}
              onChange={handleEditorChange}
              theme={document.documentElement.classList.contains('dark') ? "vs-dark" : "light"} // Tema dinamico
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
          <button 
            onClick={handleSubmitCode}
            className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Invia Soluzione
          </button>
          {output && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow">
              <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">Output Sottomissione:</h3>
              <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{output}</pre>
            </div>
          )}
        </div>
      </div>
      {/* TODO: Aggiungere sezione soluzioni, discussioni, ecc. */}
    </div>
  );
}
