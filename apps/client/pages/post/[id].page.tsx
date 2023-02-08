import { dehydrate, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { GetServerSideProps } from "next";
import { PostDetailPage } from "~/components/Post";
import { env } from "~/constants";
import { Keys as RestaurantKeys } from "~/server/restaurant";

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
          Authorization: `Bearer ${
            context.req.cookies[env.TOPPINGS_TOKEN_KEY]
          }`,
          Referer: env.TOPPINGS_CLIENT_URL
        }
      }
    );

    return data.data;
  });

  await queryClient.prefetchQuery(RestaurantKeys.likePercent(+id), async () => {
    const { data } = await axios.get<{ data: Restaurant.LikePercentDTO }>(
      `${env.TOPPINGS_SERVER_URL}/api/v1/restaurant/${id}/like`,
      {
        headers: {
          Authorization: `Bearer ${
            context.req.cookies[env.TOPPINGS_TOKEN_KEY]
          }`,
          Referer: env.TOPPINGS_CLIENT_URL
        }
      }
    );

    return data.data;
  });

  // 추후 SEO를 위해 남겨둠, SSR & Pagination
  // await queryClient.prefetchQuery(ReviewKeys.reviews(+id), async () => {
  //   const { data } = await axios.get<{ data: Restaurant.ReviewDTO[] }>(
  //     `${env.TOPPINGS_SERVER_URL}/api/v1/restaurant/${id}/review`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${context.req.cookies[env.TOPPINGS_TOKEN_KEY]}`
  //       }
  //     }
  //   );

  //   return data.data;
  // });

  return {
    props: {
      id,
      dehydratedState: dehydrate(queryClient)
    }
  };
};

export default PostDetailPage;
