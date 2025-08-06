type SyaLogoProps = {
    className?: string
}

export function SyaLogo({ className = "" }: SyaLogoProps) {
    return (
        <svg
            className={`h-9 ${className}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500"
            fill="currentColor"
        >
            <path d="m305.8 389.08 27.92-158.34h-64.74l-27.92 158.34M222.47 200l16.05-91h-64.74l-16.08 91.2" />
        </svg>
    )
}
