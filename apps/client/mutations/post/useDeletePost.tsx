import type { UseQueryOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { deletePost } from "~/apis/post";

const useDeletePost = (
  onSuccess: Pick<UseQueryOptions, "onSuccess">["onSuccess"]
) => {
  return useMutation(deletePost, {
    onSuccess
  });
};

export default useDeletePost;
