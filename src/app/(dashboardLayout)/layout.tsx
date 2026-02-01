// import Link from "next/link";
import { Children, ReactNode } from "react";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
import { userService } from "@/services/user.service";
import { Roles } from "@/constants/roles";

export default async function DashboardLayout({ admin,student,tutor, children }: { children: ReactNode,admin:ReactNode,student:ReactNode,tutor:ReactNode }) {
  // Server-side: fetch current user (needs cookie token)
  const { data, error } = await userService.getSession();
  const userInfo = data?.user;
    if (error) {
      return (
        <div className="p-6 text-sm text-destructive">
          {error.message}
        </div>
      );
    }

    if (!data) {
      return <div className="p-6 text-sm text-muted-foreground">No profile data</div>;
    }


  return (
    // <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-[240px_1fr]">
    //   <aside className="rounded-2xl border bg-background">
    //     <div className="p-4">
    //       <div className="text-sm text-muted-foreground">Signed in as</div>
    //       <div className="mt-1 font-semibold">{data.name}</div>
    //       <div className="text-xs text-muted-foreground">{data.role}</div>

    //       <Separator className="my-4" />

    //       <nav className="space-y-2">
    //         <Button asChild variant="ghost" className="w-full justify-start">
    //           <Link href="/dashboard">Overview</Link>
    //         </Button>
    //         <Button asChild variant="ghost" className="w-full justify-start">
    //           <Link href="/dashboard/bookings">My Bookings</Link>
    //         </Button>
    //         <Button asChild variant="ghost" className="w-full justify-start">
    //           <Link href="/dashboard/profile">Profile</Link>
    //         </Button>
    //       </nav>

    //       <Separator className="my-4" />

    //       <form action="/api/ui/logout" method="post">
    //         <Button type="submit" variant="outline" className="w-full">
    //           Logout
    //         </Button>
    //       </form>
    //     </div>
    //   </aside>

    //   <section className="min-w-0">{children}</section>
    // </div>
    <div>
          {userInfo.role === Roles.STUDENT
                ? student
                : userInfo.role === Roles.TUTOR
                ? tutor
                : admin}
          <h1>Dashboard Layout</h1>
    </div>
  
  );
}
