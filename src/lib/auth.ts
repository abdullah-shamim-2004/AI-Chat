import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import { db } from "./db";
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  // logger: {
  //   error(error) {
  //     console.error("[AUTH ERROR]", error);
  //     if (error && typeof error === "object" && "cause" in error) {
  //       console.error("[AUTH CAUSE]", error.cause);
  //     }
  //   },
  //   warn(code) {
  //     console.warn("[AUTH WARN]", code);
  //   },
  // },
  // debug: true,
});
