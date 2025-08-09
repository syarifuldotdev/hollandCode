"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { ColorWheelIcon, Component2Icon, HomeIcon } from "@radix-ui/react-icons"
import { useLocale } from "next-intl"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { FC } from "react"
import { LocaleToggle } from "./LocaleToggle"

const SUPPORTED_LOCALES = ["en", "ms"] as const
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

const Navbar: FC = () => {
    const locale = useLocale() as SupportedLocale
    const router = useRouter()
    const pathname = usePathname()

    const switchLocale = (next: SupportedLocale) => {
        if (next === locale) return
        const parts = pathname.split("/").filter(Boolean)
        const hasLocaleSegment = SUPPORTED_LOCALES.includes(parts[0] as SupportedLocale)
        const nextParts = hasLocaleSegment ? [next, ...parts.slice(1)] : [next, ...parts]
        router.replace("/" + nextParts.join("/"))
    }

    return (
        <div className="fixed top-0 left-0 right-0 z-40 bg-base-300 bg-opacity-20 backdrop-blur-lg drop-shadow-xl">
            <div className="flex justify-between items-center px-4 py-2">
                {/* 🔗 Top left: Home, Wheel, Quiz */}
                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="flex items-center gap-1 text-sm text-primary font-semibold hover:underline underline-offset-4"
                    >
                        <HomeIcon className="w-4 h-4" />

                    </Link>
                    <Link
                        href="/wheel"
                        className="flex items-center gap-1 text-sm text-primary font-semibold hover:underline underline-offset-4"
                    >
                        <ColorWheelIcon className="w-4 h-4" />

                    </Link>
                    <Link
                        href="/quiz"
                        className="flex items-center gap-1 text-sm text-primary font-semibold hover:underline underline-offset-4"
                    >
                        <Component2Icon className="w-4 h-4" />

                    </Link>
                </div>

                {/* 🎛️ Top right: Language + Theme */}
                <div className="flex items-center gap-2">
                    <LocaleToggle />
                    <ModeToggle />
                </div>
            </div>
        </div>
    )
}

export default Navbar
