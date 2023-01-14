import { useSuspenseQuery } from "@suspensive/react-query";
import { useInternalRouter } from "~/hooks";
import { getCount } from "./apis";
import Keys from "./keys";

export const useFetchCount = () => {
  const { replace } = useInternalRouter();
  return useSuspenseQuery(Keys.overview(), getCount);
};
