// import Link from "next/link";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { getBookings } from "@/actions/student.action";

// type Booking = {
//   id: string;
//   status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
//   startTime: string;
//   endTime: string;
//   tutor: { id: string; name: string };
//   price: number;
//   currency: string;
// };

export default async function DashboarPage() {
//  const { data, error } = await getBookings();

//   if (error) {
//     return (
//       <div className="p-6 text-sm text-destructive">
//         {error.message}
//       </div>
//     );
//   }

//   if (!data) {
//     return <div className="p-6 text-sm text-muted-foreground">No profile data</div>;
//   }

// const bookingsData = data || {};
// const items = bookingsData.items || [];
// const total = items.length;
// const upcoming = items.filter((b) => b?.status === "CONFIRMED").length;
// const completed = items.filter((b) => b?.status === "COMPLETED").length;

//   const recent = items.slice(0, 5);

  return (
    // <div className="space-y-6">
    //   <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
    //     <div>
    //       <h1 className="text-2xl font-semibold">Dashboard</h1>
    //       <p className="text-sm text-muted-foreground">Your learning overview and recent activity.</p>
    //     </div>
    //     <Button asChild>
    //       <Link href="/tutors">Book a tutor</Link>
    //     </Button>
    //   </div>

    //   <div className="grid gap-4 md:grid-cols-3">
    //     <Card className="rounded-2xl">
    //       <CardContent className="p-5">
    //         <div className="text-sm text-muted-foreground">Total bookings</div>
    //         <div className="mt-1 text-2xl font-semibold">{total}</div>
    //       </CardContent>
    //     </Card>
    //     <Card className="rounded-2xl">
    //       <CardContent className="p-5">
    //         <div className="text-sm text-muted-foreground">Upcoming</div>
    //         <div className="mt-1 text-2xl font-semibold">{upcoming}</div>
    //       </CardContent>
    //     </Card>
    //     <Card className="rounded-2xl">
    //       <CardContent className="p-5">
    //         <div className="text-sm text-muted-foreground">Completed</div>
    //         <div className="mt-1 text-2xl font-semibold">{completed}</div>
    //       </CardContent>
    //     </Card>
    //   </div>

    //   <Card className="rounded-2xl">
    //     <CardContent className="p-5">
    //       <div className="flex items-center justify-between gap-3">
    //         <div>
    //           <div className="text-base font-semibold">Recent bookings</div>
    //           <div className="text-sm text-muted-foreground">Latest sessions and status.</div>
    //         </div>
    //         <Button asChild variant="outline">
    //           <Link href="/dashboard/bookings">View all</Link>
    //         </Button>
    //       </div>

    //       <div className="mt-4 divide-y">
    //         {recent.length === 0 ? (
    //           <div className="py-8 text-sm text-muted-foreground">
    //             No bookings yet. Browse tutors and book your first session.
    //           </div>
    //         ) : (
    //           recent.map((b) => (
    //             <div key={b.id} className="flex flex-col justify-between gap-2 py-4 md:flex-row md:items-center">
    //               <div>
    //                 <div className="font-medium">{b.tutor.name}</div>
    //                 <div className="text-sm text-muted-foreground">
    //                   {new Date(b.startTime).toLocaleString()} → {new Date(b.endTime).toLocaleTimeString()}
    //                 </div>
    //               </div>
    //               <div className="text-sm">
    //                 <span className="rounded-full border px-3 py-1 text-xs">{b.status}</span>
    //                 <div className="mt-2 font-semibold">
    //                   {b.price} {b.currency}
    //                 </div>
    //               </div>
    //             </div>
    //           ))
    //         )}
    //       </div>
    //     </CardContent>
    //   </Card>
    // </div>
    <h1>student dashboard Page</h1>
  );
}
