import React, { useState, useEffect } from 'react';
import CatalogSubHeader from '../components/clothing/CatalogSubHeader';
import CatalogFilterSidebar from '../components/clothing/CatalogFilterSidebar';
import CatalogProductGrid from '../components/clothing/CatalogProductGrid';
import { searchProducts } from '../api/productsApi';

export default function ClothingPage({ searchQuery = '', onNavigateBoutique }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [maxDeliveryMin, setMaxDeliveryMin] = useState(30);
  const [selectedSize, setSelectedSize] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCatalog() {
      setLoading(true);
      try {
        const results = await searchProducts(searchQuery, {
          category: selectedCategory,
          size: selectedSize
        });
        // Filter by max delivery minutes
        const filtered = results.filter(
          p => (p.doorstepMinutes || 20) <= maxDeliveryMin
        );
        setProducts(filtered);
      } catch (err) {
        console.error('Failed loading catalog', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCatalog();
  }, [searchQuery, selectedCategory, maxDeliveryMin, selectedSize]);

  function handleReset() {
    setSelectedCategory('all');
    setMaxDeliveryMin(35);
    setSelectedSize(null);
  }

  return (
    <div className="flex flex-col w-full min-h-screen">
      <CatalogSubHeader totalProducts={products.length} activeCategory={selectedCategory} />

      <div className="max-w-[1280px] w-full mx-auto px-margin md:px-margin-desktop mb-space-xl">
        <div className="flex flex-col lg:flex-row gap-gutter-desktop items-start">
          <CatalogFilterSidebar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            maxDeliveryMin={maxDeliveryMin}
            onMaxDeliveryChange={setMaxDeliveryMin}
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
            onResetFilters={handleReset}
          />

          <CatalogProductGrid
            products={products}
            onResetFilters={handleReset}
            onSelectProduct={(prod) => onNavigateBoutique(prod.boutiqueId)}
          />
        </div>
      </div>
    </div>
  );
}
