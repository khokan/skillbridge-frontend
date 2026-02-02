import Link from "next/link";
import { getTutors } from "@/actions/tutor.actions";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/actions/tutorProfile.actions";

export const dynamic = "force-dynamic";

const pick = (v: unknown) =>
  Array.isArray(v) ? String(v[0] ?? "") : v != null ? String(v) : "";

export default async function TutorsPage({
  searchParams,
}: {
  searchParams?: any; // can be undefined, object, or Promise
}) {
  // ✅ always safe
  const sp = await Promise.resolve(searchParams ?? {});

    const page = pick(sp.page) || "1";
  const q = pick(sp.q);
  const category = pick(sp.category);

 const [{ data, error }, { data: catData }] = await Promise.all([
    getTutors({ q, category }),
    getCategories(),
  ]);

  const tutors = data?.data?.items ?? [];
  const categories = catData?.items ?? [];

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4">
      <h1 className="text-2xl font-semibold">Browse Tutors</h1>

      <form className="flex flex-wrap gap-3">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search tutor or subject"
          className="h-10 rounded-md border px-3 text-sm"
        />

        <select
          name="category"
          defaultValue={category}
          className="h-10 rounded-md border px-3 text-sm"
        >
          <option value="">All categories</option>
          {categories.map((c: any) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>

        <Button type="submit">Apply</Button>
        <Button asChild variant="outline">
          <Link href="/tutors">Reset</Link>
        </Button>
      </form>

      {error ? <p className="text-sm text-destructive">{error.message}</p> : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tutors.map((t: any) => (
          <Card key={t.id} className="rounded-2xl">
            <CardContent className="p-5 space-y-3">
              <div>
                <div className="font-semibold">{t.user?.name ?? "Tutor"}</div>
                <div className="text-sm text-muted-foreground">
                  {t.headline ?? "Expert Tutor"}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Rate</span>
                <span className="font-medium">
                  {t.hourlyRate} {t.currency ?? "BDT"} / hr
                </span>
              </div>

              <Button asChild className="w-full">
                <Link href={`/tutors/${t.id}`}>View & Book</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {tutors.length === 0 && !error ? (
        <p className="text-sm text-muted-foreground">No tutors found.</p>
      ) : null}
    </div>
  );
}