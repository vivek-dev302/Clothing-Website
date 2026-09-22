import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product, onSelect }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'M'
  );
  const [isFavorite, setIsFavorite] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd(e) {
    e.stopPropagation();
    addToCart(product, selectedSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  }

  function handleSizeClick(e, size) {
    e.stopPropagation();
    setSelectedSize(size);
  }

  function handleFavoriteClick(e) {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  }

  return (
    <article 
      onClick={() => onSelect && onSelect(product)}
      className="bg-surface-container-lowest rounded-xl p-space-sm shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-lg aspect-[3/4] bg-surface-container-low">
        <img
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={product.image}
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <span className="bg-tertiary-container text-on-tertiary-container font-label-badge uppercase px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">bolt</span> {product.dispatchMinutes}m dispatch
          </span>
          <span className="bg-inverse-surface/80 backdrop-blur-md text-inverse-on-surface font-label-badge px-2 py-0.5 rounded-full">
            {product.distanceText}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          aria-label="Save for later"
          className={`absolute top-2 right-2 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${
            isFavorite ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest/80 text-on-surface hover:text-primary'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">favorite</span>
        </button>
      </div>

      <div className="pt-space-sm flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-on-surface-variant truncate max-w-[140px]">
            {product.boutiqueName}
          </span>
          <span className="font-headline-sm text-primary font-bold">₹{product.price}</span>
        </div>
        
        <h3 className="font-headline-sm text-on-surface text-body-lg font-semibold truncate">
          {product.name}
        </h3>

        {/* Available Sizes */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex items-center gap-1.5 py-1">
            <span className="text-body-sm text-on-surface-variant font-label-badge uppercase mr-1">
              Size:
            </span>
            {product.sizes.map(size => (
              <button
                key={size}
                type="button"
                onClick={(e) => handleSizeClick(e, size)}
                className={`px-2 py-0.5 font-label-badge rounded transition-colors ${
                  selectedSize === size
                    ? 'bg-inverse-surface text-inverse-on-surface font-bold'
                    : 'bg-surface-container text-on-surface hover:bg-inverse-surface hover:text-inverse-on-surface'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        {/* Instant Order Button */}
        <button
          onClick={handleAdd}
          className={`w-full mt-2 py-2.5 font-label-lg rounded-full flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] ${
            justAdded
              ? 'bg-tertiary-container text-on-tertiary-container'
              : 'bg-primary hover:bg-primary-container text-on-primary'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {justAdded ? 'check_circle' : 'shopping_bag_speed'}
          </span>
          <span>
            {justAdded ? 'Added to Try Bag!' : `Add to Bag • ${product.doorstepMinutes || 18}m`}
          </span>
        </button>
      </div>
    </article>
  );
}
