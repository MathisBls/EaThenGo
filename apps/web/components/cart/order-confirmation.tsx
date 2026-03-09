import { CheckCircle2, Clock, MapPin, Hash } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface OrderConfirmationProps {
  orderNumber: string;
  pickupCode: string;
  pickupTime: string;
  total: number;
  establishmentName: string;
  establishmentAddress: string;
}

export function OrderConfirmation({
  orderNumber,
  pickupCode,
  pickupTime,
  total,
  establishmentName,
  establishmentAddress,
}: OrderConfirmationProps) {
  return (
    <div className="max-w-md mx-auto text-center py-12">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <CheckCircle2 className="h-8 w-8 text-green-600" />
      </div>

      <h1 className="text-2xl font-bold mb-2">Commande confirmée !</h1>
      <p className="text-muted-foreground mb-8">
        Merci pour votre commande. Vous recevrez un email de confirmation.
      </p>

      <div className="rounded-lg border p-6 text-left space-y-4 mb-8">
        <div className="flex items-center gap-3">
          <Hash className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">N° de commande</p>
            <p className="font-semibold">{orderNumber}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">{pickupCode}</span>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Code de retrait</p>
            <p className="font-semibold">Présentez ce code au commerce</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Créneau de retrait</p>
            <p className="font-semibold">{pickupTime}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">{establishmentName}</p>
            <p className="text-sm">{establishmentAddress}</p>
          </div>
        </div>
        <div className="border-t pt-3 flex justify-between">
          <span className="font-semibold">Total payé</span>
          <span className="font-bold text-primary">{formatPrice(total)}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" asChild>
          <Link href="/orders">Mes commandes</Link>
        </Button>
        <Button className="flex-1" asChild>
          <Link href="/explore">Continuer</Link>
        </Button>
      </div>
    </div>
  );
}
