import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commandes",
};

// TODO: Kanban board with real-time updates via Pusher
export default function DashboardOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Commandes</h1>
        {/* TODO: Filter by date, status */}
      </div>

      {/* Kanban board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Confirmed */}
        <div className="rounded-lg border bg-blue-50/50 p-4">
          <h2 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            Confirmées
            <span className="ml-auto text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">0</span>
          </h2>
          {/* TODO: OrderKanbanCard components */}
          <p className="text-sm text-muted-foreground text-center py-4">Aucune commande</p>
        </div>

        {/* Preparing */}
        <div className="rounded-lg border bg-orange-50/50 p-4">
          <h2 className="font-semibold text-orange-800 mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            En préparation
            <span className="ml-auto text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">0</span>
          </h2>
          <p className="text-sm text-muted-foreground text-center py-4">Aucune commande</p>
        </div>

        {/* Ready */}
        <div className="rounded-lg border bg-green-50/50 p-4">
          <h2 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Prêtes
            <span className="ml-auto text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">0</span>
          </h2>
          <p className="text-sm text-muted-foreground text-center py-4">Aucune commande</p>
        </div>
      </div>
    </div>
  );
}
