import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma"; // Correctly import the singleton Prisma client

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
