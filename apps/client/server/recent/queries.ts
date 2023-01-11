import { useSuspendedQuery } from "~/hooks";
import { getRecentHistories } from "./apis";
import Keys from "./keys";

// eslint-disable-next-line import/prefer-default-export
export const useFetchRecentHistories = () => {
  return useSuspendedQuery(Keys.recent(), getRecentHistories);
};
