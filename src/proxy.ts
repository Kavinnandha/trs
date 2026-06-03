import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE = "trs_session";

/**
 * Coarse gate for /admin/* — checks token presence at the edge, lets the admin
 * layout verify the JWT authoritatively server-side (has AUTH_SECRET).
 */
export default function proxy(req: NextRequest) {
  return guard(req);
}

async function guard(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLogin = pathname === "/admin/login";
  const token = req.cookies.get(COOKIE)?.value;

  // Token presence is enough to pass the edge check; the admin layout verifies
  // the JWT authoritatively server-side (has AUTH_SECRET).
  const valid = !!token;

  if (!isLogin && !valid) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = `?from=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
  }
  if (isLogin && valid) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
