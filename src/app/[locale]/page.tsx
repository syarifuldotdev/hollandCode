// src/app/[locale]/page.tsx
"use client";

import colorMap, { ValidKey } from "@/app/constants/colorMap";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

const STORAGE_KEY = "selectedTypes";
const KEYS: ValidKey[] = ["R", "I", "A", "S", "E", "K"];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SUPPORTED_LOCALES = ["en", "ms"] as const;

export default function Page() {
    const t = useTranslations("common");
    const tTypes = useTranslations("types");

    const [selected, setSelected] = useState<ValidKey[]>([]);
    const [showDialog, setShowDialog] = useState(false);

    // Generate type list from translations
    const typeList = useMemo(
        () => KEYS.map((key) => ({ key, label: tTypes(`${key}.label`) })),
        [tTypes]
    );

    // Load saved selection on first mount
    const didInit = useRef(false);
    useEffect(() => {
        if (didInit.current || selected.length > 0) return;
        didInit.current = true;

        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (!saved) return;
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
                const valid = parsed.filter((k: string): k is ValidKey =>
                    KEYS.includes(k as ValidKey)
                );
                setSelected(valid.slice(0, 3));
            }
        } catch {
            console.error("Failed to parse stored types");
        }
    }, [selected.length]);

    // Save selection whenever it changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
    }, [selected]);

    const handleToggle = useCallback((key: ValidKey) => {
        setSelected((prev) =>
            prev.includes(key)
                ? prev.filter((k) => k !== key)
                : prev.length < 3
                    ? [...prev, key]
                    : (toast.error(t("tooMany")), prev)
        );
    }, [t]);

    const handleSubmit = useCallback(() => {
        if (selected.length === 3) {
            setShowDialog(true);
        } else {
            toast.error(t("needThree"));
        }
    }, [selected.length, t]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-4 bg-background text-black dark:text-white transition-colors overflow-x-hidden">
            {/* Title / Tips */}
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-semibold">{t("title")}</h1>
                <p className="text-muted-foreground">{t("tips")}</p>
            </div>

            {/* Buttons grid */}
            <div className="flex flex-wrap justify-center gap-6">
                {typeList.map(({ key, label }) => {
                    const index = selected.indexOf(key);
                    const isSelected = index !== -1;
                    const order = isSelected ? index + 1 : null;
                    const color = colorMap[key];
                    if (!color) return null;

                    const { base, hover } = color;
                    const colorClass = isSelected
                        ? `text-black dark:text-white ${base} ${hover}`
                        : `bg-transparent border border-gray-400 dark:border-muted text-black dark:text-muted-foreground ${hover}`;

                    return (
                        <Tooltip key={key}>
                            <TooltipTrigger asChild>
                                <Button
                                    className={`relative px-4 py-2 text-2xl h-20 w-20 transition-colors ${colorClass}`}
                                    onClick={() => handleToggle(key)}
                                    aria-label={`${key} - ${label}`}
                                    title={t("tooltip")}
                                >
                                    {key}
                                    {order && (
                                        <span className="absolute top-1 right-1 w-5 h-5 text-xs rounded-full flex items-center justify-center bg-black text-white dark:bg-white dark:text-black">
                                            {order}
                                        </span>
                                    )}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="dark:text-black text-white">{label}</p>
                            </TooltipContent>
                        </Tooltip>
                    );
                })}
            </div>

            {/* Submit Button */}
            <Button
                onClick={handleSubmit}
                disabled={selected.length !== 3}
                className={`px-6 py-3 text-lg font-semibold ${selected.length === 3
                        ? "bg-primary text-white dark:text-primary-foreground hover:bg-primary/80"
                        : "bg-gray-300 text-gray-700 dark:bg-muted dark:text-muted-foreground cursor-not-allowed"
                    }`}
            >
                {t("sumsit")}
            </Button>

            {/* Dialog */}
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="w-full max-h-[90vh] overflow-y-auto p-6 rounded-2xl shadow-2xl bg-background text-black dark:text-white transition-colors sm:max-w-[600px] md:max-w-[80vw] xl:max-w-[90vw] mx-auto">
                    <DialogHeader>
                        <DialogTitle className="text-4xl font-semibold text-center py-6">
                            {t("dialogTitle")}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                        {selected.map((key, index) => {
                            const color = colorMap[key];
                            if (!color) return null;

                            return (
                                <div
                                    key={key}
                                    className={`min-h-[300px] p-6 rounded-xl shadow-xl ${color.base} text-white flex flex-col`}
                                >
                                    <h3 className="text-3xl font-bold mb-4">
                                        {index + 1}. {tTypes(`${key}.label`)}
                                    </h3>
                                    <div className="space-y-4 text-lg leading-relaxed">
                                        <div>
                                            <h4 className="font-bold text-xl mb-1">{t("labels.environment")}</h4>
                                            <p>{tTypes(`${key}.environment`)}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xl mb-1">{t("labels.examples")}</h4>
                                            <p>{tTypes(`${key}.examples`)}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xl mb-1">{t("labels.traits")}</h4>
                                            <p>{tTypes(`${key}.traits`)}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
