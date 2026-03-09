"use server";

import { db } from "@clickcollect/db";
import { auth } from "@/lib/auth";
import { createProductSchema, updateProductSchema } from "@clickcollect/shared";
import { revalidatePath } from "next/cache";

async function getEstablishmentId() {
  const session = await auth();
  if (!session?.user) throw new Error("Non authentifié");
  const establishmentId = (session.user as any).establishmentId;
  if (!establishmentId) throw new Error("Aucun établissement associé");
  return { userId: session.user.id!, establishmentId };
}

export async function createProduct(formData: FormData) {
  const { establishmentId } = await getEstablishmentId();

  const raw = Object.fromEntries(formData);
  // Convert price from euros to centimes
  const priceInCents = Math.round(Number(raw.price) * 100);

  const parsed = createProductSchema.safeParse({
    ...raw,
    price: priceInCents,
    allergens: raw.allergens ? JSON.parse(raw.allergens as string) : [],
    tags: raw.tags ? JSON.parse(raw.tags as string) : [],
  });

  if (!parsed.success) {
    return { error: "Données invalides", errors: parsed.error.flatten().fieldErrors };
  }

  const product = await db.product.create({
    data: {
      ...parsed.data,
      establishmentId,
    },
  });

  // TODO: Sync to Meilisearch

  revalidatePath("/dashboard/products");
  return { success: true, productId: product.id };
}

export async function updateProduct(productId: string, formData: FormData) {
  const { establishmentId } = await getEstablishmentId();

  const raw = Object.fromEntries(formData);
  const priceInCents = raw.price ? Math.round(Number(raw.price) * 100) : undefined;

  const parsed = updateProductSchema.safeParse({
    ...raw,
    price: priceInCents,
  });

  if (!parsed.success) {
    return { error: "Données invalides", errors: parsed.error.flatten().fieldErrors };
  }

  await db.product.update({
    where: { id: productId, establishmentId },
    data: parsed.data,
  });

  // TODO: Sync to Meilisearch

  revalidatePath("/dashboard/products");
  return { success: true };
}

export async function deleteProduct(productId: string) {
  const { establishmentId } = await getEstablishmentId();

  await db.product.delete({
    where: { id: productId, establishmentId },
  });

  // TODO: Remove from Meilisearch

  revalidatePath("/dashboard/products");
  return { success: true };
}

export async function toggleProductAvailability(productId: string) {
  const { establishmentId } = await getEstablishmentId();

  const product = await db.product.findUnique({
    where: { id: productId, establishmentId },
    select: { isAvailable: true },
  });

  if (!product) throw new Error("Produit non trouvé");

  await db.product.update({
    where: { id: productId, establishmentId },
    data: { isAvailable: !product.isAvailable },
  });

  revalidatePath("/dashboard/products");
  return { success: true };
}
