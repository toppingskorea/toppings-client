import { css } from "@emotion/react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { size, Spacing, Stack } from "@toss/emotion-utils";
import axios from "axios";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Badge } from "~/components/Common";
import { ImageCarousel, Info, Likes, Reviews } from "~/components/Post";
import { env } from "~/constants";
import { getLikePercent, Keys as RestaurantKeys } from "~/server/restaurant";
import { Keys as ReviewKeys } from "~/server/review";
import { pick } from "~/utils";
import usePost from "./post.hooks";

const PostDetail = ({
  id
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const app = usePost(id);

  return (
    <section>
      <Stack.Vertical
        align="center"
        gutter={0}
        css={css`
          ${size({ width: 364 })}
          margin:0 auto;
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
            "likeCount"
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
        "아직없네요!! 좋아요 눌러요!!"
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
      {app.reviews.length ? <Reviews id={id} /> : "첫리뷰를 남겨봐요!!"}
    </section>
  );
};

export const getServerSideProps: GetServerSideProps<{
  id: string;
}> = async context => {
  const id = context.query.id as string;

  // 사용자의 좋아요 & 스크랩을 확인해야하므로 쿠키를 통한 데이터 패칭
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(RestaurantKeys.restaurant(+id), async () => {
    const { data } = await axios.get<{ data: Restaurant.DetailDTO }>(
      `${env.TOPPINGS_SERVER_URL}/api/v1/restaurant/${id}`,
      {
        headers: {
          Authorization: `Bearer ${context.req.cookies[env.TOPPINGS_TOKEN_KEY]}`
        }
      }
    );

    return data.data;
  });

  await queryClient.prefetchQuery(RestaurantKeys.likePercent(+id), () =>
    getLikePercent({ id: +id, ssr: true })
  );

  await queryClient.prefetchQuery(ReviewKeys.reviews(+id), async () => {
    const { data } = await axios.get<{ data: Restaurant.ReviewDTO[] }>(
      `${env.TOPPINGS_SERVER_URL}/api/v1/restaurant/${id}/review`,
      {
        headers: {
          Authorization: `Bearer ${context.req.cookies[env.TOPPINGS_TOKEN_KEY]}`
        }
      }
    );

    return data.data;
  });

  return {
    props: {
      id,
      dehydratedState: dehydrate(queryClient)
    }
  };
};

export default PostDetail;
