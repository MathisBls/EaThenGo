"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";

export default function CartCheckoutPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { items, menuItems, subtotal, isEmpty, clearCart } = useCart();

  const [guestEmail, setGuestEmail] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [note, setNote] = useState("");
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceFee = Math.round(subtotal * 0.02); // 2% platform fee
  const total = subtotal + serviceFee;

  if (isEmpty) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-3xl text-center">
        <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
        <p className="text-muted-foreground mb-6">
          Ajoutez des produits pour passer commande.
        </p>
        <Link href={`/shop/${slug}`}>
          <Button style={{ backgroundColor: "#690000" }}>
            Retour au menu
          </Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!guestEmail || !guestName || !selectedTime) return;
    setIsSubmitting(true);

    // TODO: Call createOrder server action then redirect to Stripe Checkout
    // For now, just show a success message
    alert(
      `Commande simulée !\n\nRetrait: ${selectedDate} à ${selectedTime}\n${guestName} (${guestEmail})\nTotal: ${formatPrice(total)}`
    );
    clearCart();
    router.push(`/shop/${slug}`);
  };

  // Generate time slots (simplified client-side generation)
  const timeSlots = generateTimeSlots();

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Back button */}
      <Link
        href={`/shop/${slug}`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour au menu
      </Link>

      <h1 className="text-2xl font-bold mb-8">Finaliser la commande</h1>

      <div className="space-y-6">
        {/* Order Summary */}
        <section className="rounded-lg border p-4">
          <h2 className="font-semibold mb-4">Récapitulatif</h2>
          <div className="space-y-3">
            {items.map((item) => {
              const itemTotal =
                (item.price +
                  item.options.reduce((s, o) => s + o.priceModifier, 0)) *
                item.quantity;
              return (
                <div key={item.id} className="flex justify-between text-sm">
                  <div>
                    <span className="font-medium">{item.quantity}x</span>{" "}
                    {item.name}
                    {item.options.length > 0 && (
                      <p className="text-xs text-muted-foreground ml-5">
                        {item.options.map((o) => o.optionName).join(", ")}
                      </p>
                    )}
                  </div>
                  <span>{formatPrice(itemTotal)}</span>
                </div>
              );
            })}
            {menuItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <div>
                  <span className="font-medium">{item.quantity}x</span>{" "}
                  {item.name}
                  <p className="text-xs text-muted-foreground ml-5">
                    {item.choices.map((c) => c.productName).join(", ")}
                  </p>
                </div>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <Separator className="my-3" />

          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Sous-total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Frais de service (2%)</span>
              <span>{formatPrice(serviceFee)}</span>
            </div>
          </div>
        </section>

        {/* Pickup Slot */}
        <section className="rounded-lg border p-4">
          <h2 className="font-semibold mb-4">Créneau de retrait</h2>
          <div className="mb-3">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedTime(null);
              }}
              min={new Date().toISOString().split("T")[0]}
              className="h-10 rounded-md border px-3 text-sm"
            />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                  selectedTime === time
                    ? "border-[#690000] bg-[#690000]/10 text-[#690000]"
                    : "hover:border-[#690000]/50 hover:bg-muted"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </section>

        {/* Contact Info */}
        <section className="rounded-lg border p-4">
          <h2 className="font-semibold mb-4">Vos coordonnées</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium" htmlFor="email">
                Email *
              </label>
              <input
                id="email"
                type="email"
                required
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="w-full mt-1 h-10 rounded-md border px-3 text-sm"
                placeholder="votre@email.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="name">
                Nom *
              </label>
              <input
                id="name"
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full mt-1 h-10 rounded-md border px-3 text-sm"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="phone">
                Téléphone
              </label>
              <input
                id="phone"
                type="tel"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                className="w-full mt-1 h-10 rounded-md border px-3 text-sm"
                placeholder="06 12 34 56 78"
              />
            </div>
          </div>
        </section>

        {/* Special instructions */}
        <section className="rounded-lg border p-4">
          <h2 className="font-semibold mb-4">Instructions spéciales</h2>
          <textarea
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Allergies, préférences..."
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </section>

        {/* Total + Pay button */}
        <div className="rounded-lg border p-4" style={{ backgroundColor: "#690000/5" }}>
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-lg">Total</span>
            <span className="text-2xl font-bold" style={{ color: "#690000" }}>
              {formatPrice(total)}
            </span>
          </div>
          <Button
            className="w-full h-12 text-base font-semibold"
            style={{ backgroundColor: "#690000" }}
            disabled={!guestEmail || !guestName || !selectedTime || isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? "Traitement en cours..." : `Payer ${formatPrice(total)}`}
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Paiement sécurisé par Stripe
          </p>
        </div>
      </div>
    </div>
  );
}

function generateTimeSlots(): string[] {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMin = now.getMinutes();
  const slots: string[] = [];

  // Lunch slots: 11:30 - 14:00
  for (let h = 11; h < 14; h++) {
    for (let m = h === 11 ? 30 : 0; m < 60; m += 15) {
      if (h === 13 && m > 45) break;
      if (h > currentHour || (h === currentHour && m > currentMin + 30)) {
        slots.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
      }
    }
  }

  // Dinner slots: 18:30 - 22:00
  for (let h = 18; h < 22; h++) {
    for (let m = h === 18 ? 30 : 0; m < 60; m += 15) {
      if (h === 21 && m > 45) break;
      if (h > currentHour || (h === currentHour && m > currentMin + 30)) {
        slots.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
      }
    }
  }

  return slots;
}
