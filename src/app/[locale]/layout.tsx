import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";
import ReloadOnResize from "./ReloadOnResize";


type Props = {
    children: ReactNode;
    params: { locale: string };
};

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = params;
    const messages = await getMessages({ locale });

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            {/* Mounts client‑only reload logic */}
            <ReloadOnResize />
            {children}
        </NextIntlClientProvider>
    );
}
