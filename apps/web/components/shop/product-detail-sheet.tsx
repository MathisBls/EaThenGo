"use client";

// TODO: Bottom sheet / dialog for product detail with options selection
// Opens when user taps a ProductCard
// Contains: image, description, option groups, quantity, add to cart

import { formatPrice } from "@/lib/utils";

interface ProductDetailSheetProps {
  open: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    description?: string | null;
    price: number;
    imageUrl?: string | null;
    options: {
      id: string;
      name: string;
      type: "SINGLE" | "MULTIPLE";
      required: boolean;
      options: { id: string; name: string; priceModifier: number }[];
    }[];
  };
}

export function ProductDetailSheet({ open, onClose, product }: ProductDetailSheetProps) {
  if (!open) return null;

  // TODO: Implement with shadcn/ui Sheet or Dialog
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center">
      <div className="bg-background rounded-t-xl md:rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        <p className="text-muted-foreground mb-4">{product.description}</p>
        <p className="text-lg font-bold mb-6">{formatPrice(product.price)}</p>

        {/* TODO: Option groups (radio for SINGLE, checkbox for MULTIPLE) */}
        {product.options.map((group) => (
          <div key={group.id} className="mb-4">
            <h3 className="font-semibold mb-2">
              {group.name}
              {group.required && <span className="text-destructive ml-1">*</span>}
            </h3>
            <div className="space-y-2">
              {group.options.map((opt) => (
                <label key={opt.id} className="flex items-center gap-2 text-sm">
                  <input
                    type={group.type === "SINGLE" ? "radio" : "checkbox"}
                    name={group.id}
                    value={opt.id}
                  />
                  <span>{opt.name}</span>
                  {opt.priceModifier !== 0 && (
                    <span className="text-muted-foreground">
                      ({opt.priceModifier > 0 ? "+" : ""}{formatPrice(opt.priceModifier)})
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* TODO: Quantity + Add to cart */}
        <div className="flex gap-2 mt-6">
          <button
            onClick={onClose}
            className="flex-1 h-12 rounded-lg border font-medium hover:bg-muted transition-colors"
          >
            Annuler
          </button>
          <button className="flex-1 h-12 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}
