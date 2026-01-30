import { getTutorById } from "@/actions/tutor.actions";
import CreateBookingDialog from "@/components/modules/tutors/create-booking-dialog";
import { Card, CardContent } from "@/components/ui/card";


export default async function TutorDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ unwrap params FIRST
  const { id } = await params;

  const { data, error } = await getTutorById(id);

  if (error) {
    return (
      <div className="p-4 text-sm text-destructive">
        {error.message}
      </div>
    );
  }

  const tutor = data?.data;
  const slots = tutor?.availability ?? [];

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4">
      <Card className="rounded-2xl">
        <CardContent className="p-6 space-y-3">
          <div>
            <h1 className="text-2xl font-semibold">
              {tutor?.user?.name ?? "Tutor"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {tutor?.headline ?? "Expert Tutor"}
            </p>
          </div>

          <div className="flex items-center justify-between rounded-xl border p-3 text-sm">
            <span className="text-muted-foreground">Hourly Rate</span>
            <span className="font-medium">
              {tutor?.hourlyRate} {tutor?.currency ?? "BDT"}
            </span>
          </div>

          {tutor?.bio && (
            <div className="rounded-xl border p-3">
              <div className="text-sm font-medium">About</div>
              <p className="text-sm text-muted-foreground mt-1">
                {tutor.bio}
              </p>
            </div>
          )}

          <CreateBookingDialog
            tutorProfileId={tutor.id}
            slots={slots}
          />
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <div className="font-semibold mb-3">Available Slots</div>

          {slots.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No slots available right now.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {slots.map((s: any) => (
                <div key={s.id} className="rounded-xl border p-3 text-sm">
                  <div className="font-medium">
                    {new Date(s.startTime).toLocaleString()}
                  </div>
                  <div className="text-muted-foreground">
                    Ends: {new Date(s.endTime).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
