import React from 'react';

const CATEGORIES = [
  { id: 'all', name: 'All Pieces' },
  { id: 'Shirting', name: 'Shirting & Tops' },
  { id: 'Tailoring', name: 'Tailoring & Blazers' },
  { id: 'Outerwear', name: 'Outerwear & Jackets' },
  { id: 'Trousers', name: 'Trousers & Pants' },
  { id: 'Dresses', name: 'Dresses & Silks' },
  { id: 'Tees', name: 'Heavy Cotton Tees' },
  { id: 'Denim', name: 'Japanese Selvedge Denim' }
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '30', '32', '34', '38R', '40R'];

export default function CatalogFilterSidebar({
  selectedCategory = 'all',
  onSelectCategory,
  maxDeliveryMin = 30,
  onMaxDeliveryChange,
  selectedSize = null,
  onSelectSize,
  onResetFilters
}) {
  return (
    <aside className="w-full lg:w-72 bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-6 shrink-0 h-fit">
      {/* Header & Reset */}
      <div className="flex items-center justify-between border-b border-surface-container pb-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-on-surface text-[20px]">tune</span>
          <span className="font-headline-sm text-on-surface font-bold">Filters</span>
        </div>
        <button
          onClick={onResetFilters}
          className="font-label-md text-primary hover:underline"
        >
          Reset All
        </button>
      </div>

      {/* 1. Delivery Velocity Slider */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-on-surface font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-primary text-[16px]">bolt</span>
            Max Doorstep ETA
          </span>
          <span className="font-label-badge bg-tertiary-container text-on-tertiary-container px-2 py-0.5 rounded-full">
            ≤ {maxDeliveryMin} mins
          </span>
        </div>
        <input
          type="range"
          min="10"
          max="35"
          step="5"
          value={maxDeliveryMin}
          onChange={(e) => onMaxDeliveryChange(Number(e.target.value))}
          className="w-full accent-primary cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-on-surface-variant font-label-badge">
          <span>10 min</span>
          <span>20 min</span>
          <span>35 min</span>
        </div>
      </div>

      {/* 2. Category Breakdown */}
      <div className="flex flex-col gap-2">
        <span className="font-label-md text-on-surface font-semibold">Category</span>
        <div className="flex flex-col gap-1">
          {CATEGORIES.map((c) => {
            const isSelected = selectedCategory === c.id || (c.id === 'all' && selectedCategory === 'all');
            return (
              <button
                key={c.id}
                onClick={() => onSelectCategory(c.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-left text-body-sm transition-colors ${
                  isSelected
                    ? 'bg-inverse-surface text-inverse-on-surface font-semibold'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Sizes In Stock */}
      <div className="flex flex-col gap-2">
        <span className="font-label-md text-on-surface font-semibold">Sizes In-Stock Now</span>
        <div className="flex flex-wrap gap-1.5">
          {SIZES.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                onClick={() => onSelectSize(isSelected ? null : size)}
                className={`px-3 py-1 text-label-md rounded font-medium transition-colors ${
                  isSelected
                    ? 'bg-primary text-on-primary font-bold'
                    : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Trust Guarantee Note */}
      <div className="bg-surface-container-low p-3 rounded-lg flex items-start gap-2 text-body-sm text-on-surface-variant">
        <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">
          verified
        </span>
        <p className="text-xs">
          All orders include our <strong>10-minute doorstep try-on guarantee</strong>. The courier waits outside while you check the fit.
        </p>
      </div>
    </aside>
  );
}
