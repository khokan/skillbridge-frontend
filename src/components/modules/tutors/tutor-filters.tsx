"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function TutorFilters() {
  const router = useRouter();
  const sp = useSearchParams();

  function setParam(key: string, val: string) {
    const next = new URLSearchParams(sp.toString());
    if (!val) next.delete(key);
    else next.set(key, val);
    router.push(`/tutors?${next.toString()}`);
  }

  return (
    <Card className="rounded-2xl">
      <CardContent className="space-y-3 p-5">
        <div className="text-sm font-medium">Filters</div>
        <Input
          defaultValue={sp.get("search") ?? ""}
          placeholder="Search by name, bio, headline..."
          onBlur={(e) => setParam("search", e.target.value)}
        />
        <Input
          defaultValue={sp.get("category") ?? ""}
          placeholder="Category slug (e.g. math)"
          onBlur={(e) => setParam("category", e.target.value)}
        />
        <div className="grid grid-cols-2 gap-2">
          <Input
            defaultValue={sp.get("minRate") ?? ""}
            placeholder="Min rate"
            onBlur={(e) => setParam("minRate", e.target.value)}
          />
          <Input
            defaultValue={sp.get("maxRate") ?? ""}
            placeholder="Max rate"
            onBlur={(e) => setParam("maxRate", e.target.value)}
          />
        </div>

        <Button
          variant="outline"
          onClick={() => router.push("/tutors")}
          className="w-full"
        >
          Clear
        </Button>
      </CardContent>
    </Card>
  );
}
