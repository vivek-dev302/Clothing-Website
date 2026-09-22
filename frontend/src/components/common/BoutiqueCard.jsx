import React from 'react';

export default function BoutiqueCard({ boutique, previewProducts = [], onNavigate }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col gap-space-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-space-sm">
          <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center font-headline-sm font-bold text-on-surface">
            {boutique.shortCode || boutique.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 
                onClick={() => onNavigate && onNavigate(boutique.id)}
                className="font-headline-sm text-on-surface font-bold hover:text-primary cursor-pointer transition-colors"
              >
                {boutique.name}
              </h3>
              <span className="bg-tertiary-container text-on-tertiary-container font-label-badge uppercase px-2 py-0.5 rounded-full">
                {boutique.status}
              </span>
            </div>
            <p className="font-body-sm text-on-surface-variant">
              {boutique.specialty}
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-end shrink-0">
          <div className="flex items-center gap-1 text-tertiary font-headline-sm font-bold">
            <span className="material-symbols-outlined text-[20px]">bolt</span> {boutique.doorstepMinutes}m Doorstep
          </div>
          <span className="font-body-sm text-on-surface-variant">
            {boutique.distanceText} • Packs in {boutique.packTimeMinutes}m
          </span>
        </div>
      </div>

      {/* Mini Horizontal In-Stock Thumbnails */}
      <div className="pt-2 border-t border-surface-container-high/40">
        <div className="flex items-center justify-between mb-2">
          <span className="font-label-badge uppercase text-on-surface-variant font-semibold">
            Hot in-stock racks (Ready to courier):
          </span>
          <button
            onClick={() => onNavigate && onNavigate(boutique.id)}
            className="font-label-md text-primary hover:underline flex items-center gap-1"
          >
            Browse Boutique <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-space-sm">
          {previewProducts.slice(0, 3).map((prod) => (
            <div
              key={prod.id}
              onClick={() => onNavigate && onNavigate(boutique.id)}
              className="flex items-center gap-2 bg-surface-container-low p-1.5 rounded-lg group/item cursor-pointer hover:bg-surface-container transition-colors"
            >
              <img
                alt={prod.name}
                className="w-12 h-14 rounded object-cover shrink-0"
                src={prod.image}
              />
              <div className="min-w-0">
                <span className="font-label-md text-on-surface block truncate font-medium">
                  {prod.name}
                </span>
                <span className="font-body-sm text-on-surface-variant">
                  ₹{prod.price} • {prod.sizes ? prod.sizes.slice(0, 2).join(', ') : 'All'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
