import React, { createContext, useContext, useState } from 'react';

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [location, setLocation] = useState({
    address: 'B-12 Hauz Khas Village, New Delhi',
    neighborhood: 'Hauz Khas Village',
    city: 'New Delhi',
    lat: 28.5535,
    lng: 77.1944,
    dispatchHub: 'HKV Dispatch Hub',
    activeCouriers: 14,
    deliveryEtaMin: 18,
    deliveryEtaMax: 28,
    isRushHourReady: true
  });

  const [locationModalOpen, setLocationModalOpen] = useState(false);

  function updateAddress(newAddress, newNeighborhood, coords) {
    const defaultCoords = coords || (
      newNeighborhood?.includes('Shahpur') ? { lat: 28.5489, lng: 77.2155 } :
      newNeighborhood?.includes('Khan') ? { lat: 28.6000, lng: 77.2270 } :
      newNeighborhood?.includes('Defence') || newNeighborhood?.includes('Def') ? { lat: 28.5727, lng: 77.2312 } :
      { lat: 28.5535, lng: 77.1944 }
    );
    setLocation(prev => ({
      ...prev,
      address: newAddress,
      neighborhood: newNeighborhood || prev.neighborhood,
      lat: defaultCoords.lat,
      lng: defaultCoords.lng
    }));
    setLocationModalOpen(false);
  }

  return (
    <LocationContext.Provider
      value={{
        location,
        locationModalOpen,
        setLocationModalOpen,
        updateAddress
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) throw new Error('useLocation must be used within a LocationProvider');
  return context;
}
