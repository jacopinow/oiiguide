"[use client]";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react"; // Aggiunto useState, useEffect
import { FaFire, FaMedal, FaChartLine, FaCodeBranch, FaPlusSquare, FaCalendarCheck } from 'react-icons/fa'; // Esempio di icone

// Dati di esempio per il profilo (da sostituire con dati da API/DB)
const initialUserProfileData = {
  xp: 1250,
  streak: 15, // Giorni di streak
  badges: [
    { id: "b1", name: "Iniziatore C++", icon: FaCodeBranch, description: "Completato il modulo base di C++" },
    { id: "b2", name: "Risolutore Seriale", icon: FaMedal, description: "Risolti 10 problemi di fila" },
    { id: "b3", name: "Mago degli Algoritmi Greedy", icon: FaFire, description: "Maestria negli algoritmi greedy" },
  ],
  // Aggiungere qui heatmap e altre statistiche
};

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [userProfile, setUserProfile] = useState(initialUserProfileData);

  useEffect(() => {
    // In un'applicazione reale, caricheresti i dati del profilo dell'utente da un'API qui
    // setUserProfile(fetchedUserProfileData);
  }, [session]);

  if (status === "loading") {
    return <p className="text-center mt-10">Caricamento...</p>;
  }

  if (!session) {
    redirect("/login");
    return null; 
  }

  // Funzioni per simulare l'aggiornamento di XP e streak (da sostituire con logica backend)
  const handleAddXp = (amount: number) => {
    setUserProfile(prev => ({ ...prev, xp: prev.xp + amount }));
  };

  const handleIncrementStreak = () => {
    setUserProfile(prev => ({ ...prev, streak: prev.streak + 1 }));
  };


  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Profilo Utente</h1>
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-center">
          <div className="md:col-span-1 flex flex-col items-center">
            {/* Placeholder per Avatar */}
            <div className="w-32 h-32 bg-indigo-100 dark:bg-indigo-700 rounded-full flex items-center justify-center text-indigo-500 dark:text-indigo-300 text-5xl font-bold mb-3">
              {session.user?.name?.substring(0,1).toUpperCase() || "U"}
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center">{session.user?.name || "Utente"}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">{session.user?.email || ""}</p>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow text-center md:text-left">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">XP Totali</p>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{userProfile.xp}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start">
                <FaFire className={`mr-2 ${userProfile.streak > 0 ? 'text-red-500' : 'text-gray-400'}`} size={24}/>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Streak Attuale</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{userProfile.streak} giorni</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Pulsanti di simulazione per gamification - SOLO PER TEST */}
        <div className="my-4 p-3 bg-yellow-100 dark:bg-yellow-700 border border-yellow-300 dark:border-yellow-600 rounded-md">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Simulazione Gamification (Test)</h4>
            <div className="flex space-x-2 mt-2">
                <button onClick={() => handleAddXp(50)} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm flex items-center"><FaPlusSquare className="mr-1"/> +50 XP</button>
                <button onClick={handleIncrementStreak} className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm flex items-center"><FaCalendarCheck className="mr-1"/> Incrementa Streak</button>
            </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">I Miei Badge</h3>
          {userProfile.badges.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {userProfile.badges.map(badge => (
                <div key={badge.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow flex items-center space-x-3" title={badge.description}>
                  <badge.icon className="text-indigo-500 dark:text-indigo-400" size={28}/>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{badge.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">Non hai ancora sbloccato nessun badge. Continua a risolvere problemi!</p>
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Attività Recente (Heatmap)</h3>
          {/* Placeholder per la Heatmap (es. stile GitHub) */}
          <div className="bg-gray-50 dark:bg-gray-700 p-10 rounded-lg shadow text-center">
            <FaChartLine size={40} className="mx-auto text-gray-400 dark:text-gray-500 mb-2"/>
            <p className="text-gray-600 dark:text-gray-400">La heatmap delle tue attività verrà visualizzata qui.</p>
          </div>
        </div>
        
        {/* TODO: Aggiungere storico problemi risolti, soluzioni condivise, etc. */}
      </div>
    </div>
  );
}
