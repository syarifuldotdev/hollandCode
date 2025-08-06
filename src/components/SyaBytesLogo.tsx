type AltLogoProps = {
    className?: string
}

export function SyaBytesLogo({ className = "" }: AltLogoProps) {
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 500 500"
            className={`h-5 ${className}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="m118.94 489.13 207.14-246.86 82.24 69.01-149.23 177.85z"></path>
            <path d="m408.525 311.057-69.013 82.24-248-208.112 69.013-82.24z"></path>
            <path d="M378.06 10.87 173.78 254.33l-82.25-69.02L237.91 10.87z"></path>
        </svg>
    )
}
