// src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"


export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode
    params: { locale: string }
}) {
    const messages = await getMessages({ locale: params.locale })

    return (
        <NextIntlClientProvider locale={params.locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
    )
}
