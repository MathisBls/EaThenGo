import { z } from "zod";

export const updateEstablishmentSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(2000).optional().nullable(),
  type: z
    .enum(["RESTAURANT", "BAKERY", "BUTCHER", "GROCERY", "FLORIST", "OTHER"])
    .optional(),
  logoUrl: z.string().url().optional().nullable(),
  bannerUrl: z.string().url().optional().nullable(),
  address: z.string().min(5).optional(),
  city: z.string().min(2).optional(),
  zipCode: z.string().regex(/^\d{5}$/).optional(),
  phone: z.string().optional().nullable(),
  email: z.string().email().optional(),
  website: z.string().url().optional().nullable(),
});

export const openingHoursSchema = z.object({
  hours: z.array(
    z.object({
      dayOfWeek: z.number().int().min(0).max(6),
      openTime: z.string().regex(/^\d{2}:\d{2}$/),
      closeTime: z.string().regex(/^\d{2}:\d{2}$/),
      isClosed: z.boolean().default(false),
    })
  ),
});

export const pickupSlotConfigSchema = z.object({
  slots: z.array(
    z.object({
      dayOfWeek: z.number().int().min(0).max(6),
      startTime: z.string().regex(/^\d{2}:\d{2}$/),
      endTime: z.string().regex(/^\d{2}:\d{2}$/),
      slotDuration: z.number().int().min(5).max(120).default(15),
      maxOrders: z.number().int().min(1).max(100).default(5),
      isActive: z.boolean().default(true),
    })
  ),
});

export type UpdateEstablishmentInput = z.infer<typeof updateEstablishmentSchema>;
export type OpeningHoursInput = z.infer<typeof openingHoursSchema>;
export type PickupSlotConfigInput = z.infer<typeof pickupSlotConfigSchema>;
