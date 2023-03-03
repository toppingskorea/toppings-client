import { css } from "@emotion/react";
import { padding, touchable } from "@toss/emotion-utils";
import type { ComponentProps } from "react";
import { weighs } from "~/styles";

import { Text } from "../Typo";

export type CommonProps = Omit<ComponentProps<typeof Text>, "_fontSize"> & {
  bgcolor: string;
  bordercolor: string;
};

interface Props {
  children: string;
  _fontSize: number;
  fontWeight?: Util.ValueOf<typeof weighs>;
  padding: Parameters<typeof padding>[0];
  defaultProps: CommonProps;
  onClick?: VoidFunction;
  isTouchable?: true;
}

const RoundedTag = ({
  children,
  defaultProps,
  padding: _padding,
  _fontSize,
  onClick,
  isTouchable,
  fontWeight = weighs.normal
}: Props) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <li
      css={css`
        ${isTouchable && touchable}
        display: inline-block;
        ${padding(_padding)}
        width:fit-content;
        background-color: ${defaultProps.bgcolor};
        border-radius: 100px;
        border: 1px solid;
        border-color: ${defaultProps.bordercolor};
      `}
      onClick={onClick}
    >
      <Text
        _fontSize={_fontSize}
        lineHeight={_fontSize}
        _color={defaultProps._color}
        weight={fontWeight}
      >
        {children}
      </Text>
    </li>
  );
};

export default RoundedTag;
