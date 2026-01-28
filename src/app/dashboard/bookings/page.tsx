import { apiFetch } from "@/lib/api";
import type { Booking } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function MyBookingsPage() {
  const data = await apiFetch<{ items: Booking[] }>("/bookings", { auth: true });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">My Bookings</h1>
      <p className="mt-1 text-sm text-muted-foreground">Upcoming and past sessions.</p>

      <div className="mt-6 space-y-3">
        {data.items.map((b) => (
          <Card key={b.id} className="rounded-2xl">
            <CardContent className="flex items-center justify-between gap-4 p-5">
              <div>
                <div className="font-medium">{b.tutor.name}</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(b.startTime).toLocaleString()} → {new Date(b.endTime).toLocaleTimeString()}
                </div>
              </div>
              <div className="text-right">
                <Badge variant="secondary">{b.status}</Badge>
                <div className="mt-2 text-sm font-semibold">
                  {b.price} {b.currency}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
