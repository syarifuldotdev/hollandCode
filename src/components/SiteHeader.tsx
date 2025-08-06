"use client"

import { FC } from "react"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageToggle } from "@/components/language-toggle"

const Navbar: FC = () => {
    return (
        <div className="fixed top-0 left-0 right-0 z-40 bg-base-300 bg-opacity-20 backdrop-blur-lg drop-shadow-xl">
            <div className="flex justify-end items-center px-4 py-2 space-x-2">
                <LanguageToggle />
                <ModeToggle />
            </div>
        </div>
    )
}

export default Navbar
