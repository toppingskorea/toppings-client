import { useSuspenseQuery } from "@suspensive/react-query";
import { getLikePercent, getRestaurant } from "./apis";
import Keys from "./keys";

export const useFetchRestaurant = (id: number) => {
  return useSuspenseQuery(Keys.restaurant(id), () => getRestaurant(id));
};

export const useFetchLikePercent = (id: number) => {
  return useSuspenseQuery(Keys.likePercent(id), () => getLikePercent({ id }));
};
