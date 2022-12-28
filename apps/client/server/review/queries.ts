import { useQuery } from "@tanstack/react-query";
import { useSuspendedQuery } from "~/hooks";
import { getReview, getReviews } from "./apis";
import Keys from "./keys";

export const useFetchReviews = (id: number) =>
  useSuspendedQuery(Keys.reviews(id), () => getReviews(id));

export const useFetchReview = (id?: number) => {
  return useQuery(Keys.review(id), () => getReview(id), {
    enabled: !!id
  });
};
