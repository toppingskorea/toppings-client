import { css } from "@emotion/react";
import { SmallMarker } from "@svgs/map";
import { SmallExit } from "@svgs/recent";
import { pick } from "@toppings/utils";
import {
  Flex,
  gutter,
  margin,
  padding,
  position,
  size,
  touchable,
  width100
} from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { memo } from "react";
import { Badge, RestaurantCard } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { KakaoMap } from "~/components/Kakao";
import { EmptyView } from "~/components/Layout";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import useViewList from "./ViewListPage.hooks";

const ViewListPage = () => {
  const app = useViewList();

  if (!app.searchByFiltering || app.searchByFiltering.length === 0)
    return <EmptyView content="No posts." />;

  return (
    <div>
      {app.currentSelectKeyword && (
        <>
          <motion.div
            variants={defaultSlideFadeInVariants("right")}
            {...framerMocker}
            css={css`
              ${position("absolute", { top: 108, left: 0 })}
            `}
          >
            <Badge
              paddingLeft={25}
              attach="left"
              _fontSize={20}
              size={{
                width: 172,
                height: 35
              }}
            >
              {app.currentSelectCategory === "Habit"
                ? "Eating habit"
                : "Nationality"}
            </Badge>
          </motion.div>

          <motion.div
            onClick={app.exitClickHandler}
            variants={defaultSlideFadeInVariants("right")}
            {...framerMocker}
            css={css`
              ${position("absolute", { top: 112, left: 179 })}
              ${touchable}
          z-index: ${app.zIndex.four};
            `}
          >
            <Flex
              align="center"
              justify="space-between"
              css={css`
                ${size({
                  height: 27
                })}
                border-radius: 20px;
                border: 0.9px solid ${app.colors.secondary.B0};
                ${gutter("horizontal", 13)}
                ${padding({
                  x: 10,
                  y: 6
                })};
              `}
            >
              <Text _fontSize={12} _color={app.colors.secondary[69]}>
                {app.currentSelectKeyword}
              </Text>
              <SmallExit />
            </Flex>
          </motion.div>
        </>
      )}

      <Flex
        direction="column"
        css={css`
          ${width100}
          overflow-y: scroll;
          gap: 10px;
          ${padding({
            x: 27
          })}
          ${margin({
            y: 67
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

export default memo(ViewListPage);
