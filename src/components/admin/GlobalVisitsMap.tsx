'use client';

import React, { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { fetchGlobalVisits } from '@/app/actions/log';
// Native select used instead of Shadcn Select to avoid extra dependencies for now
import { startOfDay, subDays, endOfDay } from 'date-fns';
import 'leaflet/dist/leaflet.css';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

interface VisitLocation {
    city: string;
    country: string;
    lat: number;
    lng: number;
    count: number;
}

export function GlobalVisitsMap() {
    const [locations, setLocations] = useState<VisitLocation[]>([]);
    const [timeRange, setTimeRange] = useState('7days');
    const [loading, setLoading] = useState(true);
    const [L, setL] = useState<any>(null);

    useEffect(() => {
        // Load Leaflet on client side
        import('leaflet').then((leaflet) => {
            setL(leaflet);
        });
    }, []);

    useEffect(() => {
        const loadVisits = async () => {
            setLoading(true);
            try {
                let startDate = new Date();
                let endDate = new Date();

                if (timeRange === '7days') {
                    startDate = subDays(new Date(), 7);
                } else if (timeRange === '30days') {
                    startDate = subDays(new Date(), 30);
                } else if (timeRange === 'today') {
                    startDate = new Date();
                }

                const startStr = startOfDay(startDate).toISOString();
                const endStr = endOfDay(endDate).toISOString();

                const data = await fetchGlobalVisits(startStr, endStr);
                setLocations(data);
            } catch (error) {
                console.error("Failed to load map data", error);
            } finally {
                setLoading(false);
            }
        };

        loadVisits();
    }, [timeRange]);

    const center: [number, number] = [10, 175];

    // Create custom icon
    const createCustomIcon = (count: number) => {
        if (!L) return null;
        return L.divIcon({
            className: 'custom-div-icon',
            html: `
                <div class="relative flex items-center justify-center group w-6 h-6">
                    <div class="absolute -inset-4 bg-blue-500/30 rounded-full blur-md animate-pulse"></div>
                    <div class="absolute -inset-1 bg-blue-500/50 rounded-full animate-ping opacity-75"></div>
                    <div class="relative w-3 h-3 bg-blue-600 border-2 border-white rounded-full shadow-sm z-10"></div>
                </div>
            `,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
    };

    if (!L) {
        return (
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col relative h-[500px] items-center justify-center">
                <div className="size-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col relative h-[500px] isolation-auto z-0">
            {/* Header / Controls */}
            <div className="absolute top-4 left-14 z-[400] bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md border border-gray-100 flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 px-2">访客来源</span>
                <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="text-sm bg-transparent border-none focus:ring-0 cursor-pointer font-semibold text-blue-600 outline-none"
                >
                    <option value="today">今天</option>
                    <option value="7days">最近 7 天</option>
                    <option value="30days">最近 30 天</option>
                </select>
            </div>

            <MapContainer
                center={center}
                zoom={2}
                minZoom={2}
                maxBounds={[[-90, -180], [90, 180]]}
                maxBoundsViscosity={1.0}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%', zIndex: 0 }}
                attributionControl={false}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                {locations.map((loc, index) => {
                    const icon = createCustomIcon(loc.count);
                    if (!icon) return null;

                    return (
                        <Marker
                            key={`${loc.lat}-${loc.lng}-${index}`}
                            position={[loc.lat, loc.lng]}
                            icon={icon}
                        >
                            <Popup>
                                <div className="text-sm font-medium">
                                    {loc.city}, {loc.country}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {loc.count} visits
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>

            {loading && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-[500]">
                    <div className="size-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
}
