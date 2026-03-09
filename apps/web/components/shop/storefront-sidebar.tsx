import { MapPin, Phone, Mail, Globe, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const DAY_NAMES = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

interface OpeningHour {
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

interface StorefrontSidebarProps {
  establishment: {
    name: string;
    description: string | null;
    address: string;
    city: string;
    zipCode: string;
    phone: string | null;
    email: string;
    website: string | null;
    openingHours: OpeningHour[];
  };
}

export function StorefrontSidebar({ establishment }: StorefrontSidebarProps) {
  // Group opening hours by day
  const hoursByDay = new Map<number, OpeningHour[]>();
  for (const h of establishment.openingHours) {
    const existing = hoursByDay.get(h.dayOfWeek) || [];
    existing.push(h);
    hoursByDay.set(h.dayOfWeek, existing);
  }

  const currentDay = new Date().getDay();
  const todayIndex = currentDay === 0 ? 6 : currentDay - 1; // Convert JS Sunday=0 to our Monday=0

  return (
    <div className="space-y-4 sticky top-20">
      {/* Description */}
      {establishment.description && (
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {establishment.description}
          </p>
        </div>
      )}

      {/* Opening hours */}
      <div className="rounded-lg border p-4">
        <h3 className="font-semibold flex items-center gap-2 mb-3">
          <Clock className="h-4 w-4" style={{ color: "#690000" }} />
          Horaires d&apos;ouverture
        </h3>
        <div className="space-y-1.5">
          {Array.from({ length: 7 }, (_, i) => {
            const hours = hoursByDay.get(i) || [];
            const isClosed = hours.length === 0 || hours.every((h) => h.isClosed);
            const isToday = i === todayIndex;

            return (
              <div
                key={i}
                className={`flex justify-between text-sm ${
                  isToday ? "font-semibold" : ""
                }`}
              >
                <span className={isToday ? "text-foreground" : "text-muted-foreground"}>
                  {DAY_NAMES[i]}
                </span>
                <span className={isClosed ? "text-destructive" : ""}>
                  {isClosed
                    ? "Fermé"
                    : hours
                        .filter((h) => !h.isClosed)
                        .map((h) => `${h.openTime} - ${h.closeTime}`)
                        .join(", ")}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact info */}
      <div className="rounded-lg border p-4">
        <h3 className="font-semibold mb-3">Contact</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
            <span>
              {establishment.address}
              <br />
              {establishment.zipCode} {establishment.city}
            </span>
          </div>
          {establishment.phone && (
            <a
              href={`tel:${establishment.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 hover:underline"
            >
              <Phone className="h-4 w-4 text-muted-foreground" />
              {establishment.phone}
            </a>
          )}
          <a
            href={`mailto:${establishment.email}`}
            className="flex items-center gap-2 hover:underline"
          >
            <Mail className="h-4 w-4 text-muted-foreground" />
            {establishment.email}
          </a>
          {establishment.website && (
            <a
              href={establishment.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline"
              style={{ color: "#690000" }}
            >
              <Globe className="h-4 w-4" />
              Site vitrine
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
