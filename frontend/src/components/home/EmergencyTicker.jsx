import React from 'react';

export default function EmergencyTicker() {
  return (
    <div className="max-w-[1280px] mx-auto w-full px-margin md:px-margin-desktop pt-4 pb-2">
      <div className="flex items-center justify-between bg-surface-container-lowest px-space-md py-2.5 rounded-full shadow-sm">
        <div className="flex items-center gap-space-sm min-w-0">
          <span className="flex h-2.5 w-2.5 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
          </span>
          <span className="font-label-badge uppercase tracking-wider text-primary font-bold shrink-0">
            High Velocity Zone
          </span>
          <span className="text-outline-variant/50 shrink-0">|</span>
          <p className="font-body-sm text-on-surface truncate">
            <span className="font-semibold text-on-surface">Rush Hour Ready:</span> Couriers pre-positioned at Aurobindo Marg & Hauz Khas Village for sub-25m drops.
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-space-md shrink-0">
          <span className="font-label-md text-tertiary flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">check_circle</span> Pre-steamed garment guarantee
          </span>
          <span className="font-label-badge uppercase bg-surface-container text-on-surface px-2 py-0.5 rounded-full">
            Delhi NCR Fleet
          </span>
        </div>
      </div>
    </div>
  );
}
