import dayjs from "dayjs";
import { useCookies } from "react-cookie";
import { env } from "~/constants";

export const useTokenCookie = () => {
  const [cookies, setCookie, removeCookie] = useCookies();

  return {
    get: () => cookies[env.TOPPINGS_TOKEN_KEY],
    set: (token: string) => {
      setCookie(`${env.TOPPINGS_TOKEN_KEY}`, token, {
        path: "/",
        expires: dayjs().add(14, "day").toDate(),
        sameSite: "strict"
      });
    },
    remove: () => removeCookie(`${env.TOPPINGS_TOKEN_KEY}`, { path: "/" })
  };
};
