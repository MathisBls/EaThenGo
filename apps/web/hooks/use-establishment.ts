"use client";

import { useQuery } from "@tanstack/react-query";

interface Establishment {
  id: string;
  slug: string;
  name: string;
  description?: string;
  type: string;
  logoUrl?: string;
  bannerUrl?: string;
  address: string;
  city: string;
  phone?: string;
  isActive: boolean;
  openingHours: {
    dayOfWeek: number;
    openTime: string;
    closeTime: string;
    isClosed: boolean;
  }[];
  categories: {
    id: string;
    name: string;
    sortOrder: number;
  }[];
}

/**
 * Hook to fetch establishment data by slug
 */
export function useEstablishment(slug: string) {
  return useQuery<Establishment>({
    queryKey: ["establishment", slug],
    queryFn: async () => {
      // TODO: Replace with actual API call or server action
      const res = await fetch(`/api/establishments/${slug}`);
      if (!res.ok) throw new Error("Établissement non trouvé");
      return res.json();
    },
    enabled: !!slug,
  });
}
