import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Découvrir les commerces",
  description: "Trouvez les meilleurs restaurants, boulangeries et commerces de proximité autour de vous.",
};

// TODO: Integrate Meilisearch, filters, geo search
export default function ExplorePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Découvrir les commerces</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="rounded-lg border p-4 space-y-4">
            <h3 className="font-semibold">Filtres</h3>
            {/* TODO: SearchFilters component */}
            <p className="text-sm text-muted-foreground">Type de commerce, ville, distance...</p>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          {/* TODO: SearchBar component */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Rechercher un commerce..."
              className="w-full h-10 px-4 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* TODO: SearchResults component with EstablishmentCards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground col-span-full">
              Aucun résultat. La recherche Meilisearch sera intégrée ici.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
