import { getCookieToken } from "./getCookieToken";

export const isLoggedIn = () => Boolean(getCookieToken());
