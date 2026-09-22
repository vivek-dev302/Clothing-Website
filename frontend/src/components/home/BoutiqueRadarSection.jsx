import React, { useState } from 'react';
import BoutiqueCard from '../common/BoutiqueCard';
import LiveLocationMap from './LiveLocationMap';

export default function BoutiqueRadarSection({ boutiques = [], products = [], onNavigateBoutique }) {
  const [selectedRadius, setSelectedRadius] = useState('all');

  return (
    <section className="max-w-[1280px] mx-auto w-full px-margin md:px-margin-desktop py-space-xl">
      <div className="flex flex-col gap-space-md">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-space-xs text-tertiary mb-1">
              <span className="material-symbols-outlined text-[18px]">radar</span>
              <span className="font-label-badge uppercase font-bold tracking-wider">
                Live Inventory Radar
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Active Neighborhood Dispatch Hubs
            </h2>
            <p className="font-body-md text-on-surface-variant max-w-xl">
              Partner boutiques physically packing clothes within 4 minutes. Real-time rack availability synchronized with courier dispatch beacons.
            </p>
          </div>

          {/* Radius Selector Pill */}
          <div className="flex items-center flex-wrap bg-surface-container-low p-1 rounded-full shrink-0 gap-1">
            <button
              onClick={() => setSelectedRadius('all')}
              className={`px-3 py-1.5 rounded-full font-label-badge uppercase font-semibold transition-all ${
                selectedRadius === 'all'
                  ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              All Hubs
            </button>
            <button
              onClick={() => setSelectedRadius('soho')}
              className={`px-3 py-1.5 rounded-full font-label-badge uppercase font-semibold transition-all ${
                selectedRadius === 'soho'
                  ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              HKV / Shahpur Jat (1.5 km)
            </button>
            <button
              onClick={() => setSelectedRadius('west-village')}
              className={`px-3 py-1.5 rounded-full font-label-badge uppercase font-semibold transition-all ${
                selectedRadius === 'west-village'
                  ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Khan Market (2.0 km)
            </button>
            <button
              onClick={() => setSelectedRadius('tribeca')}
              className={`px-3 py-1.5 rounded-full font-label-badge uppercase font-semibold transition-all ${
                selectedRadius === 'tribeca'
                  ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Def Colony (3.0 km)
            </button>
          </div>
        </div>

        {/* Map & Radar Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
          {/* Real Interactive Map View */}
          <div className="lg:col-span-5 w-full bg-surface-container-lowest rounded-xl p-space-sm shadow-sm flex flex-col gap-space-sm">
            <LiveLocationMap
              boutiques={boutiques}
              selectedRadius={selectedRadius}
              onNavigateBoutique={onNavigateBoutique}
            />

            <div className="flex items-center justify-between px-1 text-body-sm text-on-surface-variant">
              <span>
                Average courier pickup time: <strong className="text-on-surface">2.8 mins</strong>
              </span>
              <span className="text-tertiary flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span> Zero congestion
              </span>
            </div>
          </div>

          {/* Boutique Cards List */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            {boutiques.slice(0, 3).map((boutique) => {
              const boutiqueProducts = products.filter(
                (p) => p.boutiqueId === boutique.id
              );
              return (
                <BoutiqueCard
                  key={boutique.id}
                  boutique={boutique}
                  previewProducts={boutiqueProducts}
                  onNavigate={onNavigateBoutique}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
