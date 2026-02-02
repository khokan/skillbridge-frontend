import { getAdminStats } from "@/actions/admin.actions";
import { Card, CardContent } from "@/components/ui/card";

export default async function AdminDashboardPage() {
  const { data, error } = await getAdminStats();
  if (error) return <div className="p-4 text-sm text-destructive">{error.message}</div>;

  const s = data?.data;
  
  const tiles = [
    ["Total Users", s.totalUsers],
    ["Students", s.totalStudents],
    ["Tutors", s.totalTutors],
    ["Admins", s.totalAdmins],
    ["Active Users", s.activeUsers],
    ["Banned Users", s.bannedUsers],
    ["Bookings", s.totalBookings],
    ["Categories", s.totalCategories],
    ["Active Categories", s.activeCategories],
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map(([label, val]) => (
          <Card key={label as string} className="rounded-2xl">
            <CardContent className="p-5">
              <div className="text-sm text-muted-foreground">{label}</div>
              <div className="text-2xl font-semibold">{String(val ?? 0)}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-2xl">
        <CardContent className="p-5">
          <div className="font-medium mb-2">Bookings by Status</div>
          <div className="space-y-1 text-sm text-muted-foreground">
            {(s.bookingByStatus ?? []).map((x: any) => (
              <div key={x.status}>
                {x.status}: {x._count?.status ?? 0}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
