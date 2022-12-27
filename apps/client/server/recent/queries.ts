import { getRecentHistory } from "./apis";
import { useSuspendedQuery } from "~/hooks";
import Keys from "./keys";

export const useFetchRecentHistory = () => {
  return useSuspendedQuery(Keys.recent(), getRecentHistory);
};
