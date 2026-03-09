import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/shared/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "ClickCollect — Commandez en ligne, retirez sur place",
    template: "%s | ClickCollect",
  },
  description:
    "Plateforme de commande en ligne click & collect pour restaurants, boulangeries et commerces de proximité.",
  keywords: ["click and collect", "commande en ligne", "retrait sur place", "restaurant", "boulangerie"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
