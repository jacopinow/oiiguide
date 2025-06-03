import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// Importa qui altri provider se necessario (es. GoogleProvider, GitHubProvider)

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify whatever fields you expect to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // Questo è solo un esempio, dovrai implementare la logica di verifica delle credenziali
        // con il tuo database.
        console.log("Attempting to authorize:", credentials);
        if (credentials && credentials.email === "user@example.com" && credentials.password === "password") {
          // Any object returned will be saved in `user` property of the JWT
          console.log("Authorization successful");
          return { id: "1", name: "Test User", email: "user@example.com" };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          console.log("Authorization failed");
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    // ...add more providers here
  ],
  // Aggiungi qui altre configurazioni di NextAuth (es. pages, callbacks, jwt, session)
  pages: {
    signIn: "/login", // Specifica la tua pagina di login personalizzata
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (Used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET, // Assicurati di avere NEXTAUTH_SECRET nel tuo .env.local
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

