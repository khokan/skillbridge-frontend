import { Roles } from "@/constants/roles";
import { userService } from "@/services/user.service";
import { NextRequest, NextResponse } from "next/server";



export async function proxy(request: NextRequest) {
   const pathname = request.nextUrl.pathname;

  let isAuthenticated = false;

  if (pathname === "/dashboard/payment/payment-success") {
     const paymentSuccessUrl = new URL("/dashboard/payment/success", request.url);
     paymentSuccessUrl.search = request.nextUrl.search;
     return NextResponse.redirect(paymentSuccessUrl);
    }

  const { data } = await userService.getSession();
  const user = data?.user;
  // console.log("Middleware session data:", data , request.url);


  if (user) {
    isAuthenticated = true;
  }

  //* User in not authenticated at all
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //* User is authenticated and role = TUTOR
  //* User can not visit admin-dashboard
  if (user?.role === Roles.TUTOR && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/tutor/dashboard", request.url));
  }

  //  if (data.user.role === Roles.STUDENT && pathname.startsWith("/dashboard")) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }

  if (user?.role === Roles.ADMIN && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/tutor/:path*", "/admin/:path*",],
};