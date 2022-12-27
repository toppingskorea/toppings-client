import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { BaseSuspendedUseQueryResult } from "~/hooks/useSuspendedQuery";
import { useSuspendedQuery } from "~/hooks/useSuspendedQuery";
import {
  getUserInfo,
  getUserPosts,
  getUserReviewedRestaurant,
  getUserScraps
} from "./apis";
import Keys from "./keys";

export const useFetchUserInfo = (
  options?: Pick<
    UseQueryOptions<Awaited<ReturnType<typeof getUserInfo>>>,
    "onSuccess"
  >
) => {
  // Suspense 로 감싸주지 못하므로, 단언을 해줍니다.

  return useQuery(
    Keys.user(),
    getUserInfo,
    options
  ) as BaseSuspendedUseQueryResult<Profile.UserDTO>;
};

export const useFetchUserPosts = (
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

export const useFetchScrapedRestaurant = () =>
  useSuspendedQuery(Keys.scraps(), getUserScraps);

export const useFetchReviewedRestaurant = () =>
  useSuspendedQuery(Keys.reviews(), getUserReviewedRestaurant);
