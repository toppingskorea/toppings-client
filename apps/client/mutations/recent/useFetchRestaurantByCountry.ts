import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { getRestaurantByCountry } from "~/apis/recent";

const useFetchRestaurantByCountry = (
  options: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof getRestaurantByCountry>>,
      unknown,
      Parameters<typeof getRestaurantByCountry>[0]
    >,
    "onSuccess"
  >
) => {
  return useMutation(getRestaurantByCountry, options);
};

export default useFetchRestaurantByCountry;
