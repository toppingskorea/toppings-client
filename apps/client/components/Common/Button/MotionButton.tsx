import { css } from "@emotion/react";
import { touchable } from "@toss/emotion-utils";
import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";

type Props = HTMLMotionProps<"button">;

const MotionButton = ({ children, ...rest }: Props) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      css={css`
        ${touchable}
      `}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

export default MotionButton;
