import type { UseQueryOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { uploadPost } from "~/apis/post";

const useUploadPost = (options: Pick<UseQueryOptions, "onSuccess">) => {
  return useMutation(uploadPost, options);
};

export default useUploadPost;
