import { css, useTheme } from "@emotion/react";
import { flex, padding, position } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import type { FC, SVGProps } from "react";
import { Text } from "~/components/Common/Typo";
import { defaultScaleChangeVariants, framerMocker } from "~/constants";
import { hexToRgba } from "~/utils";

interface Props {
  text: string;
  onClick: VoidFunction;
  Icon: FC<SVGProps<SVGSVGElement>>;
}

const ViewStatusButton = ({ text, onClick, Icon }: Props) => {
  const { colors, zIndex, weighs, dimensions } = useTheme();

  return (
    <motion.button
      type="button"
      {...framerMocker}
      variants={defaultScaleChangeVariants}
      onClick={onClick}
      css={css`
        ${position("fixed", {
          bottom: dimensions.bottomNavigationHeight + 16,
          left: "50%"
        })}

        ${flex("center")}
        ${padding({
          x: 21,
          y: 8
        })}
        border-radius: 20px;
        background-color: ${colors.white};
        transform: translateX(-50%) !important;
        box-shadow: 0px 4px 4px ${hexToRgba(colors.black, 0.25)};
        z-index: ${zIndex.two};
      `}
    >
      <Icon />
      <Text
        _fontSize={15}
        weight={weighs.medium}
        _color={colors.secondary["6D"]}
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
