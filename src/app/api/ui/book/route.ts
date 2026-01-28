import { NextResponse } from "next/server";
import { getToken } from "@/lib/auth";

export async function POST(req: Request) {
  const token = getToken();
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) return NextResponse.json({ message: data?.message ?? "Booking failed" }, { status: res.status });

  return NextResponse.json(data);
}
