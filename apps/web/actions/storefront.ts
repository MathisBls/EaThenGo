"use server";

import { db } from "@clickcollect/db";

export async function getEstablishmentBySlug(slug: string) {
  const establishment = await db.establishment.findUnique({
    where: { slug, isActive: true },
    include: {
      categories: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      },
      products: {
        where: { isActive: true, isAvailable: true },
        include: {
          options: {
            orderBy: { sortOrder: "asc" },
            include: {
              options: {
                where: { isAvailable: true },
                orderBy: { sortOrder: "asc" },
              },
            },
          },
        },
        orderBy: { sortOrder: "asc" },
      },
      openingHours: {
        orderBy: { dayOfWeek: "asc" },
      },
      reviews: {
        where: { isVisible: true },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  return establishment;
}

export async function getEstablishmentProducts(establishmentId: string, categoryId?: string) {
  const where: any = {
    establishmentId,
    isActive: true,
    isAvailable: true,
  };

  if (categoryId) {
    where.categoryId = categoryId;
  }

  return db.product.findMany({
    where,
    include: {
      options: {
        orderBy: { sortOrder: "asc" },
        include: {
          options: {
            where: { isAvailable: true },
            orderBy: { sortOrder: "asc" },
          },
        },
      },
    },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getAvailablePickupSlots(establishmentId: string, date: string) {
  const dateObj = new Date(date);
  const dayOfWeek = dateObj.getDay() === 0 ? 6 : dateObj.getDay() - 1; // Convert JS day (0=Sun) to our format (0=Mon)

  const slotConfigs = await db.pickupSlotConfig.findMany({
    where: {
      establishmentId,
      dayOfWeek,
      isActive: true,
    },
  });

  // Count existing orders for each slot on this date
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const existingOrders = await db.order.findMany({
    where: {
      establishmentId,
      pickupTime: { gte: startOfDay, lte: endOfDay },
      status: { notIn: ["CANCELLED", "REFUNDED"] },
    },
    select: { pickupTime: true },
  });

  // Generate individual time slots
  const slots: { time: string; available: boolean }[] = [];

  for (const config of slotConfigs) {
    const [startHour, startMin] = config.startTime.split(":").map(Number);
    const [endHour, endMin] = config.endTime.split(":").map(Number);

    let currentMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;

    while (currentMinutes < endMinutes) {
      const hour = Math.floor(currentMinutes / 60);
      const min = currentMinutes % 60;
      const timeStr = `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;

      // Count orders in this slot
      const slotStart = new Date(date);
      slotStart.setHours(hour, min, 0, 0);
      const slotEnd = new Date(date);
      slotEnd.setHours(hour, min + config.slotDuration, 0, 0);

      const ordersInSlot = existingOrders.filter(
        (o) => o.pickupTime >= slotStart && o.pickupTime < slotEnd
      ).length;

      slots.push({
        time: timeStr,
        available: ordersInSlot < config.maxOrders,
      });

      currentMinutes += config.slotDuration;
    }
  }

  return slots;
}
