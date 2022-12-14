import type { UseQueryOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useOverlay } from "@toss/use-overlay";
import type { AxiosError } from "axios";
import { deletePost, updatePost, uploadPost } from "./apis";
import { DuplicatedOverlay } from "~/components/Post";

export const useDeletePost = (
  onSuccess: Pick<UseQueryOptions, "onSuccess">["onSuccess"]
) =>
  useMutation(deletePost, {
    onSuccess
  });

export const useUpdatePost = (
  onSuccess: Pick<UseQueryOptions, "onSuccess">["onSuccess"]
) =>
  useMutation(updatePost, {
    onSuccess
  });

export const useUploadPost = (
  onSuccess: Pick<UseQueryOptions, "onSuccess">["onSuccess"]
) => {
  const overlay = useOverlay();

  return useMutation(uploadPost, {
    onSuccess,
    onError: (e: AxiosError<{ message: string }>) => {
      if (e.response?.data.message === "Duplicated item") {
        overlay.open(() => <DuplicatedOverlay />);
      }
    }
  });
};
