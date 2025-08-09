"use client"

import { FC } from "react"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageToggle } from "@/components/language-toggle"

const Navbar: FC = () => {
    return (
        <div className="fixed top-0 left-0 right-0 z-40 bg-base-300 bg-opacity-20 backdrop-blur-lg drop-shadow-xl">
            <div className="flex justify-between items-center px-4 py-2">
                {/* 🔗 Left side: Wheel link */}
                <Link
                    href="/wheel"
                    className="flex items-center gap-2 text-sm text-primary font-semibold hover:underline underline-offset-4"
                >
                    {/* <WheelIcon className="w-5 h-5 text-primary" /> */}
                    STEM Career Wheel
                </Link>

                {/* 🎛️ Right side: Toggles */}
                <div className="flex items-center space-x-2">
                    <LanguageToggle />
                    <ModeToggle />
                </div>
            </div>
        </div>
    )
}

export default Navbar
