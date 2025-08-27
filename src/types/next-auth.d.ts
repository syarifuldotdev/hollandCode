import { type DefaultSession } from "next-auth";

// This declaration extends the built-in NextAuth types to include your custom fields.
// By placing it in this file, TypeScript will automatically recognize it across your project.
declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user?: {
            id?: string;
            tingkatan?: number | null;
            theme?: string | null;
            language?: string | null;
            hollandCodes?: string[];
        } & DefaultSession["user"];
    }

    // This extends the default User type that is returned in the session callback
    interface User {
        tingkatan?: number | null;
        theme?: string | null;
        language?: string | null;
        hollandCodes?: string[];
    }
}
