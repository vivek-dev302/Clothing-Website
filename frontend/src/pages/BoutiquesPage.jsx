import React, { useState, useEffect } from 'react';
import BoutiqueListHeader from '../components/boutiques/BoutiqueListHeader';
import BoutiqueCommandBar from '../components/boutiques/BoutiqueCommandBar';
import BoutiqueCard from '../components/common/BoutiqueCard';
import { getBoutiques } from '../api/boutiquesApi';
import { getProducts } from '../api/productsApi';

export default function BoutiquesPage({ onNavigateBoutique }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [fastOnly, setFastOnly] = useState(false);
  const [sortBy, setSortBy] = useState('speed');

  const [boutiques, setBoutiques] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [bts, prods] = await Promise.all([
          getBoutiques(),
          getProducts()
        ]);
        setBoutiques(bts);
        setProducts(prods);
      } catch (err) {
        console.error('Failed loading boutiques page data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter and sort boutiques
  const filteredBoutiques = boutiques
    .filter((b) => {
      if (fastOnly && b.doorstepMinutes > 18) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (
          !b.name.toLowerCase().includes(q) &&
          !b.specialty.toLowerCase().includes(q)
        ) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'speed') return a.doorstepMinutes - b.doorstepMinutes;
      if (sortBy === 'distance') return a.distance - b.distance;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="flex flex-col w-full min-h-screen">
      <BoutiqueListHeader />

      <BoutiqueCommandBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        fastOnly={fastOnly}
        onToggleFastOnly={setFastOnly}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Boutique Listings Stream */}
      <section className="max-w-[1280px] w-full mx-auto px-margin md:px-margin-desktop mb-space-xl">
        <div className="flex flex-col gap-space-md">
          {filteredBoutiques.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-xl p-12 text-center flex flex-col items-center justify-center gap-3">
              <span className="material-symbols-outlined text-[36px] text-on-surface-variant">
                storefront
              </span>
              <h3 className="font-headline-sm font-bold text-on-surface">No boutiques match your criteria</h3>
              <p className="font-body-md text-on-surface-variant">
                Try clearing your search or removing filters.
              </p>
            </div>
          ) : (
            filteredBoutiques.map((b) => {
              const previewProducts = products.filter(p => p.boutiqueId === b.id);
              return (
                <BoutiqueCard
                  key={b.id}
                  boutique={b}
                  previewProducts={previewProducts}
                  onNavigate={onNavigateBoutique}
                />
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
