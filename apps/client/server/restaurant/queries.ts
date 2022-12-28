import { useSuspendedQuery } from "~/hooks";
import { getLikePercent, getRestaurant } from "./apis";
import Keys from "./keys";

export const useFetchRestaurant = (id: number) => {
  return useSuspendedQuery(Keys.restaurant(id), () => getRestaurant(id));
};

export const useFetchLikePercent = (id: number) => {
  return useSuspendedQuery(Keys.likePercent(id), () => getLikePercent({ id }));
};
