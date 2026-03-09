import type { MetadataRoute } from "next";
// import { db } from "@clickcollect/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL ?? "https://clickcollect.app";

  // TODO: Fetch all active establishments from DB
  // const establishments = await db.establishment.findMany({
  //   where: { isActive: true },
  //   select: { slug: true, updatedAt: true },
  // });

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/explore`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/login`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/register`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/register/merchant`, changeFrequency: "monthly", priority: 0.5 },
  ];

  // TODO: Add dynamic establishment pages
  // const establishmentPages = establishments.map((e) => ({
  //   url: `${baseUrl}/shop/${e.slug}`,
  //   lastModified: e.updatedAt,
  //   changeFrequency: "daily" as const,
  //   priority: 0.8,
  // }));

  return [...staticPages];
}
