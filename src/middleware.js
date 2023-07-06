import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const publicUrl = path === "/login" || path === "/signup";
  const token = request.cookies.get("token")?.value || "";
  if (publicUrl && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!publicUrl && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/signup", "/profile/:id*", "/about"],
};
