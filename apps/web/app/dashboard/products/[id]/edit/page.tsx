import type { Metadata } from "next";
import { ProductForm } from "@/components/dashboard/product-form";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Modifier le produit",
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  // TODO: Fetch product by id (with ownership check)
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Modifier le produit</h1>
      <ProductForm productId={id} />
    </div>
  );
}
