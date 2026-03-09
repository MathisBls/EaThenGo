import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics",
};

export default function DashboardAnalyticsPage() {
  // TODO: Charts (orders/day, revenue, top products)
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold mb-4">Commandes par jour</h2>
          <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
            Graphique à venir
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold mb-4">Chiffre d&apos;affaires</h2>
          <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
            Graphique à venir
          </div>
        </div>
        <div className="rounded-lg border p-4 md:col-span-2">
          <h2 className="font-semibold mb-4">Top produits</h2>
          <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
            Classement à venir
          </div>
        </div>
      </div>
    </div>
  );
}
