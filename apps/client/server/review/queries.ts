import { useSuspenseQuery } from "@suspensive/react-query";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getReview, getReviews } from "./apis";
import Keys from "./keys";

export const useFetchReviews = (id: number) =>
  useSuspenseQuery(Keys.reviews(id), () => getReviews(id));

export const useFetchReview = (
  id?: number,
  onSuccess?: Pick<
    UseQueryOptions<unknown, unknown, Awaited<ReturnType<typeof getReview>>>,
    "onSuccess"
  >["onSuccess"]
) => {
  return useQuery(Keys.review(id), () => getReview(id), {
    enabled: !!id,
    onSuccess
  });
};
