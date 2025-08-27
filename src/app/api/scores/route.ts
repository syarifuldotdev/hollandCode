// src/lib/prisma.ts or a similar shared location
import { PrismaClient } from "@prisma/client";

// This is a global variable that is not affected by Next.js hot reload
// It ensures only one instance of the PrismaClient is created.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ["query", "info", "warn", "error"],
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

// src/app/api/scores/route.ts
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

interface ScoreRequestBody {
    score: number;
    quizId: string;
}

/**
 * Handles the POST request to save a new score.
 * It first checks for user authentication and then validates the request body.
 * If valid, it creates a new score entry in the database.
 * @param req The incoming Request object.
 * @returns A NextResponse object with the newly created score or an error message.
 */
export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { score, quizId } = (await req.json()) as ScoreRequestBody;

        if (typeof score !== 'number' || !quizId) {
            return NextResponse.json({ message: "Invalid score or quizId" }, { status: 400 });
        }

        // Use the imported singleton Prisma instance
        const newScore = await prisma.score.create({
            data: {
                score,
                quizId,
                userId: session.user.id,
            },
        });

        return NextResponse.json(newScore, { status: 201 });
    } catch (error) {
        console.error("Failed to save score:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
