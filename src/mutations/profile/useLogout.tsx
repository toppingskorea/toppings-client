import type { UseQueryOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { logout } from "~/apis";

const useLogout = (options: Pick<UseQueryOptions, "onSuccess">) => {
  return useMutation(logout, options);
};

export default useLogout;
