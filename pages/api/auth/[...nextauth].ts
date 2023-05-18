import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../lib/prisma";
import { compare } from "bcrypt";
import Stripe from 'stripe';


export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {},
      // @ts-ignore
      async authorize(credentials, _) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!email || !password) {
          throw new Error("Missing username or password");
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(password, user.password))) {
          throw new Error("Invalid username or password");
        }
        return user;
      },
    }),
  ],
  session: { strategy: "jwt" },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({
      token, user, account,
    }) {
      // if Local
      if (user) {
        token.accessToken = user;
        token.user = user;
      }
      // if from github provider
      return token;
    },


    async session({ session, token }) {
      //session.accessToken = token?.accessToken;
      session.user = token.user;
      return session;
    },
  },

  pages: {
    signIn: '/auth/signin',
  },

});




