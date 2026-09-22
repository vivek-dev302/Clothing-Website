import React, { useState } from 'react';
import { useLocation } from '../../context/LocationContext';

const SAVED_ADDRESSES = [
  { address: 'B-12 Hauz Khas Village, New Delhi', neighborhood: 'Hauz Khas Village', label: 'Home', coords: { lat: 28.5535, lng: 77.1944 } },
  { address: '14 Shahpur Jat, Siri Fort Road', neighborhood: 'Shahpur Jat', label: 'Studio', coords: { lat: 28.5489, lng: 77.2155 } },
  { address: 'Khan Market, Block C, New Delhi', neighborhood: 'Khan Market', label: 'Office', coords: { lat: 28.6000, lng: 77.2270 } },
  { address: 'C-4 Defence Colony Market, New Delhi', neighborhood: 'Defence Colony', label: 'Work', coords: { lat: 28.5727, lng: 77.2312 } }
];

export default function LocationModal() {
  const { location, locationModalOpen, setLocationModalOpen, updateAddress } = useLocation();
  const [customAddress, setCustomAddress] = useState('');

  if (!locationModalOpen) return null;

  function handleCustomSubmit(e) {
    e.preventDefault();
    if (customAddress.trim()) {
      updateAddress(customAddress.trim(), 'Hauz Khas Village');
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface-container-lowest max-w-md w-full rounded-2xl p-6 shadow-2xl flex flex-col gap-4 border border-outline-variant/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-on-surface">
            <span className="material-symbols-outlined text-primary text-[24px]">location_on</span>
            <h3 className="font-headline-sm font-bold">Select Delivery Doorstep</h3>
          </div>
          <button
            onClick={() => setLocationModalOpen(false)}
            className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="font-body-sm text-on-surface-variant">
          Delivery speeds are computed in real-time from active neighborhood dispatch hubs.
        </p>

        {/* Saved Addresses List */}
        <div className="flex flex-col gap-2">
          {SAVED_ADDRESSES.map((item) => {
            const isCurrent = location.address === item.address;
            return (
              <button
                key={item.address}
                onClick={() => updateAddress(item.address, item.neighborhood, item.coords)}
                className={`p-3 rounded-xl text-left flex items-center justify-between border transition-all ${
                  isCurrent
                    ? 'border-primary bg-primary/5 text-on-surface font-semibold'
                    : 'border-surface-container hover:bg-surface-container-low text-on-surface'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-label-badge uppercase px-2 py-0.5 rounded bg-surface-container text-on-surface font-bold">
                    {item.label}
                  </span>
                  <span className="text-body-sm">{item.address}</span>
                </div>
                {isCurrent && (
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    check_circle
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Manual Address Input */}
        <form onSubmit={handleCustomSubmit} className="pt-2 flex flex-col gap-2">
          <span className="font-label-badge uppercase text-on-surface-variant">Or Enter Address</span>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. 14 Shahpur Jat, New Delhi"
              value={customAddress}
              onChange={(e) => setCustomAddress(e.target.value)}
              className="flex-1 h-10 px-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary font-label-md rounded-lg shadow-sm"
            >
              Set
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
