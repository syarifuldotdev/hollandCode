// Your existing Navbar component file

"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator, // Import Separator
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    ColorWheelIcon,
    Component2Icon,
    HomeIcon,
    GearIcon, // Import an icon for the settings
} from "@radix-ui/react-icons";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useState } from "react";
import { LocaleToggle } from "./LocaleToggle";
import { TingkatanSettingsDialog } from "./TingkatanSettingsDialog";

const Navbar: FC = () => {
    const { data: session, status } = useSession();
    const isLoading = status === "loading";
    const isAuthed = status === "authenticated";
    const [open, setOpen] = useState(false);

    // State to control the settings dialog
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const name = session?.user?.name ?? "";
    const email = session?.user?.email ?? "";
    const image = session?.user?.image ?? "";
    const tingkatan = session?.user?.tingkatan;

    const initials =
        name
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "U";

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-40 bg-base-300 bg-opacity-20 backdrop-blur-lg drop-shadow-xl">
                <div className="flex justify-between items-center px-4 py-2">
                    {/* 🔗 Top left: Home, Wheel, Quiz */}
                    <div className="flex items-center gap-6">
                        <Link
                            href="/"
                            className="flex items-center gap-1 text-sm text-primary font-semibold hover:underline underline-offset-4"
                            aria-label="Home"
                        >
                            <HomeIcon className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/wheel"
                            className="flex items-center gap-1 text-sm text-primary font-semibold hover:underline underline-offset-4"
                            aria-label="Color wheel"
                        >
                            <ColorWheelIcon className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/quiz"
                            className="flex items-center gap-1 text-sm text-primary font-semibold hover:underline underline-offset-4"
                            aria-label="Quiz"
                        >
                            <Component2Icon className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* 🎛️ Top right: Locale, Theme, Auth */}
                    <div className="flex items-center gap-2">
                        <LocaleToggle />
                        <ModeToggle />

                        {/* Auth area */}
                        {isLoading ? (
                            <div
                                className="w-8 h-8 rounded-full bg-muted animate-pulse"
                                aria-hidden
                            />
                        ) : isAuthed ? (
                            <DropdownMenu open={open} onOpenChange={setOpen}>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="p-0 w-9 h-9 rounded-full overflow-hidden focus-visible:ring-2 focus-visible:ring-primary"
                                        aria-label="Open profile menu"
                                    >
                                        <Avatar className="w-9 h-9">
                                            <AvatarImage src={image} alt={name || email || "User"} />
                                            <AvatarFallback className="text-xs">
                                                {initials}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end" className="w-64">
                                    <div className="px-2 py-2">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-10 h-10">
                                                <AvatarImage
                                                    src={image}
                                                    alt={name || email || "User"}
                                                />
                                                <AvatarFallback>{initials}</AvatarFallback>
                                            </Avatar>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium leading-tight truncate">
                                                    {name || "User"}
                                                </p>
                                                <p className="text-xs text-muted-foreground truncate">
                                                    {email || "—"}
                                                </p>
                                                {tingkatan && (
                                                    <p className="text-xs text-muted-foreground">
                                                        Tingkatan {tingkatan}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <DropdownMenuSeparator />

                                    {/* Add the new menu item here */}
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        onSelect={() => setIsSettingsOpen(true)}
                                    >
                                        <GearIcon className="mr-2 h-4 w-4" />
                                        <span>Change Tingkatan</span>
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem
                                        className="cursor-pointer text-destructive"
                                        onClick={() => signOut()}
                                    >
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button
                                variant="outline"
                                onClick={() => signIn("google")}
                                className="text-sm font-semibold"
                                aria-label="Sign in with Google"
                            >
                                Sign in
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Render the dialog, controlled by the Navbar's state */}
            {isAuthed && (
                <TingkatanSettingsDialog
                    open={isSettingsOpen}
                    onOpenChange={setIsSettingsOpen}
                />
            )}
        </>
    );
};

export default Navbar;