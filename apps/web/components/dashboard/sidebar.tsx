"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  List,
  UtensilsCrossed,
  Settings,
  BarChart3,
  Clock,
  CreditCard,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  { name: "Commandes", href: "/dashboard/orders", icon: ShoppingBag, badge: true },
  { name: "Produits", href: "/dashboard/products", icon: Package },
  { name: "Catégories", href: "/dashboard/categories", icon: List },
  { name: "Menus", href: "/dashboard/menus", icon: UtensilsCrossed },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
];

const settingsNav = [
  { name: "Général", href: "/dashboard/settings", icon: Settings },
  { name: "Horaires", href: "/dashboard/settings/hours", icon: Clock },
  { name: "Créneaux retrait", href: "/dashboard/settings/pickup", icon: MapPin },
  { name: "Paiements", href: "/dashboard/settings/payments", icon: CreditCard },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r bg-muted/30">
      <div className="p-4 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <span className="font-bold">ClickCollect</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
              {/* TODO: Badge for new orders count */}
            </Link>
          );
        })}

        <div className="pt-4 mt-4 border-t">
          <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Paramètres
          </p>
          {settingsNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
