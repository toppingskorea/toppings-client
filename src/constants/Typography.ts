import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { CSSProperties } from "react";

const Text = styled.span<{
  _fontSize: number;
  textAlign?: CSSProperties["textAlign"];
  weight?: number;
  _color?: string;
  whiteSpace?: CSSProperties["whiteSpace"];
  lineHeight?: number;
  letterSpacing?: number;
}>`
  font-size: ${({ _fontSize }) => `${_fontSize}px`};
  text-align: ${({ textAlign = "left" }) => textAlign};
  font-weight: ${({ weight = 400 }) => weight};
  line-height: ${({ lineHeight }) => (lineHeight ? `${lineHeight}px` : "100%")};

  ${({ whiteSpace }) => whiteSpace && `white-space: ${whiteSpace};`}
  ${({ letterSpacing }) =>
    letterSpacing && `letter-spacing: ${letterSpacing}px;`}

${({ theme, _color = theme.colors.black }) => css`
    color: ${_color};
  `}
`;

export default Text;
