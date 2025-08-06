export const translations: Record<string, Translation> = {
    en: {
        welcomeMessage: "🎉 Welcome! Pick your 3 holland code",
        submit: "Continue",
        tooltip: "Click to select",
        dialogTitle: "Your Selected Types",
        labels: {
            environment: "Work Environment",
            examples: "Example Jobs",
            traits: "Personality Traits",
        },
        tooMany: "You can only select up to 3 code.",
        needThree: "Please select exactly 3 code before submitting.",
        title: "Career Interest Inventory",
        tips: "Please choose your 3 holland code",
    },
    bm: {
        welcomeMessage: "🎉 Selamat datang! Pilih 3 mata kod",
        submit: "Teruskan",
        tooltip: "Klik untuk pilih",
        dialogTitle: "Kod mata holland anda",
        labels: {
            environment: "Persekitaran Kerja",
            examples: "Contoh Pekerjaan",
            traits: "Ciri-ciri Personaliti",
        },
        tooMany: "Anda hanya boleh memilih sehingga 3 mata sahaja.",
        needThree: "Sila pilih tepat 3 kod sebelum meneruskan.",
        title: "Inventori Minat Kerjaya",
        tips: "Sila pilih 3 kod mata holland anda",
    },
}



type Translation = {
    welcomeMessage: string
    submit: string
    tooltip: string
    dialogTitle: string
    labels: {
        environment: string
        examples: string
        traits: string
    }
    tooMany: string
    needThree: string
    title: string
    tips: string
}
