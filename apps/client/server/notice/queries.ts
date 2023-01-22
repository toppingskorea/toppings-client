import { useSuspenseInfiniteQuery } from "@suspensive/react-query";
import { getNotificationList } from "./apis";
import Keys from "./keys";

// eslint-disable-next-line import/prefer-default-export
export const useFetchNotificationList = () => {
  return useSuspenseInfiniteQuery(
    Keys.notifications(),
    ({ pageParam = 0 }) => getNotificationList(pageParam),
    {
      getNextPageParam: lastPages => lastPages.page
    }
  );
};
