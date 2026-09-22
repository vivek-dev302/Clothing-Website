import React from 'react';
import { useCart } from '../../context/CartContext';
import { useLocation } from '../../context/LocationContext';

export default function Navbar({ activePage = 'explore', onNavigate, onSearch }) {
  const { itemCount } = useCart();
  const { location, setLocationModalOpen } = useLocation();

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top Dispatch Velocity Ticker */}
      <div className="w-full bg-inverse-surface text-inverse-on-surface py-1.5 px-6">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between text-body-sm">
          <div className="flex items-center gap-space-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-fixed opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary-fixed"></span>
            </span>
            <span className="font-label-md text-inverse-on-surface">
              {location.dispatchHub}: {location.activeCouriers} boutique couriers active
            </span>
            <span className="text-outline-variant/60">•</span>
            <span className="text-inverse-on-surface/80 hidden sm:inline">
              Guaranteed doorstep arrival under 30 minutes
            </span>
          </div>
          <div className="flex items-center gap-space-lg">
            <span className="hidden lg:inline text-inverse-on-surface/80">
              10-Minute Try-at-Door Fitting Window
            </span>
            <span className="font-label-md text-tertiary-fixed">Zero Plastic Eco-Totes</span>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Header */}
      <header className="w-full bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)]">
        <div className="h-20 max-w-[1280px] mx-auto px-margin md:px-margin-desktop flex items-center justify-between gap-space-lg">
          {/* Logo & Delivery Location */}
          <div className="flex items-center gap-space-md shrink-0">
            <button
              onClick={() => onNavigate('explore')}
              className="flex items-center gap-space-sm group text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary font-bold shadow-sm">
                <span className="material-symbols-outlined text-[20px]">electric_bolt</span>
              </div>
              <span className="font-headline-sm text-on-surface tracking-tight font-bold">
                Near<span className="text-primary">Wear</span>
              </span>
            </button>

            <div className="h-6 w-px bg-surface-variant hidden sm:block"></div>

            <button 
              onClick={() => setLocationModalOpen && setLocationModalOpen(true)}
              className="flex items-center gap-space-xs bg-surface-container-low hover:bg-surface-container hover:text-on-surface transition-all px-space-sm py-1.5 rounded-full text-left"
            >
              <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
              <div className="flex flex-col">
                <span className="font-label-badge uppercase text-on-surface-variant">Delivering to</span>
                <span className="font-label-md text-on-surface max-w-[140px] truncate">
                  {location.address}
                </span>
              </div>
              <span className="bg-tertiary-container text-on-tertiary-container font-label-badge uppercase px-1.5 py-0.5 rounded-full ml-1">
                {location.deliveryEtaMin}-{location.deliveryEtaMax}m
              </span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md items-center relative">
            <div className="w-full relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">
                search
              </span>
              <input
                onChange={(e) => onSearch && onSearch(e.target.value)}
                className="w-full h-11 pl-10 pr-16 bg-surface-container-low focus:bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant font-body-sm rounded-full outline-none transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] focus:ring-2 focus:ring-primary/20"
                placeholder="Search local boutiques, blazers, silk slip, mac..."
                type="text"
              />
              <kbd className="absolute right-3.5 px-2 py-0.5 text-[10px] font-label-badge uppercase bg-surface-container-high text-on-surface-variant rounded-md shadow-sm">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Nav Links & Action Buttons */}
          <div className="flex items-center gap-space-md shrink-0">
            <nav className="hidden xl:flex items-center gap-space-xs">
              <button
                onClick={() => onNavigate('explore')}
                className={`px-space-sm py-2 transition-colors font-label-lg rounded-full ${
                  activePage === 'explore'
                    ? 'bg-primary-container text-on-primary-container font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Explore
              </button>

              <button
                onClick={() => onNavigate('clothing')}
                className={`px-space-sm py-2 transition-colors font-label-lg rounded-full ${
                  activePage === 'clothing'
                    ? 'bg-primary-container text-on-primary-container font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Clothing Categories
              </button>

              <button
                onClick={() => onNavigate('boutiques')}
                className={`px-space-sm py-2 transition-colors font-label-lg rounded-full ${
                  activePage === 'boutiques'
                    ? 'bg-primary-container text-on-primary-container font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Boutiques
              </button>
            </nav>

            {/* Live Order Active Beacon */}
            <button
              onClick={() => onNavigate('cart')}
              className="flex items-center gap-space-xs bg-surface-container-low hover:bg-surface-container hover:text-on-surface text-on-surface px-space-sm py-2 rounded-full transition-all shadow-sm"
            >
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary-container"></span>
              </span>
              <span className="font-label-md truncate max-w-[130px] hidden sm:inline">
                #WN-8842 en route
              </span>
              <span className="bg-tertiary-fixed text-on-tertiary-fixed font-label-badge px-1.5 py-0.5 rounded-full">
                8m
              </span>
            </button>

            {/* Try Bag Icon with Counter */}
            <button
              onClick={() => onNavigate('cart')}
              aria-label="Try Bag"
              className="relative p-2 rounded-full bg-surface-container-low hover:bg-surface-container hover:text-on-surface text-on-surface transition-all"
            >
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-on-primary font-label-badge w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-surface-container-lowest">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Profile Avatar */}
            <div className="flex items-center pl-1 shrink-0">
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-surface-container-high"
                src="https://lh3.googleusercontent.com/aida/AEtjO1XhYliciF9I5pSqKsLms7W8wmEDI7nCGS-fz-D1kwGW7H4iV8gD5Y-IViwj1Nbb4BQKrT63ithoNr-T-gjHS2Qmqn8yifJQSpkSHyJslWwY4y49mbxOE-WHn5VGM6TUSw1q7dfM3bFvX52lh1N-cZaGZ4sldsyjcafGYEzUCosH3JHsZBvbWD8WKx_ei4zYO1EBs7OOWYzVG1BrCrxXnz3wHat48NvVjA3Hg6T8GJv5FRHU0UvyfRoDFw"
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
