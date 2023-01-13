import { useInternalRouter, useSuspendedQuery } from "~/hooks";
import { getCount } from "./apis";
import Keys from "./keys";

export const useFetchCount = () => {
  const { replace } = useInternalRouter();
  return useSuspendedQuery(Keys.overview(), getCount, {
    onError: () => {
      replace("/login");
    }
  });
};
