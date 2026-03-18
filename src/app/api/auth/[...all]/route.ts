import { toNextJsHandler } from "better-auth/next-js";
import { type NextRequest,NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { isLocalAuthBypassEnabled } from "@/lib/local-auth-config";
import { getSession } from "@/lib/session";

const authHandler = toNextJsHandler(auth);

export async function GET(request: NextRequest) {
  if (
    isLocalAuthBypassEnabled() &&
    request.nextUrl.pathname.endsWith("/get-session")
  ) {
    return NextResponse.json(await getSession(request.headers));
  }

  return authHandler.GET(request);
}

export const POST = authHandler.POST;
