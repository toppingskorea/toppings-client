import type { NextMiddleware } from "next/server";
import { NextResponse } from "next/server";
import jwt from "jwt-decode";
import { env } from "~/constants";

const PRIVATE_PATHS = ["/user"];
const PRIVATE_REDIRECT_PATH = "/map";

const PREVENTED_PATHS = ["/login"];
const PREVENTED_REDIRECT_PATH = "/";

export const config = {
  matcher: ["/", "/protected"]
};

const middleware: NextMiddleware = async request => {
  const toppingsToken = request.cookies.get(env.TOPPINGS_TOKEN_KEY);

  if (toppingsToken) {
    const decodedToken = jwt<{ exp: string }>(toppingsToken);

    if (Date.now() >= Number(decodedToken.exp) * 1000) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return null;
};

export default middleware;
