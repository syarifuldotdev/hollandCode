import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient, User as PrismaUser } from "@prisma/client";
import { type DefaultSession, type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

/**
 * ## Module Augmentation for NextAuth
 *
 * Extends the built-in `Session` and `JWT` types to include your custom fields.
 * This provides type safety for `useSession` on the client and the token on the server.
 */
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

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        tingkatan?: number | null;
        theme?: string | null;
        language?: string | null;
        hollandCodes?: string[];
    }
}

export const authOptions: NextAuthOptions = {
    // Use PrismaAdapter to automatically handle user accounts in the database.
    adapter: PrismaAdapter(prisma),

    // Set the session strategy to JWT for stateless sessions.
    session: { strategy: "jwt" },

    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
    ],

    callbacks: {
        /**
         * Restricts sign-in to users with a "@moe-dl.edu.my" email address.
         */
        async signIn({ user }) {
            if (!user.email?.endsWith("@moe-dl.edu.my")) {
                console.warn("Blocked unauthorized email:", user.email);
                return false; // Block sign-in
            }
            return true; // Allow sign-in
        },

        /**
         * Refreshes the JWT with the latest user data from the database on every session check.
         * This ensures the session is never stale.
         */
        async jwt({ token }) {
            if (!token.sub) {
                return token;
            }

            const dbUser = await prisma.user.findUnique({
                where: { id: token.sub },
            });

            if (!dbUser) {
                return token;
            }

            // Update the token with fresh data from the database
            return {
                id: dbUser.id,
                tingkatan: dbUser.tingkatan,
                theme: dbUser.theme,
                language: dbUser.language,
                hollandCodes: dbUser.hollandCodes,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
                sub: dbUser.id,
                iat: token.iat,
                exp: token.exp,
                jti: token.jti,
            };
        },

        /**
         * Passes the data from the updated token to the client-side session object.
         */
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.tingkatan = token.tingkatan;
                session.user.theme = token.theme;
                session.user.language = token.language;
                session.user.hollandCodes = token.hollandCodes;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
            }
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
};