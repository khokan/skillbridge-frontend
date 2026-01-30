"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getBookings, cancelBooking } from "@/actions/booking.actions";

export default function BookingsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const { data, error } = await getBookings();
      console.log(" Bookings data:", data);
      if (error) throw error;
      setItems(data.data.items);
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const cancel = async (id: string) => {
    try {
      setLoading(true);
      const { error } = await cancelBooking(id);
      if (error) throw error;
      toast.success("Booking cancelled");
      await load();
    } catch (e: any) {
      toast.error(e?.message ?? "Cancel failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">My Bookings</h1>

      {items.map((b) => (
        <div key={b.id} className="rounded-xl border p-4 flex justify-between items-center">
          <div>
            <div className="font-medium">{b.tutor?.name ?? "Tutor"}</div>
            <div className="text-sm text-muted-foreground">{new Date(b.startTime).toLocaleString()}</div>
            <div className="text-xs mt-1">{b.status}</div>
          </div>

          {b.status === "CONFIRMED" && (
            <Button variant="destructive" disabled={loading} onClick={() => cancel(b.id)}>
              Cancel
            </Button>
          )}
        </div>
      ))}

      {items.length === 0 && <p className="text-sm text-muted-foreground">No bookings found.</p>}
    </div>
  );
}
