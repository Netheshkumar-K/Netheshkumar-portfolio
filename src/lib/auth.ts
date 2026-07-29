import { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;

// If DATABASE_URL is somehow missing during build time without it, we shouldn't instantiate the pool.
// But Next.js build might execute this, so we handle it gracefully if missing.
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

// Initialize a single instance of PrismaClient
const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // For first time setup: if no user exists, let's create an admin account on the fly.
        // IN PRODUCTION THIS IS DANGEROUS! Remove this after first login.
        if (!user) {
          const count = await prisma.user.count();
          if (count === 0) {
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const newUser = await prisma.user.create({
              data: {
                email: credentials.email,
                name: "Admin",
                password: hashedPassword,
                role: "ADMIN",
              },
            });
            return { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
          }
          throw new Error("User not found");
        }

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return { id: user.id, name: user.name, email: user.email, role: user.role };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as DefaultSession["user"] & { role?: string }).role = token.role as string | undefined;
      }
      return session;
    },
  },
};
