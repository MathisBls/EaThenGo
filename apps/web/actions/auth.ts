"use server";

import { hash } from "bcryptjs";
import { db } from "@clickcollect/db";
import { registerCustomerSchema, registerMerchantSchema } from "@clickcollect/shared";
import { signIn } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function registerCustomer(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const parsed = registerCustomerSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: "Données invalides", errors: parsed.error.flatten().fieldErrors };
  }

  const existing = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) {
    return { error: "Cet email est déjà utilisé" };
  }

  const passwordHash = await hash(parsed.data.password, 12);

  await db.user.create({
    data: {
      email: parsed.data.email,
      name: parsed.data.name,
      phone: parsed.data.phone,
      passwordHash,
      role: "CUSTOMER",
    },
  });

  // TODO: Send verification email
  // TODO: Send welcome email

  await signIn("credentials", {
    email: parsed.data.email,
    password: parsed.data.password,
    redirect: false,
  });

  return { success: true };
}

export async function registerMerchant(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const parsed = registerMerchantSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: "Données invalides", errors: parsed.error.flatten().fieldErrors };
  }

  const existing = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) {
    return { error: "Cet email est déjà utilisé" };
  }

  const passwordHash = await hash(parsed.data.password, 12);
  const slug = slugify(parsed.data.establishmentName);

  // Check slug uniqueness
  const existingSlug = await db.establishment.findUnique({ where: { slug } });
  const finalSlug = existingSlug ? `${slug}-${Date.now().toString(36)}` : slug;

  const user = await db.user.create({
    data: {
      email: parsed.data.email,
      name: parsed.data.name,
      phone: parsed.data.phone,
      passwordHash,
      role: "MERCHANT",
      ownedEstablishments: {
        create: {
          slug: finalSlug,
          name: parsed.data.establishmentName,
          type: parsed.data.establishmentType as any,
          address: parsed.data.address,
          city: parsed.data.city,
          zipCode: parsed.data.zipCode,
          email: parsed.data.email,
          siret: parsed.data.siret || undefined,
          staff: {
            create: {
              userId: undefined as any, // Will be set via relation
              role: "OWNER",
            },
          },
        },
      },
    },
    include: { ownedEstablishments: true },
  });

  // Fix: Create staff member separately since we need the user ID
  if (user.ownedEstablishments[0]) {
    await db.staffMember.create({
      data: {
        establishmentId: user.ownedEstablishments[0].id,
        userId: user.id,
        role: "OWNER",
      },
    });
  }

  // TODO: Send verification email

  await signIn("credentials", {
    email: parsed.data.email,
    password: parsed.data.password,
    redirect: false,
  });

  return { success: true };
}
