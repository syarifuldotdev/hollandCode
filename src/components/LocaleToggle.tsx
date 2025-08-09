"use client";

import { GlobeIcon } from "@radix-ui/react-icons";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "./ui/dropdown-menu";

const SUPPORTED_LOCALES = ["en", "ms"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const LocaleToggle: FC = () => {
    const locale = useLocale() as SupportedLocale;
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (next: SupportedLocale) => {
        if (!next || next === locale) return;

        // Split current path
        const parts = pathname.split("/").filter(Boolean);
        const hasLocaleSegment = SUPPORTED_LOCALES.includes(parts[0] as SupportedLocale);

        // Replace or insert locale in the path
        const nextParts = hasLocaleSegment
            ? [next, ...parts.slice(1)]
            : [next, ...parts];
        const nextPath = "/" + nextParts.join("/");

        // Keep current query params and hash
        const search = typeof window !== "undefined" ? window.location.search : "";
        const hash = typeof window !== "undefined" ? window.location.hash : "";

        // Navigate to new locale and refresh content
        router.replace(`${nextPath}${search}${hash}`);
        router.refresh();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="w-9 px-0"
                    aria-label="Select language"
                >
                    <GlobeIcon className="h-[1.2rem] w-[1.2rem]" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {SUPPORTED_LOCALES.map((code) => (
                    <DropdownMenuItem
                        key={code}
                        onClick={() => switchLocale(code)}
                        className={code === locale ? "font-semibold text-primary" : ""}
                        aria-pressed={code === locale}
                    >
                        {code.toUpperCase()}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
