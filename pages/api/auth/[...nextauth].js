import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // TEMPORARY LOCAL AUTH
        if (
          credentials.username === "admin" &&
          credentials.password === "admin123"
        ) {
          return {
            id: 1,
            username: "admin",
            firstName: "Admin",
            lastName: "User",
            token: "dummy-token-123", // any string
          };
        }
        throw new Error("Invalid credentials");
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.user = {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
});
