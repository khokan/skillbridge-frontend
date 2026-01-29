// import { Card, CardContent } from "@/components/ui/card";
// import { getStudentProfile } from "@/actions/student.action";

export default async function ProfilePage() {

//  const { data, error } = await getStudentProfile();

  // if (error) {
  //   return (
  //     <div className="p-6 text-sm text-destructive">
  //       {error.message}
  //     </div>
  //   );
  // }

  // if (!data) {
  //   return <div className="p-6 text-sm text-muted-foreground">No profile data</div>;
  // }

   return (
    // <div className="space-y-4">
    //   <div>
    //     <h1 className="text-2xl font-semibold">Profile</h1>
    //     <p className="text-sm text-muted-foreground">Your account information.</p>
    //   </div>

    //   <Card className="rounded-2xl">
    //     <CardContent className="p-6 space-y-3">
    //       <div>
    //         <div className="text-xs text-muted-foreground">Name</div>
    //         <div className="font-medium">{data.name}</div>
    //       </div>

    //       <div>
    //         <div className="text-xs text-muted-foreground">Email</div>
    //         <div className="font-medium">{data.email}</div>
    //       </div>

    //       <div className="grid grid-cols-2 gap-3">
    //         <div>
    //           <div className="text-xs text-muted-foreground">Role</div>
    //           <div className="font-medium">{data.role}</div>
    //         </div>
    //         <div>
    //           <div className="text-xs text-muted-foreground">Status</div>
    //           <div className="font-medium">{data.status}</div>
    //         </div>
    //       </div>

    //       <div className="grid grid-cols-2 gap-3">
    //         <div>
    //           <div className="text-xs text-muted-foreground">Phone</div>
    //           <div className="font-medium">{data.phone ?? "—"}</div>
    //         </div>
    //         <div>
    //           <div className="text-xs text-muted-foreground">Avatar</div>
    //           <div className="font-medium">{data.avatarUrl ?? "—"}</div>
    //         </div>
    //       </div>
    //     </CardContent>
    //   </Card>
    // </div>
    <h1>Student Profile Page</h1>
  );
}
