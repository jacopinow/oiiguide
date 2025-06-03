import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import AuthProvider from "@/app/components/AuthProvider";
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react'; // Import useSession and signOut

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Competitive Programming Hub",
  description: "Your gateway to mastering competitive programming with C++",
};

// Helper component to manage session-dependent navigation
function AuthNavLinks() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (loading) {
    return <p>Loading...</p>; // Or a spinner component
  }

  return (
    <>
      {session ? (
        <>
          <Link href="/profile" className="mr-4 hover:underline">
            Profilo
          </Link>
          <button onClick={() => signOut({ callbackUrl: '/' })} className="mr-4 hover:underline">
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href="/login" className="mr-4 hover:underline">
            Login
          </Link>
          <Link href="/register" className="hover:underline">
            Registrati
          </Link>
        </>
      )}
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-black dark:text-white`}>
        <AuthProvider>
          <header className="p-4 border-b dark:border-gray-700">
            <nav className="container mx-auto flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold">CP Hub</Link>
              <div>
                <Link href="/learn" className="mr-4 hover:underline">Percorsi</Link>
                <Link href="/problems" className="mr-4 hover:underline">Problemi</Link>
                {/* Altri link: Classifiche, Forum, Contest */}
                {/* AuthNavLinks gestirà i link di login/logout/profilo */}
                <AuthNavLinks /> 
                {/* TODO: Toggle tema dark/light */}
              </div>
            </nav>
          </header>
          <main className="container mx-auto p-4">
            {children}
          </main>
          <footer className="p-4 border-t dark:border-gray-700 text-center">
            <p>&copy; 2025 Competitive Programming Hub. Tutti i diritti riservati.</p>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
