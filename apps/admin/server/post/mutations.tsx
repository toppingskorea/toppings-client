import type { UseQueryOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useToast } from "~/hooks";
import { updatePost, uploadPost } from "./apis";

export const useUpdatePost = (
  onSuccess: Pick<UseQueryOptions, "onSuccess">["onSuccess"]
) =>
  useMutation(updatePost, {
    onSuccess
  });

// 아직 사용되지 않습니다. 추후 사용됩니다.
export const useUploadPost = (
  onSuccess: Pick<UseQueryOptions, "onSuccess">["onSuccess"]
) => {
  const toast = useToast();

  return useMutation(uploadPost, {
    onSuccess,
    onError: (e: AxiosError<{ message: string }>) => {
      if (e.response?.data.message === "Duplicated item") {
        toast({
          title: "업로드 실패",
          description: "중복입니다.",
          status: "error"
        });
      }
    }
  });
};
