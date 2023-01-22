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
import { KakaoMap } from "~/components/Kakao";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import { pick } from "~/utils";
import useViewList from "./viewList.hooks";

const ViewListPage = () => {
  const app = useViewList();

  return (
    <div>
      <motion.div
        variants={defaultSlideFadeInVariants("right")}
        {...framerMocker}
        css={css`
          ${position("absolute", { top: 114, left: 0 })}
        `}
      >
        <Badge
          attach="left"
          size={{
            width: 158,
            height: 35
          }}
        >
          {app.currentSelectCategory === "Habit"
            ? "Eating habit"
            : "Nationality"}
        </Badge>
      </motion.div>
      {app.currentSelectKeyword && (
        <motion.div
          onClick={app.exitClickHandler}
          variants={defaultSlideFadeInVariants("right")}
          {...framerMocker}
          css={css`
            ${position("absolute", { top: 118, left: 177 })}
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
      )}

      <Flex
        direction="column"
        css={css`
          ${width100}
          overflow-y: scroll;
          gap: 10px;
          ${padding({
            x: 27,
            y: 16
          })}
        `}
      >
        {app.searchByFiltering?.map(item => (
          <RestaurantCard
            key={item.id}
            whoLikes={item.filterLikeCount !== undefined}
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
      <KakaoMap.ViewStatusButton
        Icon={SmallMarker}
        text="View map"
        onClick={app.back}
      />
    </div>
  );
};

export default ViewListPage;
