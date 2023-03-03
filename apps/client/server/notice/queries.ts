import { useSuspenseInfiniteQuery } from "@suspensive/react-query";
import { getNotificationList, Keys } from ".";

export const useFetchNotificationList = () => {
  return useSuspenseInfiniteQuery(
    Keys.notifications(),
    ({ pageParam = 0 }) => getNotificationList(pageParam),
    {
      getNextPageParam: lastPages => lastPages.page
    }
  );
};
