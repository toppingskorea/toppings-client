import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLike } from "~/apis/restaurant";
import { Keys } from "~/queries/restaurant";

const usePostLike = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation(postLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(Keys.restaurant(id));
    },
    onError: () => {
      alert("로그인 이후 이용가능합니다!");
    }
  });
};

export default usePostLike;
