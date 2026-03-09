"use client";

import { useState } from "react";
import { ProductCard } from "./product-card";
import { ProductDetailSheet } from "./product-detail-sheet";
import { CartFloatingBar } from "../cart/cart-floating-bar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  isAvailable: boolean;
  allergens: string[];
  tags: string[];
  options: {
    id: string;
    name: string;
    type: "SINGLE" | "MULTIPLE";
    required: boolean;
    minSelect: number;
    maxSelect: number;
    options: { id: string; name: string; priceModifier: number; isDefault: boolean }[];
  }[];
};

type Category = {
  id: string;
  name: string;
  description: string | null;
};

interface StorefrontContentProps {
  establishment: {
    id: string;
    name: string;
    slug: string;
  };
  categories: Category[];
  productsByCategory: Record<string, Product[]>;
  uncategorizedProducts: Product[];
}

export function StorefrontContent({
  establishment,
  categories,
  productsByCategory,
  uncategorizedProducts,
}: StorefrontContentProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredCategories = activeCategory
    ? categories.filter((c) => c.id === activeCategory)
    : categories;

  return (
    <>
      {/* Category pills - horizontal scroll */}
      <nav className="flex gap-2 overflow-x-auto pb-4 mb-6 border-b scrollbar-hide">
        <button
          onClick={() => setActiveCategory(null)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
            !activeCategory
              ? "text-white"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
          style={!activeCategory ? { backgroundColor: "#690000" } : undefined}
        >
          Tout
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              activeCategory === category.id
                ? "text-white"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
            style={
              activeCategory === category.id
                ? { backgroundColor: "#690000" }
                : undefined
            }
          >
            {category.name}
          </button>
        ))}
      </nav>

      {/* Products by category */}
      <div className="space-y-10">
        {filteredCategories.map((category) => {
          const products = productsByCategory[category.id] || [];
          if (products.length === 0) return null;

          return (
            <section key={category.id} id={`cat-${category.id}`}>
              <div className="mb-4">
                <h2 className="text-xl font-bold">{category.name}</h2>
                {category.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.description}
                  </p>
                )}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    imageUrl={product.imageUrl}
                    isAvailable={product.isAvailable}
                    allergens={product.allergens}
                    tags={product.tags}
                    onAddToCart={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {uncategorizedProducts.length > 0 && !activeCategory && (
          <section>
            <h2 className="text-xl font-bold mb-4">Autres</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {uncategorizedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  isAvailable={product.isAvailable}
                  allergens={product.allergens}
                  tags={product.tags}
                  onAddToCart={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Product detail sheet */}
      {selectedProduct && (
        <ProductDetailSheet
          open={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
          establishment={establishment}
        />
      )}

      {/* Floating cart bar */}
      <CartFloatingBar establishmentSlug={establishment.slug} />
    </>
  );
}
