"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    <div
      className="flex gap-4 rounded-lg border p-3 hover:shadow-md transition-shadow cursor-pointer group"
      onClick={onAddToCart}
    >
      <div className="flex-1 min-w-0">
        <h4 className="font-medium group-hover:text-[#690000] transition-colors">
          {name}
        </h4>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {description}
          </p>
        )}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-[10px] capitalize px-1.5 py-0"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <p className="font-semibold mt-2" style={{ color: "#690000" }}>
          {formatPrice(price)}
        </p>
      </div>

      <div className="flex flex-col items-end justify-between">
        {imageUrl ? (
          <div className="relative h-20 w-20 rounded-md overflow-hidden bg-muted shrink-0">
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="h-20 w-20 rounded-md bg-gradient-to-br from-[#690000]/10 to-[#F2ADB1]/20 flex items-center justify-center shrink-0">
            <span className="text-2xl">🍕</span>
          </div>
        )}
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8 border-[#690000]/30 text-[#690000] hover:bg-[#690000] hover:text-white"
          disabled={!isAvailable}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.();
          }}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
