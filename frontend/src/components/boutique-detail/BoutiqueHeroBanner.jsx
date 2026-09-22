import React from 'react';

export default function BoutiqueHeroBanner({ boutique }) {
  if (!boutique) return null;

  return (
    <section className="w-full bg-surface-container-lowest shadow-sm mb-space-lg">
      <div className="max-w-[1280px] mx-auto px-margin md:px-margin-desktop py-8">
        {/* Cover & Brand Info */}
        <div className="relative rounded-2xl overflow-hidden bg-surface-container-low min-h-[260px] md:min-h-[320px] flex flex-col justify-end p-6 md:p-8 text-inverse-on-surface shadow-md">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${boutique.coverImage}')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/95 via-inverse-surface/60 to-transparent"></div>

          {/* Hero Bottom Info */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-surface-container-lowest text-on-surface flex items-center justify-center font-headline-lg font-extrabold shadow-lg shrink-0">
                {boutique.shortCode}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <h1 className="font-display-lg text-headline-lg md:text-display-lg font-bold text-inverse-on-surface tracking-tight">
                    {boutique.name}
                  </h1>
                  <span className="bg-tertiary-container text-on-tertiary-container font-label-badge uppercase px-2.5 py-0.5 rounded-full font-semibold">
                    {boutique.status}
                  </span>
                </div>
                <p className="font-body-md text-inverse-on-surface/80 max-w-lg mt-1">
                  {boutique.specialty}
                </p>
                <div className="flex items-center gap-4 text-body-sm text-inverse-on-surface/70 mt-2">
                  <span>Hours: <strong>{boutique.hours}</strong></span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-tertiary-fixed font-semibold">
                    <span className="material-symbols-outlined text-[16px]">star</span> {boutique.rating} ({boutique.reviewCount} verified drops)
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Dispatch Badge */}
            <div className="bg-inverse-surface/80 backdrop-blur-md px-5 py-3 rounded-xl border border-outline/30 flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-[20px]">bolt</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-badge uppercase text-inverse-primary font-bold tracking-wider">
                  Doorstep Speed
                </span>
                <span className="font-headline-sm text-inverse-on-surface font-bold">
                  {boutique.doorstepMinutes} Minutes
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry Matrix Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm mt-4">
          <div className="bg-surface-container-low p-3.5 rounded-xl flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[22px]">moped</span>
            <div className="flex flex-col">
              <span className="font-label-badge uppercase text-on-surface-variant">Courier Beacon</span>
              <span className="font-label-md text-on-surface font-bold">Active ({boutique.couriersActive} standby)</span>
            </div>
          </div>

          <div className="bg-surface-container-low p-3.5 rounded-xl flex items-center gap-3">
            <span className="material-symbols-outlined text-tertiary text-[22px]">timer</span>
            <div className="flex flex-col">
              <span className="font-label-badge uppercase text-on-surface-variant">Rack Prep Speed</span>
              <span className="font-label-md text-on-surface font-bold">{boutique.packTimeMinutes} mins avg</span>
            </div>
          </div>

          <div className="bg-surface-container-low p-3.5 rounded-xl flex items-center gap-3">
            <span className="material-symbols-outlined text-on-surface text-[22px]">iron</span>
            <div className="flex flex-col">
              <span className="font-label-badge uppercase text-on-surface-variant">Garment Standard</span>
              <span className="font-label-md text-on-surface font-bold">Pre-steamed on hanger</span>
            </div>
          </div>

          <div className="bg-surface-container-low p-3.5 rounded-xl flex items-center gap-3">
            <span className="material-symbols-outlined text-tertiary-fixed-variant text-[22px]">door_front</span>
            <div className="flex flex-col">
              <span className="font-label-badge uppercase text-on-surface-variant">Fitting Window</span>
              <span className="font-label-md text-on-surface font-bold">10-min wait at door</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
