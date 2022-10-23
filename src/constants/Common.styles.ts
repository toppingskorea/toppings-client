import { CSSProperties } from "react";
import styled from "styled-components";
import media from "./Media";
import { pxToRem } from "./Size";

export const SizedBox = styled.div<{
  _height?: number;
  _width?: number;
  moWidth?: number;
  moHeight?: number;
  bgColor?: string;
}>`
  ${({ _height }) => _height && `height: ${pxToRem(_height)};`}
  ${({ _width }) => _width && `width: ${pxToRem(_width)};`}
  ${({ bgColor }) => bgColor && `background-color: ${bgColor};`}
  

  ${media.tablet} {
    ${({ moWidth }) => moWidth !== undefined && `width: ${pxToRem(moWidth)};`}
    ${({ moHeight }) =>
      moHeight !== undefined && `height: ${pxToRem(moHeight)};`}
  }
`;

export const FlexBox = styled.div<{
  _direction?: CSSProperties["flexDirection"];
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
  gap?: number;
  isVh?: boolean;
  bgColor?: string;
  position?: CSSProperties["position"];
  moGap?: number;
  shadow?: {
    value: string;
    borderRadius: number;
  };
  selfAlignRowCenter?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
}>`
  position: ${({ position }) => position || "static"};
  display: flex;
  flex-direction: ${({ _direction }) => _direction || "row"};
  align-items: ${({ alignItems }) => alignItems || "flex-start"};
  justify-content: ${({ justifyContent }) => justifyContent || "flex-start"};
  ${({ gap }) => gap !== undefined && `gap: ${pxToRem(gap)};`}

  ${({ selfAlignRowCenter }) => selfAlignRowCenter && "margin: 0 auto;"}

  ${({ fullWidth }) => fullWidth && "width: 100%;"}
  ${({ fullHeight }) => fullHeight && "height: 100%;"}

  ${({ bgColor }) => bgColor && `background-color: ${bgColor};`}

  ${media.tablet} {
    ${({ moGap }) => moGap !== undefined && `gap: ${pxToRem(moGap)};`}
  }

  box-shadow: ${({ shadow }) => shadow && shadow.value};
  border-radius: ${({ shadow }) => shadow && `${shadow.borderRadius}px`};
`;

export const FlexCenter = styled(FlexBox)`
  justify-content: center;
  align-items: center;
`;
