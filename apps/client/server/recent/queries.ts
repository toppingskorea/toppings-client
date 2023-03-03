import { useSuspenseInfiniteQuery } from "@suspensive/react-query";
import { getRecentHistories, Keys } from ".";

export const useFetchRecentHistories = () => {
  return useSuspenseInfiniteQuery(
    Keys.recent(),
    ({ pageParam }) => getRecentHistories(pageParam),
    {
      getNextPageParam: lastPages => lastPages.page
    }
  );
};
