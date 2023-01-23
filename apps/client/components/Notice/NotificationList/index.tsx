/* eslint-disable react/no-array-index-key */
import { Stack } from "@toss/emotion-utils";
import Skeleton from "~/components/Skeleton";
import { InfiniteScrollSensor } from "~/components/Util";
import { useWebSocket } from "~/hooks";
import { useFetchNotificationList } from "~/server/notice";
import { useFetchUserInfo } from "~/server/profile";
import { lastItem } from "~/utils/common/lastItem";
import NotificationItem from "./NotificationItem";

const NotificationList = () => {
  const {
    data: notificationList,
    fetchNextPage: fetchNotificationListNextPage,
    refetch
  } = useFetchNotificationList();

  const { data: profile } = useFetchUserInfo();

  useWebSocket(
    {
      destination: `/sub/${profile?.id}`,
      callback: () => {
        refetch();
      }
    },
    true
  );

  return (
    <Stack.Vertical as="ul" gutter={12}>
      {notificationList.pages.map(notification =>
        notification.items.map((notification, index) => (
          <NotificationItem key={index} {...notification} />
        ))
      )}
      {lastItem(notificationList.pages)?.page !==
        lastItem(notificationList.pages)?.totalPage && (
        <InfiniteScrollSensor
          onIntersected={() => {
            fetchNotificationListNextPage();
          }}
          render={ref => (
            <Skeleton.Box
              ref={ref}
              size={{
                width: "100%",
                height: 150
              }}
            />
          )}
        />
      )}
    </Stack.Vertical>
  );
};

export default NotificationList;
