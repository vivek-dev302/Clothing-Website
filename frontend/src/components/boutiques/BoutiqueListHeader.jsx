import React from 'react';

export default function BoutiqueListHeader() {
  return (
    <section className="w-full bg-surface-container-lowest shadow-sm mb-space-lg">
      <div className="max-w-[1280px] mx-auto px-margin md:px-margin-desktop py-8">
        <div className="flex items-center gap-2 text-tertiary mb-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
          </span>
          <span className="font-label-badge uppercase tracking-wider font-bold">
            Local Fashion Delivery
          </span>
        </div>

        <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
          Discover Local Boutiques
        </h1>
        <p className="font-body-md text-on-surface-variant max-w-xl mt-1">
          Order directly from boutique racks near you. Couriers collect within minutes with protective garment bags.
        </p>
      </div>
    </section>
  );
}
