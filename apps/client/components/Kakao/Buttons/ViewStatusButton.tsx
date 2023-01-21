import { css, useTheme } from "@emotion/react";
import { flex, padding, position } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import type { FC, SVGProps } from "react";
import { Text } from "~/components/Common/Typo";
import { defaultScaleChangeVariants, framerMocker } from "~/constants";

interface Props {
  text: string;
  onClick: VoidFunction;
  Icon: FC<SVGProps<SVGSVGElement>>;
}

const ViewStatusButton = ({ text, onClick, Icon }: Props) => {
  const { colors, zIndex, weighs } = useTheme();

  return (
    <motion.button
      type="button"
      {...framerMocker}
      variants={defaultScaleChangeVariants}
      onClick={onClick}
      css={css`
        ${position("absolute", {
          bottom: 16
        })}
        left: 40%;
        ${flex("center")}
        ${padding({
          x: 21,
          y: 8
        })}
        border-radius: 20px;
        background-color: ${colors.white};
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        z-index: ${zIndex.two};
      `}
    >
      <Icon />
      <Text
        _fontSize={15}
        weight={weighs.medium}
        css={css`
          margin-left: 19px;
        `}
      >
        {text}
      </Text>
    </motion.button>
  );
};

export default ViewStatusButton;
