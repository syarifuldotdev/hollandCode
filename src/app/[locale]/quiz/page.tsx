// app/[locale]/quiz/page.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Quiz",
}

export default function QuizPage() {
    return (
        <main className="container mx-auto max-w-5xl px-4 py-8">
            

            {/* Inline styles preserved from your snippet, with JSX-safe props */}
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    minHeight: 635,
                }}
                className="rounded-lg border border-border bg-card/50 p-2 my-10"
            >
                <iframe
                    src="https://wayground.com/embed/quiz/6896e73ea8b30a977d5a4ee9"
                    title=" - Wayground"
                    style={{ flex: 1 }}
                    frameBorder={0}
                    allowFullScreen
                    loading="lazy"
                    className="rounded-md bg-background"
                />
            </div>
        </main>
    )
}
