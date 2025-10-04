import NextAuth from "next-auth"; 
import { nextAuthEdgeConfig } from "./lib/auth-edge";

export const { auth } = NextAuth(nextAuthEdgeConfig);

export default auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
