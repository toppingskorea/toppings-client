import type { NextMiddleware } from "next/server";
import { NextResponse } from "next/server";
import { env } from "~/constants";
import verifyToken from "./utils/auth/verifyToken";

// 로그인한 유저만 접근할 수 있는 라우트
const PROTECTED_ROUTE = ["/profile"];

// 로그인한 유저는 접근할 수 없는 라우트
const LOGIN_PROTECTED_ROUTE = ["/login"];

// 미들웨어를 발생시킬 라우트
export const config = {
  matcher: ["/profile", "/login"]
};

const middleware: NextMiddleware = async request => {
  const toppingsToken = request.cookies.get(env.TOPPINGS_TOKEN_KEY)?.value;

  // 로그인 안한사람 방지
  if (PROTECTED_ROUTE.includes(request.nextUrl.pathname))
    if (!toppingsToken || !verifyToken(toppingsToken))
      return NextResponse.redirect(new URL("/login", request.url));
  // 로그인 한 사람 접근 불가
  if (LOGIN_PROTECTED_ROUTE.includes(request.nextUrl.pathname))
    if (toppingsToken && verifyToken(toppingsToken))
      return NextResponse.redirect(new URL("/map", request.url));
  return null;
};

export default middleware;
