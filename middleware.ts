import { NextResponse, type NextRequest } from "next/server";
import { updateSupabaseSession } from "@/lib/supabase/middleware";

const protectedPrefixes = ["/dashboard", "/profile"];

export async function middleware(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_JASHNLY_LOCAL_TEST_MODE === "true") return NextResponse.next();
  const { response, user } = await updateSupabaseSession(request);
  const protectedRoute = protectedPrefixes.some((prefix) => request.nextUrl.pathname.startsWith(prefix));

  if (protectedRoute && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
