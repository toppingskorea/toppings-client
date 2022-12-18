import { css, useTheme } from "@emotion/react";
import { Recent } from "@svgs/map";
import { flex, position } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { defaultScaleChangeVariants } from "~/constants";

const RecentButton = () => {
  const { colors } = useTheme();
  const { push } = useRouter();

  return (
    <motion.button
      type="button"
      initial="initial"
      animate="animate"
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
        z-index: 10;
      `}
    >
      <Recent />
    </motion.button>
  );
};

export default RecentButton;
