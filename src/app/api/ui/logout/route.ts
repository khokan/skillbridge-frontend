// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authClient } from "@/lib/auth";
import { cookies } from "next/dist/server/request/cookies";

export async function POST(request: NextRequest) {
  try {

    const cookieStore = await cookies();  
    // Clear cookies
    cookieStore.getAll().forEach(cookie => {
      if (cookie.name.includes("auth") || cookie.name.includes("session")) {
        cookieStore.delete(cookie.name);
      }
    });

    // Call Better Auth's signOut API
    const authResponse = await authClient.signOut();

    if (!authResponse) {
      throw new Error("Failed to sign out");
    }

    // Create response
    const response = NextResponse.redirect(new URL("/login", request.url));
    
    return response;

  } catch (error) {
    console.error("Logout error:", error);
    
    // Fallback: Clear cookies and redirect even if auth fails
    const response = NextResponse.json(
      { error: "Logout failed" },
      { status: 500 }
    );
    
    return response;
  }
}