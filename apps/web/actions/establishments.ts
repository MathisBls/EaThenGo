"use server";

import { db } from "@clickcollect/db";
import { auth } from "@/lib/auth";
import {
  updateEstablishmentSchema,
  openingHoursSchema,
  pickupSlotConfigSchema,
} from "@clickcollect/shared";
import { revalidatePath } from "next/cache";

async function getEstablishmentId() {
  const session = await auth();
  if (!session?.user) throw new Error("Non authentifié");
  const establishmentId = (session.user as any).establishmentId;
  if (!establishmentId) throw new Error("Aucun établissement associé");
  return establishmentId as string;
}

export async function updateEstablishment(formData: FormData) {
  const establishmentId = await getEstablishmentId();
  const raw = Object.fromEntries(formData);
  const parsed = updateEstablishmentSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: "Données invalides", errors: parsed.error.flatten().fieldErrors };
  }

  await db.establishment.update({
    where: { id: establishmentId },
    data: parsed.data,
  });

  // TODO: Sync to Meilisearch

  revalidatePath("/dashboard/settings");
  return { success: true };
}

export async function updateOpeningHours(data: {
  hours: { dayOfWeek: number; openTime: string; closeTime: string; isClosed: boolean }[];
}) {
  const establishmentId = await getEstablishmentId();
  const parsed = openingHoursSchema.safeParse(data);

  if (!parsed.success) {
    return { error: "Données invalides" };
  }

  // Delete existing and recreate
  await db.openingHours.deleteMany({ where: { establishmentId } });
  await db.openingHours.createMany({
    data: parsed.data.hours.map((h) => ({
      establishmentId,
      ...h,
    })),
  });

  revalidatePath("/dashboard/settings/hours");
  return { success: true };
}

export async function updatePickupSlots(data: {
  slots: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    slotDuration: number;
    maxOrders: number;
    isActive: boolean;
  }[];
}) {
  const establishmentId = await getEstablishmentId();
  const parsed = pickupSlotConfigSchema.safeParse(data);

  if (!parsed.success) {
    return { error: "Données invalides" };
  }

  await db.pickupSlotConfig.deleteMany({ where: { establishmentId } });
  await db.pickupSlotConfig.createMany({
    data: parsed.data.slots.map((s) => ({
      establishmentId,
      ...s,
    })),
  });

  revalidatePath("/dashboard/settings/pickup");
  return { success: true };
}
