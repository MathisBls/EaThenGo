"use server";

import { db } from "@clickcollect/db";
import { auth } from "@/lib/auth";
import {
  createCheckoutSession,
  createConnectAccount,
  createConnectOnboardingLink,
} from "@/lib/stripe";

/**
 * Create Stripe Checkout session for an order
 */
export async function createCheckout(orderId: string) {
  const order = await db.order.findUnique({
    where: { id: orderId },
    include: {
      items: true,
      establishment: { select: { stripeAccountId: true, name: true } },
    },
  });

  if (!order) throw new Error("Commande non trouvée");
  if (!order.establishment.stripeAccountId) {
    throw new Error("Le commerce n'a pas configuré Stripe");
  }

  const lineItems = order.items.map((item) => ({
    price_data: {
      currency: "eur",
      unit_amount: item.unitPrice,
      product_data: {
        name: item.name,
      },
    },
    quantity: item.quantity,
  }));

  const session = await createCheckoutSession({
    orderId: order.id,
    orderNumber: order.orderNumber,
    lineItems,
    customerEmail: order.guestEmail ?? undefined,
    establishmentStripeAccountId: order.establishment.stripeAccountId,
    totalCentimes: order.total,
    successUrl: `${process.env.NEXTAUTH_URL}/orders/${order.id}?success=true`,
    cancelUrl: `${process.env.NEXTAUTH_URL}/shop/${order.establishmentId}/cart?cancelled=true`,
  });

  // Save session ID
  await db.order.update({
    where: { id: orderId },
    data: { stripeSessionId: session.id },
  });

  return { url: session.url };
}

/**
 * Start Stripe Connect onboarding for a merchant
 */
export async function startStripeOnboarding() {
  const session = await auth();
  if (!session?.user) throw new Error("Non authentifié");

  const establishmentId = (session.user as any).establishmentId;
  if (!establishmentId) throw new Error("Aucun établissement");

  const establishment = await db.establishment.findUnique({
    where: { id: establishmentId },
    select: { stripeAccountId: true, email: true },
  });

  if (!establishment) throw new Error("Établissement non trouvé");

  let stripeAccountId = establishment.stripeAccountId;

  // Create Stripe account if not exists
  if (!stripeAccountId) {
    const account = await createConnectAccount(establishment.email);
    stripeAccountId = account.id;
    await db.establishment.update({
      where: { id: establishmentId },
      data: { stripeAccountId: account.id },
    });
  }

  const returnUrl = `${process.env.NEXTAUTH_URL}/dashboard/settings/payments`;
  const refreshUrl = `${process.env.NEXTAUTH_URL}/dashboard/settings/payments?refresh=true`;

  const url = await createConnectOnboardingLink(stripeAccountId, returnUrl, refreshUrl);
  return { url };
}
