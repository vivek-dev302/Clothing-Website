import React from 'react';
import ProductCard from '../common/ProductCard';

export default function InstantDropsSection({ products = [], onSelectProduct }) {
  return (
    <section className="max-w-[1280px] mx-auto w-full px-margin md:px-margin-desktop py-space-md">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-md gap-2">
        <div>
          <div className="flex items-center gap-space-xs text-primary mb-1">
            <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
            <span className="font-label-badge uppercase font-bold tracking-wider">
              Hyper-Local Speed Rack
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Instant Ready-to-Wear Drops
          </h2>
        </div>

        <div className="flex items-center gap-space-sm text-body-sm text-on-surface-variant">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
            Steamed & packaged in protective cotton garbags
          </span>
        </div>
      </div>

      {/* Product Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={onSelectProduct}
          />
        ))}
      </div>
    </section>
  );
}
