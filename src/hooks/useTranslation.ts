import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"

type Language = "en" | "bm"

export function useTranslation() {
    const { language } = useLanguage()

    // Use as assertion to ensure `language` is a known key
    return translations[language as Language] ?? translations["en"]
}
