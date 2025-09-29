import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { getUserbyEmail } from "./server-utils";
import { authSchema } from "./schema";

const config: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      //runs on sign in
      async authorize(credentials) {
        const parsedCredentials = authSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
       
          return null;
        }

        const { email, password } = parsedCredentials.data;

        const user = await getUserbyEmail(email);
        if (!user) {
          console.log("No user found");
          return null;
        }
        const isValid = await bcrypt.compare(password, user.hashedPassword);
        if (!isValid) {
          console.log("Invalid credentials");
          return null;
        }
        return user;
      },
    }),
  ],
  callbacks: {
    //runs on each request
    authorized: ({ request, auth }) => {
      const isAcessingPrivateRoute = request.nextUrl.pathname.includes("/app");
      const isAuthenticated = Boolean(auth?.user);
      if (isAcessingPrivateRoute && isAuthenticated) {
        return true;
      }
      if (isAcessingPrivateRoute && !isAuthenticated) {
        return false;
      }

      if (!isAcessingPrivateRoute && isAuthenticated) {
        return NextResponse.redirect(new URL("/app/dashboard", request.url));
      }
      if (!isAcessingPrivateRoute && !isAuthenticated) {
        return true;
      }
      return false;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },

  session: { strategy: "jwt" },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers } = NextAuth(config);
