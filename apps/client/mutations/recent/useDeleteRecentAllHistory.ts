import { useMutation, type UseQueryOptions } from "@tanstack/react-query";
import { deleteRecentAllHistory } from "~/apis/recent";

const useDeleteRecentAllHistory = (
  options: Pick<UseQueryOptions, "onSuccess">
) => {
  return useMutation(deleteRecentAllHistory, options);
};

export default useDeleteRecentAllHistory;
