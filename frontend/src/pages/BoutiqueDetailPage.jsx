import React, { useState, useEffect } from 'react';
import BoutiqueHeroBanner from '../components/boutique-detail/BoutiqueHeroBanner';
import BoutiqueSidebar from '../components/boutique-detail/BoutiqueSidebar';
import ProductCard from '../components/common/ProductCard';
import { getBoutiqueById } from '../api/boutiquesApi';
import { getProductsByBoutique } from '../api/productsApi';

export default function BoutiqueDetailPage({ boutiqueId = 'streetform-studio', onBack }) {
  const [boutique, setBoutique] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [bt, prods] = await Promise.all([
          getBoutiqueById(boutiqueId),
          getProductsByBoutique(boutiqueId)
        ]);
        setBoutique(bt);
        setProducts(prods);
        setSelectedCategory('All');
      } catch (err) {
        console.error('Failed loading boutique detail', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [boutiqueId]);

  if (!boutique) {
    return (
      <div className="max-w-[1280px] mx-auto px-margin py-20 text-center">
        <h2 className="font-headline-lg font-bold text-on-surface">Loading Boutique...</h2>
      </div>
    );
  }

  const categories = boutique.categories || ['All'];
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Top Back Nav */}
      <div className="max-w-[1280px] mx-auto w-full px-margin md:px-margin-desktop pt-4 pb-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-body-sm font-label-md text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to All Boutiques</span>
        </button>
      </div>

      <BoutiqueHeroBanner boutique={boutique} />

      <div className="max-w-[1280px] w-full mx-auto px-margin md:px-margin-desktop mb-space-xl">
        <div className="flex flex-col lg:flex-row gap-gutter-desktop items-start">
          {/* Main Product Column */}
          <div className="flex-1 flex flex-col gap-6 w-full">
            {/* Category Navigation Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-surface-container scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-label-md transition-all shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-inverse-surface text-inverse-on-surface font-bold shadow-sm'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* In-Stock Rack Header */}
            <div className="flex items-center justify-between">
              <span className="font-headline-sm font-bold text-on-surface">
                In-Stock Racks ({filteredProducts.length} items)
              </span>
              <span className="text-body-sm text-tertiary font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">bolt</span> Pre-steamed for {boutique.doorstepMinutes}m delivery
              </span>
            </div>

            {/* Product Grid using Universal ProductCard */}
            {filteredProducts.length === 0 ? (
              <div className="bg-surface-container-lowest rounded-xl p-10 text-center flex flex-col items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[32px] text-on-surface-variant">
                  inventory_2
                </span>
                <p className="font-body-md text-on-surface-variant">
                  No garments found under {selectedCategory} currently on the rack.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-gutter-desktop">
                {filteredProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar with Courier Telemetry & Concierge */}
          <BoutiqueSidebar boutique={boutique} />
        </div>
      </div>
    </div>
  );
}
