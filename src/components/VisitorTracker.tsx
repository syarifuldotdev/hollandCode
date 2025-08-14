"use client";
import { useEffect } from "react";
import { getOrSetVisitorId } from "@/utils/visitorId";
import { getFingerprint } from "@/utils/fingerprint";

export default function VisitorTracker() {
    useEffect(() => {
        fetch("/api/track-visitor", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                visitorId: getOrSetVisitorId(),
                fingerprint: getFingerprint(),
            }),
        });
    }, []);

    return null;
}
