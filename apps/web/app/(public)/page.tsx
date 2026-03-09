import Link from "next/link";
import { Search, ShoppingBag, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-orange-50 to-background py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Commandez en ligne,
            <br />
            <span className="text-primary">retirez sur place</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Découvrez les commerces de votre quartier, commandez en quelques clics
            et récupérez votre commande sans attendre.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher un commerce, un plat..."
                className="w-full h-12 pl-10 pr-4 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button size="lg" asChild>
              <Link href="/explore">Rechercher</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Découvrez</h3>
              <p className="text-sm text-muted-foreground">
                Trouvez les meilleurs commerces autour de vous.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Commandez</h3>
              <p className="text-sm text-muted-foreground">
                Composez votre commande et payez en ligne en toute sécurité.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Retirez</h3>
              <p className="text-sm text-muted-foreground">
                Récupérez votre commande au créneau choisi, sans attendre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Establishments - TODO: Fetch from DB */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Commerces à la une</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* TODO: EstablishmentCard components */}
            <div className="rounded-lg border bg-card p-4 text-center text-muted-foreground">
              Chargement des commerces...
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/explore">Voir tous les commerces</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Merchant */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Vous êtes commerçant ?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Inscrivez votre commerce gratuitement et commencez à recevoir des commandes en ligne dès aujourd&apos;hui.
          </p>
          <Button size="lg" asChild>
            <Link href="/register/merchant">Inscrire mon commerce</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
