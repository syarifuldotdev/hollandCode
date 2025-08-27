// src/lib/auth.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async signIn({ user }) {
            if (!user.email?.endsWith("@moe-dl.edu.my")) {
                console.warn("Blocked unauthorized email:", user.email);
                return false;
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id ?? token.sub;
                token.picture = user.image ?? token.picture;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub;
                session.user.image = token.picture as string;
            }
            return session;
        },
    },
};