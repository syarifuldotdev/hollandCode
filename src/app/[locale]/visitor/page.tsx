
// app/visitor/page.tsx

import { createSupabaseServerClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function VisitorPage() {
    const supabase = await createSupabaseServerClient();

    const { count, error } = await supabase
        .from("visitors")
        .select("*", { count: "exact", head: true });

    if (error) {
        console.error("Supabase error:", error);
        return (
            <main className="min-h-screen flex items-center justify-center">
                <p className="text-2xl" role="alert">Error: {error.message}</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center">
            <div className="text-[18vw] leading-none font-black tracking-tight tabular-nums">
                {count ?? 0}
            </div>
            <p className="mt-4 text-sm text-zinc-400">visitors</p>
        </main>
    );
}
