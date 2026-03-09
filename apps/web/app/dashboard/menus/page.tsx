import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Menus & Formules",
};

export default function DashboardMenusPage() {
  // TODO: Fetch menus with sections
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Menus & Formules</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau menu
        </Button>
      </div>

      {/* TODO: Menu cards with edit/delete */}
      <div className="rounded-lg border p-4 text-center text-muted-foreground">
        Aucun menu. Créez votre première formule.
      </div>
    </div>
  );
}
