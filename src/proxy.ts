import { NextRequest, NextResponse } from "next/server";

import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";


export async function proxy(request: NextRequest) {
   const pathname = request.url;
  console.log("Proxy middleware:", request);

  let isAuthenticated = false;

  const { data } = await userService.getSession();
  console.log("Session data in middleware:", data);

  if (data) {
    isAuthenticated = true;
  }

  //* User in not authenticated at all
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //* User is authenticated and role = ADMIN
  //* User can not visit user dashboard
  if (data.user.role === Roles.student && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(request.url);
  }

  //* User is authenticated and role = TUTOR
  //* User can not visit admin-dashboard
  // if (data.user.role === Roles.tutor && pathname.startsWith("/dashboard")) {
  //   return NextResponse.redirect(new URL("/tutor/dashboard", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/tutor/:path*", "/admin/:path*"],
};