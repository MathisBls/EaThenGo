"use client";

import { useEffect, useCallback } from "react";
import { getPusherClient, PUSHER_EVENTS, establishmentChannel } from "@/lib/pusher";
import type { OrderStatusType } from "@clickcollect/shared";

interface RealtimeOrder {
  id: string;
  orderNumber: string;
  status: OrderStatusType;
  total: number;
  pickupTime: string;
  customerName?: string;
}

interface UseRealtimeOrdersOptions {
  establishmentId: string;
  onNewOrder?: (order: RealtimeOrder) => void;
  onStatusUpdate?: (orderId: string, newStatus: OrderStatusType) => void;
  onOrderCancelled?: (orderId: string) => void;
}

/**
 * Hook to subscribe to real-time order updates via Pusher
 */
export function useRealtimeOrders({
  establishmentId,
  onNewOrder,
  onStatusUpdate,
  onOrderCancelled,
}: UseRealtimeOrdersOptions) {
  useEffect(() => {
    if (!establishmentId) return;

    const pusher = getPusherClient();
    const channel = pusher.subscribe(establishmentChannel(establishmentId));

    channel.bind(PUSHER_EVENTS.NEW_ORDER, (data: RealtimeOrder) => {
      // TODO: Play notification sound
      onNewOrder?.(data);
    });

    channel.bind(
      PUSHER_EVENTS.ORDER_STATUS_UPDATED,
      (data: { orderId: string; status: OrderStatusType }) => {
        onStatusUpdate?.(data.orderId, data.status);
      }
    );

    channel.bind(
      PUSHER_EVENTS.ORDER_CANCELLED,
      (data: { orderId: string }) => {
        onOrderCancelled?.(data.orderId);
      }
    );

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(establishmentChannel(establishmentId));
    };
  }, [establishmentId, onNewOrder, onStatusUpdate, onOrderCancelled]);
}
