import React from 'react';
import { useCart } from '../../context/CartContext';

export default function ConflictModal() {
  const { 
    conflictModalOpen, 
    cart, 
    pendingItem, 
    confirmReplaceCart, 
    cancelConflict 
  } = useCart();

  if (!conflictModalOpen || !pendingItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface-container-lowest max-w-md w-full rounded-2xl p-6 shadow-2xl flex flex-col gap-4 border border-outline-variant/30">
        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-[28px]">storefront</span>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="font-headline-md text-on-surface font-bold">
            Start a new bag?
          </h3>
          <p className="font-body-md text-on-surface-variant">
            Your try bag currently contains items from <strong className="text-on-surface font-semibold">{cart.boutiqueName}</strong>.
          </p>
          <p className="font-body-sm text-on-surface-variant pt-1">
            To ensure our <span className="text-primary font-semibold">sub-30 minute doorstep delivery</span>, couriers dispatch directly from one boutique at a time. Starting a bag for <strong className="text-on-surface font-semibold">{pendingItem.product.boutiqueName}</strong> will clear your current items.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3">
          <button
            onClick={cancelConflict}
            className="px-5 py-2.5 rounded-full font-label-lg text-on-surface hover:bg-surface-container transition-colors"
          >
            Keep current bag
          </button>
          <button
            onClick={confirmReplaceCart}
            className="px-5 py-2.5 rounded-full font-label-lg bg-primary hover:bg-primary-container text-on-primary shadow-sm transition-all"
          >
            Start new bag
          </button>
        </div>
      </div>
    </div>
  );
}
