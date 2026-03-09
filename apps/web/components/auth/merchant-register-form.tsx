"use client";

// TODO: Multi-step form: 1) Personal info, 2) Establishment info
// Uses registerMerchantSchema from @clickcollect/shared
import { Button } from "@/components/ui/button";

export function MerchantRegisterForm() {
  return (
    <form className="space-y-4">
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Informations personnelles
        </legend>
        <div>
          <label className="text-sm font-medium" htmlFor="name">Nom complet</label>
          <input id="name" type="text" required className="w-full mt-1 h-10 rounded-md border px-3 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="email">Email</label>
          <input id="email" type="email" required className="w-full mt-1 h-10 rounded-md border px-3 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="password">Mot de passe</label>
          <input id="password" type="password" required className="w-full mt-1 h-10 rounded-md border px-3 text-sm" />
        </div>
      </fieldset>

      <fieldset className="space-y-4 pt-4 border-t">
        <legend className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Mon commerce
        </legend>
        <div>
          <label className="text-sm font-medium" htmlFor="establishmentName">Nom du commerce</label>
          <input id="establishmentName" type="text" required className="w-full mt-1 h-10 rounded-md border px-3 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="type">Type</label>
          <select id="type" className="w-full mt-1 h-10 rounded-md border px-3 text-sm">
            <option value="RESTAURANT">Restaurant</option>
            <option value="BAKERY">Boulangerie</option>
            <option value="BUTCHER">Boucherie</option>
            <option value="GROCERY">Épicerie</option>
            <option value="FLORIST">Fleuriste</option>
            <option value="OTHER">Autre</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="siret">SIRET (optionnel)</label>
          <input id="siret" type="text" className="w-full mt-1 h-10 rounded-md border px-3 text-sm" placeholder="14 chiffres" />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="address">Adresse</label>
          <input id="address" type="text" required className="w-full mt-1 h-10 rounded-md border px-3 text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium" htmlFor="city">Ville</label>
            <input id="city" type="text" required className="w-full mt-1 h-10 rounded-md border px-3 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="zipCode">Code postal</label>
            <input id="zipCode" type="text" required className="w-full mt-1 h-10 rounded-md border px-3 text-sm" />
          </div>
        </div>
      </fieldset>

      <Button type="submit" className="w-full" size="lg">
        Inscrire mon commerce
      </Button>
    </form>
  );
}
