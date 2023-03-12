import { useTheme } from "@emotion/react";
import type { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import { grayLogo } from "@images/common";
import { Flex } from "@toss/emotion-utils";
import { Text } from "~/components/Common/Typo";
import { BottomContainer, GrayLogoImage } from "./EmptyView.styles";

interface Props {
  content: string;
  CTAButton?: EmotionJSX.Element;
}

const EmptyView = ({ content, CTAButton }: Props) => {
  const { colors, weighs } = useTheme();

  return (
    <Flex.Center>
      <GrayLogoImage
        src={grayLogo}
        alt="TOPPINGS"
        width={205}
        height={84}
        quality={100}
      />

      <BottomContainer direction="column" align="center">
        <Text _fontSize={19} weight={weighs.bold} _color={colors.secondary[69]}>
          {content}
        </Text>

        {CTAButton}
      </BottomContainer>
    </Flex.Center>
  );
};

export default EmptyView;
