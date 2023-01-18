import { css, useTheme } from "@emotion/react";
import { Suspense } from "@suspensive/react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { padding, Stack } from "@toss/emotion-utils";
import axios from "axios";
import type { GetServerSideProps } from "next";
import { Text } from "~/components/Common/Typo";
import {
  DescriptionBox,
  ImageCarouselWrapper,
  UserInfoRow
} from "~/components/Review/detail";
import Skeleton from "~/components/Skeleton";
import { env } from "~/constants";
import { useSetNavigation } from "~/hooks";
import { Keys } from "~/server/review";

const ReviewDetail = () => {
  const { weighs, colors } = useTheme();
  useSetNavigation({
    top: {
      title: (
        <Text
          _fontSize={18}
          weight={weighs.semiBold}
          _color={colors.secondary[47]}
        >
          호호식당
        </Text>
      )
    },
    bottom: true
  });

  return (
    <Stack.Vertical
      css={css`
        ${padding({ x: 13 })}
      `}
    >
      <Suspense.CSROnly
        fallback={
          <Skeleton.Box
            size={{
              width: 340,
              height: 340
            }}
          />
        }
      >
        <ImageCarouselWrapper />
      </Suspense.CSROnly>
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
      `${env.TOPPINGS_SERVER_URL}/api/v1/review/${id}`
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
