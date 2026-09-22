import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { LocationProvider } from './context/LocationContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ConflictModal from './components/common/ConflictModal';
import LocationModal from './components/common/LocationModal';

import HomePage from './pages/HomePage';
import ClothingPage from './pages/ClothingPage';
import BoutiquesPage from './pages/BoutiquesPage';
import BoutiqueDetailPage from './pages/BoutiqueDetailPage';
import CartTrackingPage from './pages/CartTrackingPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('explore');
  const [selectedBoutiqueId, setSelectedBoutiqueId] = useState('streetform-studio');
  const [searchQuery, setSearchQuery] = useState('');

  function handleNavigate(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleNavigateBoutique(boutiqueId) {
    setSelectedBoutiqueId(boutiqueId);
    setCurrentPage('boutique-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleSearch(query) {
    setSearchQuery(query);
    if (query && query.trim().length > 0 && currentPage !== 'clothing') {
      setCurrentPage('clothing');
    }
  }

  return (
    <LocationProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-surface text-on-surface antialiased">
          {/* Shared Global Navbar */}
          <Navbar
            activePage={currentPage}
            onNavigate={handleNavigate}
            onSearch={handleSearch}
          />

          {/* Main Workspace Body */}
          <main className="w-full pt-28 bg-surface flex-1">
            {currentPage === 'explore' && (
              <HomePage
                onNavigate={handleNavigate}
                onNavigateBoutique={handleNavigateBoutique}
              />
            )}

            {currentPage === 'clothing' && (
              <ClothingPage
                searchQuery={searchQuery}
                onNavigateBoutique={handleNavigateBoutique}
              />
            )}

            {currentPage === 'boutiques' && (
              <BoutiquesPage
                onNavigateBoutique={handleNavigateBoutique}
              />
            )}

            {currentPage === 'boutique-detail' && (
              <BoutiqueDetailPage
                boutiqueId={selectedBoutiqueId}
                onBack={() => handleNavigate('boutiques')}
              />
            )}

            {currentPage === 'cart' && (
              <CartTrackingPage
                onContinueShopping={() => handleNavigate('clothing')}
              />
            )}
          </main>

          {/* Shared Global Footer */}
          <Footer onNavigate={handleNavigate} />

          {/* Single-Boutique Conflict Modal */}
          <ConflictModal />

          {/* Location Delivery Selector Modal */}
          <LocationModal />
        </div>
      </CartProvider>
    </LocationProvider>
  );
}
