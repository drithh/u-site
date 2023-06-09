import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import { z } from "zod";
import bcrypt from "bcryptjs";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id?: string;
      organizationId?: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      return Promise.resolve(url.startsWith(baseUrl) ? url : baseUrl);
    },
    jwt: ({ token }) => {
      return token;
    },
    session: async ({ session }) => {
      const userData = await prisma.user.findFirst({
        where: {
          email: session?.user?.email,
        },
      });
      return {
        ...session,
        user: {
          id: userData?.id,
          ...session.user,
          organizationId: userData?.organizationId,
        },
      };
    },
  },
  pages: {
    signIn: "",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Input");
        }

        // use zod to validate credentials
        const { email, password } = credentials;
        const schema = z.object({
          email: z.string().min(3).max(20),
          password: z.string().min(8).max(100),
        });

        try {
          schema.parse({ email, password });
        } catch (error) {
          throw new Error("Invalid Input");
        }
        // Add logic here to look up the user from the credentials supplied
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });
        if (user && user.password) {
          // validate password
          const isValid = bcrypt.compareSync(
            credentials.password,
            user.password
          );
          if (!isValid) {
            throw new Error("Password is incorrect");
          }

          return user;
        } else {
          throw new Error("User not found");
        }
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Google provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  secret: env.NEXTAUTH_SECRET,
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
