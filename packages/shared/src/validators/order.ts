import { z } from "zod";

export const createOrderSchema = z.object({
  establishmentId: z.string().cuid(),
  items: z.array(
    z.object({
      productId: z.string().cuid().optional(),
      menuId: z.string().cuid().optional(),
      quantity: z.number().int().min(1).max(99),
      options: z
        .array(
          z.object({
            groupId: z.string().cuid(),
            optionIds: z.array(z.string().cuid()),
          })
        )
        .optional(),
      menuChoices: z
        .array(
          z.object({
            sectionId: z.string().cuid(),
            productId: z.string().cuid(),
            options: z
              .array(
                z.object({
                  groupId: z.string().cuid(),
                  optionIds: z.array(z.string().cuid()),
                })
              )
              .optional(),
          })
        )
        .optional(),
    })
  ).min(1, "Le panier ne peut pas être vide"),
  pickupTime: z.string().datetime(),
  note: z.string().max(500).optional(),
  // Guest checkout
  guestEmail: z.string().email().optional(),
  guestName: z.string().min(2).optional(),
  guestPhone: z.string().optional(),
});

export const updateOrderStatusSchema = z.object({
  orderId: z.string().cuid(),
  status: z.enum([
    "CONFIRMED",
    "PREPARING",
    "READY",
    "COMPLETED",
    "CANCELLED",
    "REFUNDED",
  ]),
  cancelReason: z.string().max(500).optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
