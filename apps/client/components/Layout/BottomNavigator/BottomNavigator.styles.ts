import styled from "@emotion/styled";
import { flex, padding, width100 } from "@toss/emotion-utils";

export const Container = styled.nav`
  ${width100}
  background-color: ${({ theme }) => theme.colors.white};
  max-width: inherit;
  height: ${({ theme }) => theme.dimensions.bottomNavigationHeight}px;
  ${padding({ x: 45, top: 20 })};
  z-index: ${({ theme }) => theme.zIndex.two};
`;

export const ListContainer = styled.ul`
  ${flex({ justify: "space-between", align: "center" })};
`;

export const IconButton = styled.button<{ fill: string }>`
  path {
    fill: ${({ fill }) => fill};
  }
`;
