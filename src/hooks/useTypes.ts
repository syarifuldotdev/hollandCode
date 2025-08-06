import { useLanguage } from "@/context/LanguageContext"
import { types } from "@/lib/types"

type TypeItem = { key: string; label: string }
type Language = keyof typeof types

export function useTypes(): TypeItem[] {
    const { language } = useLanguage()
    return types[language as Language] ?? types["en"]
}
