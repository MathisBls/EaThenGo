"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  description?: string | null;
  price: number; // centimes
  imageUrl?: string | null;
  isAvailable: boolean;
  allergens?: string[];
  tags?: string[];
  onAddToCart?: () => void;
}

export function ProductCard({
  id,
  name,
  description,
  price,
  imageUrl,
  isAvailable,
  allergens,
  tags,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="flex gap-4 rounded-lg border p-3 hover:shadow-sm transition-shadow">
      <div className="flex-1 min-w-0">
        <h4 className="font-medium truncate">{name}</h4>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{description}</p>
        )}
        {tags && tags.length > 0 && (
          <div className="flex gap-1 mt-2">
            {tags.map((tag) => (
              <span key={tag} className="px-1.5 py-0.5 rounded text-xs bg-primary/10 text-primary">
                {tag}
              </span>
            ))}
          </div>
        )}
        <p className="font-semibold mt-2">{formatPrice(price)}</p>
      </div>

      <div className="flex flex-col items-end gap-2">
        {imageUrl && (
          <div className="relative h-20 w-20 rounded-md overflow-hidden bg-muted shrink-0">
            <Image src={imageUrl} alt={name} fill className="object-cover" />
          </div>
        )}
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8"
          disabled={!isAvailable}
          onClick={onAddToCart}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
