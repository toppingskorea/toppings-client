/* eslint-disable react/no-array-index-key */
import { Skeleton } from "@toppings/components";
import { lastItem } from "@toppings/utils";
import { Stack } from "@toss/emotion-utils";
import { EmptyView } from "~/components/Layout";
import { InfiniteScrollSensor } from "~/components/Util";
import { useFetchNotificationList } from "~/server/notice";
import NotificationItem from "./NotificationItem";

const NotificationList = () => {
  const {
    data: notificationList,
    fetchNextPage: fetchNotificationListNextPage
  } = useFetchNotificationList();

  // const { data: profile } = useFetchUserInfo();

  // useWebSocket(
  //   {
  //     destination: `/sub/${profile?.id}`,
  //     callback: () => {
  //       refetch();
  //     }
  //   },
  //   true
  // );

  if (notificationList.pages[0].items.length === 0) {
    return <EmptyView content="No notice" />;
  }

  return (
    <Stack.Vertical as="ul" gutter={9}>
      {notificationList.pages.map(page =>
        page.items.map((notification, index) => (
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
