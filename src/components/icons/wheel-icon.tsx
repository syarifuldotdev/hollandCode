// components/icons/wheel-icon.tsx
import { FC } from "react"

export const WheelIcon: FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 2a8 8 0 017.94 7H12V4.06A8 8 0 014.06 12H12v7.94A8 8 0 0112 4z" />
    </svg>
)
