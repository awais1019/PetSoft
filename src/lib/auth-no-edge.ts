import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserbyEmail } from "./server-utils";
import { authSchema } from "./schema";
import { nextAuthEdgeConfig } from "./auth-edge";


const config: NextAuthConfig = {
  ...nextAuthEdgeConfig,
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
 
} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers } = NextAuth(config);
