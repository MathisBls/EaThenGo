"use client";

// TODO: React Hook Form + Zod validation + signIn server action
import { Button } from "@/components/ui/button";

export function LoginForm() {
  return (
    <form className="space-y-4">
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
        />
      </div>
      <Button type="submit" className="w-full">
        Se connecter
      </Button>
    </form>
  );
}
