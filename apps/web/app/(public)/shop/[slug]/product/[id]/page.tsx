import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ slug: string; id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug, id } = await params;
  // TODO: Fetch product from DB
  return {
    title: `Produit — ${slug}`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, id } = await params;

  // TODO: Fetch product with options, images
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product image */}
        <div className="aspect-square rounded-lg bg-muted" />

        {/* Product details */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Nom du produit</h1>
          <p className="text-muted-foreground">Description du produit...</p>
          <p className="text-2xl font-bold text-primary">0,00 €</p>

          {/* TODO: OptionGroup selectors */}
          {/* TODO: Quantity selector */}
          {/* TODO: Add to cart button */}
          <div className="rounded-lg border p-4 text-center text-muted-foreground">
            Options et ajout au panier ici.
          </div>
        </div>
      </div>
    </div>
  );
}
