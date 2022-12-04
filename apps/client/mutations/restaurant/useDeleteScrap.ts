import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteScrap } from "~/apis/restaurant";
import { Keys } from "~/queries/restaurant";

const useDeleteScrap = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation(deleteScrap, {
    onSuccess: () => {
      queryClient.invalidateQueries(Keys.restaurant(id));
    }
  });
};

export default useDeleteScrap;
