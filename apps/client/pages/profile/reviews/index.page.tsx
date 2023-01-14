import { css } from "@emotion/react";
import { Suspense } from "@suspensive/react";
import { padding, Stack } from "@toss/emotion-utils";
import { HorizontalPostList } from "~/components/Profile/posts";
import Skeleton from "~/components/Skeleton";
import { useSetNavigation } from "~/hooks";
import { useFetchReviewedRestaurant } from "~/server/profile";
import { generateComponent } from "~/utils";

const ProfileReviews = () => {
  useSetNavigation({
    top: {},
    bottom: true
  });

  return (
    <section
      css={css`
        ${padding({ x: 16 })}
      `}
    >
      <Suspense.CSROnly
        fallback={
          <Stack.Vertical>
            {generateComponent(
              <Skeleton.Box
                size={{
                  width: "100%",
                  height: 100
                }}
              />,
              4
            )}
          </Stack.Vertical>
        }
      >
        <HorizontalPostList query={useFetchReviewedRestaurant} />
      </Suspense.CSROnly>
    </section>
  );
};

export default ProfileReviews;
