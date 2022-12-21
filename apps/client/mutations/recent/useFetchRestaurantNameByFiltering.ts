import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { getRestaurantNameByFiltering } from "~/apis/recent";

const useFetchRestaurantNameByFiltering = (
  options: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof getRestaurantNameByFiltering>>,
      unknown,
      Parameters<typeof getRestaurantNameByFiltering>[0]
    >,
    "onSuccess"
  >
) => {
  return useMutation(getRestaurantNameByFiltering, options);
};

export default useFetchRestaurantNameByFiltering;
