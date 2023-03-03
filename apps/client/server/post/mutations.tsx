import { useMutation, type UseQueryOptions } from "@tanstack/react-query";
import { useOverlay } from "@toss/use-overlay";
import type { AxiosError } from "axios";
import DuplicatedOverlay from "~/components/Post/PostAddPage/DuplicatedOverlay";
import { deletePost, updatePost, uploadPost } from ".";

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
