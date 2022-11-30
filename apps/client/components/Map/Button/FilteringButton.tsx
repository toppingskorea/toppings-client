import { css, useTheme } from "@emotion/react";
import { Filtering } from "@svgs/map";
import { position } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { defaultScaleChangeVariants } from "~/constants";

const FilteringButton = () => {
  const { colors } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={() => console.log("하이")}
      initial="initial"
      animate="animate"
      whileHover="whileHover"
      variants={defaultScaleChangeVariants}
      css={css`
        ${position("absolute", {
          top: 52,
          right: 17
        })}
        padding: 8px;
        border-radius: 8px;
        background-color: ${colors.primary};
        z-index: 10;
      `}
    >
      <Filtering />
    </motion.button>
  );
};

export default FilteringButton;
