import { css, useTheme } from "@emotion/react";
import { CurrentPlace } from "@svgs/map";
import { flex, position } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { defaultScaleChangeVariants, framerMocker } from "~/constants";
import useCurrentLocation from "./Buttons.hooks";

const CurrentLocationButton = () => {
  const { colors, zIndex } = useTheme();
  const { getCurrentMapPosition } = useCurrentLocation();

  return (
    <motion.button
      type="button"
      onClick={getCurrentMapPosition}
      {...framerMocker}
      variants={defaultScaleChangeVariants}
      css={css`
        ${flex("center")}
        ${position("absolute", {
          bottom: 16,
          left: 17
        })}
        padding: 8px;
        border-radius: 8px;
        background-color: ${colors.primary};
        z-index: ${zIndex.two};
      `}
    >
      <CurrentPlace />
    </motion.button>
  );
};

export default CurrentLocationButton;
