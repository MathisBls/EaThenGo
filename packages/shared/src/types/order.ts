export interface OrderItemSnapshot {
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  options?: { name: string; value: string; price: number }[];
  menuChoices?: { section: string; product: string; options?: { name: string; value: string; price: number }[] }[];
}

export interface OrderSummary {
  id: string;
  orderNumber: string;
  status: OrderStatusType;
  total: number;
  itemCount: number;
  pickupTime: string;
  createdAt: string;
  establishmentName: string;
  establishmentSlug: string;
}

export interface OrderDetail extends OrderSummary {
  subtotal: number;
  serviceFee: number;
  note?: string;
  pickupCode?: string;
  items: OrderItemSnapshot[];
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  paidAt?: string;
  preparedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
}

export type OrderStatusType =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "COMPLETED"
  | "CANCELLED"
  | "REFUNDED";
