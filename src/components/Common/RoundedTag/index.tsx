import { css } from "@emotion/react";
import { padding, touchable } from "@toss/emotion-utils";
import type { ComponentProps } from "react";
import { Text } from "../Typo";

type CommonProps = Omit<ComponentProps<typeof Text>, "_fontSize"> & {
  bgColor: string;
  bordercolor: string;
};

interface Props {
  children: string;
  _fontSize: number;
  paddingX: number;
  defaultProps: CommonProps;
  selectedProps: CommonProps;
  selected: boolean;
  onClick?: VoidFunction;
}

const RoundedTag = ({
  children,
  defaultProps,
  selectedProps,
  selected,
  paddingX,
  _fontSize,
  onClick
}: Props) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <li
      css={css`
        display: inline-block;
        ${padding({ y: 7, x: paddingX })}
        ${touchable}

        background-color: ${selected
          ? selectedProps.bgColor
          : defaultProps.bgColor};
        border-radius: 100px;
        border: 1px solid;
        border-color: ${selected
          ? selectedProps.bordercolor
          : defaultProps.bordercolor};
      `}
      onClick={onClick}
    >
      <Text
        _fontSize={_fontSize}
        {...(selected ? selectedProps : defaultProps)}
      >
        {children}
      </Text>
    </li>
  );
};

export default RoundedTag;
