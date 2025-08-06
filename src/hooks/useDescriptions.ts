import { useLanguage } from "@/context/LanguageContext"
import { descriptions } from "@/lib/descriptions"

type Language = keyof typeof descriptions

export function useDescriptions() {
    const { language } = useLanguage()
    return descriptions[language as Language] ?? descriptions["en"]
}
