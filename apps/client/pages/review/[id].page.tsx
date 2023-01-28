import { css } from "@emotion/react";
import { Suspense } from "@suspensive/react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { padding, Stack } from "@toss/emotion-utils";
import axios from "axios";
import type { GetServerSideProps } from "next";
import {
  DescriptionBox,
  ImageCarouselWrapper,
  NavigationSetter,
  UserInfoRow
} from "~/components/Review/detail";
import Skeleton from "~/components/Skeleton";
import { env } from "~/constants";
import { Keys } from "~/server/review";

const ReviewDetail = () => {
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

export default ReviewDetail;

export const getServerSideProps: GetServerSideProps<{
  id: string;
}> = async context => {
  const id = context.query.id as string;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(Keys.review(+id), async () => {
    const { data } = await axios.get<{ data: Restaurant.ReviewDTO }>(
      `${env.TOPPINGS_SERVER_URL}/api/v1/review/${id}`,
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
