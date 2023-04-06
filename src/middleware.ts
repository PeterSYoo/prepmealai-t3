import { type NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/", "/((?!_next/static)(?!api)(?!favicon.ico).*)"],
};

export function middleware(req: NextRequest) {
  const cookieName = req.cookies.get("next-auth.session-token")
    ? "next-auth.session-token"
    : "__Secure-next-auth.session-token";
  const cookieValue = req.cookies.get(cookieName)?.value;

  console.log("cookie value: ", cookieValue);

  if (cookieValue === undefined) {
    if (req.nextUrl.pathname !== "/") {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url, 301);
    }
  } else if (cookieValue !== undefined) {
    if (req.nextUrl.pathname === "/") {
      const url = req.nextUrl.clone();
      url.pathname = "/recipe";
      return NextResponse.redirect(url, 301);
    }
  }
}
