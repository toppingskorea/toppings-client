import { getRecentHistory } from "~/apis/recent";
import { useSuspendedQuery } from "~/hooks";
import Keys from "./keys";

const useFetchRecentHistory = () => {
  // Suspense 로 감싸주지 못하므로, 단언을 해줍니다.
  return useSuspendedQuery(Keys.recent(), getRecentHistory);
};

export default useFetchRecentHistory;
