import {
  useQueryClient,
  useMutation,
  type UseMutationOptions
} from "@tanstack/react-query";
import { Keys } from ".";
import { deleteReview, updateReview, uploadReview } from "./apis";

export const useUpdateReview = (
  options: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof updateReview>>,
      unknown,
      Parameters<typeof updateReview>[0]
    >,
    "onSuccess"
  >
) => useMutation(updateReview, options);

export const useUploadReview = (
  options: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof uploadReview>>,
      unknown,
      Parameters<typeof uploadReview>[0]
    >,
    "onSuccess"
  >
) => {
  return useMutation(uploadReview, options);
};

export const useDeleteReview = (restaurantId: number) => {
  const queryClient = useQueryClient();

  return useMutation(deleteReview, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: Keys.reviews(restaurantId)
      });
    }
  });
};
