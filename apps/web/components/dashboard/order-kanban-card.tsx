"use client";

import { Clock, User } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { OrderStatusType } from "@clickcollect/shared";

interface OrderKanbanCardProps {
  id: string;
  orderNumber: string;
  status: OrderStatusType;
  customerName?: string;
  pickupTime: string;
  total: number;
  itemCount: number;
  onStatusChange?: (newStatus: OrderStatusType) => void;
}

export function OrderKanbanCard({
  id,
  orderNumber,
  status,
  customerName,
  pickupTime,
  total,
  itemCount,
  onStatusChange,
}: OrderKanbanCardProps) {
  return (
    <div className="rounded-lg border bg-background p-3 shadow-sm hover:shadow transition-shadow cursor-pointer">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-xs font-semibold">{orderNumber}</span>
        <span className="text-xs text-muted-foreground">{formatPrice(total)}</span>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
        <Clock className="h-3 w-3" />
        <span>{pickupTime}</span>
      </div>

      {customerName && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <User className="h-3 w-3" />
          <span>{customerName}</span>
        </div>
      )}

      <p className="text-xs text-muted-foreground">{itemCount} article(s)</p>

      {/* TODO: Quick action buttons based on status */}
    </div>
  );
}
