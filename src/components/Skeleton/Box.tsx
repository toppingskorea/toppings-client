import styled from "@emotion/styled";
import Base from "./Base";

interface Props {
  width?: Common.CSSPixelValue;
  height?: Common.CSSPixelValue;
}

const Box = styled(Base)<Props>`
  width: ${({ width }) => (typeof width === "number" ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === "number" ? `${height}px` : height};
`;

export default Box;
