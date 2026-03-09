import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Créneaux de retrait",
};

export default function DashboardPickupPage() {
  // TODO: Pickup slot config form per day
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Créneaux de retrait</h1>

      <div className="rounded-lg border p-4">
        <p className="text-sm text-muted-foreground mb-4">
          Configurez les créneaux de retrait pour chaque jour de la semaine.
        </p>
        {/* TODO: PickupSlotConfigForm component */}
        <p className="text-sm text-muted-foreground text-center py-4">
          Configuration des créneaux ici.
        </p>
      </div>
    </div>
  );
}
