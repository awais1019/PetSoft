// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
       hasAccess: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    hasAccess: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    hasAccess: boolean;
  }
}
