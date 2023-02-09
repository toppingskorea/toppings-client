import styled from "@emotion/styled";
import { hexToRgba } from "@toppings/utils";
import { Flex } from "@toss/emotion-utils";

export const EllipseFlex = styled(Flex.Center)`
  background-color: ${({ theme }) => hexToRgba(theme.colors.secondary.E2, 0.9)};
  padding: 15px 74px;
  border-radius: 49.5px;
`;

export const VerticalLine = styled.div`
  position: absolute;
  width: 1px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.secondary.B8};
`;
