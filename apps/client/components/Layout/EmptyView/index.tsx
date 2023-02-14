import { css, useTheme } from "@emotion/react";
import type { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import { grayLogo } from "@images/common";
import { Flex, position } from "@toss/emotion-utils";
import Image from "next/image";
import { Text } from "~/components/Common/Typo";

interface Props {
  content: string;
  CTAButton?: EmotionJSX.Element;
}

const EmptyView = ({ content, CTAButton }: Props) => {
  const { colors, weighs, dimensions } = useTheme();

  return (
    <Flex.Center>
      <Image
        src={grayLogo}
        alt="TOPPINGS"
        width={205}
        height={84}
        quality={100}
        css={css`
          margin-top: 223px;
        `}
      />

      <Flex
        direction="column"
        align="center"
        css={css`
          ${position("fixed", {
            bottom: dimensions.bottomNavigationHeight + 104
          })}
        `}
      >
        <Text _fontSize={19} weight={weighs.bold} _color={colors.secondary[69]}>
          {content}
        </Text>

        {CTAButton}
      </Flex>
    </Flex.Center>
  );
};

export default EmptyView;
