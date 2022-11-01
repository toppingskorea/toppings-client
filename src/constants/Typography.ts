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
  text-align: ${({ textAlign = "left" }) => textAlign};
  font-weight: ${({ weight = NORMAL_WEIGHT }) => weight};
  font-family: ${({ _fontFamily = "NotoSansKR" }) => _fontFamily};
  color: ${({ _color = Colors.black }) => _color};
  line-height: ${({ lineHeight = "100%" }) => `${lineHeight}px`};

  ${({ whiteSpace }) => whiteSpace && `white-space: ${whiteSpace};`}
  ${({ letterSpacing }) =>
    letterSpacing && `letter-spacing: ${letterSpacing}px;`}
`;

export default Text;
