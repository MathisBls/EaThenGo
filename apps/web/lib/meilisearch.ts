import { MeiliSearch } from "meilisearch";

export const meilisearch = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST ?? "http://localhost:7700",
  apiKey: process.env.MEILISEARCH_API_KEY,
});

export const INDEXES = {
  ESTABLISHMENTS: "establishments",
  PRODUCTS: "products",
} as const;

// Document types for Meilisearch
export interface EstablishmentDocument {
  id: string;
  name: string;
  slug: string;
  type: string;
  city: string;
  description?: string;
  rating?: number;
  imageUrl?: string;
  _geo?: { lat: number; lng: number };
  isActive: boolean;
}

export interface ProductDocument {
  id: string;
  name: string;
  description?: string;
  price: number;
  establishmentId: string;
  establishmentName: string;
  categoryName?: string;
  tags: string[];
  allergens: string[];
  imageUrl?: string;
  isAvailable: boolean;
}

/**
 * Sync an establishment to Meilisearch
 */
export async function syncEstablishment(doc: EstablishmentDocument) {
  const index = meilisearch.index(INDEXES.ESTABLISHMENTS);
  await index.addDocuments([doc]);
}

/**
 * Remove an establishment from Meilisearch
 */
export async function removeEstablishment(id: string) {
  const index = meilisearch.index(INDEXES.ESTABLISHMENTS);
  await index.deleteDocument(id);
}

/**
 * Sync a product to Meilisearch
 */
export async function syncProduct(doc: ProductDocument) {
  const index = meilisearch.index(INDEXES.PRODUCTS);
  await index.addDocuments([doc]);
}

/**
 * Remove a product from Meilisearch
 */
export async function removeProduct(id: string) {
  const index = meilisearch.index(INDEXES.PRODUCTS);
  await index.deleteDocument(id);
}

/**
 * Search establishments
 */
export async function searchEstablishments(
  query: string,
  options?: {
    filter?: string[];
    sort?: string[];
    limit?: number;
    offset?: number;
  }
) {
  const index = meilisearch.index(INDEXES.ESTABLISHMENTS);
  return index.search<EstablishmentDocument>(query, {
    filter: options?.filter,
    sort: options?.sort,
    limit: options?.limit ?? 20,
    offset: options?.offset ?? 0,
    facets: ["type", "city"],
  });
}

/**
 * Search products within an establishment
 */
export async function searchProducts(
  query: string,
  establishmentId?: string,
  options?: {
    filter?: string[];
    limit?: number;
    offset?: number;
  }
) {
  const index = meilisearch.index(INDEXES.PRODUCTS);
  const filters = options?.filter ?? [];
  if (establishmentId) {
    filters.push(`establishmentId = "${establishmentId}"`);
  }
  return index.search<ProductDocument>(query, {
    filter: filters,
    limit: options?.limit ?? 50,
    offset: options?.offset ?? 0,
    facets: ["categoryName", "tags", "allergens"],
  });
}
