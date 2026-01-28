import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TutorListItem } from "@/lib/types";

export function TutorCard({ t }: { t: TutorListItem }) {
  return (
    <Link href={`/tutors/${t.id}`}>
      <Card className="rounded-2xl transition hover:shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-base font-semibold">{t.user.name}</div>
              <div className="text-sm text-muted-foreground">
                {t.headline ?? "Tutor"}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold">
                {t.hourlyRate} {t.currency}/hr
              </div>
              <div className="text-xs text-muted-foreground">
                ⭐ {t.avgRating.toFixed(1)} ({t.reviewCount})
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {t.categories.slice(0, 3).map((c) => (
              <Badge key={c.category.id} variant="secondary">
                {c.category.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
