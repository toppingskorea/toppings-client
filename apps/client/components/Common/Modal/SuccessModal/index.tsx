import { css, useTheme } from "@emotion/react";
import { Flex, gutter, position, size, Spacing } from "@toss/emotion-utils";
import Lottie from "lottie-react";
import { star } from "~/assets/json";
import { Text } from "../../Typo";

interface Props {
  description?: string;
}

const SuccessModal = ({ description }: Props) => {
  const { colors, weighs } = useTheme();

  return (
    <Flex.Center
      direction="column"
      css={css`
        ${position("fixed", { top: 0, right: 0, bottom: 0, left: 0 })}
        ${size.full}
          ${gutter({ direction: "vertical", space: 30 })}
          background-color: ${colors.white};
      `}
    >
      <Lottie
        loop
        autoplay
        animationData={star}
        css={css`
          ${size({ width: 42, height: 42 })}
        `}
      />

      <Text _fontSize={23} weight={weighs.heavy} _color={colors.secondary[47]}>
        Complete!
      </Text>
      {description && (
        <>
          <Spacing size={6} />
          <Text _fontSize={16} _color={colors.secondary[47]}>
            {description}
          </Text>
        </>
      )}
    </Flex.Center>
  );
};

export default SuccessModal;
