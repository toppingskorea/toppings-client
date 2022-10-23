import { CSSProperties } from "react";
import styled from "styled-components";
import Colors from "./Colors";
import { pxToRem } from "./Size";
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
  font-size: ${({ _fontSize }) => pxToRem(_fontSize)};
  text-align: ${({ textAlign }) => textAlign ?? "left"};
  font-weight: ${({ weight }) => weight ?? NORMAL_WEIGHT};
  font-family: ${({ _fontFamily }) => _fontFamily ?? "NotoSansKR"};
  color: ${({ _color }) => _color ?? Colors.black};
  line-height: ${({ lineHeight }) =>
    lineHeight ? pxToRem(lineHeight) : "100%"};

  ${({ whiteSpace }) => whiteSpace && `white-space: ${whiteSpace};`}
  ${({ letterSpacing }) =>
    letterSpacing && `letter-spacing: ${pxToRem(letterSpacing)};`}
`;

export default Text;
