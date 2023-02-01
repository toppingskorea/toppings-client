import { Suspense } from "@suspensive/react";
import { Flex, Stack } from "@toss/emotion-utils";
import Skeleton from "~/components/Skeleton";
import { OpenGraph } from "~/components/Util";
import { useSetNavigation } from "~/hooks";
import { generateComponent } from "~/utils";
import PostList from "./PostList";
import UserBadge from "./UserBadge";

const ProfilePostsPage = () => {
  useSetNavigation({
    top: {
      title: (
        <Suspense.CSROnly
          fallback={
            <Flex.Center>
              <Skeleton.Box
                size={{
                  width: 150,
                  height: 40
                }}
              />
            </Flex.Center>
          }
        >
          <UserBadge />
        </Suspense.CSROnly>
      )
    },
    bottom: true
  });

  return (
    <section>
      <OpenGraph title="Posts" />
      <Suspense.CSROnly
        fallback={
          <Flex.Center>
            <Stack.Vertical>
              {generateComponent(
                <Skeleton.Box
                  size={{
                    width: 366,
                    height: 156
                  }}
                />,
                2
              )}
            </Stack.Vertical>
          </Flex.Center>
        }
      >
        <PostList />
      </Suspense.CSROnly>
    </section>
  );
};

export default ProfilePostsPage;
