import { useMutation, type UseQueryOptions } from "@tanstack/react-query";
import { logout, updateUserInfo } from "./apis";

export const useLogout = (options: Pick<UseQueryOptions, "onSuccess">) => {
  return useMutation(logout, options);
};

export const useUpdateUserInfo = (
  options: Pick<UseQueryOptions, "onSuccess">
) => {
  return useMutation(updateUserInfo, options);
};
