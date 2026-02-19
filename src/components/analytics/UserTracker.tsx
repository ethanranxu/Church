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
                // Fire and forget
                logUserDuration(logIdRef.current!, duration);
            }

            // 2. Start new log
            startTimeRef.current = Date.now();

            try {
                const id = await logUserVisit(pathname, navigator.userAgent, sessionId!);

                if (id) {
                    logIdRef.current = id;
                }
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
