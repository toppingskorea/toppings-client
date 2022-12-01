import { useMutation, type UseQueryOptions } from "@tanstack/react-query";
import { addRecentHistory } from "~/apis/recent";

const useUploadRecentHistory = (
  options: Pick<UseQueryOptions, "onSuccess">
) => {
  return useMutation(addRecentHistory, options);
};

export default useUploadRecentHistory;
