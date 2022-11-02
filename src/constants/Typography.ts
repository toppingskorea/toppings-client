import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { CSSProperties } from "react";
import { NORMAL_WEIGHT } from "./Variables";

const Text = styled.span<{
  _fontSize: number;
  textAlign?: CSSProperties["textAlign"];
  weight?: number;
  _fontFamily?: "Roboto";
  _color?: string;
  whiteSpace?: CSSProperties["whiteSpace"];
  lineHeight?: number;
  letterSpacing?: number;
}>`
  font-size: ${({ _fontSize }) => `${_fontSize}px`};
  text-align: ${({ textAlign = "left" }) => textAlign};
  font-weight: ${({ weight = NORMAL_WEIGHT }) => weight};
  font-family: ${({ _fontFamily = "NotoSansKR" }) => _fontFamily};
  line-height: ${({ lineHeight = "100%" }) => `${lineHeight}px`};

  ${({ whiteSpace }) => whiteSpace && `white-space: ${whiteSpace};`}
  ${({ letterSpacing }) =>
    letterSpacing && `letter-spacing: ${letterSpacing}px;`}

${({ theme, _color = theme.colors.black }) => css`
    color: ${_color};
  `}
`;

export default Text;
