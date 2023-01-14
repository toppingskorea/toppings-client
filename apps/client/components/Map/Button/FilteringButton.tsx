import {
  useCurrentSelectKeywordReset,
  useCurrentSelectKeywordValue,
  useMapBoundsValue,
  useMapSearchByFilteringReset,
  useMapSearchByFilteringSetter
} from "@atoms/index";
import { css, useTheme } from "@emotion/react";
import { Filtering } from "@svgs/map";
import { Exit } from "@svgs/recent";
import {
  flex,
  Flex,
  gutter,
  padding,
  position,
  touchable
} from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Text } from "~/components/Common/Typo";
import { defaultScaleChangeVariants, framerMocker } from "~/constants";
import { useFetchDefaultMap } from "~/server/recent";

const FilteringButton = () => {
  const { colors, zIndex } = useTheme();
  const { push } = useRouter();
  const currentSelectKeywordReset = useCurrentSelectKeywordReset();
  const currentSelectKeyword = useCurrentSelectKeywordValue();
  const resetMapSearchByCountry = useMapSearchByFilteringReset();
  const setMapSearchByCountry = useMapSearchByFilteringSetter();
  const mapBounds = useMapBoundsValue();
  const { mutate: defaultMapMutate } = useFetchDefaultMap({
    onSuccess: data => {
      setMapSearchByCountry(data);
    }
  });

  return (
    <Flex.Center
      direction="row"
      css={css`
        ${position("absolute", {
          top: 52,
          right: 17
        })}

        ${gutter("horizontal", 8)}
        z-index: ${zIndex.two};
      `}
    >
      {currentSelectKeyword && (
        <Flex.Center
          css={css`
            ${padding({
              x: 12,
              y: 7
            })}
            ${gutter("horizontal", 17)}
            ${touchable}
            border-radius: 20px;
            background-color: ${colors.dim.orange};
          `}
        >
          <Text _fontSize={17} _color={colors.white}>
            {currentSelectKeyword}
          </Text>
          <Exit
            onClick={() => {
              currentSelectKeywordReset();
              defaultMapMutate(mapBounds!);
              resetMapSearchByCountry();
            }}
          />
        </Flex.Center>
      )}

      <motion.button
        type="button"
        {...framerMocker}
        variants={defaultScaleChangeVariants}
        onClick={() => push("/recent")}
        css={css`
          ${flex("center")}
          padding: 8px;
          border-radius: 8px;
          background-color: ${colors.primary};
          z-index: ${zIndex.two};
        `}
      >
        <Filtering />
      </motion.button>
    </Flex.Center>
  );
};

export default FilteringButton;
