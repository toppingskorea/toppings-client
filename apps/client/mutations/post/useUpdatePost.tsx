import type { UseQueryOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { updatePost } from "~/apis/post";

const useUpdatePost = (
  onSuccess: Pick<UseQueryOptions, "onSuccess">["onSuccess"]
) =>
  useMutation(updatePost, {
    onSuccess
  });

export default useUpdatePost;
