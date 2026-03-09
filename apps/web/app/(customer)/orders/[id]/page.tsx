import type { Metadata } from "next";

interface CustomerOrderDetailProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Détail commande",
};

export default async function CustomerOrderDetailPage({ params }: CustomerOrderDetailProps) {
  const { id } = await params;

  // TODO: Fetch order detail + real-time status updates via Pusher
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Commande #{id}</h1>

      {/* Status tracker */}
      <div className="rounded-lg border p-4 mb-6">
        <h2 className="font-semibold mb-4">Suivi de commande</h2>
        {/* TODO: Step progress indicator (Confirmée → En préparation → Prête) */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-primary font-medium">Confirmée</span>
          <span className="text-muted-foreground">En préparation</span>
          <span className="text-muted-foreground">Prête</span>
          <span className="text-muted-foreground">Retirée</span>
        </div>
      </div>

      {/* Order info */}
      <div className="rounded-lg border p-4 space-y-4">
        <p className="text-sm text-muted-foreground">Détails de la commande à charger.</p>
      </div>
    </div>
  );
}
