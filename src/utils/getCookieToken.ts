import Cookies from "js-cookie";
import { env } from "~/constants";

const getCookieToken = (initialValue = "") =>
  typeof document !== "undefined"
    ? Cookies.get(`${env.TOPPINGS_TOKEN_KEY}`) || initialValue
    : initialValue;

export default getCookieToken;
