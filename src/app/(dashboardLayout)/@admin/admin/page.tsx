import { getAdminStats } from "@/actions/admin.actions";
import { Card, CardContent } from "@/components/ui/card";

export default async function AdminDashboardPage() {
  const { data, error } = await getAdminStats();
  const s = data?.data;

  if (error) return <div className="p-4 text-sm text-destructive">{error.message}</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ["Users", s.userCount],
          ["Tutors", s.tutorCount],
          ["Students", s.studentCount],
          ["Bookings", s.bookingCount],
          ["Categories", s.categoryCount],
        ].map(([label, val]) => (
          <Card key={label as string} className="rounded-2xl">
            <CardContent className="p-5">
              <div className="text-sm text-muted-foreground">{label}</div>
              <div className="text-2xl font-semibold">{String(val ?? 0)}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
