'use client';

import { useEffect } from 'react';

export default function ReloadOnResize() {
    useEffect(() => {
        let t: ReturnType<typeof setTimeout> | null = null;

        const reload = () => window.location.reload();

        const onResize = () => {
            if (t) clearTimeout(t);
            t = setTimeout(reload, 200);
        };

        window.addEventListener('resize', onResize);
        document.addEventListener('fullscreenchange', reload, { passive: true });
        document.addEventListener('webkitfullscreenchange', reload as EventListener, { passive: true });
        document.addEventListener('mozfullscreenchange', reload as EventListener, { passive: true });
        document.addEventListener('MSFullscreenChange', reload as EventListener, { passive: true });
        window.addEventListener('orientationchange', () => setTimeout(reload, 50), { passive: true });

        return () => {
            window.removeEventListener('resize', onResize);
            document.removeEventListener('fullscreenchange', reload as EventListener);
            document.removeEventListener('webkitfullscreenchange', reload as EventListener);
            document.removeEventListener('mozfullscreenchange', reload as EventListener);
            document.removeEventListener('MSFullscreenChange', reload as EventListener);
            window.removeEventListener('orientationchange', reload as EventListener);
            if (t) clearTimeout(t);
        };
    }, []);

    return null;
}
