export const translations: Record<string, Translation> = {
    en: {
        submit: "Submit",
        tooltip: "Click to select",
        dialogTitle: "Your Selected Types",
        labels: {
            environment: "Work Environment",
            examples: "Example Jobs",
            traits: "Personality Traits",
        },
        tooMany: "You can only select up to 3 types.",
        needThree: "Please select exactly 3 types before submitting.",
    },
    bm: {
        submit: "Hantar",
        tooltip: "Klik untuk pilih",
        dialogTitle: "Jenis yang anda pilih",
        labels: {
            environment: "Persekitaran Kerja",
            examples: "Contoh Pekerjaan",
            traits: "Ciri-ciri Personaliti",
        },
        tooMany: "Anda hanya boleh memilih sehingga 3 jenis.",
        needThree: "Sila pilih tepat 3 jenis sebelum meneruskan.",
    },
}


type Translation = {
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
}
