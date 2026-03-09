"use client";

// TODO: React Hook Form + registerCustomerSchema validation + register server action
import { Button } from "@/components/ui/button";

export function RegisterForm() {
  return (
    <form className="space-y-4">
      <div>
        <label className="text-sm font-medium" htmlFor="name">Nom</label>
        <input
          id="name"
          type="text"
          required
          className="w-full mt-1 h-10 rounded-md border px-3 text-sm"
          placeholder="Votre nom"
        />
      </div>
      <div>
        <label className="text-sm font-medium" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          className="w-full mt-1 h-10 rounded-md border px-3 text-sm"
          placeholder="votre@email.com"
        />
      </div>
      <div>
        <label className="text-sm font-medium" htmlFor="password">Mot de passe</label>
        <input
          id="password"
          type="password"
          required
          className="w-full mt-1 h-10 rounded-md border px-3 text-sm"
          placeholder="8 caractères minimum"
        />
      </div>
      <Button type="submit" className="w-full">
        Créer mon compte
      </Button>
    </form>
  );
}
