import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = [`/dashboard`, `/leads`];
const authRoutes = [`/login`, `/signup`];
export default function middleware(req: NextRequest) {
  let userVerified = req.cookies.get("loggedin");
  //TODO verify token here
  let emailVerified = req.cookies.get("emailVerified");
  let url = req.nextUrl.clone();
  let siteUrl = url.origin;
  // console.log("emailVerified", emailVerified?.value);
  // console.log("userVerified", userVerified?.value);
  //if user not verified and tries to access dashboard redirect to login page
  if (
    !userVerified?.value &&
    protectedRoutes.some((route) => url.pathname.includes(route))
  ) {
    return NextResponse.redirect(`${siteUrl}/auth/login`);
  }
  //if user verified and tries to access auth pages redirect to dashboard page
  if (
    userVerified &&
    emailVerified?.value == "true" &&
    authRoutes.some((route) => url.pathname.includes(route))
  ) {
    return NextResponse.redirect(`${siteUrl}/dashboard`);
  }

  //if user verified but email not verified and tries to access protected pages redirect to onboarding page
  if (
    userVerified &&
    emailVerified?.value == "false" &&
    protectedRoutes.some((route) => url.pathname.includes(route))
  ) {
    // console.log("emailVerified", emailVerified?.value);
    // console.log("Verified", userVerified?.value);
    return NextResponse.redirect(`${siteUrl}/auth/signup/1`);
  }
}
