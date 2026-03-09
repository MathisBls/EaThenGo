import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "commandes@clickcollect.app";

/**
 * Send order confirmation email to customer
 */
export async function sendOrderConfirmation({
  to,
  orderNumber,
  pickupCode,
  pickupTime,
  total,
  establishmentName,
  items,
}: {
  to: string;
  orderNumber: string;
  pickupCode: string;
  pickupTime: string;
  total: number;
  establishmentName: string;
  items: { name: string; quantity: number; price: number }[];
}) {
  // TODO: Use React Email template
  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Commande ${orderNumber} confirmée — ${establishmentName}`,
    html: `<h1>Commande confirmée !</h1><p>N° ${orderNumber} — Code de retrait : <strong>${pickupCode}</strong></p>`,
  });
}

/**
 * Send "order ready" email to customer
 */
export async function sendOrderReady({
  to,
  orderNumber,
  pickupCode,
  establishmentName,
  establishmentAddress,
}: {
  to: string;
  orderNumber: string;
  pickupCode: string;
  establishmentName: string;
  establishmentAddress: string;
}) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Votre commande ${orderNumber} est prête !`,
    html: `<h1>Votre commande est prête !</h1><p>Présentez le code <strong>${pickupCode}</strong> chez ${establishmentName}.</p>`,
  });
}

/**
 * Send new order notification to merchant
 */
export async function sendMerchantNewOrder({
  to,
  orderNumber,
  pickupTime,
  total,
  itemCount,
}: {
  to: string;
  orderNumber: string;
  pickupTime: string;
  total: number;
  itemCount: number;
}) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Nouvelle commande ${orderNumber}`,
    html: `<h1>Nouvelle commande !</h1><p>N° ${orderNumber} — ${itemCount} articles — Retrait à ${pickupTime}</p>`,
  });
}

/**
 * Send welcome email
 */
export async function sendWelcomeEmail({ to, name }: { to: string; name: string }) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: "Bienvenue sur ClickCollect !",
    html: `<h1>Bienvenue ${name} !</h1><p>Découvrez les commerces autour de vous.</p>`,
  });
}

/**
 * Send email verification
 */
export async function sendVerificationEmail({
  to,
  token,
  name,
}: {
  to: string;
  token: string;
  name: string;
}) {
  const verifyUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`;
  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: "Vérifiez votre email — ClickCollect",
    html: `<h1>Bonjour ${name}</h1><p><a href="${verifyUrl}">Cliquez ici pour vérifier votre email</a></p>`,
  });
}
