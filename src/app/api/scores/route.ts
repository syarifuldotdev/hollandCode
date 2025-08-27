import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface ScoreRequestBody {
    score: number;
    quizId: string;
}

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
