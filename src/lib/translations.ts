export type Translation = {
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

    // Wheel page
    wheelTitle: string
    wheelTips: string
    savedType: string
    spin: string
    spinning: string
    shuffle: string
    shuffleSuccess: string
    suitableCodes: string
    matchLabel: string
    close: string
    jobListTitle: string
    hollandLabel: string
    searchOnGoogle?: string
}

export const translations: Record<string, Translation> = {
    en: {
        welcomeMessage: "🎉 Welcome! Pick your 3 Holland codes",
        submit: "Continue",
        tooltip: "Click to select",
        dialogTitle: "Your Selected Types",
        labels: {
            environment: "Work Environment",
            examples: "Example Jobs",
            traits: "Personality Traits"
        },
        tooMany: "You can only select up to 3 codes.",
        needThree: "Please select exactly 3 codes before submitting.",
        title: "Career Interest Inventory",
        tips: "Please choose your 3 Holland codes",

        wheelTitle: "STEM Career Wheel",
        wheelTips: "Spin the wheel to explore a STEM job.",
        savedType: "Your saved type:",
        spin: "Spin",
        spinning: "Spinning...",
        shuffle: "Shuffle",
        shuffleSuccess: "Shuffled job order!",
        suitableCodes: "Suitable Holland codes",
        matchLabel: "Match with your type",
        close: "Close",
        jobListTitle: "Jobs on the Wheel",
        hollandLabel: "Holland:",
        searchOnGoogle: "Search on Google"
    },
    bm: {
        welcomeMessage: "🎉 Selamat datang! Pilih 3 kod Holland anda",
        submit: "Teruskan",
        tooltip: "Klik untuk pilih",
        dialogTitle: "Kod Holland yang anda pilih",
        labels: {
            environment: "Persekitaran Kerja",
            examples: "Contoh Pekerjaan",
            traits: "Ciri-ciri Personaliti"
        },
        tooMany: "Anda hanya boleh pilih sehingga 3 kod.",
        needThree: "Sila pilih tepat 3 kod sebelum meneruskan.",
        title: "Inventori Minat Kerjaya",
        tips: "Sila pilih 3 kod Holland anda",

        wheelTitle: "Roda Kerjaya STEM",
        wheelTips: "Putar roda untuk meneroka kerjaya STEM.",
        savedType: "Kod pilihan anda:",
        spin: "Putar",
        spinning: "Sedang berputar...",
        shuffle: "Acak",
        shuffleSuccess: "Susunan kerjaya telah diacak!",
        suitableCodes: "Kod Holland yang sesuai",
        matchLabel: "Padanan dengan kod anda",
        close: "Tutup",
        jobListTitle: "Senarai Kerjaya",
        hollandLabel: "Kod Holland:",
        searchOnGoogle: "Cari di Google"
    }
}
