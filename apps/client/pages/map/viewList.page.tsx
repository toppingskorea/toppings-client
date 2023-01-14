import { css } from "@emotion/react";
import { SmallMarker } from "@svgs/map";
import { SmallExit } from "@svgs/recent";
import {
  Flex,
  padding,
  position,
  size,
  touchable,
  width100
} from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { Badge, RestaurantCard } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import Map from "~/components/Map";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import { pick } from "~/utils";
import useViewList from "./viewList.hooks";

const ViewListPage = () => {
  const app = useViewList();

  return (
    <>
      <motion.div
        variants={defaultSlideFadeInVariants("right")}
        {...framerMocker}
        css={css`
          ${position("absolute", { top: 114, left: 0 })}
        `}
      >
        <Badge attach="left">
          {app.currentSelectCategory === "Habit"
            ? "Eating habit"
            : "Nationality"}
        </Badge>
      </motion.div>
      <motion.div
        onClick={app.ExitClickHandler}
        variants={defaultSlideFadeInVariants("right")}
        {...framerMocker}
        css={css`
          ${position("absolute", { top: 118, left: 147 })}
          ${touchable}
          z-index: ${app.zIndex.four};
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
            border: 0.9px solid ${app.colors.secondary.B0};
            ${padding({
              x: 10,
              y: 6
            })};
          `}
        >
          <Text _fontSize={12}>{app.currentSelectKeyword}</Text>
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
        {app.mapSearchValue?.map(item => (
          <RestaurantCard
            key={item.id}
            whoLikes
            onClick={() => app.restaurantCardClickHandler(item)}
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
      <Map.ViewStatusButton
        Icon={SmallMarker}
        text="View map"
        onClick={app.back}
      />
    </>
  );
};

export default ViewListPage;
