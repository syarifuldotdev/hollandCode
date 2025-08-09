import "@/app/globals.css"
import Navbar from "@/components/SiteHeader"
import { ThemeProvider } from "@/context/themeProvider"
import { NextIntlClientProvider } from "next-intl"
import { Toaster } from "@/components/ui/sonner"
import { SiteFooter } from "@/components/SiteFooter"

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className="min-h-screen bg-background text-foreground antialiased"
                suppressHydrationWarning
            >
                <ThemeProvider attribute="class">
                    <NextIntlClientProvider>
                        <Navbar />
                        {children}
                        <SiteFooter/>
                    </NextIntlClientProvider>
                </ThemeProvider>
                <Toaster/>


            </body>
        </html>
    )
}
