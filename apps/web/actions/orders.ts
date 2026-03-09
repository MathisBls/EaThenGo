"use server";

import { db } from "@clickcollect/db";
import { auth } from "@/lib/auth";
import { updateOrderStatusSchema } from "@clickcollect/shared";
import { generateOrderNumber, generatePickupCode } from "@/lib/utils";
import { revalidatePath } from "next/cache";

/**
 * Create a new order (called before Stripe checkout)
 */
export async function createOrder(data: {
  establishmentId: string;
  items: {
    productId?: string;
    menuId?: string;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    options?: any;
    menuChoices?: any;
  }[];
  pickupTime: string;
  note?: string;
  guestEmail?: string;
  guestName?: string;
  guestPhone?: string;
}) {
  const session = await auth();
  const customerId = session?.user?.id;

  // Recalculate total server-side
  const subtotal = data.items.reduce((sum, item) => sum + item.totalPrice, 0);
  const serviceFee = 0; // TODO: Calculate service fee
  const total = subtotal + serviceFee;

  const order = await db.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      establishmentId: data.establishmentId,
      customerId,
      guestEmail: data.guestEmail,
      guestName: data.guestName,
      guestPhone: data.guestPhone,
      status: "PENDING",
      subtotal,
      serviceFee,
      total,
      note: data.note,
      pickupTime: new Date(data.pickupTime),
      pickupCode: generatePickupCode(),
      items: {
        create: data.items.map((item) => ({
          productId: item.productId,
          menuId: item.menuId,
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
          options: item.options,
          menuChoices: item.menuChoices,
        })),
      },
    },
  });

  return { orderId: order.id, orderNumber: order.orderNumber, total };
}

/**
 * Update order status (merchant action)
 */
export async function updateOrderStatus(input: {
  orderId: string;
  status: string;
  cancelReason?: string;
}) {
  const session = await auth();
  if (!session?.user) throw new Error("Non authentifié");

  const parsed = updateOrderStatusSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "Données invalides" };
  }

  const establishmentId = (session.user as any).establishmentId;

  // Verify order belongs to this establishment
  const order = await db.order.findFirst({
    where: { id: parsed.data.orderId, establishmentId },
  });

  if (!order) {
    return { error: "Commande non trouvée" };
  }

  const updateData: any = {
    status: parsed.data.status,
  };

  switch (parsed.data.status) {
    case "PREPARING":
      updateData.preparedAt = new Date();
      break;
    case "COMPLETED":
      updateData.completedAt = new Date();
      break;
    case "CANCELLED":
      updateData.cancelledAt = new Date();
      updateData.cancelReason = parsed.data.cancelReason;
      break;
  }

  await db.order.update({
    where: { id: parsed.data.orderId },
    data: updateData,
  });

  // TODO: Send Pusher notification
  // TODO: Send email notification

  revalidatePath("/dashboard/orders");
  return { success: true };
}
