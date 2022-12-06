import { useMutation, type UseQueryOptions } from "@tanstack/react-query";
import { getRestaurantNameByFiltering } from "~/apis/recent";

const useFetchRestaurantNameByFiltering = (
  options: Pick<
    UseQueryOptions<Awaited<ReturnType<typeof getRestaurantNameByFiltering>>>,
    "onSuccess"
  >
) => {
  return useMutation(getRestaurantNameByFiltering, options);
};

export default useFetchRestaurantNameByFiltering;
