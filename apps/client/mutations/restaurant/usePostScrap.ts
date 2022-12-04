import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postScrap } from "~/apis/restaurant";
import { Keys } from "~/queries/restaurant";

const usePostScrap = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation(postScrap, {
    onSuccess: () => {
      queryClient.invalidateQueries(Keys.restaurant(id));
    },
    onError: () => {
      alert("로그인 이후 이용가능합니다!");
    }
  });
};

export default usePostScrap;
