// import { getBookings } from "@/actions/student.action";
// import { Card, CardContent } from "@/components/ui/card";

// type Booking = {
//   id: string;
//   status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
//   startTime: string;
//   endTime: string;
//   tutor: { id: string; name: string };
//   price: number;
//   currency: string;
// };

export default async function BookingsPage() {
  //  const { data, error } = await getBookings();

  return (
    // <div className="space-y-4">
    //   <div>
    //     <h1 className="text-2xl font-semibold">My Bookings</h1>
    //     <p className="text-sm text-muted-foreground">All your tutoring sessions.</p>
    //   </div>

    //   <div className="space-y-3">
    //     {data?.items.map((b) => (
    //       <Card key={b.id} className="rounded-2xl">
    //         <CardContent className="flex flex-col justify-between gap-3 p-5 md:flex-row md:items-center">
    //           <div>
    //             <div className="font-medium">{b.tutor.name}</div>
    //             <div className="text-sm text-muted-foreground">
    //               {new Date(b.startTime).toLocaleString()} → {new Date(b.endTime).toLocaleTimeString()}
    //             </div>
    //           </div>
    //           <div className="text-right">
    //             <div className="text-xs text-muted-foreground">Status</div>
    //             <div className="mt-1 inline-flex rounded-full border px-3 py-1 text-xs">{b.status}</div>
    //             <div className="mt-2 font-semibold">
    //               {b.price} {b.currency}
    //             </div>
    //           </div>
    //         </CardContent>
    //       </Card>
    //     ))}

    //     {data?.items.length === 0 && (
    //       <Card className="rounded-2xl">
    //         <CardContent className="p-8 text-sm text-muted-foreground">
    //           No bookings found.
    //         </CardContent>
    //       </Card>
    //     )}
    //   </div>
    // </div>
    <h1>Student Bookings Page</h1>
  );
}
