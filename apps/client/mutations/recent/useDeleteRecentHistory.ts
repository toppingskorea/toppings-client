import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { deleteRecentHistory } from "~/apis/recent";

const useDeleteRecentHistory = (
  options: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof deleteRecentHistory>>,
      unknown,
      Parameters<typeof deleteRecentHistory>[0]
    >,
    "onSuccess"
  >
) => {
  return useMutation(deleteRecentHistory, options);
};

export default useDeleteRecentHistory;
