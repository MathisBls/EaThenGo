import type { Metadata } from "next";
import Link from "next/link";
import { MerchantRegisterForm } from "@/components/auth/merchant-register-form";

export const metadata: Metadata = {
  title: "Inscrire mon commerce",
};

export default function MerchantRegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Inscrire mon commerce</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Créez votre espace et commencez à recevoir des commandes en ligne
          </p>
        </div>

        <MerchantRegisterForm />

        <p className="text-center text-sm text-muted-foreground">
          Déjà inscrit ?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
