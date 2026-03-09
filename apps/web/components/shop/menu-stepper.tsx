"use client";

// TODO: Multi-step menu/formula selector
// Step through sections (Entrée → Plat → Dessert)
// Each step shows available products for that section

interface MenuStepperProps {
  menu: {
    id: string;
    name: string;
    price: number;
    sections: {
      id: string;
      name: string;
      required: boolean;
      maxSelect: number;
      products: {
        id: string;
        name: string;
        description?: string | null;
        imageUrl?: string | null;
        priceOverride?: number | null;
      }[];
    }[];
  };
  onComplete: (choices: Record<string, string[]>) => void;
  onCancel: () => void;
}

export function MenuStepper({ menu, onComplete, onCancel }: MenuStepperProps) {
  // TODO: Implement step-by-step selection
  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-xl font-bold mb-4">{menu.name}</h2>
      <p className="text-muted-foreground mb-6">
        Composez votre menu en choisissant parmi les sections ci-dessous.
      </p>

      {menu.sections.map((section, index) => (
        <div key={section.id} className="mb-6">
          <h3 className="font-semibold mb-2">
            Étape {index + 1} : {section.name}
            {section.required && <span className="text-destructive ml-1">*</span>}
          </h3>
          <div className="space-y-2">
            {section.products.map((product) => (
              <div key={product.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer">
                <div className="h-12 w-12 rounded bg-muted shrink-0" />
                <div>
                  <p className="font-medium text-sm">{product.name}</p>
                  {product.description && (
                    <p className="text-xs text-muted-foreground">{product.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex gap-2 mt-4">
        <button onClick={onCancel} className="flex-1 h-10 rounded-lg border text-sm font-medium">
          Annuler
        </button>
        <button className="flex-1 h-10 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
