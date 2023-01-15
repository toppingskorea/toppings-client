import { css } from "@emotion/react";
import { Suspense } from "@suspensive/react";
import { Flex, Spacing, Stack } from "@toss/emotion-utils";
import { PostList, UserBadge } from "~/components/Profile/posts";
import Skeleton from "~/components/Skeleton";
import { useSetNavigation } from "~/hooks";
import { generateComponent } from "~/utils";

const ProfilePosts = () => {
  useSetNavigation({
    bottom: true
  });

  return (
    <section>
      <Suspense.CSROnly
        fallback={
          <Flex.Center
            css={css`
              padding-top: 60px;
            `}
          >
            <Skeleton.Box
              size={{
                width: 140,
                height: 50
              }}
            />
          </Flex.Center>
        }
      >
        <UserBadge />
      </Suspense.CSROnly>
      <Spacing size={30} />

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
