import { css } from "@emotion/react";
import { padding } from "@toss/emotion-utils";
import type { ComponentProps } from "react";
import { Text } from "../Typo";

export type CommonProps = Omit<ComponentProps<typeof Text>, "_fontSize"> & {
  bgcolor: string;
  bordercolor: string;
};

interface Props {
  children: string;
  _fontSize: number;
  paddingX: number;
  defaultProps: CommonProps;
}

const RoundedTag = ({ children, defaultProps, paddingX, _fontSize }: Props) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <li
      css={css`
        display: inline-block;
        ${padding({ y: 7, x: paddingX })}
        width:fit-content;
        background-color: ${defaultProps.bgcolor};
        border-radius: 100px;
        border: 1px solid;
        border-color: ${defaultProps.bordercolor};
      `}
    >
      <Text _fontSize={_fontSize} _color={defaultProps._color}>
        {children}
      </Text>
    </li>
  );
};

export default RoundedTag;
