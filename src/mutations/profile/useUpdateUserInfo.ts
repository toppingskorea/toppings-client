import { useMutation } from "@tanstack/react-query";
import { updateUserInfo } from "~/apis";

const useUpdateUserInfo = () => {
  return useMutation(updateUserInfo);
};
export default useUpdateUserInfo;
