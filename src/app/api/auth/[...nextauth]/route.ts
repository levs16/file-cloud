import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { v4 as uuidv4 } from "uuid";

// Only allow a single hardcoded account
const singleUser = {
  id: "1",
  name: "Personal User",
  username: "admin",
  email: "admin@personalcloud.com",
  password: "secure123", // In a real app, this would be hashed
  storageLimit: 50 * 1024 * 1024 * 1024, // 50GB in bytes
  storageUsed: 0, // Start with 0 bytes used
};

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        
        // Only allow the single hardcoded account
        const isValidUser = 
          credentials.username === singleUser.username && 
          credentials.password === singleUser.password;
        
        if (isValidUser) {
          return {
            id: singleUser.id,
            name: singleUser.name,
            username: singleUser.username,
            email: singleUser.email,
            storageLimit: singleUser.storageLimit,
            storageUsed: singleUser.storageUsed,
          };
        }
        
        // No other accounts allowed
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.storageLimit = user.storageLimit;
        token.storageUsed = user.storageUsed;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.storageLimit = token.storageLimit as number;
        session.user.storageUsed = token.storageUsed as number;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST }; 