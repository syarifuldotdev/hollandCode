// app/visitor/page.tsx
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const revalidate = 0; // always fetch fresh count (optional)

export default async function VisitorPage() {
    const cookieStore = await cookies();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        cookieStore.set(name, value, options);
                    });
                },
            },
        }
    );

    const { count, error } = await supabase
        .from('visitors')
        .select('*', { count: 'exact', head: true });

    if (error) {
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
