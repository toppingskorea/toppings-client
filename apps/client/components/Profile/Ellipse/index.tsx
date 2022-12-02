import { css, useTheme } from "@emotion/react";
import { Flex, size } from "@toss/emotion-utils";
import { Text } from "~/components/Common/Typo";

interface Props {
  children: number;
}

const Ellipse = ({ children }: Props) => {
  const { colors } = useTheme();
  return (
    <Flex.Center
      css={css`
        ${size({ width: 54, height: 26 })}
        background-color: ${colors.secondary.F4};
        border-radius: 100px;
      `}
    >
      <Text _fontSize={13} _color={colors.primary}>
        {children}
      </Text>
    </Flex.Center>
  );
};

export default Ellipse;
