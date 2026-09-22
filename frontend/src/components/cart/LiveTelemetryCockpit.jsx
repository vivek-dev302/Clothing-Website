import React from 'react';

export default function LiveTelemetryCockpit({ order }) {
  if (!order) return null;

  return (
    <div className="flex-1 flex flex-col gap-space-md">
      {/* High-Priority Speed Hero Card */}
      <div className="bg-inverse-surface text-inverse-on-surface rounded-2xl p-6 shadow-xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-tertiary"></span>
            </span>
            <span className="font-label-badge uppercase tracking-wider text-tertiary-fixed font-bold">
              Active Courier Dispatch
            </span>
          </div>
          <span className="font-label-md text-inverse-on-surface/70">
            Order #{order.id}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-display-lg text-display-lg font-bold tracking-tight text-inverse-on-surface leading-none">
              {order.etaLabel || '18m Doorstep'}
            </h2>
            <p className="font-body-sm text-inverse-on-surface/80 mt-1">
              Garments steamed, bagged, and actively en route via zero-emission e-cargo bike.
            </p>
          </div>

          <div className="bg-inverse-surface/60 border border-outline/30 px-4 py-2 rounded-xl flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-bold">
              MV
            </div>
            <div className="flex flex-col">
              <span className="font-label-badge uppercase text-inverse-on-surface/60">Courier</span>
              <span className="font-label-md text-inverse-on-surface font-semibold">{order.courierName || 'Marcus V.'}</span>
            </div>
          </div>
        </div>

        {/* Live Interactive Vector Map Container */}
        <div className="relative w-full h-[240px] rounded-xl overflow-hidden bg-surface-container-high/20 border border-outline/20">
          <div
            className="w-full h-full bg-cover bg-center opacity-60"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBata3f5O7eiZZsiFRfUxsqydloWgpNh8GCgeTPZ2j7a5ScVb92vTP_G2ZMEP9H5kG_I9LA8UOGlbVhHpDa490mK_ZW1_aQmYl5KskhGNJLVAfAVZrp4co7-Afivoru_xTxbW0EALKS04FKcP15MlD3ZToNmBoHDtXAt5INUpS2dWuz5-_botJLAOgZDvX6HIJyOF5CFDSUO_iGL0Lek3fBLpkn_HGXQkF1HHWqTGWIma2FxlZ_Alif')",
            }}
          ></div>

          {/* Stylized SVG Route Overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <line x1="25%" y1="75%" x2="70%" y2="35%" stroke="#00855b" strokeWidth="4" strokeDasharray="6,6" />
          </svg>

          {/* Boutique Origin Pin */}
          <div className="absolute bottom-8 left-[22%] flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-surface-container-lowest text-on-surface flex items-center justify-center shadow-lg font-bold text-xs border-2 border-tertiary">
              SS
            </div>
            <span className="mt-1 px-2 py-0.5 bg-inverse-surface text-inverse-on-surface font-label-badge rounded-md shadow text-[10px]">
              {order.boutiqueName || 'Boutique'}
            </span>
          </div>

          {/* Live Courier Moving Pin */}
          <div className="absolute top-[48%] left-[45%] flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute w-8 h-8 rounded-full bg-primary/50"></span>
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-[18px]">moped</span>
              </div>
            </div>
            <span className="mt-1 px-2 py-0.5 bg-primary text-on-primary font-label-badge rounded-md shadow text-[10px]">
              Marcus (En Route)
            </span>
          </div>

          {/* Destination Pin: Customer Doorstep */}
          <div className="absolute top-8 right-[25%] flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-[18px]">home</span>
            </div>
            <span className="mt-1 px-2 py-0.5 bg-inverse-surface text-inverse-on-surface font-label-badge rounded-md shadow text-[10px]">
              Your Doorstep
            </span>
          </div>
        </div>

        {/* Step-by-Step Delivery Progress Timeline */}
        <div className="pt-2 border-t border-outline/20 flex flex-col gap-3">
          <span className="font-label-badge uppercase text-inverse-on-surface/60 font-semibold tracking-wider">
            Sartorial Fulfillment Velocity
          </span>

          <div className="flex flex-col gap-2">
            {(order.timeline || []).map((step, idx) => (
              <div key={idx} className="flex items-center justify-between text-body-sm">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[12px] font-bold ${
                      step.current
                        ? 'bg-primary text-on-primary animate-pulse'
                        : step.completed
                        ? 'bg-tertiary-container text-on-tertiary-container'
                        : 'bg-surface-container-high/30 text-inverse-on-surface/40'
                    }`}
                  >
                    {step.completed ? '✓' : idx + 1}
                  </span>
                  <span
                    className={
                      step.current
                        ? 'font-semibold text-inverse-primary'
                        : step.completed
                        ? 'text-inverse-on-surface'
                        : 'text-inverse-on-surface/50'
                    }
                  >
                    {step.title}
                  </span>
                </div>
                <span className="text-inverse-on-surface/60 font-label-badge">
                  {step.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
