import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb-nextauth";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      console.log("User in session callback", user);
      console.log("Token in session callback: ", token);
      session.token = token;
      return session;
    },
    async jwt({ token, user }) {
      console.log("User: ", user);
      console.log("Token: ", token);
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
    signOut: "/auth",
  },
});
