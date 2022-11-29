import dayjs from "dayjs";
import type { NextMiddleware } from "next/server";
import { NextResponse } from "next/server";
import { env } from "~/constants";
import verifyToken from "./utils/auth/verifyToken";

// 로그인한 유저만 접근할 수 있는 라우트
const PROTECTED_ROUTE = [
  "/profile",
  "/profile/posts",
  "/profile/saved",
  "/profile/reviews",
  "/profile/edit",
  "/profile/menu",
  "/profile/edit/nationality",
  "/profile/edit/eatingHabits"
];

// 로그인한 유저는 접근할 수 없는 라우트
const LOGIN_PROTECTED_ROUTE = ["/login"];

// 미들웨어를 발생시킬 라우트
export const config = {
  matcher: ["/profile/:path*", "/login", "/login/redirect"]
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
    console.log(token);

    const retrievedValue = await (
      await fetch(`http://api.toppings.co.kr:28080/user/role`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    ).json();

    console.log(retrievedValue.data);

    const nextUrl = request.nextUrl.clone();
    nextUrl.pathname =
      retrievedValue.data === "ROLE_TEMP" ? "/register/nationality" : "/map";
    nextUrl.search = "";

    const response = NextResponse.redirect(nextUrl);

    response.cookies.set(env.TOPPINGS_TOKEN_KEY, token as string, {
      // httpOnly: true,
      sameSite: "strict",
      path: "/",
      expires: dayjs().add(365, "day").toDate()
    });

    return response;
  }

  return null;
};

export default middleware;