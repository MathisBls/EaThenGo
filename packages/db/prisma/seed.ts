import { PrismaClient, EstablishmentType, UserRole, StaffRole } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const adminPassword = await hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@clickcollect.app" },
    update: {},
    create: {
      email: "admin@clickcollect.app",
      name: "Admin",
      passwordHash: adminPassword,
      role: UserRole.ADMIN,
      emailVerified: new Date(),
    },
  });

  // Create merchant user
  const merchantPassword = await hash("merchant123", 12);
  const merchant = await prisma.user.upsert({
    where: { email: "marchand@example.com" },
    update: {},
    create: {
      email: "marchand@example.com",
      name: "Pierre Dupont",
      passwordHash: merchantPassword,
      role: UserRole.MERCHANT,
      emailVerified: new Date(),
    },
  });

  // Create customer user
  const customerPassword = await hash("customer123", 12);
  const customer = await prisma.user.upsert({
    where: { email: "client@example.com" },
    update: {},
    create: {
      email: "client@example.com",
      name: "Marie Martin",
      passwordHash: customerPassword,
      role: UserRole.CUSTOMER,
      emailVerified: new Date(),
    },
  });

  // Create establishment
  const establishment = await prisma.establishment.upsert({
    where: { slug: "chez-pierre" },
    update: {},
    create: {
      slug: "chez-pierre",
      name: "Chez Pierre",
      description: "Restaurant traditionnel français avec des produits frais du marché.",
      type: EstablishmentType.RESTAURANT,
      address: "12 Rue de la Paix",
      city: "Paris",
      zipCode: "75002",
      country: "FR",
      lat: 48.8698,
      lng: 2.3311,
      phone: "+33 1 42 61 00 00",
      email: "contact@chezpierre.fr",
      isActive: true,
      isVerified: true,
      ownerId: merchant.id,
    },
  });

  // Staff member
  await prisma.staffMember.upsert({
    where: {
      establishmentId_userId: {
        establishmentId: establishment.id,
        userId: merchant.id,
      },
    },
    update: {},
    create: {
      establishmentId: establishment.id,
      userId: merchant.id,
      role: StaffRole.OWNER,
    },
  });

  // Opening hours (Mon-Sat)
  const days = [0, 1, 2, 3, 4, 5]; // Mon-Sat
  for (const day of days) {
    await prisma.openingHours.create({
      data: {
        establishmentId: establishment.id,
        dayOfWeek: day,
        openTime: "09:00",
        closeTime: "22:00",
        isClosed: false,
      },
    });
  }
  // Sunday closed
  await prisma.openingHours.create({
    data: {
      establishmentId: establishment.id,
      dayOfWeek: 6,
      openTime: "09:00",
      closeTime: "22:00",
      isClosed: true,
    },
  });

  // Categories
  const entrees = await prisma.category.create({
    data: {
      establishmentId: establishment.id,
      name: "Entrées",
      sortOrder: 0,
    },
  });

  const plats = await prisma.category.create({
    data: {
      establishmentId: establishment.id,
      name: "Plats",
      sortOrder: 1,
    },
  });

  const desserts = await prisma.category.create({
    data: {
      establishmentId: establishment.id,
      name: "Desserts",
      sortOrder: 2,
    },
  });

  const boissons = await prisma.category.create({
    data: {
      establishmentId: establishment.id,
      name: "Boissons",
      sortOrder: 3,
    },
  });

  // Products
  await prisma.product.createMany({
    data: [
      {
        establishmentId: establishment.id,
        categoryId: entrees.id,
        name: "Soupe à l'oignon",
        description: "Soupe à l'oignon gratinée maison",
        price: 890,
        isAvailable: true,
        sortOrder: 0,
        tags: ["maison"],
        allergens: ["gluten", "lactose"],
      },
      {
        establishmentId: establishment.id,
        categoryId: entrees.id,
        name: "Salade César",
        description: "Salade romaine, poulet grillé, parmesan, croûtons",
        price: 1190,
        isAvailable: true,
        sortOrder: 1,
        tags: [],
        allergens: ["gluten", "lactose", "oeufs"],
      },
      {
        establishmentId: establishment.id,
        categoryId: plats.id,
        name: "Steak-frites",
        description: "Entrecôte 250g, frites maison, sauce au choix",
        price: 1890,
        isAvailable: true,
        sortOrder: 0,
        tags: ["maison"],
        allergens: [],
        preparationTime: 20,
      },
      {
        establishmentId: establishment.id,
        categoryId: plats.id,
        name: "Burger Classic",
        description: "Boeuf 180g, cheddar, salade, tomate, oignon, sauce maison",
        price: 1490,
        isAvailable: true,
        sortOrder: 1,
        tags: ["populaire"],
        allergens: ["gluten", "lactose"],
        preparationTime: 15,
      },
      {
        establishmentId: establishment.id,
        categoryId: desserts.id,
        name: "Crème brûlée",
        description: "Crème brûlée à la vanille de Madagascar",
        price: 790,
        isAvailable: true,
        sortOrder: 0,
        tags: ["maison"],
        allergens: ["lactose", "oeufs"],
      },
      {
        establishmentId: establishment.id,
        categoryId: boissons.id,
        name: "Coca-Cola 33cl",
        price: 350,
        isAvailable: true,
        sortOrder: 0,
        tags: [],
        allergens: [],
      },
    ],
  });

  // Pickup slot config
  for (const day of [0, 1, 2, 3, 4]) {
    await prisma.pickupSlotConfig.create({
      data: {
        establishmentId: establishment.id,
        dayOfWeek: day,
        startTime: "11:30",
        endTime: "14:00",
        slotDuration: 15,
        maxOrders: 5,
      },
    });
    await prisma.pickupSlotConfig.create({
      data: {
        establishmentId: establishment.id,
        dayOfWeek: day,
        startTime: "18:30",
        endTime: "21:00",
        slotDuration: 15,
        maxOrders: 5,
      },
    });
  }

  console.log("✅ Seed complete!");
  console.log({
    admin: admin.email,
    merchant: merchant.email,
    customer: customer.email,
    establishment: establishment.slug,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
