import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLike } from "~/apis/restaurant";
import { Keys } from "~/queries/restaurant";

const useDeleteLike = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation(deleteLike, {
    onMutate: async id => {
      await queryClient.cancelQueries({ queryKey: Keys.restaurant(id) });

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const previous = queryClient.getQueryData<Restaurant.DetailDTO>(
        Keys.restaurant(id)
      )!;

      queryClient.setQueryData<Restaurant.DetailDTO>(Keys.restaurant(id), {
        ...previous,
        like: false,
        likeCount: previous.likeCount - 1
      });

      return { previous };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(Keys.restaurant(id));
      queryClient.invalidateQueries(Keys.likePercent(id));
    }
  });
};

export default useDeleteLike;
