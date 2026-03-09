import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mes commandes",
};

export default function CustomerOrdersPage() {
  // TODO: Fetch orders for the current user
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Mes commandes</h1>

      {/* TODO: Order list with status badges */}
      <div className="space-y-4">
        <div className="rounded-lg border p-6 text-center text-muted-foreground">
          Vous n&apos;avez pas encore de commande.
          <br />
          <Link href="/explore" className="text-primary hover:underline mt-2 inline-block">
            Découvrir les commerces
          </Link>
        </div>
      </div>
    </div>
  );
}
