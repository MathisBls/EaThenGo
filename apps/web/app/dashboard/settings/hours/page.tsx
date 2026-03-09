import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Horaires d'ouverture",
};

export default function DashboardHoursPage() {
  // TODO: Opening hours form (7 days, open/close time, isClosed toggle)
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Horaires d&apos;ouverture</h1>

      <div className="rounded-lg border p-4 space-y-4">
        {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"].map(
          (day, i) => (
            <div key={day} className="flex items-center gap-4 py-2 border-b last:border-0">
              <span className="w-24 text-sm font-medium">{day}</span>
              <input type="time" className="h-9 rounded-md border px-2 text-sm" defaultValue="09:00" />
              <span className="text-muted-foreground">—</span>
              <input type="time" className="h-9 rounded-md border px-2 text-sm" defaultValue="19:00" />
              <label className="flex items-center gap-2 text-sm ml-auto">
                <input type="checkbox" />
                Fermé
              </label>
            </div>
          )
        )}
        <button className="w-full h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
          Enregistrer
        </button>
      </div>
    </div>
  );
}
