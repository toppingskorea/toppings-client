import dayjs from "dayjs";
import type { NextMiddleware } from "next/server";
import { NextResponse } from "next/server";
import { env } from "~/constants";
import { KAKAO_LOGIN_REDIRECT_URI } from "./hooks/auth/useProtectRouteModal";
import { verifyToken } from "./utils";

// 로그인한 유저만 접근할 수 있는 라우트
const PROTECTED_ROUTE = [
  "/profile",
  "/profile/posts",
  "/profile/saved",
  "/profile/reviews",
  "/profile/edit",
  "/profile/menu",
  "/profile/edit/nationality",
  "/profile/edit/eatingHabits",
  "/post/add",
  "/notice"
];

// 로그인한 유저는 접근할 수 없는 라우트
const LOGIN_PROTECTED_ROUTE = ["/login"];

// 미들웨어를 발생시킬 라우트
export const config = {
  matcher: [
    "/profile/:path*",
    "/login",
    "/login/redirect",
    "/post/add",
    "/notice"
  ]
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

  // 로그인 리다이렉트
  if (request.nextUrl.pathname.startsWith("/login/redirect")) {
    const token = request.nextUrl.searchParams.get("accessToken");
    const role = request.nextUrl.searchParams.get("role");

    // 이미 가입한 유저인 경우, 어디서 로그인 했는지에 따라서 그쪽으로 보내줘야함
    const justLoginRedirectUri = request.cookies.get(
      KAKAO_LOGIN_REDIRECT_URI
    )?.value;

    const existingUserRedirectUri = justLoginRedirectUri ?? "/map";

    const response = NextResponse.redirect(
      new URL(
        role === "ROLE_TEMP"
          ? "/register/nationality"
          : existingUserRedirectUri,
        request.url
      )
    );

    response.cookies.set(env.TOPPINGS_TOKEN_KEY, token as string, {
      sameSite: "strict",
      path: "/",
      expires: dayjs().add(365, "day").toDate()
    });

    return response;
  }

  return null;
};

export default middleware;
