import { getLikePercent } from "~/apis/restaurant";
import { useSuspendedQuery } from "~/hooks";
import Keys from "./keys";

const useFetchLikePercent = (id: number) => {
  return useSuspendedQuery(Keys.likePercent(id), () => getLikePercent({ id }));
};

export default useFetchLikePercent;
