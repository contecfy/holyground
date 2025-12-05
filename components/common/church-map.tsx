'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MapPin, X } from 'lucide-react';
import { Church } from './church-card';

interface ChurchMapProps {
  churches: Church[];
  center?: { lat: number; lng: number };
  selectedChurch?: Church | null;
  onChurchClick?: (church: Church) => void;
  className?: string;
}

const ChurchMap = ({
  churches,
  center,
  selectedChurch,
  onChurchClick,
  className = ''
}: ChurchMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Load Leaflet CSS and JS dynamically
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.onload = () => setMapLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    // @ts-ignore - Leaflet loaded from CDN
    const L = (window as any).L;
    if (!L) return;

    // Initialize map
    const map = L.map(mapRef.current).setView(
      center || [40.7128, -74.0060], // Default to NYC if no center
      13
    );

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Add markers for each church
    const markers: any[] = [];
    churches.forEach((church) => {
      const marker = L.marker([church.latitude, church.longitude])
        .addTo(map)
        .bindPopup(`<b>${church.name}</b><br>${church.address}`);

      marker.on('click', () => {
        if (onChurchClick) {
          onChurchClick(church);
        }
      });

      markers.push(marker);
    });

    // Center on selected church or fit bounds
    if (selectedChurch) {
      map.setView([selectedChurch.latitude, selectedChurch.longitude], 15);
      markers.forEach((marker) => {
        const latlng = marker.getLatLng();
        if (
          latlng.lat === selectedChurch.latitude &&
          latlng.lng === selectedChurch.longitude
        ) {
          marker.openPopup();
        }
      });
    } else if (churches.length > 0 && markers.length > 0) {
      const group = new L.FeatureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.1));
    }

    // Get user location if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          
          // Add user location marker
          L.marker([latitude, longitude], {
            icon: L.divIcon({
              className: 'user-location-marker',
              html: '<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>',
              iconSize: [16, 16],
            }),
          }).addTo(map);
        },
        () => {
          // User denied location or error
        }
      );
    }

    return () => {
      map.remove();
    };
  }, [mapLoaded, churches, center, selectedChurch, onChurchClick]);

  return (
    <div className={`relative ${className}`}>
      <div ref={mapRef} className="w-full h-full min-h-[400px] rounded-lg" />
      <style jsx global>{`
        .user-location-marker {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
};

export default ChurchMap;

