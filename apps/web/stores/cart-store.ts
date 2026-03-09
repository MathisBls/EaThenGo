import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartState, CartActions, CartItem, CartMenuItem } from "@clickcollect/shared";

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set, get) => ({
      items: [],
      menuItems: [],
      establishmentId: null,
      establishmentName: null,
      establishmentSlug: null,

      addItem: (item) => {
        const state = get();

        // If cart has items from a different establishment, this should be handled
        // by the UI (show confirmation dialog before calling this)
        if (state.establishmentId && state.establishmentId !== item.establishmentId) {
          // Clear cart first
          set({
            items: [],
            menuItems: [],
            establishmentId: null,
            establishmentName: null,
            establishmentSlug: null,
          });
        }

        // Check if same product with same options exists
        const existingIndex = state.items.findIndex(
          (i) =>
            i.productId === item.productId &&
            JSON.stringify(i.options) === JSON.stringify(item.options)
        );

        if (existingIndex >= 0) {
          const updated = [...state.items];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + item.quantity,
          };
          set({ items: updated });
        } else {
          set({
            items: [...state.items, { ...item, id: generateId() }],
            establishmentId: item.establishmentId,
          });
        }
      },

      removeItem: (itemId) => {
        const items = get().items.filter((i) => i.id !== itemId);
        if (items.length === 0 && get().menuItems.length === 0) {
          set({
            items: [],
            establishmentId: null,
            establishmentName: null,
            establishmentSlug: null,
          });
        } else {
          set({ items });
        }
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.id === itemId ? { ...i, quantity } : i
          ),
        });
      },

      addMenuItem: (item) => {
        set({
          menuItems: [...get().menuItems, { ...item, id: generateId() }],
          establishmentId: item.establishmentId,
        });
      },

      removeMenuItem: (itemId) => {
        const menuItems = get().menuItems.filter((i) => i.id !== itemId);
        if (menuItems.length === 0 && get().items.length === 0) {
          set({
            menuItems: [],
            establishmentId: null,
            establishmentName: null,
            establishmentSlug: null,
          });
        } else {
          set({ menuItems });
        }
      },

      clearCart: () =>
        set({
          items: [],
          menuItems: [],
          establishmentId: null,
          establishmentName: null,
          establishmentSlug: null,
        }),

      getSubtotal: () => {
        const state = get();
        const itemsTotal = state.items.reduce((sum, item) => {
          const optionsTotal = item.options.reduce((s, o) => s + o.priceModifier, 0);
          return sum + (item.price + optionsTotal) * item.quantity;
        }, 0);
        const menusTotal = state.menuItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        return itemsTotal + menusTotal;
      },

      getItemCount: () => {
        const state = get();
        const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
        const menuCount = state.menuItems.reduce((sum, i) => sum + i.quantity, 0);
        return itemCount + menuCount;
      },
    }),
    {
      name: "clickcollect-cart",
    }
  )
);
