import React, { useEffect } from 'react';
import EmergencyTicker from '../components/home/EmergencyTicker';
import HeroSection from '../components/home/HeroSection';
import InstantDropsSection from '../components/home/InstantDropsSection';
import BoutiqueRadarSection from '../components/home/BoutiqueRadarSection';
import { getProducts } from '../api/productsApi';
import { getBoutiques } from '../api/boutiquesApi';
import { useState } from 'react';

export default function HomePage({ onNavigate, onNavigateBoutique }) {
  const [products, setProducts] = useState([]);
  const [boutiques, setBoutiques] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [prods, bts] = await Promise.all([
          getProducts(),
          getBoutiques()
        ]);
        setProducts(prods);
        setBoutiques(bts);
      } catch (err) {
        console.error('Failed loading home data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <EmergencyTicker />
      
      <HeroSection onExploreClick={() => onNavigate('clothing')} />
      
      <InstantDropsSection
        products={products}
        onSelectProduct={(prod) => onNavigateBoutique(prod.boutiqueId)}
      />
      
      <BoutiqueRadarSection
        boutiques={boutiques}
        products={products}
        onNavigateBoutique={onNavigateBoutique}
      />
    </div>
  );
}
