"use client";

// TODO: Grid of available pickup time slots
// Fetches available slots based on establishment config and existing orders

import type { PickupSlot } from "@clickcollect/shared";

interface PickupSlotSelectorProps {
  slots: PickupSlot[];
  selectedSlot: string | null;
  onSelect: (time: string) => void;
}

export function PickupSlotSelector({ slots, selectedSlot, onSelect }: PickupSlotSelectorProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
      {slots.length === 0 && (
        <p className="col-span-full text-sm text-muted-foreground text-center py-4">
          Aucun créneau disponible pour aujourd&apos;hui.
        </p>
      )}
      {slots.map((slot) => (
        <button
          key={slot.time}
          onClick={() => slot.available && onSelect(slot.time)}
          disabled={!slot.available}
          className={`
            rounded-md border px-3 py-2 text-sm font-medium transition-colors
            ${selectedSlot === slot.time
              ? "border-primary bg-primary/10 text-primary"
              : slot.available
                ? "hover:border-primary/50 hover:bg-muted"
                : "opacity-50 cursor-not-allowed"
            }
          `}
        >
          {slot.label}
        </button>
      ))}
    </div>
  );
}
