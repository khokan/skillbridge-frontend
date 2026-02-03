import Link from "next/link";
import { Button } from "@/components/ui/button";
import { userService } from "@/services/user.service";
import { Roles } from "@/constants/roles";
import Image from "next/image";

type Role = "student" | "tutor" | "admin";


function linksForRole(role?: Role) {
  if (role === Roles.ADMIN) {
    return [
      { href: "/admin", label: "Dashboard" },
      { href: "/admin/users", label: "Users" },
      { href: "/admin/bookings", label: "Bookings" },
      { href: "/admin/categories", label: "Categories" },
    ];
  }
  if (role === Roles.TUTOR) {
    return [
      { href: "/tutor/dashboard", label: "Dashboard" },
      { href: "/tutor/availability", label: "Availability" },
      { href: "/tutor/profile", label: "Profile" },
    ];
  }
  if (role === Roles.STUDENT) {
    return [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/dashboard/bookings", label: "My Bookings" },
      { href: "/dashboard/profile", label: "Profile" },
    ];
  }
  // not logged in (public)
  return [
    { href: "/tutors", label: "Tutors" },
  ];
}

export default async function Navbar() {
  const { data } = await userService.getSession();
    
  const user = data?.user as any;
  const role = user?.role as Role | undefined;

  const menu = linksForRole(role);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        
      <Link href="/" className="shrink-0">
              <div className="relative w-30 h-10 md:w-40 md:h-16">
                <Image
                  src="/logo.svg"
                  alt="SwiftCart Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 7rem, (max-width: 1024px) 10rem, 12rem"
                />
              </div>
            </Link>

        <nav className="flex items-center gap-2">
          {menu.map((m) => (
            <Button key={m.href} asChild variant="ghost">
              <Link href={m.href}>{m.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {!user ? (
            <>
              <Button asChild variant="ghost">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          ) : (
            <>
              <div className="hidden text-sm text-muted-foreground md:block">
                {user.name} · {role}
              </div>
              <form action="/api/ui/logout" method="post">
                <Button type="submit" variant="outline">
                  Logout
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
