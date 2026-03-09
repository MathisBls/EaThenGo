"use client";

// TODO: This is the checkout page
// Récap commande + choix créneau + infos contact + redirect Stripe

export default function CartCheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-8">Finaliser la commande</h1>

      <div className="space-y-6">
        {/* Order Summary */}
        <section className="rounded-lg border p-4">
          <h2 className="font-semibold mb-4">Récapitulatif</h2>
          {/* TODO: OrderSummary component */}
          <p className="text-sm text-muted-foreground">Vos articles apparaîtront ici.</p>
        </section>

        {/* Pickup Slot */}
        <section className="rounded-lg border p-4">
          <h2 className="font-semibold mb-4">Créneau de retrait</h2>
          {/* TODO: PickupSlotSelector component */}
          <p className="text-sm text-muted-foreground">Choisissez un créneau de retrait.</p>
        </section>

        {/* Contact Info (if guest) */}
        <section className="rounded-lg border p-4">
          <h2 className="font-semibold mb-4">Vos coordonnées</h2>
          {/* TODO: CheckoutForm component */}
          <p className="text-sm text-muted-foreground">Email, nom, téléphone.</p>
        </section>

        {/* Special instructions */}
        <section className="rounded-lg border p-4">
          <h2 className="font-semibold mb-4">Instructions spéciales</h2>
          <textarea
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Allergies, préférences..."
            rows={3}
          />
        </section>

        {/* Total + Pay button */}
        <div className="rounded-lg border p-4 bg-muted/50">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-bold">0,00 €</span>
          </div>
          <button className="w-full h-12 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
            Payer et commander
          </button>
        </div>
      </div>
    </div>
  );
}
