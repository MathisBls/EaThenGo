"use client";

import { Button } from "@/components/ui/button";

// TODO: React Hook Form + createProductSchema
// TODO: Image upload with UploadThing
// TODO: Allergen and tag selectors
// TODO: Option groups management

interface ProductFormProps {
  productId?: string;
  // TODO: Pass initial data for editing
}

export function ProductForm({ productId }: ProductFormProps) {
  const isEditing = !!productId;

  return (
    <form className="space-y-6">
      <div className="rounded-lg border p-4 space-y-4">
        <h2 className="font-semibold">Informations</h2>

        <div>
          <label className="text-sm font-medium" htmlFor="name">Nom du produit *</label>
          <input
            id="name"
            type="text"
            required
            className="w-full mt-1 h-10 rounded-md border px-3 text-sm"
            placeholder="Ex: Burger Classic"
          />
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="description">Description</label>
          <textarea
            id="description"
            className="w-full mt-1 rounded-md border px-3 py-2 text-sm"
            rows={3}
            placeholder="Décrivez votre produit..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium" htmlFor="price">Prix (€) *</label>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0"
              required
              className="w-full mt-1 h-10 rounded-md border px-3 text-sm"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="category">Catégorie</label>
            <select id="category" className="w-full mt-1 h-10 rounded-md border px-3 text-sm">
              <option value="">Sans catégorie</option>
              {/* TODO: Dynamic categories */}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="preparationTime">Temps de préparation (min)</label>
          <input
            id="preparationTime"
            type="number"
            min="0"
            className="w-full mt-1 h-10 rounded-md border px-3 text-sm"
            placeholder="15"
          />
        </div>
      </div>

      <div className="rounded-lg border p-4 space-y-4">
        <h2 className="font-semibold">Image</h2>
        {/* TODO: UploadThing dropzone */}
        <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground text-sm">
          Cliquez ou déposez une image ici
        </div>
      </div>

      <div className="rounded-lg border p-4 space-y-4">
        <h2 className="font-semibold">Allergènes & Tags</h2>
        {/* TODO: Multi-select checkboxes for allergens */}
        {/* TODO: Tag input for custom tags */}
        <p className="text-sm text-muted-foreground">Sélection des allergènes et tags à venir.</p>
      </div>

      <div className="rounded-lg border p-4 space-y-4">
        <h2 className="font-semibold">Options</h2>
        {/* TODO: Dynamic option groups management */}
        <p className="text-sm text-muted-foreground">
          Ajoutez des groupes d&apos;options (sauces, tailles, suppléments...).
        </p>
        <Button type="button" variant="outline" size="sm">
          Ajouter un groupe d&apos;options
        </Button>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" type="button" className="flex-1">
          Annuler
        </Button>
        <Button type="submit" className="flex-1">
          {isEditing ? "Enregistrer" : "Créer le produit"}
        </Button>
      </div>
    </form>
  );
}
