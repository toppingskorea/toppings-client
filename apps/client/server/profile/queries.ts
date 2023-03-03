import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery
} from "@suspensive/react-query";
import { useTokenCookie } from "~/hooks";
import {
  getUserInfo,
  getUserPosts,
  getUserReviewedRestaurant,
  getUserScraps,
  Keys
} from ".";

export const useFetchUserInfo = () => {
  const cookie = useTokenCookie();

  return useSuspenseQuery(Keys.user(), getUserInfo, {
    enabled: !!cookie.get()
  });
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
