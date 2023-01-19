/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { css, useTheme } from "@emotion/react";
import { flex, height100, Spacing } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import { Text } from "../../Typo";
import commonLayoutCss from "../Modal.constants";

interface Props {
  icon: JSX.Element;
  text: string;
  exitFn: VoidFunction;
}

const IconWithTextModal = ({ icon, text, exitFn }: Props) => {
  const theme = useTheme();
  const { colors, weighs } = theme;
  return (
    <div css={commonLayoutCss(theme)} onClick={exitFn}>
      <motion.div
        {...framerMocker}
        variants={defaultSlideFadeInVariants("bottom")}
        css={css`
          ${flex({ direction: "column", align: "center", justify: "center" })}
          ${height100}
        `}
      >
        {icon}
        <Spacing size={13} />
        <Text _fontSize={20} _color={colors.white} weight={weighs.bold}>
          {text}
        </Text>
      </motion.div>
    </div>
  );
};

export default IconWithTextModal;
