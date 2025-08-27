import NextAuth, { type NextAuthOptions, type DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient, User as PrismaUser } from "@prisma/client";

const prisma = new PrismaClient();

// This declaration extends the built-in Session type to include your custom fields.
// This is what the client-side `useSession` hook will see.
declare module "next-auth" {
    interface Session {
        user?: {
            id?: string;
            tingkatan?: number | null;
            theme?: string | null;
            language?: string | null;
            hollandCodes?: string[];
        } & DefaultSession["user"];
    }
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
    ],
    callbacks: {
        session({ session, user }) {
            if (session.user) {
                // The 'user' object from the callback has the full user data from the database.
                // We cast it to the PrismaUser type to access the custom fields without TypeScript errors.
                const prismaUser = user as PrismaUser;
                session.user.id = prismaUser.id;
                session.user.tingkatan = prismaUser.tingkatan;
                session.user.theme = prismaUser.theme;
                session.user.language = prismaUser.language;
                session.user.hollandCodes = prismaUser.hollandCodes;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
