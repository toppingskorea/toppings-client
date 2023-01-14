import { useSuspenseQuery } from "@suspensive/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
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

  return useSuspenseQuery(Keys.user(), getUserInfo, options);
};

export const useFetchUserPosts = (
  options?: Pick<
    UseQueryOptions<Awaited<ReturnType<typeof getUserPosts>>>,
    "onSuccess"
  >
) => {
  // Suspense 로 감싸주지 못하므로, 단언을 해줍니다.
  return useSuspenseQuery(Keys.posts(), getUserPosts, options);
};

export const useFetchScrapedRestaurant = () =>
  useSuspenseQuery(Keys.scraps(), getUserScraps);

export const useFetchReviewedRestaurant = () =>
  useSuspenseQuery(Keys.reviews(), getUserReviewedRestaurant);
