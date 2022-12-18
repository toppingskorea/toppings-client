import { useMutation, type UseQueryOptions } from "@tanstack/react-query";
import { deleteAllRecentHistory } from "~/apis/recent";

const useDeleteAllRecentHistory = (
  options: Pick<UseQueryOptions, "onSuccess">
) => {
  return useMutation(deleteAllRecentHistory, options);
};

export default useDeleteAllRecentHistory;
