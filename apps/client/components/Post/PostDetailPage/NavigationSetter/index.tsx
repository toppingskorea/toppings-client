import { useTheme } from "@emotion/react";
import { Flex, Spacing } from "@toss/emotion-utils";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { Edit } from "~/assets/svgs/common";
import { CircleCountry } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { useSetNavigation } from "~/hooks";
import { usePostUploadSetter, useRestaurantSetter } from "~/recoil/atoms";
import { useFetchRestaurant } from "~/server/restaurant";

const NavigationSetter = () => {
  const { colors, weighs } = useTheme();
  const { query, push } = useRouter();

  const { data: restaurantDetail } = useFetchRestaurant(Number(query.id));

  const setRestaurant = useRestaurantSetter();
  const setPostUpload = usePostUploadSetter();

  const goEditPostHandler = useCallback(() => {
    setRestaurant({
      address_name: restaurantDetail.address,
      id: String(query.id),
      category_group_name: "",
      place_name: restaurantDetail.name,
      road_address_name: restaurantDetail.address,
      x: String(restaurantDetail.longitude),
      y: String(restaurantDetail.latitude)
    });

    setPostUpload({
      description: restaurantDetail.description,
      images: restaurantDetail.images,
      type: restaurantDetail.type,
      id: restaurantDetail.id
    });

    push("/post/add");
  }, [
    push,
    query.id,
    restaurantDetail.address,
    restaurantDetail.description,
    restaurantDetail.id,
    restaurantDetail.images,
    restaurantDetail.latitude,
    restaurantDetail.longitude,
    restaurantDetail.name,
    restaurantDetail.type,
    setPostUpload,
    setRestaurant
  ]);

  useSetNavigation({
    top: {
      title: (
        <Flex align="center">
          <CircleCountry
            padding={7}
            size={18}
            country={restaurantDetail.country}
            isShadow
          />
          <Spacing direction="horizontal" size={14} />
          <Text
            _fontSize={20}
            _color={colors.secondary[69]}
            weight={weighs.medium}
          >
            {restaurantDetail.writer}
          </Text>
        </Flex>
      ),
      right: restaurantDetail.mine
        ? {
            element: <Edit />,
            onClick: goEditPostHandler
          }
        : undefined
    },
    bottom: true
  });

  return null;
};

export default NavigationSetter;