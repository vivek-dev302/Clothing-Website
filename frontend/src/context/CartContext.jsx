import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'nearwear_cart';

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cart storage', e);
      }
    }
    // Seed with the initial cart manifest matching codes.md
    return {
      boutiqueId: 'streetform-studio',
      boutiqueName: 'StreetForm Studio',
      items: [
        {
          id: 'prod-mac-01',
          boutiqueId: 'streetform-studio',
          boutiqueName: 'StreetForm Studio',
          name: 'Waterproof Membrane Mac',
          size: 'M',
          color: 'Matte Obsidian',
          price: 340,
          quantity: 1,
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2VxtOaS0xWt7J9d8K3rJnkgq-q0gUWu_jk923tuBrGlsY_gGLdLfT83taKWa5S4Azn-n5-G7v4qbSWss8nz9ltmuew-sbZ-4j98zXsLcKXEB7s9wSyk7iQzvi3A-Q3JAzG8WDPDtBzbT-GTX62oFotOFJX3ffFkmOJcFqPzvUWZwrYQnjfFXid96d4tn0XD1sOnGcugWFmEtCB2SJqW2NyIVt4NdSg6Lb0y5PjgxpzBxH6EUgG0gY'
        },
        {
          id: 'prod-tee-01',
          boutiqueId: 'streetform-studio',
          boutiqueName: 'StreetForm Studio',
          name: 'Boxy Slate Heavyweight Tee',
          size: 'L',
          color: 'Slate Gray',
          price: 85,
          quantity: 1,
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNjhxRcBCmm3fmZ--6izTUKaBTWSRtmpWzM7sUgwXeSlnMw1p77ylfBGrXr4SHzfGa1re9aGwVuxC2fQOPJlMwRg9bzLrCTr9j063Rj6RWkXMwYc8k-HjPhW-sqxoD0VlvyiGKG0UJ5yYQvIA3PkEIAqU4j6lEuMh7UuNdA1Z6ltBzDycraQr9K6Lbgb5cwN5Ld6GPsp0kj5K8ReXT7iBcb_BtxQTyJ1-8H2M40aiHrclfXtbHORJn'
        }
      ]
    };
  });

  const [conflictModalOpen, setConflictModalOpen] = useState(false);
  const [pendingItem, setPendingItem] = useState(null);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  function addToCart(product, selectedSize = 'M', selectedColor = null) {
    const chosenColor = selectedColor || (product.colors && product.colors[0]?.name) || 'Default';

    // Check Single-Boutique Rule
    if (cart.items.length > 0 && cart.boutiqueId && cart.boutiqueId !== product.boutiqueId) {
      // Prompt modal
      setPendingItem({ product, selectedSize, chosenColor });
      setConflictModalOpen(true);
      return false;
    }

    executeAddToCart(product, selectedSize, chosenColor);
    return true;
  }

  function executeAddToCart(product, size, color) {
    setCart(prev => {
      const existingIndex = prev.items.findIndex(
        item => item.id === product.id && item.size === size
      );

      let newItems = [...prev.items];
      if (existingIndex > -1) {
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + 1
        };
      } else {
        newItems.push({
          id: product.id,
          boutiqueId: product.boutiqueId,
          boutiqueName: product.boutiqueName,
          name: product.name,
          size: size,
          color: color,
          price: product.price,
          quantity: 1,
          image: product.image
        });
      }

      return {
        boutiqueId: product.boutiqueId,
        boutiqueName: product.boutiqueName,
        items: newItems
      };
    });
  }

  function confirmReplaceCart() {
    if (pendingItem) {
      setCart({
        boutiqueId: pendingItem.product.boutiqueId,
        boutiqueName: pendingItem.product.boutiqueName,
        items: [
          {
            id: pendingItem.product.id,
            boutiqueId: pendingItem.product.boutiqueId,
            boutiqueName: pendingItem.product.boutiqueName,
            name: pendingItem.product.name,
            size: pendingItem.selectedSize,
            color: pendingItem.chosenColor,
            price: pendingItem.product.price,
            quantity: 1,
            image: pendingItem.product.image
          }
        ]
      });
      setPendingItem(null);
      setConflictModalOpen(false);
    }
  }

  function cancelConflict() {
    setPendingItem(null);
    setConflictModalOpen(false);
  }

  function updateQuantity(itemId, size, delta) {
    setCart(prev => {
      const updated = prev.items
        .map(item => {
          if (item.id === itemId && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);

      return {
        ...prev,
        items: updated,
        boutiqueId: updated.length === 0 ? null : prev.boutiqueId,
        boutiqueName: updated.length === 0 ? null : prev.boutiqueName
      };
    });
  }

  function removeFromCart(itemId, size) {
    setCart(prev => {
      const updated = prev.items.filter(
        item => !(item.id === itemId && item.size === size)
      );
      return {
        ...prev,
        items: updated,
        boutiqueId: updated.length === 0 ? null : prev.boutiqueId,
        boutiqueName: updated.length === 0 ? null : prev.boutiqueName
      };
    });
  }

  function clearCart() {
    setCart({ boutiqueId: null, boutiqueName: null, items: [] });
  }

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const expressFee = subtotal > 150 ? 0 : 12;
  const garmentInsurance = subtotal > 0 ? 4.50 : 0;
  const total = subtotal + expressFee + garmentInsurance;

  return (
    <CartContext.Provider
      value={{
        cart,
        itemCount,
        subtotal,
        expressFee,
        garmentInsurance,
        total,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        conflictModalOpen,
        pendingItem,
        confirmReplaceCart,
        cancelConflict
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
