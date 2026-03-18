import { getSessionCookie } from "better-auth/cookies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { isLocalAuthBypassEnabled } from "@/lib/local-auth-config";

export function middleware(request: NextRequest) {
  if (isLocalAuthBypassEnabled()) {
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(request);
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/authentication", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/patients/:path*",
    "/doctors/:path*",
    "/appointments/:path*",
    "/subscription/:path*",
    "/clinic-form/:path*",
  ],
};
