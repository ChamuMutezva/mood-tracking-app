import { auth } from "./auth";
import { getCustomSession } from "@/actions/sessions";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  // First, check NextAuth session
  const session = await auth();
  const customSession = await getCustomSession();
  
  const { pathname } = request.nextUrl;

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (!session && !customSession) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  if (pathname === '/login' || pathname === '/signup') {
    if (session || customSession) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*" , "/login", "/signup"],
};
