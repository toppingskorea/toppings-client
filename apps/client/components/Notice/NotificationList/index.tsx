/* eslint-disable react/no-array-index-key */
import { css } from "@emotion/react";
import { Stack } from "@toss/emotion-utils";
import Skeleton from "~/components/Skeleton";
import { InfiniteScrollSensor } from "~/components/Util";
import { useWebSocket } from "~/hooks";
import { useFetchNotificationList } from "~/server/notice";
import { useFetchUserInfo } from "~/server/profile";
import { lastItem } from "~/utils/common/lastItem";

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
    <Stack.Vertical>
      {notificationList.pages.map(notification =>
        notification.items.map((notification, index) => (
          <div
            key={index}
            css={css`
              // 임시 높이 (디자인이 안나옴)
              height: 100px;
            `}
          >
            {notification.content}
          </div>
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
