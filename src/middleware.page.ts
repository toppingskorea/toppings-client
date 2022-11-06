import type { NextMiddleware } from "next/server";
import { NextResponse } from "next/server";
import { env } from "~/constants";
import verifyToken from "./utils/auth/verifyToken";

// 로그인한 유저만 접근할 수 있는 라우트
const PROTECTED_ROUTE = ["/profile"];

// 로그인한 유저는 접근할 수 없는 라우트
const LOGINED_PROTECTED_ROUTE = ["/login"];

// 미들웨어를 발생시킬 라우트
export const config = {
  matcher: [...PROTECTED_ROUTE, ...LOGINED_PROTECTED_ROUTE]
};

const middleware: NextMiddleware = async request => {
  const toppingsToken = request.cookies.get(env.TOPPINGS_TOKEN_KEY);

  if (
    PROTECTED_ROUTE.reduce(
      (acc, path) => acc || request.nextUrl.pathname.includes(path),
      false
    )
  ) {
    if (verifyToken(toppingsToken)) {
      return null;
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    LOGINED_PROTECTED_ROUTE.reduce(
      (acc, path) => acc || request.nextUrl.pathname.includes(path),
      false
    )
  ) {
    if (verifyToken(toppingsToken)) {
      return NextResponse.redirect(new URL("/map", request.url));
    }
  }

  return null;
};

export default middleware;
