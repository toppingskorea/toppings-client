import Cookies from "js-cookie";
import { env } from "~/constants";
import { isServer } from "../common";

const getCookieToken = (initialValue = "") =>
  !isServer()
    ? Cookies.get(`${env.TOPPINGS_TOKEN_KEY}`) || initialValue
    : initialValue;

export default getCookieToken;
