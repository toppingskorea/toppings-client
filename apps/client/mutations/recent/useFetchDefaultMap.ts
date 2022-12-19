import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { getDefaultMap } from "~/apis/recent";

const useFetchDefaultMap = (
  options: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof getDefaultMap>>,
      unknown,
      Parameters<typeof getDefaultMap>[0]
    >,
    "onSuccess"
  >
) => {
  return useMutation(getDefaultMap, options);
};

export default useFetchDefaultMap;
