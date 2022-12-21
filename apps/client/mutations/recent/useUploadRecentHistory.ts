import { useMutation } from "@tanstack/react-query";
import { addRecentHistory } from "~/apis/recent";

const useUploadRecentHistory = () => {
  return useMutation(addRecentHistory);
};

export default useUploadRecentHistory;
