// src/app/[locale]/wheel/page.tsx
"use client";

import colorMap, { ValidKey } from "@/app/constants/colorMap";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import stemJobs, { StemJob } from "@/data/stemJobs";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

type SelectedTypes = ValidKey[];
const STORAGE_KEY = "hollandSelections";
const KEYS: ValidKey[] = ["R", "I", "A", "S", "E", "K"];

const hexByType: Record<ValidKey, string> = {
    R: "#ef4444",
    I: "#3b82f6",
    A: "#a855f7",
    S: "#22c55e",
    E: "#eab308",
    K: "#14b8a6",
};

export default function WheelPage() {
    const t = useTranslations("wheel");
    const tTypes = useTranslations("types");
    const locale = useLocale();
    const { data: session, status } = useSession();

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const wheelRef = useRef<HTMLDivElement | null>(null);

    const [rotation, setRotation] = useState(0);
    const [spinning, setSpinning] = useState(false);
    const [open, setOpen] = useState(false);
    const [result, setResult] = useState<StemJob | null>(null);
    const [selectedTypes, setSelectedTypes] = useState<SelectedTypes>([]);
    const [jobs, setJobs] = useState<StemJob[]>(() => stemJobs);

    const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    useEffect(() => {
        if (status === 'loading') {
            return;
        }

        let loadedCodes: string[] = [];

        if (status === 'authenticated') {
            // FIX: Safely access hollandCodes with `?.` and provide an empty array `[]` as a
            // fallback using the nullish coalescing operator `??` to prevent type errors.
            loadedCodes = session?.user?.hollandCodes ?? [];
        } else if (status === 'unauthenticated') {
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved) {
                    const parsed = JSON.parse(saved);
                    if (Array.isArray(parsed)) {
                        loadedCodes = parsed;
                    }
                }
            } catch {
                // Ignore parse errors, loadedCodes remains []
            }
        }

        if (loadedCodes.length > 0) {
            const valid = loadedCodes.filter((x: string): x is ValidKey =>
                KEYS.includes(x as ValidKey)
            );
            setSelectedTypes(valid.slice(0, 3));
        }
    }, [status, session]);


    const n = jobs.length;
    const anglePer = useMemo(() => (n > 0 ? 360 / n : 0), [n]);

    // --- The rest of the component remains the same ---
    useEffect(() => {
        const canvas = canvasRef.current;
        const parent = wheelRef.current;
        if (!canvas || !parent || n === 0) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        const resizeAndDraw = () => {
            const cssWidth = parent.clientWidth || parent.offsetWidth || 0;
            const cssHeight = parent.clientHeight || parent.offsetHeight || 0;
            const cssSize = Math.max(1, cssHeight > 0 ? Math.min(cssWidth, cssHeight) : cssWidth);
            const radius = cssSize / 2;

            const backingWidth = Math.max(1, Math.floor(cssSize * dpr));
            const backingHeight = Math.max(1, Math.floor(cssSize * dpr));
            if (canvas.width !== backingWidth || canvas.height !== backingHeight) {
                canvas.width = backingWidth;
                canvas.height = backingHeight;
            }

            canvas.style.width = `${Math.floor(cssSize)}px`;
            canvas.style.height = `${Math.floor(cssSize)}px`;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            ctx.resetTransform();
            ctx.scale(dpr, dpr);
            ctx.clearRect(0, 0, cssSize, cssSize);
            ctx.translate(radius, radius);

            const startOffset = -Math.PI / 2;

            for (let i = 0; i < n; i++) {
                const start = startOffset + (i * 2 * Math.PI) / n;
                const end = startOffset + ((i + 1) * 2 * Math.PI) / n;
                const code = jobs[i].hollandCodes?.[0] as ValidKey | undefined;
                const fill = (code && hexByType[code]) || "#9ca3af";

                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.arc(0, 0, radius, start, end);
                ctx.closePath();
                ctx.fillStyle = fill;
                ctx.fill();

                ctx.save();
                ctx.strokeStyle = "rgba(0,0,0,0.12)";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(radius * Math.cos(start), radius * Math.sin(start));
                ctx.stroke();
                ctx.restore();
            }

            ctx.save();
            ctx.strokeStyle = "rgba(0,0,0,0.15)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(0, 0, radius - 0.5, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.restore();

            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.08, 0, 2 * Math.PI);
            ctx.fillStyle = "#111827";
            ctx.fill();
        };

        resizeAndDraw();

        const observer = new ResizeObserver(resizeAndDraw);
        observer.observe(parent);
        window.addEventListener("resize", resizeAndDraw);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", resizeAndDraw);
        };
    }, [jobs, n]);

    const onSpin = () => {
        if (spinning || n === 0) return;
        setSpinning(true);

        const targetIndex = Math.floor(Math.random() * n);
        const spins = prefersReducedMotion ? 0 : 4 + Math.floor(Math.random() * 3);
        const duration = prefersReducedMotion ? 300 : 3200;

        const final = spins * 360 - (targetIndex + 0.5) * anglePer;
        const wheelEl = wheelRef.current;
        if (!wheelEl) return;

        wheelEl.style.transition = `transform ${duration}ms cubic-bezier(0.22, 0.61, 0.36, 1)`;
        void wheelEl.offsetWidth;
        setRotation(final);

        const handleEnd = () => {
            wheelEl.removeEventListener("transitionend", handleEnd);
            wheelEl.style.transition = "";

            const normalized = ((final % 360) + 360) % 360;
            setRotation(normalized);

            const picked = jobs[targetIndex];
            setResult(picked);
            setOpen(true);
            setSpinning(false);
        };

        wheelEl.addEventListener("transitionend", handleEnd);
    };

    const matchCount = useMemo(() => {
        if (!result || selectedTypes.length === 0) return 0;
        const set = new Set(selectedTypes);
        return result.hollandCodes.reduce(
            (acc, c) => acc + (set.has(c as ValidKey) ? 1 : 0),
            0
        );
    }, [result, selectedTypes]);

    return (
        <div className="min-h-screen overflow-x-hidden bg-background text-black dark:text-white transition-colors">
            <div aria-live="polite" className="sr-only">
                {open && result ? result.title[locale as "en" | "ms"] : ""}
            </div>

            <section className="flex flex-col items-center justify-center gap-3 px-4 py-12 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-primary">{t("wheelTitle")}</h1>
                <p className="text-muted-foreground">{t("wheelTips")}</p>
                {selectedTypes.length === 3 && (
                    <p className="text-sm text-muted-foreground">
                        {t("savedType")}{" "}
                        <span className="font-semibold">{selectedTypes.join(" ")}</span>
                    </p>
                )}
            </section>

            <section className="flex flex-col items-center gap-6">
                <div className="relative flex justify-center items-center">
                    <div
                        aria-hidden
                        className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
                    >
                        <div className="w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-rose-500 drop-shadow" />
                    </div>

                    <div
                        ref={wheelRef}
                        style={{ transform: `rotate(${rotation}deg)` }}
                        className="mx-auto aspect-square w-[clamp(330px,60vmin,660px)] rounded-full shadow-2xl will-change-transform"
                    >
                        <canvas
                            ref={canvasRef}
                            className="w-full h-full rounded-full bg-muted"
                            aria-label={t("wheelTitle")}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        onClick={onSpin}
                        disabled={spinning || n === 0}
                        aria-busy={spinning}
                        className={spinning ? "opacity-60 cursor-not-allowed" : ""}
                    >
                        {spinning ? t("spinning") : t("spin")}
                    </Button>

                    <Button
                        variant="secondary"
                        disabled={spinning}
                        onClick={() => {
                            if (spinning) return;
                            setJobs((prev) => {
                                const copy = [...prev];
                                for (let i = copy.length - 1; i > 0; i--) {
                                    const j = Math.floor(Math.random() * (i + 1));
                                    [copy[i], copy[j]] = [copy[j], copy[i]];
                                }
                                return copy;
                            });
                            toast.success(t("shuffleSuccess"));
                        }}
                    >
                        {t("shuffle")}
                    </Button>
                </div>
            </section>

            {open && result && (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)] max-w-[640px] max-h-[88svh] p-4 sm:p-6 rounded-2xl shadow-2xl bg-background text-black dark:text-white transition-colors overflow-hidden">
                        <DialogHeader>
                            <DialogTitle className="text-xl sm:text-3xl font-semibold text-center">
                                {result.title[locale as "en" | "ms"]}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="overflow-y-auto max-h-[calc(88svh-7rem)] sm:max-h-[calc(90vh-8rem)] space-y-6">
                            <p className="leading-relaxed text-base sm:text-lg">
                                {result.description[locale as "en" | "ms"]}
                            </p>

                            <div className="space-y-3">
                                <h3 className="font-semibold">{t("suitableCodes")}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {result.hollandCodes.map((code) => {
                                        const c = code as ValidKey;
                                        const cls = colorMap[c];
                                        const label = tTypes(`${c}.label`);
                                        return (
                                            <span
                                                key={c}
                                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm text-white ${cls?.base ?? "bg-gray-500"}`}
                                                title={label}
                                            >
                                                <strong>{c}</strong>
                                                <span className="opacity-90">{label}</span>
                                            </span>
                                        );
                                    })}
                                </div>

                                {selectedTypes.length === 3 && (
                                    <p className="text-sm text-muted-foreground">
                                        {t("matchLabel")} ({selectedTypes.join(" ")}):{" "}
                                        <span className="font-semibold">{matchCount}/3</span>
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                                <Button autoFocus onClick={() => setOpen(false)}>
                                    {t("close")}
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        const query = encodeURIComponent(result.title[locale as "en" | "ms"]);
                                        const hl = typeof locale === "string" ? `&hl=${encodeURIComponent(locale)}` : "";
                                        window.open(`https://www.google.com/search?q=${query}${hl}`, "_blank", "noopener");
                                    }}
                                >
                                    {t("searchOnGoogle")}
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            <section className="w-full px-4 sm:px-6 lg:px-8 mt-10 mb-10 flex justify-center">
                <div className="w-full max-w-6xl">
                    <h2 className="text-2xl sm:text-4xl font-semibold mb-4 text-center">
                        {t("jobListTitle")}
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-sm">
                        {jobs.map((job) => (
                            <li key={job.id} className="p-0">
                                <button
                                    onClick={() => {
                                        setResult(job);
                                        setOpen(true);
                                    }}
                                    className="w-full text-left p-4 hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded-lg border border-border"
                                >
                                    <span className="block font-medium text-base">
                                        {job.title[locale as "en" | "ms"]}
                                    </span>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {job.hollandCodes.map((code) => {
                                            const c = code as ValidKey;
                                            return (
                                                <span
                                                    key={`${job.id}-${c}`}
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs text-white ${colorMap[c]?.base ?? "bg-gray-500"}`}
                                                    title={tTypes(`${c}.label`)}
                                                >
                                                    {c}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
}