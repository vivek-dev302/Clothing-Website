import React from 'react';
import ProductCard from '../common/ProductCard';

export default function CatalogProductGrid({ products = [], onResetFilters, onSelectProduct }) {
  if (products.length === 0) {
    return (
      <div className="flex-1 bg-surface-container-lowest rounded-xl p-12 text-center flex flex-col items-center justify-center gap-3 shadow-sm min-h-[400px]">
        <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
          <span className="material-symbols-outlined text-[32px]">inventory_2</span>
        </div>
        <h3 className="font-headline-sm text-on-surface font-bold">No garments match current criteria</h3>
        <p className="font-body-md text-on-surface-variant max-w-sm">
          Try loosening your delivery window or resetting size and category filters to browse more local racks.
        </p>
        <button
          onClick={onResetFilters}
          className="mt-2 px-6 py-2.5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-lg shadow-sm transition-all"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-gutter-desktop">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={onSelectProduct}
          />
        ))}
      </div>
    </div>
  );
}
