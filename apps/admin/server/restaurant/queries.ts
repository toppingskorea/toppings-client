import { useSuspenseQuery } from "@suspensive/react-query";
import { getRestaurant, getRestaurants } from "./apis";
import Keys from "./keys";

export const useFetchRestaurants = (page: number) => {
  return useSuspenseQuery(Keys.restaurants(page), () => getRestaurants(page));
};

export const useFetchRestaurant = (id: number) => {
  return useSuspenseQuery(Keys.restaurant(id), () => getRestaurant(id));
};
