import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteScrap } from "~/apis/restaurant";
import { Keys } from "~/queries/restaurant";

const useDeleteScrap = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation(deleteScrap, {
    onMutate: async id => {
      await queryClient.cancelQueries({ queryKey: Keys.restaurant(id) });

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const previous = queryClient.getQueryData<Restaurant.DetailDTO>(
        Keys.restaurant(id)
      )!;

      queryClient.setQueryData<Restaurant.DetailDTO>(Keys.restaurant(id), {
        ...previous,
        scrap: false
      });

      return { previous };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: Keys.restaurant(id)
      });
    }
  });
};

export default useDeleteScrap;
