import type { Metadata } from "next";

interface MenuPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: MenuPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Menu — ${slug}`,
  };
}

export default async function MenuPage({ params }: MenuPageProps) {
  const { slug } = await params;

  // TODO: Fetch menus/formules for this establishment
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Menus & Formules</h1>

      <div className="space-y-6">
        {/* TODO: Menu cards with sections and products */}
        <div className="rounded-lg border p-8 text-center text-muted-foreground">
          Les menus et formules seront affichés ici.
        </div>
      </div>
    </div>
  );
}
