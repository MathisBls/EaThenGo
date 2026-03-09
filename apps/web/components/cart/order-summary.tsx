"use client";

import { formatPrice } from "@/lib/utils";

interface OrderSummaryItem {
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  options?: string[];
}

interface OrderSummaryProps {
  items: OrderSummaryItem[];
  subtotal: number;
  serviceFee: number;
  total: number;
}

export function OrderSummary({ items, subtotal, serviceFee, total }: OrderSummaryProps) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex justify-between text-sm">
          <div>
            <span className="font-medium">{item.quantity}x</span>{" "}
            <span>{item.name}</span>
            {item.options && item.options.length > 0 && (
              <p className="text-xs text-muted-foreground ml-5">
                {item.options.join(", ")}
              </p>
            )}
          </div>
          <span>{formatPrice(item.totalPrice)}</span>
        </div>
      ))}

      <div className="border-t pt-3 space-y-1">
        <div className="flex justify-between text-sm">
          <span>Sous-total</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        {serviceFee > 0 && (
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Frais de service</span>
            <span>{formatPrice(serviceFee)}</span>
          </div>
        )}
        <div className="flex justify-between font-semibold text-lg pt-2 border-t">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
