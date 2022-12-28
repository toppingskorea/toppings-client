import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
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

export const useDeleteReview = () => useMutation(deleteReview);
