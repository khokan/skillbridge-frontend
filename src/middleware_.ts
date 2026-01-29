import { NextRequest, NextResponse } from "next/server";

import { userService } from "./services/user.service";

enum Roles {
  STUDENT = "STUDENT",
  TUTOR = "TUTOR",
  ADMIN = "ADMIN",
}

const PUBLIC_ROUTES = ["/", "/tutors", "/login", "/register"];
const isTutorPublic = (path: string) => path.startsWith("/tutors/");

function isPublic(path: string) {
  return PUBLIC_ROUTES.includes(path) || isTutorPublic(path);
}

function homeByRole(role: string) {
  if (role === Roles.ADMIN) return "/admin";
  if (role === Roles.TUTOR) return "/tutor/dashboard";
  return "/dashboard"; // STUDENT default
}

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // 1) Public routes: let them pass without session check
  if (isPublic(path)) {
    // (optional) If already logged in, block /login and /register
    if (path === "/login" || path === "/register") {
        const { data } = await userService.getSession();
      const role = (data?.user as any)?.role as string | undefined;
      if (role) return NextResponse.redirect(new URL(homeByRole(role), req.url));
    }
    return NextResponse.next();
  }

  // 2) Private routes: require session
  const session = await userService.getSession();
  const user = session?.user as any;

  if (!user) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", path);
    return NextResponse.redirect(loginUrl);
  }

  const role = (user.role ?? "") as string;

  // 3) Role-based guards
  // STUDENT can access only /dashboard/*
  if (role === Roles.STUDENT) {
    if (!path.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // TUTOR can access only /tutor/*
  if (role === Roles.TUTOR) {
    if (!path.startsWith("/tutor")) {
      return NextResponse.redirect(new URL("/tutor/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // ADMIN can access only /admin/*
  if (role === Roles.ADMIN) {
    if (!path.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  // Unknown role -> force logout/login
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("next", "/");
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tutor/:path*",
    "/admin/:path*",
    "/login",
    "/register",
    "/tutors/:path*",
    "/",
  ],
};
