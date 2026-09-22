import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { useLocation } from '../../context/LocationContext';

export default function LiveLocationMap({
  boutiques = [],
  selectedRadius = 'all',
  onNavigateBoutique,
  className = ''
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const radiusCircleRef = useRef(null);
  const couriersLayerRef = useRef(null);

  const { location } = useLocation();
  const userLat = location.lat || 28.5535;
  const userLng = location.lng || 77.1944;

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [userLat, userLng],
        zoom: 13.5,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: true,
      });

      // CartoDB Voyager tiles for modern, ultra-clean aesthetic
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      // Attribution in subtle corner
      L.control.attribution({ position: 'bottomright', prefix: '© CartoDB © OpenStreetMap' }).addTo(map);

      // Zoom control in top right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Layer groups
      markersLayerRef.current = L.layerGroup().addTo(map);
      couriersLayerRef.current = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update User Marker & Radius Circle when location changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove existing radius circle if any
    if (radiusCircleRef.current) {
      map.removeLayer(radiusCircleRef.current);
    }

    // Determine radius in meters based on selected radius filter
    let radiusMeters = 2200;
    if (selectedRadius === 'soho') radiusMeters = 1500;
    else if (selectedRadius === 'west-village') radiusMeters = 2000;
    else if (selectedRadius === 'tribeca') radiusMeters = 3000;

    // Draw Delivery Perimeter Radius Circle
    const circle = L.circle([userLat, userLng], {
      radius: radiusMeters,
      color: '#135bec',
      weight: 1.5,
      opacity: 0.7,
      fillColor: '#135bec',
      fillOpacity: 0.08,
      dashArray: '6, 6'
    }).addTo(map);

    radiusCircleRef.current = circle;
  }, [userLat, userLng, selectedRadius]);

  // Update Markers (User + Boutiques + Couriers)
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    const couriersLayer = couriersLayerRef.current;
    if (!map || !markersLayer || !couriersLayer) return;

    markersLayer.clearLayers();
    couriersLayer.clearLayers();

    // 1. User Live GPS Marker
    const userIconHtml = `
      <div class="relative flex flex-col items-center pointer-events-none -translate-x-1/2 -translate-y-1/2">
        <div class="relative flex items-center justify-center">
          <span class="animate-ping absolute w-8 h-8 rounded-full bg-blue-500/40"></span>
          <div class="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
            <span class="material-symbols-outlined text-[16px]">near_me</span>
          </div>
        </div>
        <span class="mt-1 px-2 py-0.5 bg-neutral-900 text-white text-[11px] font-bold rounded-full shadow-md whitespace-nowrap border border-neutral-700">
          You: ${location.neighborhood || 'New Delhi'}
        </span>
      </div>
    `;

    const userIcon = L.divIcon({
      html: userIconHtml,
      className: 'user-pin-custom',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    L.marker([userLat, userLng], { icon: userIcon, zIndexOffset: 1000 }).addTo(markersLayer);

    // 2. Boutique Markers
    boutiques.forEach((boutique) => {
      if (!boutique.lat || !boutique.lng) return;

      const boutiqueIconHtml = `
        <div class="relative flex flex-col items-center cursor-pointer group -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform">
          <div class="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-lg border border-neutral-200 text-neutral-900">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="text-[12px] font-bold tracking-tight">${boutique.name}</span>
            <span class="text-[11px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded">${boutique.doorstepMinutes}m</span>
          </div>
          <div class="w-2 h-2 bg-white rotate-45 -mt-1 shadow-sm border-r border-b border-neutral-200"></div>
        </div>
      `;

      const boutiqueIcon = L.divIcon({
        html: boutiqueIconHtml,
        className: 'boutique-pin-custom',
        iconSize: [120, 36],
        iconAnchor: [60, 36],
      });

      const marker = L.marker([boutique.lat, boutique.lng], { icon: boutiqueIcon }).addTo(markersLayer);

      // Custom Rich Popup
      const popupContent = document.createElement('div');
      popupContent.className = 'p-1 min-w-[200px] text-neutral-900 font-sans';
      popupContent.innerHTML = `
        <div class="flex items-center gap-2 mb-1.5">
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
          <h4 class="font-bold text-sm text-neutral-900 leading-tight">${boutique.name}</h4>
        </div>
        <p class="text-xs text-neutral-500 mb-2">${boutique.specialty || ''}</p>
        <div class="flex items-center justify-between text-xs py-1 px-2 bg-neutral-50 rounded-lg mb-2.5 border border-neutral-200/60">
          <span class="text-neutral-600">⚡ Fast Dispatch:</span>
          <span class="font-bold text-blue-600">${boutique.doorstepMinutes} mins doorstep</span>
        </div>
        <div class="flex items-center justify-between text-[11px] text-neutral-500 mb-3">
          <span>📍 ${boutique.distanceText || boutique.distance + ' km'}</span>
          <span>⭐ ${boutique.rating || '4.9'} (${boutique.reviewCount || '100+'})</span>
        </div>
        <button id="btn-view-${boutique.id}" class="w-full py-1.5 px-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors text-center cursor-pointer">
          View Boutique & Racks
        </button>
      `;

      // Attach click listener for popup button
      marker.bindPopup(popupContent, {
        offset: [0, -32],
        maxWidth: 240,
        className: 'modern-custom-popup'
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-view-${boutique.id}`);
        if (btn) {
          btn.onclick = (e) => {
            e.stopPropagation();
            if (onNavigateBoutique) {
              onNavigateBoutique(boutique.id);
            }
          };
        }
      });
    });

    // 3. Simulated Live Courier GPS Beacons
    const courierPoints = [
      { lat: userLat + 0.005, lng: userLng + 0.004, label: 'Courier #04 (En route)', speed: '18 km/h' },
      { lat: userLat - 0.004, lng: userLng + 0.006, label: 'Courier #09 (Idle near hub)', speed: '0 km/h' },
      { lat: userLat + 0.008, lng: userLng - 0.005, label: 'Courier #14 (Dispatching)', speed: '24 km/h' },
    ];

    courierPoints.forEach((c) => {
      const courierHtml = `
        <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div class="w-6 h-6 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-md border border-white">
            <span class="material-symbols-outlined text-[13px]">two_wheeler</span>
          </div>
        </div>
      `;
      const courierIcon = L.divIcon({
        html: courierHtml,
        className: 'courier-pin-custom',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });
      L.marker([c.lat, c.lng], { icon: courierIcon }).addTo(couriersLayer);
    });

  }, [boutiques, userLat, userLng, location.neighborhood, onNavigateBoutique]);

  // Pan / Fly when radius or location changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (selectedRadius === 'soho') {
      // HKV / Shahpur Jat
      map.flyTo([28.5512, 77.2050], 14.2, { duration: 1 });
    } else if (selectedRadius === 'west-village') {
      // Khan Market / Lodhi Colony
      map.flyTo([28.5940, 77.2270], 14.0, { duration: 1 });
    } else if (selectedRadius === 'tribeca') {
      // Defence Colony / Greater Kailash
      map.flyTo([28.5600, 77.2320], 13.8, { duration: 1 });
    } else {
      // All hubs
      map.flyTo([userLat, userLng], 13.2, { duration: 1 });
    }
  }, [selectedRadius, userLat, userLng]);

  function handleRecenter() {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([userLat, userLng], 14.5, { duration: 0.8 });
    }
  }

  function handleFitBounds() {
    if (mapInstanceRef.current && boutiques.length > 0) {
      const bounds = L.latLngBounds([
        [userLat, userLng],
        ...boutiques.map((b) => [b.lat, b.lng]).filter(([lat, lng]) => lat && lng)
      ]);
      mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40] });
    }
  }

  return (
    <div className={`relative w-full h-[480px] rounded-xl overflow-hidden shadow-inner border border-outline-variant/30 ${className}`}>
      {/* Real Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Map Controls (Top-Left) */}
      <div className="absolute top-3 left-3 z-[400] flex items-center gap-1.5 bg-surface-container-lowest/90 backdrop-blur-md px-2 py-1 rounded-lg shadow-md border border-outline-variant/40">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="font-label-badge uppercase font-bold text-on-surface text-[11px]">
          Live GPS Telemetry Active
        </span>
      </div>

      {/* Floating Action Buttons (Top-Right under default zoom controls) */}
      <div className="absolute top-20 right-3 z-[400] flex flex-col gap-1.5">
        <button
          onClick={handleRecenter}
          title="Recenter on my location"
          className="w-8 h-8 rounded-lg bg-surface-container-lowest/95 backdrop-blur-md text-on-surface hover:text-primary flex items-center justify-center shadow-md border border-outline-variant/30 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">my_location</span>
        </button>
        <button
          onClick={handleFitBounds}
          title="View all Delhi boutiques"
          className="w-8 h-8 rounded-lg bg-surface-container-lowest/95 backdrop-blur-md text-on-surface hover:text-primary flex items-center justify-center shadow-md border border-outline-variant/30 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">crop_free</span>
        </button>
      </div>

      {/* Floating Live Fleet Telemetry Banner (Bottom) */}
      <div className="absolute bottom-3 left-3 right-3 z-[400] bg-inverse-surface/90 backdrop-blur-md p-2.5 rounded-lg flex items-center justify-between text-inverse-on-surface shadow-lg border border-white/10">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary-fixed text-[18px] animate-pulse">
            satellite_alt
          </span>
          <span className="font-body-sm text-[12px]">
            Real-Time Radar: <strong>{boutiques.length} Boutiques</strong> & <strong>14 Couriers</strong> tracked
          </span>
        </div>
        <span className="font-label-badge uppercase text-emerald-400 font-bold text-[11px] bg-emerald-950/60 px-2 py-0.5 rounded">
          GPS Calibrated
        </span>
      </div>
    </div>
  );
}
