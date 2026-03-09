"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";

interface OptionItem {
  id: string;
  name: string;
  priceModifier: number;
  isDefault: boolean;
}

interface OptionGroup {
  id: string;
  name: string;
  type: "SINGLE" | "MULTIPLE";
  required: boolean;
  minSelect: number;
  maxSelect: number;
  options: OptionItem[];
}

interface ProductDetailSheetProps {
  open: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    description?: string | null;
    price: number;
    imageUrl?: string | null;
    allergens?: string[];
    tags?: string[];
    options: OptionGroup[];
  };
  establishment: {
    id: string;
    name: string;
    slug: string;
  };
}

export function ProductDetailSheet({
  open,
  onClose,
  product,
  establishment,
}: ProductDetailSheetProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Initialize selected options with defaults
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string[]>
  >(() => {
    const initial: Record<string, string[]> = {};
    for (const group of product.options) {
      const defaults = group.options
        .filter((o) => o.isDefault)
        .map((o) => o.id);
      initial[group.id] = defaults;
    }
    return initial;
  });

  const handleSingleSelect = (groupId: string, optionId: string) => {
    setSelectedOptions((prev) => ({ ...prev, [groupId]: [optionId] }));
  };

  const handleMultipleSelect = (
    groupId: string,
    optionId: string,
    maxSelect: number
  ) => {
    setSelectedOptions((prev) => {
      const current = prev[groupId] || [];
      if (current.includes(optionId)) {
        return { ...prev, [groupId]: current.filter((id) => id !== optionId) };
      }
      if (current.length >= maxSelect) return prev;
      return { ...prev, [groupId]: [...current, optionId] };
    });
  };

  // Calculate total price
  const optionsTotal = product.options.reduce((sum, group) => {
    const selected = selectedOptions[group.id] || [];
    return (
      sum +
      group.options
        .filter((o) => selected.includes(o.id))
        .reduce((s, o) => s + o.priceModifier, 0)
    );
  }, 0);

  const unitPrice = product.price + optionsTotal;
  const totalPrice = unitPrice * quantity;

  // Check if required options are selected
  const allRequiredSelected = product.options
    .filter((g) => g.required)
    .every((g) => (selectedOptions[g.id] || []).length >= g.minSelect);

  const handleAddToCart = () => {
    const options = product.options.flatMap((group) => {
      const selected = selectedOptions[group.id] || [];
      return group.options
        .filter((o) => selected.includes(o.id))
        .map((o) => ({
          groupId: group.id,
          groupName: group.name,
          optionId: o.id,
          optionName: o.name,
          priceModifier: o.priceModifier,
        }));
    });

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      options,
      imageUrl: product.imageUrl || undefined,
      establishmentId: establishment.id,
    });

    onClose();
    setQuantity(1);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{product.name}</DialogTitle>
          {product.description && (
            <DialogDescription>{product.description}</DialogDescription>
          )}
        </DialogHeader>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {product.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs capitalize"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Allergens */}
        {product.allergens && product.allergens.length > 0 && (
          <p className="text-xs text-muted-foreground">
            Allergènes : {product.allergens.join(", ")}
          </p>
        )}

        <Separator />

        {/* Price */}
        <p className="text-lg font-bold" style={{ color: "#690000" }}>
          {formatPrice(product.price)}
        </p>

        {/* Option groups */}
        {product.options.map((group) => (
          <div key={group.id}>
            <Separator className="my-2" />
            <h3 className="font-semibold text-sm mb-2">
              {group.name}
              {group.required && (
                <span className="text-destructive ml-1 text-xs">
                  (obligatoire)
                </span>
              )}
            </h3>
            <div className="space-y-1.5">
              {group.options.map((opt) => {
                const isSelected = (
                  selectedOptions[group.id] || []
                ).includes(opt.id);

                return (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                      isSelected
                        ? "border-[#690000] bg-[#690000]/5"
                        : "border-border hover:bg-accent"
                    }`}
                  >
                    <input
                      type={group.type === "SINGLE" ? "radio" : "checkbox"}
                      name={group.id}
                      value={opt.id}
                      checked={isSelected}
                      onChange={() =>
                        group.type === "SINGLE"
                          ? handleSingleSelect(group.id, opt.id)
                          : handleMultipleSelect(
                              group.id,
                              opt.id,
                              group.maxSelect
                            )
                      }
                      className="accent-[#690000]"
                    />
                    <span className="flex-1 text-sm">{opt.name}</span>
                    {opt.priceModifier !== 0 && (
                      <span className="text-sm text-muted-foreground">
                        +{formatPrice(opt.priceModifier)}
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        <Separator />

        {/* Quantity */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm">Quantité</span>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center font-semibold">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Add to cart button */}
        <Button
          className="w-full h-12 text-base font-semibold"
          style={{ backgroundColor: "#690000" }}
          disabled={!allRequiredSelected}
          onClick={handleAddToCart}
        >
          Ajouter — {formatPrice(totalPrice)}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
