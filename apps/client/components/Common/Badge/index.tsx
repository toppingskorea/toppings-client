import { css, useTheme } from "@emotion/react";
import { Flex, padding, size, touchable } from "@toss/emotion-utils";
import { useMemo } from "react";
import { Text } from "../Typo";

interface Props {
  size?: Parameters<typeof size>[0];
  paddingLeft?: number;
  paddingRight?: number;
  _fontSize?: number;
  children: string;
  attach: "left" | "right";
}

// 좌측에 붙을지 우측에 붙을지는 사용하는쪽에서 컨트롤해줍니다.

const Badge = ({
  children,
  size: _size = { width: 128, height: 35 },
  paddingLeft = 22,
  paddingRight,
  _fontSize = 18,
  attach
}: Props) => {
  const { colors } = useTheme();

  const isLeft = useMemo(() => attach === "left", [attach]);

  return (
    <Flex
      align="center"
      css={css`
        ${size(_size)}
        ${padding({ left: paddingLeft, right: paddingRight })}
        ${touchable}
        border-radius: ${isLeft ? `0 10px 10px  0` : `10px 0 0  10px`};
        background-color: ${colors.primary};
      `}
    >
      <Text _fontSize={_fontSize} _color={colors.white}>
        {children}
      </Text>
    </Flex>
  );
};

export default Badge;
