import { css } from "@emotion/react";
import { Suspense } from "@suspensive/react";
import { Spacing, Stack } from "@toss/emotion-utils";
import { Badge } from "~/components/Common";
import ImageCarouselWrapper from "./ImageCarouselWrapper";
import Info from "./Info";
import Likes from "./Likes";
import NavigationSetter from "./NavigationSetter";
import ReviewLeadingSection from "./ReviewLeadingSection";
import Reviews from "./Reviews";

const PostDetailPage = ({ id }: { id: string }) => {
  return (
    <section>
      <NavigationSetter />
      <Stack.Vertical
        align="center"
        gutter={0}
        css={css`
          margin: 0 13px;
        `}
      >
        <ImageCarouselWrapper />
        <Spacing size={18} />

        <Info />
      </Stack.Vertical>
      <Spacing size={20} />

      <Badge
        attach="left"
        size={{
          width: 160,
          height: 34
        }}
      >
        Likes
      </Badge>
      <Spacing size={20} />

      <Likes id={id} />

      <Spacing size={30} />

      <Badge
        attach="left"
        size={{
          width: 160,
          height: 34
        }}
      >
        Reviews
      </Badge>
      <Spacing size={36} />
      <ReviewLeadingSection />
      <Spacing size={40} />
      <Suspense.CSROnly>
        <Reviews id={id} />
      </Suspense.CSROnly>
    </section>
  );
};

export default PostDetailPage;
