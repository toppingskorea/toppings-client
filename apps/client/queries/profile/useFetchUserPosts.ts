import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { getUserPosts } from "~/apis";
import type { BaseSuspendedUseQueryResult } from "~/hooks/useSuspendedQuery";
import Keys from "./keys";

const useFetchUserPosts = (
  options?: Pick<
    UseQueryOptions<Awaited<ReturnType<typeof getUserPosts>>>,
    "onSuccess"
  >
) => {
  // Suspense 로 감싸주지 못하므로, 단언을 해줍니다.
  return useQuery(
    Keys.posts(),
    getUserPosts,
    options
  ) as BaseSuspendedUseQueryResult<Profile.PostDTO[]>;
};

export default useFetchUserPosts;
