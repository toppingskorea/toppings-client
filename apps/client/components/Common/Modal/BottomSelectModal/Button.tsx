import { css, useTheme } from "@emotion/react";
import { flex, touchable, width100 } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { defaultSlideFadeInVariants } from "~/constants";
import { hexToRgba } from "~/utils";
import type { Item } from ".";
import { Text } from "../../Typo";

const Button = ({ text, onClickHandler }: Item) => {
  const { colors, weighs } = useTheme();

  return (
    <motion.li
      variants={defaultSlideFadeInVariants("bottom")}
      css={css`
        ${width100}
        ${flex({ justify: "center", align: "center" })}
        height: 60px;
        background-color: ${hexToRgba(colors.secondary.E2, 0.9)};
        border-radius: 14px;
        ${touchable}
      `}
      onClick={onClickHandler}
    >
      <Text _fontSize={20} _color={colors.primary} weight={weighs.semiBold}>
        {text}
      </Text>
    </motion.li>
  );
};

export default Button;
