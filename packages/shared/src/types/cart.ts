export interface CartItemOption {
  groupId: string;
  groupName: string;
  optionId: string;
  optionName: string;
  priceModifier: number; // centimes
}

export interface CartItem {
  id: string; // unique cart item id (generated client-side)
  productId: string;
  name: string;
  price: number; // centimes (base price)
  quantity: number;
  options: CartItemOption[];
  imageUrl?: string;
  establishmentId: string;
}

export interface CartMenuChoice {
  sectionId: string;
  sectionName: string;
  productId: string;
  productName: string;
  options: CartItemOption[];
}

export interface CartMenuItem {
  id: string;
  menuId: string;
  name: string;
  price: number; // centimes (menu price)
  quantity: number;
  choices: CartMenuChoice[];
  imageUrl?: string;
  establishmentId: string;
}

export interface CartState {
  items: CartItem[];
  menuItems: CartMenuItem[];
  establishmentId: string | null;
  establishmentName: string | null;
  establishmentSlug: string | null;
}

export interface CartActions {
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  addMenuItem: (item: Omit<CartMenuItem, "id">) => void;
  removeMenuItem: (itemId: string) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getItemCount: () => number;
}
