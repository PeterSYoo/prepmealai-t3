import { type NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard", "/recipe", "/recipe-board"],
  // pages: {
  //   signIn: "/",
  // },
};

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get("next-auth.session-token")?.value;
  if (cookie === undefined && req.url !== "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url, 302);
  }
}
