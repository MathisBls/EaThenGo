"use client";

// TODO: Checkout form for guest users (email, name, phone)
// Pre-filled if user is logged in

export function CheckoutForm() {
  return (
    <form className="space-y-4">
      <div>
        <label className="text-sm font-medium" htmlFor="email">
          Email *
        </label>
        <input
          id="email"
          type="email"
          required
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
          className="w-full mt-1 h-10 rounded-md border px-3 text-sm"
          placeholder="06 12 34 56 78"
        />
      </div>
    </form>
  );
}
