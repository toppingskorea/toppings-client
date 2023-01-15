import { useSuspenseQuery } from "@suspensive/react-query";
import { getRecentHistories } from "./apis";
import Keys from "./keys";

// eslint-disable-next-line import/prefer-default-export
export const useFetchRecentHistories = () => {
  return useSuspenseQuery(Keys.recent(), getRecentHistories);
};
