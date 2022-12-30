import { css, useTheme } from "@emotion/react";
import { Recent } from "@svgs/map";
import { flex, position } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { defaultScaleChangeVariants, framerMocker } from "~/constants";
import { useMapBoundsValue, useMapSearchByCountrySetter } from "~/recoil/atoms";
import { useFetchDefaultMap } from "~/server/recent";

const RecentButton = () => {
  const { colors, zIndex } = useTheme();
  const setMapSearchByCountry = useMapSearchByCountrySetter();
  const mapBounds = useMapBoundsValue();
  const { mutate: defaultMap } = useFetchDefaultMap({
    onSuccess: data => {
      setMapSearchByCountry(data);
    }
  });

  const clickHandler = () => {
    if (mapBounds) defaultMap(mapBounds);
  };

  return (
    <motion.button
      type="button"
      {...framerMocker}
      whileHover="whileHover"
      variants={defaultScaleChangeVariants}
      onClick={clickHandler}
      css={css`
        ${position("absolute", {
          top: 52,
          left: 17
        })}
        ${flex("center")}
        padding: 8px;
        border-radius: 8px;
        background-color: ${colors.primary};
        z-index: ${zIndex.two};
      `}
    >
      <Recent />
    </motion.button>
  );
};

export default RecentButton;
