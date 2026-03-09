import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export const registerCustomerSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
  phone: z.string().optional(),
});

export const registerMerchantSchema = registerCustomerSchema.extend({
  establishmentName: z.string().min(2, "Le nom du commerce doit contenir au moins 2 caractères"),
  establishmentType: z.enum([
    "RESTAURANT",
    "BAKERY",
    "BUTCHER",
    "GROCERY",
    "FLORIST",
    "OTHER",
  ]),
  siret: z
    .string()
    .regex(/^\d{14}$/, "Le SIRET doit contenir 14 chiffres")
    .optional(),
  address: z.string().min(5, "Adresse requise"),
  city: z.string().min(2, "Ville requise"),
  zipCode: z.string().regex(/^\d{5}$/, "Code postal invalide"),
});

export const verifyEmailSchema = z.object({
  token: z.string().min(1),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterCustomerInput = z.infer<typeof registerCustomerSchema>;
export type RegisterMerchantInput = z.infer<typeof registerMerchantSchema>;
