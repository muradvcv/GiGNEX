// proxy.js

import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request) {
  const session = getSessionCookie(request);

  const pathname = request.nextUrl.pathname;

  // Protected routes
  const isProtected =
    pathname.startsWith("/dashboard/admin") ||
    pathname.startsWith("/dashboard/client") ||
    pathname.startsWith("/dashboard/freelancer");

  // No session -> Login
  if (isProtected && !session) {
    return NextResponse.redirect(
      new URL("/auth/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/admin/:path*",
    "/dashboard/client/:path*",
    "/dashboard/freelancer/:path*",
  ],
};