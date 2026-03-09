import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const role = (req.auth?.user as any)?.role;

  // Dashboard routes: require MERCHANT or ADMIN
  if (pathname.startsWith("/dashboard")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login?callbackUrl=/dashboard", req.url));
    }
    if (role !== "MERCHANT" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Customer order routes: require authentication
  if (pathname.startsWith("/orders")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login?callbackUrl=/orders", req.url));
    }
  }

  // Profile: require authentication
  if (pathname.startsWith("/profile")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login?callbackUrl=/profile", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/orders/:path*", "/profile/:path*"],
};
