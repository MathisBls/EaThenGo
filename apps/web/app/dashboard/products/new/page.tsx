import type { Metadata } from "next";
import { ProductForm } from "@/components/dashboard/product-form";

export const metadata: Metadata = {
  title: "Nouveau produit",
};

export default function NewProductPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Nouveau produit</h1>
      <ProductForm />
    </div>
  );
}
