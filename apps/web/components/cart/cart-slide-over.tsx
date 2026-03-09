"use client";

// TODO: Slide-over panel showing cart summary
// Accessible from any page via header icon
// Shows items, quantities, total, and link to checkout

import { formatPrice } from "@/lib/utils";

interface CartSlideOverProps {
  open: boolean;
  onClose: () => void;
}

export function CartSlideOver({ open, onClose }: CartSlideOverProps) {
  // TODO: Use useCart hook to get items

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">Votre panier</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {/* TODO: Cart items list */}
            <p className="text-center text-muted-foreground py-8">
              Votre panier est vide.
            </p>
          </div>

          <div className="border-t p-4 space-y-3">
            <div className="flex justify-between">
              <span>Sous-total</span>
              <span className="font-semibold">{formatPrice(0)}</span>
            </div>
            <button className="w-full h-12 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
              Voir le panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
