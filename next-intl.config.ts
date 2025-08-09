export const locales = ['en', 'ms'] as const

export type Locale = (typeof locales)[number] // 👈 this gives you 'en' | 'ms'

export const defaultLocale: Locale = 'en'
export const localePrefix = 'always'
