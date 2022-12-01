import { useMutation, type UseQueryOptions } from "@tanstack/react-query";
import { deleteRecentHistory } from "~/apis/recent";

const useDeleteRecentHistory = (
  options: Pick<UseQueryOptions, "onSuccess">
) => {
  return useMutation(deleteRecentHistory, options);
};

export default useDeleteRecentHistory;
