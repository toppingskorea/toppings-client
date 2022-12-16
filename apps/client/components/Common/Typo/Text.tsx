import { css } from "@emotion/react";
import type { CSSProperties, HTMLAttributes } from "react";
import { emotionTheme } from "~/styles";

interface Props extends HTMLAttributes<HTMLSpanElement> {
  _fontSize: number;
  textAlign?: CSSProperties["textAlign"];
  weight?: Util.ValueOf<typeof emotionTheme.weighs>;
  _color?:
    | Util.ValueOf<typeof emotionTheme.colors>
    | Util.ValueOf<typeof emotionTheme.colors.secondary>;
  whiteSpace?: CSSProperties["whiteSpace"];
  lineHeight?: number;
  letterSpacing?: number;
}

const Text = ({
  _fontSize,
  textAlign = "left",
  weight = emotionTheme.weighs.normal,
  _color = emotionTheme.colors.black,
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
