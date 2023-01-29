import { css } from "@emotion/react";
import { Suspense } from "@suspensive/react";
import { padding, Stack } from "@toss/emotion-utils";
import Skeleton from "~/components/Skeleton";
import DescriptionBox from "./DescriptionBox";
import ImageCarouselWrapper from "./ImageCarouselWrapper";
import NavigationSetter from "./NavigationSetter";
import UserInfoRow from "./UserInfoRow";

const ReviewDetailPage = () => {
  return (
    <Stack.Vertical
      css={css`
        ${padding({ x: 13 })}
      `}
    >
      <Suspense.CSROnly>
        <NavigationSetter />
      </Suspense.CSROnly>

      <ImageCarouselWrapper />
      <Suspense.CSROnly
        fallback={
          <Skeleton.Box
            size={{
              width: 340,
              height: 40
            }}
          />
        }
      >
        <UserInfoRow />
      </Suspense.CSROnly>

      <Suspense.CSROnly fallback={<Skeleton.Paragraph />}>
        <DescriptionBox />
      </Suspense.CSROnly>
    </Stack.Vertical>
  );
};

export default ReviewDetailPage;
