import React, { useState, useEffect } from 'react';
import LiveTelemetryCockpit from '../components/cart/LiveTelemetryCockpit';
import CartManifest from '../components/cart/CartManifest';
import { getActiveOrder, createOrder } from '../api/ordersApi';

export default function CartTrackingPage({ onContinueShopping }) {
  const [activeOrder, setActiveOrder] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const order = await getActiveOrder();
        setActiveOrder(order);
      } catch (e) {
        console.error('Failed to load active order', e);
      }
    }
    fetchOrder();
  }, []);

  async function handleOrderPlaced(cart) {
    try {
      const newOrder = await createOrder({
        boutiqueId: cart.boutiqueId,
        boutiqueName: cart.boutiqueName,
        items: cart.items,
        pricing: {
          subtotal: cart.items.reduce((s, i) => s + i.price * i.quantity, 0),
          expressCourierFee: 0,
          garmentInsurance: 4.50,
          total: cart.items.reduce((s, i) => s + i.price * i.quantity, 0) + 4.50
        }
      });
      setActiveOrder(newOrder);
    } catch (e) {
      console.error('Order creation error', e);
    }
  }

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Live Corridor Alert Ribbon */}
      <section className="w-full max-w-[1280px] mx-auto px-margin md:px-margin-desktop mb-space-md pt-4">
        <div className="bg-surface-container-lowest border border-tertiary-container/30 rounded-full px-space-md py-2 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary"></span>
            </span>
            <span className="font-label-badge uppercase tracking-wider text-tertiary font-bold">
              Hauz Khas Village Fast-Lane
            </span>
            <span className="text-outline-variant/60 hidden sm:inline">•</span>
            <span className="font-body-sm text-on-surface truncate hidden sm:inline">
              Couriers pre-positioned on Aurobindo Marg & Safdarjung Rd for instant pickup.
            </span>
          </div>
          <span className="font-label-badge uppercase bg-tertiary-container text-on-tertiary-container px-2.5 py-0.5 rounded-full font-semibold">
            Active Courier Window — HKV Zone
          </span>
        </div>
      </section>

      {/* Main 60/40 Split Cockpit */}
      <section className="w-full max-w-[1280px] mx-auto px-margin md:px-margin-desktop mb-space-xl">
        <div className="flex flex-col lg:flex-row gap-gutter-desktop items-start">
          {/* Left Column: Live Telemetry & Tracking Map */}
          <LiveTelemetryCockpit order={activeOrder} />

          {/* Right Column: Try-at-Door Bag Manifest & Checkout */}
          <CartManifest
            onOrderPlaced={handleOrderPlaced}
            onContinueShopping={onContinueShopping}
          />
        </div>
      </section>
    </div>
  );
}
