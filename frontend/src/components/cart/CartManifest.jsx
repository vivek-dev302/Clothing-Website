import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';

export default function CartManifest({ onOrderPlaced, onContinueShopping }) {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    expressFee, 
    garmentInsurance, 
    total, 
    clearCart 
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  function handlePlaceOrder() {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderSuccess(true);
      if (onOrderPlaced) onOrderPlaced(cart);
    }, 1200);
  }

  if (cart.items.length === 0 && !orderSuccess) {
    return (
      <div className="w-full lg:w-[460px] bg-surface-container-lowest rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center text-center gap-4 min-h-[420px]">
        <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
          <span className="material-symbols-outlined text-[32px]">shopping_bag</span>
        </div>
        <h3 className="font-headline-md font-bold text-on-surface">Your Try Bag is Empty</h3>
        <p className="font-body-md text-on-surface-variant max-w-xs">
          Discover steamed garments from independent boutiques near you ready for 30-minute delivery.
        </p>
        <button
          onClick={onContinueShopping}
          className="px-6 py-3 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-lg shadow-sm transition-all"
        >
          Explore Local Racks
        </button>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-[460px] bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col gap-5 border border-surface-container">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-surface-container pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-headline-sm font-bold text-on-surface">
              Your Try-at-Door Bag
            </h3>
            <span className="bg-tertiary-container text-on-tertiary-container font-label-badge uppercase px-2 py-0.5 rounded-full">
              Single-Store Drop
            </span>
          </div>
          <p className="font-body-sm text-on-surface-variant">
            Dispatching from <strong className="text-on-surface">{cart.boutiqueName || 'Local Boutique'}</strong>
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-body-sm text-on-surface-variant hover:text-error transition-colors"
        >
          Clear
        </button>
      </div>

      {orderSuccess ? (
        <div className="py-8 flex flex-col items-center text-center gap-3 animate-fade-in">
          <div className="w-14 h-14 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[32px]">check_circle</span>
          </div>
          <h4 className="font-headline-sm font-bold text-on-surface">Order Dispatched!</h4>
          <p className="font-body-sm text-on-surface-variant">
            Courier is en route to B-12 Hauz Khas Village, ND. Fitting window starts in ~18 mins.
          </p>
        </div>
      ) : (
        <>
          {/* Item List */}
          <div className="flex flex-col gap-4 max-h-[320px] overflow-y-auto pr-1">
            {cart.items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-surface-container-low"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    alt={item.name}
                    className="w-14 h-16 rounded-lg object-cover shrink-0"
                    src={item.image}
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-md font-semibold text-on-surface truncate">
                      {item.name}
                    </span>
                    <span className="text-body-sm text-on-surface-variant">
                      Size: <strong>{item.size}</strong> • ₹{item.price}
                    </span>
                  </div>
                </div>

                {/* Stepper & Delete */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center bg-surface-container-lowest rounded-full border border-surface-container shadow-sm">
                    <button
                      onClick={() => updateQuantity(item.id, item.size, -1)}
                      className="w-7 h-7 flex items-center justify-center text-on-surface hover:text-primary font-bold"
                    >
                      −
                    </button>
                    <span className="px-2 text-body-sm font-semibold text-on-surface">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.size, 1)}
                      className="w-7 h-7 flex items-center justify-center text-on-surface hover:text-primary font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    aria-label="Remove item"
                    className="p-1 text-on-surface-variant hover:text-error transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Summary */}
          <div className="border-t border-surface-container pt-4 flex flex-col gap-2">
            <div className="flex justify-between text-body-sm text-on-surface-variant">
              <span>Racks Subtotal</span>
              <span className="font-semibold text-on-surface">₹{subtotal.toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-body-sm text-on-surface-variant">
              <span>Express Courier Dispatch (&lt; 30m)</span>
              <span className="font-semibold text-tertiary">
                {expressFee === 0 ? 'FREE (Over ₹12,500)' : `₹${expressFee.toFixed(0)}`}
              </span>
            </div>
            <div className="flex justify-between text-body-sm text-on-surface-variant">
              <span>Garment Sanitation & Eco-Tote Insurance</span>
              <span className="font-semibold text-on-surface">₹{garmentInsurance.toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-body-lg font-bold text-on-surface pt-2 border-t border-surface-container">
              <span>Total Authorization</span>
              <span className="text-primary font-extrabold">₹{total.toFixed(0)}</span>
            </div>
          </div>

          {/* 10m Try-On Notice */}
          <div className="bg-surface-container-low p-3 rounded-xl flex items-start gap-2 text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">
              doorbell
            </span>
            <p>
              Your card is only pre-authorized. During the <strong>10-minute fitting window</strong>, return any garment directly to the courier with zero return fees.
            </p>
          </div>

          {/* Checkout Action Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={isCheckingOut}
            className="w-full py-3.5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-lg shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {isCheckingOut ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin material-symbols-outlined text-[20px]">sync</span>
                <span>Assigning Nearest Courier...</span>
              </span>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">bolt</span>
                <span>Place 30-Min Rapid Drop Order</span>
              </>
            )}
          </button>
        </>
      )}
    </div>
  );
}
