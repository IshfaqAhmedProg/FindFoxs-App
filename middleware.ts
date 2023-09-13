import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import decodeIdToken from "./shared/functions/verifyIdToken";
import { JWTExpired } from "jose/dist/types/util/errors";

const protectedRoutes = [`/dashboard`, `/leads`, `/tasks`, `/tools`];
const authRoutes = [`/login`, `/signup`];
export default async function middleware(req: NextRequest) {
  //TODO verify token here
  let token = req.cookies.get("token");
  let tokenExpired = false;
  if (token) {
    const decodedToken = await decodeIdToken(token.value).catch(
      (err: JWTExpired) => {
        console.log(err);
        tokenExpired = true;
      }
    );
    const userVerified = decodedToken?.user_id ? true : false;
    // console.log("decodedToken", decodedToken);
    const emailVerified = decodedToken?.email_verified as boolean;
    let url = req.nextUrl.clone();
    let siteUrl = url.origin;
    // console.log("emailVerified", emailVerified);
    // console.log("userVerified", userVerified);
    if (tokenExpired) {
      return NextResponse.redirect(siteUrl);
    }
    //if user not verified and tries to access dashboard redirect to login page
    if (
      !userVerified &&
      protectedRoutes.some((route) => url.pathname.includes(route))
    ) {
      return NextResponse.redirect(`${siteUrl}/auth/login`);
    }
    //if user verified and tries to access auth pages redirect to dashboard page
    if (
      userVerified &&
      emailVerified &&
      authRoutes.some((route) => url.pathname.includes(route))
    ) {
      return NextResponse.redirect(`${siteUrl}/dashboard`);
    }

    //if user verified but email not verified and tries to access protected pages redirect to onboarding page
    if (
      userVerified &&
      !emailVerified &&
      protectedRoutes.some((route) => url.pathname.includes(route))
    ) {
      // console.log("emailVerified", emailVerified?.value);
      // console.log("Verified", userVerified?.value);
      return NextResponse.redirect(`${siteUrl}/auth/signup/1`);
    }
  }
}
