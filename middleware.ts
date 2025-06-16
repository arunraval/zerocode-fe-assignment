import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the token from the cookies
  const token = request.cookies.get("token")?.value;

  // Get the current path
  const path = request.nextUrl.pathname;

  // If trying to access login/register while authenticated, redirect to home
  if ((path === "/login" || path === "/register") && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If there's no token and trying to access protected routes
  if (!token && path !== "/login" && path !== "/register") {
    // Redirect to login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Configure which routes to protect
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
