import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const path = request.nextUrl.pathname;

  if ((path === "/login" || path === "/register") && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && path !== "/login" && path !== "/register") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
