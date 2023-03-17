import styled from "@emotion/styled";
import { flex, padding, width100 } from "@toss/emotion-utils";
import { MotionButton } from "~/components/Common";

export const Container = styled.nav`
  ${width100};
  background-color: ${({ theme }) => theme.colors.white};
  max-width: inherit;
  height: ${({ theme }) => theme.dimensions.bottomNavigationHeight}px;
  z-index: ${({ theme }) => theme.zIndex.two};
`;

export const ListContainer = styled.ul`
  ${flex({ justify: "space-between", align: "center" })};
`;

export const IconButton = styled(MotionButton)<{ fill: string }>`
  flex: 1;
  ${padding({
    y: 24
  })};
  path {
    fill: ${({ fill }) => fill};
  }
`;
