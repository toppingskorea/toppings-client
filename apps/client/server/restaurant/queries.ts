import { useSuspenseQuery } from "@suspensive/react-query";
import { getLikePercent, getRestaurant, Keys } from ".";

export const useFetchRestaurant = (id: number) => {
  return useSuspenseQuery(Keys.restaurant(id), () => getRestaurant(id));
};

export const useFetchLikePercent = (id: number) => {
  return useSuspenseQuery(Keys.likePercent(id), () => getLikePercent({ id }));
};
