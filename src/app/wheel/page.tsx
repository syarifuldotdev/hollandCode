// app/wheel/page.tsx
"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import stemJobs, { StemJob, ValidKey } from "@/data/stemJobs"
import colorMap from "../colorMap"
import { useTranslation } from "@/hooks/useTranslation"

type SelectedTypes = ValidKey[]

const STORAGE_KEY = "selectedTypes"

// Tailwind 500 hex values to match your colorMap classes
const hexByType: Record<ValidKey, string> = {
    R: "#ef4444", // red-500
    I: "#3b82f6", // blue-500
    A: "#a855f7", // purple-500
    S: "#22c55e", // green-500
    E: "#eab308", // yellow-500
    K: "#14b8a6", // teal-500
}

export default function WheelPage() {
    const t = useTranslation()
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [rotation, setRotation] = useState(0) // degrees
    const [spinning, setSpinning] = useState(false)
    const [open, setOpen] = useState(false)
    const [result, setResult] = useState<StemJob | null>(null)
    const [selectedTypes, setSelectedTypes] = useState<SelectedTypes>([])
    const [jobs, setJobs] = useState<StemJob[]>(() => stemJobs) // you can later allow filtering/slicing

    // Load user's 3-letter type if they used the main page


    useEffect(() => {
        const lockScroll = (e: TouchEvent | WheelEvent) => e.preventDefault()

        if (spinning) {
            document.body.style.overflow = "hidden"
            document.body.style.touchAction = "none"

            window.addEventListener("touchmove", lockScroll, { passive: false })
            window.addEventListener("wheel", lockScroll, { passive: false })
        } else {
            document.body.style.overflow = ""
            document.body.style.touchAction = ""

            window.removeEventListener("touchmove", lockScroll)
            window.removeEventListener("wheel", lockScroll)
        }

        return () => {
            document.body.style.overflow = ""
            document.body.style.touchAction = ""

            window.removeEventListener("touchmove", lockScroll)
            window.removeEventListener("wheel", lockScroll)
        }
    }, [spinning])


    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY)
            if (!saved) return
            const parsed = JSON.parse(saved)
            if (Array.isArray(parsed)) {
                const valid = parsed.filter((x: string): x is ValidKey =>
                    ["R", "I", "A", "S", "E", "K"].includes(x)
                )
                setSelectedTypes(valid.slice(0, 3))
            }
        } catch { }
    }, [])

    const n = jobs.length
    const anglePer = useMemo(() => (n > 0 ? 360 / n : 0), [n])

    // Draw wheel (no text to keep performance high even with hundreds of items)
    useEffect(() => {
        const canvas = canvasRef.current
        const parent = canvas?.parentElement
        if (!canvas || !parent || n === 0) return

        const dpr = Math.min(window.devicePixelRatio || 1, 2)

        const resizeAndDraw = () => {
            const rect = parent.getBoundingClientRect()
            // Prefer width; only constrain by height if it’s actually set
            const cssSize = Math.max(1, rect.height > 0 ? Math.min(rect.width, rect.height) : rect.width)
            const radius = cssSize / 2

            // Set backing store to DPR-scaled size; keep CSS size at logical pixels
            canvas.width = Math.floor(cssSize * dpr)
            canvas.height = Math.floor(cssSize * dpr)
            canvas.style.width = `${cssSize}px`
            canvas.style.height = `${cssSize}px`

            const ctx = canvas.getContext("2d")
            if (!ctx) return

            ctx.resetTransform()
            ctx.scale(dpr, dpr)
            ctx.clearRect(0, 0, cssSize, cssSize)
            ctx.translate(radius, radius)

            const startOffset = -Math.PI / 2
            for (let i = 0; i < n; i++) {
                const start = startOffset + (i * 2 * Math.PI) / n
                const end = startOffset + ((i + 1) * 2 * Math.PI) / n
                const code = jobs[i].hollandCodes?.[0]
                const fill = hexByType[code] || "#9ca3af"

                ctx.beginPath()
                ctx.moveTo(0, 0)
                ctx.arc(0, 0, radius, start, end)
                ctx.closePath()
                ctx.fillStyle = fill
                ctx.fill()

                // (Optional) subtle edge pass — cheap and crisp
                ctx.strokeStyle = "rgba(0,0,0,0.12)"
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.arc(0, 0, radius, start, start)
                ctx.stroke()
            }

            // Center hub
            ctx.beginPath()
            ctx.arc(0, 0, radius * 0.08, 0, 2 * Math.PI)
            ctx.fillStyle = "#111827"
            ctx.fill()
        }

        resizeAndDraw()

        const observer = new ResizeObserver(resizeAndDraw)
        observer.observe(parent)

        // Also listen to viewport changes so vmin/clamp-based widths redraw correctly
        window.addEventListener("resize", resizeAndDraw)

        return () => {
            observer.disconnect()
            window.removeEventListener("resize", resizeAndDraw)
        }
    }, [jobs, n])



    const onSpin = () => {
        if (spinning) return
        if (n === 0) {
            toast.error("No jobs available to spin.")
            return
        }
        setSpinning(true)

        const targetIndex = Math.floor(Math.random() * n)
        const spins = 4 + Math.floor(Math.random() * 3) // 4–6 full rotations

        // Align the center of targetIndex to the top (pointer) after spinning
        const final = spins * 360 - (targetIndex + 0.5) * anglePer

        // Smooth ease-out
        const wheelEl = wheelRef.current
        if (!wheelEl) return
        wheelEl.style.transition = "transform 3.2s cubic-bezier(0.22, 0.61, 0.36, 1)"
        // Trigger layout before applying transform
        void wheelEl.offsetWidth

        setRotation(final)

        const handleEnd = () => {
            wheelEl.removeEventListener("transitionend", handleEnd)
            wheelEl.style.transition = ""
            // Normalize rotation to avoid huge numbers over time
            const normalized = ((final % 360) + 360) % 360
            setRotation(normalized)

            const picked = jobs[targetIndex]
            setResult(picked)
            setOpen(true)
            setSpinning(false)
        }
        wheelEl.addEventListener("transitionend", handleEnd)
    }

    const wheelRef = useRef<HTMLDivElement | null>(null)

    const matchCount = useMemo(() => {
        if (!result || selectedTypes.length === 0) return 0
        const set = new Set(selectedTypes)
        return result.hollandCodes.reduce((acc, c) => acc + (set.has(c) ? 1 : 0), 0)
    }, [result, selectedTypes])

    const codeLabel: Record<ValidKey, string> = {
        R: "Realistic",
        I: "Investigative",
        A: "Artistic",
        S: "Social",
        E: "Enterprising",
        K: "Conventional", // using K in your app
    }

    return (
        <div className="min-h-screen overflow-x-hidden bg-background text-black dark:text-white transition-colors">

            {/* Header */}
            <section className="flex flex-col items-center justify-center gap-3 px-4 py-12 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-primary">{t.wheelTitle}</h1>
                <p className="text-muted-foreground">{t.wheelTips}</p>
                {selectedTypes.length === 3 && (
                    <p className="text-sm text-muted-foreground">
                        {t.savedType} <span className="font-semibold">{selectedTypes.join(" ")}</span>
                    </p>
                )}
            </section>

            {/* Wheel */}
            <section className="flex flex-col items-center gap-6">
                <div className="relative flex justify-center items-center">
                    {/* Pointer */}
                    <div aria-hidden className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                        <div className="w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-rose-500 drop-shadow" />

                    </div>

                    {/* Rotating wheel */}
                    <div
                        ref={wheelRef}
                        style={{ transform: `rotate(${rotation}deg)` }}
                        className="mx-auto aspect-square w-[clamp(330px,60vmin,660px)] transition-transform rounded-full shadow-2xl will-change-transform"
                    >
                        <canvas
                            ref={canvasRef}
                            className="w-full h-full rounded-full bg-muted"
                            aria-label="Career Wheel"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3">
                    <Button
                        onClick={onSpin}
                        disabled={spinning || n === 0}
                        className={spinning ? "opacity-60 cursor-not-allowed" : ""}
                    >
                        {spinning ? t.spinning : t.spin}
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={() => {
                            setJobs((prev) => {
                                const copy = [...prev]
                                for (let i = copy.length - 1; i > 0; i--) {
                                    const j = Math.floor(Math.random() * (i + 1))
                                        ;[copy[i], copy[j]] = [copy[j], copy[i]]
                                }
                                return copy
                            })
                            toast.success(t.shuffleSuccess)
                        }}
                    >
                        {t.shuffle}
                    </Button>
                </div>
            </section>

            {/* Modal */}
            {open && result && (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)] max-w-[640px] max-h-[88svh] p-4 sm:p-6 rounded-2xl shadow-2xl bg-background text-black dark:text-white transition-colors overflow-hidden">
                        <DialogHeader>
                            <DialogTitle className="text-xl sm:text-3xl font-semibold text-center">
                                {result.title}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="overflow-y-auto max-h-[calc(88svh-7rem)] sm:max-h-[calc(90vh-8rem)] space-y-6">
                            <p className="leading-relaxed text-base sm:text-lg">{result.description}</p>

                            <div className="space-y-3">
                                <h3 className="font-semibold">{t.suitableCodes}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {result.hollandCodes.map((code) => {
                                        const cls = colorMap[code]
                                        return (
                                            <span
                                                key={code}
                                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm text-white ${cls?.base ?? "bg-gray-500"}`}
                                                title={codeLabel[code]}
                                            >
                                                <strong>{code}</strong>
                                                <span className="opacity-90">{codeLabel[code]}</span>
                                            </span>
                                        )
                                    })}
                                </div>

                                {selectedTypes.length === 3 && (
                                    <p className="text-sm text-muted-foreground">
                                        {t.matchLabel} ({selectedTypes.join(" ")}):{" "}
                                        <span className="font-semibold">{matchCount}/3</span>
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                                <Button onClick={() => setOpen(false)}>{t.close}</Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        const query = encodeURIComponent(result.title)
                                        window.open(`https://www.google.com/search?q=${query}`, "_blank")
                                    }}
                                >
                                    {t.searchOnGoogle ?? "Search on Google"}
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            {/* Job List */}
            <section className="w-full px-4 sm:px-6 lg:px-8 mt-10 mb-10 flex justify-center">
                <div className="w-full max-w-6xl">
                    <h2 className="text-2xl sm:text-4xl font-semibold mb-4 text-center">
                        {t.jobListTitle}
                    </h2>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-sm">
                        {jobs.map((job) => (
                            <li
                                key={job.id}
                                onClick={() => {
                                    setResult(job)
                                    setOpen(true)
                                }}
                                role="button"
                                tabIndex={0}
                                className="border border-border rounded-lg p-4 hover:bg-muted transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                                <span className="block font-medium text-base">{job.title}</span>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {job.hollandCodes.map((code) => (
                                        <span
                                            key={`${job.id}-${code}`}
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs text-white ${colorMap[code]?.base ?? "bg-gray-500"}`}
                                            title={codeLabel[code]}
                                        >
                                            {code}
                                        </span>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>


    )
}
