import { css, useTheme } from "@emotion/react";
import { Edit } from "@svgs/common";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Flex, size, Spacing, Stack } from "@toss/emotion-utils";
import axios from "axios";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { getLikePercent, getReviews } from "~/apis/restaurant";
import { Badge } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { ImageCarousel, Info, Likes, Reviews } from "~/components/Post";
import { env } from "~/constants";
import { useInternalRouter, useSetNavigation } from "~/hooks";
import { Keys, useFetchRestaurant } from "~/queries/restaurant";
import { usePostUploadSetter, useRestaurantSetter } from "~/recoil/atoms";
import { pick } from "~/utils";
import { countryToSvg } from "~/utils/country";

const PostDetail = ({
  id
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { colors, weighs } = useTheme();
  const { data } = useFetchRestaurant(+id);

  const setRestaurant = useRestaurantSetter();
  const setPostUpload = usePostUploadSetter();
  const { push } = useInternalRouter();

  useSetNavigation({
    top: {
      title: (
        <Flex align="center">
          <Image
            src={countryToSvg(data.country)}
            width={24}
            height={24}
            alt={`${data.writer}'s country flag`}
          />
          <Spacing direction="horizontal" size={14} />
          <Text
            _fontSize={20}
            _color={colors.secondary[69]}
            weight={weighs.medium}
          >
            {data.writer}
          </Text>
        </Flex>
      ),
      right: (
        <button
          type="button"
          onClick={() => {
            setRestaurant({
              address_name: data.address,
              id,
              category_group_name: "",
              place_name: data.name,
              road_address_name: data.address,
              x: String(data.longitude),
              y: String(data.latitude)
            });

            setPostUpload({
              description: data.description,
              images: data.images,
              type: data.type,
              id: data.id
            });

            push("/post/add");
          }}
        >
          <Edit />
        </button>
      )
    },
    bottom: true
  });

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
        <ImageCarousel images={data.images} />
        <Spacing size={18} />
        <Info
          {...pick({ ...data }, [
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
      <Spacing size={20} />
      <Reviews id={id} />
    </section>
  );
};

export const getServerSideProps: GetServerSideProps<{
  id: string;
}> = async context => {
  const id = context.query.id as string;

  // 사용자의 좋아요 & 스크랩을 확인해야하므로 쿠키를 통한 데이터 패칭
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(Keys.restaurant(+id), async () => {
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

  await queryClient.prefetchQuery(Keys.likePercent(+id), () =>
    getLikePercent({ id: +id, ssr: true })
  );

  await queryClient.prefetchQuery(Keys.reviews(+id), () =>
    getReviews({ id: +id, ssr: true })
  );

  return {
    props: {
      id,
      dehydratedState: dehydrate(queryClient)
    }
  };
};

export default PostDetail;
