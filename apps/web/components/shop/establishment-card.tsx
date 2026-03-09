import Link from "next/link";
import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import { ESTABLISHMENT_TYPE_LABELS } from "@clickcollect/shared";

interface EstablishmentCardProps {
  slug: string;
  name: string;
  type: string;
  imageUrl?: string | null;
  city: string;
  rating?: number;
  reviewCount?: number;
}

export function EstablishmentCard({
  slug,
  name,
  type,
  imageUrl,
  city,
  rating,
  reviewCount,
}: EstablishmentCardProps) {
  return (
    <Link
      href={`/shop/${slug}`}
      className="group rounded-lg border overflow-hidden bg-card hover:shadow-md transition-shadow"
    >
      <div className="aspect-[16/9] relative bg-muted">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <span className="absolute top-2 left-2 px-2 py-1 rounded-full bg-background/90 text-xs font-medium">
          {ESTABLISHMENT_TYPE_LABELS[type] ?? type}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold group-hover:text-primary transition-colors">{name}</h3>
        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>{city}</span>
          {rating != null && (
            <>
              <span className="mx-1">·</span>
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span>{rating.toFixed(1)}</span>
              {reviewCount != null && <span>({reviewCount})</span>}
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
