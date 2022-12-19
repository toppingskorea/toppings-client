import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { deleteAllRecentHistory } from "~/apis/recent";

const useDeleteAllRecentHistory = (
  options: Pick<
    UseMutationOptions<Awaited<ReturnType<typeof deleteAllRecentHistory>>>,
    "onSuccess"
  >
) => {
  return useMutation(deleteAllRecentHistory, options);
};

export default useDeleteAllRecentHistory;
