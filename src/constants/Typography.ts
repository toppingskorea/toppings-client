import { CSSProperties } from "react";
import styled from "@emotion/styled";
import Colors from "./Colors";
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
  text-align: ${({ textAlign }) => textAlign ?? "left"};
  font-weight: ${({ weight }) => weight ?? NORMAL_WEIGHT};
  font-family: ${({ _fontFamily }) => _fontFamily ?? "NotoSansKR"};
  color: ${({ _color }) => _color ?? Colors.black};
  line-height: ${({ lineHeight }) => (lineHeight ? `${lineHeight}px` : "100%")};

  ${({ whiteSpace }) => whiteSpace && `white-space: ${whiteSpace};`}
  ${({ letterSpacing }) =>
    letterSpacing && `letter-spacing: ${letterSpacing}px;`}
`;

export default Text;
