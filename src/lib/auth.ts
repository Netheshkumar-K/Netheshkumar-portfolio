import { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";
import path from "path";

// libsql requires an absolute file: URL for local SQLite files
const dbUrl = process.env.DATABASE_URL?.startsWith("file:")
  ? `file:${path.resolve(process.cwd(), process.env.DATABASE_URL.replace(/^file:/, ""))}`
  : `file:${path.resolve(process.cwd(), "dev.db")}`;

const adapter = new PrismaLibSql({
  url: dbUrl,
});

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

        // Support login by email OR username (name field)
        let user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // If not found by email, try matching name (username login)
        if (!user) {
          user = await prisma.user.findFirst({
            where: { name: credentials.email },
          });
        }

        // Bootstrap: if no user at all, create first admin
        if (!user) {
          const count = await prisma.user.count();
          if (count === 0) {
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const newUser = await prisma.user.create({
              data: {
                email: credentials.email,
                name: credentials.email,
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
