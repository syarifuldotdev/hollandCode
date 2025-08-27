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
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";

// You can define Metadata here as before
export const metadata: Metadata = {
  title: "Stem Compass",
};

/**
 * RootLayout is now an async function that receives the children and params
 * and fetches the messages for the current locale.
 * @param {object} props The component props.
 * @param {ReactNode} props.children The child components.
 * @param {object} props.params The route parameters, including locale.
 * @returns {JSX.Element} The rendered layout.
 */
export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode
  params: { locale: string }
}) {
  // Fetch messages for the current locale asynchronously on the server
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased" suppressHydrationWarning>
        {/*
         * Wrap the entire app with NextIntlClientProvider to make translations
         * available to all client components.
         */}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class">
            <Analytics />
            <VisitorTracker />
            <AuthProvider>
              <Navbar />
              {children}
              <SiteFooter />
            </AuthProvider>
          </ThemeProvider>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
