// TODO: React Email template for order confirmation
// Uses: @react-email/components
// Content: order number, items summary, pickup time, pickup code, establishment address

interface OrderConfirmationEmailProps {
  orderNumber: string;
  pickupCode: string;
  pickupTime: string;
  total: string;
  establishmentName: string;
  establishmentAddress: string;
  items: { name: string; quantity: number; price: string }[];
}

export function OrderConfirmationEmail(props: OrderConfirmationEmailProps) {
  // TODO: Implement with React Email components
  return null;
}
