import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { logout, updateUserInfo } from ".";

export const useLogout = (
  options: Pick<
    UseMutationOptions<Awaited<ReturnType<typeof logout>>>,
    "onSuccess"
  >
) => {
  return useMutation(logout, options);
};

export const useUpdateUserInfo = (
  options: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof updateUserInfo>>,
      unknown,
      Parameters<typeof updateUserInfo>[0]
    >,
    "onSuccess"
  >
) => {
  return useMutation(updateUserInfo, options);
};
