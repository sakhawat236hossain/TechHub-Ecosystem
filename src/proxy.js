import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

async function proxy(request) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isProtectedRoute =
    pathname.startsWith("/booking") || pathname.startsWith("/my-bookings");

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};