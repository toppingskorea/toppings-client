import { css, useTheme } from "@emotion/react";
import { Flex, gutter, position, size } from "@toss/emotion-utils";
import Lottie from "lottie-react";
import { check } from "~/assets/json";
import { Text } from "../../Typo";

const SuccessModal = () => {
  const theme = useTheme();

  return (
    <Flex.Center
      direction="column"
      css={css`
        ${position("fixed", { top: 0, right: 0, bottom: 0, left: 0 })}
        ${size.full}
          ${gutter({ direction: "vertical", space: 30 })}
          background-color: ${theme.colors.white};
      `}
    >
      <Lottie
        loop
        autoplay
        animationData={check}
        css={css`
          ${size({ width: 42, height: 42 })}
        `}
      />

      <Text
        _fontSize={23}
        weight={theme.weighs.heavy}
        _color={theme.colors.secondary[47]}
      >
        Complete!
      </Text>
    </Flex.Center>
  );
};

export default SuccessModal;