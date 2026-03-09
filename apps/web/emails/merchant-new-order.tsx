// TODO: React Email template for merchant new order notification

interface MerchantNewOrderEmailProps {
  orderNumber: string;
  pickupTime: string;
  total: string;
  items: { name: string; quantity: number; price: string }[];
  customerName?: string;
}

export function MerchantNewOrderEmail(props: MerchantNewOrderEmailProps) {
  return null;
}
