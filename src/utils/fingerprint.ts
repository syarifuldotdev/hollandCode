// utils/fingerprint.ts
export function getFingerprint() {
    const data = [
        screen.width,
        screen.height,
        window.devicePixelRatio,
        new Date().getTimezoneOffset(),
    ].join("|");
    // For production, hash this to keep it opaque:
    return btoa(data);
}