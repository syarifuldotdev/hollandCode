import { getServerSession } from "next-auth/next";
import { PrismaClient, User } from "@prisma/client";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

// Define a type for the expected properties in the request body
type UserProfileUpdateData = Partial<Pick<User, "tingkatan" | "theme" | "language" | "hollandCodes">>;

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body: UserProfileUpdateData = await req.json();

        if (Object.keys(body).length === 0) {
            return NextResponse.json({ message: "No update data provided" }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: body,
        });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.error("Failed to update user profile:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
