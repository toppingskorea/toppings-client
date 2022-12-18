import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { getEatingHabitByFiltering } from "~/apis/recent";

const useFetchEatingHabitByFiltering = (
  options: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof getEatingHabitByFiltering>>,
      unknown,
      Parameters<typeof getEatingHabitByFiltering>[0]
    >,
    "onSuccess"
  >
) => {
  return useMutation(getEatingHabitByFiltering, options);
};

export default useFetchEatingHabitByFiltering;
