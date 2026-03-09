import type { Metadata } from "next";
import { ShoppingBag, Euro, TrendingUp, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Tableau de bord",
};

export default function DashboardPage() {
  // TODO: Fetch real stats from DB
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Tableau de bord</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <ShoppingBag className="h-4 w-4" />
            <span className="text-sm">Commandes aujourd&apos;hui</span>
          </div>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Euro className="h-4 w-4" />
            <span className="text-sm">CA aujourd&apos;hui</span>
          </div>
          <p className="text-2xl font-bold">0,00 €</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Clock className="h-4 w-4" />
            <span className="text-sm">En préparation</span>
          </div>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">Panier moyen</span>
          </div>
          <p className="text-2xl font-bold">0,00 €</p>
        </div>
      </div>

      {/* Recent orders */}
      <div className="rounded-lg border p-4">
        <h2 className="font-semibold mb-4">Commandes récentes</h2>
        <p className="text-sm text-muted-foreground">Aucune commande récente.</p>
      </div>
    </div>
  );
}
