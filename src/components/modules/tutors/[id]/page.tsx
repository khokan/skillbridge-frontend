import { apiFetch } from "@/lib/api";
import type { TutorDetails } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BookingDialog } from "@/components/modules/tutors/booking-dialog";

export default async function TutorProfilePage({ params }: { params: { id: string } }) {
  const t = await apiFetch<TutorDetails>(`/tutors/${params.id}`);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <h1 className="text-3xl font-semibold">{t.user.name}</h1>
          <p className="mt-1 text-muted-foreground">{t.headline ?? "Tutor"}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {t.categories.map((c) => (
              <Badge key={c.category.id} variant="secondary">
                {c.category.name}
              </Badge>
            ))}
          </div>

          <div className="mt-4 text-sm">
            ⭐ {t.avgRating.toFixed(1)} ({t.reviewCount} reviews) • {t.hourlyRate} {t.currency}/hr
          </div>
        </div>

        <BookingDialog tutorProfileId={t.id} slots={t.availability} />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_360px]">
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <div className="text-base font-semibold">About</div>
            <p className="mt-2 text-sm text-muted-foreground">{t.bio ?? "No bio yet."}</p>

            <div className="mt-6 grid gap-2 text-sm">
              <div><span className="text-muted-foreground">Experience:</span> {t.experienceYrs} years</div>
              <div><span className="text-muted-foreground">Education:</span> {t.education ?? "—"}</div>
              <div><span className="text-muted-foreground">Timezone:</span> {t.timezone}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <div className="text-base font-semibold">Recent Reviews</div>
            <div className="mt-3 space-y-4">
              {t.reviews.slice(0, 6).map((r) => (
                <div key={r.id} className="rounded-xl border p-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="font-medium">{r.student.name}</div>
                    <div>⭐ {r.rating}</div>
                  </div>
                  {r.comment ? (
                    <p className="mt-2 text-sm text-muted-foreground">{r.comment}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
