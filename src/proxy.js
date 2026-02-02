import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// ১. ফাংশনের নাম অবশ্যই 'proxy' হতে হবে (Next.js 16+ কনভেনশন)
export async function proxy(request) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("Next.js Proxy handling:", pathname);

  const isProtectedRoute =
    pathname.startsWith("/dashboard") || 
    pathname.startsWith("/booking") || 
    pathname.startsWith("/vendor") || 
    pathname.startsWith("/admin");

  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/booking/:path*",
    "/vendor/:path*",
    "/admin/:path*",
    "/login",
    "/register"
  ],
};