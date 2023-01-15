import { usePostUploadSetter, useRestaurantSetter } from "@atoms/index";
import { useTheme } from "@emotion/react";
import { Edit } from "@svgs/common";
import { Flex, Spacing } from "@toss/emotion-utils";
import Image from "next/image";
import { useCallback } from "react";
import { Text } from "~/components/Common/Typo";
import { useInternalRouter, useSetNavigation } from "~/hooks";
import { useFetchLikePercent, useFetchRestaurant } from "~/server/restaurant";
import { useFetchReviews } from "~/server/review";
import { countryToSvg } from "~/utils";

const usePost = (id: string) => {
  const { colors, weighs } = useTheme();
  const { push } = useInternalRouter();
  const { data: restaurantDetail } = useFetchRestaurant(+id);
  const { data: likePercent } = useFetchLikePercent(+id);
  const { data: reviews } = useFetchReviews(+id);

  const setRestaurant = useRestaurantSetter();
  const setPostUpload = usePostUploadSetter();

  const goEditPostHandler = useCallback(() => {
    setRestaurant({
      address_name: restaurantDetail.address,
      id,
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
    id,
    push,
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
          <Image
            src={countryToSvg(restaurantDetail.country)}
            width={24}
            height={24}
            alt={`${restaurantDetail.writer}'s country flag`}
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
      right: {
        element: <Edit />,
        onClick: goEditPostHandler
      }
    },
    bottom: true
  });

  return {
    restaurantDetail,
    likePercent,
    reviews
  };
};

export default usePost;
