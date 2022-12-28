import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLike, deleteScrap, postLike, postScrap } from "./apis";
import Keys from "./keys";

export const useDeleteLike = (id: number) => {
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
      queryClient.invalidateQueries({
        queryKey: Keys.restaurant(id)
      });
      queryClient.invalidateQueries({
        queryKey: Keys.likePercent(id)
      });
    }
  });
};

export const useDeleteScrap = (id: number) => {
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

export const usePostLike = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation(postLike, {
    onMutate: async id => {
      await queryClient.cancelQueries({ queryKey: Keys.restaurant(id) });

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const previous = queryClient.getQueryData<Restaurant.DetailDTO>(
        Keys.restaurant(id)
      )!;

      queryClient.setQueryData<Restaurant.DetailDTO>(Keys.restaurant(id), {
        ...previous,
        like: true,
        likeCount: previous.likeCount + 1
      });

      return { previous };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: Keys.restaurant(id)
      });
      queryClient.invalidateQueries({
        queryKey: Keys.likePercent(id)
      });
    },
    onError: () => {
      alert("로그인 이후 이용가능합니다!");
    }
  });
};

export const usePostScrap = (id: number) => {
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
      queryClient.invalidateQueries({
        queryKey: Keys.restaurant(id)
      });
    },
    onError: () => {
      alert("로그인 이후 이용가능합니다!");
    }
  });
};
