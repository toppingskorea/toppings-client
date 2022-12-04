import { getRestaurant } from "~/apis/restaurant";
import { useSuspendedQuery } from "~/hooks";
import Keys from "./keys";

const useFetchRestaurant = (id: number) => {
  return useSuspendedQuery(Keys.restaurant(id), () => getRestaurant(id));
};

export default useFetchRestaurant;
