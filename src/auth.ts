import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prismadb";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      credentials: {
        email: { label: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
            throw new Error("Invalid Credentials");
        }
        const user = await prisma.user.findUnique({
            where: {
                email: credentials.email as string,
            },
        });
        if (!user || !user.hashedPassword) {
            throw new Error("User does not exist with this email or may be password");
        }
        const isCorrectPassword = await bcrypt.compare(
            credentials.password as string,
            user.hashedPassword
        );
        if (!isCorrectPassword) {
            throw new Error("Your password does not matched");
        }
    
        return user; // Return the authenticated user
    }
    }),
  ],
  session:{
    strategy:"jwt"
  },
  pages:{
    signIn:'/'
  },
  secret:process.env.AUTH_SECRET
});
