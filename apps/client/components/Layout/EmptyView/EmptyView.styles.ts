import styled from "@emotion/styled";
import { Flex, position } from "@toss/emotion-utils";
import Image from "next/image";

export const GrayLogoImage = styled(Image)`
  margin-top: 223px;
`;

export const BottomContainer = styled(Flex)`
  ${({ theme }) =>
    position("fixed", {
      bottom: theme.dimensions.bottomNavigationHeight + 104
    })};
`;
