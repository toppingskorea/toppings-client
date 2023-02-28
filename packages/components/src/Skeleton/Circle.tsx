import styled from "@emotion/styled";
import { Base } from "./Base";

interface Props {
  size?: number;
}

export const Circle = styled(Base)<Props>`
  width: ${({ size }) => (size ? `${size}px` : "100%")};
  height: ${({ size }) => (size ? `${size}px` : "100%")};
  border-radius: 50%;
`;
