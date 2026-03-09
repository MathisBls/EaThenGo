import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon profil",
};

export default function ProfilePage() {
  // TODO: Fetch user profile, allow editing
  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Mon profil</h1>

      <div className="rounded-lg border p-4 space-y-4">
        <div>
          <label className="text-sm font-medium">Nom</label>
          <input type="text" className="w-full mt-1 h-10 rounded-md border px-3 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <input type="email" className="w-full mt-1 h-10 rounded-md border px-3 text-sm" disabled />
        </div>
        <div>
          <label className="text-sm font-medium">Téléphone</label>
          <input type="tel" className="w-full mt-1 h-10 rounded-md border px-3 text-sm" />
        </div>
        <button className="w-full h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
          Enregistrer
        </button>
      </div>
    </div>
  );
}
