// src/components/TingkatanSettingsDialog.tsx

"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface TingkatanSettingsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function TingkatanSettingsDialog({
    open,
    onOpenChange,
}: TingkatanSettingsDialogProps) {
    const t = useTranslations("common");
    const { data: session, update } = useSession();
    const currentTingkatan = session?.user?.tingkatan;

    const [selectedTingkatan, setSelectedTingkatan] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    // When the dialog opens, set the select's value to the user's current tingkatan
    useEffect(() => {
        if (open) {
            setSelectedTingkatan(currentTingkatan?.toString() ?? "");
        }
    }, [open, currentTingkatan]);

    const handleSubmit = async () => {
        if (!selectedTingkatan) {
            toast.error(t("selectTingkatanError"));
            return;
        }
        setIsLoading(true);
        try {
            const newTingkatan = parseInt(selectedTingkatan, 10);
            await fetch("/api/user/profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tingkatan: newTingkatan }),
            });

            await update({ tingkatan: newTingkatan });
            toast.success(t("tingkatanSavedSuccess"));
            onOpenChange(false); // Close the dialog on success
        } catch (error) {
            console.error(error);
            toast.error(t("tingkatanSavedError"));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t("changeTingkatanTitle")}</DialogTitle>
                    <DialogDescription>{t("changeTingkatanDesc")}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Select
                        onValueChange={setSelectedTingkatan}
                        value={selectedTingkatan}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t("selectTingkatan")} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">{t("tingkatan")} 1</SelectItem>
                            <SelectItem value="2">{t("tingkatan")} 2</SelectItem>
                            <SelectItem value="3">{t("tingkatan")} 3</SelectItem>
                            <SelectItem value="4">{t("tingkatan")} 4</SelectItem>
                            <SelectItem value="5">{t("tingkatan")} 5</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>
                        {t("cancel")}
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={
                            isLoading ||
                            !selectedTingkatan ||
                            selectedTingkatan === currentTingkatan?.toString()
                        }
                    >
                        {isLoading ? t("saving") : t("saveChanges")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}