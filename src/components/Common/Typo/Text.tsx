import { css } from "@emotion/react";
import type { CSSProperties, HTMLAttributes } from "react";
import React from "react";

interface Props extends HTMLAttributes<HTMLSpanElement> {
  _fontSize: number;
  textAlign?: CSSProperties["textAlign"];
  weight?: number;
  _color?: string;
  whiteSpace?: CSSProperties["whiteSpace"];
  lineHeight?: number;
  letterSpacing?: number;
}

const Text = ({
  _fontSize,
  textAlign = "left",
  weight = 400,
  _color = "#000",
  whiteSpace,
  lineHeight,
  letterSpacing,
  children,
  ...rest
}: Props) => {
  return (
    <span
      css={css`
        font-size: ${_fontSize}px;
        text-align: ${textAlign};
        font-weight: ${weight};
        color: ${_color};
        line-height: ${lineHeight === undefined ? "100%" : `${lineHeight}px`};
        ${whiteSpace && `white-space:${whiteSpace};`}
        ${letterSpacing && `letter-spacing:${letterSpacing};`}
      `}
      {...rest}
    >
      {children}
    </span>
  );
};

export default Text;
