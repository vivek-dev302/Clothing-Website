import React from 'react';

export default function BoutiqueSidebar({ boutique }) {
  if (!boutique) return null;

  return (
    <aside className="w-full lg:w-80 flex flex-col gap-space-md shrink-0">
      {/* Dispatch Telemetry Card */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-3">
        <div className="flex items-center gap-2 text-on-surface">
          <span className="material-symbols-outlined text-primary text-[20px]">near_me</span>
          <h3 className="font-headline-sm font-bold">Dispatch Corridors</h3>
        </div>
        <p className="font-body-sm text-on-surface-variant">
          Fast doorstep delivery within your area. Couriers pre-positioned and ready to dispatch.
        </p>

        <div className="p-3 bg-surface-container-low rounded-lg flex flex-col gap-2">
          <div className="flex justify-between text-body-sm">
            <span className="text-on-surface-variant">Your Distance:</span>
            <strong className="text-on-surface">{boutique.distanceText}</strong>
          </div>
          <div className="flex justify-between text-body-sm">
            <span className="text-on-surface-variant">Estimated Arrival:</span>
            <strong className="text-tertiary">{boutique.doorstepMinutes} mins</strong>
          </div>
          <div className="flex justify-between text-body-sm">
            <span className="text-on-surface-variant">Eco Cargo Fleet:</span>
            <span className="font-semibold text-on-surface">E-Bikes Active</span>
          </div>
        </div>
      </div>

      {/* In-Store Fitting Concierge */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-3">
        <div className="flex items-center gap-2 text-on-surface">
          <span className="material-symbols-outlined text-tertiary text-[20px]">support_agent</span>
          <h3 className="font-headline-sm font-bold">Store Concierge</h3>
        </div>
        <p className="font-body-sm text-on-surface-variant">
          Need alternate sizes sent in the same drop? Contact this boutique's direct floor stylist.
        </p>
        <div className="p-3 bg-surface-container-low rounded-lg flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-badge uppercase text-on-surface-variant">Floor Stylist</span>
            <span className="font-label-md text-on-surface">+91 98100 88932</span>
          </div>
          <span className="material-symbols-outlined text-tertiary text-[24px]">call</span>
        </div>
      </div>

      {/* 10-Minute Door Fitting Policy */}
      <div className="bg-primary/5 border border-primary/20 p-space-md rounded-xl flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-primary">
          <span className="material-symbols-outlined text-[18px]">verified_user</span>
          <span className="font-label-md font-bold">10-Minute Fitting Window</span>
        </div>
        <p className="font-body-sm text-on-surface-variant text-xs leading-relaxed">
          The courier stays at your door for up to 10 minutes. If something doesn't fit, hand it right back in the reusable eco-tote. Instant refund or swap.
        </p>
      </div>
    </aside>
  );
}
