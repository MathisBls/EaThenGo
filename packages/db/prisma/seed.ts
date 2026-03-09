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

  // ─── MEME RINA PIZZERIA ──────────────────────────
  console.log("🍕 Seeding Meme Rina...");

  const memeRinaMerchantPassword = await hash("memerina123", 12);
  const memeRinaMerchant = await prisma.user.upsert({
    where: { email: "contact@memerina.fr" },
    update: {},
    create: {
      email: "contact@memerina.fr",
      name: "Meme Rina",
      passwordHash: memeRinaMerchantPassword,
      role: UserRole.MERCHANT,
      emailVerified: new Date(),
    },
  });

  const memeRina = await prisma.establishment.upsert({
    where: { slug: "meme-rina" },
    update: {},
    create: {
      slug: "meme-rina",
      name: "Pizzeria Meme Rina",
      description:
        "Chez Meme Rina, chaque pizza est un voyage culinaire. Des recettes authentiques inspirées des grands-mères du monde entier, préparées avec des ingrédients frais et de qualité.",
      type: EstablishmentType.RESTAURANT,
      address: "10 avenue du Maréchal Foch",
      city: "Chatou",
      zipCode: "78400",
      country: "FR",
      lat: 48.8944,
      lng: 2.1594,
      phone: "09 82 72 66 07",
      email: "contact@memerina.fr",
      website: "https://memerina.fr",
      siret: "93756588500012",
      isActive: true,
      isVerified: true,
      ownerId: memeRinaMerchant.id,
    },
  });

  await prisma.staffMember.upsert({
    where: {
      establishmentId_userId: {
        establishmentId: memeRina.id,
        userId: memeRinaMerchant.id,
      },
    },
    update: {},
    create: {
      establishmentId: memeRina.id,
      userId: memeRinaMerchant.id,
      role: StaffRole.OWNER,
    },
  });

  // Meme Rina opening hours: Tue-Sat (1-5), Mon+Sun closed
  // Lunch: 11h30-14h00, Dinner: 18h30-22h00
  const memeRinaDays = [
    { day: 0, closed: true },  // Monday
    { day: 1, closed: false }, // Tuesday
    { day: 2, closed: false }, // Wednesday
    { day: 3, closed: false }, // Thursday
    { day: 4, closed: false }, // Friday
    { day: 5, closed: false }, // Saturday
    { day: 6, closed: true },  // Sunday
  ];

  for (const { day, closed } of memeRinaDays) {
    if (closed) {
      await prisma.openingHours.create({
        data: {
          establishmentId: memeRina.id,
          dayOfWeek: day,
          openTime: "00:00",
          closeTime: "00:00",
          isClosed: true,
        },
      });
    } else {
      // Lunch
      await prisma.openingHours.create({
        data: {
          establishmentId: memeRina.id,
          dayOfWeek: day,
          openTime: "11:30",
          closeTime: "14:00",
          isClosed: false,
        },
      });
      // Dinner
      await prisma.openingHours.create({
        data: {
          establishmentId: memeRina.id,
          dayOfWeek: day,
          openTime: "18:30",
          closeTime: "22:00",
          isClosed: false,
        },
      });
    }
  }

  // Meme Rina category: Pizzas
  const pizzas = await prisma.category.create({
    data: {
      establishmentId: memeRina.id,
      name: "Nos Pizzas",
      description: "Pizzas artisanales inspirées des grands-mères du monde entier",
      sortOrder: 0,
    },
  });

  const specialites = await prisma.category.create({
    data: {
      establishmentId: memeRina.id,
      name: "Spécialités",
      description: "Les créations uniques de Meme Rina",
      sortOrder: 1,
    },
  });

  // Meme Rina: 13 pizzas (prices in centimes)
  const memeRinaPizzas = [
    {
      name: "La Nonna",
      description: "Sauce tomate, mozzarella fior di latte, basilic frais, huile d'olive extra vierge",
      price: 1390,
      categoryId: pizzas.id,
      tags: ["classique", "végétarienne"],
      allergens: ["gluten", "lactose"],
      sortOrder: 0,
    },
    {
      name: "La Granny",
      description: "Crème fraîche, lardons fumés, oignons caramélisés, comté AOP, roquette",
      price: 1650,
      categoryId: pizzas.id,
      tags: ["populaire"],
      allergens: ["gluten", "lactose"],
      sortOrder: 1,
    },
    {
      name: "La Meme",
      description: "Sauce tomate, mozzarella, pepperoni, poivrons grillés, olives noires, origan",
      price: 1790,
      categoryId: pizzas.id,
      tags: ["best-seller"],
      allergens: ["gluten", "lactose"],
      sortOrder: 2,
    },
    {
      name: "La Jaddah",
      description: "Sauce tomate épicée, mozzarella, merguez, poivrons, oignons rouges, coriandre",
      price: 1690,
      categoryId: pizzas.id,
      tags: ["épicée"],
      allergens: ["gluten", "lactose"],
      sortOrder: 3,
    },
    {
      name: "La Nani",
      description: "Sauce tandoori, poulet mariné, mozzarella, oignons rouges, coriandre fraîche",
      price: 1690,
      categoryId: pizzas.id,
      tags: ["épicée"],
      allergens: ["gluten", "lactose"],
      sortOrder: 4,
    },
    {
      name: "La Abuela",
      description: "Sauce tomate, mozzarella, chorizo ibérique, poivrons piquillos, manchego, piment d'Espelette",
      price: 1890,
      categoryId: pizzas.id,
      tags: [],
      allergens: ["gluten", "lactose"],
      sortOrder: 5,
    },
    {
      name: "La Anne Anne",
      description: "Crème fraîche, saumon fumé, aneth, câpres, oignons rouges, citron",
      price: 1890,
      categoryId: pizzas.id,
      tags: [],
      allergens: ["gluten", "lactose", "poisson"],
      sortOrder: 6,
    },
    {
      name: "La Babushka",
      description: "Crème fraîche, saumon gravlax, œufs de truite, aneth, oignons confits, mascarpone",
      price: 2290,
      categoryId: pizzas.id,
      tags: ["premium"],
      allergens: ["gluten", "lactose", "poisson", "oeufs"],
      sortOrder: 7,
    },
    {
      name: "La Avo",
      description: "Sauce tomate, mozzarella di bufala, burrata, tomates cerises, prosciutto crudo, roquette, parmesan",
      price: 2290,
      categoryId: pizzas.id,
      tags: ["premium"],
      allergens: ["gluten", "lactose"],
      sortOrder: 8,
    },
    {
      name: "La Waipo",
      description: "Sauce soja sucrée, poulet teriyaki, mozzarella, oignons caramélisés, sésame, ciboulette",
      price: 1990,
      categoryId: pizzas.id,
      tags: [],
      allergens: ["gluten", "lactose", "soja", "sésame"],
      sortOrder: 9,
    },
    {
      name: "La Maam",
      description: "Sauce tikka masala, poulet tandoori, mozzarella, oignons rouges, menthe fraîche, yaourt",
      price: 1890,
      categoryId: pizzas.id,
      tags: [],
      allergens: ["gluten", "lactose"],
      sortOrder: 10,
    },
    {
      name: "Faites confiance à Meme",
      description: "La pizza surprise du chef — laissez Meme choisir pour vous ! Ingrédients du jour, inspiration du moment.",
      price: 1690,
      categoryId: specialites.id,
      tags: ["surprise", "chef"],
      allergens: ["gluten", "lactose"],
      sortOrder: 0,
    },
    {
      name: "La Pizza qu'on ne veut pas vendre !",
      description: "Notre recette secrète — si bonne qu'on hésite à la partager. Demandez au comptoir pour en savoir plus !",
      price: 1990,
      categoryId: specialites.id,
      tags: ["secret", "exclusif"],
      allergens: ["gluten", "lactose"],
      sortOrder: 1,
    },
  ];

  await prisma.product.createMany({
    data: memeRinaPizzas.map((p) => ({
      establishmentId: memeRina.id,
      categoryId: p.categoryId,
      name: p.name,
      description: p.description,
      price: p.price,
      isAvailable: true,
      sortOrder: p.sortOrder,
      tags: p.tags,
      allergens: p.allergens,
      preparationTime: 15,
    })),
  });

  // Option groups for Meme Rina pizzas (size + extra toppings)
  const allMemeRinaProducts = await prisma.product.findMany({
    where: { establishmentId: memeRina.id },
  });

  for (const product of allMemeRinaProducts) {
    // Size option
    const sizeGroup = await prisma.optionGroup.create({
      data: {
        productId: product.id,
        name: "Taille",
        type: "SINGLE",
        required: true,
        minSelect: 1,
        maxSelect: 1,
        sortOrder: 0,
      },
    });

    await prisma.option.createMany({
      data: [
        { optionGroupId: sizeGroup.id, name: "Classique (31cm)", priceModifier: 0, isDefault: true, sortOrder: 0 },
        { optionGroupId: sizeGroup.id, name: "Grande (36cm)", priceModifier: 300, sortOrder: 1 },
      ],
    });

    // Extra toppings
    const extrasGroup = await prisma.optionGroup.create({
      data: {
        productId: product.id,
        name: "Suppléments",
        type: "MULTIPLE",
        required: false,
        minSelect: 0,
        maxSelect: 5,
        sortOrder: 1,
      },
    });

    await prisma.option.createMany({
      data: [
        { optionGroupId: extrasGroup.id, name: "Mozzarella supplémentaire", priceModifier: 200, sortOrder: 0 },
        { optionGroupId: extrasGroup.id, name: "Burrata", priceModifier: 350, sortOrder: 1 },
        { optionGroupId: extrasGroup.id, name: "Jambon de Parme", priceModifier: 300, sortOrder: 2 },
        { optionGroupId: extrasGroup.id, name: "Roquette", priceModifier: 100, sortOrder: 3 },
        { optionGroupId: extrasGroup.id, name: "Œuf", priceModifier: 150, sortOrder: 4 },
      ],
    });
  }

  // Meme Rina pickup slot config: Tue-Sat lunch + dinner
  for (const day of [1, 2, 3, 4, 5]) {
    await prisma.pickupSlotConfig.create({
      data: {
        establishmentId: memeRina.id,
        dayOfWeek: day,
        startTime: "11:30",
        endTime: "14:00",
        slotDuration: 15,
        maxOrders: 8,
      },
    });
    await prisma.pickupSlotConfig.create({
      data: {
        establishmentId: memeRina.id,
        dayOfWeek: day,
        startTime: "18:30",
        endTime: "22:00",
        slotDuration: 15,
        maxOrders: 8,
      },
    });
  }

  console.log("✅ Seed complete!");
  console.log({
    admin: admin.email,
    merchant: merchant.email,
    customer: customer.email,
    establishment: establishment.slug,
    memeRina: memeRina.slug,
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
