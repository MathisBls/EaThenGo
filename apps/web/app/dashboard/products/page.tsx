import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Produits",
};

export default function DashboardProductsPage() {
  // TODO: Fetch products with categories
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Produits</h1>
        <Button asChild>
          <Link href="/dashboard/products/new">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau produit
          </Link>
        </Button>
      </div>

      {/* TODO: DataTable with columns: image, name, category, price, available, actions */}
      <div className="rounded-lg border">
        <div className="p-4 text-center text-muted-foreground">
          Aucun produit. Créez votre premier produit.
        </div>
      </div>
    </div>
  );
}
