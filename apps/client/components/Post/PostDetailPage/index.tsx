import { css } from "@emotion/react";
import { Suspense } from "@suspensive/react";
import { Spacing, Stack } from "@toss/emotion-utils";
import { Badge, ImageCarousel } from "~/components/Common";
import { pick } from "~/utils";
import Info from "./Info";
import Likes from "./Likes";
import usePostDetail from "./PostDetailPage.hooks";
import EmptyText from "./PostDetailPage.styles";
import ReviewLeadingSection from "./ReviewLeadingSection";
import Reviews from "./Reviews";

const PostDetailPage = ({ id }: { id: string }) => {
  const app = usePostDetail(id);

  return (
    <section>
      <Stack.Vertical
        align="center"
        gutter={0}
        css={css`
          margin: 0 13px;
        `}
      >
        <ImageCarousel images={app.restaurantDetail.images} />
        <Spacing size={18} />
        <Info
          {...pick({ ...app.restaurantDetail }, [
            "id",
            "name",
            "address",
            "description",
            "type",
            "scrap",
            "like",
            "likeCount",
            "images"
          ])}
        />
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
      {!app.likePercent.countryPercent.length &&
      !app.likePercent.habitPercent.length ? (
        <EmptyText />
      ) : (
        <Likes id={id} />
      )}

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
      <Spacing size={20} />
      <ReviewLeadingSection />
      <Spacing size={40} />
      <Suspense.CSROnly>
        <Reviews id={id} />
      </Suspense.CSROnly>
    </section>
  );
};

export default PostDetailPage;
