import { css } from "@emotion/react";
import { padding, touchable } from "@toss/emotion-utils";
import type { ComponentProps } from "react";
import { Text } from "../Typo";
import type { CommonProps } from "./RoundedTag";
import type RoundedTag from "./RoundedTag";

interface Props extends ComponentProps<typeof RoundedTag> {
  selectedProps: CommonProps;
  selected: boolean;
  onClick?: VoidFunction;
}

const ClickableRoundedTag = ({
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
          ? selectedProps.bgcolor
          : defaultProps.bgcolor};
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

export default ClickableRoundedTag;
