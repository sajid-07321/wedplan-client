import { getSessionCookie } from "better-auth/cookies"
import { NextResponse, type NextRequest } from "next/server"

// Cheap cookie-presence check so unauthenticated requests never reach the
// dashboard. The dashboard layout re-validates the session server-side.
export function proxy(request: NextRequest) {
  if (!getSessionCookie(request)) {
    const signInUrl = new URL("/sign-in", request.url)
    signInUrl.searchParams.set(
      "callbackURL",
      request.nextUrl.pathname + request.nextUrl.search
    )
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
