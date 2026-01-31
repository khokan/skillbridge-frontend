import { getAdminBookings } from "@/actions/admin.actions";
import { Card, CardContent } from "@/components/ui/card";

export default async function AdminBookingsPage() {
  const { data, error } = await getAdminBookings();
  if (error) return <div className="p-4 text-sm text-destructive">{error.message}</div>;

  const items = data?.data?.items ?? [];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">All Bookings</h1>

      <div className="space-y-3">
        {items.map((b: any) => (
          <Card key={b.id} className="rounded-2xl">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-medium">{b.status}</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(b.startTime).toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  Student: {b.student?.email} • Tutor: {b.tutor?.email}
                </div>
              </div>

              <div className="text-sm font-medium">
                {b.price} {b.currency}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
