import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get("next-auth.session-token")?.value;
  if (cookie === undefined) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url, req.url);
  }
}

export const config = {
  matcher: ["/dashboard"],
};
