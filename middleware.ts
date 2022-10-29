import type { NextMiddleware } from "next/server";
import { NextResponse } from "next/server";
import { env } from "~/constants";
import { deleteMiddlewareCookie, verifyToken } from "~/utils";

const PRIVATE_PATHS = ["/user"];
const PRIVATE_REDIRECT_PATH = "/map";

const PREVENTED_PATHS = ["/login"];
const PREVENTED_REDIRECT_PATH = "/";

const middleware: NextMiddleware = async request => {
  const toppingsToken = request.cookies.get(env.TOPPINGS_TOKEN_KEY);

  if (toppingsToken) {
    const isJwtVerified = await verifyToken(toppingsToken, env.JWT_SECRET_KEY);

    if (
      PREVENTED_PATHS.reduce(
        (acc, path) => acc || request.nextUrl.pathname.includes(path),
        false
      )
    ) {
      if (isJwtVerified) {
        const nextUrl = request.nextUrl.clone();
        nextUrl.pathname = PREVENTED_REDIRECT_PATH;
        nextUrl.search = "";

        return NextResponse.redirect(nextUrl);
      }
    }
  }

  if (
    PRIVATE_PATHS.reduce(
      (acc, path) => acc || request.nextUrl.pathname.includes(path),
      false
    ) ||
    request.nextUrl.pathname === "/"
  ) {
    if (toppingsToken) {
      const isJwtVerified = await verifyToken(
        toppingsToken,
        env.JWT_SECRET_KEY
      );

      if (!isJwtVerified) {
        const nextUrl = request.nextUrl.clone();
        nextUrl.pathname = PRIVATE_REDIRECT_PATH;
        nextUrl.search = "";

        const response = deleteMiddlewareCookie(
          request,
          NextResponse.redirect(nextUrl),
          env.TOPPINGS_TOKEN_KEY
        );

        return response;
      }
    } else {
      const nextUrl = request.nextUrl.clone();
      nextUrl.pathname = PRIVATE_REDIRECT_PATH;
      nextUrl.search = "";

      return NextResponse.redirect(nextUrl);
    }
  }
  return null;
};

export default middleware;
