import { css, useTheme } from "@emotion/react";
import { Exit } from "@svgs/common";
import { SmallMarker } from "@svgs/map";
import { SmallExit } from "@svgs/recent";
import { Flex, padding, position, size, width100 } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { Badge, RestaurantCard } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import Map from "~/components/Map";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import { useSetNavigation } from "~/hooks";
import {
  useCurrentLocationSetter,
  useCurrentSelectCategory,
  useMapSearchByCountryReset,
  useMapSearchByCountryValue
} from "~/recoil/atoms";
import { useUploadRecentHistory } from "~/server/recent";
import { pick } from "~/utils";

const ViewListPage = () => {
  const { colors } = useTheme();
  const { push, back } = useRouter();
  const mapSearchValue = useMapSearchByCountryValue();
  const mapSearchReset = useMapSearchByCountryReset();
  const setCurrentLocation = useCurrentLocationSetter();
  const { mutate: uploadRecentHistoryMutate } = useUploadRecentHistory();
  const [currentSelectCategory, setCurrentSelectCategory] =
    useCurrentSelectCategory();

  useSetNavigation({
    top: {
      marginBottom: 85,
      right: {
        element: <Exit />,
        onClick: () => push("/map")
      }
    },
    bottom: true
  });

  const restaurantCardClickHandler = useCallback(
    (item: Restaurant.SearchByCountryDTO) => {
      setCurrentLocation({
        latitude: item.latitude,
        longitude: item.longitude
      });
      uploadRecentHistoryMutate({
        type: "Filter",
        keyword: item.name,
        category: "Name",
        content: item.address,
        restaurantId: item.id
      });
      setCurrentSelectCategory(item.name);
      mapSearchReset();

      push("/map");
    },
    [
      mapSearchReset,
      push,
      setCurrentLocation,
      setCurrentSelectCategory,
      uploadRecentHistoryMutate
    ]
  );

  return (
    <>
      <motion.div
        variants={defaultSlideFadeInVariants("right")}
        {...framerMocker}
        css={css`
          ${position("absolute", { top: 114, left: 0 })}
        `}
      >
        <Badge attach="left">Eating habit</Badge>
      </motion.div>
      <motion.div
        variants={defaultSlideFadeInVariants("right")}
        {...framerMocker}
        css={css`
          ${position("absolute", { top: 118, left: 147 })}
        `}
      >
        <Flex
          align="center"
          justify="space-between"
          css={css`
            ${size({
              width: 92,
              height: 27
            })}
            border-radius: 20px;
            border: 0.9px solid ${colors.secondary.B0};
            ${padding({
              x: 10,
              y: 6
            })};
          `}
        >
          <Text _fontSize={12}>{currentSelectCategory}</Text>
          <SmallExit />
        </Flex>
      </motion.div>

      <Flex
        direction="column"
        css={css`
          ${width100}
          height: 500px;
          overflow-y: scroll;
          gap: 10px;
          ${padding({
            x: 28
          })}
        `}
      >
        {mapSearchValue?.map(item => (
          <RestaurantCard
            key={item.id}
            whoLikes
            onClick={() => restaurantCardClickHandler(item)}
            item={{
              ...pick({ ...item }, [
                "id",
                "thumbnail",
                "type",
                "writer",
                "name",
                "address",
                "like",
                "likeCount",
                "filterLikeCount"
              ])
            }}
          />
        ))}
      </Flex>
      <Map.ViewStatusButton Icon={SmallMarker} text="View map" onClick={back} />
    </>
  );
};

export default ViewListPage;
