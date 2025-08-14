// app/[locale]/quiz/page.tsx
import JoinWaygroundByCode from "@/components/wayground/join-form";

export default function QuizPage() {
    return (
        <main
            className="
        w-full h-screen
        overflow-y-scroll
        snap-y snap-mandatory
      "
        >
            {/* Screen 1: Join by Code */}
            <section className="min-h-screen flex items-center justify-center px-4 bg-background snap-start">
                <div className="w-full max-w-md rounded-lg border border-border bg-card/50 p-6">
                    <JoinWaygroundByCode />
                </div>
            </section>

            {/* Screen 2: Quiz Embed */}
            <section className="flex justify-center px-4 py-8 bg-background min-h-screen snap-start">
                <div
                    className="
            flex flex-col gap-2
            min-h-[90vh] w-[90vw]
            rounded-lg border border-border
            bg-card/50 p-2 my-10
          "
                >
                    <iframe
                        src="https://wayground.com/embed/quiz/6896e73ea8b30a977d5a4ee9"
                        title="Quiz - Wayground"
                        frameBorder={0}
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full rounded-md bg-background"
                    />
                </div>
            </section>
        </main>
    );
}
