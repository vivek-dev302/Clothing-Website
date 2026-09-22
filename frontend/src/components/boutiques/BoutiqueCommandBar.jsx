import React from 'react';

export default function BoutiqueCommandBar({
  searchQuery = '',
  onSearchChange,
  fastOnly = false,
  onToggleFastOnly,
  sortBy = 'speed',
  onSortChange
}) {
  return (
    <section className="max-w-[1280px] w-full mx-auto px-margin md:px-margin-desktop mb-space-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest p-space-sm rounded-xl shadow-sm">
        {/* Live Search Input */}
        <div className="relative flex-1 flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Filter partner boutiques, designers, locations..."
            className="w-full h-11 pl-10 pr-4 bg-surface-container-low focus:bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant font-body-sm rounded-lg outline-none transition-all focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Feature Chips & Fast Sort */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onToggleFastOnly(!fastOnly)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-label-md transition-all ${
              fastOnly
                ? 'bg-primary text-on-primary font-bold shadow-sm'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            <span>&lt; 18m Doorstep Only</span>
          </button>

          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="h-10 px-3 bg-surface-container text-on-surface font-label-md rounded-lg outline-none cursor-pointer hover:bg-surface-container-high transition-colors"
          >
            <option value="speed">Fastest Dispatch</option>
            <option value="distance">Closest Distance</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>
    </section>
  );
}
