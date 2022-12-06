import { useMutation, type UseQueryOptions } from "@tanstack/react-query";
import { getEatingHabitByFiltering } from "~/apis/recent";

const useFetchEatingHabitByFiltering = (
  options: Pick<
    UseQueryOptions<Awaited<ReturnType<typeof getEatingHabitByFiltering>>>,
    "onSuccess"
  >
) => {
  return useMutation(getEatingHabitByFiltering, options);
};

export default useFetchEatingHabitByFiltering;
