import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLike } from "~/apis/restaurant";
import { Keys } from "~/queries/restaurant";

const useDeleteLike = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation(deleteLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(Keys.restaurant(id));
    }
  });
};

export default useDeleteLike;
