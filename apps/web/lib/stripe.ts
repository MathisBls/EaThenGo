import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});

// Platform fee percentage (from env or default 2%)
const PLATFORM_FEE_PERCENT = Number(process.env.STRIPE_PLATFORM_FEE_PERCENT ?? 2);

/**
 * Calculate platform fee in centimes
 */
export function calculatePlatformFee(totalCentimes: number): number {
  return Math.round(totalCentimes * (PLATFORM_FEE_PERCENT / 100));
}

/**
 * Create a Stripe Checkout Session for an order
 */
export async function createCheckoutSession({
  orderId,
  orderNumber,
  lineItems,
  customerEmail,
  establishmentStripeAccountId,
  totalCentimes,
  successUrl,
  cancelUrl,
}: {
  orderId: string;
  orderNumber: string;
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];
  customerEmail?: string;
  establishmentStripeAccountId: string;
  totalCentimes: number;
  successUrl: string;
  cancelUrl: string;
}) {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: lineItems,
    customer_email: customerEmail,
    metadata: { orderId, orderNumber },
    success_url: successUrl,
    cancel_url: cancelUrl,
    payment_intent_data: {
      application_fee_amount: calculatePlatformFee(totalCentimes),
      transfer_data: {
        destination: establishmentStripeAccountId,
      },
    },
  });

  return session;
}

/**
 * Create a Stripe Connect onboarding link
 */
export async function createConnectOnboardingLink(
  stripeAccountId: string,
  returnUrl: string,
  refreshUrl: string
) {
  const accountLink = await stripe.accountLinks.create({
    account: stripeAccountId,
    type: "account_onboarding",
    return_url: returnUrl,
    refresh_url: refreshUrl,
  });

  return accountLink.url;
}

/**
 * Create a new Stripe Connect account
 */
export async function createConnectAccount(email: string) {
  const account = await stripe.accounts.create({
    type: "standard",
    email,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });

  return account;
}
