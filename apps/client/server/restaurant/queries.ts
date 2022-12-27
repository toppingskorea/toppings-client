import { getLikePercent, getRestaurant, getReviews } from "./apis";
import { useSuspendedQuery } from "~/hooks";
import Keys from "./keys";

export const useFetchReviews = (id: number) => {
  return useSuspendedQuery(Keys.reviews(id), () => getReviews({ id }));
};

export const useFetchRestaurant = (id: number) => {
  return useSuspendedQuery(Keys.restaurant(id), () => getRestaurant(id));
};

export const useFetchLikePercent = (id: number) => {
  return useSuspendedQuery(Keys.likePercent(id), () => getLikePercent({ id }));
};
