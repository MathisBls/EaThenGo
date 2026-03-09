import PusherServer from "pusher";
import PusherClient from "pusher-js";

// Server-side Pusher instance
export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

// Client-side Pusher instance (singleton)
let pusherClientInstance: PusherClient | null = null;

export function getPusherClient(): PusherClient {
  if (!pusherClientInstance) {
    pusherClientInstance = new PusherClient(
      process.env.NEXT_PUBLIC_PUSHER_KEY!,
      {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      }
    );
  }
  return pusherClientInstance;
}

// Event types
export const PUSHER_EVENTS = {
  NEW_ORDER: "new-order",
  ORDER_STATUS_UPDATED: "order-status-updated",
  ORDER_CANCELLED: "order-cancelled",
} as const;

// Channel helpers
export function establishmentChannel(establishmentId: string) {
  return `private-establishment-${establishmentId}`;
}

export function customerChannel(userId: string) {
  return `private-customer-${userId}`;
}
