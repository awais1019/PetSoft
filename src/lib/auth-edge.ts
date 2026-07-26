import { NextAuthConfig } from "next-auth";

export const nextAuthEdgeConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ auth, request }) => {
      // runs on every request with middleware, including Server Action
      // POSTs to non-/api routes - redirects must never be returned for
      // those, since Next.js expects an RSC action-response, not a
      // redirect, and will crash client-side otherwise.
      const isLoggedIn = Boolean(auth?.user);
      const hasAccess = Boolean(auth?.user?.hasAccess);
      const { pathname } = request.nextUrl;
      const isAppRoute = pathname.startsWith("/app");
      const isAuthPage = pathname === "/login" || pathname === "/signup";
      const isGet = request.method === "GET";

      if (isAppRoute) {
        if (!isLoggedIn) return false;
        if (!hasAccess) {
          return isGet
            ? Response.redirect(new URL("/payment", request.nextUrl))
            : true;
        }
        return true;
      }

      if (isLoggedIn && isAuthPage) {
        const target = hasAccess ? "/app/dashboard" : "/payment";
        return isGet
          ? Response.redirect(new URL(target, request.nextUrl))
          : true;
      }

      return true;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        // on sign in
        token.id = user.id;
        token.email = user.email!;
        token.hasAccess = user.hasAccess;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id;
        session.user.hasAccess = token.hasAccess;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
