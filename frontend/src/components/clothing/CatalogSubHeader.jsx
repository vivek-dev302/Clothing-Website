import React from 'react';

export default function CatalogSubHeader({ totalProducts = 12, activeCategory = 'All' }) {
  return (
    <section className="w-full bg-surface-container-lowest shadow-sm mb-space-lg">
      <div className="max-w-[1280px] mx-auto px-margin md:px-margin-desktop py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
              </span>
              <span className="font-label-badge uppercase tracking-wider text-tertiary font-bold">
                HKV Fast Corridor Active
              </span>
              <span className="text-outline-variant/60">•</span>
              <span className="font-label-badge uppercase text-on-surface-variant">
                Live Rack Sync
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              Ready-to-Wear Catalog
            </h1>
            <p className="font-body-md text-on-surface-variant">
              Showing {totalProducts} steamed pieces ready for immediate courier pickup within 1.5 km.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-surface-container-low px-4 py-2 rounded-full flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
              <span className="font-label-md text-on-surface">Average Dispatch: <strong>14 mins</strong></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
