// components/wayground/join-form.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot
} from "@/components/ui/input-otp";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

const WAYGROUND_JOIN_URL = "https://wayground.com/join?gc=";

export default function JoinWaygroundByCode() {
    const t = useTranslations("joinForm");
    const [raw, setRaw] = useState("");

    const code = useMemo(
        () =>
            raw
                .replace(/[^0-9]/g, "") // nombor sahaja
                .slice(0, 6),
        [raw]
    );

    const isComplete = code.length === 6;

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (!isComplete) return;
        window.location.href = `${WAYGROUND_JOIN_URL}${code}`;
    };

    return (
        <div className="flex flex-col items-center gap-5 w-full">
            <h2 className="text-lg sm:text-xl font-semibold text-center">
                {t("title")}
            </h2>
            <p className="text-sm text-muted-foreground text-center max-w-sm">
                {t("description")}
            </p>

            <form
                onSubmit={onSubmit}
                className="flex flex-col items-center gap-4 w-full"
            >
                <InputOTP
                    maxLength={6}
                    value={code}
                    onChange={setRaw}
                    aria-label={t("title")}
                >
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>

                <Button
                    type="submit"
                    disabled={!isComplete}
                    className="w-full sm:w-auto"
                >
                    {t("button")}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                    {t("note")}
                </p>
            </form>
        </div>
    );
}
