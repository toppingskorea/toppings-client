import { useSuspendedQuery } from "~/hooks";
import { getCount } from "./apis";
import Keys from "./keys";

export const useFetchCount = () => {
  return useSuspendedQuery(Keys.overview(), getCount);
};
