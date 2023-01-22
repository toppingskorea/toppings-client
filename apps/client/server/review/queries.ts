import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery
} from "@suspensive/react-query";
import { type UseQueryOptions } from "@tanstack/react-query";
import { getReview, getReviews } from "./apis";
import Keys from "./keys";

export const useFetchReviews = (id: number) =>
  useSuspenseInfiniteQuery(
    Keys.reviews(id),
    ({ pageParam = 0 }) => getReviews(id, pageParam),
    {
      getNextPageParam: lastPages => lastPages.page
    }
  );

export const useFetchReview = (
  id?: number,
  onSuccess?: Pick<
    UseQueryOptions<unknown, unknown, Awaited<ReturnType<typeof getReview>>>,
    "onSuccess"
  >["onSuccess"]
) => {
  return useSuspenseQuery(Keys.review(id), () => getReview(id), {
    enabled: !!id,
    onSuccess
  });
};
