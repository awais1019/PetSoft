import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserbyEmail } from "./server-utils";
import { authSchema } from "./schema";
import prisma from "./prisma";

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
      if (isAcessingPrivateRoute && isAuthenticated && auth?.user?.hasAccess) {
        return true;
      }
      if (isAcessingPrivateRoute && isAuthenticated && !auth?.user?.hasAccess) {
        return Response.redirect(new URL("/payment", request.url));
      }
      if (isAcessingPrivateRoute && !isAuthenticated) {
        return false;
      }

      if (
        isAuthenticated &&
        (request.nextUrl.pathname.includes("/login") ||
          request.nextUrl.pathname.includes("/signup")) &&
        auth?.user.hasAccess
      ) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }

      if (isAuthenticated && !isAcessingPrivateRoute && !auth?.user.hasAccess) {
        if (
          request.nextUrl.pathname.includes("/login") ||
          request.nextUrl.pathname.includes("/signup")
        ) {
          return Response.redirect(new URL("/payment", request.nextUrl));
        }

        return true;
      }
      if (!isAcessingPrivateRoute && !isAuthenticated) {
        return true;
      }
      return false;
    },
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        token.id = user.id;
        token.hasAccess = user.hasAccess;
      }
      if (trigger === "update") {
        // on every request
        const userFromDb = await prisma.user.findUnique({
          where: {
            email: token.email!,
          },
        });
        if (userFromDb) {
          token.hasAccess = userFromDb.hasAccess;
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id;
        session.user.hasAccess = token.hasAccess;
      }
      return session;
    },
  },

  session: { strategy: "jwt" },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers } = NextAuth(config);
