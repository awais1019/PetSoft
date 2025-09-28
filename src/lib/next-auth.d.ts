// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;   
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
