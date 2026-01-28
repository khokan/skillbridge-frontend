import { apiFetch } from "@/lib/api";
import type { TutorListItem } from "@/lib/types";
import { TutorFilters } from "@/components/modules/tutors/tutor-filters";
import { TutorCard } from "@/components/modules/tutors/tutor-card";

export default async function TutorsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(searchParams)) {
    if (typeof v === "string" && v.trim()) qs.set(k, v);
  }

  const data = await apiFetch<{ items: TutorListItem[] }>(`/tutors?${qs.toString()}`);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Browse Tutors</h1>
          <p className="text-sm text-muted-foreground">
            Filter by subject, rating, and price.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[280px_1fr]">
        <TutorFilters />
        <div className="grid gap-4 md:grid-cols-2">
          {data.items.map((t) => (
            <TutorCard key={t.id} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
