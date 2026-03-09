import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEstablishmentBySlug } from "@/actions/storefront";
import { StorefrontContent } from "@/components/shop/storefront-content";
import { StorefrontSidebar } from "@/components/shop/storefront-sidebar";

interface ShopPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ShopPageProps): Promise<Metadata> {
  const { slug } = await params;
  const establishment = await getEstablishmentBySlug(slug);
  if (!establishment) {
    return { title: "Commerce non trouvé" };
  }
  return {
    title: `${establishment.name} — Commander en Click & Collect`,
    description: establishment.description || `Commandez en ligne chez ${establishment.name} et retirez sur place.`,
  };
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { slug } = await params;
  const establishment = await getEstablishmentBySlug(slug);

  if (!establishment) notFound();

  // Group products by category
  const productsByCategory: Record<string, typeof establishment.products> = {};
  const uncategorized: typeof establishment.products = [];

  for (const product of establishment.products) {
    if (product.categoryId) {
      if (!productsByCategory[product.categoryId]) {
        productsByCategory[product.categoryId] = [];
      }
      productsByCategory[product.categoryId].push(product);
    } else {
      uncategorized.push(product);
    }
  }

  return (
    <div>
      {/* Hero Banner */}
      <div
        className="h-48 md:h-64 relative"
        style={{ backgroundColor: "#690000" }}
      >
        {establishment.bannerUrl && (
          <img
            src={establishment.bannerUrl}
            alt={establishment.name}
            className="w-full h-full object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent">
          <div className="container mx-auto px-4 pb-6">
            <div className="flex items-center gap-3 mb-2">
              {establishment.logoUrl && (
                <img
                  src={establishment.logoUrl}
                  alt=""
                  className="h-14 w-14 rounded-full border-2 border-white object-cover"
                />
              )}
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {establishment.name}
                </h1>
                <p className="text-white/80 text-sm">
                  {establishment.address}, {establishment.zipCode} {establishment.city}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <StorefrontContent
              establishment={{
                id: establishment.id,
                name: establishment.name,
                slug: establishment.slug,
              }}
              categories={establishment.categories}
              productsByCategory={productsByCategory}
              uncategorizedProducts={uncategorized}
            />
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0">
            <StorefrontSidebar establishment={establishment} />
          </aside>
        </div>
      </div>
    </div>
  );
}
