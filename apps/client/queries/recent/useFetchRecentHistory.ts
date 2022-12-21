import { getRecentHistory } from "~/apis/recent";
import { useSuspendedQuery } from "~/hooks";
import Keys from "./keys";

const useFetchRecentHistory = () => {
  return useSuspendedQuery(Keys.recent(), getRecentHistory);
};

export default useFetchRecentHistory;
