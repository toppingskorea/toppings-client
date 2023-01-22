import { useSuspenseQuery } from "@suspensive/react-query";
import { getReview, getReviews } from "./apis";
import Keys from "./keys";

export const useFetchReviews = (page: number) => {
  return useSuspenseQuery(Keys.reviews(page), () => getReviews(page));
};

export const useFetchReview = (id: number) => {
  return useSuspenseQuery(Keys.review(id), () => getReview(id));
};
