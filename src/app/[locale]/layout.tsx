import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    params: { locale: string };
};

export default async function LocaleLayout({ children, params }: Props) {
    const messages = await getMessages({ locale: params.locale });

    return (
        <NextIntlClientProvider locale={params.locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
}
