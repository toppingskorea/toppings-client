import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postScrap } from "~/apis/restaurant";
import { Keys } from "~/queries/restaurant";

const usePostScrap = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation(postScrap, {
    onMutate: async id => {
      await queryClient.cancelQueries({ queryKey: Keys.restaurant(id) });

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const previous = queryClient.getQueryData<Restaurant.DetailDTO>(
        Keys.restaurant(id)
      )!;

      queryClient.setQueryData<Restaurant.DetailDTO>(Keys.restaurant(id), {
        ...previous,
        scrap: true
      });

      return { previous };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(Keys.restaurant(id));
    },
    onError: () => {
      alert("로그인 이후 이용가능합니다!");
    }
  });
};

export default usePostScrap;
