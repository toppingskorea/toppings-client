import styled from "@emotion/styled";
import { padding, position, width100 } from "@toss/emotion-utils";

export const Container = styled.section`
  ${padding({ x: 16, y: 22 })};
  ${position("fixed", { bottom: 0 })};
  background-color: ${({ theme }) => theme.colors.white};
  max-width: ${({ theme }) => theme.dimensions.viewWidth - 32}px;
  ${width100}
`;
