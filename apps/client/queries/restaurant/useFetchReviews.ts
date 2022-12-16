import { getReviews } from "~/apis/restaurant";
import { useSuspendedQuery } from "~/hooks";
import Keys from "./keys";

const useFetchReviews = (id: number) => {
  return useSuspendedQuery(Keys.reviews(id), () => getReviews({ id }));
};

export default useFetchReviews;
