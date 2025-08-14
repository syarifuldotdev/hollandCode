// utils/visitorId.ts
import { randomBytes } from 'crypto'; // works in Node

function generateUUIDv4() {
    // Use browser crypto.randomUUID if available
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }

    // Use Node.js crypto if available
    if (typeof randomBytes === 'function') {
        const bytes = randomBytes(16);
        bytes[6] = (bytes[6] & 0x0f) | 0x40; // Version 4
        bytes[8] = (bytes[8] & 0x3f) | 0x80; // Variant 10
        const hex = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
        return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
    }

    // Last‑resort simple fallback
    return 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export function getOrSetVisitorId() {
    const cookieName = 'visitor_id';
    const match = document.cookie
        .split('; ')
        .find((r) => r.startsWith(cookieName + '='));
    if (match) return match.split('=')[1];

    const id = generateUUIDv4();
    document.cookie = `${cookieName}=${id}; path=/; max-age=${60 * 60 * 24 * 365}`;
    return id;
}
