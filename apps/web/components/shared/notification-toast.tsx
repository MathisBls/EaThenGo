"use client";

// TODO: Component that listens to Pusher events and displays toast notifications
// Used in dashboard layout for new order alerts
// Used in customer order tracking for status updates

import { useEffect } from "react";
import { getPusherClient, PUSHER_EVENTS } from "@/lib/pusher";

interface NotificationToastProps {
  channel: string;
}

export function NotificationToast({ channel }: NotificationToastProps) {
  useEffect(() => {
    const pusher = getPusherClient();
    const ch = pusher.subscribe(channel);

    ch.bind(PUSHER_EVENTS.NEW_ORDER, () => {
      // TODO: Play sound + show toast
      console.log("New order received!");
    });

    ch.bind(PUSHER_EVENTS.ORDER_STATUS_UPDATED, () => {
      // TODO: Show toast with new status
      console.log("Order status updated!");
    });

    return () => {
      ch.unbind_all();
      pusher.unsubscribe(channel);
    };
  }, [channel]);

  return null; // Renders toasts via a toast library
}
