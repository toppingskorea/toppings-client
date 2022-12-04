import { css, useTheme } from "@emotion/react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Flex, size, Spacing, Stack } from "@toss/emotion-utils";
import axios from "axios";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { Edit } from "~/assets/svgs/common";
import { Text } from "~/components/Common/Typo";
import { ImageCarousel, Info } from "~/components/Post";
import { env } from "~/constants";
import { useInternalRouter, useSetNavigation } from "~/hooks";
import { Keys, useFetchRestaurant } from "~/queries/restaurant";
import { usePostUploadSetter, useRestaurantSetter } from "~/recoil/atoms";
import { pick } from "~/utils";

const DEFAULT_CDN_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/4x3/";
const DEFAULT_CDN_SUFFIX = "svg";

const PostDetail = ({
  id
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { colors, weighs } = useTheme();
  const { data } = useFetchRestaurant(+id);

  // console.log(objectValues(countries).flat().find(country => country.name === data.));
  useSetNavigation({
    top: {
      title: (
        <Flex align="center">
          <Image
            src={`${DEFAULT_CDN_URL}kr.${DEFAULT_CDN_SUFFIX}`}
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

  const { push } = useInternalRouter();

  const setRestaurant = useRestaurantSetter();
  const setPostUpload = usePostUploadSetter();

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
    </section>
  );
};

export const getServerSideProps: GetServerSideProps<{
  id: string;
}> = async context => {
  const id = context.query.id as string;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(Keys.restaurant(+id), async () => {
    const { data } = await axios.get<{ data: Restaurant.DetailDTO }>(
      `${env.TOPPINGS_SERVER_URL}/restaurant/${id}`,
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
