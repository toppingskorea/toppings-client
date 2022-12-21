import { css, useTheme } from "@emotion/react";
import { Recent } from "@svgs/map";
import { flex, position } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { defaultScaleChangeVariants, framerMocker } from "~/constants";

const RecentButton = () => {
  const { colors, zIndex } = useTheme();

  return (
    <motion.button
      type="button"
      {...framerMocker}
      whileHover="whileHover"
      variants={defaultScaleChangeVariants}
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
