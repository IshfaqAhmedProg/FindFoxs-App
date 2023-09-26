import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import verifyIdToken from "./shared/functions/verifyIdToken";
import { JWTExpired } from "jose/dist/types/util/errors";
import { JWTPayload } from "jose";

const protectedRoutes = [
  `/dashboard`,
  `/people`,
  `/tasks`,
  `/tools`,
  `/crm`,
  `/verifyEmail`,
];
const authRoutes = [`/login`, `/signup`];
export default async function middleware(req: NextRequest) {
  let token = req.cookies.get("token");
  let tokenExpired = false;
  let decodedToken: void | JWTPayload;
  if (token) {
    decodedToken = await verifyIdToken(token.value).catch((err: JWTExpired) => {
      console.log("IdToken expired", err);
      tokenExpired = true;
    });
  }
  const userVerified = decodedToken?.user_id ? true : false;
  const emailVerified = decodedToken?.email_verified as boolean;
  let url = req.nextUrl.clone();
  let siteUrl = url.origin;

  if (tokenExpired) {
    return NextResponse.redirect(url);
  }
  if (userVerified && url.pathname == "/") {
    // If user is verified and tries to access landing page at '/'
    return NextResponse.redirect(`${siteUrl}/dashboard`);
  }
  // If user verified but email not verified and tries to access protected pages redirect to onboarding page
  if (
    userVerified &&
    !emailVerified &&
    protectedRoutes.some((route) => url.pathname.includes(route))
  ) {
    return NextResponse.redirect(`${siteUrl}/auth/signup/verifyEmail`);
  }
  // If user not verified and tries to access dashboard redirect to login page
  if (
    !userVerified &&
    !emailVerified &&
    protectedRoutes.some((route) => url.pathname.includes(route))
  ) {
    return NextResponse.redirect(`${siteUrl}/auth/login`);
  }

  // If user verified and tries to access auth pages redirect to dashboard page
  if (
    userVerified &&
    emailVerified &&
    authRoutes.some((route) => url.pathname.includes(route))
  ) {
    return NextResponse.redirect(`${siteUrl}/dashboard`);
  }

  const logObj = {
    base: url.basePath,
    url: url.pathname,
    homeURL: url.pathname == "/",
    emailVerified: emailVerified,
    userVerified: userVerified,
    tokenExpired: tokenExpired,
    protectedRoutes: protectedRoutes.some((route) =>
      url.pathname.includes(route)
    ),
    authRoutes: authRoutes.some((route) => url.pathname.includes(route)),
  };
  console.log(logObj);
}
