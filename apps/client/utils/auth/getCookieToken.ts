import { isServer } from "@toppings/utils";
import Cookies from "js-cookie";
import { env } from "~/constants";

export const getCookieToken = (initialValue = "") =>
  !isServer()
    ? Cookies.get(`${env.TOPPINGS_TOKEN_KEY}`) || initialValue
    : initialValue;
