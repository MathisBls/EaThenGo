import type { Metadata } from "next";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Détail commande",
};

export default async function DashboardOrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;

  // TODO: Fetch order with items, customer info
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Commande #{id}</h1>

      {/* Status + actions */}
      <div className="rounded-lg border p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Statut</span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Confirmée
          </span>
        </div>
        <div className="flex gap-2">
          {/* TODO: Status transition buttons */}
          <button className="flex-1 h-10 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600">
            Commencer la préparation
          </button>
          <button className="h-10 px-4 rounded-lg border text-sm font-medium text-destructive hover:bg-destructive/10">
            Annuler
          </button>
        </div>
      </div>

      {/* Order details */}
      <div className="rounded-lg border p-4 space-y-4">
        <h2 className="font-semibold">Articles</h2>
        <p className="text-sm text-muted-foreground">Chargement des articles...</p>
      </div>

      {/* Customer info */}
      <div className="rounded-lg border p-4 space-y-2">
        <h2 className="font-semibold">Client</h2>
        <p className="text-sm text-muted-foreground">Informations client...</p>
      </div>

      {/* Pickup info */}
      <div className="rounded-lg border p-4 space-y-2">
        <h2 className="font-semibold">Retrait</h2>
        <p className="text-sm text-muted-foreground">Créneau et code de retrait...</p>
      </div>
    </div>
  );
}
