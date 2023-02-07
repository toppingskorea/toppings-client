import { css } from "@emotion/react";
import { Suspense } from "@suspensive/react";
import { Flex, Spacing, Stack, width100 } from "@toss/emotion-utils";
import { Badge } from "~/components/Common";
import Skeleton from "~/components/Skeleton";
import ImageCarouselWrapper from "./ImageCarouselWrapper";
import Info from "./Info";
import Likes from "./Likes";
import NavigationSetter from "./NavigationSetter";
import ReviewLeadingSection from "./ReviewLeadingSection";
import Reviews from "./Reviews";

const PostDetailPage = ({ id }: { id: string }) => {
  return (
    <section>
      <Suspense.CSROnly
        fallback={
          <>
            <Skeleton.Box
              size={{
                width: "100%",
                height: 84
              }}
            />
            <Spacing size={20} />
          </>
        }
      >
        <NavigationSetter />
      </Suspense.CSROnly>
      <Stack.Vertical
        align="center"
        gutter={0}
        css={css`
          margin: 0 13px;
        `}
      >
        <Suspense.CSROnly
          fallback={
            <Flex.Center>
              <Skeleton.Box size={{ width: 364, height: 364 }} />
            </Flex.Center>
          }
        >
          <ImageCarouselWrapper />
        </Suspense.CSROnly>
        <Spacing size={18} />

        <Suspense.CSROnly
          fallback={
            <div
              css={css`
                ${width100}
                margin-top: 100px;
              `}
            >
              <Skeleton.Paragraph line={6} />
            </div>
          }
        >
          <Info />
        </Suspense.CSROnly>
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

      <Suspense.CSROnly>
        <Likes id={id} />
      </Suspense.CSROnly>

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
