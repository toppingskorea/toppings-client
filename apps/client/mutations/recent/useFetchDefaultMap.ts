import { useMutation, type UseQueryOptions } from "@tanstack/react-query";
import { getDefaultMap } from "~/apis/recent";

const useFetchDefaultMap = (
  options: Pick<
    UseQueryOptions<Awaited<ReturnType<typeof getDefaultMap>>>,
    "onSuccess"
  >
) => {
  return useMutation(getDefaultMap, options);
};

export default useFetchDefaultMap;
