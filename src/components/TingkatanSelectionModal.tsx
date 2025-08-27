"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function TingkatanSelectionModal() {
    const t = useTranslations("common");
    const { data: session, update } = useSession();
    const [selectedTingkatan, setSelectedTingkatan] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const isModalOpen = !!session?.user && !session.user.tingkatan;

    const handleSubmit = async () => {
        if (!selectedTingkatan) {
            toast.error(t("selectTingkatanError"));
            return;
        }
        setIsLoading(true);
        try {
            await fetch("/api/user/profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tingkatan: parseInt(selectedTingkatan, 10) }),
            });

            await update({ tingkatan: parseInt(selectedTingkatan, 10) });
            toast.success(t("tingkatanSavedSuccess"));
        } catch (error) {
            console.error(error);
            toast.error(t("tingkatanSavedError"));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isModalOpen}>
            <DialogContent
                className="sm:max-w-[425px]"
                onInteractOutside={(e) => e.preventDefault()}
                showCloseButton={false}
            >
                <DialogHeader>
                    <DialogTitle>{t("welcome")}</DialogTitle>
                    <DialogDescription>{t("tingkatanPrompt")}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Select onValueChange={setSelectedTingkatan} value={selectedTingkatan}>
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
                    <Button onClick={handleSubmit} disabled={isLoading || !selectedTingkatan}>
                        {isLoading ? t("saving") : t("saveAndContinue")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
