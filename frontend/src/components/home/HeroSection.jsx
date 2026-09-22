import React from 'react';

export default function HeroSection({ onExploreClick }) {
  return (
    <section className="max-w-[1280px] mx-auto w-full px-margin md:px-margin-desktop py-space-md">
      <div className="relative overflow-hidden rounded-xl bg-inverse-surface text-inverse-on-surface shadow-xl">
        {/* Background Ambient Visual Composition */}
        <div className="absolute inset-0 opacity-25 mix-blend-luminosity">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB3xEGcnwViDabMNUSFkWUHGCd7-jBnepLWcu4GNZ6HhT93h9DUWhahXO-kuq0ZwFxgPHTK93S4yRIwKTOF70wtleuYYrIYzgfV6YdmNKWfJgiDMSRNC2KaAkkItgcszSRLQGv9eEn46C39LcqOk6xCDmx8UynLT9gZvBHi3Y7cYO5_OZAyxPaXR1rfuwyqxN13AHVgnhMmr1jXQ5eHdouKc2WscWBtOCu28b8dfyTUKYKCpCfaPnGM')",
            }}
          ></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-inverse-surface via-inverse-surface/90 to-transparent"></div>

        {/* Hero Body */}
        <div className="relative z-10 p-space-lg lg:p-space-xl flex flex-col justify-between min-h-[460px]">
          <div className="max-w-2xl flex flex-col gap-space-md">
            <div className="inline-flex items-center gap-space-xs bg-primary/20 backdrop-blur-md px-3 py-1 rounded-full w-fit">
              <span className="material-symbols-outlined text-inverse-primary text-[18px]">
                electric_bolt
              </span>
              <span className="font-label-badge uppercase text-inverse-primary tracking-wider">
                Zero-Delay Neighborhood Courier Network
              </span>
            </div>

            <h1 className="font-display-lg text-display-lg text-inverse-on-surface tracking-tight leading-none">
              Curated Fashion Delivered in{' '}
              <span className="text-inverse-primary underline decoration-primary decoration-wavy decoration-2 underline-offset-8">
                28 Minutes
              </span>
              .
            </h1>

            <p className="font-body-lg text-inverse-on-surface/80 max-w-xl">
              Pre-steamed, lint-free, and directly sourced from top local designer racks to your doorstep. Fitted in 10 minutes at your mirror while your boutique courier waits.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-lg shadow-md transition-transform active:scale-95 flex items-center gap-2"
              >
                <span>Shop Ready Now</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Hero Stats Strip */}
          <div className="pt-space-md grid grid-cols-2 md:grid-cols-4 gap-space-md">
            <div className="bg-inverse-surface/60 backdrop-blur-md p-space-sm rounded-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-on-tertiary-container text-[20px]">
                  moped
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-headline-sm text-inverse-on-surface font-bold">32 Couriers</span>
                <span className="font-label-badge uppercase text-inverse-on-surface/70 truncate">Active nearby</span>
              </div>
            </div>

            <div className="bg-inverse-surface/60 backdrop-blur-md p-space-sm rounded-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-on-primary text-[20px]">timer</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-headline-sm text-inverse-on-surface font-bold">3.4 mins</span>
                <span className="font-label-badge uppercase text-inverse-on-surface/70 truncate">Avg Dispatch</span>
              </div>
            </div>

            <div className="bg-inverse-surface/60 backdrop-blur-md p-space-sm rounded-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container-high/40 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-inverse-on-surface text-[20px]">storefront</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-headline-sm text-inverse-on-surface font-bold">18 Boutiques</span>
                <span className="font-label-badge uppercase text-inverse-on-surface/70 truncate">Open right now</span>
              </div>
            </div>

            <div className="bg-inverse-surface/60 backdrop-blur-md p-space-sm rounded-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-on-tertiary text-[20px]">door_front</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-headline-sm text-inverse-on-surface font-bold">10-Min Try-On</span>
                <span className="font-label-badge uppercase text-inverse-on-surface/70 truncate">Doorstep wait guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
