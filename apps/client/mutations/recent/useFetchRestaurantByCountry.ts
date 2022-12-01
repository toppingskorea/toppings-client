import { useMutation, type UseQueryOptions } from "@tanstack/react-query";
import { getRestaurantByCountry } from "~/apis/recent";

const useFetchRestaurantByCountry = (
  options: Pick<
    UseQueryOptions<Awaited<ReturnType<typeof getRestaurantByCountry>>>,
    "onSuccess"
  >
) => {
  return useMutation(getRestaurantByCountry, options);
};

export default useFetchRestaurantByCountry;
