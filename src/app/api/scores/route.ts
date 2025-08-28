// src/app/api/scores/route.ts
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

        if (typeof score !== "number" || !quizId) {
            return NextResponse.json({ message: "Invalid score or quizId" }, { status: 400 });
        }

        const savedScore = await prisma.score.upsert({
            where: {
                userId_quizId: {
                    userId: session.user.id,
                    quizId,
                },
            },
            update: {
                score,
                userName: session.user.name ?? null, // 🆕 capture name
            },
            create: {
                score,
                quizId,
                userId: session.user.id,
                userName: session.user.name ?? null, // 🆕 capture name
            },
        });

        return NextResponse.json(savedScore, { status: 200 });
    } catch (error) {
        console.error("Failed to save score:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
