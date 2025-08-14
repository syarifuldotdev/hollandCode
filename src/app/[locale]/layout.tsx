import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";


type Props = {
    children: ReactNode;
    params: Promise<{ locale: string }> | { locale: string };
};

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params; // works if it's a plain object or a Promise
    const messages = await getMessages({ locale });
    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
}
