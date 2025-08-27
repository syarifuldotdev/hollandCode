

// app/[locale]/quiz/page.tsx
"use client";

import TingkatanSelectionModal from "@/components/TingkatanSelectionModal";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";

// Mapping of Tingkatan to the specific Wayground embed URL
// IMPORTANT: Replace these with your actual quiz IDs
const quizEmbedUrls = {
    1: "https://wayground.com/embed/quiz/68aefc6da6c54548be3ea38a?memes=false&repeat=false&redemption=false",
    2: "https://wayground.com/embed/quiz/68af05d277706a135844a3c3?memes=false&repeat=false&redemption=false",
    3: "https://wayground.com/embed/quiz/68af0618cc98bbca8fa0051f?memes=false&repeat=false&redemption=false",
    4: "https://wayground.com/embed/quiz/68af0655d333669aeca6a857?memes=false&repeat=false&redemption=false",
    5: "https://wayground.com/embed/quiz/68af06906cff7773edc14f19?memes=false&repeat=false&redemption=false",
};

export default function QuizPage() {
    const t = useTranslations("common");
    const locale = useLocale();
    const { data: session, status } = useSession();

    const callbackUrl = `/${locale}/quiz`;

    const quizUrl = useMemo(() => {
        const tingkatan = session?.user?.tingkatan;
        if (tingkatan && quizEmbedUrls[tingkatan as keyof typeof quizEmbedUrls]) {
            return quizEmbedUrls[tingkatan as keyof typeof quizEmbedUrls];
        }
        return null;
    }, [session]);

    // This effect listens for messages from the iframe to save the score
    useEffect(() => {
        const handleMessage = async (event: MessageEvent) => {
            // Security: Ensure the message is from a trusted origin
            if (event.origin !== "https://wayground.com") return;

            const { type, score, quizId } = event.data;

            if (type === "QUIZ_COMPLETE" && typeof score === "number" && quizId) {
                try {
                    await fetch('/api/scores', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ score, quizId }),
                    });
                    toast.success(t("scoreSavedSuccess"));
                } catch (error) {
                    console.error("Error saving score:", error);
                    toast.error(t("scoreSavedError"));
                }
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [t]);

    if (status === "loading") {
        return <div className="flex items-center justify-center min-h-screen"><p>{t("loading")}</p></div>;
    }

    if (status === "unauthenticated") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center">
                <div className="w-full max-w-sm">
                    <h1 className="text-2xl font-semibold mb-2">{t("pleaseSignIn")}</h1>
                    <p className="text-muted-foreground mb-6">{t("signInRequired")}</p>
                    <div className="flex flex-col gap-3">
                        <Button onClick={() => signIn("google", { callbackUrl })}>{t("continueWith")} Google</Button>
                        {/* <Button variant="outline" onClick={() => signIn(undefined, { callbackUrl })}>{t("otherOptions")}</Button> */}
                    </div>
                </div>
            </div>
        );
    }

    // If authenticated but Tingkatan is not set, the modal will render and handle it.
    if (!session?.user?.tingkatan) {
        return <TingkatanSelectionModal />;
    }

    if (!quizUrl) {
        return <div className="flex items-center justify-center min-h-screen"><p>{t("quizNotFound")}</p></div>;
    }

    return (
        <main className="w-full h-screen overflow-y-scroll">
            <section className="flex justify-center px-4 py-8 bg-background min-h-screen">
                <div className="flex flex-col gap-2 min-h-[90vh] w-[90vw] rounded-lg border border-border bg-card/50 p-2 my-10">
                    <iframe
                        src={quizUrl}
                        title="Quiz - Wayground"
                        frameBorder={0}
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full rounded-md bg-background"
                    />
                </div>
            </section>
            {/* <section className="min-h-screen flex items-center justify-center px-4 bg-background snap-start">
                <div className="w-full max-w-md rounded-lg border border-border bg-card/50 p-6">
                    <JoinWaygroundByCode />
                </div>
            </section> */}
        </main>
    );
}
