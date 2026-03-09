import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paramètres",
};

// TODO: Establishment settings form (name, description, logo, banner, address, etc.)
export default function DashboardSettingsPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Paramètres du commerce</h1>

      <div className="rounded-lg border p-4 space-y-4">
        <h2 className="font-semibold">Informations générales</h2>
        <p className="text-sm text-muted-foreground">
          Formulaire de mise à jour des informations du commerce.
        </p>
        {/* TODO: UpdateEstablishmentForm component */}
      </div>
    </div>
  );
}
