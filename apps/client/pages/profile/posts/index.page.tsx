import { Suspense } from "@suspensive/react";
import { Flex, Stack } from "@toss/emotion-utils";
import { PostList, UserBadge } from "~/components/Profile/posts";
import Skeleton from "~/components/Skeleton";
import { useSetNavigation } from "~/hooks";
import { generateComponent } from "~/utils";

const ProfilePosts = () => {
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
      <Suspense.CSROnly
        fallback={
          <Flex.Center>
            <Stack.Vertical>
              {generateComponent(
                <Skeleton.Box
                  size={{
                    width: 344,
                    height: 174
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

export default ProfilePosts;
