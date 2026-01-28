import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Connect with Expert Tutors, Learn Anything
          </h1>
          <p className="mt-4 text-muted-foreground">
            Browse trusted tutors, check availability, and book sessions instantly — all in one place.
          </p>
          <div className="mt-8 flex gap-3">
            <Button asChild size="lg">
              <Link href="/tutors">Browse tutors</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/register">Become a tutor</Link>
            </Button>
          </div>
        </div>

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="h-10 w-3/4 rounded-lg bg-muted" />
              <div className="h-10 w-full rounded-lg bg-muted" />
              <div className="h-10 w-5/6 rounded-lg bg-muted" />
              <div className="pt-3 text-sm text-muted-foreground">
                Professional landing UI (featured tutors can be added here next).
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {["Instant booking", "Verified tutors", "Reviews & ratings"].map((t) => (
          <Card key={t} className="rounded-2xl">
            <CardContent className="p-6">
              <div className="text-base font-medium">{t}</div>
              <div className="mt-2 text-sm text-muted-foreground">
                Clean, modern UI with shadcn components and scalable module pages.
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
