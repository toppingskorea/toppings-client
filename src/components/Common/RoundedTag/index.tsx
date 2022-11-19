import { css } from "@emotion/react";
import { padding } from "@toss/emotion-utils";
import type { ComponentProps } from "react";
import { Text } from "../Typo";

type CommonProps = Omit<ComponentProps<typeof Text>, "_fontSize"> & {
  bgColor: string;
  borderColor: string;
};

interface Props {
  children: string;
  _fontSize: number;
  paddingX: number;
  defaultProps: CommonProps;
  selectedProps: CommonProps;
  selected: boolean;
}

const RoundedTag = ({
  children,
  defaultProps,
  selectedProps,
  selected,
  paddingX,
  _fontSize
}: Props) => {
  return (
    <li
      css={css`
        display: inline-block;
        ${padding({ y: 7, x: paddingX })}

        background-color: ${selected
          ? selectedProps.bgColor
          : defaultProps.bgColor};
        border-radius: 100px;
        border: 1px solid;
        border-color: ${selected
          ? selectedProps.borderColor
          : defaultProps.borderColor};
      `}
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
