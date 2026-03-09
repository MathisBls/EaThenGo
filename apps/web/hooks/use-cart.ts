"use client";

import { useCartStore } from "@/stores/cart-store";

/**
 * Hook to access cart state and actions
 */
export function useCart() {
  const store = useCartStore();

  return {
    items: store.items,
    menuItems: store.menuItems,
    establishmentId: store.establishmentId,
    establishmentName: store.establishmentName,
    establishmentSlug: store.establishmentSlug,
    itemCount: store.getItemCount(),
    subtotal: store.getSubtotal(),
    addItem: store.addItem,
    removeItem: store.removeItem,
    updateQuantity: store.updateQuantity,
    addMenuItem: store.addMenuItem,
    removeMenuItem: store.removeMenuItem,
    clearCart: store.clearCart,
    isEmpty: store.items.length === 0 && store.menuItems.length === 0,
  };
}
