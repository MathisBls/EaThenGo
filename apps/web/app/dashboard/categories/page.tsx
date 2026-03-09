import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Catégories",
};

export default function DashboardCategoriesPage() {
  // TODO: Fetch categories with drag-and-drop reordering
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Catégories</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle catégorie
        </Button>
      </div>

      {/* TODO: Sortable list with dnd-kit */}
      <div className="rounded-lg border p-4 text-center text-muted-foreground">
        Aucune catégorie. Créez votre première catégorie.
      </div>
    </div>
  );
}
