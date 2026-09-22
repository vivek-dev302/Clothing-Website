import React from 'react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="w-full bg-surface-container-lowest mt-space-xl border-t-0 shadow-[0_-4px_24px_rgba(15,23,42,0.03)]">
      <div className="max-w-[1280px] mx-auto px-margin md:px-margin-desktop py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-gutter-desktop mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center text-on-primary font-bold shadow-sm">
                <span className="material-symbols-outlined text-[18px]">electric_bolt</span>
              </div>
              <span className="font-headline-sm text-on-surface font-bold tracking-tight">
                Near<span className="text-primary">Wear</span>
              </span>
            </div>

            <p className="font-body-md text-on-surface-variant max-w-sm">
              Hyper-local 30-minute fashion fulfillment connecting neighborhood designer boutiques with on-demand doorstep fitting and effortless immediate exchanges.
            </p>

            <div className="flex flex-wrap items-center gap-space-sm pt-2">
              <span className="flex items-center gap-1 bg-surface-container text-on-surface font-label-badge uppercase px-2.5 py-1 rounded-full">
                <span className="material-symbols-outlined text-[14px] text-tertiary-container">bolt</span> Instant Dispatch
              </span>
              <span className="flex items-center gap-1 bg-surface-container text-on-surface font-label-badge uppercase px-2.5 py-1 rounded-full">
                <span className="material-symbols-outlined text-[14px] text-tertiary-container">eco</span> 100% Zero Plastic
              </span>
              <span className="flex items-center gap-1 bg-surface-container text-on-surface font-label-badge uppercase px-2.5 py-1 rounded-full">
                <span className="material-symbols-outlined text-[14px] text-tertiary-container">timer</span> 10m Door Try-On
              </span>
            </div>
          </div>

          {/* Local Boutique Network */}
          <div className="flex flex-col gap-space-sm">
            <h4 className="font-headline-sm text-body-md text-on-surface font-semibold">
              Local Boutique Network
            </h4>
            <ul className="flex flex-col gap-2 font-body-sm text-on-surface-variant">
              <li>
                <button onClick={() => onNavigate && onNavigate('boutiques')} className="hover:text-on-surface transition-colors text-left">
                  HKV Independent Houses
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate && onNavigate('boutiques')} className="hover:text-on-surface transition-colors text-left">
                  Shahpur Jat Studios
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate && onNavigate('boutiques')} className="hover:text-on-surface transition-colors text-left">
                  Def Col Silk & Co
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate && onNavigate('boutiques')} className="hover:text-on-surface transition-colors text-left">
                  Shahpur Denim Guild
                </button>
              </li>
              <li>
                <span className="text-on-surface-variant/70">Partner Boutique Portal</span>
              </li>
            </ul>
          </div>

          {/* Fulfillment & Zones */}
          <div className="flex flex-col gap-space-sm">
            <h4 className="font-headline-sm text-body-md text-on-surface font-semibold">
              Fulfillment & Zones
            </h4>
            <ul className="flex flex-col gap-2 font-body-sm text-on-surface-variant">
              <li><span className="text-on-surface-variant">Active Delivery Corridors</span></li>
              <li><span className="text-on-surface-variant">10-Min Try-At-Door Policy</span></li>
              <li><span className="text-on-surface-variant">Garment Sanitization Guarantee</span></li>
              <li><span className="text-on-surface-variant">Courier Velocity Metrics</span></li>
              <li><span className="text-on-surface-variant">Sustainable Cargo Fleet</span></li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="flex flex-col gap-space-sm">
            <h4 className="font-headline-sm text-body-md text-on-surface font-semibold">
              Client Concierge
            </h4>
            <p className="font-body-sm text-on-surface-variant">
              Live neighborhood fitting specialist ready to dispatch alternate sizes instantly.
            </p>
            <div className="bg-surface-container-low p-space-sm rounded-xl flex flex-col gap-1">
              <span className="font-label-badge uppercase text-on-surface-variant">Direct Hotline</span>
              <span className="font-label-lg text-on-surface">+1 (800) NEAR-WEAR</span>
              <span className="font-body-sm text-tertiary flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-tertiary"></span> Average response &lt; 45s
              </span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-surface-container-high/60 flex flex-col md:flex-row items-center justify-between gap-space-md text-body-sm text-on-surface-variant">
          <div>
            © 2026 NearWear Technologies Inc. All rights reserved. Ultra-rapid neighborhood fashion logistics.
          </div>
          <div className="flex items-center gap-space-lg">
            <span className="hover:text-on-surface cursor-pointer transition-colors">Doorstep Privacy</span>
            <span className="hover:text-on-surface cursor-pointer transition-colors">Terms of Dispatch</span>
            <span className="hover:text-on-surface cursor-pointer transition-colors">Courier Safety</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
