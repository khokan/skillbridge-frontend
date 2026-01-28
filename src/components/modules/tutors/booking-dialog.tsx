"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function BookingDialog({
  tutorProfileId,
  slots,
}: {
  tutorProfileId: string;
  slots: { id: string; startTime: string; endTime: string }[];
}) {
  const [slotId, setSlotId] = useState<string>("");

  async function book() {
    try {
      const res = await fetch("/api/ui/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tutorProfileId, availabilityId: slotId }),
      });

      if (!res.ok) throw new Error((await res.json())?.message ?? "Booking failed");
      toast.success("Booking confirmed!");
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={!slots.length}>Book a session</Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle>Select a slot</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <select
            className="w-full rounded-md border bg-background p-2 text-sm"
            value={slotId}
            onChange={(e) => setSlotId(e.target.value)}
          >
            <option value="">Choose time</option>
            {slots.map((s) => (
              <option key={s.id} value={s.id}>
                {new Date(s.startTime).toLocaleString()} → {new Date(s.endTime).toLocaleTimeString()}
              </option>
            ))}
          </select>

          <Button onClick={book} disabled={!slotId} className="w-full">
            Confirm booking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
