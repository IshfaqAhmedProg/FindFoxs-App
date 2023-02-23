import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  let verified = req.cookies.get("loggedin");
  let url = req.nextUrl.clone();
  let siteUrl = url.origin;
  //if user not verified and tries to access dashboard redirect to login page
  if (!verified && url.pathname.includes(`/dashboard`)) {
    return NextResponse.redirect(`${siteUrl}/auth/login`);
  }
  //if user verified and tries to access auth pages redirect to dashboard page
  if (verified && url.pathname.includes(`/auth`)) {
    return NextResponse.redirect(`${siteUrl}/dashboard`);
  }
}
