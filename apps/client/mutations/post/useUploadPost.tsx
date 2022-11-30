import type { UseQueryOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useOverlay } from "@toss/use-overlay";
import type { AxiosError } from "axios";
import { uploadPost } from "~/apis/post";
import { DuplicatedOverlay } from "~/components/Post";

const useUploadPost = (
  onSuccess: Pick<UseQueryOptions, "onSuccess">["onSuccess"]
) => {
  const overlay = useOverlay();

  return useMutation(uploadPost, {
    onSuccess,
    onError: (e: AxiosError<{ message: string }>) => {
      if (e.response?.data.message === "Duplicated item") {
        overlay.open(() => <DuplicatedOverlay/>);
      }
    }
  });
};

export default useUploadPost;
