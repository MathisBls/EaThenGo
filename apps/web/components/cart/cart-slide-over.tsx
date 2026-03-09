"use client";

import { Minus, Plus, Trash2, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";

interface CartSlideOverProps {
  open: boolean;
  onClose: () => void;
}

export function CartSlideOver({ open, onClose }: CartSlideOverProps) {
  const {
    items,
    menuItems,
    subtotal,
    isEmpty,
    removeItem,
    updateQuantity,
    removeMenuItem,
    clearCart,
    establishmentSlug,
  } = useCart();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Votre panier</h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 hover:bg-accent transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto p-4">
          {isEmpty ? (
            <p className="text-center text-muted-foreground py-12">
              Votre panier est vide.
            </p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    {item.options.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.options.map((o) => o.optionName).join(", ")}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <span className="font-semibold text-sm">
                      {formatPrice(
                        (item.price +
                          item.options.reduce((s, o) => s + o.priceModifier, 0)) *
                          item.quantity
                      )}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}

              {menuItems.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.choices.map((c) => c.productName).join(", ")}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <span className="font-semibold text-sm">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      onClick={() => removeMenuItem(item.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}

              <Separator />

              <button
                onClick={clearCart}
                className="text-sm text-destructive hover:underline"
              >
                Vider le panier
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isEmpty && (
          <div className="border-t p-4 space-y-3">
            <div className="flex justify-between">
              <span>Sous-total</span>
              <span className="font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <Link href={`/shop/${establishmentSlug}/cart`} onClick={onClose}>
              <Button
                className="w-full h-12 font-semibold"
                style={{ backgroundColor: "#690000" }}
              >
                Commander — {formatPrice(subtotal)}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
