import React from 'react';

const SCENARIOS = [
  { id: 'all', label: 'All Emergencies', icon: 'apps', badge: '42 items' },
  { id: 'coffee', label: 'Spilled Coffee & Fresh Shirt', icon: 'coffee', badge: '< 18m' },
  { id: 'dinner', label: 'Last-Minute Dinner Date', icon: 'restaurant', badge: '< 22m' },
  { id: 'boardroom', label: 'Emergency Boardroom Blazer', icon: 'work', badge: '< 19m' },
  { id: 'rain', label: 'Sudden Rainstorm Layers', icon: 'rainy', badge: '< 14m' }
];

export default function EmergencySelector({ activeScenario = 'all', onSelectScenario }) {
  return (
    <section className="max-w-[1280px] mx-auto w-full px-margin md:px-margin-desktop pt-space-md pb-space-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[22px]">crisis_alert</span>
          <span className="font-headline-sm text-on-surface">Emergency Sartorial Needs</span>
        </div>
        <span className="font-body-sm text-on-surface-variant hidden md:inline">
          Instant filtering across 18 partner racks
        </span>
      </div>

      {/* Filter Buttons Bar */}
      <div className="flex items-center gap-space-sm overflow-x-auto pb-2 scrollbar-none">
        {SCENARIOS.map((s) => {
          const isActive = activeScenario === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSelectScenario(s.id)}
              className={`flex items-center gap-2 px-space-md py-2 rounded-full font-label-lg transition-all shadow-sm shrink-0 ${
                isActive
                  ? 'bg-inverse-surface text-inverse-on-surface shadow-sm'
                  : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-low'
              }`}
            >
              <span className={`material-symbols-outlined text-[18px] ${isActive ? '' : 'text-primary'}`}>
                {s.icon}
              </span>
              <span>{s.label}</span>
              <span
                className={`ml-1 font-label-badge px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-surface-container-high/30 text-inverse-on-surface'
                    : 'bg-surface-container text-on-surface-variant'
                }`}
              >
                {s.badge}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
