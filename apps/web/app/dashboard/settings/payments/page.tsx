import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Paiements",
};

export default function DashboardPaymentsPage() {
  // TODO: Stripe Connect onboarding flow
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Paiements</h1>

      <div className="rounded-lg border p-6 text-center space-y-4">
        <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center">
          <span className="text-2xl">💳</span>
        </div>
        <h2 className="font-semibold">Configurer Stripe Connect</h2>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Connectez votre compte Stripe pour recevoir les paiements de vos clients.
        </p>
        <Button>
          Connecter Stripe
        </Button>
      </div>
    </div>
  );
}
