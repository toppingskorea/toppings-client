import { useQuery } from "@tanstack/react-query";
import { logout } from "./apis";
import Keys from "./keys";

export const useLogout = () => {
  return useQuery(Keys.logout(), logout);
};
