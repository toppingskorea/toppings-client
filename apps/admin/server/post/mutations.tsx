import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useToast } from "~/hooks";
import { updatePost, uploadPost } from "./apis";

// 아직 사용되지 않습니다. 추후 사용됩니다.
export const useUpdatePost = (
  options: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof updatePost>>,
      unknown,
      Parameters<typeof updatePost>[0]
    >,
    "onSuccess"
  >
) => useMutation(updatePost, options);

export const useUploadPost = (
  options: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof uploadPost>>,
      unknown,
      Parameters<typeof uploadPost>[0]
    >,
    "onSuccess"
  >
) => {
  const toast = useToast();

  return useMutation(uploadPost, {
    onSuccess: options.onSuccess,
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
