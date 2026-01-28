'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { logUserVisit, logUserDuration } from '@/app/actions/log';
import { v4 as uuidv4 } from 'uuid';

export function UserTracker() {
    const pathname = usePathname();
    const logIdRef = useRef<string | null>(null);
    const startTimeRef = useRef<number>(Date.now());

    useEffect(() => {
        // Get or create session ID
        let sessionId = sessionStorage.getItem('sessionId');
        if (!sessionId) {
            sessionId = uuidv4();
            sessionStorage.setItem('sessionId', sessionId);
        }

        const handleRouteChange = async () => {
            // 1. End previous log if exists
            if (logIdRef.current) {
                const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
                // Fire and forget - use sendBeacon-like behavior logic if possible, 
                // but for server actions we just call it.
                // Note: updating duration is best effort on route change
                logUserDuration(logIdRef.current!, duration);
            }

            // 2. Start new log
            startTimeRef.current = Date.now();
            // Don't log admin pages for "UserLogs" (optional, but good practice to separate traffic)
            // But requirement says "User access logs", so we might log everything but maybe tag it?
            // For now, log everything.

            try {
                const newLogId = await logUserVisit(
                    pathname,
                    navigator.userAgent,
                    sessionId!
                );
                logIdRef.current = newLogId;
            } catch (error) {
                console.error("Tracking Error", error);
            }
        };

        handleRouteChange();

        // Cleanup on unmount or path change
        // Note: useEffect cleanup runs before the new effect, so we need to be careful not to double log
        // But since we are reacting to pathname, this effect re-runs on path change.
        return () => {
            if (logIdRef.current) {
                const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
                logUserDuration(logIdRef.current!, duration);
            }
        };
    }, [pathname]);

    return null;
}
