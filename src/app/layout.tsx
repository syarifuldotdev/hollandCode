import "@/app/globals.css"
import Navbar from "@/components/SiteHeader"
import { ThemeProvider } from "@/context/themeProvider"
import { NextIntlClientProvider } from "next-intl"
import { Toaster } from "@/components/ui/sonner"
import { SiteFooter } from "@/components/SiteFooter"
import { Analytics } from "@vercel/analytics/next"
import VisitorTracker from "@/components/VisitorTracker"
import type { Metadata } from "next";
import AuthProvider from "@/components/providers/auth-provider"

export const metadata: Metadata = {
  title: "Stem Compass",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased" suppressHydrationWarning>
        <ThemeProvider attribute="class">
          <NextIntlClientProvider locale={params.locale}>
            <Analytics />
            <VisitorTracker />
            <AuthProvider>
              <Navbar />
              {children}
              <SiteFooter />
            </AuthProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
