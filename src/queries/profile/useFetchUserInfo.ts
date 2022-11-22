import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "~/apis";
import type { BaseSuspendedUseQueryResult } from "~/hooks/useSuspendedQuery";
import Keys from "./keys";

const useFetchUserInfo = () => {
  // Suspense 로 감싸주지 못하므로, 단언을 해줍니다.
  return useQuery(
    Keys.user(),
    getUserInfo
  ) as BaseSuspendedUseQueryResult<Profile.UserDTO>;
};

export default useFetchUserInfo;
