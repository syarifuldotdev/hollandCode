// src/app/api/selections/route.ts
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json() as { types: string[] };
    // TODO: validate and persist to DB by session.user.email (or id)

    return NextResponse.json({ ok: true });
}