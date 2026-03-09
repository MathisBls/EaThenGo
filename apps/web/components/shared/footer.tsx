import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <span className="font-bold">ClickCollect</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Commandez en ligne, retirez sur place.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Découvrir</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/explore" className="hover:text-foreground">Tous les commerces</Link></li>
              <li><Link href="/explore?type=RESTAURANT" className="hover:text-foreground">Restaurants</Link></li>
              <li><Link href="/explore?type=BAKERY" className="hover:text-foreground">Boulangeries</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Commerçants</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/register/merchant" className="hover:text-foreground">Inscrire mon commerce</Link></li>
              <li><Link href="/dashboard" className="hover:text-foreground">Tableau de bord</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Légal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/mentions-legales" className="hover:text-foreground">Mentions légales</Link></li>
              <li><Link href="/cgu" className="hover:text-foreground">CGU</Link></li>
              <li><Link href="/confidentialite" className="hover:text-foreground">Politique de confidentialité</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} ClickCollect. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
