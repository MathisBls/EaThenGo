import type { Metadata } from "next";
import { notFound } from "next/navigation";
// import { db } from "@clickcollect/db";

interface ShopPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ShopPageProps): Promise<Metadata> {
  const { slug } = await params;
  // TODO: Fetch establishment from DB
  return {
    title: slug,
    description: `Commandez en ligne chez ${slug} et retirez sur place.`,
  };
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { slug } = await params;

  // TODO: Fetch establishment with categories and products
  // const establishment = await db.establishment.findUnique({
  //   where: { slug, isActive: true },
  //   include: { categories: true, products: true, openingHours: true, reviews: true },
  // });
  // if (!establishment) notFound();

  return (
    <div>
      {/* Banner */}
      <div className="h-48 md:h-64 bg-muted relative">
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-6">
            <h1 className="text-3xl font-bold text-foreground">{slug}</h1>
            {/* TODO: Type badge, rating, address */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1">
            {/* Category tabs - horizontal scroll */}
            <nav className="flex gap-2 overflow-x-auto pb-4 mb-6 border-b">
              {/* TODO: Category pills */}
              <span className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium whitespace-nowrap">
                Tout
              </span>
            </nav>

            {/* Products grid by category */}
            <div className="space-y-8">
              {/* TODO: ProductCard grid per category */}
              <div className="rounded-lg border p-8 text-center text-muted-foreground">
                Les produits seront affichés ici par catégorie.
              </div>
            </div>
          </div>

          {/* Sidebar - Info */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="rounded-lg border p-4 space-y-4 sticky top-20">
              <h3 className="font-semibold">Informations</h3>
              {/* TODO: Opening hours, address, map, contact */}
              <p className="text-sm text-muted-foreground">Horaires, adresse, contact...</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
