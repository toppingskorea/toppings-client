import type { UseQueryOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { updateUserInfo } from "~/apis";

const useUpdateUserInfo = (options: Pick<UseQueryOptions, "onSuccess">) => {
  return useMutation(updateUserInfo, options);
};
export default useUpdateUserInfo;
