import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery
} from "@suspensive/react-query";
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
  return useSuspenseQuery(Keys.user(), getUserInfo, options);
};

export const useFetchUserPosts = () => {
  return useSuspenseInfiniteQuery(
    Keys.posts(),
    ({ pageParam = 0 }) => getUserPosts(pageParam),
    {
      getNextPageParam: lastPages => lastPages.page
    }
  );
};

export const useFetchScrapedRestaurant = () =>
  useSuspenseInfiniteQuery(
    Keys.scraps(),
    ({ pageParam = 0 }) => getUserScraps(pageParam),
    {
      getNextPageParam: lastPages => lastPages.page
    }
  );

export const useFetchReviewedRestaurant = () =>
  useSuspenseInfiniteQuery(
    Keys.reviews(),
    ({ pageParam = 0 }) => getUserReviewedRestaurant(pageParam),
    {
      getNextPageParam: lastPages => lastPages.page
    }
  );
