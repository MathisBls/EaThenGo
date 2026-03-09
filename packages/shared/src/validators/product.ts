import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Nom requis").max(200),
  description: z.string().max(2000).optional(),
  price: z.number().int().min(0, "Le prix ne peut pas être négatif"),
  compareAtPrice: z.number().int().min(0).optional().nullable(),
  categoryId: z.string().cuid().optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  allergens: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  isAvailable: z.boolean().default(true),
  preparationTime: z.number().int().min(0).optional().nullable(),
});

export const updateProductSchema = createProductSchema.partial();

export const createCategorySchema = z.object({
  name: z.string().min(1, "Nom requis").max(100),
  description: z.string().max(500).optional(),
  imageUrl: z.string().url().optional().nullable(),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const updateCategorySchema = createCategorySchema.partial();

export const createOptionGroupSchema = z.object({
  productId: z.string().cuid(),
  name: z.string().min(1, "Nom requis").max(100),
  type: z.enum(["SINGLE", "MULTIPLE"]).default("SINGLE"),
  required: z.boolean().default(false),
  minSelect: z.number().int().min(0).default(0),
  maxSelect: z.number().int().min(1).default(1),
  options: z.array(
    z.object({
      name: z.string().min(1),
      priceModifier: z.number().int().default(0),
      isDefault: z.boolean().default(false),
    })
  ),
});

export const createMenuSchema = z.object({
  name: z.string().min(1, "Nom requis").max(200),
  description: z.string().max(1000).optional(),
  price: z.number().int().min(0),
  imageUrl: z.string().url().optional().nullable(),
  sections: z.array(
    z.object({
      name: z.string().min(1),
      categoryId: z.string().cuid().optional().nullable(),
      required: z.boolean().default(true),
      maxSelect: z.number().int().min(1).default(1),
      productIds: z.array(z.string().cuid()),
    })
  ),
});

export const updateMenuSchema = createMenuSchema.partial();

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type CreateOptionGroupInput = z.infer<typeof createOptionGroupSchema>;
export type CreateMenuInput = z.infer<typeof createMenuSchema>;
