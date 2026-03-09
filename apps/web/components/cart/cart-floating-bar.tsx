"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CartFloatingBarProps {
  establishmentSlug: string;
}

export function CartFloatingBar({ establishmentSlug }: CartFloatingBarProps) {
  const { itemCount, subtotal, isEmpty } = useCart();

  if (isEmpty) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 md:px-8">
      <div className="container mx-auto max-w-3xl">
        <Link href={`/shop/${establishmentSlug}/cart`}>
          <Button
            className="w-full h-14 text-base font-semibold shadow-lg rounded-xl flex items-center justify-between px-6"
            style={{ backgroundColor: "#690000" }}
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
                {itemCount}
              </span>
            </div>
            <span>Voir le panier</span>
            <span>{formatPrice(subtotal)}</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
